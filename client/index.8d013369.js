import{S as s,i as t,s as e,e as a,t as c,c as i,a as n,b as l,d as r,f as o,g as u,h as d,j as m,k as h,l as p,n as f,r as v,o as k}from"./client.3ef71fc1.js";function x(s){let t,e,m;return{c(){t=a("div"),e=a("span"),m=c("C̸l̴i̷c̷k̵ ̸t̵o̷̢̎ ̵̭̀p̶̩̀l̴͚̄ą̴̈́y̷̹̚ ̸̖͗m̸͙̀u̵̝̇s̸͍̀i̴̝͂c̷̜̈"),this.h()},l(s){t=i(s,"DIV",{class:!0});var a=n(t);e=i(a,"SPAN",{class:!0});var c=n(e);m=l(c,"C̸l̴i̷c̷k̵ ̸t̵o̷̢̎ ̵̭̀p̶̩̀l̴͚̄ą̴̈́y̷̹̚ ̸̖͗m̸͙̀u̵̝̇s̸͍̀i̴̝͂c̷̜̈"),c.forEach(r),a.forEach(r),this.h()},h(){o(e,"class","prompt-text svelte-1kanx6r"),o(t,"class","click-prompt svelte-1kanx6r")},m(s,a){u(s,t,a),d(t,e),d(e,m)},d(s){s&&r(t)}}}function g(s){let t,e,c,l,k,g,I,T=s[0]&&x();return{c(){t=a("div"),T&&T.c(),e=m(),c=a("video"),l=a("track"),this.h()},l(s){t=i(s,"DIV",{class:!0});var a=n(t);T&&T.l(a),a.forEach(r),e=h(s),c=i(s,"VIDEO",{id:!0,src:!0,duration:!0,class:!0});var o=n(c);l=i(o,"TRACK",{kind:!0}),o.forEach(r),this.h()},h(){o(t,"class","wrapper svelte-1kanx6r"),o(l,"kind","captions"),o(c,"id","video"),c.src!==(k="https://dublab.es/misc/pax_digitalis.mp4")&&o(c,"src","https://dublab.es/misc/pax_digitalis.mp4"),o(c,"duration",E),o(c,"class","svelte-1kanx6r")},m(a,i){u(a,t,i),T&&T.m(t,null),u(a,e,i),u(a,c,i),d(c,l),c.muted=s[0],g||(I=[p(t,"click",s[1]),p(c,"volumechange",s[2])],g=!0)},p(s,[e]){s[0]?T||(T=x(),T.c(),T.m(t,null)):T&&(T.d(1),T=null),1&e&&(c.muted=s[0])},i:f,o:f,d(s){s&&r(t),T&&T.d(),s&&r(e),s&&r(c),g=!1,v(I)}}}const E=865;function I(s){const t=document.getElementById("video");t.currentTime=s,t.play()}function T(s,t,e){let a=!0;return k((()=>{const s=new Date("2021-01-01T00:00:00.000Z").getTime()/1e3,t=(new Date).getTime()/1e3-s;I(Math.floor(t%E)),function(){const s=document.getElementById("video");setInterval((function(){Math.ceil(s.currentTime)>E&&I(0)}),1e3)}()})),[a,function(){a&&e(0,a=!1)},function(){a=this.muted,e(0,a)}]}export default class extends s{constructor(s){super(),t(this,s,T,g,e,{})}}
