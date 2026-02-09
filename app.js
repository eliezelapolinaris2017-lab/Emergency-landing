/* ============================================
   24/7 Emergency — Side Landing (No vertical scroll)
   Edita SOLO CONFIG.
============================================ */
const CONFIG = {
  phone_e164: "+17876643079",
  wa_message:
    "Hola, necesito soporte de emergencia 24/7 para una propiedad Airbnb. " +
    "Dirección/área: _____. Problema: _____. ¿Pueden atender ahora?",

  // ✅ Fondo desde assets (cambia el archivo y listo)
  // Recomendado: assets/bg.jpg (1920x1080 o más)
  background_asset: "assets/bg.jpg"
};

function buildWhatsAppLink() {
  const msg = encodeURIComponent(CONFIG.wa_message);
  const digits = CONFIG.phone_e164.replace(/[^\d]/g, "");
  return `https://wa.me/${digits}?text=${msg}`;
}
function buildTelLink() {
  return `tel:${CONFIG.phone_e164}`;
}

function wireLinks() {
  const wa = buildWhatsAppLink();
  const tel = buildTelLink();

  const waIds = ["waTop","waHero","waServices","waHow","waClose"];
  const callIds = ["callTop","callHero","callServices","callHow","callClose"];

  waIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = wa;
  });
  callIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = tel;
  });

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
}

function setBackground() {
  document.documentElement.style.setProperty("--bgImage", `url("${CONFIG.background_asset}")`);
}

function setupSideNav() {
  const deck = document.getElementById("deck");
  const dots = Array.from(document.querySelectorAll(".side-nav .dot"));
  if (!deck || !dots.length) return;

  function goTo(id){
    const el = document.getElementById(id);
    if (!el) return;
    // scroll horizontal hacia el slide
    deck.scrollTo({ left: el.offsetLeft, behavior: "smooth" });
  }

  dots.forEach(btn => {
    btn.addEventListener("click", () => goTo(btn.dataset.go));
  });

  // activo por scroll
  const slides = ["s1","s2","s3","s4"].map(id => document.getElementById(id)).filter(Boolean);

  function markActive(){
    const x = deck.scrollLeft + deck.clientWidth * 0.5;
    let activeIndex = 0;
    slides.forEach((s, i) => {
      const start = s.offsetLeft;
      const end = start + s.clientWidth;
      if (x >= start && x < end) activeIndex = i;
    });
    dots.forEach((d,i)=> d.classList.toggle("active", i===activeIndex));
  }

  deck.addEventListener("scroll", () => requestAnimationFrame(markActive), { passive: true });
  markActive();
}

document.addEventListener("DOMContentLoaded", () => {
  setBackground();
  wireLinks();
  setupSideNav();
});
