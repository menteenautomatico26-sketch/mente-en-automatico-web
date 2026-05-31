/* ===========================================================================
   MENTE EN AUTOMÁTICO — app.js
   Configuración de contacto + cobro, catálogo de productos, render y partículas.
   =========================================================================== */

/* ⚙️ CONFIGURACIÓN — EDITA SOLO ESTO ----------------------------------------
   - whatsapp: tu número con código de país, SIN signos. Guatemala = 502.
   - instagram: tu usuario sin @.
   - Para cada producto y el pack puedes pegar un LINK DE PAGO directo
     (Gumroad, PayPal.Me, Lemon Squeezy, etc.). Si lo dejas en "", el botón
     "Comprar" abrirá WhatsApp con el mensaje listo (venta por DM).
--------------------------------------------------------------------------- */
const CONFIG = {
  whatsapp: "",                      // ← Déjalo vacío: usamos Instagram como canal único
  instagram: "menteenautomatico",
  email: "menteautomatica26@gmail.com",
  // -----------------------------------------------------------------
  // COBRO INTERNACIONAL:
  //   Guatemala  → transferencia bancaria o Binance Pay (DM por Instagram)
  //   LatAm/mundo → Gumroad (acepta tarjetas y PayPal internacionales)
  //                 Cuando tengas tu cuenta en gumroad.com, pega aquí
  //                 el link de cada producto y el botón cobrará solo.
  // -----------------------------------------------------------------
  links: {
    p1:"", p2:"", p3:"", p4:"", p5:"", p6:"", p7:"",
    packPro:"", packLog:"", packCom:""
  }
};

/* CATÁLOGO ---------------------------------------------------------------- */
const PRODUCTS = [
  { id:"p5", emoji:"📒", name:"Control de Fiados", for:"Tienda / pulpería",
    usd:6, q:47, demo:"demo-fiados.html",
    desc:"Quién te debe, cuánto y desde cuándo. Estado automático: al día, por vencer, vencido o pagado.",
    feats:["Saldo y días calculados solos","Total por cobrar y monto vencido","Adiós al cuaderno"] },
  { id:"p4", emoji:"🏪", name:"Inventario + Margen de Tienda", for:"Tienda / negocio",
    usd:6, q:47, demo:"demo-inventario-tienda.html",
    desc:"Stock, costo, precio, margen en Q y %, valor del inventario y alerta de reposición.",
    feats:["Margen por producto","Alerta de bajo stock","Ganancia potencial total"] },
  { id:"p7", emoji:"📈", name:"Ventas Diarias", for:"Cualquier negocio",
    usd:6, q:47, demo:"demo-ventas.html",
    desc:"Convierte tus ventas del día en indicadores reales: ticket promedio, mejor día y tendencia de crecimiento.",
    feats:["Ticket promedio automático","Mejor día de venta detectado","Tendencia de crecimiento visible"] },
  { id:"p1", emoji:"📦", name:"Inventario por Días", for:"Logística / compras", feat:true,
    usd:10, q:78, desc:"Sabe qué reordenar en 30 segundos. Días de inventario, punto de reorden y semáforo automático.",
    feats:["Semáforo Reordenar/Vigilar/Óptimo","Punto de reorden calculado","Resumen automático"] },
  { id:"p3", emoji:"🌐", name:"Comparador Proveedores FOB", for:"Importación / compras",
    usd:10, q:78, desc:"Compara proveedores por costo REAL puesto en bodega (con flete y aduana). Marca la mejor opción.",
    feats:["Costo landed por unidad","Marca la mejor opción","Calcula tu ahorro"] },
  { id:"p6", emoji:"🍔", name:"Costo de Recetas (Food Cost)", for:"Restaurante / cocina",
    usd:13, q:101, desc:"Costo por porción, % de food cost y precio de venta sugerido para asegurar tu margen.",
    feats:["Precio sugerido automático","Food cost real vs objetivo","Costeo por ingrediente"] },
  { id:"p2", emoji:"🧮", name:"MRP de Compras", for:"Logística / abastecimiento", feat:true,
    usd:15, q:116, desc:"Qué pedir, cuánto y cuándo. Sugerencia de reorden + control de recepciones (¿llegó completo?).",
    feats:["Cantidad sugerida a pedir","Fecha límite de pedido","Control de recepciones y atrasos"] }
];

const PACKS = [
  { id:"packPro", tag:"MÁS VENDIDO", name:"PACK Operación Pro", count:"7 plantillas",
    usd:25, old:72, q:195, save:"Ahorras 65%",
    items:["Inventario por Días","MRP de Compras","Comparador FOB","Inventario + Margen Tienda","Control de Fiados","Food Cost","Ventas + KPIs"] },
  { id:"packLog", tag:"COMPRAS", name:"Pack Logística", count:"3 plantillas",
    usd:20, old:35, q:155, save:"Ahorras 43%",
    items:["Inventario por Días","MRP de Compras","Comparador FOB"] },
  { id:"packCom", tag:"NEGOCIO", name:"Pack Comerciante", count:"3 plantillas",
    usd:20.50, old:29, q:159, save:"Ahorras 29%",
    items:["Inventario + Margen Tienda","Control de Fiados","Ventas + KPIs"] }
];

/* NOVEDADES / BLOG --------------------------------------------------------
   Agrega un objeto arriba del array para publicar. 'tag' colorea la etiqueta.
   tags sugeridos: "Novedad IA", "Tip", "Guía", "Plantilla".
------------------------------------------------------------------------- */
const NEWS = [
  { id:"n3", tag:"Plantilla", date:"2026-05-30", title:"2 plantillas GRATIS para tu negocio",
    body:"Lancé dos plantillas gratis: Caja Diaria (cuánto entra, sale y te queda) e Inventario Express (qué reponer hoy). Funcionan completas y se calculan solas. Pídelas por DM con la palabra PLANTILLA.",
    cta:{label:"Pedir las gratis", href:"https://ig.me/m/menteenautomatico"} },
  { id:"n2", tag:"Tip", date:"2026-05-29", title:"3 cosas que le puedes pedir a la IA hoy para tu negocio",
    body:"1) 'Resúmeme las ventas de la semana en 3 frases'. 2) 'Según este inventario, dime qué reordenar'. 3) 'Escribe un mensaje amable pero firme para cobrarle a un cliente'. La IA no reemplaza tu criterio: te ahorra el trabajo aburrido.",
    cta:null },
  { id:"n1", tag:"Novedad IA", date:"2026-05-28", title:"La IA ya le ahorra 20-40% de tiempo a las pymes que la usan",
    body:"En 2026 las pequeñas empresas que aplican IA en tareas repetitivas reportan ahorros de 20% a 40% de su tiempo operativo. Lo interesante: la mayoría empieza con cosas simples — organizar inventario, resumir datos, responder mensajes. No necesitas ser técnico para empezar.",
    cta:{label:"Ver mis herramientas", href:"tienda.html"} },
];
const TAGCOLOR = {"Novedad IA":"#00bfff","Tip":"#39d98a","Guía":"#ffd166","Plantilla":"#3fd8ff"};

function renderNews(sel){
  const c=document.querySelector(sel); if(!c) return;
  c.innerHTML = NEWS.map(p=>{
    const col = TAGCOLOR[p.tag] || "#00bfff";
    const d = new Date(p.date+"T12:00:00");
    const fecha = d.toLocaleDateString("es-GT",{day:"2-digit",month:"long",year:"numeric"});
    const cta = p.cta?`<a class="btn btn-ghost" style="margin-top:14px" href="${p.cta.href}" ${p.cta.href.startsWith('http')?'target="_blank"':''}>${p.cta.label} →</a>`:"";
    return `<article class="post reveal">
      <div class="post-meta"><span class="post-tag" style="color:${col};border-color:${col}">${p.tag}</span><span class="post-date">${fecha}</span></div>
      <h3>${p.title}</h3>
      <p>${p.body}</p>${cta}
    </article>`;
  }).join("");
}

/* COMPRA: link de Gumroad si existe; si no, Instagram DM + modal --------- */
function buy(id, label, price){
  const link = CONFIG.links[id];
  if(link && link.trim()){ window.open(link, "_blank"); return; }
  // Sin link de pago → Instagram DM (funciona tanto para GT como internacional)
  window.open(`https://ig.me/m/${CONFIG.instagram}`,"_blank");
  openModal(label, price);
}
function openModal(label, price){
  const m=document.getElementById("buyModal"); if(!m) return;
  document.getElementById("modalLabel").textContent=label;
  document.getElementById("modalPrice").textContent="$"+price;
  // Opciones de pago según ubicación
  const isGT = Intl.DateTimeFormat().resolvedOptions().timeZone.includes("Guatemala");
  const payOpts = document.getElementById("modalPayOpts");
  if(payOpts){
    payOpts.innerHTML = isGT
      ? `<p style="color:var(--muted);font-size:13.5px;margin-top:8px">💳 <b>Guatemala:</b> transferencia bancaria o Binance Pay — escríbeme y te paso los datos.</p>`
      : `<p style="color:var(--muted);font-size:13.5px;margin-top:8px">🌎 <b>Internacional:</b> te acepto tarjeta, PayPal o cripto — escríbeme a Instagram y lo resolvemos.</p>`;
  }
  m.classList.add("open");
}
function closeModal(){const m=document.getElementById("buyModal");if(m)m.classList.remove("open");}

/* RENDER tienda ----------------------------------------------------------- */
function renderProducts(sel){
  const c=document.querySelector(sel); if(!c) return;
  c.innerHTML = PRODUCTS.map(p=>`
    <div class="card ${p.feat?'feat':''} reveal">
      ${p.feat?'<div class="badge">TOP</div>':''}
      <div class="emoji">${p.emoji}</div>
      <div class="for">${p.for}</div>
      <h3>${p.name}</h3>
      <p class="desc">${p.desc}</p>
      <ul>${p.feats.map(f=>`<li>${f}</li>`).join("")}</ul>
      <div class="price"><span class="usd">$${p.usd}</span><span class="q">Q${p.q}</span></div>
      <div class="actions">
        ${p.demo?`<a class="btn btn-ghost" href="${p.demo}" target="_blank">Ver demo</a>`:''}
        <button class="btn btn-primary" onclick="buy('${p.id}','${p.name}',${p.usd})">Comprar $${p.usd}</button>
      </div>
    </div>`).join("");
}
function renderPacks(sel){
  const c=document.querySelector(sel); if(!c) return;
  c.innerHTML = PACKS.map((p,i)=>`
    <div class="pack reveal" style="margin-bottom:22px">
      <div class="info">
        <span class="kicker">${p.tag} · ${p.count}</span>
        <h3>${p.name}</h3>
        <div class="pp"><span class="usd">$${p.usd}</span><span class="old">$${p.old}</span><span class="save">${p.save}</span><span class="q">≈ Q${p.q}</span></div>
        <div class="plist">${p.items.map(x=>`<div>✓ ${x}</div>`).join("")}</div>
        <button class="btn btn-primary" onclick="buy('${p.id}','${p.name}',${p.usd})">Comprar el ${p.name}</button>
      </div>
    </div>`).join("");
}

/* PARTÍCULAS (canvas ligero) --------------------------------------------- */
function particles(){
  const cv=document.getElementById("particles"); if(!cv) return;
  const ctx=cv.getContext("2d"); let w,h,pts;
  function size(){w=cv.width=innerWidth;h=cv.height=innerHeight;
    pts=Array.from({length:Math.min(70,Math.floor(w/22))},()=>({
      x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,r:Math.random()*1.6+.6}));}
  function loop(){ctx.clearRect(0,0,w,h);
    for(const p of pts){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,7);ctx.fillStyle="rgba(0,191,255,.7)";ctx.fill();}
    for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){
      const a=pts[i],b=pts[j],d=Math.hypot(a.x-b.x,a.y-b.y);
      if(d<120){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);
        ctx.strokeStyle=`rgba(30,144,255,${.12*(1-d/120)})`;ctx.stroke();}}
    requestAnimationFrame(loop);}
  size();loop();addEventListener("resize",size);
}
/* Reveal on scroll */
function reveal(){const els=document.querySelectorAll(".reveal");
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("in")}),{threshold:.12});
  els.forEach(e=>io.observe(e));}

document.addEventListener("DOMContentLoaded",()=>{
  particles();
  renderProducts("#productGrid");
  renderPacks("#packList");
  renderNews("#newsList");
  reveal();
  const mb=document.querySelector(".menu-btn");
  if(mb)mb.addEventListener("click",()=>{const n=document.querySelector(".nav nav");
    n.style.display=n.style.display==="flex"?"none":"flex";
    n.style.cssText="display:flex;flex-direction:column;position:absolute;top:64px;right:20px;background:#0a0a2e;padding:16px;border-radius:12px;border:1px solid #1b2350";});
});
