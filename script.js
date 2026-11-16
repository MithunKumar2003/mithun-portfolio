const loader=document.querySelector(".loader");
const hideLoader=()=>loader?.classList.add("done");
setTimeout(hideLoader,450);
window.addEventListener("load",()=>setTimeout(hideLoader,150),{once:true});
const menuButton=document.querySelector(".menu-btn");
const nav=document.querySelector("#nav");
menuButton?.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuButton.setAttribute("aria-expanded",String(open));menuButton.textContent=open?"×":"☰"});
nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menuButton?.setAttribute("aria-expanded","false");menuButton.textContent="☰"}));
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("in-view");revealObserver.unobserve(entry.target)}}),{threshold:.12,rootMargin:"0px 0px -35px 0px"});
document.querySelectorAll(".reveal").forEach(el=>revealObserver.observe(el));
const penCursor=document.querySelector(".cursor-pen");
window.addEventListener("pointermove",e=>{if(penCursor){penCursor.style.left=e.clientX+"px";penCursor.style.top=e.clientY+"px"}});
document.querySelectorAll("a,button,.work-image").forEach(el=>{el.addEventListener("mouseenter",()=>penCursor?.classList.add("hover"));el.addEventListener("mouseleave",()=>penCursor?.classList.remove("hover"))});
if(matchMedia("(hover:hover) and (pointer:fine)").matches){document.querySelectorAll(".magnetic").forEach(el=>{el.addEventListener("pointermove",e=>{const r=el.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;el.style.transform=`translate(${x*.14}px,${y*.18}px)`});el.addEventListener("pointerleave",()=>el.style.transform="")})}
const tiltOK=matchMedia("(hover:hover) and (pointer:fine)").matches&&!matchMedia("(prefers-reduced-motion: reduce)").matches;
if(tiltOK){document.querySelectorAll("[data-tilt]").forEach(card=>{const image=card.querySelector(".work-image");card.addEventListener("pointermove",e=>{const r=image.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;image.style.transform=`perspective(900px) rotateY(${x*3}deg) rotateX(${-y*3}deg) scale(1.01)`});card.addEventListener("pointerleave",()=>image.style.transform="")})}
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{const target=document.querySelector(a.getAttribute("href"));if(target){e.preventDefault();target.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})}}));
/* Portfolio gallery: paths match the uploaded repository filenames. */
(()=>{
 const grid=document.querySelector("#portfolio-grid"),filters=document.querySelector("#portfolio-filters"),modal=document.querySelector("#project-modal");
 if(!grid||!filters||!modal)return;
 const projects=[
  {file:"logos-01.jpg",folder:"",category:"logo-design",label:"LOGO DESIGN",title:"Logo designs — Collection 01",description:"A collection of logo concepts and identity designs.",client:"Client details not added",software:"Software details not added"},
  ...["BR-01.png","BR-02.png","BR-03.png"].map(file=>({file,folder:"brochure",category:"brochure",label:"BROCHURE",title:file.replace(".png",""),description:"Brochure design from the selected print portfolio."})),
  ...["BC-01.png","BC-02.png","BC-03.png","BC-04.png"].map(file=>({file,folder:"Business cards",category:"business-cards",label:"BUSINESS CARD",title:file.replace(".png",""),description:"Business card design from the selected print portfolio."})),
  ...["CT-01.png","CT-02.png"].map(file=>({file,folder:"certificate initiation",category:"certificate-initiation",label:"CERTIFICATE",title:file.replace(".png",""),description:"Certificate design from the selected portfolio."})),
  ...["IV-01.png","IV-02.png"].map(file=>({file,folder:"certificate initiation",category:"certificate-initiation",label:"INVITATION",title:file.replace(".png",""),description:"Invitation design from the selected portfolio."})),
  ...["FL-05.png","FL-06.png","FL-07.png","FX-01.png","FX-02.png","FX-03.png","FX-04.png"].map(file=>({file,folder:"flex banner",category:"flex-banner",label:"FLEX BANNER",title:file.replace(".png",""),description:"Large-format banner design from the selected print portfolio."})),
  ...["Lable-1-01.png","Lable-2-01.png","Lable-3-01.png","Lable-4-01.png"].map(file=>({file,folder:"Packaging",category:"packaging",label:"PACKAGING",title:file.replace(".png",""),description:"Packaging and label design from the selected portfolio."})),
  ...["ST-01.png","ST-02.png","ST-03.png","ST-04.png"].map(file=>({file,folder:"Stickers",category:"stickers",label:"STICKER",title:file.replace(".png",""),description:"Sticker design from the selected print portfolio."})),
  ...["ST-01.png","ST-02.png","ST-03.png"].map(file=>({file,folder:"standees",category:"standees",label:"STANDEE",title:file.replace(".png",""),description:"Standee design from the selected large-format portfolio."})),
  ...["FL-01.png","FL-02.png","FL-03.png","FL-04.png"].map(file=>({file,folder:"flyers",category:"flyers",label:"FLYER",title:file.replace(".png",""),description:"Flyer design from the selected print portfolio."})),
  ...["Book-01.png","Book-02.png","NO parking board.png"].map(file=>({file,folder:"Other Designs",category:"other-designs",label:"OTHER DESIGN",title:file.replace(/\.(png|jpg)$/i,""),description:"A selected graphic design project from the other designs collection."}))
 ];
 const encodePath=p=>p.split("/").map(encodeURIComponent).join("/");
 const imagePath=p=>p.folder?"images/"+encodePath(p.folder)+"/"+encodeURIComponent(p.file):"images/"+encodeURIComponent(p.file);
 const cardFor=(p,index)=>{
  const card=document.createElement("article");card.className="work-card reveal";card.dataset.category=p.category;
  const link=document.createElement("a");link.href="#project-modal";link.className="work-image portfolio-image";link.dataset.projectIndex=String(index);link.setAttribute("aria-label","Open "+p.title+" project details");
  const badge=document.createElement("span");badge.className="image-index";badge.textContent=String(index+1).padStart(2,"0")+" / "+p.label;
  const img=document.createElement("img");img.src=imagePath(p);img.alt=p.title+" — "+p.label.toLowerCase()+" portfolio artwork";img.loading="lazy";
  img.addEventListener("error",()=>{card.classList.add("image-missing");img.alt="Image file not found: "+p.file;});
  const view=document.createElement("span");view.className="view-project";view.textContent="VIEW PROJECT ↗";
  link.append(badge,img,view);
  const info=document.createElement("div");info.className="work-info";
  const left=document.createElement("div"),h=document.createElement("h3"),desc=document.createElement("p"),year=document.createElement("span");
  h.textContent=p.title;desc.textContent=p.label.toLowerCase().replace(/\b\w/g,m=>m.toUpperCase())+" · Selected portfolio work";year.textContent="2026";
  left.append(h,desc);info.append(left,year);card.append(link,info);
  card.classList.add("in-view");
  return card;
 };
 projects.forEach((p,index)=>grid.append(cardFor(p,index)));
 const empty=document.createElement("p");empty.className="portfolio-empty";empty.textContent="No flyer image filenames were included yet. Add the flyer files to this folder to show them here.";empty.hidden=true;grid.after(empty);
 const applyFilter=filter=>{
  let visible=0;
  grid.querySelectorAll(".work-card").forEach(card=>{const show=filter==="all"||card.dataset.category===filter;card.hidden=!show;if(show)visible++;});
  empty.hidden=!(filter==="flyers"&&visible===0);
 };
 filters.addEventListener("click",e=>{
  const button=e.target.closest("[data-filter]");if(!button)return;
  filters.querySelectorAll(".filter-btn").forEach(b=>b.classList.toggle("is-active",b===button));
  applyFilter(button.dataset.filter);
 });
 const image=modal.querySelector("#project-modal-image"),title=modal.querySelector("#project-modal-title"),kicker=modal.querySelector("#project-modal-kicker"),description=modal.querySelector("#project-modal-description");
 const client=modal.querySelector("#project-modal-client"),category=modal.querySelector("#project-modal-category"),tools=modal.querySelector("#project-modal-tools");
 const open=p=>{
  image.src=imagePath(p);image.alt=p.title+" — full-size project preview";
  title.textContent=p.title;kicker.textContent=p.label;description.textContent=p.description;
  if(client)client.textContent=p.client||"Client details not added";
  if(category)category.textContent=p.label;
  if(tools)tools.textContent=p.software||"Software details not added";
  modal.classList.add("is-open");modal.setAttribute("aria-hidden","false");document.body.classList.add("modal-open");
  modal.querySelector(".project-modal-close")?.focus();
 };
 const close=()=>{modal.classList.remove("is-open");modal.setAttribute("aria-hidden","true");document.body.classList.remove("modal-open");};
 grid.addEventListener("click",e=>{const link=e.target.closest("[data-project-index]");if(!link)return;e.preventDefault();open(projects[Number(link.dataset.projectIndex)]);});
 modal.querySelectorAll("[data-modal-close]").forEach(el=>el.addEventListener("click",close));
 document.addEventListener("keydown",e=>{if(e.key==="Escape"&&modal.classList.contains("is-open"))close();});
})();
