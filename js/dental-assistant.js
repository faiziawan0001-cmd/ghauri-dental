/* ===========================================================================
   Sarah — virtual dental assistant widget
   Bright Smiles Dental Clinic
   --------------------------------------------------------------------------
   Extracted from "dental-assistant-v5-sarah-luxury.html" and adapted to drop
   into the live site:
     - wrapped in an IIFE, so its helpers ($, CLINIC, open, ...) never clash
       with js/app.js (which also declares a global `$`)
     - injects its own markup (launcher SVG + chat panel) into <body>
     - reads the same clinic details used across the site
     - all free-form answers use the built-in flows (no backend needed);
       set CLINIC.aiEndpoint to a Worker URL later to enable live AI replies
   The matching stylesheet is css/dental-assistant.css (loaded in <head>).
   =========================================================================== */
(function () {
  "use strict";
  if (window.__sarahAssistant) return;      /* guard against a double include */
  window.__sarahAssistant = true;

  /* ---- Clinic settings: edit these for each client ---------------------- */
  const CLINIC = {
    name: "Bright Smiles Dental Clinic",
    phone: "+92 321 1048740",
    wa: "923211048740",
    hours: "Mon\u2013Sat 9am\u20138pm, Sunday 11am\u20135pm",
    aiEndpoint: "", /* paste your Worker URL here to enable free-form AI answers */
    treatments: [
      ["Cleaning & check-up", "From Rs 1,500"],
      ["Whitening", "From Rs 6,000"],
      ["Dental implant", "From Rs 45,000"],
      ["Braces / aligners", "From Rs 9,000"],
      ["Root canal", "From Rs 12,000"],
      ["Veneers (per tooth)", "From Rs 20,000"],
      ["Child check-ups", "From Rs 1,200"],
      ["Fillings", "From Rs 2,500"]
    ]
  };
  /* ----------------------------------------------------------------------- */

  /* ---- markup (launcher + panel) ---------------------------------------- */
  const MARKUP = `
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><linearGradient id="sbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1E4B49"/><stop offset="1" stop-color="#0F2625"/></linearGradient></defs><symbol id="sarah" viewBox="0 0 100 100"><rect width="100" height="100" fill="url(#sbg)"/><circle cx="50" cy="44" r="34" fill="#B08D4F" opacity=".16"/><path d="M29 48C24 72 28 84 38 88L62 88C72 84 76 72 71 48Z" fill="#2A1A15"/><path d="M10 100C12 80 30 73 50 73C70 73 88 80 90 100Z" fill="#F8F8F5"/><path d="M37 75L50 92L63 75C58 72 42 72 37 75Z" fill="#B08D4F"/><path d="M44 60H56V76C53 79 47 79 44 76Z" fill="#E7B58F"/><ellipse cx="50" cy="46" rx="16" ry="19" fill="#F1C6A4"/><path d="M32 48C28 26 42 19 54 21C69 23 71 38 68 48C66 38 58 31 46 33C38 35 34 40 32 48Z" fill="#2A1A15"/><ellipse cx="43" cy="48" rx="1.8" ry="2.2" fill="#2A1A15"/><ellipse cx="57" cy="48" rx="1.8" ry="2.2" fill="#2A1A15"/><path d="M39 43Q43 41 47 43M53 43Q57 41 61 43" stroke="#2A1A15" stroke-width="1.3" fill="none" stroke-linecap="round"/><circle cx="39" cy="54" r="3" fill="#E89A8A" opacity=".35"/><circle cx="61" cy="54" r="3" fill="#E89A8A" opacity=".35"/><path d="M44 56Q50 62 56 56Q50 59 44 56Z" fill="#fff" stroke="#B5524B" stroke-width="1.2" stroke-linejoin="round"/><circle cx="34" cy="54" r="1.8" fill="#D2B27A"/><circle cx="66" cy="54" r="1.8" fill="#D2B27A"/></symbol></svg>
<div id="lx">
  <section id="lx-panel" role="dialog" aria-label="Clinic assistant">
    <div class="hd">
      <div class="av"><svg viewBox="0 0 100 100" aria-hidden="true"><use href="#sarah"/></svg></div>
      <div><b>Sarah</b><small><span class="dot"></span>Virtual assistant \u00b7 replies instantly</small></div>
      <button class="x" id="lx-close" aria-label="Close chat">\u00d7</button>
    </div>
    <div class="msgs" id="msgs" aria-live="polite"></div>
    <div class="ft">
      <form id="form"><input id="inp" placeholder="Type, or tap the mic to talk" autocomplete="off" aria-label="Message"><button type="button" class="mic" id="mic" aria-label="Speak to Sarah"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg></button><button class="send" aria-label="Send">\u27a4</button></form>
      <div class="note">Sarah shares clinic information only and can\u2019t give medical advice.</div>
    </div>
  </section>
  <button id="lx-fab" aria-label="Talk to Sarah, virtual assistant"><svg class="ch" viewBox="0 0 100 160" aria-hidden="true">
<ellipse cx="50" cy="154" rx="24" ry="4" fill="#000" opacity=".28"/>
<path d="M30 40C26 64 30 74 38 76L62 76C70 74 74 64 70 40Z" fill="#2A1A15"/>
<path d="M36 98L35 148H47L50 112L53 148H65L64 98Z" fill="#1E4B49"/>
<ellipse cx="41" cy="150" rx="8" ry="3.5" fill="#D2B27A"/><ellipse cx="59" cy="150" rx="8" ry="3.5" fill="#D2B27A"/>
<rect x="45" y="52" width="10" height="12" rx="4" fill="#E7B58F"/>
<path d="M31 72C31 62 40 58 50 58S69 62 69 72L68 102H32Z" fill="#F8F6F0"/>
<path d="M43 59L50 80L57 59Z" fill="#14302F"/><path d="M50 80V102" stroke="#D2B27A" stroke-width="1"/>
<circle cx="50" cy="90" r="1.3" fill="#B08D4F"/><circle cx="50" cy="97" r="1.3" fill="#B08D4F"/><rect x="55" y="76" width="7" height="3.5" rx="1" fill="#D2B27A"/>
<path d="M33 68C25 74 24 88 32 96" stroke="#F8F6F0" stroke-width="8" stroke-linecap="round" fill="none"/>
<rect x="20" y="90" width="15" height="20" rx="2" fill="#B08D4F"/><rect x="22" y="93" width="11" height="15" rx="1" fill="#fff"/><path d="M24 97H31M24 100H31M24 103H29" stroke="#B08D4F" stroke-width=".8"/><circle cx="32" cy="98" r="4" fill="#F1C6A4"/>
<g class="wv"><path d="M67 68C77 68 82 58 81 46" stroke="#F8F6F0" stroke-width="8" stroke-linecap="round" fill="none"/><circle cx="81" cy="41" r="5" fill="#F1C6A4"/></g>
<ellipse cx="50" cy="38" rx="17" ry="19" fill="#F1C6A4"/>
<path d="M32 40C28 16 44 9 55 11C71 13 72 30 68 40C66 29 58 23 46 25C38 27 34 33 32 40Z" fill="#2A1A15"/>
<ellipse cx="43" cy="41" rx="1.9" ry="2.4" fill="#2A1A15"/><ellipse cx="57" cy="41" rx="1.9" ry="2.4" fill="#2A1A15"/>
<path d="M38 35Q43 33 47 35M53 35Q57 33 62 35" stroke="#2A1A15" stroke-width="1.3" fill="none" stroke-linecap="round"/>
<circle cx="39" cy="47" r="3" fill="#E89A8A" opacity=".35"/><circle cx="61" cy="47" r="3" fill="#E89A8A" opacity=".35"/>
<path d="M44 49Q50 55 56 49Q50 52 44 49Z" fill="#fff" stroke="#B5524B" stroke-width="1.2" stroke-linejoin="round"/>
<path d="M33 38C32 10 68 10 67 38" stroke="#14302F" stroke-width="2.6" fill="none"/>
<rect x="29.5" y="35" width="5" height="9" rx="2.5" fill="#14302F"/><rect x="65.5" y="35" width="5" height="9" rx="2.5" fill="#14302F"/>
<path d="M32 44C32 56 38 58 44 56" stroke="#14302F" stroke-width="1.6" fill="none"/><circle cx="45" cy="56" r="2.3" fill="#D2B27A"/>
<circle cx="34" cy="48" r="1.6" fill="#D2B27A"/><circle cx="66" cy="48" r="1.6" fill="#D2B27A"/>
<path class="sp" transform="translate(12 28)" d="M0-5Q0 0 5 0Q0 0 0 5Q0 0-5 0Q0 0 0-5Z" fill="#D2B27A"/><path class="sp s2" transform="translate(90 12)" d="M0-5Q0 0 5 0Q0 0 0 5Q0 0-5 0Q0 0 0-5Z" fill="#D2B27A"/><path class="sp" transform="translate(88 100) scale(.7)" d="M0-5Q0 0 5 0Q0 0 0 5Q0 0-5 0Q0 0 0-5Z" fill="#D2B27A"/>
</svg><span class="pill"><svg class="pi" viewBox="0 0 24 24" fill="none" stroke="#D2B27A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>Talk to Sarah<b>AI</b></span></button>
</div>`;

  document.body.insertAdjacentHTML("beforeend", MARKUP);

  /* ---- widget logic ----------------------------------------------------- */
  const $ = s => document.querySelector(s), msgs = $("#msgs"), lx = $("#lx");
  let booking = null, greeted = false, voiceOn = false, micOn = false;
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

  // iOS Safari only allows the first spoken utterance to happen inside a user gesture.
  // Speaking a silent one on the first tap "unlocks" speech for the rest of the session,
  // so the real replies (which arrive after a short typing delay) are allowed to play.
  let speechReady = false;
  function unlockSpeech() {
    if (speechReady || !window.speechSynthesis) return;
    speechReady = true;
    try { speechSynthesis.speak(new SpeechSynthesisUtterance(" ")); } catch (e) {}
  }

  function say(h) {
    if (!voiceOn || !window.speechSynthesis) return;
    const t = h.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (!t) return;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(t);
      u.lang = "en-GB";
      speechSynthesis.speak(u);
    } catch (e) { /* speech blocked or unsupported - chat still works */ }
  }

  const openPanel = v => { lx.classList.toggle("open", v); if (v && !greeted) { greeted = true; start(); } };
  $("#lx-fab").onclick = () => {
    const o = !lx.classList.contains("open");
    if (o) { unlockSpeech(); voiceOn = true; }  // unlock iOS speech + read replies aloud
    openPanel(o);
    if (o && micOn) listen();                   // resume the mic only if the user already tapped it
  };
  $("#lx-close").onclick = () => { openPanel(false); voiceOn = false; micOn = false; window.speechSynthesis && speechSynthesis.cancel(); };

  const scroll = () => setTimeout(() => msgs.scrollTop = msgs.scrollHeight, 30);
  const el = (h, c) => { const d = document.createElement("div"); d.className = c; d.innerHTML = h; msgs.appendChild(d); scroll(); return d; };
  const user = t => { const d = el("", "m u"); d.textContent = t; };
  const wait = ms => new Promise(r => setTimeout(r, ms));

  async function bot(h, c = "m b") {
    const t = el("<i></i><i></i><i></i>", "m b typing");
    await wait(550);
    t.remove();
    const d = el(h, c);
    if (c === "m b") say(h);
    return d;
  }

  function chips(list) {
    document.querySelectorAll("#lx .chips").forEach(c => c.remove());
    const d = el("", "chips");
    list.forEach(([l, fn]) => {
      const b = document.createElement("button");
      b.className = "chip";
      b.textContent = l;
      b.onclick = () => { user(l); d.remove(); fn(); };
      d.appendChild(b);
    });
  }

  const menu = () => chips([["Book an appointment", book1], ["Toothache or emergency", emergency], ["Treatments & prices", prices], ["Opening hours", hours], ["Chat on WhatsApp", wa]]);

  async function start() {
    await bot("Welcome to " + CLINIC.name + ". I\u2019m Sarah, the virtual assistant here. I can book your visit, share treatment prices or connect you with our team. Just say what you need, or tap an option.");
    menu();
  }

  async function book1() {
    booking = {};
    await bot("Lovely. Which treatment are you interested in?");
    chips([...CLINIC.treatments.map(t => [t[0], () => { booking.t = t[0]; book2(); }]), ["Not sure yet", () => { booking.t = "Consultation"; book2(); }]]);
  }
  async function book2() {
    await bot("Which day suits you best?");
    const d = [];
    for (let i = 1; d.length < 4; i++) { const x = new Date(); x.setDate(x.getDate() + i); if (x.getDay() !== 0) d.push(x); }
    chips(d.map(x => [x.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }), () => { booking.d = x.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" }); book3(); }]));
  }
  async function book3() {
    await bot("And what time? These are the open slots.");
    chips(["11:00 am", "1:30 pm", "4:00 pm", "6:30 pm"].map(t => [t, () => { booking.time = t; book4(); }]));
  }
  async function book4() {
    await bot("Almost done. Please type your full name and phone number, for example: Ayesha Khan, 0300 1234567.");
    booking.ask = true; $("#inp").focus();
  }
  async function confirm(info) {
    booking.who = info; booking.ask = false;
    const b = booking;
    await bot(`<h4>Request received</h4><div class="row"><span>Treatment</span><b>${esc(b.t)}</b></div><div class="row"><span>Date</span><b>${esc(b.d)}</b></div><div class="row"><span>Time</span><b>${esc(b.time)}</b></div><div class="row"><span>Patient</span><b>${esc(b.who)}</b></div>We\u2019ll send a confirmation and a reminder on WhatsApp.<br><a href="https://wa.me/${CLINIC.wa}?text=${encodeURIComponent("Hi, I booked " + b.t + " on " + b.d + " at " + b.time + ". Name: " + b.who)}" target="_blank" rel="noopener">Confirm on WhatsApp</a>`, "card");
    booking = null;
    chips([["Something else", menu]]);
  }
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  async function emergency() {
    await bot(`<h4>We\u2019re here for you</h4>For severe pain, swelling, a knocked-out tooth or bleeding, call us now. We keep same-day slots for emergencies.<br><a href="tel:${CLINIC.phone.replace(/\s/g, "")}">Call ${CLINIC.phone}</a>`, "card");
    chips([["Book earliest slot", book1], ["Back to menu", menu]]);
  }
  async function prices() {
    await bot("<h4>Treatment price guide</h4>" + CLINIC.treatments.map(t => `<div class="row"><span>${t[0]}</span><b>${t[1]}</b></div>`).join("") + "<small>Final quote is given after your consultation.</small>", "card");
    chips([["Book a consultation", book1], ["Back to menu", menu]]);
  }
  async function hours() {
    await bot(`We\u2019re open <b>${CLINIC.hours}</b>. Emergencies are seen on request, any day.`);
    chips([["Book an appointment", book1], ["Back to menu", menu]]);
  }
  async function wa() {
    await bot(`Our team replies on WhatsApp any time.<br><a class="cta" href="https://wa.me/${CLINIC.wa}" target="_blank" rel="noopener">Open WhatsApp</a>`);
    menu();
  }

  const hist = [];
  async function ai(t) {
    if (CLINIC.aiEndpoint) {
      try {
        const r = await fetch(CLINIC.aiEndpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: t, history: hist.slice(-8) }) });
        const j = await r.json();
        if (j.reply) { hist.push({ role: "user", content: t }, { role: "assistant", content: j.reply }); await bot(esc(j.reply)); return menu(); }
      } catch (e) {}
    }
    await bot("I can help with bookings, prices, hours and emergencies. For anything else, our team is a message away.");
    menu();
  }
  function route(t) {
    const s = t.toLowerCase();
    if (/pain|ache|swell|bleed|emergen|broken|knock/.test(s)) return emergency();
    if (/book|appoint|visit|schedule/.test(s)) return book1();
    if (/price|cost|fee|how much|implant|whiten|braces|veneer|filling|clean|root canal/.test(s)) return prices();
    if (/hour|open|time|when/.test(s)) return hours();
    if (/whats|human|talk|person|call/.test(s)) return wa();
    ai(t);
  }

  $("#form").onsubmit = e => {
    e.preventDefault();
    const v = $("#inp").value.trim();
    if (!v) return;
    $("#inp").value = "";
    user(v);
    booking && booking.ask ? confirm(v) : route(v);
  };

  const mic = $("#mic");
  function listen() {
    if (!SR) return;
    if (window.speechSynthesis && speechSynthesis.speaking) { setTimeout(listen, 400); return; }
    const r = new SR();
    r.lang = "en-GB"; voiceOn = true; micOn = true; mic.classList.add("rec");
    r.onresult = e => { const v = e.results[0][0].transcript; user(v); booking && booking.ask ? confirm(v) : route(v); };
    r.onend = r.onerror = () => mic.classList.remove("rec");
    try { r.start(); } catch (e) { mic.classList.remove("rec"); }
  }
  if (!SR) mic.hidden = true; else mic.onclick = () => { unlockSpeech(); listen(); };
})();
