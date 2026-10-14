/* ===========================================================================
   Bright Smiles Dental Clinic - Premium Edition
   Designed & built by : Nexus Labs
   Date                : 2026-10-05
   Site                : Bright Smiles Dental Clinic, Lahore
   --------------------------------------------------------------------------
   (c) 2026-10-05 Nexus Labs. All rights reserved.
   --------------------------------------------------------------------------
   This script was delivered as part of a website build. It may not be
   copied, redistributed, resold or reused for any other client or project
   without written permission from the author.
   --------------------------------------------------------------------------
   Enquiries : faiziawan.0001@gmail.com
   =========================================================================== */
/* Bright Smiles Dental Clinic — shared behaviour for every page.
   Paste photo URLs or data: URIs into IMG below to replace the illustrated tiles. */
const IMG={
  reception:"images/clinic_interior.webp",
  rooms:"images/new-clinic.jfif",
  steril:"images/landing-image.webp",
  lounge:"images/dr-umar-new.jfif"
};
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const set=(s,h)=>{const e=$(s);if(e)e.innerHTML=h};

const P={sparkle:"M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2",shield:"M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z M9 12l2 2 4-4",heart:"M12 21s-8-5-8-11a4.5 4.5 0 018-3 4.5 4.5 0 018 3c0 6-8 11-8 11z",clock:"M12 7v5l3 2M12 3a9 9 0 100 18 9 9 0 000-18z",tag:"M3 12V4h8l10 10-8 8zM7.5 7.5h.01",user:"M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c0-4 4-6 8-6s8 2 8 6",scan:"M4 8V5a1 1 0 011-1h3M16 4h3a1 1 0 011 1v3M20 16v3a1 1 0 01-1 1h-3M8 20H5a1 1 0 01-1-1v-3M8 12h8",zap:"M13 2L4 14h7l-1 8 9-12h-7z"};
const ic=k=>`<div class="ic"><svg viewBox="0 0 24 24"><path d="${P[k]}"/></svg></div>`;

/* Responsive images: the Unsplash URLs already carry a w= parameter, so one
   source becomes several widths without adding any new asset. Declared up here
   because the card templates below are called before the slider section runs. */
const srcset=u=>{if(!u)return"";const p=u.replace(/([?&]w=)\d+/,"$1{W}");return [400,600,900,1200].map(w=>p.replace("{W}",w)+" "+w+"w").join(", ")};
const SRV_SIZES="(max-width:560px) 90vw, (max-width:820px) 46vw, 340px";
const WK_SIZES="(max-width:600px) 90vw, (max-width:1024px) 46vw, 420px";

const S=[["Cleaning","General","Scale and polish to protect your gums.","30 min",15,"sparkle",["Exam and X-ray","Ultrasonic scaling","Polish and fluoride"],["How often?","Every six months for most people."]],
["Whitening","Cosmetic","Up to 8 shades brighter in one visit.","60 min",60,"zap",["Gum protection","Gel and LED light","Aftercare kit"],["Is it sensitive?","Mild, short-lived sensitivity is common."]],
["Implants","Restorative","A permanent replacement for missing teeth.","2+ visits",450,"shield",["3D scan and plan","Titanium post placed","Crown fitted after healing"],["How long do they last?","With good care, decades."]],
["Braces and aligners","Orthodontics","Straighter teeth, in metal or clear.","6–18 months",90,"scan",["Digital scan","Custom plan preview","Check-ups every 6 weeks"],["Are aligners invisible?","Nearly. Most people will not notice them."]],
["Root canal","Restorative","Relieve pain and save the natural tooth.","60–90 min",120,"heart",["Numb the area","Clean the canal","Seal and crown"],["Does it hurt?","No more than a filling, with modern anaesthesia."]],
["Veneers","Cosmetic","Thin porcelain shells for a flawless smile.","2 visits",200,"sparkle",["Smile design","Minimal prep","Bond the veneers"],["Can I choose the shade?","Yes, you approve a preview first."]],
["Child check-ups","Pediatric","Friendly first visits, sealants and fluoride.","30 min",12,"user",["Meet and play","Gentle exam","Tips for parents"],["First visit age?","Around the first birthday."]],
["Fillings","General","Tooth-coloured, natural-looking repairs.","45 min",25,"tag",["Numb","Remove decay","Shape and polish"],["Are they safe?","Yes, mercury-free composite is used."]]];

const R=[["Hira A.","I was terrified of dentists. Dr. Umar Liaqat made it painless and kind."],["Bilal R.","My aligners finished two months early and the results are perfect."],["Mariam S.","My kids actually ask to go back. That says everything."],["Usman T.","Clear pricing, no surprises, and a great implant result."],["Noor F.","Whitening in one hour. Friends keep asking what I changed."],["Zain K.","An emergency toothache fixed the same afternoon. Thank you."]];

/* Self-hosted, optimized 16:9 cover art for each treatment (images/services/).
   Each slug has a 640w and 1280w WebP so the grid stays crisp on retina and
   light on mobile. Swap any slug's files to drop in the clinic's own photos. */
const SERV_IMG = {
  "Cleaning": "cleaning",
  "Whitening": "whitening",
  "Implants": "implants",
  "Braces and aligners": "braces-aligners",
  "Root canal": "root-canal",
  "Veneers": "veneers",
  "Child check-ups": "child-checkups",
  "Fillings": "fillings"
};
const card=(a,i)=>{
  const slug = SERV_IMG[a[0]] || "";
  const price = (a[4]*100).toLocaleString();
  let media = slug
    ? '<div class="svc-media"><img src="images/services/'+slug+'-1280.webp" srcset="images/services/'+slug+'-640.webp 640w, images/services/'+slug+'-1280.webp 1280w" sizes="'+SRV_SIZES+'" alt="'+a[0]+' treatment at Bright Smiles Dental Clinic" loading="lazy" decoding="async" width="1280" height="720"><span class="svc-tag">'+a[1]+'</span></div>'
    : '<div class="svc-media"><div class="svc-fallback">'+ic(a[5])+'</div><span class="svc-tag">'+a[1]+'</span></div>';
  return '<div class="card svc h" style="cursor:pointer" tabindex="0" role="button" aria-haspopup="dialog" data-i="'+i+'">'+media+'<div class="svc-body"><h3>'+a[0]+'</h3><p>'+a[2]+'</p><div class="svc-meta"><span class="svc-price">From Rs '+price+'</span><span class="svc-link">View details <i class="fa-solid fa-arrow-right"></i></span></div></div></div>';
};

/* Dialog helpers. Calling showModal() on an already-open <dialog> throws, and
   every "Book" button on the site routes through here. */
const openDialog=d=>{
  if(!d||d.open)return;
  /* Always start from a clean form. Done on open rather than on the dialog's
     close event, which is not dispatched consistently. */
  const form=$("#bf"),ok=$("#ok");
  if(form)form.hidden=false;
  if(ok)ok.hidden=true;
  if(d.id==="bk"&&window.__bkReset)window.__bkReset();
  if(d.showModal)d.showModal();else d.setAttribute("open","");
  /* No scroll-lock class here on purpose: the close event is unreliable, and
     a class left behind would freeze the page for good. The
     html:has(dialog:modal) rule in the stylesheet handles it instead. */
};
const closeDialog=d=>{if(!d||!d.open)return;if(d.close)d.close();else d.removeAttribute("open")};
/* Service currently open in the #sd details modal. Carried over to the booking
   form (pre-selected dropdown) and to the WhatsApp deep link by the modal CTAs. */
let sdSvc="";
let bookingCtx=null;
/* Renders (or clears) the "Your selection" summary inside the booking dialog and
   wires an optional WhatsApp deep link. Injected here so every page gets it. */
const renderBookingSummary=(svc,ctx)=>{
  const bf=$("#bf");if(!bf)return;
  const prev=bf.querySelector(".bk-summary");if(prev)prev.remove();
  if(!svc)return;
  const units=ctx&&ctx.units>0?ctx.units:0;
  const unitTxt=units?" · "+units+" unit"+(units>1?"s":""):"";
  const est=ctx&&ctx.estimate>0?" · est. <b class=\"s-p\">PKR "+ctx.estimate.toLocaleString()+"</b>":"";
  const mo=ctx&&ctx.months?(ctx.monthly>0?ctx.monthly:Math.round((ctx.estimate||0)/ctx.months)):0;
  const plan=ctx&&ctx.months?" (PKR "+mo.toLocaleString()+"/mo over "+ctx.months+" months)":"";
  const el=document.createElement("div");
  el.className="bk-summary";
  el.innerHTML="<i class=\"fa-solid fa-circle-check\" aria-hidden=\"true\"></i><div><div class=\"s-t\">Your selection</div><div class=\"s-m\">"+svc+unitTxt+est+plan+" — final price confirmed after consultation</div></div>";
  bf.prepend(el);
};
window.openBooking=(svc,ctx)=>{
  bookingCtx={svc:svc||"",ctx:ctx||null};
  const sel=$("#s");
  if(sel&&svc&&[...sel.options].some(o=>o.value===svc))sel.value=svc;
  renderBookingSummary(svc,ctx);
  openDialog(document.getElementById("bk"));
};
window.closeDialog=closeDialog;
/* Details modal -> booking form, with that service pre-selected. */
window.bookService=()=>{closeDialog(document.getElementById("sd"));openBooking(sdSvc)};

const open=e=>{const c=e.target.closest("[data-i]");if(!c)return;const a=S[c.dataset.i];if(!a)return;set("#sb",`<h2>${a[0]}</h2><p>${a[2]}</p><p><b>Duration:</b> ${a[3]}</p><h3>Steps</h3><div class="tl">${a[6].map(x=>`<p>${x}</p>`).join("")}</div><details open><summary>${a[7][0]}</summary><p>${a[7][1]}</p></details>`);sdSvc=a[0];const wa=$("#sd-wa");if(wa)wa.href="https://wa.me/923211048740?text="+encodeURIComponent("Hi! I would like to book an appointment for "+a[0]);openDialog(document.getElementById("sd"))};

/* --- home: featured services, why-us, before/after, reviews --- */
set("#svp",S.slice(0,6).map(card).join(""));
const svp=$("#svp");if(svp)svp.onclick=open;
set("#why",[["heart","Gentle, pain-free care","Modern anaesthesia and a calm approach."],["tag","Clear pricing","See the full cost before treatment."],["clock","Same-week visits","Urgent slots open every day."],["shield","Strict sterilisation","Hospital-grade protocols throughout."]].map(a=>`<div class="card">${ic(a[0])}<h3>${a[1]}</h3><p>${a[2]}</p></div>`).join(""));

/* --- services: filters, grid, cost estimator --- */
const tb=$("#tb"),sv=$("#sv");
if(tb&&sv){
  const cats=["All",...new Set(S.map(x=>x[1]))];
  tb.innerHTML=cats.map((c,i)=>`<button type="button" class="${i?"":"on"}">${c}</button>`).join("");
  const show=c=>{sv.innerHTML=S.map((a,i)=>[a,i]).filter(([a])=>c=="All"||a[1]==c).map(([a,i])=>card(a,i)).join("")};
  show("All");
  sv.onclick=open;
  tb.onclick=e=>{if(e.target.tagName!=="BUTTON")return;[...tb.children].forEach(b=>b.classList.remove("on"));e.target.classList.add("on");show(e.target.textContent)};
}
/* The "Service" dropdown lives in the booking dialog, which is on every page —
   so it has to be filled on every page, not just the services page. */
const svcSel=$("#s");
if(svcSel)svcSel.innerHTML=S.map(x=>`<option>${x[0]}</option>`).join("");
/* Homepage pre-footer CTA form also carries the same service list. */
const ctaSel=$("#ctaService");
if(ctaSel)ctaSel.innerHTML='<option value="">Select Service</option>'+S.map(x=>`<option>${x[0]}</option>`).join("");
/* Estimator: treatments priced per unit vs a single fixed price. Add or remove a
   treatment here — the value is the word used for one unit (Teeth or Implants).
   Anything not listed is a one-off fixed price and hides the quantity slider. */
const PER_UNIT={"Fillings":"Teeth","Root canal":"Teeth","Veneers":"Teeth","Implants":"Implants"};
/* Set ZERO_INTEREST to false if the clinic does not offer interest-free instalments. */
const ZERO_INTEREST=false;
const esSel=$("#es"),eq=$("#eq"),ev=$("#ev"),eo=$("#eo"),eemi=$("#eemi"),elab=$("#elab"),ewa=$("#ewa");
if(esSel&&eq&&ev&&eo){
  esSel.innerHTML=S.map((x,i)=>`<option value="${i}">${x[0]}</option>`).join("");
  const eqField=eq.closest(".field");
  const monthsWrap=$("#emo"),monthsBtns=monthsWrap?[].slice.call(monthsWrap.querySelectorAll(".mo-btn")):[];
  let months=6;
  const fill=()=>{const p=(eq.value-eq.min)/(eq.max-eq.min)*100;eq.style.setProperty("--fill",p+"%")};
  const est=()=>{const a=S[esSel.value];if(!a)return;
    const per=PER_UNIT[a[0]];/* undefined = fixed price */
    if(eqField)eqField.hidden=!per;
    const q=per?+eq.value||1:1;
    const total=a[4]*q*100,monthly=Math.round(total/months);
    ev.textContent=q;eo.textContent=total.toLocaleString();
    if(elab)elab.textContent=per||"";
    if(eemi)eemi.textContent="PKR "+monthly.toLocaleString()+"/mo over "+months+" months"+(ZERO_INTEREST?" (0% available)":"");
    if(ewa){
      let m="Hi! I would like to book "+a[0];
      if(per)m+=" ("+q+" "+per.toLowerCase()+")";
      m+=", estimated PKR "+total.toLocaleString()+" over "+months+" months.";
      ewa.href="https://wa.me/923211048740?text="+encodeURIComponent(m);
    }
    eo.classList.remove("pulse");void eo.offsetWidth;eo.classList.add("pulse");
    fill()};
  const setMonths=m=>{months=m;monthsBtns.forEach(b=>b.setAttribute("aria-pressed",+b.dataset.m===m?"true":"false"));est()};
  monthsBtns.forEach(b=>b.addEventListener("click",()=>setMonths(+b.dataset.m)));
  esSel.onchange=eq.oninput=est;est();
  /* Contextual handoff: pass the selected treatment, units (per-unit only), estimate and plan. */
  window.bookEstimate=()=>{const a=S[esSel.value];if(!a){openBooking();return}
    const per=PER_UNIT[a[0]],q=per?+eq.value||1:1,total=a[4]*q*100;
    const ctx={estimate:total,months:months,monthly:Math.round(total/months)};
    if(per)ctx.units=q;
    openBooking(a[0],ctx)};
}

/* --- before/after sliders (home + work) --- */
const teeth=n=>`<svg viewBox="0 0 24 24"><use href="#t"/></svg>`.repeat(n);
const ba=t=>`<div class="card"><div class="ba"><div class="b">${teeth(5)}<em style="left:10px">Before</em></div><div class="a">${teeth(5)}<em style="right:10px">After</em></div><i></i><input type="range" min="0" max="100" value="50" aria-label="Compare before and after"></div><h3 style="margin:14px 0 0">${t}</h3></div>`;
const wk0=$("#wk0");if(wk0)wk0.innerHTML=ba("Teeth whitening");

const WORK_DATA = [
  { name: "Sarah's Wedding Smile", cat: "Veneers", desc: "Sarah wanted a brighter, more symmetrical smile for her wedding. Using 8 custom porcelain veneers, we achieved a natural, radiant look.", img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop" },
  { name: "Ahmed's Transformation", cat: "Aligners", desc: "Ahmed corrected severe crowding over 14 months with clear aligners, entirely discreetly without metal braces.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" },
  { name: "Fatima's Restoration", cat: "Implants", desc: "A seamless replacement of a missing front tooth using a titanium implant and custom hand-layered ceramic crown.", img: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop" },
  { name: "Omar's Refresh", cat: "Whitening", desc: "A dramatic 6-shade improvement in just one in-clinic session, completely rejuvenating his overall appearance.", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop" },
  { name: "Aisha's Makeover", cat: "Makeover", desc: "A combination of gum contouring and cosmetic bonding to fix uneven edges and correct a gummy smile.", img: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=800&auto=format&fit=crop" },
  { name: "Hassan's Repair", cat: "Veneers", desc: "Quick and minimally invasive repair of chipped front teeth using high-end, color-matched composite bonding.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop" }
];

const storyCard = (s) => `
<div class="story-card" data-cat="${s.cat}">
  <div class="story-ba">
    <img src="${s.img}" srcset="${srcset(s.img)}" sizes="${WK_SIZES}" class="b-img" alt="Before" loading="lazy" decoding="async" width="1200" height="900">
    <img src="${s.img}" srcset="${srcset(s.img)}" sizes="${WK_SIZES}" class="a-img" alt="After" loading="lazy" decoding="async" width="1200" height="900">
    <em style="left:16px">Before</em>
    <em style="right:16px">After</em>
    <i></i>
    <input type="range" min="0" max="100" value="50" aria-label="Compare before and after of ${s.name}">
  </div>
  <div class="story-content">
    <span class="story-cat">${s.cat}</span>
    <h3 class="story-title">${s.name}</h3>
    <p class="story-desc">${s.desc}</p>
    <a href="#book" class="story-cta" onclick="openBooking(); return false;">Book similar treatment <i class="fa-solid fa-arrow-right"></i></a>
  </div>
</div>
`;

const wk=$("#wk");
const wkf=$("#wk-filters");
if(wk && wkf) {
  wk.innerHTML = WORK_DATA.map(storyCard).join("");
  const cats = ["All", ...new Set(WORK_DATA.map(x => x.cat))];
  wkf.innerHTML = cats.map((c,i) => `<button type="button" class="${i===0?'on':''}">${c}</button>`).join("");
  wkf.onclick = (e) => {
    if(e.target.tagName !== "BUTTON") return;
    [...wkf.children].forEach(b => b.classList.remove("on"));
    e.target.classList.add("on");
    const c = e.target.textContent;
    const cards = wk.querySelectorAll(".story-card");
    cards.forEach(card => {
      card.style.display = (c === "All" || card.dataset.cat === c) ? "block" : "none";
    });
  };
} else if (wk) {
  wk.innerHTML=["Teeth whitening","Veneers","Aligners","Cosmetic bonding","Gum contouring","Full smile makeover"].map(ba).join("");
}

/* --- home: smile gallery teaser (explore-style image cards) --------------- */
const wkHome=$("#wk-home");
if(wkHome){
  const teaser=WORK_DATA.slice(0,3);
  wkHome.innerHTML=teaser.map(s=>{
    const line=(s.desc.split(".")[0]||s.desc).trim()+".";
    return `<a href="work.html" class="smile-card js-rev">
      <img src="${s.img}" srcset="${srcset(s.img)}" sizes="${WK_SIZES}" alt="${s.name} — ${s.cat} result at Bright Smiles Dental Clinic" loading="lazy" decoding="async" width="1200" height="900">
      <div class="smile-ov">
        <h3>${s.name}</h3>
        <p>${line}</p>
      </div>
    </a>`;
  }).join("");
}
/* Reference-style scroll reveal: sections rise into place as they enter view. */
const revs=$$(".js-rev, .fade-in, .fade-in-left, .fade-in-right, .stagger");
if(revs.length){
  if("IntersectionObserver" in window&&!matchMedia("(prefers-reduced-motion: reduce)").matches){
    const rObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");rObs.unobserve(e.target)}}),{threshold:.15,rootMargin:"0px 0px -40px 0px"});
    revs.forEach(el=>rObs.observe(el));
  }else{
    revs.forEach(el=>el.classList.add("in"));
  }
}

/* --- one-line CTA banner headings -----------------------------------------
   The banner h2 is nowrap (see styles.css), so a long heading would clip on
   narrow screens. Scale it down to the banner's inner width instead — per
   page, per viewport. Re-runs when the web font lands and on resize. */
const fitCTAHeadings=()=>{
  const fit=(h,box)=>{
    if(!box)return;
    h.style.fontSize="";
    const cs=getComputedStyle(box);
    const avail=box.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight);
    const w=h.scrollWidth;
    if(avail>0&&w>avail)h.style.fontSize=Math.floor(parseFloat(getComputedStyle(h).fontSize)*avail/w)+"px";
  };
  $$(".consult-strip h2").forEach(h=>fit(h,h.closest(".consult-strip")));
  $$(".fit-line").forEach(h=>fit(h,h.closest(".sh-line")||h.parentElement));
};
fitCTAHeadings();
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fitCTAHeadings);
let fitCTO;addEventListener("resize",()=>{clearTimeout(fitCTO);fitCTO=setTimeout(fitCTAHeadings,150)},{passive:true});

/* --- before/after slider behaviour (mouse, touch and keyboard) ------------ */
/* The slider is a real <input type="range"> stretched over the whole frame, so
   it stays keyboard and screen-reader friendly for free. CSS gives it
   touch-action:pan-y, which means a vertical swipe still scrolls the page while
   a horizontal drag moves the divider. */
const syncBA=(box,v)=>{
  if(!box)return;
  const layer=box.querySelector(".a,.a-img,.ec-a"),handle=box.querySelector("i");
  if(layer)layer.style.clipPath=`inset(0 0 0 ${v}%)`;
  if(handle)handle.style.left=v+"%";
};
document.addEventListener("input",e=>{
  const t=e.target;
  if(!t||t.tagName!=="INPUT"||t.type!=="range")return;
  const box=t.closest(".ba,.story-ba,.explore-card-ba");
  if(!box)return;
  syncBA(box,t.value);
},true);
/* Tapping the frame focuses the range first — some mobile browsers only start
   tracking the drag once the control has focus. No preventDefault(), so the
   page keeps its normal vertical scroll. */
document.addEventListener("pointerdown",e=>{
  const t=e.target;
  if(!t||t.tagName==="INPUT")return;
  const box=t.closest(".ba,.story-ba,.explore-card-ba");
  if(!box)return;
  const r=box.querySelector('input[type="range"]');
  if(r)r.focus({preventScroll:true});
},{passive:true});

/* --- about: team --- */
set("#tm",[["Dr. Umar Liaqat","Lead Dentist &amp; Founder","BDS, MSc · Implants · RCT · Smile restoration","fa-user-doctor","images/dr-umar-new.jfif"],["Dr. Omar Siddiqui","Orthodontist","Aligners, braces &amp; bite correction · MOrth","fa-tooth"],["Dr. Sara Malik","Paediatric Dentist","Child dentistry &amp; prevention · BDS, MDS","fa-child"],["Sana Yousaf","Dental Hygienist","Scaling, whitening &amp; gum care","fa-spa"]].map(a=>`<div class="tmc"><div class="tmi">${a[4]?`<img src="${a[4]}" alt="${a[0]}" loading="lazy">`:`<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#t"/></svg>`}</div><div class="tmb"><h3>${a[0]}</h3><div class="rl"><i class="fa-solid ${a[3]}"></i> ${a[1]}</div><p>${a[2]}</p></div></div>`).join(""));

/* --- clinic: gallery, technology --- */
const pic=(k,t,g)=>`<div class="pic" style="--g:${IMG[k]?`url(${IMG[k]})`:g}"><svg viewBox="0 0 24 24"><use href="#t"/></svg><span>${t}</span></div>`;
set("#gal",[pic("reception","Reception and lounge","linear-gradient(135deg,#a8d5f2,#3B8FC9)"),pic("rooms","Treatment rooms","linear-gradient(135deg,#7fb6e0,#1E3A6E)"),pic("steril","Sterilisation suite","linear-gradient(135deg,#cfe9fb,#5aa5d8)"),pic("lounge","Kids' corner","linear-gradient(135deg,#9ad0f0,#2c78b4)")].join(""));
set("#tech",[["scan","Digital X-ray","Low radiation, instant results."],["tag","3D intraoral scanner","No messy impressions."],["zap","Laser dentistry","Gentler gum care, faster healing."]].map(a=>`<div class="card">${ic(a[0])}<h3>${a[1]}</h3><p>${a[2]}</p></div>`).join(""));

/* --- clinic: "Plan your visit" — click-to-load map + live open badge ----- */
/* The Google Maps embed ships a large script payload and swallows the first
   scroll gesture on touch screens, so it is only built once the visitor asks
   for it. The address/directions links stay usable without ever loading it. */
document.addEventListener("click",e=>{
  const b=e.target.closest("[data-map-load]");
  if(!b)return;
  const box=b.closest(".map-wrap"),src=box&&box.dataset.map;
  if(!src)return;
  box.innerHTML=`<iframe src="${src}" title="Google Map — Bright Smiles Dental Clinic, DHA Phase 6, Lahore" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>`;
},{passive:true});

/* Live "Open now / Closed" pill, evaluated in the clinic's own timezone so it
   stays correct for visitors browsing from abroad. */
const vst=$("#visit-status");
if(vst&&typeof Intl!=="undefined"&&Intl.DateTimeFormat){
  try{
    const p=Object.fromEntries(new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Karachi",weekday:"short",hour:"2-digit",minute:"2-digit",hour12:false}).formatToParts(new Date()).filter(x=>x.type!=="literal").map(x=>[x.type,x.value]));
    const WD=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],d=WD.indexOf(p.weekday);
    const mins=(Number(p.hour)%24)*60+Number(p.minute);
    const fmt=m=>{const h=Math.floor(m/60),ap=h>=12?"PM":"AM";return `${h%12||12}:${String(m%60).padStart(2,"0")} ${ap}`};
    const open=d===0?[660,1020]:[540,1200]; /* Sun 11:00–17:00 · Mon–Sat 9:00–20:00 */
    const on=d>-1&&mins>=open[0]&&mins<open[1];
    const nextOpen=n=>fmt(n===0?660:540);
    const txt=on?`Open now · closes ${fmt(open[1])}`
      :(d<0||mins<open[0])?`Closed · opens ${nextOpen(d)}`
      :`Closed · opens ${WD[(d+1)%7]} ${nextOpen((d+1)%7)}`;
    vst.hidden=false;
    vst.className="visit-status"+(on?"":" is-closed");
    vst.textContent=txt;
  }catch(err){}
}

/* --- testimonials: single pausable, labelled carousel --- */

const tc=$("#testimonials-carousel");
if(tc){
  const N=R.length;
  tc.setAttribute('role','region');
  tc.setAttribute('aria-roledescription','carousel');
  tc.setAttribute('aria-label','Patient testimonials');
  const stars=`<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`.repeat(5);
  tc.innerHTML = R.map((r,i) => {
    const init = r[0].split(' ').map(n=>n[0]).join('');
    return `<div class="testimonial-card ${i===0?'active':''}" data-idx="${i}" role="group" aria-roledescription="slide" aria-label="Testimonial ${i+1} of ${N}">
      <div class="testimonial__stars" aria-hidden="true">${stars}</div>
      <blockquote class="testimonial__quote">"${r[1]}"</blockquote>
      <div class="testimonial__author">
        <div class="testimonial__avatar" aria-hidden="true">${init}</div>
        <div class="testimonial__meta">
          <div class="testimonial__name">${r[0]}</div>
          <div class="testimonial__role">Verified Patient</div>
        </div>
      </div>
    </div>`;
  }).join("") + `
    <div class="testimonials__controls">
      <button type="button" class="testimonials__ctrl-btn" id="t-prev" aria-label="Previous testimonial"><i class="fa-solid fa-chevron-left" aria-hidden="true"></i></button>
      <div class="testimonials__dots">
        ${R.map((_,i)=>`<button type="button" class="testimonials__dot ${i===0?'active':''}" data-dot="${i}" aria-label="Show testimonial ${i+1} of ${N}"${i===0?' aria-current="true"':''}></button>`).join('')}
      </div>
      <button type="button" class="testimonials__ctrl-btn" id="t-next" aria-label="Next testimonial"><i class="fa-solid fa-chevron-right" aria-hidden="true"></i></button>
      <button type="button" class="testimonials__ctrl-btn" id="t-toggle" aria-label="Pause automatic rotation"><i class="fa-solid fa-pause" aria-hidden="true"></i></button>
    </div>
    <p class="sr-only" aria-live="polite"></p>
  `;
  let ci=0, ct=null, userPaused=false, hovered=false, focused=false;
  const cards = tc.querySelectorAll('.testimonial-card');
  const dots = tc.querySelectorAll('.testimonials__dot');
  const toggle = tc.querySelector('#t-toggle');
  const live = tc.querySelector('.sr-only');
  const stop = () => { if(ct){ clearInterval(ct); ct=null; } };
  const shouldRun = () => !userPaused && !hovered && !focused;
  const start = () => { stop(); if(shouldRun()) ct = setInterval(()=>go(ci+1), 5500); };
  const setPaused = (p) => {
    userPaused = p;
    toggle.setAttribute('aria-label', p ? 'Resume automatic rotation' : 'Pause automatic rotation');
    toggle.querySelector('i').className = 'fa-solid fa-' + (p ? 'play' : 'pause');
    start();
  };
  const go = (i) => {
    if(i<0) i=N-1; if(i>=N) i=0; ci=i;
    cards.forEach((c,j) => c.classList.toggle('active', j===ci));
    dots.forEach((d,j) => {
      d.classList.toggle('active', j===ci);
      if(j===ci) d.setAttribute('aria-current','true'); else d.removeAttribute('aria-current');
    });
    live.textContent = 'Testimonial ' + (ci+1) + ' of ' + N;
    start();
  };
  tc.addEventListener('click', (e) => {
    if(e.target.closest('#t-prev')) return go(ci-1);
    if(e.target.closest('#t-next')) return go(ci+1);
    if(e.target.closest('#t-toggle')) return setPaused(!userPaused);
    const dot = e.target.closest('.testimonials__dot');
    if(dot) go(+dot.dataset.dot);
  });
  tc.addEventListener('keydown', (e) => {
    if(e.key==='ArrowLeft')  { e.preventDefault(); go(ci-1); }
    if(e.key==='ArrowRight') { e.preventDefault(); go(ci+1); }
  });
  /* Don't rotate out from under someone who is reading, hovering or tabbing. */
  tc.addEventListener('mouseenter', () => { hovered=true;  start(); });
  tc.addEventListener('mouseleave', () => { hovered=false; start(); });
  tc.addEventListener('focusin',   () => { focused=true;  start(); });
  tc.addEventListener('focusout',  (e) => { if(!tc.contains(e.relatedTarget)){ focused=false; start(); } });
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) setPaused(true);
  else start();
  live.textContent = 'Testimonial 1 of ' + N;
}

/* --- animated counters (home stats) --- */
const cnt=el=>{const n=parseFloat(el.dataset.count),sfx=el.dataset.suffix||"",dec=+(el.dataset.decimals||0),t0=performance.now();(function f(t){const p=Math.min(1,(t-t0)/1600),v=n*(1-Math.pow(1-p,3));el.textContent=(dec?v.toFixed(dec):Math.round(v).toLocaleString())+sfx;if(p<1)requestAnimationFrame(f)})(t0)};
const cObs=$$("[data-count]").length&&"IntersectionObserver" in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){cnt(e.target);cObs.unobserve(e.target)}}),{threshold:.5}):null;
$$("[data-count]").forEach(el=>cObs?cObs.observe(el):cnt(el));

/* --- header, mobile nav, dark mode --- */
const hdr=document.querySelector("header"),mn=$("#mn"),nav=$("#nav");
const NAV_MQ=matchMedia("(max-width: 980px)");
if(mn&&nav&&hdr){
  mn.setAttribute("aria-controls","nav");
  mn.setAttribute("aria-label","Open menu");
  const setMenu=o=>{
    nav.classList.toggle("open",o);
    hdr.classList.toggle("mo",o);
    mn.setAttribute("aria-expanded",o?"true":"false");
    mn.setAttribute("aria-label",o?"Close menu":"Open menu");
    mn.innerHTML = o ? "&#10005;" : "&#9776;";
    /* Stop the page scrolling behind the open menu. */
    document.documentElement.classList.toggle("lock",o);
  };
  mn.onclick=()=>setMenu(!nav.classList.contains("open"));
  /* Close when a link is tapped. */
  nav.addEventListener("click",e=>{if(e.target.closest("a"))setMenu(false)});
  /* Escape closes it and returns focus to the button that opened it. */
  document.addEventListener("keydown",e=>{
    if(e.key==="Escape"&&nav.classList.contains("open")){setMenu(false);mn.focus()}
  });
  /* Close on backdrop tap outside nav/mn and when the layout goes back to desktop. */
  document.addEventListener("click",e=>{
    if(nav.classList.contains("open")&&!nav.contains(e.target)&&!mn.contains(e.target))setMenu(false);
  });
  NAV_MQ.addEventListener&&NAV_MQ.addEventListener("change",e=>{if(!e.matches)setMenu(false)});
  addEventListener("resize",()=>{if(!NAV_MQ.matches)setMenu(false)},{passive:true});
}
/* Anything marked role="button" that is not a real button must still work
   with Enter and Space (service cards, video cards). */
document.addEventListener("keydown",e=>{
  if(e.key!=="Enter"&&e.key!==" "&&e.key!=="Spacebar")return;
  const t=e.target.closest&&e.target.closest('[role="button"]');
  if(!t||t.tagName==="BUTTON"||t.tagName==="A")return;
  e.preventDefault();
  t.click();
});
if(hdr)addEventListener("scroll",()=>hdr.classList.toggle("sc",scrollY>24),{passive:true});
const th=$("#th");
if(th){
  const isDark=()=>getComputedStyle(document.documentElement).getPropertyValue("--bg").trim()==="#0b1526";
  const paint=()=>{th.innerHTML=isDark()?'<i class="fa-solid fa-sun" aria-hidden="true"></i>':'<i class="fa-solid fa-moon" aria-hidden="true"></i>';};
  const spin=()=>{th.classList.remove("spin");void th.offsetWidth;th.classList.add("spin");};
  paint();
  th.setAttribute("aria-pressed",isDark()?"true":"false");
  th.onclick=()=>{const r=document.documentElement,next=isDark()?"light":"dark";r.dataset.theme=next;th.setAttribute("aria-pressed",next==="dark"?"true":"false");paint();spin();try{localStorage.setItem("theme",next)}catch(e){}};
}

/* --- booking form: time slots, validation, success screen, WhatsApp confirm ---
   Works with the existing dialog markup (#bk, #bf, #go, #n, #p, #s, #d, #e1-#e3, #ok)
   on every page, so no HTML changes are needed. The new time-slot picker and the
   success screen are built here, and their styles are injected from this file. */
const CLINIC_WA="923211048740",CLINIC_NAME="Bright Smiles";
const bkDlg=$("#bk"),bf=$("#bf"),goBtn=$("#go");
const bkOldOk=$("#ok");
if(goBtn&&bf&&bkOldOk){
  const nIn=$("#n"),pIn=$("#p"),dIn=$("#d"),sSel=$("#s"),e1=$("#e1"),e2=$("#e2"),e3=$("#e3");
  let slot="";

  const st=document.createElement("style");
  st.textContent=
"#bk{width:min(560px,calc(100vw - 24px))}"+
"#bk h2{font-size:clamp(24px,5vw,32px);line-height:1.1}"+
"#bk .btn.alt{border:1px solid rgba(100,130,170,.45)}"+
".bk-slots{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:6px}"+
".bk-slot{padding:11px 6px;border:1px solid rgba(100,130,170,.45);border-radius:14px;background:transparent;color:inherit;font:inherit;font-weight:600;font-size:14px;line-height:1.3;cursor:pointer;text-align:center}"+
".bk-slot small{display:block;font-weight:500;font-size:12px;opacity:.7}"+
".bk-slot[aria-pressed=true]{background:#2b6fb0;border-color:#2b6fb0;color:#fff}"+
".bk-slot[aria-pressed=true] small{opacity:.9}"+
".bk-slot:focus-visible{outline:2px solid #3b8fd4;outline-offset:2px}"+
"#ok[hidden]{display:none}"+
"#ok{text-align:center}"+
".bk-check{width:68px;height:68px;display:block;margin:6px auto 12px}"+
".bk-check circle{fill:none;stroke:#1aa760;stroke-width:3;stroke-dasharray:166;stroke-dashoffset:166;animation:bkdraw .6s .1s forwards}"+
".bk-check path{fill:none;stroke:#1aa760;stroke-width:4;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:48;stroke-dashoffset:48;animation:bkdraw .4s .6s forwards}"+
"@keyframes bkdraw{to{stroke-dashoffset:0}}"+
"#ok h3{margin:0 0 6px;font-size:24px}"+
".bk-sub{margin:0 0 16px;opacity:.8}"+
".bk-sum{text-align:left;background:rgba(59,143,212,.1);border-radius:16px;padding:4px 18px;margin-bottom:18px}"+
".bk-row{display:flex;justify-content:space-between;gap:12px;padding:10px 0;border-bottom:1px solid rgba(100,130,170,.25);font-size:15px}"+
".bk-row:last-child{border:0}"+
".bk-row span{opacity:.75}.bk-row b{text-align:right}"+
".bk-act{display:flex;gap:12px;flex-wrap:wrap;justify-content:center}"+
".bk-wa{background:#25d366;color:#fff;border:0;text-decoration:none;flex:1 1 220px;text-align:center}"+
"@media(prefers-reduced-motion:reduce){.bk-check circle,.bk-check path{animation:none;stroke-dashoffset:0}}";
  document.head.appendChild(st);

  /* Time-slot picker, inserted after the date field. */
  const sp=document.createElement("div");
  sp.innerHTML='<label id="bk-tl">Preferred time</label><div class="bk-slots" role="group" aria-labelledby="bk-tl">'+
    [["Morning","9am – 12pm"],["Afternoon","12pm – 4pm"],["Evening","4pm – 8pm"]]
      .map(a=>'<button type="button" class="bk-slot" aria-pressed="false" data-val="'+a[0]+' ('+a[1]+')">'+a[0]+'<small>'+a[1]+'</small></button>').join("")+
    '</div><div class="err" id="e4"></div>';
  e3.after(sp);
  const e4=$("#e4");
  sp.addEventListener("click",e=>{
    const b=e.target.closest(".bk-slot");if(!b)return;
    sp.querySelectorAll(".bk-slot").forEach(x=>x.setAttribute("aria-pressed","false"));
    b.setAttribute("aria-pressed","true");slot=b.dataset.val;e4.textContent="";
  });

  /* Success screen replaces the old one-line message. */
  const done=document.createElement("div");
  done.id="ok";done.hidden=true;done.setAttribute("aria-live","polite");
  done.innerHTML='<svg class="bk-check" viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="25"/><path d="M14 27l8 8 16-17"/></svg>'+
    '<h3 id="ok-t">Request received</h3>'+
    '<p class="bk-sub">One last step: confirm on WhatsApp so the clinic can lock in your slot.</p>'+
    '<div class="bk-sum" id="ok-sum"></div>'+
    '<div class="bk-act"><a class="btn bk-wa" id="ok-wa" target="_blank" rel="noopener noreferrer">Confirm on WhatsApp</a>'+
    '<button type="button" class="btn alt" onclick="closeDialog(document.getElementById(\'bk\'))">Close</button></div>';
  bkOldOk.replaceWith(done);

  const pad=n=>String(n).padStart(2,"0");
  const todayStr=()=>{const t=new Date();return t.getFullYear()+"-"+pad(t.getMonth()+1)+"-"+pad(t.getDate())};
  /* Accepts 0300-1234567, 03001234567, +92 300 1234567, 923001234567. */
  const cleanPhone=v=>{
    let d=v.replace(/[\s\-()]/g,"");
    if(d.indexOf("+92")===0)d="0"+d.slice(3);
    else if(d.indexOf("92")===0&&d.length===12)d="0"+d.slice(2);
    return /^03\d{9}$/.test(d)?d:null;
  };
  const prettyPhone=p=>p.slice(0,4)+"-"+p.slice(4);

  /* Called every time the dialog opens (see openDialog): start from a clean form. */
  window.__bkReset=()=>{
    nIn.value="";pIn.value="";dIn.value="";dIn.min=todayStr();
    e1.textContent="";e2.textContent="";e3.textContent="";e4.textContent="";
    slot="";sp.querySelectorAll(".bk-slot").forEach(x=>x.setAttribute("aria-pressed","false"));
  };

  const submit=()=>{
    const n=nIn.value.trim(),p=cleanPhone(pIn.value.trim()),d=dIn.value;
    const okName=n.length>=2,okDate=!!d&&d>=todayStr();
    e1.textContent=okName?"":"Enter your name.";
    e2.textContent=p?"":"Enter a valid mobile number like 0300-1234567.";
    e3.textContent=okDate?"":(d?"Choose today or a later date.":"Choose a date.");
    e4.textContent=slot?"":"Pick a time of day.";
    if(!(okName&&p&&okDate&&slot)){
      const first=!okName?nIn:!p?pIn:!okDate?dIn:null;
      if(first)first.focus();else sp.scrollIntoView({block:"center"});
      return;
    }
    const service=sSel?sSel.value:"";
    const ref="BS-"+Math.floor(1000+Math.random()*9000);
    const niceDate=new Date(d+"T00:00").toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short",year:"numeric"});
    const ctx=bookingCtx&&bookingCtx.svc===service?bookingCtx.ctx:null;

    /* Hook for a backend: listen for this event (or add a fetch here) to save the booking. */
    const booking={ref:ref,name:n,phone:p,service:service,date:d,slot:slot};
    document.dispatchEvent(new CustomEvent("booking:submit",{detail:booking}));

    $("#ok-t").textContent="Request received, "+n.split(/\s+/)[0]+"!";
    const rows=[["Treatment",service],["Date",niceDate],["Time",slot],["Phone",prettyPhone(p)],["Reference","#"+ref]];
    const sum=$("#ok-sum");sum.textContent="";
    rows.forEach(r=>{const row=document.createElement("div"),k=document.createElement("span"),v=document.createElement("b");
      row.className="bk-row";k.textContent=r[0];v.textContent=r[1];row.append(k,v);sum.appendChild(row)});

    let msg="Hello "+CLINIC_NAME+", I just requested an appointment.\n\nName: "+n+"\nPhone: "+prettyPhone(p)+"\nService: "+service;
    if(ctx&&ctx.units>0)msg+=" ("+ctx.units+" unit"+(ctx.units>1?"s":"")+")";
    if(ctx&&ctx.estimate>0)msg+="\nEstimate: PKR "+ctx.estimate.toLocaleString();
    if(ctx&&ctx.months)msg+="\nPlan: PKR "+(ctx.monthly>0?ctx.monthly:Math.round((ctx.estimate||0)/ctx.months)).toLocaleString()+"/mo over "+ctx.months+" months";
    msg+="\nDate: "+niceDate+"\nTime: "+slot+"\nRef: #"+ref;
    $("#ok-wa").href="https://wa.me/"+CLINIC_WA+"?text="+encodeURIComponent(msg);

    bf.hidden=true;done.hidden=false;
  };
  goBtn.onclick=submit;
  /* Enter in a text field submits (but not when a slot or other button has focus). */
  bf.addEventListener("keydown",e=>{if(e.key==="Enter"&&e.target.tagName!=="BUTTON"&&e.target.tagName!=="TEXTAREA"){e.preventDefault();submit()}});
}

/* --- homepage pre-footer CTA booking form --- */
const ctaForm=$("#ctaForm");
if(ctaForm){
  const cN=$("#ctaName"),cP=$("#ctaPhone"),cE=$("#ctaEmail"),cD=$("#ctaDate");
  const ce1=$("#ctaErr1"),ce2=$("#ctaErr2"),ce3=$("#ctaErr3"),ce4=$("#ctaErr4");
  const ok=$("#ctaOk"),fields=$("#ctaFields"),reset=$("#ctaReset");
  const vPhone=v=>/^[+\d\s-]{7,}$/.test(v);
  const vEmail=v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const clearErrs=(...els)=>els.forEach(el=>{if(el)el.textContent=""});
  ctaForm.addEventListener("submit",e=>{
    e.preventDefault();
    const n=cN?cN.value.trim():"",p=cP?cP.value.trim():"",em=cE?cE.value.trim():"",d=cD?cD.value:"";
    if(ce1)ce1.textContent=n?"":"Enter your name.";
    if(ce2)ce2.textContent=vPhone(p)?"":"Enter a valid phone number.";
    if(ce3)ce3.textContent=vEmail(em)?"":"Enter a valid email address.";
    if(ce4)ce4.textContent=d?"":"Choose a date.";
    if(n&&vPhone(p)&&vEmail(em)&&d){
      if(fields)fields.hidden=true;
      if(ok){
        ok.hidden=false;
        const nm=ok.querySelector(".cs-ok-name");
        if(nm)nm.textContent=n;
      }
      ctaForm.reset();
    }
  });
  if(reset)reset.addEventListener("click",()=>{
    if(fields)fields.hidden=false;
    if(ok)ok.hidden=true;
    clearErrs(ce1,ce2,ce3,ce4);
  });
}

/* --- hero treatment strip: chevron-tab stepper (homepage) ------------------
   The five services sit in one track; two identical copies are appended so the
   strip can step forward or back one card at a time and wrap without a seam.
   Auto-advances on a timer, yields to hover/focus, and never auto-plays under
   prefers-reduced-motion (the arrows still work). Clones are aria-hidden so
   assistive tech reads each service once. */
const stripEl=$("[data-strack]");
if(stripEl){
  const stripRoot=stripEl.closest(".strip");
  const originals=Array.prototype.slice.call(stripEl.children);
  const N=originals.length;
  for(let c=0;c<2;c++)originals.forEach(o=>{const cl=o.cloneNode(true);cl.setAttribute("aria-hidden","true");stripEl.appendChild(cl);});
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cardW=()=>originals[0].getBoundingClientRect().width;
  let idx=N,timer=null,hold=0;
  const paint=anim=>{
    stripEl.style.transition=anim&&!reduce?"transform .5s cubic-bezier(.4,0,.2,1)":"none";
    stripEl.style.transform="translateX("+(-idx*cardW())+"px)";
  };
  const next=()=>{idx++;paint(true);hold=setTimeout(()=>{if(idx>=2*N){idx-=N;paint(false)}},reduce?0:520)};
  const prev=()=>{idx--;paint(true);hold=setTimeout(()=>{if(idx<=0){idx+=N;paint(false)}},reduce?0:520)};
  const play=()=>{if(reduce)return;clearInterval(timer);timer=setInterval(next,2400)};
  const stop=()=>clearInterval(timer);
  stripRoot.querySelectorAll("[data-dir]").forEach(b=>b.addEventListener("click",()=>{(+b.dataset.dir>0?next:prev)();play();}));
  stripRoot.addEventListener("mouseenter",stop);
  stripRoot.addEventListener("mouseleave",play);
  stripRoot.addEventListener("focusin",stop);
  stripRoot.addEventListener("focusout",e=>{if(!stripRoot.contains(e.relatedTarget))play()});
  window.addEventListener("resize",()=>{clearTimeout(hold);paint(false)});
  paint(false);
  play();
}