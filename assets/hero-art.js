/* 5 вариантов картинки обложки для рода Аникановых. Линейная графика белым с прозрачностью —
   одинаково читается на синем фоне светлой темы и тёмно-синем фоне тёмной. Все рисунки оригинальные.
   Выбор варианта — поле heroArt в data/config.js. */
(function(){
const G=(s)=>`<g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round">${s}</g>`;
const hills=`<path d="M0 196 C90 176 170 188 260 176 S430 166 600 178" stroke-opacity=".22" stroke-width="2"/>
 <path d="M0 226 C120 212 240 220 360 210 S520 206 600 212" stroke-opacity=".16" stroke-width="2"/>
 <path d="M0 248 H600" stroke-opacity=".4" stroke-width="1.6"/>`;
const birds=`<path d="M300 70 q12 -8 24 0 M332 56 q10 -7 20 0" stroke-opacity=".4" stroke-width="1.5"/>`;
const izba=(x,y,s,o)=>`<g stroke-opacity="${o}" stroke-width="1.9" transform="translate(${x} ${y}) scale(${s})">
 <path d="M0 0 V-34 H56 V0"/><path d="M-6 -32 L28 -58 L62 -32"/><path d="M20 -38 L28 -46 L36 -38"/>
 <path d="M10 -24 H22 V-12 H10 Z M34 -24 H46 V-12 H34 Z"/><path d="M0 -10 H56 M0 -20 H56" stroke-opacity=".5"/></g>`;
const fir=(x,y,h,o)=>`<path d="M${x} ${y} V${y-h} M${x-8} ${y-h*.35} L${x} ${y-h} L${x+8} ${y-h*.35} M${x-10} ${y-h*.1} L${x} ${y-h*.6} L${x+10} ${y-h*.1}" stroke-opacity="${o}" stroke-width="1.6"/>`;

window.HERO_ART = {
 church: { name:'Покровская церковь на Малыне', svg:G(`${hills}
  <g stroke-opacity=".82" stroke-width="2.2">
   <path d="M400 238 V160 H470 V238"/><path d="M392 162 L435 136 L478 162"/>
   <path d="M418 136 V106 H452 V136"/><path d="M412 108 L435 86 L458 108"/><path d="M435 86 V60 M426 69 H444"/>
   <path d="M480 238 V146 H506 V238"/><path d="M476 148 L493 126 L510 148"/><path d="M493 126 V106 M486 113 H500"/>
   <path d="M426 238 V198 a9 9 0 0 1 18 0 V238"/><path d="M486 176 a7 7 0 0 1 14 0 V190 H486 Z"/>
  </g>
  <path d="M330 262 C380 254 430 266 480 258 S570 262 600 256" stroke-opacity=".45" stroke-width="1.6"/>
  ${fir(560,238,52,.4)}${fir(362,238,40,.35)}${birds}`)},

 village: { name:'Сельцо Бегино: избы и колодец', svg:G(`${hills}
  ${izba(250,238,1,.6)}${izba(340,238,1.15,.75)}${izba(450,238,1.3,.85)}
  <g stroke-opacity=".8" stroke-width="2"><path d="M560 238 V200 H588 V238 M556 200 H592"/><path d="M574 200 V150 M540 168 L612 140"/><path d="M540 168 V186"/></g>
  <path d="M230 238 C250 248 300 252 600 246" stroke-opacity=".35" stroke-width="1.5"/>
  <g stroke-opacity=".35" stroke-width="1.4"><path d="M240 214 V238 M262 214 V238 M284 214 V238 M234 222 H300 M234 232 H300"/></g>
  ${birds}`)},

 field: { name:'Поле и снопы', svg:G(`
  <circle cx="520" cy="96" r="30" stroke-opacity=".55" stroke-width="2"/>
  <path d="M520 50 V40 M520 152 V142 M466 96 H476 M564 96 H574 M482 58 l7 7 M551 127 l7 7 M482 134 l7 -7 M551 65 l7 -7" stroke-opacity=".35" stroke-width="1.6"/>
  <path d="M0 210 C150 190 300 196 600 186" stroke-opacity=".3" stroke-width="2"/>
  <g stroke-opacity=".25" stroke-width="1.4"><path d="M200 248 L330 196 M260 248 L370 194 M320 248 L410 192 M380 248 L450 190 M440 248 L490 188 M500 248 L530 187 M560 248 L570 186"/></g>
  <g stroke-opacity=".8" stroke-width="2">
   <path d="M300 236 L318 186 L336 236 M310 208 H326 M318 186 L306 176 M318 186 L330 176 M318 186 V172"/>
   <path d="M380 236 L400 180 L420 236 M391 206 H409 M400 180 L387 168 M400 180 L413 168 M400 180 V164"/>
   <path d="M466 236 L488 174 L510 236 M478 204 H498 M488 174 L474 160 M488 174 L502 160 M488 174 V156"/>
  </g>
  <path d="M0 248 H600" stroke-opacity=".4" stroke-width="1.6"/>`)},

 road: { name:'Тракт из Черни в Крапивну', svg:G(`${hills}
  <path d="M600 214 C520 218 470 226 430 238 C400 247 380 256 360 280" stroke-opacity=".55" stroke-width="2"/>
  <path d="M600 222 C540 228 500 238 470 250 C440 262 430 270 424 280" stroke-opacity=".55" stroke-width="2"/>
  <g stroke-opacity=".85" stroke-width="2.1"><path d="M330 248 V150 H344 V248"/><path d="M326 150 H348 M326 166 H348"/><path d="M330 182 l14 -8 M330 198 l14 -8 M330 214 l14 -8 M330 230 l14 -8" stroke-opacity=".5"/></g>
  <g stroke-opacity=".7" stroke-width="1.9"><path d="M470 196 a12 12 0 1 0 0.1 0 M500 196 a12 12 0 1 0 0.1 0"/><path d="M466 192 H512 L522 176 H476 Z M512 192 L548 182 M522 176 L560 168"/></g>
  ${fir(560,214,48,.4)}${fir(586,212,36,.3)}${izba(220,238,.8,.4)}${birds}`)},

 tree: { name:'Родовое древо: пять ветвей', svg:G(`
  <path d="M0 248 H600" stroke-opacity=".4" stroke-width="1.6"/>
  <g stroke-opacity=".85" stroke-width="2.4"><path d="M450 248 C446 220 446 200 450 176"/><path d="M462 248 C462 220 458 200 454 176"/></g>
  <g stroke-opacity=".7" stroke-width="2">
   <path d="M452 178 C430 160 400 150 372 140"/><path d="M452 178 C440 150 424 124 408 104"/><path d="M452 178 V90"/>
   <path d="M452 178 C466 150 482 124 500 106"/><path d="M452 178 C476 162 506 152 534 144"/>
  </g>
  <g stroke-opacity=".6" stroke-width="1.8">
   <circle cx="372" cy="140" r="9"/><circle cx="408" cy="104" r="9"/><circle cx="452" cy="82" r="10" stroke-opacity=".9"/><circle cx="500" cy="106" r="9"/><circle cx="534" cy="144" r="9"/>
  </g>
  <g stroke-opacity=".3" stroke-width="1.4"><path d="M372 140 l-18 -14 M372 140 l-20 4 M408 104 l-10 -18 M408 104 l-20 -6 M452 82 l-12 -16 M452 82 l12 -16 M500 106 l10 -18 M500 106 l20 -6 M534 144 l18 -14 M534 144 l20 4"/></g>
  <path d="M430 248 C420 256 400 260 380 262 M474 248 C486 256 506 260 524 262" stroke-opacity=".4" stroke-width="1.6"/>`)}
};
})();
