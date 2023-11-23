import{a as l,S as h}from"./assets/vendor-935e97f4.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function c(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=c(e);fetch(e.href,r)}})();const m="https://api.thecatapi.com/v1",f="/breeds",g="/images/search",y="live_0MLgLm3ygusJhuSn6RvDBclcWVtxZS27hFvL1qegdoBmEHHqkWml5GyhzLGFd5H8";l.defaults.headers.common["x-api-key"]=y;const L=async()=>{const t=await l.get(`${m}${f}`);if(!t||t.status!==200)throw new Error("Failed to fetch cat breeds");return t.data},v=async t=>{const s=await l.get(`${m}${g}?breed_ids=${t}`);if(!s||s.status!==200)throw new Error("Моя помилка");return s.data},a=document.querySelector(".cat-info"),d=document.querySelector("#selectElement"),i=document.querySelector(".loader"),u=new h({select:"#selectElement",settings:{placeholderText:"Search cats beeds"}});L().then(t=>{const s=[{value:"",text:u.settings.placeholderText,placeholder:!0},...t.map(({name:c,id:o})=>({value:`${o}`,text:`${c}`}))];u.setData(s),d.addEventListener("change",E),d.classList.remove("hidden"),i.classList.add("hidden")}).catch(t=>{console.log(t)});function E(t){const s=t.target.value;i.classList.remove("hidden"),a.classList.add("hidden"),v(s).then(c=>{console.log("FetchCatByBreed Response:",c),S(c)}).catch(c=>{console.error("FetchCatByBreed Error:",c)}).finally(()=>{i.classList.add("hidden"),a.classList.remove("hidden")})}function S(t){const{url:s,breeds:c}=t[0],{name:o,alt_names:e,description:r,temperament:n}=c[0],p=`
  <div class="imgWrapper">
<img class="image" src="${s}" alt="${e}"/>
  </div>
  <div class="infoWrapper">
    <h2 class='title'>${o}</h2>
    <p class='description'>${r}</p>
    <h3 class='title subtitle'>Temperament</h3>
    <p class='temperament'>${n}</p>
  </div>
  `;a.innerHTML=p}
//# sourceMappingURL=commonHelpers.js.map
