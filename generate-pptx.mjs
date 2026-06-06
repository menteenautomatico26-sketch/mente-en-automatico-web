import PptxGenJS from 'pptxgenjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, 'pptx');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

// ── COLORES DE MARCA ──────────────────────────────────────────────
const C = {
  bg:      '050D1A',   // fondo principal
  bgCard:  '0A1628',   // fondo tarjeta
  bgLight: 'F0F4FF',   // fondo claro (para slides de código)
  neon:    '00BFFF',   // azul neón
  neon2:   '0077FF',   // azul medio
  cyan:    '38BDF8',   // cyan claro
  ink:     'E2E8F0',   // texto principal
  muted:   '94A3B8',   // texto secundario
  accent:  'FFD700',   // dorado
  red:     'FF5050',   // rojo alerta
  green:   '00E676',   // verde ok
  tikRed:  'FF0050',   // TikTok rojo
  white:   'FFFFFF',
  dark:    '020810',
};

// ── HELPERS ──────────────────────────────────────────────────────
function slide(prs, opts = {}) {
  const s = prs.addSlide();
  s.background = { color: opts.bg || C.bg };
  return s;
}

function addLogo(s) {
  s.addText('⚡ Mente en Automático', {
    x: 0.3, y: 0.08, w: 4, h: 0.3,
    fontSize: 9, bold: true, color: C.neon, fontFace: 'Calibri',
  });
}

function badge(s, text, x, y, color = C.neon, bg = '0A1F35') {
  s.addShape('roundRect', { x, y, w: text.length * 0.085 + 0.3, h: 0.28, fill: { color: bg }, line: { color, width: 1 }, rectRadius: 0.14 });
  s.addText(text, { x: x + 0.05, y: y + 0.03, w: text.length * 0.085 + 0.2, h: 0.22, fontSize: 8, bold: true, color, fontFace: 'Calibri', align: 'center' });
}

function sectionTitle(s, tag, title, subtitle, y = 0.9) {
  s.addText(tag, { x: 0.5, y, w: 8.5, h: 0.3, fontSize: 9, bold: true, color: C.neon, fontFace: 'Calibri', charSpacing: 2 });
  s.addText(title, { x: 0.5, y: y + 0.3, w: 8.5, h: 0.7, fontSize: 26, bold: true, color: C.white, fontFace: 'Calibri', breakLine: false });
  if (subtitle) s.addText(subtitle, { x: 0.5, y: y + 1.0, w: 8.5, h: 0.4, fontSize: 13, color: C.muted, fontFace: 'Calibri', italic: true });
}

function codeBox(s, lines, x, y, w, h, label) {
  s.addShape('roundRect', { x, y, w, h, fill: { color: '020810' }, line: { color: C.neon2, width: 1 }, rectRadius: 0.12 });
  if (label) s.addText(label, { x: x + 0.15, y: y + 0.1, w: w - 0.3, h: 0.22, fontSize: 8, bold: true, color: C.neon, fontFace: 'Courier New', charSpacing: 2 });
  const codeY = label ? y + 0.32 : y + 0.1;
  s.addText(lines, { x: x + 0.15, y: codeY, w: w - 0.3, h: h - (label ? 0.45 : 0.2), fontSize: 9.5, color: C.cyan, fontFace: 'Courier New', lineSpacingMultiple: 1.5, valign: 'top' });
}

function calloutBox(s, icon, text, x, y, w) {
  s.addShape('roundRect', { x, y, w, h: 0.68, fill: { color: '061525' }, line: { color: C.neon2, width: 1 }, rectRadius: 0.12 });
  s.addText(icon, { x: x + 0.12, y: y + 0.12, w: 0.35, h: 0.44, fontSize: 18 });
  s.addText(text, { x: x + 0.5, y: y + 0.1, w: w - 0.62, h: 0.5, fontSize: 11, color: C.muted, fontFace: 'Calibri', valign: 'middle' });
}

function footer(s, num, total) {
  s.addText(`${num} / ${total}`, { x: 8.8, y: 5.1, w: 0.8, h: 0.25, fontSize: 8, color: C.muted, align: 'right', fontFace: 'Calibri' });
  s.addShape('line', { x: 0.4, y: 5.05, w: 9.2, h: 0, line: { color: '0A1F35', width: 0.5 } });
}

// ── PORTADA ───────────────────────────────────────────────────────
function makeCover(prs, guideNum, titleLine1, titleLine2, subtitle, seriesLabel) {
  const s = slide(prs);

  // Degradado lateral decorativo
  s.addShape('rect', { x: 0, y: 0, w: 0.06, h: 5.63, fill: { type: 'gradient', gradColors: [{ color: C.neon, position: 0 }, { color: C.neon2, position: 100 }], gradType: 'linear', gradAngle: 270 } });
  s.addShape('rect', { x: 0.06, y: 0, w: 0.04, h: 5.63, fill: { color: '061525' } });

  // Círculo decorativo fondo
  s.addShape('ellipse', { x: 7.5, y: -1.2, w: 3.8, h: 3.8, fill: { color: '0A1F35' }, line: { color: C.neon2, width: 1 } });
  s.addShape('ellipse', { x: 7.8, y: -0.9, w: 3.2, h: 3.2, fill: { color: '061830' }, line: { color: C.neon, width: 0.5 } });

  addLogo(s);

  // Número de guía
  s.addText(guideNum, { x: 0.5, y: 0.7, w: 3, h: 0.32, fontSize: 9, bold: true, color: C.neon, fontFace: 'Calibri', charSpacing: 3 });

  // Título
  s.addText(titleLine1, { x: 0.5, y: 1.05, w: 8.5, h: 0.8, fontSize: 34, bold: true, color: C.white, fontFace: 'Calibri' });
  if (titleLine2) {
    s.addText(titleLine2, { x: 0.5, y: 1.8, w: 8.5, h: 0.8, fontSize: 34, bold: true, color: C.neon, fontFace: 'Calibri' });
  }

  // Línea separadora
  s.addShape('rect', { x: 0.5, y: titleLine2 ? 2.65 : 1.95, w: 1.2, h: 0.05, fill: { color: C.neon } });

  // Subtítulo
  s.addText(subtitle, { x: 0.5, y: titleLine2 ? 2.78 : 2.1, w: 7.5, h: 0.7, fontSize: 14, color: C.muted, fontFace: 'Calibri', italic: true });

  // Serie label
  s.addText(seriesLabel, { x: 0.5, y: 4.7, w: 5, h: 0.25, fontSize: 9, color: C.muted, fontFace: 'Calibri' });

  // Badge "PDF + TikTok script"
  badge(s, 'PDF + GUION DE TIKTOK INCLUIDO', 0.5, 5.0, C.neon, '061525');

  return s;
}

// ── SLIDE ÍNDICE ─────────────────────────────────────────────────
function makeIndex(prs, items, totalSlides) {
  const s = slide(prs);
  addLogo(s);
  footer(s, 2, totalSlides);

  s.addText('EN ESTA GUÍA', { x: 0.5, y: 0.6, w: 8.5, h: 0.3, fontSize: 9, bold: true, color: C.neon, fontFace: 'Calibri', charSpacing: 2 });
  s.addText('Contenido', { x: 0.5, y: 0.9, w: 8.5, h: 0.5, fontSize: 24, bold: true, color: C.white, fontFace: 'Calibri' });

  items.forEach((item, i) => {
    const y = 1.55 + i * 0.5;
    s.addShape('ellipse', { x: 0.5, y: y + 0.02, w: 0.3, h: 0.3, fill: { color: C.neon2 } });
    s.addText(`${i + 1}`, { x: 0.5, y: y + 0.02, w: 0.3, h: 0.3, fontSize: 11, bold: true, color: C.white, fontFace: 'Calibri', align: 'center', valign: 'middle' });
    s.addText(item, { x: 0.9, y: y, w: 8, h: 0.34, fontSize: 13, color: C.ink, fontFace: 'Calibri', valign: 'middle' });
    if (i < items.length - 1) s.addShape('line', { x: 0.62, y: y + 0.35, w: 0, h: 0.15, line: { color: C.neon2, width: 1 } });
  });
}

// ── SLIDE CIERRE ─────────────────────────────────────────────────
function makeClosing(prs, keyword, totalSlides) {
  const s = slide(prs, { bg: C.dark });
  addLogo(s);

  s.addShape('ellipse', { x: 3.8, y: 1.0, w: 2.5, h: 2.5, fill: { color: '0A1F35' }, line: { color: C.neon, width: 1.5 } });
  s.addText('⚡', { x: 3.8, y: 1.0, w: 2.5, h: 2.5, fontSize: 52, align: 'center', valign: 'middle' });

  s.addText('¿Te fue útil?', { x: 0.5, y: 3.7, w: 9, h: 0.45, fontSize: 20, bold: true, color: C.white, fontFace: 'Calibri', align: 'center' });
  s.addText(`Comenta "${keyword}" en TikTok y te mando el PDF completo`, { x: 0.5, y: 4.18, w: 9, h: 0.35, fontSize: 13, color: C.muted, fontFace: 'Calibri', align: 'center' });

  badge(s, `COMENTA: ${keyword}`, 3.2, 4.62, C.neon, '061525');

  s.addText('menteenautomatico.com', { x: 0.5, y: 5.1, w: 9, h: 0.22, fontSize: 9, color: C.muted, fontFace: 'Calibri', align: 'center' });
}

// ════════════════════════════════════════════════════════════════
// GUÍA 01 — SHEETS INTRO
// ════════════════════════════════════════════════════════════════
async function makeSheets01() {
  const prs = new PptxGenJS();
  prs.layout = 'LAYOUT_WIDE';
  prs.author = 'Mente en Automático';
  prs.title = 'Google Sheets para Trabajo Real — Guía 01';
  const T = 12;

  makeCover(prs, '📊 SHEETS · GUÍA 01 DE 4',
    'Google Sheets para',
    'Trabajo Real',
    'Las 6 fórmulas que realmente necesitas, tablas dinámicas y trucos de productividad',
    'Serie: Automatización con Google Sheets + IA'
  );

  makeIndex(prs, [
    'El error más común en Google Sheets',
    'Las 6 fórmulas esenciales (con ejemplos reales)',
    'BUSCARV: nunca más busques a mano',
    'SUMAR.SI y CONTAR.SI para reportes',
    'Tablas dinámicas en 5 pasos',
    'Trucos de productividad',
    'Guion de TikTok listo para grabar',
  ], T);

  // Slide 3 — El error más común
  {
    const s = slide(prs); addLogo(s); footer(s, 3, T);
    sectionTitle(s, '❌ EL PROBLEMA', 'El error más común en Sheets', 'Por qué la mayoría usa Sheets como si fuera papel cuadriculado');
    s.addShape('roundRect', { x: 0.5, y: 2.1, w: 4.2, h: 2.7, fill: { color: '1A0A0A' }, line: { color: C.red, width: 1 }, rectRadius: 0.14 });
    s.addText('❌ Lo que hace la mayoría', { x: 0.65, y: 2.2, w: 3.9, h: 0.3, fontSize: 11, bold: true, color: C.red, fontFace: 'Calibri' });
    ['Sumas a mano columna por columna', 'Copia y pega datos entre hojas', 'Busca con Ctrl+F en lugar de BUSCARV', 'Tiene 40 hojas sin conexión entre sí', 'El "resumen" lo hace en otra app'].forEach((t, i) => {
      s.addText(`• ${t}`, { x: 0.65, y: 2.55 + i * 0.38, w: 3.9, h: 0.35, fontSize: 11, color: C.muted, fontFace: 'Calibri' });
    });
    s.addShape('roundRect', { x: 5.0, y: 2.1, w: 4.2, h: 2.7, fill: { color: '041A0A' }, line: { color: C.green, width: 1 }, rectRadius: 0.14 });
    s.addText('✅ Lo que vas a hacer tú', { x: 5.15, y: 2.2, w: 3.9, h: 0.3, fontSize: 11, bold: true, color: C.green, fontFace: 'Calibri' });
    ['Fórmulas que calculan solas', 'BUSCARV conecta tus hojas', 'Tablas dinámicas en 2 clics', 'Dashboard actualizado al instante', 'Automatizaciones con Apps Script'].forEach((t, i) => {
      s.addText(`• ${t}`, { x: 5.15, y: 2.55 + i * 0.38, w: 3.9, h: 0.35, fontSize: 11, color: C.muted, fontFace: 'Calibri' });
    });
  }

  // Slide 4 — Las 6 fórmulas
  {
    const s = slide(prs); addLogo(s); footer(s, 4, T);
    sectionTitle(s, '🔢 LAS 6 FÓRMULAS', 'Las que realmente vas a usar', 'No las 200 que existen — las 6 que resuelven el 90% de los problemas');
    const formulas = [
      ['BUSCARV', 'Busca un valor y trae su dato relacionado'],
      ['SUMAR.SI', 'Suma solo las filas que cumplan una condición'],
      ['CONTAR.SI', 'Cuenta cuántos elementos cumplen la condición'],
      ['SI', 'Si pasa X, muestra A, si no muestra B'],
      ['TEXTO', 'Formatea fechas y números como quieres'],
      ['UNIQUE + SORT', 'Lista sin duplicados, ordenada automáticamente'],
    ];
    formulas.forEach(([name, desc], i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 0.5 + col * 4.8;
      const y = 2.0 + row * 0.9;
      s.addShape('roundRect', { x, y, w: 4.4, h: 0.78, fill: { color: C.bgCard }, line: { color: C.neon2, width: 0.8 }, rectRadius: 0.1 });
      s.addText(`=${name}(...)`, { x: x + 0.15, y: y + 0.06, w: 4.1, h: 0.3, fontSize: 12, bold: true, color: C.cyan, fontFace: 'Courier New' });
      s.addText(desc, { x: x + 0.15, y: y + 0.36, w: 4.1, h: 0.3, fontSize: 11, color: C.muted, fontFace: 'Calibri' });
    });
  }

  // Slide 5 — BUSCARV
  {
    const s = slide(prs); addLogo(s); footer(s, 5, T);
    sectionTitle(s, '🔍 BUSCARV', 'Nunca más busques a mano', 'La fórmula más poderosa para conectar datos entre hojas');
    codeBox(s, '=BUSCARV(valor_buscado, rango_tabla, num_columna, 0)\n\n// Ejemplo real:\n// Tu hoja "Pedidos" tiene el ID del cliente en col A\n// Tu hoja "Clientes" tiene ID (col A) y Nombre (col B)\n\n=BUSCARV(A2, Clientes!A:B, 2, 0)\n// → Trae el nombre del cliente automáticamente', 0.5, 2.1, 9, 2.4, 'SINTAXIS + EJEMPLO REAL');
    calloutBox(s, '💡', 'El último 0 significa "coincidencia exacta". Siempre úsalo a menos que quieras aproximaciones (como rangos de notas).', 0.5, 4.6, 9);
  }

  // Slide 6 — Tablas dinámicas
  {
    const s = slide(prs); addLogo(s); footer(s, 6, T);
    sectionTitle(s, '📊 TABLAS DINÁMICAS', 'Resúmenes automáticos en 5 pasos', 'Del caos de datos al reporte en menos de 2 minutos');
    const steps = ['Selecciona todos tus datos (Ctrl+A)', 'Insertar → Tabla dinámica → Nueva hoja', 'En "Filas" arrastra: Producto / Categoría / Mes', 'En "Valores" arrastra: Monto → Suma', '¡Listo! El resumen se actualiza solo al agregar datos'];
    steps.forEach((step, i) => {
      const y = 2.05 + i * 0.58;
      s.addShape('ellipse', { x: 0.5, y: y + 0.05, w: 0.32, h: 0.32, fill: { color: C.neon2 } });
      s.addText(`${i + 1}`, { x: 0.5, y: y + 0.05, w: 0.32, h: 0.32, fontSize: 11, bold: true, color: C.white, fontFace: 'Calibri', align: 'center', valign: 'middle' });
      s.addShape('roundRect', { x: 0.93, y, w: 8.57, h: 0.48, fill: { color: C.bgCard }, line: { color: '1A2A40', width: 0.8 }, rectRadius: 0.08 });
      s.addText(step, { x: 1.08, y: y + 0.07, w: 8.3, h: 0.34, fontSize: 12.5, color: C.ink, fontFace: 'Calibri', valign: 'middle' });
    });
  }

  // Slide 7 — TikTok script
  {
    const s = slide(prs, { bg: '0D0520' });
    addLogo(s); footer(s, 7, T);
    s.addShape('roundRect', { x: 0, y: 0, w: 10, h: 0.55, fill: { color: '1A0A1F' }, line: { color: C.tikRed, width: 0 }, rectRadius: 0 });
    s.addText('🎬  GUION DE TIKTOK — 75 segundos', { x: 0.3, y: 0.1, w: 9.4, h: 0.35, fontSize: 11, bold: true, color: C.tikRed, fontFace: 'Calibri', charSpacing: 1 });
    const scenes = [
      ['ESCENA 1 · 0:00-0:06', '¿Cuántas horas pierdes haciendo esto a mano?', 'Muestra: pantalla de Excel con sumas manuales'],
      ['ESCENA 2 · 0:06-0:22', 'Antes calculabas a mano. Con BUSCARV, SUMAR.SI y una tabla dinámica, Sheets hace el trabajo.', 'Muestra: fórmulas escribiéndose solas'],
      ['ESCENA 3 · 0:22-0:55', 'Demo en vivo: tabla dinámica generando resumen de ventas por producto en 30 segundos.', 'Muestra: tabla dinámica construyéndose'],
      ['ESCENA 4 · 0:55-1:15', 'Comenta "SHEETS" y te mando la guía PDF con las 6 fórmulas y los ejemplos.', 'Muestra: captura de la guía PDF'],
    ];
    scenes.forEach(([title, voz, pantalla], i) => {
      const y = 0.65 + i * 1.18;
      s.addShape('roundRect', { x: 0.3, y, w: 9.4, h: 1.1, fill: { color: '0A0520' }, line: { color: '2A1040', width: 1 }, rectRadius: 0.1 });
      s.addText(title, { x: 0.45, y: y + 0.06, w: 4, h: 0.25, fontSize: 9, bold: true, color: C.tikRed, fontFace: 'Calibri', charSpacing: 1 });
      s.addText(`🎙 ${voz}`, { x: 0.45, y: y + 0.3, w: 9.1, h: 0.4, fontSize: 11, color: C.ink, fontFace: 'Calibri' });
      s.addText(`📱 ${pantalla}`, { x: 0.45, y: y + 0.7, w: 9.1, h: 0.28, fontSize: 10, color: '#FFD700', fontFace: 'Calibri', italic: true });
    });
  }

  // Slides 8-11 — trucos adicionales, más contenido
  {
    const s = slide(prs); addLogo(s); footer(s, 8, T);
    sectionTitle(s, '⚡ TRUCOS', 'Productividad al máximo', 'Atajos y funciones que ahorran minutos cada día');
    const tricks = [
      ['Ctrl + ;', 'Inserta la fecha de hoy al instante'],
      ['Ctrl + Shift + ;', 'Inserta la hora actual'],
      ['=HOY()', 'Fecha que se actualiza sola cada día'],
      ['=AHORA()', 'Fecha y hora actualizadas en tiempo real'],
      ['Ctrl + Shift + L', 'Activa/desactiva filtros automáticos'],
      ['Ctrl + \\', 'Selecciona solo las celdas visibles (tras filtrar)'],
      ['F4 en fórmula', 'Bloquea referencias: $A$1 no cambia al copiar'],
      ['Ctrl + `', 'Muestra/oculta las fórmulas en lugar de resultados'],
    ];
    tricks.forEach(([shortcut, desc], i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 0.5 + col * 4.8;
      const y = 2.05 + row * 0.75;
      s.addShape('roundRect', { x, y, w: 4.4, h: 0.62, fill: { color: C.bgCard }, line: { color: '1A2A40', width: 0.8 }, rectRadius: 0.08 });
      s.addText(shortcut, { x: x + 0.12, y: y + 0.06, w: 1.5, h: 0.26, fontSize: 10.5, bold: true, color: C.cyan, fontFace: 'Courier New' });
      s.addText(desc, { x: x + 0.12, y: y + 0.32, w: 4.1, h: 0.22, fontSize: 10.5, color: C.muted, fontFace: 'Calibri' });
    });
  }

  // Slides 9-11 resumen / siguientes pasos
  for (let n = 9; n <= 11; n++) {
    const s = slide(prs); addLogo(s); footer(s, n, T);
    if (n === 9) {
      sectionTitle(s, '📋 RESUMEN', '¿Qué aprendiste hoy?', '');
      const pts = ['BUSCARV conecta datos entre hojas sin buscar a mano', 'SUMAR.SI y CONTAR.SI hacen reportes por condición', 'La función SI toma decisiones automáticamente', 'Tablas dinámicas generan resúmenes en 2 clics', 'Formato condicional colorea celdas según el valor', 'Atajos de teclado ahorran minutos cada día'];
      pts.forEach((p, i) => {
        s.addShape('ellipse', { x: 0.5, y: 1.95 + i * 0.5, w: 0.22, h: 0.22, fill: { color: C.neon } });
        s.addText(p, { x: 0.85, y: 1.93 + i * 0.5, w: 8.65, h: 0.26, fontSize: 13, color: C.ink, fontFace: 'Calibri' });
      });
    } else if (n === 10) {
      sectionTitle(s, '🚀 SIGUIENTE PASO', 'Apps Script con Claude', 'Automatiza Google Sheets sin saber programar — la próxima guía');
      s.addShape('roundRect', { x: 0.5, y: 2.2, w: 9, h: 2.7, fill: { color: C.bgCard }, line: { color: C.neon2, width: 1 }, rectRadius: 0.14 });
      s.addText('Guía 02 de la serie:', { x: 0.7, y: 2.35, w: 8.6, h: 0.3, fontSize: 11, bold: true, color: C.neon, fontFace: 'Calibri' });
      s.addText('Apps Script de Cero con Claude', { x: 0.7, y: 2.65, w: 8.6, h: 0.5, fontSize: 20, bold: true, color: C.white, fontFace: 'Calibri' });
      s.addText('Claude escribe el código — tú solo lo pegas.\nResúmenes automáticos por correo, alertas de stock, auto-archivado y más.', { x: 0.7, y: 3.2, w: 8.6, h: 0.7, fontSize: 13, color: C.muted, fontFace: 'Calibri' });
      badge(s, 'COMENTA "APPS" EN EL SIGUIENTE VIDEO →', 0.7, 4.0, C.neon, '061525');
    } else {
      makeClosing(prs, 'SHEETS', T);
    }
  }

  await prs.writeFile({ fileName: path.join(outDir, 'Guia-Sheets-01-Formulas-Esenciales.pptx') });
  console.log('✅ Guia-Sheets-01-Formulas-Esenciales.pptx');
}

// ════════════════════════════════════════════════════════════════
// GUÍA 02 — APPS SCRIPT
// ════════════════════════════════════════════════════════════════
async function makeSheets02() {
  const prs = new PptxGenJS();
  prs.layout = 'LAYOUT_WIDE';
  prs.title = 'Apps Script de Cero con Claude — Guía 02';
  const T = 12;

  makeCover(prs, '🤖 SHEETS · GUÍA 02 DE 4',
    'Apps Script de Cero',
    'con Claude',
    'Automatiza Google Sheets sin saber programar — Claude escribe el código, tú solo lo pegas',
    'Serie: Automatización con Google Sheets + IA'
  );

  makeIndex(prs, [
    '¿Qué es Apps Script y por qué importa?',
    'Cómo abrir el editor (sin salir de Sheets)',
    'El prompt perfecto para pedirle código a Claude',
    'Script 1: Resumen diario por correo',
    'Script 2: Alerta automática de stock bajo',
    'Script 3: Auto-archivar filas completadas',
    'Guion de TikTok listo para grabar',
  ], T);

  // Slide 3 — Qué es Apps Script
  {
    const s = slide(prs); addLogo(s); footer(s, 3, T);
    sectionTitle(s, '❓ QUÉ ES', 'Apps Script: el programador dentro de Sheets', 'JavaScript simplificado que vive dentro de Google — y Claude lo escribe por ti');
    const items = [
      ['🔗', 'Conectado a tus datos', 'Lee y escribe en tus hojas, sin exportar ni importar nada'],
      ['✉️', 'Usa Gmail automáticamente', 'Puede enviar correos, crear borradores y leer tu bandeja'],
      ['📅', 'Se programa solo', 'Disparadores para que corra cada hora, día, semana o al abrir'],
      ['🆓', 'Gratis, sin APIs externas', 'Viene incluido con tu cuenta de Google — no pagas nada extra'],
    ];
    items.forEach(([ic, title, desc], i) => {
      const x = i % 2 === 0 ? 0.5 : 5.1;
      const y = 2.1 + Math.floor(i / 2) * 1.4;
      s.addShape('roundRect', { x, y, w: 4.4, h: 1.22, fill: { color: C.bgCard }, line: { color: C.neon2, width: 0.8 }, rectRadius: 0.12 });
      s.addText(ic, { x: x + 0.15, y: y + 0.12, w: 0.5, h: 0.5, fontSize: 22 });
      s.addText(title, { x: x + 0.7, y: y + 0.1, w: 3.55, h: 0.3, fontSize: 13, bold: true, color: C.cyan, fontFace: 'Calibri' });
      s.addText(desc, { x: x + 0.7, y: y + 0.42, w: 3.55, h: 0.65, fontSize: 11.5, color: C.muted, fontFace: 'Calibri' });
    });
  }

  // Slide 4 — Cómo abrir el editor
  {
    const s = slide(prs); addLogo(s); footer(s, 4, T);
    sectionTitle(s, '🚀 PRIMEROS PASOS', 'Abre Apps Script en 3 clics', 'Desde tu Google Sheet, sin instalar nada');
    [
      ['Extensiones', 'En el menú superior de tu Google Sheet'],
      ['Apps Script', 'Se abre el editor de código en una nueva pestaña'],
      ['Pega y guarda', 'Ctrl+S — Google guarda el script en tu cuenta'],
      ['Ejecutar ▶', 'Clic en el botón play → primera vez pedirá permisos (acepta)'],
    ].forEach(([ step, desc], i) => {
      const y = 2.05 + i * 0.75;
      s.addShape('ellipse', { x: 0.5, y: y + 0.1, w: 0.36, h: 0.36, fill: { color: C.neon2 } });
      s.addText(`${i + 1}`, { x: 0.5, y: y + 0.1, w: 0.36, h: 0.36, fontSize: 13, bold: true, color: C.white, fontFace: 'Calibri', align: 'center', valign: 'middle' });
      s.addShape('roundRect', { x: 0.97, y, w: 8.53, h: 0.58, fill: { color: C.bgCard }, line: { color: '1A2A40', width: 0.8 }, rectRadius: 0.08 });
      s.addText(step, { x: 1.12, y: y + 0.04, w: 2.2, h: 0.28, fontSize: 13, bold: true, color: C.cyan, fontFace: 'Calibri' });
      s.addText(desc, { x: 1.12, y: y + 0.3, w: 8.2, h: 0.24, fontSize: 11.5, color: C.muted, fontFace: 'Calibri' });
    });
    calloutBox(s, '🔒', 'Los permisos que pide Google son normales — es para que el script pueda leer tu Sheet y usar Gmail. Solo se piden una vez.', 0.5, 5.1, 9);
  }

  // Slide 5 — El prompt para Claude
  {
    const s = slide(prs); addLogo(s); footer(s, 5, T);
    sectionTitle(s, '🤖 PROMPT CLAVE', 'Cómo pedirle el código a Claude', 'Este template funciona para cualquier automatización que necesites');
    codeBox(s, 'Tengo un Google Sheet con estas columnas:\n[describe tus columnas: A: Nombre, B: Email, C: Monto...]\n\nNombre de la hoja: "[nombre exacto]"\n\nNecesito un script de Apps Script que:\n1. [qué debe hacer]\n2. [condición: si X entonces Y]\n3. [qué marcar/guardar para no repetir]\n\nHaz el código completo listo para pegar en Apps Script.', 0.5, 2.1, 9, 2.8, 'PLANTILLA DE PROMPT');
    calloutBox(s, '💡', 'Cuanto más específico seas con los nombres de columnas y valores exactos ("Pendiente", "Completado"), mejor será el código que genera Claude.', 0.5, 5.0, 9);
  }

  // Slide 6 — Script 1: Resumen diario
  {
    const s = slide(prs); addLogo(s); footer(s, 6, T);
    sectionTitle(s, '📧 SCRIPT 1', 'Resumen diario automático por correo', 'Cada mañana, el resumen del día anterior llega a tu Gmail');
    codeBox(s, 'function enviarResumenDiario() {\n  const hoja = SpreadsheetApp.getActiveSpreadsheet()\n    .getSheetByName("Pedidos");\n  const datos = hoja.getDataRange().getValues();\n  let total = 0, pendientes = 0;\n\n  for (let i = 1; i < datos.length; i++) {\n    total += datos[i][3];                          // col D = monto\n    if (datos[i][2] === "Pendiente") pendientes++; // col C = estado\n  }\n\n  GmailApp.sendEmail("tu@email.com",\n    "📊 Resumen diario",\n    `Total: Q${total} — Pendientes: ${pendientes}`);\n}', 0.5, 2.0, 9, 3.0, 'CÓDIGO COMPLETO — copia y pega en Apps Script');
  }

  // Slide 7 — Script 2: Alerta stock
  {
    const s = slide(prs); addLogo(s); footer(s, 7, T);
    sectionTitle(s, '📦 SCRIPT 2', 'Alerta de stock bajo automática', 'Revisa el inventario y avisa cuando algo está por agotarse');
    codeBox(s, 'function alertarStockBajo() {\n  const MINIMO = 10; // alerta si queda menos de esto\n  const hoja = SpreadsheetApp.getActiveSpreadsheet()\n    .getSheetByName("Inventario");\n  const datos = hoja.getDataRange().getValues();\n  let alertas = [];\n\n  for (let i = 1; i < datos.length; i++) {\n    if (datos[i][2] < MINIMO) { // col C = cantidad\n      alertas.push(`${datos[i][0]}: solo ${datos[i][2]} unidades`);\n    }\n  }\n\n  if (alertas.length > 0) {\n    GmailApp.sendEmail("tu@email.com",\n      "⚠️ Stock bajo",\n      alertas.join("\\n"));\n  }\n}', 0.5, 2.0, 9, 3.0, 'CÓDIGO COMPLETO');
  }

  // Slide 8 — TikTok script
  {
    const s = slide(prs, { bg: '0D0520' });
    addLogo(s); footer(s, 8, T);
    s.addShape('rect', { x: 0, y: 0, w: 10, h: 0.55, fill: { color: '1A0A1F' } });
    s.addText('🎬  GUION DE TIKTOK — 85 segundos', { x: 0.3, y: 0.1, w: 9.4, h: 0.35, fontSize: 11, bold: true, color: C.tikRed, fontFace: 'Calibri', charSpacing: 1 });
    const scenes = [
      ['ESCENA 1 · 0:00-0:07', '"Automaticé mi Google Sheets sin saber programar"', '📱 Apps Script vacío → código generado por Claude'],
      ['ESCENA 2 · 0:07-0:25', '"Le dije a Claude: tengo un sheet con pedidos, mándame un resumen por correo cada mañana. En 10 segundos tenía el código."', '📱 Claude.ai con el prompt + código generado'],
      ['ESCENA 3 · 0:25-0:55', 'Demo: pegar código en editor → ejecutar → correo llegando a Gmail con el resumen completo.', '📱 Pantalla dividida: editor + Gmail recibiendo'],
      ['ESCENA 4 · 0:55-1:25', '"Y con el disparador, funciona solo cada mañana. Comenta SCRIPT y te mando los 3 scripts."', '📱 Configuración del trigger → reloj programado'],
    ];
    scenes.forEach(([title, voz, pantalla], i) => {
      const y = 0.65 + i * 1.18;
      s.addShape('roundRect', { x: 0.3, y, w: 9.4, h: 1.1, fill: { color: '0A0520' }, line: { color: '2A1040', width: 1 }, rectRadius: 0.1 });
      s.addText(title, { x: 0.45, y: y + 0.06, w: 4, h: 0.25, fontSize: 9, bold: true, color: C.tikRed, fontFace: 'Calibri', charSpacing: 1 });
      s.addText(`🎙 ${voz}`, { x: 0.45, y: y + 0.3, w: 9.1, h: 0.4, fontSize: 11, color: C.ink, fontFace: 'Calibri' });
      s.addText(pantalla, { x: 0.45, y: y + 0.72, w: 9.1, h: 0.28, fontSize: 10, color: '#FFD700', fontFace: 'Calibri', italic: true });
    });
  }

  // slides 9-12
  for (let n = 9; n <= 12; n++) {
    const s = slide(prs); addLogo(s); footer(s, n, T);
    if (n === 9) {
      sectionTitle(s, '🗃️ SCRIPT 3', 'Auto-archivar filas completadas', 'Limpia tu hoja de trabajo moviendo los registros finalizados automáticamente');
      codeBox(s, 'function autoArchivar() {\n  const ss = SpreadsheetApp.getActiveSpreadsheet();\n  const activa = ss.getSheetByName("Pedidos");\n  const archivo = ss.getSheetByName("Archivo");\n  const datos = activa.getDataRange().getValues();\n\n  for (let i = datos.length - 1; i >= 1; i--) {\n    if (datos[i][4] === "Completado") { // col E = estado\n      archivo.appendRow(datos[i]);\n      activa.deleteRow(i + 1);\n    }\n  }\n}', 0.5, 2.0, 9, 2.8, 'CÓDIGO — mueve filas "Completado" a hoja Archivo');
      calloutBox(s, '⚠️', 'Recorre las filas de abajo hacia arriba (i--) para que al borrar filas no se salte ninguna.', 0.5, 4.9, 9);
    } else if (n === 10) {
      sectionTitle(s, '⏰ DISPARADORES', 'Que funcione sin que tú hagas nada', 'Los triggers son el truco que convierte el script en automatización real');
      [
        ['1', 'Extensiones → Apps Script', 'Abre el editor donde pegaste el código'],
        ['2', 'Ícono de reloj ⏰ en la barra lateral', 'Entra a la sección de Disparadores (Triggers)'],
        ['3', '+ Añadir disparador', 'Botón en la esquina inferior derecha'],
        ['4', 'Basado en tiempo → Día → 8am', 'El script corre solo cada mañana sin que abras nada'],
      ].forEach(([num, step, desc], i) => {
        const y = 2.1 + i * 0.75;
        s.addShape('ellipse', { x: 0.5, y: y + 0.1, w: 0.35, h: 0.35, fill: { color: C.neon2 } });
        s.addText(num, { x: 0.5, y: y + 0.1, w: 0.35, h: 0.35, fontSize: 12, bold: true, color: C.white, fontFace: 'Calibri', align: 'center', valign: 'middle' });
        s.addShape('roundRect', { x: 0.96, y, w: 8.54, h: 0.6, fill: { color: C.bgCard }, line: { color: '1A2A40', width: 0.8 }, rectRadius: 0.08 });
        s.addText(step, { x: 1.12, y: y + 0.04, w: 8.2, h: 0.28, fontSize: 13, bold: true, color: C.cyan, fontFace: 'Calibri' });
        s.addText(desc, { x: 1.12, y: y + 0.32, w: 8.2, h: 0.22, fontSize: 11, color: C.muted, fontFace: 'Calibri' });
      });
    } else if (n === 11) {
      sectionTitle(s, '📋 RESUMEN', 'Lo que puedes hacer desde hoy', '');
      ['Abrir Apps Script desde Extensiones → Apps Script', 'Pedirle el código completo a Claude describiendo tus columnas', 'Script de resumen diario por correo (enviarResumenDiario)', 'Script de alerta de stock bajo (alertarStockBajo)', 'Script de auto-archivar filas completadas (autoArchivar)', 'Configurar disparador para que corra solo sin hacer nada'].forEach((p, i) => {
        s.addShape('ellipse', { x: 0.5, y: 2.0 + i * 0.5, w: 0.22, h: 0.22, fill: { color: C.neon } });
        s.addText(p, { x: 0.85, y: 1.97 + i * 0.5, w: 8.65, h: 0.26, fontSize: 13, color: C.ink, fontFace: 'Calibri' });
      });
    } else {
      makeClosing(prs, 'SCRIPT', T);
    }
  }

  await prs.writeFile({ fileName: path.join(outDir, 'Guia-Sheets-02-Apps-Script-con-Claude.pptx') });
  console.log('✅ Guia-Sheets-02-Apps-Script-con-Claude.pptx');
}

// ════════════════════════════════════════════════════════════════
// GUÍA 03 — CORREOS AUTOMÁTICOS
// ════════════════════════════════════════════════════════════════
async function makeSheets03() {
  const prs = new PptxGenJS();
  prs.layout = 'LAYOUT_WIDE';
  prs.title = 'Correos Automáticos desde Google Sheets — Guía 03';
  const T = 12;

  makeCover(prs, '📧 SHEETS · GUÍA 03 DE 4',
    'Correos Automáticos',
    'desde Google Sheets',
    '50 correos personalizados sin tocar el teclado — Claude escribe el código, tú activas el trigger',
    'Serie: Automatización con Google Sheets + IA'
  );

  makeIndex(prs, [
    'Por qué automatizar correos desde Sheets',
    '3 casos de uso reales para tu negocio',
    'Script 1: Confirmación de pedido personalizada',
    'Script 2: Alerta de pagos vencidos',
    'Script 3: Reporte semanal automático al equipo',
    'Disparadores: que funcione solo sin ti',
    'Guion de TikTok listo para grabar',
  ], T);

  // Slide 3 — Por qué automatizar
  {
    const s = slide(prs); addLogo(s); footer(s, 3, T);
    sectionTitle(s, '⏱ EL PROBLEMA', 'El correo manual es tiempo muerto', 'Cada confirmación que escribes a mano es un minuto que podrías estar haciendo otra cosa');
    s.addShape('roundRect', { x: 0.5, y: 2.1, w: 4.2, h: 2.8, fill: { color: '1A0A0A' }, line: { color: C.red, width: 1 }, rectRadius: 0.14 });
    s.addText('Sin automatizar', { x: 0.65, y: 2.2, w: 3.9, h: 0.3, fontSize: 12, bold: true, color: C.red, fontFace: 'Calibri' });
    ['Abrir Gmail manualmente', 'Escribir el saludo (copiar nombre)', 'Cambiar el producto, precio, fecha', 'Enviar → ir al siguiente pedido', 'Repetir 20, 30, 50 veces', '¿Y si te olvidas de alguien?'].forEach((t, i) => {
      s.addText(`• ${t}`, { x: 0.65, y: 2.55 + i * 0.37, w: 3.9, h: 0.33, fontSize: 11.5, color: C.muted, fontFace: 'Calibri' });
    });
    s.addShape('roundRect', { x: 5.0, y: 2.1, w: 4.2, h: 2.8, fill: { color: '041A0A' }, line: { color: C.green, width: 1 }, rectRadius: 0.14 });
    s.addText('Con Apps Script', { x: 5.15, y: 2.2, w: 3.9, h: 0.3, fontSize: 12, bold: true, color: C.green, fontFace: 'Calibri' });
    ['Sheet cambia a "Confirmado"', 'Correo sale automáticamente', 'Cada uno con nombre correcto', 'Producto y precio exactos', 'Columna marcada "Enviado"', '0% de olvidos, 0 minutos tuyos'].forEach((t, i) => {
      s.addText(`• ${t}`, { x: 5.15, y: 2.55 + i * 0.37, w: 3.9, h: 0.33, fontSize: 11.5, color: C.muted, fontFace: 'Calibri' });
    });
  }

  // Slide 4 — Casos de uso
  {
    const s = slide(prs); addLogo(s); footer(s, 4, T);
    sectionTitle(s, '📋 CASOS DE USO', '3 scripts que puedes usar hoy', 'Uno para cada situación común de negocio');
    [
      ['✅', 'Confirmación de pedido', 'Cuando el estado en tu Sheet cambia a "Confirmado", el cliente recibe el correo al instante con todos los detalles.'],
      ['🔴', 'Alerta de pago vencido', 'Cada mañana revisa quién lleva 7+ días sin pagar y le manda un recordatorio automático personalizado.'],
      ['📊', 'Reporte semanal', 'Todos los lunes a las 8am, tu equipo recibe el resumen de ventas de la semana anterior sin que nadie lo active.'],
    ].forEach(([ic, title, desc], i) => {
      const y = 2.05 + i * 1.1;
      s.addShape('roundRect', { x: 0.5, y, w: 9, h: 0.95, fill: { color: C.bgCard }, line: { color: C.neon2, width: 0.8 }, rectRadius: 0.12 });
      s.addText(ic, { x: 0.65, y: y + 0.15, w: 0.5, h: 0.5, fontSize: 22 });
      s.addText(title, { x: 1.25, y: y + 0.06, w: 7.9, h: 0.32, fontSize: 14, bold: true, color: C.cyan, fontFace: 'Calibri' });
      s.addText(desc, { x: 1.25, y: y + 0.4, w: 7.9, h: 0.45, fontSize: 11.5, color: C.muted, fontFace: 'Calibri' });
    });
  }

  // Slide 5 — Script 1
  {
    const s = slide(prs); addLogo(s); footer(s, 5, T);
    sectionTitle(s, '🛒 SCRIPT 1', 'Confirmación de pedido automática', 'Sheet: Nombre (A), Email (B), Producto (C), Total (D), Estado (E)');
    codeBox(s, 'function enviarConfirmaciones() {\n  const hoja = SpreadsheetApp.getActiveSpreadsheet()\n    .getSheetByName("Pedidos");\n  const datos = hoja.getDataRange().getValues();\n\n  for (let i = 1; i < datos.length; i++) {\n    const [nombre, email, producto, total, estado, enviado] = datos[i];\n\n    if (estado === "Confirmado" && enviado !== "Enviado") {\n      GmailApp.sendEmail(email,\n        `✅ Pedido confirmado — ${nombre}`,\n        `Hola ${nombre},\\n\\nTu pedido de "${producto}" por Q${total} está confirmado.\\nEntrega: 3-5 días hábiles.\\n\\n¡Gracias!`);\n\n      hoja.getRange(i + 1, 6).setValue("Enviado"); // col F = candado\n    }\n  }\n}', 0.5, 2.05, 9, 2.85, 'CÓDIGO COMPLETO — incluye candado para no reenviar');
    calloutBox(s, '🔒', 'La columna F actúa como candado. Una vez marcada "Enviado", el script nunca vuelve a mandar ese correo aunque lo ejecutes mil veces.', 0.5, 5.0, 9);
  }

  // Slide 6 — Script 2
  {
    const s = slide(prs); addLogo(s); footer(s, 6, T);
    sectionTitle(s, '💰 SCRIPT 2', 'Alerta de pagos vencidos', 'Sheet: Cliente (A), Email (B), Monto (C), Vencimiento (D), Estado (E)');
    codeBox(s, 'function alertarPagosVencidos() {\n  const hoja = SpreadsheetApp.getActiveSpreadsheet()\n    .getSheetByName("Cobros");\n  const datos = hoja.getDataRange().getValues();\n  const hoy = new Date();\n\n  for (let i = 1; i < datos.length; i++) {\n    const [cliente, email, monto, vencimiento, estado] = datos[i];\n    const diasVencido = Math.floor((hoy - new Date(vencimiento)) / 86400000);\n\n    if (estado === "Pendiente" && diasVencido >= 7) {\n      GmailApp.sendEmail(email,\n        `⚠️ Pago vencido — ${cliente}`,\n        `Tu pago de Q${monto} venció hace ${diasVencido} días.\\nPor favor regulariza tu situación.`);\n    }\n  }\n}', 0.5, 2.05, 9, 2.85, 'CÓDIGO COMPLETO — revisa y avisa cada mañana');
  }

  // Slide 7 — Script 3
  {
    const s = slide(prs); addLogo(s); footer(s, 7, T);
    sectionTitle(s, '📈 SCRIPT 3', 'Reporte semanal automático', 'Cada lunes a las 8am, el resumen de la semana llega solo');
    codeBox(s, 'function reporteSemanal() {\n  const hoja = SpreadsheetApp.getActiveSpreadsheet()\n    .getSheetByName("Ventas");\n  const datos = hoja.getDataRange().getValues();\n  const hoy = new Date();\n  const hace7dias = new Date(hoy - 7 * 864e5);\n  let total = 0, cant = 0, detalles = "";\n\n  for (let i = 1; i < datos.length; i++) {\n    if (new Date(datos[i][0]) >= hace7dias) {\n      total += datos[i][2]; cant++;\n      detalles += `- ${datos[i][1]}: Q${datos[i][2]}\\n`;\n    }\n  }\n\n  GmailApp.sendEmail("tu@email.com",\n    "📊 Reporte semanal",\n    `Ventas: ${cant} | Total: Q${total}\\n\\n${detalles}`);\n}', 0.5, 2.05, 9, 2.85, 'CÓDIGO COMPLETO — actívalo con trigger "Lunes 8am"');
  }

  // Slide 8 — TikTok
  {
    const s = slide(prs, { bg: '0D0520' });
    addLogo(s); footer(s, 8, T);
    s.addShape('rect', { x: 0, y: 0, w: 10, h: 0.55, fill: { color: '1A0A1F' } });
    s.addText('🎬  GUION DE TIKTOK — 80 segundos', { x: 0.3, y: 0.1, w: 9.4, h: 0.35, fontSize: 11, bold: true, color: C.tikRed, fontFace: 'Calibri', charSpacing: 1 });
    const scenes = [
      ['ESCENA 1 · 0:00-0:06', '"Esta semana mandé 50 correos personalizados. ¿Cuánto tardé? Cero segundos."', '📱 Gmail mostrando "50 mensajes enviados"'],
      ['ESCENA 2 · 0:06-0:18', '"Antes hacía esto: abría Gmail, escribía el nombre, copiaba el texto, cambiaba el producto. Repetía 50 veces. Es trabajo de máquina, no de humano."', '📱 Mano escribiendo correos uno a uno'],
      ['ESCENA 3 · 0:18-0:35', '"Le dije a Claude: cuando el estado sea Confirmado, envía un correo con el nombre y el producto. En 10 segundos tenía el código."', '📱 Claude generando el código completo'],
      ['ESCENA 4 · 0:35-1:20', '"Pego el código, ejecuto una vez y mira: correos saliendo automáticamente. Comenta CORREOS y te mando los 3 scripts completos."', '📱 Correos llegando a Gmail en tiempo real'],
    ];
    scenes.forEach(([title, voz, pantalla], i) => {
      const y = 0.65 + i * 1.18;
      s.addShape('roundRect', { x: 0.3, y, w: 9.4, h: 1.1, fill: { color: '0A0520' }, line: { color: '2A1040', width: 1 }, rectRadius: 0.1 });
      s.addText(title, { x: 0.45, y: y + 0.06, w: 4, h: 0.25, fontSize: 9, bold: true, color: C.tikRed, fontFace: 'Calibri', charSpacing: 1 });
      s.addText(`🎙 ${voz}`, { x: 0.45, y: y + 0.3, w: 9.1, h: 0.4, fontSize: 11, color: C.ink, fontFace: 'Calibri' });
      s.addText(pantalla, { x: 0.45, y: y + 0.72, w: 9.1, h: 0.28, fontSize: 10, color: '#FFD700', fontFace: 'Calibri', italic: true });
    });
  }

  for (let n = 9; n <= 12; n++) {
    const s = slide(prs); addLogo(s); footer(s, n, T);
    if (n === 9) {
      sectionTitle(s, '⏰ DISPARADORES', 'El truco: que funcione solo', 'Un script que ejecutas a mano no es automatización — los triggers sí lo son');
      [['Extensiones → Apps Script', 'Abre el editor con tu código guardado'], ['Panel izquierdo → Ícono ⏰', 'Sección de Disparadores (Triggers)'], ['+ Añadir disparador', 'Botón en esquina inferior derecha'], ['Basado en tiempo → Semana → Lunes 8am', 'Puedes elegir: hora, día, semana, mes o al abrir el Sheet']].forEach(([step, desc], i) => {
        const y = 2.1 + i * 0.75;
        s.addShape('ellipse', { x: 0.5, y: y + 0.1, w: 0.35, h: 0.35, fill: { color: C.neon2 } });
        s.addText(`${i + 1}`, { x: 0.5, y: y + 0.1, w: 0.35, h: 0.35, fontSize: 12, bold: true, color: C.white, fontFace: 'Calibri', align: 'center', valign: 'middle' });
        s.addShape('roundRect', { x: 0.96, y, w: 8.54, h: 0.6, fill: { color: C.bgCard }, line: { color: '1A2A40', width: 0.8 }, rectRadius: 0.08 });
        s.addText(step, { x: 1.12, y: y + 0.04, w: 8.2, h: 0.28, fontSize: 13, bold: true, color: C.cyan, fontFace: 'Calibri' });
        s.addText(desc, { x: 1.12, y: y + 0.32, w: 8.2, h: 0.22, fontSize: 11, color: C.muted, fontFace: 'Calibri' });
      });
    } else if (n === 10) {
      sectionTitle(s, '📋 RESUMEN', 'Los 3 scripts de esta guía', '');
      [['✅ Script 1: Confirmación de pedido', 'Estado = "Confirmado" → correo personalizado + marcar "Enviado" en col F'], ['🔴 Script 2: Alerta de pago vencido', 'Estado = "Pendiente" AND días vencidos ≥ 7 → recordatorio automático al cliente'], ['📊 Script 3: Reporte semanal', 'Suma ventas últimos 7 días → correo a tu equipo cada lunes a las 8am']].forEach(([title, desc], i) => {
        const y = 2.1 + i * 1.0;
        s.addShape('roundRect', { x: 0.5, y, w: 9, h: 0.85, fill: { color: C.bgCard }, line: { color: C.neon2, width: 0.8 }, rectRadius: 0.12 });
        s.addText(title, { x: 0.7, y: y + 0.08, w: 8.6, h: 0.3, fontSize: 13, bold: true, color: C.cyan, fontFace: 'Calibri' });
        s.addText(desc, { x: 0.7, y: y + 0.42, w: 8.6, h: 0.35, fontSize: 11.5, color: C.muted, fontFace: 'Calibri' });
      });
    } else if (n === 11) {
      sectionTitle(s, '🚀 SIGUIENTE PASO', 'Dashboard de Ventas con Alertas', 'La guía final de la serie: un panel de control completo');
      s.addShape('roundRect', { x: 0.5, y: 2.1, w: 9, h: 2.8, fill: { color: C.bgCard }, line: { color: C.neon2, width: 1 }, rectRadius: 0.14 });
      s.addText('Guía 04 de la serie:', { x: 0.7, y: 2.25, w: 8.6, h: 0.3, fontSize: 11, bold: true, color: C.neon, fontFace: 'Calibri' });
      s.addText('Dashboard de Ventas con Alertas', { x: 0.7, y: 2.55, w: 8.6, h: 0.5, fontSize: 20, bold: true, color: C.white, fontFace: 'Calibri' });
      s.addText('KPIs en tiempo real · Formato condicional automático · Correo de alerta cuando algo va mal\nTodo en una sola pantalla — sin abrir otras hojas ni hacer cálculos manuales', { x: 0.7, y: 3.12, w: 8.6, h: 0.7, fontSize: 13, color: C.muted, fontFace: 'Calibri' });
      badge(s, 'COMENTA "DASHBOARD" EN EL SIGUIENTE VIDEO →', 0.7, 4.0, C.neon, '061525');
    } else {
      makeClosing(prs, 'CORREOS', T);
    }
  }

  await prs.writeFile({ fileName: path.join(outDir, 'Guia-Sheets-03-Correos-Automaticos.pptx') });
  console.log('✅ Guia-Sheets-03-Correos-Automaticos.pptx');
}

// ════════════════════════════════════════════════════════════════
// GUÍA 04 — DASHBOARD
// ════════════════════════════════════════════════════════════════
async function makeSheets04() {
  const prs = new PptxGenJS();
  prs.layout = 'LAYOUT_WIDE';
  prs.title = 'Dashboard de Ventas con Alertas — Guía 04';
  const T = 13;

  makeCover(prs, '📈 SHEETS · GUÍA 04 DE 4',
    'Dashboard de Ventas',
    'con Alertas Automáticas',
    'Tu negocio en una pantalla: KPIs en tiempo real, formato condicional y correo si algo va mal',
    'Serie: Automatización con Google Sheets + IA'
  );

  makeIndex(prs, [
    'Qué es un dashboard y para qué sirve',
    'Estructura: hoja Datos vs hoja Dashboard',
    'Fórmulas KPI: ventas, meta, pendientes',
    'Formato condicional: verde / amarillo / rojo',
    'Gráficas que se actualizan solas',
    'Script: sistema de alertas automáticas',
    'Cómo pedirle todo esto a Claude',
    'Guion de TikTok listo para grabar',
  ], T);

  // Slide 3 — Qué es un dashboard
  {
    const s = slide(prs); addLogo(s); footer(s, 3, T);
    sectionTitle(s, '📊 CONCEPTO', 'Tu negocio en una sola pantalla', 'Sin abrir 5 hojas, sin hacer cálculos — todo visible en 2 segundos');

    // Mock dashboard visual
    s.addShape('roundRect', { x: 0.5, y: 2.05, w: 9, h: 3.3, fill: { color: C.bgCard }, line: { color: C.neon2, width: 1 }, rectRadius: 0.14 });
    s.addText('📊 Panel de Ventas — Junio 2025', { x: 0.65, y: 2.15, w: 8.7, h: 0.3, fontSize: 12, bold: true, color: C.ink, fontFace: 'Calibri' });
    s.addShape('line', { x: 0.65, y: 2.5, w: 8.7, h: 0, line: { color: '1A2A40', width: 0.5 } });

    // KPIs
    const kpis = [['Q 18,450', C.green, 'Ventas del mes'], ['84%', C.cyan, 'Meta alcanzada'], ['12', C.red, 'Pedidos pendientes']];
    kpis.forEach(([val, color, label], i) => {
      const x = 0.7 + i * 3.0;
      s.addShape('roundRect', { x, y: 2.58, w: 2.8, h: 1.05, fill: { color: '061525' }, line: { color, width: 1 }, rectRadius: 0.1 });
      s.addText(val, { x, y: 2.66, w: 2.8, h: 0.55, fontSize: 22, bold: true, color, fontFace: 'Calibri', align: 'center' });
      s.addText(label, { x, y: 3.18, w: 2.8, h: 0.28, fontSize: 9, color: C.muted, fontFace: 'Calibri', align: 'center', charSpacing: 1, bold: true });
    });

    // Barras de semana
    const weeks = [['Semana 1', 0.85, C.neon, 'Q 5,200'], ['Semana 2', 0.62, C.neon2, 'Q 4,800'], ['Semana 3', 0.44, C.cyan, 'Q 5,100'], ['Semana 4', 0.23, C.red, 'Q 3,350']];
    weeks.forEach(([label, pct, color, val], i) => {
      const y = 3.72 + i * 0.38;
      s.addText(label, { x: 0.65, y, w: 1.0, h: 0.3, fontSize: 9, color: C.muted, fontFace: 'Calibri', align: 'right' });
      s.addShape('roundRect', { x: 1.72, y: y + 0.06, w: 6.0, h: 0.2, fill: { color: '1A2A40' }, line: { color: '1A2A40', width: 0 }, rectRadius: 0.1 });
      s.addShape('roundRect', { x: 1.72, y: y + 0.06, w: 6.0 * pct, h: 0.2, fill: { color }, line: { color, width: 0 }, rectRadius: 0.1 });
      s.addText(val, { x: 7.8, y, w: 0.9, h: 0.3, fontSize: 9, color: C.ink, fontFace: 'Calibri', bold: true });
    });
  }

  // Slide 4 — Estructura
  {
    const s = slide(prs); addLogo(s); footer(s, 4, T);
    sectionTitle(s, '🗂️ ESTRUCTURA', 'Dos hojas, una idea', 'Separar los datos del resumen hace que todo sea más limpio y automático');
    s.addShape('roundRect', { x: 0.5, y: 2.05, w: 4.2, h: 3.2, fill: { color: C.bgCard }, line: { color: C.neon2, width: 1 }, rectRadius: 0.14 });
    s.addText('📋 Hoja "Datos"', { x: 0.65, y: 2.18, w: 3.9, h: 0.32, fontSize: 13, bold: true, color: C.cyan, fontFace: 'Calibri' });
    s.addText('Aquí registras todo lo que pasa', { x: 0.65, y: 2.5, w: 3.9, h: 0.25, fontSize: 11, color: C.muted, fontFace: 'Calibri' });
    [['A', 'Fecha'], ['B', 'Cliente'], ['C', 'Producto'], ['D', 'Monto (Q)'], ['E', 'Estado']].forEach(([col, label], i) => {
      s.addShape('roundRect', { x: 0.65, y: 2.82 + i * 0.45, w: 3.9, h: 0.38, fill: { color: '061525' }, line: { color: '1A2A40', width: 0.5 }, rectRadius: 0.06 });
      s.addText(`Col ${col}:`, { x: 0.8, y: 2.87 + i * 0.45, w: 0.9, h: 0.28, fontSize: 10.5, bold: true, color: C.neon, fontFace: 'Courier New' });
      s.addText(label, { x: 1.7, y: 2.87 + i * 0.45, w: 2.7, h: 0.28, fontSize: 11, color: C.ink, fontFace: 'Calibri' });
    });

    s.addShape('roundRect', { x: 5.1, y: 2.05, w: 4.4, h: 3.2, fill: { color: C.bgCard }, line: { color: C.green, width: 1 }, rectRadius: 0.14 });
    s.addText('📊 Hoja "Dashboard"', { x: 5.25, y: 2.18, w: 4.1, h: 0.32, fontSize: 13, bold: true, color: C.green, fontFace: 'Calibri' });
    s.addText('Lee los datos con fórmulas y los muestra bonito', { x: 5.25, y: 2.5, w: 4.1, h: 0.25, fontSize: 11, color: C.muted, fontFace: 'Calibri' });
    ['KPIs: total, meta, pendientes', 'Fórmulas apuntando a "Datos"', 'Formato condicional (colores)', 'Gráfica de ventas por semana', 'Se actualiza sola al agregar datos'].forEach((t, i) => {
      s.addText(`✓ ${t}`, { x: 5.25, y: 2.82 + i * 0.45, w: 4.1, h: 0.38, fontSize: 11.5, color: C.muted, fontFace: 'Calibri', valign: 'middle' });
    });
  }

  // Slide 5 — Fórmulas KPI
  {
    const s = slide(prs); addLogo(s); footer(s, 5, T);
    sectionTitle(s, '🔢 FÓRMULAS KPI', 'Las fórmulas de tu Dashboard', 'Pégalas en tu hoja Dashboard — apuntan automáticamente a tu hoja Datos');
    codeBox(s, '// Total vendido ESTE MES (se actualiza automáticamente)\n=SUMAR.SI.CONJUNTO(Datos!D:D, Datos!A:A, ">="&FECHA(AÑO(HOY()),MES(HOY()),1))\n\n// % de meta alcanzada (tu meta está en Dashboard!B2)\n=TEXTO(B5/B2,"0%")\n\n// Pedidos pendientes\n=CONTAR.SI(Datos!E:E,"Pendiente")\n\n// Promedio diario del mes\n=PROMEDIO.SI(Datos!A:A,">="&FECHA(AÑO(HOY()),MES(HOY()),1),Datos!D:D)', 0.5, 2.05, 9, 2.7, 'FÓRMULAS PARA HOJA DASHBOARD');
    calloutBox(s, '💡', 'La función HOY() hace que las fórmulas de "mes actual" se actualicen solas cada vez que abres el Sheet — sin que cambies nada.', 0.5, 4.85, 9);
  }

  // Slide 6 — Formato condicional
  {
    const s = slide(prs); addLogo(s); footer(s, 6, T);
    sectionTitle(s, '🎨 FORMATO CONDICIONAL', 'Que se pinte solo según el resultado', 'Selecciona la celda → Formato → Formato condicional → agrega estas 3 reglas');
    const rules = [
      [C.red, '🔴 ROJO', 'Es menor que', '0.5 (50%)', 'Meta en riesgo — acción urgente'],
      ['FFB800', '🟡 AMARILLO', 'Entre', '0.5 y 0.8', 'Hay que acelerar — todavía se puede'],
      [C.green, '🟢 VERDE', 'Mayor o igual que', '0.8 (80%)', 'Va bien — sigue así'],
    ];
    rules.forEach(([color, label, condicion, valor, sig], i) => {
      const y = 2.2 + i * 0.98;
      s.addShape('roundRect', { x: 0.5, y, w: 9, h: 0.84, fill: { color: C.bgCard }, line: { color, width: 1.5 }, rectRadius: 0.1 });
      s.addText(label, { x: 0.65, y: y + 0.06, w: 1.5, h: 0.3, fontSize: 12, bold: true, color: '#' + color, fontFace: 'Calibri' });
      s.addText(`Condición: ${condicion}`, { x: 2.3, y: y + 0.06, w: 3.0, h: 0.3, fontSize: 11, color: C.muted, fontFace: 'Calibri' });
      s.addText(`Valor: ${valor}`, { x: 2.3, y: y + 0.38, w: 3.0, h: 0.28, fontSize: 11, bold: true, color: C.ink, fontFace: 'Calibri' });
      s.addText(sig, { x: 5.45, y: y + 0.2, w: 4.0, h: 0.38, fontSize: 12, color: C.muted, fontFace: 'Calibri', italic: true, valign: 'middle' });
    });
    calloutBox(s, '✨', 'Para colorear FILAS completas en tu hoja Datos: selecciona el rango → Formato condicional → Fórmula personalizada → =$E1="Atrasado"', 0.5, 5.1, 9);
  }

  // Slide 7 — Script alertas
  {
    const s = slide(prs); addLogo(s); footer(s, 7, T);
    sectionTitle(s, '🚨 SCRIPT ALERTAS', 'Te avisa cuando algo va mal', 'Revisa los KPIs cada mañana y manda correo si hay problema');
    codeBox(s, 'function verificarAlertas() {\n  const dash = SpreadsheetApp.getActiveSpreadsheet()\n    .getSheetByName("Dashboard");\n  const ventasMes = dash.getRange("B5").getValue();\n  const meta = dash.getRange("B2").getValue();\n  const pendientes = dash.getRange("B8").getValue();\n  const pct = ventasMes / meta;\n  let alertas = [];\n\n  if (pct < 0.5) alertas.push(`🔴 Solo ${(pct*100).toFixed(0)}% de meta`);\n  else if (pct < 0.8) alertas.push(`🟡 ${(pct*100).toFixed(0)}% — hay que acelerar`);\n  if (pendientes > 20) alertas.push(`⚠️ ${pendientes} pedidos sin atender`);\n\n  if (alertas.length > 0)\n    GmailApp.sendEmail("tu@email.com", "🚨 Alerta Dashboard",\n      alertas.join("\\n") + `\\n\\nQ${ventasMes} / Meta: Q${meta}`);\n}', 0.5, 2.05, 9, 2.9, 'CÓDIGO — actívalo con trigger diario a las 7am');
  }

  // Slide 8 — TikTok
  {
    const s = slide(prs, { bg: '0D0520' });
    addLogo(s); footer(s, 8, T);
    s.addShape('rect', { x: 0, y: 0, w: 10, h: 0.55, fill: { color: '1A0A1F' } });
    s.addText('🎬  GUION DE TIKTOK — 85 segundos', { x: 0.3, y: 0.1, w: 9.4, h: 0.35, fontSize: 11, bold: true, color: C.tikRed, fontFace: 'Calibri', charSpacing: 1 });
    const scenes = [
      ['ESCENA 1 · 0:00-0:08', '"Mi cliente me pregunta cómo van las ventas — abro esto. Ve: total del mes, % de meta, pedidos pendientes. Una pantalla, todo actualizado."', '📱 Dashboard con KPIs en verde/rojo/amarillo'],
      ['ESCENA 2 · 0:08-0:22', '"Antes abría 3 hojas, sumaba a mano, calculaba el porcentaje. 10 minutos buscando info que ya tenía — solo dispersa."', '📱 Múltiples hojas abiertas, scrolling caótico'],
      ['ESCENA 3 · 0:22-0:55', '"Le expliqué mis columnas a Claude y le pedí: fórmulas para el KPI, formato condicional verde/amarillo/rojo y gráfica por semana. Todo en 30 segundos."', '📱 Claude generando fórmulas → dashboard tomando forma'],
      ['ESCENA 4 · 0:55-1:25', '"Y el extra: un script que revisa si las ventas están por debajo del 80% y me avisa por correo. Comenta DASHBOARD y te mando la guía con todo."', '📱 Gmail recibiendo alerta → KPI en rojo en el dashboard'],
    ];
    scenes.forEach(([title, voz, pantalla], i) => {
      const y = 0.65 + i * 1.18;
      s.addShape('roundRect', { x: 0.3, y, w: 9.4, h: 1.1, fill: { color: '0A0520' }, line: { color: '2A1040', width: 1 }, rectRadius: 0.1 });
      s.addText(title, { x: 0.45, y: y + 0.06, w: 4, h: 0.25, fontSize: 9, bold: true, color: C.tikRed, fontFace: 'Calibri', charSpacing: 1 });
      s.addText(`🎙 ${voz}`, { x: 0.45, y: y + 0.3, w: 9.1, h: 0.42, fontSize: 11, color: C.ink, fontFace: 'Calibri' });
      s.addText(pantalla, { x: 0.45, y: y + 0.74, w: 9.1, h: 0.26, fontSize: 10, color: '#FFD700', fontFace: 'Calibri', italic: true });
    });
  }

  // Slides 9-13
  for (let n = 9; n <= 13; n++) {
    const s = slide(prs); addLogo(s); footer(s, n, T);
    if (n === 9) {
      sectionTitle(s, '🤖 PROMPT MAESTRO', 'Cómo pedirle el dashboard completo a Claude', 'Un solo prompt para las fórmulas, el formato y el script de alertas');
      codeBox(s, 'Tengo Google Sheets con dos hojas:\n- "Ventas": Fecha (A), Cliente (B), Producto (C), Monto (D), Estado (E)\n- "Dashboard": hoja vacía\n\nNecesito:\n1. FÓRMULAS: total mes actual, % de meta (meta en B2), pedidos\n   pendientes, top 3 productos, promedio diario\n2. FORMATO CONDICIONAL: % meta → rojo <50%, amarillo 50-80%, verde >80%\n   filas Ventas → rojo si Estado = "Atrasado"\n3. SCRIPT Apps Script: revisa KPIs cada mañana, envía alerta si\n   % meta < 80% o pendientes > 20, incluye link al Sheet\n\nDame todo en orden, listo para usar.', 0.5, 2.0, 9, 3.0, 'PROMPT COMPLETO — para todas las partes del dashboard');
    } else if (n === 10) {
      sectionTitle(s, '📈 GRÁFICAS', 'Visualización que se actualiza sola', 'Conectadas a tus datos — cuando agregas ventas, la gráfica cambia sola');
      [['Crea tabla resumen por semana', 'Semana 1 en col A, =SUMAR.SI.CONJUNTO(...) en col B para cada período'], ['Selecciona las 2 columnas → Insertar → Gráfica', 'Sheets propone la mejor gráfica. Elige "barras" para comparar períodos'], ['Personaliza en el editor de gráficas', 'Doble clic → cambia colores, agrega título, muestra valores encima'], ['Mueve la gráfica al Dashboard', 'Arrástrala para que quede junto a tus KPIs en una sola vista']].forEach(([step, desc], i) => {
        const y = 2.15 + i * 0.75;
        s.addShape('ellipse', { x: 0.5, y: y + 0.1, w: 0.35, h: 0.35, fill: { color: C.neon2 } });
        s.addText(`${i + 1}`, { x: 0.5, y: y + 0.1, w: 0.35, h: 0.35, fontSize: 12, bold: true, color: C.white, fontFace: 'Calibri', align: 'center', valign: 'middle' });
        s.addShape('roundRect', { x: 0.96, y, w: 8.54, h: 0.6, fill: { color: C.bgCard }, line: { color: '1A2A40', width: 0.8 }, rectRadius: 0.08 });
        s.addText(step, { x: 1.12, y: y + 0.04, w: 8.2, h: 0.28, fontSize: 13, bold: true, color: C.cyan, fontFace: 'Calibri' });
        s.addText(desc, { x: 1.12, y: y + 0.32, w: 8.2, h: 0.22, fontSize: 11, color: C.muted, fontFace: 'Calibri' });
      });
    } else if (n === 11) {
      sectionTitle(s, '📋 RESUMEN', 'Tu dashboard completo', 'Todo lo que construiste en esta guía');
      ['Hoja "Datos" separada de hoja "Dashboard" — arquitectura limpia', 'Fórmulas KPI: SUMAR.SI.CONJUNTO + HOY() para mes actual automático', 'Formato condicional 3 niveles: verde 80%+, amarillo 50-79%, rojo <50%', 'Gráfica de barras por semana conectada a los datos', 'Script verificarAlertas() con trigger diario a las 7am', 'Prompt maestro para pedirle todo a Claude en un solo mensaje'].forEach((p, i) => {
        s.addShape('ellipse', { x: 0.5, y: 2.0 + i * 0.5, w: 0.22, h: 0.22, fill: { color: C.neon } });
        s.addText(p, { x: 0.85, y: 1.98 + i * 0.5, w: 8.65, h: 0.26, fontSize: 13, color: C.ink, fontFace: 'Calibri' });
      });
    } else if (n === 12) {
      sectionTitle(s, '🎓 SERIE COMPLETA', 'Las 4 guías de Google Sheets con IA', '');
      [['01', '📊 Formulas Esenciales', 'BUSCARV, SUMAR.SI, tablas dinámicas y trucos. Comenta SHEETS'], ['02', '🤖 Apps Script con Claude', 'Automatiza sin programar: 3 scripts completos. Comenta APPS'], ['03', '📧 Correos Automáticos', 'Confirmaciones, alertas de pago, reportes. Comenta CORREOS'], ['04', '📈 Dashboard con Alertas', 'Panel de control + alertas. Comenta DASHBOARD ← estás aquí']].forEach(([num, title, desc], i) => {
        const y = 2.0 + i * 0.85;
        s.addShape('roundRect', { x: 0.5, y, w: 9, h: 0.72, fill: { color: i === 3 ? '061A30' : C.bgCard }, line: { color: i === 3 ? C.neon : '1A2A40', width: i === 3 ? 1.5 : 0.8 }, rectRadius: 0.1 });
        s.addText(`#${num}`, { x: 0.65, y: y + 0.14, w: 0.5, h: 0.3, fontSize: 11, bold: true, color: C.neon, fontFace: 'Calibri' });
        s.addText(title, { x: 1.2, y: y + 0.06, w: 3.5, h: 0.3, fontSize: 13, bold: true, color: C.cyan, fontFace: 'Calibri' });
        s.addText(desc, { x: 1.2, y: y + 0.38, w: 7.8, h: 0.25, fontSize: 11, color: C.muted, fontFace: 'Calibri' });
      });
    } else {
      makeClosing(prs, 'DASHBOARD', T);
    }
  }

  await prs.writeFile({ fileName: path.join(outDir, 'Guia-Sheets-04-Dashboard-con-Alertas.pptx') });
  console.log('✅ Guia-Sheets-04-Dashboard-con-Alertas.pptx');
}

// ── EJECUTAR ──────────────────────────────────────────────────────
console.log('Generando presentaciones PowerPoint...\n');
await makeSheets01();
await makeSheets02();
await makeSheets03();
await makeSheets04();
console.log('\n🎉 Todas las presentaciones en /pptx/');
