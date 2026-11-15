const loader=document.querySelector(".loader");
window.addEventListener("load",()=>{setTimeout(()=>loader?.classList.add("done"),850)});
const menuButton=document.querySelector(".menu-btn");
const nav=document.querySelector("#nav");
menuButton?.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuButton.setAttribute("aria-expanded",String(open));menuButton.textContent=open?"×":"☰"});
nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menuButton?.setAttribute("aria-expanded","false");menuButton.textContent="☰"}));
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("in-view");revealObserver.unobserve(entry.target)}}),{threshold:.12,rootMargin:"0px 0px -35px 0px"});
document.querySelectorAll(".reveal").forEach(el=>revealObserver.observe(el));
const dot=document.querySelector(".cursor-dot"),ring=document.querySelector(".cursor-ring");
let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
window.addEventListener("pointermove",e=>{mx=e.clientX;my=e.clientY;if(dot){dot.style.left=mx+"px";dot.style.top=my+"px"}});
function animateCursor(){rx+=(mx-rx)*.17;ry+=(my-ry)*.17;if(ring){ring.style.left=rx+"px";ring.style.top=ry+"px"}requestAnimationFrame(animateCursor)}animateCursor();
document.querySelectorAll("a,button,.work-image").forEach(el=>{el.addEventListener("mouseenter",()=>ring?.classList.add("hover"));el.addEventListener("mouseleave",()=>ring?.classList.remove("hover"))});
if(matchMedia("(hover:hover) and (pointer:fine)").matches){document.querySelectorAll(".magnetic").forEach(el=>{el.addEventListener("pointermove",e=>{const r=el.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;el.style.transform=`translate(${x*.14}px,${y*.18}px)`});el.addEventListener("pointerleave",()=>el.style.transform="")})}
const tiltOK=matchMedia("(hover:hover) and (pointer:fine)").matches&&!matchMedia("(prefers-reduced-motion: reduce)").matches;
if(tiltOK){document.querySelectorAll("[data-tilt]").forEach(card=>{const image=card.querySelector(".work-image");card.addEventListener("pointermove",e=>{const r=image.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;image.style.transform=`perspective(900px) rotateY(${x*3}deg) rotateX(${-y*3}deg) scale(1.01)`});card.addEventListener("pointerleave",()=>image.style.transform="")})}
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{const target=document.querySelector(a.getAttribute("href"));if(target){e.preventDefault();target.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})}}));