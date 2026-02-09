const CONFIG = {
  phone_e164: "+17876643079",
  wa_message:
    "Hola, necesito soporte de emergencia 24/7 para una propiedad Airbnb. " +
    "Dirección/área: _____. Problema: _____. ¿Pueden atender ahora?",
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

function setBackground() {
  document.documentElement.style.setProperty("--bgImage", `url("${CONFIG.background_asset}")`);
}

function wireLinks() {
  const wa = buildWhatsAppLink();
  const tel = buildTelLink();

  const waIds = ["waTop","waHero","waServices","waHow","waClose"];
  const callIds = ["callTop","callHero","callServices","callHow","callClose"];

  waIds.forEach(id => { const el = document.getElementById(id); if (el) el.href = wa; });
  callIds.forEach(id => { const el = document.getElementById(id); if (el) el.href = tel; });

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
}

function setupDeckNav() {
  const deck = document.getElementById("deck");
  const prev = document.getElementById("prevBtn");
  const next = document.getElementById("nextBtn");
  const dots = Array.from(document.querySelectorAll(".side-nav .dot"));

  const ids = ["s1","s2","s3","s4"];
  const slides = ids.map(id => document.getElementById(id)).filter(Boolean);

  if (!deck || !slides.length) return;

  function currentIndex() {
    const x = deck.scrollLeft + deck.clientWidth * 0.5;
    let idx = 0;
    slides.forEach((s, i) => {
      const start = s.offsetLeft;
      const end = start + s.clientWidth;
      if (x >= start && x < end) idx = i;
    });
    return idx;
  }

  function goToIndex(i) {
    const idx = Math.max(0, Math.min(slides.length - 1, i));
    deck.scrollTo({ left: slides[idx].offsetLeft, behavior: "smooth" });
  }

  function goToId(id) {
    const el = document.getElementById(id);
    if (!el) return;
    deck.scrollTo({ left: el.offsetLeft, behavior: "smooth" });
  }

  function markActive() {
    const idx = currentIndex();
    dots.forEach((d, i) => d.classList.toggle("active", i === idx));

    // deshabilita flechas en extremos (UX pro)
    if (prev) prev.style.opacity = idx === 0 ? "0.35" : "1";
    if (next) next.style.opacity = idx === slides.length - 1 ? "0.35" : "1";
  }

  if (prev) prev.addEventListener("click", () => goToIndex(currentIndex() - 1));
  if (next) next.addEventListener("click", () => goToIndex(currentIndex() + 1));

  dots.forEach((btn) => {
    btn.addEventListener("click", () => goToId(btn.dataset.go));
  });

  // teclado: flechas izquierda/derecha
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goToIndex(currentIndex() - 1);
    if (e.key === "ArrowRight") goToIndex(currentIndex() + 1);
  });

  deck.addEventListener("scroll", () => requestAnimationFrame(markActive), { passive: true });
  markActive();
}

document.addEventListener("DOMContentLoaded", () => {
  setBackground();
  wireLinks();
  setupDeckNav();
});
