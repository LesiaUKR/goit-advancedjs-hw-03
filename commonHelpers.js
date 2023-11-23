import{S as i}from"./assets/vendor-17b356c5.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&c(s)}).observe(document,{childList:!0,subtree:!0});function r(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerpolicy&&(n.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?n.credentials="include":e.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function c(e){if(e.ep)return;e.ep=!0;const n=r(e);fetch(e.href,n)}})();const a="https://api.thecatapi.com/v1",u="/breeds",d="/images/search",f="live_0MLgLm3ygusJhuSn6RvDBclcWVtxZS27hFvL1qegdoBmEHHqkWml5GyhzLGFd5H8",h=()=>fetch(`${a}${u}`).then(t=>{if(console.log(t),!t.ok)throw console.log(t),new Error("Моя помилка");return t.json()}),m=t=>fetch(`${a}${d}?breeds_ids=${t}"&api_key=${f}`).then(o=>{if(console.log(o),!o.ok)throw console.log(o),new Error("Моя помилка");return o.json()});console.log(i);const g=document.querySelector(".cat-info"),l=new i({select:"#selectElement",settings:{placeholderText:"Search cats beeds"},events:{afterChange:p}});console.log(l);h().then(t=>{console.log(t);const o=[{value:"",text:l.settings.placeholderText,placeholder:!0},...t.map(({name:r,id:c})=>({value:`${c}`,text:`${r}`}))];l.setData(o)}).catch(t=>console.log(t));function p(t){const o=t.map(r=>r.value);console.log(o),m(o).then(r=>{console.log(r),g.innerHTML=y(r)}).catch(r=>{console.log(r)})}function y(t){const{url:o,breeds:r}=t[0],{name:c,alt_names:e,description:n,temperament:s}=r[0];return`
  <div class="imgWrapper">
  <img src="${o}" alt="${e}" width=100% height=500 />
  </div>
  <div class="infoWrapper">
    <h2 class='title'>${c}</h2>
    <p class='description'>${n}</p>
    <h3 class='subtitle'>${s}</h3>
  </div>
  `}
//# sourceMappingURL=commonHelpers.js.map
