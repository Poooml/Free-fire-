(function () {
'use strict';

const TOTAL_TIME = 92000;

const PAGE_HOLD_MIN = 4000;
const PAGE_HOLD_MAX = 8000;

const REDIRECT_GAP_MIN = 8000;
const REDIRECT_GAP_MAX = 14000;

const A = '3TMdueEaUw';

const FINAL_URL =
'https://encurtarapido.com/' + A;

const BUTTONS = [
'clique aqui para continuar',
'clique aqui para prosseguir',
'prosseguir',
'continuar',
'continue',
'next',
'claim',
'get key',
'avançar',
'avancar',
'obter',
'seguir'
];

if (window._v30Running) return;
window._v30Running = true;

let redirectDone = false;

if (
location.hostname.includes(
'precisosaberinvestir.com.br'
)
) {

sessionStorage.setItem(
'aincrad_start',
Date.now()
);

}

function showTelegramPromo() {

if(document.getElementById(
'aincrad-tg-popup'
)) return;

const box=document.createElement('div');

box.id='aincrad-tg-popup';

box.innerHTML=`

<div id="aincrad-tg-box">

<div id="aincrad-tg-title">
JOIN OUR TELEGRAM
</div>

<a
href="https://t.me/aincradmodskey"
target="_blank"
id="aincrad-tg-btn"
>
JOIN NOW
</a>

</div>

`;

const style=document.createElement('style');

style.textContent=`

#aincrad-tg-popup{

position:fixed;
bottom:20px;
right:20px;

z-index:999999999;

animation:aincradFade .4s ease;

}

#aincrad-tg-box{

background:#111;
border:2px solid #00ff99;

padding:18px;
border-radius:16px;

box-shadow:
0 0 20px rgba(0,255,153,.4);

font-family:sans-serif;
text-align:center;

}

#aincrad-tg-title{

color:white;
font-size:16px;
font-weight:bold;

margin-bottom:12px;

}

#aincrad-tg-btn{

display:inline-block;

background:#00ff99;
color:black;

padding:10px 18px;

border-radius:10px;

font-weight:bold;
text-decoration:none;

transition:.2s;

}

#aincrad-tg-btn:hover{

transform:scale(1.06);

}

@keyframes aincradFade{

from{

opacity:0;
transform:translateY(20px);

}

to{

opacity:1;
transform:translateY(0);

}

}

`;

document.head.appendChild(style);

document.body.appendChild(box);

}

function sleep(ms){

return new Promise(
r=>setTimeout(r,ms)
);

}

async function holdPage(){

const hold =
Math.floor(
Math.random() *
(PAGE_HOLD_MAX-PAGE_HOLD_MIN)
)+PAGE_HOLD_MIN;

await sleep(hold);

}

async function waitRemainingTime(){

const start=parseInt(
sessionStorage.getItem(
'aincrad_start'
)||Date.now()
);

const elapsed=Date.now()-start;

const remain=Math.max(
0,
TOTAL_TIME-elapsed
);

if(remain>0){

await sleep(remain);

}

}

async function safeRedirect(redirect){

if(redirectDone)return;

redirectDone=true;

await holdPage();

const gap =
Math.floor(
Math.random() *
(REDIRECT_GAP_MAX-REDIRECT_GAP_MIN)
)+REDIRECT_GAP_MIN;

await sleep(gap);

if(
redirect.includes(
'encurtarapido.com'
)
){

await waitRemainingTime();

showTelegramPromo();

await sleep(5000);

}

window.location.replace(
redirect
);

}

function patch(w){

if(!w||w._patched)return;

w._patched=true;

const originalFetch=w.fetch;

w.fetch=async function(...args){

const url=
typeof args[0]==='string'
?args[0]
:(args[0]instanceof Request
?args[0].url
:'');

const response=
await originalFetch.apply(
this,args
);

if(
url.includes('links/go')
||
url.includes('/go')
){

try{

const json=JSON.parse(
await response.clone().text()
);

if(
json.status==='success'
&&
json.url
){

const redirect=
json.url.replace(
/\\\//g,
'/'
);

safeRedirect(
redirect
);

}

}catch(e){}

}

return response;

};

const XHR=w.XMLHttpRequest;

w.XMLHttpRequest=function(){

const xhr=new XHR();

let currentUrl='';

const open=xhr.open.bind(xhr);

xhr.open=function(m,u,...r){

currentUrl=u||'';

return open(m,u,...r);

};

xhr.addEventListener(
'load',
function(){

if(
currentUrl.includes('links/go')
||
currentUrl.includes('/go')
){

try{

const json=JSON.parse(
xhr.responseText
);

if(
json.status==='success'
&&
json.url
){

const redirect=
json.url.replace(
/\\\//g,
'/'
);

safeRedirect(
redirect
);

}

}catch(e){}

}

});

return xhr;

};

}

patch(window);
patch(unsafeWindow||window);

if(
location.hostname.includes(
'precisosaberinvestir.com.br'
)
){

const p=new URLSearchParams(
location.search
);

const id=p.get('id');

const ts=p.get('sf_ft_ts');

const sig=p.get('sf_ft_sig');

if(id===A&&ts&&sig){

location.replace(

FINAL_URL+
'?rtgok=1'+
'&sf_ft_ts='+
encodeURIComponent(ts)+
'&sf_ft_sig='+
encodeURIComponent(sig)

);

}

}

let lastClick=0;

function autoClick(){

if(Date.now()-lastClick<4000)return;

const els=document.querySelectorAll(
'button,a,input[type="button"],input[type="submit"]'
);

for(const el of els){

const text=(
el.innerText||
el.textContent||
el.value||
''
).toLowerCase().trim();

for(const k of BUTTONS){

if(text.includes(k)){

lastClick=Date.now();

setTimeout(()=>{

el.click();

},1000 + Math.random()*2000);

return;

}

}

}

}

if(
location.hostname.includes(
'encurtarapido.com'
)
){

setInterval(()=>{

autoClick();

},2000);

document.readyState!=='loading'

?setTimeout(autoClick,2000)

:document.addEventListener(
'DOMContentLoaded',
() => setTimeout(autoClick,2000)
);

}

})();
