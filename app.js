/* ============================================
   24/7 Emergency — Landing Page
   Edita SOLO esta configuración y ya.
============================================ */
const CONFIG = {
  // IMPORTANTE:
  // 1) Cambia este número al tuyo en formato E.164 (Puerto Rico = +1 + 787/939)
  phone_e164: "+17876643079",

  // Mensaje prellenado para WhatsApp (alto cierre)
  wa_message:
    "Hola, necesito soporte de emergencia 24/7 para una propiedad Airbnb. " +
    "Dirección/área: _____. Problema: _____. ¿Pueden atender ahora?",

  // Si quieres, cambia a tu país/idioma
  wa_lang: "es"
};

function buildWhatsAppLink() {
  const msg = encodeURIComponent(CONFIG.wa_message);
  // wa.me requiere el número SIN + y sin símbolos
  const digits = CONFIG.phone_e164.replace(/[^\d]/g, "");
  return `https://wa.me/${digits}?text=${msg}`;
}

function buildTelLink() {
  return `tel:${CONFIG.phone_e164}`;
}

function wireLinks() {
  const wa = buildWhatsAppLink();
  const tel = buildTelLink();

  const waIds = ["waTop","waHero","waCard","waBand","waFooter"];
  const callIds = ["callTop","callHero","callCard","callBand","callFooter"];

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

document.addEventListener("DOMContentLoaded", wireLinks);
