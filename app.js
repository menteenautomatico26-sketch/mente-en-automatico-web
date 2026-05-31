/* ===========================================================================
   MENTE EN AUTOMÁTICO — app.js v2.0
   Google Sheets + Apps Script Edition | Mayo 2026
   =========================================================================== */

/* ⚙️ CONFIGURACIÓN --------------------------------------------------------- */
const CONFIG = {
  instagram: "menteenautomatico",
  email: "menteautomatica26@gmail.com",
  paypalMe: "bautistajonathan701",        // → paypal.me/bautistajonathan701
  paypalEmail: "bautistajonathan701@gmail.com",
  driveGratis: "https://drive.google.com/drive/folders/1lcK1UlWkmmhX8HSX0Itmu1ydFhoz7tdi",
  links: {
    /* Pega aquí los links de Gumroad cuando los crees.
       Mientras estén vacíos, el botón abre PayPal.Me directamente. */
    p_pedidos:    "",
    p_factura:    "",
    p_dashboard:  "",
    p_inv_alerta: "",
    p_crm:        "",
    p_cobranza:   "",
    packAuto:     "",
    packPro:      "",
  }
};

/* CATÁLOGO — Google Sheets + Apps Script ---------------------------------- */
const PRODUCTS = [
  {
    id: "p_pedidos",
    emoji: "📋",
    name: "Sistema de Pedidos con Formulario",
    for: "Cualquier negocio con pedidos",
    usd: 15,
    badge: "APPS SCRIPT",
    feat: true,
    desc: "Comparte un formulario y los pedidos llegan solos a tu hoja. El cliente recibe confirmación automática — tú recibes una alerta al instante.",
    feats: [
      "Formulario listo para compartir con clientes",
      "Confirmación automática al cliente por correo",
      "Alerta al dueño con cada pedido nuevo"
    ]
  },
  {
    id: "p_factura",
    emoji: "📧",
    name: "Facturador con Envío Automático",
    for: "Freelance / servicios / tienda",
    usd: 15,
    badge: "APPS SCRIPT",
    feat: false,
    desc: "Llena los datos, presiona un botón y la factura en PDF llega al correo de tu cliente. Sin copiar y pegar.",
    feats: [
      "Genera PDF de factura profesional",
      "La envía al cliente con un clic",
      "Registra en historial automáticamente"
    ]
  },
  {
    id: "p_dashboard",
    emoji: "📊",
    name: "Dashboard de Ventas + Reporte Semanal",
    for: "Cualquier negocio",
    usd: 15,
    badge: "APPS SCRIPT",
    feat: false,
    desc: "Ve tus ventas en gráficas y recibe un resumen automático cada lunes antes de empezar la semana.",
    feats: [
      "Gráficas de ventas por semana y mes",
      "Reporte automático cada lunes a las 8am",
      "Ticket promedio y mejor día detectados"
    ]
  },
  {
    id: "p_inv_alerta",
    emoji: "📦",
    name: "Inventario con Alertas de Reposición",
    for: "Tienda / almacén / bodega",
    usd: 12,
    badge: "APPS SCRIPT",
    feat: false,
    desc: "Define el mínimo de cada producto y recibe un correo automático cuando hay que reponer. Sin revisar a mano.",
    feats: [
      "Correo automático cuando hay stock bajo",
      "Semáforo Rojo / Amarillo / Verde por producto",
      "Lista de reposición generada automáticamente"
    ]
  },
  {
    id: "p_crm",
    emoji: "🤝",
    name: "Mini CRM: Clientes y Seguimientos",
    for: "Ventas / servicios / freelance",
    usd: 18,
    badge: "APPS SCRIPT",
    feat: true,
    desc: "Registra clientes y negocios. Recibe recordatorios automáticos el día que tienes que llamar o escribir a cada uno.",
    feats: [
      "Pipeline de clientes con etapas",
      "Recordatorio diario de seguimientos pendientes",
      "Historial y valor estimado por cliente"
    ]
  },
  {
    id: "p_cobranza",
    emoji: "💰",
    name: "Cobranza con Recordatorios Automáticos",
    for: "Servicios / tienda / freelance",
    usd: 15,
    badge: "APPS SCRIPT",
    feat: false,
    desc: "Registra facturas y vencimientos. El sistema le manda recordatorios a tus clientes morosos sin que hagas nada.",
    feats: [
      "Detecta facturas vencidas automáticamente",
      "Email de cobro enviado solo al cliente",
      "Reporte de cartera pendiente para ti"
    ]
  }
];

/* PACKS ------------------------------------------------------------------- */
const PACKS = [
  {
    id: "packAuto",
    tag: "MÁS POPULAR",
    name: "Pack Automatización Esencial",
    count: "3 sistemas",
    usd: 35,
    old: 45,
    save: "Ahorras $10",
    items: [
      "📋 Sistema de Pedidos con Formulario",
      "📧 Facturador con Envío Automático",
      "📦 Inventario con Alertas de Reposición"
    ]
  },
  {
    id: "packPro",
    tag: "MEJOR VALOR",
    name: "Pack Negocio Completo",
    count: "6 sistemas",
    usd: 59,
    old: 90,
    save: "Ahorras $31",
    items: [
      "📋 Sistema de Pedidos con Formulario",
      "📧 Facturador con Envío Automático",
      "📊 Dashboard de Ventas + Reporte",
      "📦 Inventario con Alertas",
      "🤝 Mini CRM: Clientes y Seguimientos",
      "💰 Cobranza con Recordatorios"
    ]
  }
];

/* NOVEDADES --------------------------------------------------------------- */
const NEWS = [
  {
    id: "n4", tag: "Nuevo", date: "2026-05-31",
    title: "6 sistemas Google Sheets que trabajan solos",
    body: "Lanzamos 6 nuevos sistemas con Apps Script: pedidos con formulario, facturador automático, dashboard semanal, alertas de stock, CRM y cobranza automática. Sin saber programar — solo copiar, configurar y listo.",
    cta: { label: "Ver los sistemas →", href: "tienda.html" }
  },
  {
    id: "n3", tag: "Gratis", date: "2026-05-30",
    title: "9 plantillas de Excel completamente gratis",
    body: "Inventario, fiados, food cost, MRP, ventas, caja y más. Todas listas para usar, sin registro. Descárgalas directo desde Google Drive.",
    cta: { label: "Descargar gratis →", href: "https://drive.google.com/drive/folders/1lcK1UlWkmmhX8HSX0Itmu1ydFhoz7tdi" }
  },
  {
    id: "n2", tag: "Guía", date: "2026-05-28",
    title: "Apps Script: automatiza Google Sheets sin saber programar",
    body: "Google Apps Script es el motor detrás de los sistemas de automatización. No necesitas saber código — solo copiar el script, dar permisos y ya funciona. Setup en menos de 5 minutos.",
    cta: { label: "Ver los sistemas →", href: "tienda.html" }
  },
  {
    id: "n1", tag: "Novedad IA", date: "2026-05-27",
    title: "La IA le ahorra 20–40% de tiempo a las pymes que la usan",
    body: "En 2026 las pequeñas empresas que aplican IA en tareas repetitivas reportan ahorros de 20% a 40% de su tiempo operativo. La mayoría empieza con cosas simples: organizar inventario, resumir datos, responder mensajes.",
    cta: { label: "Ver herramientas →", href: "tienda.html" }
  }
];

const TAGCOLOR = {
  "Novedad IA": "#00bfff",
  "Nuevo":      "#00bfff",
  "Tip":        "#39d98a",
  "Guía":       "#ffd166",
  "Gratis":     "#39d98a",
  "Plantilla":  "#3fd8ff"
};

/* RENDER NOVEDADES -------------------------------------------------------- */
function renderNews(sel) {
  const c = document.querySelector(sel);
  if (!c) return;
  c.innerHTML = NEWS.slice(0, 3).map(p => {
    const col = TAGCOLOR[p.tag] || "#00bfff";
    const d = new Date(p.date + "T12:00:00");
    const fecha = d.toLocaleDateString("es-GT", { day: "2-digit", month: "long", year: "numeric" });
    const cta = p.cta
      ? `<a class="btn btn-ghost" style="margin-top:14px;align-self:flex-start" href="${p.cta.href}" ${p.cta.href.startsWith("http") ? 'target="_blank"' : ""}>${p.cta.label}</a>`
      : "";
    return `<article class="post reveal">
      <div class="post-meta">
        <span class="post-tag" style="color:${col};border-color:${col}">${p.tag}</span>
        <span class="post-date">${fecha}</span>
      </div>
      <h3>${p.title}</h3>
      <p>${p.body}</p>
      ${cta}
    </article>`;
  }).join("");
}

/* RENDER PRODUCTOS -------------------------------------------------------- */
function renderProducts(sel) {
  const c = document.querySelector(sel);
  if (!c) return;
  c.innerHTML = PRODUCTS.map(p => `
    <div class="card ${p.feat ? "feat" : ""} reveal">
      ${p.feat ? '<div class="badge">TOP</div>' : ""}
      <span class="script-badge">${p.badge}</span>
      <div class="emoji">${p.emoji}</div>
      <div class="for">${p.for}</div>
      <h3>${p.name}</h3>
      <p class="desc">${p.desc}</p>
      <ul>${p.feats.map(f => `<li>${f}</li>`).join("")}</ul>
      <div class="price">
        <span class="usd">$${p.usd}</span>
        <span class="q">USD · pago único</span>
      </div>
      <div class="actions">
        <button class="btn btn-primary" style="width:100%"
          onclick="buy('${p.id}','${p.name}',${p.usd})">
          Obtener por $${p.usd} →
        </button>
      </div>
    </div>`).join("");
}

/* RENDER PACKS ------------------------------------------------------------ */
function renderPacks(sel) {
  const c = document.querySelector(sel);
  if (!c) return;
  c.innerHTML = PACKS.map(p => `
    <div class="pack reveal" style="margin-bottom:22px">
      <div class="info">
        <span class="kicker">${p.tag} · ${p.count}</span>
        <h3>${p.name}</h3>
        <div class="pp">
          <span class="usd">$${p.usd}</span>
          <span class="old">$${p.old}</span>
          <span class="save">${p.save}</span>
        </div>
        <div class="plist">${p.items.map(x => `<div>✓ ${x}</div>`).join("")}</div>
        <button class="btn btn-primary"
          onclick="buy('${p.id}','${p.name}',${p.usd})">
          Obtener ${p.name} →
        </button>
      </div>
    </div>`).join("");
}

/* COMPRA ------------------------------------------------------------------ */
function buy(id, label, price) {
  const gumroad = CONFIG.links[id];
  if (gumroad && gumroad.trim()) {
    window.open(gumroad, "_blank");
    return;
  }
  /* Sin link de Gumroad → PayPal.Me directo */
  window.open(`https://paypal.me/${CONFIG.paypalMe}/${price}USD`, "_blank");
  openModal(label, price);
}

function openModal(label, price) {
  const m = document.getElementById("buyModal");
  if (!m) return;
  document.getElementById("modalLabel").textContent = label;
  document.getElementById("modalPrice").textContent = "$" + price;
  m.classList.add("open");
}

function closeModal() {
  const m = document.getElementById("buyModal");
  if (m) m.classList.remove("open");
}

/* PARTÍCULAS -------------------------------------------------------------- */
function particles() {
  const cv = document.getElementById("particles");
  if (!cv) return;
  const ctx = cv.getContext("2d");
  let w, h, pts;
  function size() {
    w = cv.width = innerWidth; h = cv.height = innerHeight;
    pts = Array.from({ length: Math.min(70, Math.floor(w / 22)) }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4,
      r: Math.random() * 1.6 + .6
    }));
  }
  function loop() {
    ctx.clearRect(0, 0, w, h);
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7);
      ctx.fillStyle = "rgba(0,191,255,.7)"; ctx.fill();
    }
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 120) {
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(30,144,255,${.12 * (1 - d / 120)})`; ctx.stroke();
        }
      }
    }
    requestAnimationFrame(loop);
  }
  size(); loop(); addEventListener("resize", size);
}

/* REVEAL ------------------------------------------------------------------ */
function reveal() {
  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); }),
    { threshold: .12 }
  );
  els.forEach(e => io.observe(e));
}

/* INIT -------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  particles();
  renderProducts("#productGrid");
  renderPacks("#packList");
  renderNews("#newsList");
  reveal();
  /* Mobile menu */
  const mb = document.querySelector(".menu-btn");
  if (mb) mb.addEventListener("click", () => {
    const n = document.querySelector(".nav nav");
    n.style.cssText = n.style.display === "flex"
      ? ""
      : "display:flex;flex-direction:column;position:absolute;top:64px;right:20px;background:#0a0a2e;padding:16px;border-radius:12px;border:1px solid #1b2350;z-index:30";
  });
});
