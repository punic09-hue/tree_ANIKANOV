/* 5 вариантов картинки для обложки. Линейная графика белым цветом с прозрачностью —
   одинаково читается на синем фоне светлой темы и тёмно-синем фоне тёмной. Все рисунки — оригинальные. */
window.HERO_ART = {
 church: { name:'Покровская церковь и сельцо Бегино', svg:`
  <g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round">
   <path d="M0 170 C90 150 170 162 260 150 S430 140 600 152" stroke-opacity=".25" stroke-width="2"/>
   <path d="M0 196 C120 182 240 190 360 180 S520 176 600 182" stroke-opacity=".18" stroke-width="2"/>
   <g stroke-opacity=".8" stroke-width="2.2">
    <path d="M400 186 V120 H470 V186"/><path d="M392 122 L435 98 L478 122"/>
    <path d="M418 98 V70 H452 V98"/><path d="M412 72 L435 52 L458 72"/><path d="M435 52 V30 M427 38 H443"/>
    <path d="M476 186 V110 H500 V186"/><path d="M472 112 L488 92 L504 112"/><path d="M488 92 V76 M482 82 H494"/>
    <path d="M426 186 V150 a9 9 0 0 1 18 0 V186"/>
   </g>
   <g stroke-opacity=".55" stroke-width="1.9">
    <path d="M90 190 V160 H140 V190 M84 162 L115 140 L146 162 M108 190 V174 H122 V190"/>
    <path d="M175 190 V166 H215 V190 M170 168 L195 150 L220 168"/>
    <path d="M250 190 V164 H296 V190 M244 166 L273 146 L302 166 M265 176 H281"/>
   </g>
   <g stroke-opacity=".35" stroke-width="1.6"><path d="M30 190 V150 M22 166 L30 150 L38 166 M530 190 V140 M520 160 L530 140 L540 160 M556 190 V156 M548 170 L556 156 L564 170"/></g>
   <path d="M0 212 H600" stroke-opacity=".45" stroke-width="1.6"/>
   <path d="M330 60 q12 -8 24 0 M360 46 q10 -7 20 0" stroke-opacity=".4" stroke-width="1.5"/>
  </g>`},
 dam: { name:'Плотина и пруд ВИЗа', svg:`
  <g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round">
   <path d="M0 150 C60 120 110 135 160 118 S260 100 320 122 S430 104 520 120 S600 112 600 112" stroke-opacity=".25" stroke-width="2"/>
   <path d="M0 168 C80 150 140 160 220 146 S360 140 440 150 S560 140 600 146" stroke-opacity=".18" stroke-width="2"/>
   <g stroke-opacity=".75" stroke-width="2.2">
    <path d="M330 200 V120 H420 V200"/><path d="M330 120 L375 95 L420 120"/>
    <path d="M350 200 V150 H368 V200 M384 200 V150 H402 V200"/>
    <path d="M440 200 V70 H456 V200 M470 200 V88 H484 V200"/>
    <path d="M436 70 H460 M466 88 H488"/>
   </g>
   <g stroke-opacity=".45" stroke-width="2"><path d="M448 64 c-6 -14 10 -18 4 -32 c-5 -11 9 -15 6 -26"/><path d="M477 82 c-6 -12 9 -16 3 -28"/></g>
   <path d="M120 200 L190 176 H600" stroke-opacity=".8" stroke-width="2.4"/>
   <path d="M190 176 V200 M240 176 V200 M290 176 V200" stroke-opacity=".4" stroke-width="1.6"/>
   <g stroke-opacity=".55" stroke-width="1.8">
    <path d="M0 212 q20 -6 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0"/>
    <path d="M10 232 q20 -6 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0"/>
    <path d="M0 252 q20 -6 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" stroke-opacity=".35"/>
   </g>
   <g stroke-opacity=".35" stroke-width="1.6"><path d="M40 140 l10 -24 l10 24 M70 136 l12 -30 l12 30 M520 112 l10 -22 l10 22 M550 110 l12 -28 l12 28"/></g>
  </g>`}
};
