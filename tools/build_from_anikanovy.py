"""Собирает data/*.js и data/*.csv сайта из базы исследования Аникановых (data.py + core.py).
Запуск из корня сайта:  python3 tools/build_from_anikanovy.py <папка anikanovy_import>
Люди, родившиеся после cutoff (config.js), их потомки и супруги без своей даты не публикуются;
их полные имена в текстах заменяются пометкой."""
import sys, os, re, json, csv

SRC = os.path.abspath(sys.argv[1])
sys.path.insert(0, SRC)
os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import core
from data import РАСХОЖДЕНИЯ, ЗАДАЧИ, ИССЛЕДОВАНИЕ

cfg = open('data/config.js', encoding='utf-8').read()
CUT = int(re.search(r'"cutoff":\s*(\d+)', cfg).group(1))
yr = lambda s: int(m.group(1)) if (m := re.search(r'(1[6-9]\d\d|20\d\d)', s or '')) else None
PS, FS = core.persons, core.families

# ---------- кого скрываем ----------
kids = {}
for p in PS.values():
    for par in (p['отец'], p['мать']):
        if par: kids.setdefault(par, []).append(p['id'])
spouses = {}
for f in FS.values():
    if f['муж'] and f['жена']:
        spouses.setdefault(f['муж'], []).append(f['жена']); spouses.setdefault(f['жена'], []).append(f['муж'])
hidden = set()
def hide(pid):
    if pid in hidden: return
    hidden.add(pid)
    for k in kids.get(pid, []): hide(k)
for p in PS.values():
    if (yr(p['рожд']) or 0) > CUT: hide(p['id'])
for _ in range(3):  # супруги «со стороны», связанные с родом только через скрытых
    for p in PS.values():
        sp = spouses.get(p['id'], [])
        if p['id'] not in hidden and sp and all(s in hidden for s in sp) \
                and not (p['отец'] or p['мать']): hidden.add(p['id'])
SHOW = [p for p in PS.values() if p['id'] not in hidden]
SHOWN = {p['id'] for p in SHOW}

hidden_names = sorted({PS[h]['фио'] for h in hidden if len(PS[h]['фио'].split()) >= 2 and 'не установлено' not in PS[h]['фио']},
                      key=len, reverse=True)
MASK = '[лицо, род. после %d г.]' % CUT
def scrub(t):
    t = str(t or '')
    for n in hidden_names:
        if n in t: t = t.replace(n, MASK)
    return t

def num(p):
    return p['n_export'] or str(int(p['id'][1:]) + 1000)

SRCNAME = {s['id']: s['наименование'] for s in core.sources.values()}
def srcs(ids):
    return '; '.join(f"{i} — {SRCNAME.get(i, '')}" for i in ids)

# ---------- места персоны ----------
pplaces = {}
for e in core.events:
    if e['место_id']:
        for pid in e['персоны']: pplaces.setdefault(pid, []).append(e['место_id'])
for b in core.bio:
    if b.get('место_id'): pplaces.setdefault(b['персона'], []).append(b['место_id'])

KIND = {'Рождение': 'рождение', 'Крещение': 'рождение', 'Брак': 'брак', 'Смерть': 'смерть', 'Погребение': 'смерть'}
def kind(t):
    for k, v in KIND.items():
        if t.startswith(k): return v
    return t.lower()

persons, research = [], {}
for p in SHOW:
    pid = p['id']
    sp = [s for s in spouses.get(pid, []) if s in SHOWN]
    fam_child = next((f['id'] for f in FS.values() if pid in f['дети']), '')
    ev = []
    for e in core.events_by_person.get(pid, []):
        ev.append({'kind': kind(e['тип']), 'date': e['дата'], 'res': scrub(f"{e['место'] or ''} · {e['достоверность']} · {'; '.join(e['источники'])}".strip(' ·')),
                   'fam': e['семья'], 'code': '', 'no': '', 'note': scrub(e['описание'])})
    bio = core.bio_by_person.get(pid, [])
    verb = ' ⁂ '.join(scrub(f"{b['период']} — {b['категория']}: {b['заголовок']}. {b['подробности']}") for b in bio)
    persons.append({
        'id': pid, 'pri': bool(p.get('приоритет')), 'name': p['фио'], 'sex': p['пол'] or ('Ж' if p['фио'].endswith(('на', 'ва')) else 'М'),
        'gen': p['поколение'], 'branch': core.ВЕТВЬ_LABEL.get(p.get('ветвь'), ''),
        'b': p['рожд'], 'd': p['смерть'], 'father': p['отец'] if p['отец'] in SHOWN else '', 'mother': p['мать'] if p['мать'] in SHOWN else '',
        'fam': fam_child, 'spouses': sp, 'parish': 'Покровская церковь с. Покровское (Ушаково)' if 'Бегин' in (p['место_рожд'] or '') else '',
        'burial': '', 'estate': '', 'quality': '', 'note': '', 'src': '', 'verbatim': '', 'ev': ev, 'num': num(p),
        'bplace': p['место_рожд'], 'dplace': p['место_смерти'], 'hiddenKids': sum(1 for k in kids.get(pid, []) if k in hidden),
        'places': sorted(set(pplaces.get(pid, []))),
    })
    research[num(p)] = {'note': scrub(p['примечание']), 'src': srcs(p['источники_список']), 'verbatim': verb}

families = []
for f in FS.values():
    if f['муж'] in hidden or f['жена'] in hidden: continue
    families.append({'id': f['id'], 'gen': f['поколение'], 'branch': core.ВЕТВЬ_LABEL.get(f.get('ветвь'), ''),
                     'h': f['муж'] if f['муж'] in SHOWN else '', 'w': f['жена'] if f['жена'] in SHOWN else '',
                     'date': f['брак'], 'note': scrub(f['примечание'])})

sources = []
for s in core.sources.values():
    r = s['результат'].lower()
    res = 'ПОЛОЖИТЕЛЬНЫЙ' if r.startswith('полож') else 'ОТРИЦАТЕЛЬНЫЙ' if r.startswith('отриц') else s['результат'].upper()
    sources.append({'n': s['id'], 'res': res, 'type': s['тип'], 'ref': scrub(s['наименование'] + (' ' + s['ссылка'] if s['ссылка'] else '')),
                    'yr': str(yr(s['наименование']) or ''), 'what': scrub(s['тема']), 'got': scrub(s['подробности']),
                    'where': s['ссылка'], 'date': '.'.join(reversed(s['дата'].split('-')))})

places = []
for L in core.places.values():
    evs = []
    for e in sorted((e for e in core.events if e['место_id'] == L['id']), key=lambda e: e['sort']):
        hid = any(x in hidden for x in e['персоны'])
        evs.append({'d': e['дата'], 't': re.sub(r' \(.*', '', e['тип']), 'w': '' if hid else ', '.join(core.pname(x) for x in e['персоны']),
                    'ids': [] if hid else [x for x in e['персоны'] if x in SHOWN], 'hid': hid})
    exact = bool(L['lat']) and str(L['точность']).lower().startswith('точн')
    places.append({'id': L['id'], 'name': scrub(L['название'].split(' — ')[0]), 'addr': scrub(L['название']), 'lat': str(L['lat'] or ''), 'lon': str(L['lon'] or ''),
                   'url': L['ссылка'], 'exact': exact, 'cat': L['тип'], 'period': '', 'events': evs, 'coord': L['точность'], 'src': '',
                   'geo': '' if L['lat'] else L['название'].split(' — ')[-1], 'about': scrub(L['описание']), 'who': ''})

# ---------- разделы «Исследование» ----------
def rd(name):
    rows = list(csv.reader(open(os.path.join(SRC, 'ГОТОВЫЕ_ФАЙЛЫ', 'CSV', name), encoding='utf-8-sig'), delimiter=';'))
    rows = [[scrub(c) for c in r] for r in rows if any(c.strip() for c in r)]
    return rows[0], rows[1:]
def sec(ico, title, cols, rows): return {'ico': ico, 'title': title, 'cols': cols, 'rows': rows}
studies = {}
c, r = rd('История Ступишино.csv'); studies['history'] = sec('📜', 'История Ступишино', c, r)
c, r = rd('Приход.csv'); studies['parish'] = sec('⛪', 'Приход: Покровская церковь', c, r)
c, r = rd('Подворная перепись 1910-12.csv'); studies['census'] = sec('🏡', 'Подворная перепись 1910–12', c, r)
c, r = rd('Биография.csv')
r = [x for x in r if not any(n in x[1] for n in [PS[h]['фио'] for h in hidden]) and MASK not in x[1]]
studies['bio'] = sec('🎖️', 'Биографии', c, r)
c, r = rd('Мария Федотовна.csv'); studies['maria'] = sec('🔎', 'Поиск: Мария Федотовна', c, r)
studies['audit'] = sec('⚠️', 'Расхождения', ['ID', 'Вопрос', 'Суть', 'Версия 1', 'Версия 2', 'Статус', 'Решение'], [[scrub(x) for x in row] for row in РАСХОЖДЕНИЯ])
studies['plan'] = sec('📝', 'Задачи поиска', ['ID', 'Приоритет', 'Задача', 'Что сделать', 'Где', 'Ссылка'], [[scrub(x) for x in row] for row in ЗАДАЧИ])
c, r = rd('Карты и фото.csv'); studies['maps'] = sec('🖼️', 'Карты и фото', c, r)

# ---------- запись ----------
def js(name, var, obj, head=''):
    open(f'data/{name}.js', 'w', encoding='utf-8').write(head + f'window.{var}=' + json.dumps(obj, ensure_ascii=False, indent=1) + ';\n')
def tocsv(name, rows):
    if not rows: return
    with open(f'data/{name}.csv', 'w', encoding='utf-8-sig', newline='') as fh:
        w = csv.DictWriter(fh, fieldnames=list(rows[0].keys()), delimiter=';'); w.writeheader()
        for x in rows: w.writerow({k: json.dumps(v, ensure_ascii=False) if isinstance(v, (list, dict)) else v for k, v in x.items()})
js('persons', 'TREE_PERSONS', persons); tocsv('persons', persons)
js('families', 'TREE_FAMILIES', families); tocsv('families', families)
js('sources', 'TREE_SOURCES', sources); tocsv('sources', sources)
js('research', 'TREE_RESEARCH', research); tocsv('research', [dict(num=k, **v) for k, v in research.items()])
js('places', 'TREE_PLACES', places); tocsv('places', places)
js('studies', 'TREE_STUDIES', studies, '/* Разделы исследования. Собирается tools/build_from_anikanovy.py */\n')
upd = '.'.join(reversed(ИССЛЕДОВАНИЕ['обновлено'].split('-')))
open('data/config.js', 'w', encoding='utf-8').write(re.sub(r'"updated":\s*"[^"]*"', f'"updated": "{upd}"', cfg))
print(f'персон {len(persons)} (скрыто {len(hidden)}), семей {len(families)}, источников {len(sources)}, мест {len(places)}, '
      f'разделов {len(studies)}')
