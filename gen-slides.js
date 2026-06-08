/**
 * Generador de 60 carruseles para @menteenautomatico
 * 3 paletas rotativas: Naranja Fuego (0), Celestial (1), Blanco Limpio (2)
 *
 * USO: node gen-slides.js [inicio] [fin]
 *   node gen-slides.js          → genera posts 1-60
 *   node gen-slides.js 1 5      → genera posts 1-5
 *   node gen-slides.js 6 10     → genera posts 6-10
 *
 * CHECKPOINT: el script imprime al final qué posts se generaron.
 * Si la sesión se cierra, retoma con el siguiente rango.
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// ─── PALETAS ────────────────────────────────────────────────────────────────
const PALETAS = {
  naranja: {
    nombre: 'Naranja Fuego',
    bg: '#0D0500',
    glow: 'radial-gradient(ellipse 70% 55% at 50% 105%, rgba(255,110,0,0.45) 0%, transparent 65%)',
    pillBg: 'linear-gradient(135deg,#FF6A00,#FF9B00)',
    pillColor: '#fff',
    accent: '#FF7A00',
    text: '#FFFFFF',
    subtext: 'rgba(255,255,255,0.55)',
    handle: 'rgba(255,255,255,0.25)',
    dotActive: '#FF7A00',
    dotInactive: 'rgba(255,255,255,0.2)',
    cardBg: 'rgba(255,255,255,0.05)',
    cardBorder: 'rgba(255,120,0,0.2)',
    numColor: '#FF9B00',
  },
  celestial: {
    nombre: 'Celestial',
    bg: '#020B20',
    glow: 'radial-gradient(ellipse 65% 50% at 50% 20%, rgba(70,100,255,0.38) 0%, transparent 65%)',
    pillBg: 'linear-gradient(135deg,#5B7FFF,#8B61FF)',
    pillColor: '#fff',
    accent: '#6B8FFF',
    text: '#FFFFFF',
    subtext: 'rgba(255,255,255,0.55)',
    handle: 'rgba(255,255,255,0.25)',
    dotActive: '#6B8FFF',
    dotInactive: 'rgba(255,255,255,0.2)',
    cardBg: 'rgba(255,255,255,0.05)',
    cardBorder: 'rgba(100,140,255,0.2)',
    numColor: '#8B9FFF',
  },
  blanco: {
    nombre: 'Blanco Limpio',
    bg: '#FFFFFF',
    glow: 'none',
    pillBg: 'linear-gradient(135deg,#111,#333)',
    pillColor: '#fff',
    accent: '#111111',
    text: '#111111',
    subtext: 'rgba(0,0,0,0.5)',
    handle: 'rgba(0,0,0,0.3)',
    dotActive: '#111111',
    dotInactive: 'rgba(0,0,0,0.15)',
    cardBg: '#F5F5F5',
    cardBorder: 'rgba(0,0,0,0.08)',
    numColor: '#333333',
  },
};

const PALETA_ORDEN = ['naranja', 'celestial', 'blanco'];

// ─── CONTENIDO: 60 CARRUSELES ────────────────────────────────────────────────
const POSTS = [
  // ═══ BLOQUE 1: HERRAMIENTAS & FUNDAMENTOS (1-10) ════════════════════════
  {
    post: 1, categoria: 'HERRAMIENTA IA · POST 1',
    titulo: 'La herramienta que más\nusa el mundo en silencio.',
    sub: 'Claude AI: más potente de lo que crees. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: '¿Qué puede hacer Claude?', items: ['Escribir emails, reportes y contratos', 'Analizar documentos de 200 páginas', 'Programar sin que sepas código', 'Automatizar tareas repetitivas'] },
      { tipo: 'comparacion', tit: 'Claude vs ChatGPT', filas: [['Contexto', '200K tokens', '128K tokens'], ['Razonamiento', 'Superior', 'Bueno'], ['Precio', 'Gratis', 'Gratis/Plus'], ['Para negocios', '✓ Ideal', '✓ Bueno']] },
      { tipo: 'tips', tit: '3 formas de usarlo HOY', tips: ['Escribe propuestas de venta en 2 min', 'Resume reuniones grabadas', 'Crea contenido para un mes en 1 hora'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 2, categoria: 'TUTORIAL · POST 2',
    titulo: 'Crea tu cuenta de\nClaude GRATIS en 3 pasos.',
    sub: 'Sin tarjeta de crédito. Sin tecnicismos. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'pasos', tit: 'Paso a paso', pasos: ['Ve a claude.ai desde tu navegador', 'Haz clic en "Sign up" e ingresa tu email', 'Verifica tu número de teléfono', '¡Listo! Ya tienes acceso gratis'] },
      { tipo: 'lista', tit: '¿Qué incluye la versión gratis?', items: ['Acceso a Claude 3.5 Sonnet', 'Mensajes diarios incluidos', 'Subir archivos PDF y documentos', 'Sin necesidad de instalar nada'] },
      { tipo: 'tips', tit: 'Tu primer prompt de prueba', tips: ['Escríbele: "Ayúdame a escribir un email profesional para..."', 'Pídele: "Resume este texto en 5 puntos"', 'Prueba: "Crea un plan de trabajo para esta semana"'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 3, categoria: 'TIPS NEGOCIO · POST 3',
    titulo: 'Si tienes negocio y no\nusas IA, estás perdiendo.',
    sub: '5 tareas que deberías delegar a la IA HOY. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: '5 tareas para delegar a la IA', items: ['Responder mensajes de clientes (plantillas)', 'Crear publicaciones para redes sociales', 'Redactar presupuestos y cotizaciones', 'Analizar reseñas y comentarios', 'Escribir descripciones de productos'] },
      { tipo: 'tips', tit: 'Cuánto tiempo ahorras', tips: ['Contenido semanal: 4 horas → 30 minutos', 'Emails de clientes: 2 horas → 20 minutos', 'Reportes mensuales: 3 horas → 15 minutos'] },
      { tipo: 'lista', tit: 'Por dónde empezar', items: ['Elige UNA tarea repetitiva esta semana', 'Escríbela como instrucción a Claude', 'Prueba 3 veces y ajusta el prompt', 'Escala al resto del equipo'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 4, categoria: 'HERRAMIENTA IA · POST 4',
    titulo: 'Gemini: la IA que ya\ntienes en tu Gmail.',
    sub: 'La IA de Google que muy pocos usan bien. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: '¿Qué es Gemini?', items: ['La IA oficial de Google', 'Integrada en Gmail, Docs y Drive', 'Busca en internet en tiempo real', 'Versión gratis muy potente'] },
      { tipo: 'pasos', tit: 'Cómo activarlo en Gmail', pasos: ['Abre Gmail en el navegador', 'Busca el ícono de Gemini (estrella)', 'Haz clic en "Ayúdame a escribir"', 'Describe el email que necesitas'] },
      { tipo: 'tips', tit: 'Casos de uso reales', tips: ['Resume hilos largos de email en segundos', 'Redacta respuestas profesionales al instante', 'Genera borradores de propuestas desde Drive'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 5, categoria: 'TUTORIAL · POST 5',
    titulo: 'Escribe prompts que\nrealmente funcionan.',
    sub: 'La fórmula secreta para hablarle a la IA. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: 'La fórmula: RCTF', items: ['R → Rol: "Actúa como experto en marketing"', 'C → Contexto: describe tu situación', 'T → Tarea: qué quieres exactamente', 'F → Formato: cómo quieres la respuesta'] },
      { tipo: 'pasos', tit: 'Ejemplo real paso a paso', pasos: ['ROL: "Eres un experto en ventas B2B"', 'CONTEXTO: "Vendo software a restaurantes"', 'TAREA: "Escribe un email de seguimiento"', 'FORMATO: "3 párrafos, tono amigable"'] },
      { tipo: 'tips', tit: 'Errores que arruinan tu prompt', tips: ['Ser demasiado vago: "Escríbeme algo"', 'No dar contexto de tu negocio', 'Pedir todo en un solo mensaje'] },
      { tipo: 'cta' },
    ],
  },

  // ═══ BLOQUE 2: CLAUDE CODE & SKILLS (6-15) ══════════════════════════════
  {
    post: 6, categoria: 'HERRAMIENTA IA · POST 6',
    titulo: 'No necesitas saber código\npara construir apps.',
    sub: 'Claude Code: la revolución que llegó para quedarse. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: '¿Qué es Claude Code?', items: ['Una versión de Claude que programa por ti', 'Crea apps, webs y automatizaciones', 'Se instala en tu computadora', 'Funciona con comandos en lenguaje natural'] },
      { tipo: 'comparacion', tit: 'Con vs Sin Claude Code', filas: [['Crear una web', '2 semanas + $800', '1 día gratis'], ['App de inventario', 'Programador', 'Tú mismo'], ['Automatización', 'Agencia', 'Claude Code']] },
      { tipo: 'tips', tit: 'Qué puedes construir', tips: ['Página web para tu negocio en 1 día', 'Sistema de inventario personalizado', 'Bot de WhatsApp para atención al cliente'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 7, categoria: 'TUTORIAL · POST 7',
    titulo: 'Instala Claude Code\nen 5 minutos.',
    sub: 'Paso a paso, sin complicaciones. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'pasos', tit: 'Instalación en Windows/Mac', pasos: ['Instala Node.js desde nodejs.org (gratis)', 'Abre la terminal o símbolo del sistema', 'Escribe: npm install -g @anthropic-ai/claude-code', 'Ejecuta: claude y sigue las instrucciones'] },
      { tipo: 'lista', tit: 'Qué necesitas antes', items: ['Una computadora con Windows, Mac o Linux', 'Conexión a internet', 'Cuenta en claude.ai (gratis)', 'Ganas de aprender — lo demás lo hace Claude'] },
      { tipo: 'tips', tit: 'Tu primera prueba', tips: ['Crea una carpeta vacía en tu escritorio', 'Ábrela en la terminal', 'Escríbele: "Crea una web simple de mi negocio"', 'Observa cómo Claude construye todo'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 8, categoria: 'CLAUDE CODE · POST 8',
    titulo: 'Los Skills: instala\nsuperpoderes en tu IA.',
    sub: 'Qué son y cómo cambian todo. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: '¿Qué son los Skills?', items: ['Extensiones que amplían lo que Claude hace', 'Se instalan con un solo comando', 'Conectan Claude con otras herramientas', 'Comunidad crea nuevos skills cada semana'] },
      { tipo: 'pasos', tit: 'Instala tu primer skill', pasos: ['Abre Claude Code en tu terminal', 'Escribe: /skills add anthropic/web-search', 'Espera la confirmación de instalación', 'Ahora Claude puede buscar en internet'] },
      { tipo: 'tips', tit: 'Skills más útiles para negocios', tips: ['web-search: busca información actualizada', 'supabase: maneja bases de datos', 'gmail: lee y envía emails automáticamente'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 9, categoria: 'TUTORIAL · POST 9',
    titulo: 'Conecta Claude con\nGoogle Drive en 10 min.',
    sub: 'MCP: la tecnología que lo hace posible. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: '¿Qué es MCP?', items: ['Model Context Protocol — el puente de Claude', 'Conecta Claude con cualquier app', 'Gmail, Drive, WhatsApp, Sheets y más', 'Una vez configurado, trabaja solo'] },
      { tipo: 'pasos', tit: 'MCP con Google Drive', pasos: ['Ve a la config de Claude Code', 'Añade el servidor MCP de Google Drive', 'Autoriza con tu cuenta de Google', 'Claude ahora puede leer y crear archivos'] },
      { tipo: 'tips', tit: 'Lo que puedes hacer', tips: ['"Claude, resume todos los documentos de esta carpeta"', '"Crea un reporte con los datos de esta hoja"', '"Busca en mis archivos los contratos de 2024"'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 10, categoria: 'HERRAMIENTA IA · POST 10',
    titulo: 'Perplexity: la IA que\nbusca en internet por ti.',
    sub: 'Olvídate de Google para investigar. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: '¿Qué hace Perplexity?', items: ['Busca en internet en tiempo real', 'Cita las fuentes de cada respuesta', 'Resume noticias y tendencias', 'Gratis con límite generoso'] },
      { tipo: 'comparacion', tit: 'Perplexity vs Google', filas: [['Formato respuesta', 'Resumen claro', 'Lista de links'], ['Tiempo', '5 segundos', '5 minutos leyendo'], ['Fuentes', 'Citadas', 'Tú las evalúas'], ['Para negocios', 'Investigación rápida', 'Búsqueda general']] },
      { tipo: 'tips', tit: 'Úsalo para tu negocio', tips: ['Investiga competidores en minutos', 'Monitorea noticias de tu industria', 'Genera reportes de mercado rápidos'] },
      { tipo: 'cta' },
    ],
  },

  // ═══ BLOQUE 3: AUTOMATIZACIONES (11-20) ══════════════════════════════════
  {
    post: 11, categoria: 'AUTOMATIZACIONES · POST 11',
    titulo: 'Si lo haces más de\n3 veces, automatízalo.',
    sub: 'Qué es una automatización y por qué la necesitas. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: '¿Qué es una automatización?', items: ['Una tarea que se ejecuta sola, sin ti', 'Conecta dos o más aplicaciones', 'Se activa por un evento (email, formulario...)', 'Trabaja 24/7 sin descanso ni errores'] },
      { tipo: 'tips', tit: 'Ejemplos que ya existen en tu negocio', tips: ['Cliente llena formulario → tú recibes email', 'Compra realizada → factura generada', 'Post en Instagram → guardado automático'] },
      { tipo: 'lista', tit: '¿Qué puedes automatizar tú?', items: ['Respuestas a clientes nuevos', 'Reportes semanales de ventas', 'Publicaciones en redes sociales', 'Seguimiento a propuestas enviadas'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 12, categoria: 'TUTORIAL · POST 12',
    titulo: 'Tu primera automatización\ncon Make en 15 min.',
    sub: 'Sin código. Sin experiencia. Solo seguir pasos. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'pasos', tit: 'Crear en Make (antes Integromat)', pasos: ['Crea cuenta gratis en make.com', 'Haz clic en "Create a new scenario"', 'Elige tu disparador (ej: Google Forms)', 'Elige tu acción (ej: enviar email)', 'Activa el escenario y pruébalo'] },
      { tipo: 'lista', tit: 'Automatización #1 recomendada', items: ['CUANDO: cliente llena tu formulario de contacto', 'ENTONCES: Claude redacta respuesta personalizada', 'Y TAMBIÉN: te avisa por WhatsApp', 'RESULTADO: cliente atendido en segundos'] },
      { tipo: 'tips', tit: 'Make vs Zapier', tips: ['Make: más visual, más poderoso, más barato', 'Zapier: más simple, más caro, más conectores', 'Para empezar: Make gratis es suficiente'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 13, categoria: 'AUTOMATIZACIONES · POST 13',
    titulo: 'Google Sheets + Claude\n= reportes que se hacen solos.',
    sub: 'Conecta tu Excel favorito con inteligencia artificial. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: '¿Cómo funciona la conexión?', items: ['Claude lee tu hoja de cálculo en tiempo real', 'Analiza los datos y detecta patrones', 'Genera el reporte en el formato que quieras', 'Lo envía por email o lo guarda en Drive'] },
      { tipo: 'pasos', tit: 'Configura en 3 pasos', pasos: ['Instala el MCP de Google Sheets en Claude Code', 'Autoriza acceso a tu cuenta de Google', 'Dile a Claude: "Genera reporte semanal de ventas"', '¡El reporte aparece listo en tu carpeta!'] },
      { tipo: 'tips', tit: 'Qué reportes puede generar', tips: ['Ventas del mes vs mes anterior', 'Top 10 productos más vendidos', 'Clientes que no han comprado en 30 días'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 14, categoria: 'TUTORIAL · POST 14',
    titulo: 'Bot de WhatsApp con IA\npara tu negocio.',
    sub: 'Atiende 100 clientes mientras duermes. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: '¿Qué puede hacer el bot?', items: ['Responder preguntas frecuentes 24/7', 'Tomar pedidos y reservaciones', 'Enviar catálogos y precios automáticamente', 'Escalar a humano cuando sea necesario'] },
      { tipo: 'pasos', tit: 'Opciones para crearlo', pasos: ['Opción A: Manychat (más simple, pago)', 'Opción B: Make + WhatsApp API (más control)', 'Opción C: Claude Code + Twilio (más poderoso)', 'Recomendado para empezar: Manychat'] },
      { tipo: 'tips', tit: 'Mensajes que debes automatizar primero', tips: ['Bienvenida al nuevo contacto', 'Respuesta a "¿Cuánto cuesta?"', 'Confirmación de pedidos y citas'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 15, categoria: 'GUÍA COMPLETA · POST 15',
    titulo: 'De 0 a automatizado:\ntu negocio en 1 semana.',
    sub: 'El plan exacto, día por día. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'pasos', tit: 'Plan de 5 días', pasos: ['Día 1: Mapea las 10 tareas más repetitivas', 'Día 2: Automatiza respuestas de WhatsApp', 'Día 3: Conecta formularios con tu CRM', 'Día 4: Automatiza reportes en Sheets', 'Día 5: Prueba todo y ajusta'] },
      { tipo: 'lista', tit: 'Herramientas que necesitas (todas gratis)', items: ['Claude AI o Claude Code', 'Make (plan gratuito)', 'Google Workspace (Sheets, Forms, Gmail)', 'WhatsApp Business (gratis)'] },
      { tipo: 'tips', tit: 'El secreto del éxito', tips: ['Empieza por UNA automatización, no diez', 'Pruébala durante 1 semana antes de la siguiente', 'Documenta cada flujo para tu equipo'] },
      { tipo: 'cta' },
    ],
  },

  // ═══ BLOQUE 4: IA PARA MARKETING (16-25) ═════════════════════════════════
  {
    post: 16, categoria: 'IA PARA MARKETING · POST 16',
    titulo: 'Un mes de contenido\nen 1 hora con IA.',
    sub: 'El sistema exacto que uso yo. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'pasos', tit: 'El sistema paso a paso', pasos: ['Define tus 4 pilares de contenido', 'Dile a Claude: "Genera 20 ideas para [pilar]"', 'Selecciona las mejores y pídele el guion', 'Usa Canva AI para los diseños visuales', 'Programa todo en Buffer o Meta Suite'] },
      { tipo: 'lista', tit: '4 pilares de contenido que funcionan', items: ['Educativo: enseña algo útil de tu industria', 'Inspiracional: historia o logro personal', 'Promocional: producto/servicio con valor', 'Entretenimiento: meme o curiosidad del sector'] },
      { tipo: 'tips', tit: 'El prompt que más uso', tips: ['"Eres experto en [industria]. Crea 5 ganchos de carrusel sobre [tema] para dueños de [negocio]"', 'Pídele variaciones hasta que uno te enamore'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 17, categoria: 'TUTORIAL · POST 17',
    titulo: 'Genera imágenes con IA\nsin pagar un peso.',
    sub: 'Las mejores herramientas gratuitas de 2025. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: 'Top 3 generadores gratuitos', items: ['Canva AI: el más fácil, integrado con diseño', 'Adobe Firefly: calidad profesional, gratis', 'Microsoft Image Creator: powered by DALL-E', 'Ideogram: texto en imágenes sin errores'] },
      { tipo: 'tips', tit: 'Cómo escribir el prompt de imagen', tips: ['"Foto profesional de [producto], fondo blanco, iluminación de estudio"', '"Ilustración minimalista de [concepto], colores [paleta], estilo flat"', 'Siempre especifica: estilo, colores, fondo'] },
      { tipo: 'pasos', tit: 'Flujo de trabajo con Canva AI', pasos: ['Abre Canva y crea un diseño nuevo', 'Clic en "Generar con IA" en la barra lateral', 'Describe la imagen que necesitas', 'Ajusta y descarga en alta resolución'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 18, categoria: 'IA PARA MARKETING · POST 18',
    titulo: 'Escribe copies que venden\ncon un prompt.',
    sub: 'El framework AIDA + Claude = ventas automáticas. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: 'El framework AIDA', items: ['A - Atención: gancho que detiene el scroll', 'I - Interés: problema que el cliente siente', 'D - Deseo: la transformación que quiere', 'A - Acción: qué hacer ahora mismo'] },
      { tipo: 'tips', tit: 'El prompt para copies de venta', tips: ['"Escribe un copy AIDA para [producto], cliente ideal: [descripción], problema que resuelve: [problema], precio: [precio]"'] },
      { tipo: 'comparacion', tit: 'Copy sin IA vs con IA', filas: [['Tiempo', '2 horas', '5 minutos'], ['Versiones', '1-2', '10+'], ['Costo', '$200 copywriter', 'Gratis'], ['Efectividad', 'Depende', 'Testeable rápido']] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 19, categoria: 'TUTORIAL · POST 19',
    titulo: 'Crea tu página web\nen 1 día con IA.',
    sub: 'Sin agencia. Sin $800. Sin semanas de espera. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'pasos', tit: 'El proceso completo', pasos: ['Describe tu negocio a Claude Code en detalle', '"Crea una web profesional con estas secciones..."', 'Claude genera todo el código en minutos', 'Publica gratis en GitHub Pages o Netlify', '¡Tu web está lista para recibir clientes!'] },
      { tipo: 'lista', tit: 'Secciones que no pueden faltar', items: ['Hero: propuesta de valor clara en 1 frase', 'Servicios: qué haces y para quién', 'Testimonios: prueba social real', 'Contacto: formulario o WhatsApp directo'] },
      { tipo: 'tips', tit: 'Herramientas para publicar gratis', tips: ['GitHub Pages: perfecto para webs estáticas', 'Netlify: más funciones, también gratis', 'Vercel: ideal si usas React o Next.js'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 20, categoria: 'IA PARA MARKETING · POST 20',
    titulo: 'El calendario de contenido\nque nunca falla.',
    sub: 'Sistema de 90 días automatizado con Claude. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: 'Estructura del calendario', items: ['Lunes: educativo (enseña algo)', 'Miércoles: caso de éxito o testimonio', 'Viernes: promocional o detrás de cámaras', 'Domingo: reflexión o motivación'] },
      { tipo: 'tips', tit: 'Prompt para el calendario completo', tips: ['"Crea un calendario de contenido para Instagram de 30 días para [negocio]. Pilares: [lista]. Incluye: gancho, descripción, hashtags para cada post"'] },
      { tipo: 'pasos', tit: 'Automatiza la publicación', pasos: ['Genera el contenido con Claude', 'Crea diseños en lote con Canva AI', 'Sube todo a Buffer o Meta Suite', 'Programa para las horas de mayor alcance'] },
      { tipo: 'cta' },
    ],
  },

  // ═══ BLOQUE 5: PROMPTS AVANZADOS (21-30) ═════════════════════════════════
  {
    post: 21, categoria: 'PROMPTS REALES · POST 21',
    titulo: '10 prompts para\nlogística y operaciones.',
    sub: 'Los que uso en mi negocio todos los días. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: 'Prompts para inventario', items: ['"Analiza esta lista de inventario y dime qué productos están bajo mínimos"', '"Crea un sistema de alertas de stock para [producto]"', '"Genera un reporte de rotación de inventario del mes"'] },
      { tipo: 'lista', tit: 'Prompts para proveedores', items: ['"Redacta un email de negociación de precio con el proveedor X"', '"Compara estas 3 cotizaciones y recomiéndame la mejor"', '"Crea un contrato simple de proveedor para [servicio]"'] },
      { tipo: 'tips', tit: 'Tip para mejores resultados', tips: ['Siempre adjunta los datos reales (Excel, PDF)', 'Especifica en qué moneda y unidades trabajas', 'Pide el resultado en formato tabla para copiar fácil'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 22, categoria: 'HERRAMIENTA IA · POST 22',
    titulo: 'Notion AI: tu base de\nconocimiento inteligente.',
    sub: 'Organiza tu empresa con IA integrada. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: '¿Qué puede hacer Notion AI?', items: ['Resumir notas y documentos largos', 'Generar agendas y actas de reunión', 'Completar tablas y bases de datos', 'Traducir documentos al instante'] },
      { tipo: 'pasos', tit: 'Configuración básica para negocios', pasos: ['Crea cuenta en Notion (gratis)', 'Activa Notion AI en configuración', 'Crea tu primera base de datos de clientes', 'Usa /AI en cualquier página para activarla'] },
      { tipo: 'tips', tit: 'Templates de Notion para negocios', tips: ['CRM simple con IA integrada', 'Wiki de procesos de tu empresa', 'Tracker de proyectos con resúmenes automáticos'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 23, categoria: 'PROMPTS REALES · POST 23',
    titulo: '5 prompts para\nventas que cierran.',
    sub: 'Copia, pega y ve cómo sube tu conversión. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: 'Prompts para prospectar', items: ['"Escribe un mensaje de primer contacto para [tipo de cliente] que vende [producto]"', '"Crea 5 variaciones del subject de email frío para [industria]"'] },
      { tipo: 'lista', tit: 'Prompts para seguimiento', items: ['"Redacta un email de seguimiento para cliente que vio propuesta hace 3 días"', '"Crea un guion de llamada de seguimiento no invasivo"', '"Escribe un mensaje de último intento antes de cerrar el caso"'] },
      { tipo: 'tips', tit: 'Prompts para objeciones', tips: ['"El cliente dice [objeción]. Dame 3 respuestas que neutralicen sin presionar"', '"Crea un FAQ de las 10 objeciones más comunes de mi producto"'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 24, categoria: 'TUTORIAL · POST 24',
    titulo: 'Analiza tus números\ncon Claude en segundos.',
    sub: 'Sube tu Excel y obtén decisiones de negocio. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'pasos', tit: 'Cómo analizar datos con Claude', pasos: ['Ve a claude.ai y sube tu archivo Excel o CSV', 'Escribe: "Analiza estos datos y dime los 3 problemas principales"', 'Pide: "¿Qué producto debo promover más este mes?"', 'Solicita: "Crea un resumen ejecutivo para compartir con mi equipo"'] },
      { tipo: 'lista', tit: 'Análisis que puedes pedir', items: ['Tendencias de ventas por mes/producto', 'Clientes que más y menos compran', 'Horarios de mayor demanda', 'Comparación con período anterior'] },
      { tipo: 'tips', tit: 'Consejos para mejores análisis', tips: ['Limpia tu Excel antes: sin filas vacías ni celdas mezcladas', 'Incluye fechas y categorías en columnas separadas', 'Pide siempre una conclusión + recomendación de acción'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 25, categoria: 'PROMPTS REALES · POST 25',
    titulo: 'Prompts para atención\nal cliente con IA.',
    sub: 'Responde mejor y más rápido que nunca. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: 'Prompts de respuesta rápida', items: ['"El cliente se queja de [problema]. Redacta una respuesta empática y con solución"', '"Crea 10 respuestas tipo para las preguntas más frecuentes de [negocio]"', '"Transforma este mensaje enojado en una conversación de solución"'] },
      { tipo: 'lista', tit: 'Prompts para mejorar el servicio', items: ['"Analiza estas 20 reseñas negativas y dime los patrones"', '"¿Qué puedo mejorar en mi proceso de entrega según estas quejas?"', '"Crea un protocolo de atención al cliente para mi equipo"'] },
      { tipo: 'tips', tit: 'Automatiza las respuestas', tips: ['Crea un banco de respuestas con Claude', 'Úsalas en ManyChat o tu plataforma de chat', 'Actualiza el banco cada mes con nuevas preguntas'] },
      { tipo: 'cta' },
    ],
  },

  // ═══ BLOQUE 6: IA PARA FINANZAS Y RRHH (26-35) ══════════════════════════
  {
    post: 26, categoria: 'IA PARA NEGOCIOS · POST 26',
    titulo: 'IA para tus finanzas:\nsin contador y sin errores.',
    sub: 'Lo que Claude puede hacer con tus números. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: '¿Qué puede hacer Claude con tus finanzas?', items: ['Categorizar gastos de un estado de cuenta', 'Detectar gastos innecesarios o irregulares', 'Proyectar flujo de caja a 3 meses', 'Generar reportes financieros en minutos'] },
      { tipo: 'pasos', tit: 'Análisis financiero básico', pasos: ['Descarga tu estado de cuenta en PDF o Excel', 'Sube el archivo a claude.ai', '"Categoriza estos gastos por tipo de negocio"', '"¿En qué estoy gastando de más comparado con el mes anterior?"'] },
      { tipo: 'tips', tit: 'Lo que NO puede hacer (por ahora)', tips: ['Declarar impuestos (usa un contador para eso)', 'Acceder a tus cuentas directamente', 'Hacer pagos o transferencias'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 27, categoria: 'TUTORIAL · POST 27',
    titulo: 'Crea tu CRM gratis\ncon IA en un día.',
    sub: 'Gestiona clientes sin pagar Salesforce. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: 'Qué necesitas para un CRM simple', items: ['Google Sheets (gratis)', 'Claude Code para automatizar', 'Make para los flujos de datos', 'Google Forms para capturar leads'] },
      { tipo: 'pasos', tit: 'Construye tu CRM paso a paso', pasos: ['Crea una Hoja de Google con columnas: Nombre, Contacto, Estado, Última interacción', 'Conecta tu formulario de contacto web a la hoja', 'Usa Make para automatizar seguimientos', 'Pide a Claude Code que genere un dashboard de ventas'] },
      { tipo: 'tips', tit: 'Columnas que no pueden faltar', tips: ['Estado: Prospecto / Activo / Inactivo / Perdido', 'Próxima acción + fecha', 'Valor potencial del cliente'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 28, categoria: 'IA PARA NEGOCIOS · POST 28',
    titulo: 'Recluta mejor con IA:\nmenos tiempo, mejores hires.',
    sub: 'Del anuncio a la entrevista con IA. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: 'IA en cada etapa del reclutamiento', items: ['Redacción del anuncio de trabajo', 'Filtrado de CVs por criterios específicos', 'Generación de preguntas de entrevista', 'Evaluación de respuestas de candidatos'] },
      { tipo: 'tips', tit: 'Prompts para reclutar', tips: ['"Crea un anuncio de trabajo para [puesto] en [empresa] que atraiga candidatos con [perfil]"', '"Evalúa este CV para el puesto [X] y dame un puntaje del 1-10"', '"Genera 10 preguntas de entrevista para [puesto] enfocadas en [habilidad]"'] },
      { tipo: 'pasos', tit: 'Flujo de reclutamiento con IA', pasos: ['Claude redacta el anuncio → Publica en LinkedIn/Workana', 'CVs recibidos → Claude los filtra y rankea', 'Claude genera preguntas para cada candidato', 'Después de entrevista: Claude ayuda a comparar'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 29, categoria: 'HERRAMIENTA IA · POST 29',
    titulo: 'Canva AI: diseña sin\nser diseñador.',
    sub: 'Todo lo que hace la IA dentro de Canva. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: '6 funciones de IA en Canva', items: ['Magic Write: genera texto para cualquier diseño', 'Magic Design: crea diseños desde una frase', 'Background Remover: elimina fondos al instante', 'Magic Eraser: borra objetos de fotos', 'Translate: traduce diseños completos', 'Text to Image: genera imágenes únicas'] },
      { tipo: 'tips', tit: 'Flujo de trabajo con Canva AI', tips: ['Describe el diseño que necesitas en Magic Design', 'Genera la imagen con Text to Image', 'Ajusta el texto con Magic Write', 'Descarga y publica'] },
      { tipo: 'pasos', tit: 'Crea un carrusel en 10 minutos', pasos: ['Elige plantilla "Carrusel de Instagram"', 'Activa Magic Design y describe tu tema', 'Ajusta con Magic Write para cada slide', 'Descarga en alta calidad y publica'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 30, categoria: 'GUÍA COMPLETA · POST 30',
    titulo: 'Tu stack de IA para\nnegocios en 2025.',
    sub: 'Las 7 herramientas que realmente uso. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: 'El stack completo (todas gratis para empezar)', items: ['Claude AI: el cerebro principal', 'Perplexity: investigación y búsquedas', 'Canva AI: diseño visual', 'Notion AI: organización y documentación', 'Make: automatizaciones', 'Google Workspace: base de datos y colaboración', 'ManyChat: comunicación con clientes'] },
      { tipo: 'comparacion', tit: 'Costo: con vs sin IA', filas: [['Contenido mensual', '$500 agencia', '$0 tú mismo'], ['Automatizaciones', '$300 dev', '$0 Make gratis'], ['Diseño', '$200 diseñador', '$0 Canva AI'], ['Total', '$1,000+/mes', '$0 para empezar']] },
      { tipo: 'tips', tit: 'Por dónde empezar', tips: ['Semana 1: Claude AI + Canva', 'Semana 2: Make + Google Sheets', 'Semana 3: Notion + ManyChat', 'Semana 4: Integra todo con Claude Code'] },
      { tipo: 'cta' },
    ],
  },

  // ═══ BLOQUE 7: CASOS DE USO REALES (31-40) ════════════════════════════════
  {
    post: 31, categoria: 'CASO DE USO · POST 31',
    titulo: 'Cómo un restaurante\naumentó ventas 30% con IA.',
    sub: 'Historia real. Estrategia replicable. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: 'El problema inicial', items: ['60% de reservas nunca llegaban', 'Redes sociales desactualizadas', 'Menú nunca en la web', '0 seguimiento a clientes anteriores'] },
      { tipo: 'pasos', tit: 'Solución con IA en 2 semanas', pasos: ['Bot de WhatsApp confirma reservas automáticamente', 'Claude genera 30 posts de menú por mes', 'Make envía recordatorio 2h antes de la reserva', 'CRM en Sheets trackea clientes frecuentes'] },
      { tipo: 'tips', tit: 'Resultados al mes 3', tips: ['Reservas sin presentarse: de 60% a 8%', 'Seguidores en Instagram: +45%', 'Clientes recurrentes: +30%', 'Tiempo del dueño en marketing: -10 horas/semana'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 32, categoria: 'TUTORIAL · POST 32',
    titulo: 'Automatiza tu facturación\ncon IA en un fin de semana.',
    sub: 'De pedido a factura sin tocar nada. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'pasos', tit: 'El flujo automatizado', pasos: ['Cliente paga → disparador en tu plataforma de pago', 'Make recibe el pago y extrae los datos', 'Claude genera la factura en el formato legal', 'Gmail la envía automáticamente al cliente'] },
      { tipo: 'lista', tit: 'Herramientas para el flujo', items: ['Make (gratis hasta 1,000 ops/mes)', 'Stripe o PayPal para pagos', 'Claude para generar el documento', 'Google Drive para archivar facturas'] },
      { tipo: 'tips', tit: 'Importante para la legalidad', tips: ['Verifica el formato de factura con tu contador', 'Añade los datos fiscales correctos en el prompt', 'Guarda siempre copia en Google Drive'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 33, categoria: 'IA PARA NEGOCIOS · POST 33',
    titulo: 'El chatbot que cierra\nventas mientras duermes.',
    sub: 'IA conversacional para tu negocio. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: '¿Qué hace un chatbot de ventas con IA?', items: ['Califica al prospecto con preguntas estratégicas', 'Responde objeciones con argumentos personalizados', 'Muestra el producto correcto según el perfil', 'Cierra con llamada a la acción directa'] },
      { tipo: 'comparacion', tit: 'Bot simple vs Bot con IA', filas: [['Personalización', 'Respuestas fijas', 'Adapta cada conversación'], ['Objeciones', 'No sabe manejar', 'Responde inteligente'], ['Disponibilidad', '24/7', '24/7'], ['Conversión', 'Baja', 'Alta']] },
      { tipo: 'tips', tit: 'Plataformas recomendadas', tips: ['Tidio: fácil de configurar con IA incluida', 'Crisp: gratis con funciones básicas de IA', 'ManyChat: ideal para Instagram y WhatsApp'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 34, categoria: 'HERRAMIENTA IA · POST 34',
    titulo: 'ElevenLabs: da voz\na tu marca con IA.',
    sub: 'Audios profesionales sin micrófono ni estudio. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: '¿Qué hace ElevenLabs?', items: ['Convierte texto en voz ultra-realista', 'Clona tu propia voz en minutos', 'Más de 30 idiomas y acentos', 'API disponible para automatizar'] },
      { tipo: 'tips', tit: 'Usos para tu negocio', tips: ['Voz en off para videos de redes sociales', 'Audios de WhatsApp automatizados', 'Podcasts sin grabar con tu voz', 'Atención al cliente por audio'] },
      { tipo: 'pasos', tit: 'Cómo empezar gratis', pasos: ['Crea cuenta en elevenlabs.io', 'El plan gratis incluye 10,000 caracteres/mes', 'Elige una voz de la biblioteca', 'Pega tu texto y descarga el audio'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 35, categoria: 'CASO DE USO · POST 35',
    titulo: 'Cómo una tienda online\nduplicó sus reseñas con IA.',
    sub: 'El sistema que pide reseñas automáticamente. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'pasos', tit: 'El sistema automático de reseñas', pasos: ['Cliente recibe pedido → Make detecta la entrega', '3 días después: email personalizado con Claude', 'El email menciona el producto específico comprado', 'Link directo a Google Reviews o Trustpilot'] },
      { tipo: 'lista', tit: 'Por qué funciona', items: ['El mensaje es personalizado, no genérico', 'Llega en el momento perfecto (3 días post-compra)', 'Es un email, no spam de WhatsApp', 'El cliente siente que alguien se preocupó'] },
      { tipo: 'tips', tit: 'Prompt para el email de reseña', tips: ['"Escribe un email amigable pidiendo reseña a un cliente que compró [producto] hace 3 días. Tono: cálido, sin presión. Incluye link a [URL]"'] },
      { tipo: 'cta' },
    ],
  },

  // ═══ BLOQUE 8: AVANZADO Y FUTURO (36-45) ═════════════════════════════════
  {
    post: 36, categoria: 'CLAUDE CODE AVANZADO · POST 36',
    titulo: 'Crea agentes de IA que\ntrabajan solos.',
    sub: 'El siguiente nivel: IA que toma decisiones. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: '¿Qué es un agente de IA?', items: ['Una IA que recibe un objetivo y lo ejecuta', 'Toma decisiones intermedias sin que la guíes', 'Usa herramientas (web, email, apps) de forma autónoma', 'Puede trabajar horas mientras tú haces otra cosa'] },
      { tipo: 'tips', tit: 'Ejemplos de agentes reales', tips: ['Agente de investigación: busca info, la analiza y entrega reporte', 'Agente de contenido: crea, diseña y publica posts', 'Agente de soporte: responde tickets y escala los difíciles'] },
      { tipo: 'pasos', tit: 'Tu primer agente con Claude Code', pasos: ['Define el objetivo claro: "Investiga competidores X,Y,Z"', 'Dale las herramientas: web-search + sheets', 'Lánzalo y espera el reporte', 'Revisa, ajusta y escala'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 37, categoria: 'TUTORIAL · POST 37',
    titulo: 'Conecta Claude con\ntu base de datos.',
    sub: 'Supabase + Claude = tu app sin backend. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: '¿Qué es Supabase?', items: ['Base de datos gratuita y en la nube', 'Alternativa a Firebase', 'Funciona con SQL (fácil de aprender)', 'Claude Code puede escribir en ella directamente'] },
      { tipo: 'pasos', tit: 'Configurar Supabase + Claude', pasos: ['Crea proyecto gratis en supabase.com', 'Instala el MCP de Supabase en Claude Code', 'Dale a Claude la URL y clave de tu proyecto', 'Ahora Claude puede leer y escribir tu base de datos'] },
      { tipo: 'tips', tit: 'Qué puedes construir', tips: ['Sistema de pedidos con historial', 'Base de clientes con búsqueda inteligente', 'Inventario actualizado en tiempo real'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 38, categoria: 'IA PARA NEGOCIOS · POST 38',
    titulo: 'Traduce tu negocio\nal inglés con IA.',
    sub: 'Vende internacionalmente sin saber inglés. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: 'Qué puede traducir Claude', items: ['Tu página web completa', 'Emails y propuestas comerciales', 'Contratos y documentos legales', 'Posts y contenido de redes sociales'] },
      { tipo: 'tips', tit: 'Prompt para traducciones de calidad', tips: ['"Traduce este texto al inglés americano. Mantén el tono [formal/amigable]. El público objetivo son [descripción]"', 'Siempre pide revisión de native speaker para contratos'] },
      { tipo: 'pasos', tit: 'Flujo para internacionalizar tu web', pasos: ['Copia el texto de tu web actual', 'Pide a Claude que lo traduzca por secciones', 'Ajusta términos específicos de tu industria', 'Publica la versión en inglés con /en/ en la URL'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 39, categoria: 'HERRAMIENTA IA · POST 39',
    titulo: 'Suno AI: genera música\npara tus videos gratis.',
    sub: 'Audio profesional sin pagar a nadie. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: '¿Qué hace Suno AI?', items: ['Genera canciones completas desde texto', 'Letra + música + voz en 30 segundos', 'Más de 50 géneros musicales', 'Gratis para uso personal y comercial (plan básico)'] },
      { tipo: 'tips', tit: 'Usos para tu negocio', tips: ['Jingle para tu marca en minutos', 'Música de fondo para videos de Instagram', 'Audio para presentaciones sin derechos de autor'] },
      { tipo: 'pasos', tit: 'Cómo usarlo', pasos: ['Ve a suno.com y crea cuenta gratis', '"Create" → describe el estilo musical que quieres', 'Ej: "upbeat corporate, no lyrics, 30 seconds"', 'Descarga y usa en tus videos'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 40, categoria: 'GUÍA COMPLETA · POST 40',
    titulo: 'IA para freelancers:\ntriplica tu productividad.',
    sub: 'Trabaja menos horas. Cobra lo mismo. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: 'IA por tipo de freelancer', items: ['Diseñador: Canva AI, Midjourney, Remove.bg', 'Redactor: Claude, Grammarly AI, Hemingway', 'Desarrollador: Claude Code, GitHub Copilot', 'Marketero: Claude, Perplexity, Canva AI'] },
      { tipo: 'tips', tit: 'Cómo cobrar más sin trabajar más', tips: ['Usa IA para entregar proyectos en la mitad de tiempo', 'Reinvierte esas horas en conseguir más clientes', 'Ofrece IA como servicio adicional a tus clientes'] },
      { tipo: 'pasos', tit: 'Tu setup de freelancer con IA', pasos: ['Claude AI para toda la redacción y análisis', 'Canva AI para diseños y presentaciones', 'Make para automatizar onboarding de clientes', 'Notion AI para gestión de proyectos'] },
      { tipo: 'cta' },
    ],
  },

  // ═══ BLOQUE 9: ERRORES Y APRENDIZAJES (41-50) ════════════════════════════
  {
    post: 41, categoria: 'ERRORES COMUNES · POST 41',
    titulo: 'Los 5 errores que cometen\ntodos con la IA al empezar.',
    sub: 'Evítalos y ahorra meses de frustración. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: '5 errores clásicos', items: ['❌ Prompts demasiado vagos: "Ayúdame con marketing"', '❌ No dar contexto de su negocio específico', '❌ Aceptar la primera respuesta sin iterar', '❌ Intentar hacer todo con IA de golpe', '❌ No verificar la información generada'] },
      { tipo: 'lista', tit: 'La versión correcta', items: ['✓ Prompts específicos con rol, contexto y formato', '✓ Siempre mencionar tu industria y cliente ideal', '✓ Pedir variaciones: "dame 3 versiones diferentes"', '✓ Automatiza de 1 en 1, domínala antes de la siguiente', '✓ Verifica datos críticos con fuentes reales'] },
      { tipo: 'tips', tit: 'La mentalidad correcta', tips: ['La IA no reemplaza tu juicio, lo amplifica', 'El prompt es un diálogo, no una orden única', 'Cada error que corriges mejora tu habilidad'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 42, categoria: 'TUTORIAL · POST 42',
    titulo: 'Crea tu agencia de\ncontenido con IA y 0 empleados.',
    sub: 'El modelo de negocio del futuro ya llegó. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'pasos', tit: 'El modelo: SOLOAGENCIA', pasos: ['Ofrece: estrategia + contenido + diseño + programación', 'Produces: Claude (copy) + Canva AI (diseño) + Buffer (programación)', 'Cobras: $500-2,000/mes por cliente', 'Gestionas: 5-10 clientes tú solo con IA'] },
      { tipo: 'lista', tit: 'Lo que debes ofrecer', items: ['30 posts mensuales (diseñados y programados)', 'Estrategia de contenido trimestral', 'Reporte de resultados mensual con IA', 'Gestión de comentarios e interacciones'] },
      { tipo: 'tips', tit: 'Por dónde conseguir clientes', tips: ['Empieza con negocios locales que no tienen redes', 'Ofrece el primer mes a mitad de precio', 'Los resultados son tu mejor argumento de venta'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 43, categoria: 'PROMPTS REALES · POST 43',
    titulo: 'Los prompts de sistema\nque cambian todo.',
    sub: 'Configura Claude para que siempre sepa quién eres. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: '¿Qué es un prompt de sistema?', items: ['Instrucciones que Claude recibe antes de cada conversación', 'Define su rol, tono y contexto permanente', 'En claude.ai: usa "Proyectos" para esto', 'En Claude Code: configura en CLAUDE.md'] },
      { tipo: 'tips', tit: 'Template de prompt de sistema para negocio', tips: ['"Eres el asistente de [NOMBRE NEGOCIO]. Nuestro cliente ideal es [DESCRIPCIÓN]. Siempre responde en español, tono [formal/amigable]. Nuestros servicios son [LISTA]"'] },
      { tipo: 'pasos', tit: 'Configúralo en claude.ai', pasos: ['Ve a claude.ai → Proyectos', 'Crea un proyecto para tu negocio', 'En "Instrucciones del proyecto" pega tu prompt de sistema', 'Ahora Claude siempre tendrá contexto de tu empresa'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 44, categoria: 'HERRAMIENTA IA · POST 44',
    titulo: 'CapCut AI: edita videos\ncon texto, no con timeline.',
    sub: 'La edición de video que nunca aprendiste ya no importa. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: '¿Qué hace CapCut AI?', items: ['Genera subtítulos automáticos en segundos', 'Elimina silencios con un clic', 'Reencuadra video vertical a horizontal', 'Crea clips cortos de videos largos automáticamente'] },
      { tipo: 'pasos', tit: 'Flujo para crear Reels en 20 min', pasos: ['Graba tu video en bruto (puede ser con errores)', 'Abre CapCut → importa el video', 'Activa: Auto Subtitles + Remove Silence', 'Ajusta colores con "Auto Enhance" y exporta'] },
      { tipo: 'tips', tit: 'Funciones IA más útiles', tips: ['Script to Video: de texto a video automático', 'AI Portrait: fondo profesional sin chroma key', 'Auto Reframe: adapta a cualquier formato'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 45, categoria: 'ERRORES COMUNES · POST 45',
    titulo: 'Por qué tu negocio no\ncreció con IA todavía.',
    sub: 'El problema no es la IA. Es la estrategia. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: 'Las razones reales', items: ['Usas IA para tareas que ya hacías bien', 'No mides el tiempo que ahorras con IA', 'Probaste 10 herramientas y dominaste 0', 'Esperas que la IA piense por ti', 'No has conectado la IA a tus procesos principales'] },
      { tipo: 'tips', tit: 'La pregunta correcta', tips: ['No: "¿Qué puede hacer la IA?"', 'Sí: "¿Cuál es la tarea que más tiempo me roba?"', 'Y luego: "¿Cómo la automatizo con IA esta semana?"'] },
      { tipo: 'pasos', tit: 'El ejercicio de esta semana', pasos: ['Lista tus 5 tareas más repetitivas', 'Ordénalas por tiempo que consumen', 'Elige la #1 y automatízala con Claude', 'Mide el tiempo ahorrado al final de la semana'] },
      { tipo: 'cta' },
    ],
  },

  // ═══ BLOQUE 10: CIERRE Y FUTURO (46-55) ══════════════════════════════════
  {
    post: 46, categoria: 'FUTURO IA · POST 46',
    titulo: 'Lo que viene en IA\neste año y el siguiente.',
    sub: 'Prepárate ahora para lo que viene. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: 'Tendencias IA 2025-2026', items: ['Agentes de IA autónomos para empresas', 'IA que trabaja 8 horas como empleado virtual', 'Voz ultra-realista integrada en todo', 'Modelos de IA por industria (legal, médico, financiero)', 'Automatización de trabajo del conocimiento completo'] },
      { tipo: 'tips', tit: 'Cómo prepararte ahora', tips: ['Domina 3 herramientas de IA en profundidad', 'Documenta tus procesos para automatizarlos', 'Desarrolla habilidades que la IA no puede reemplazar', 'Empieza a ofrecer servicios con IA a tus clientes'] },
      { tipo: 'lista', tit: 'Lo que NO va a desaparecer', items: ['Tu criterio y juicio de negocio', 'Las relaciones humanas con clientes', 'La creatividad estratégica de alto nivel', 'La responsabilidad de los resultados'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 47, categoria: 'RECURSOS · POST 47',
    titulo: 'Todo lo que uso para\naprender IA es gratis.',
    sub: 'Sin cursos de $997. Sin membresías. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: 'Recursos gratuitos que uso', items: ['Anthropic Docs: documentación oficial de Claude', 'YouTube: canales de IA en español', 'Reddit r/ClaudeAI: comunidad activa', 'X (Twitter): sigue a los builders de IA', 'Newsletters: importantnotimportant, TLDR AI'] },
      { tipo: 'tips', tit: 'Mi rutina de aprendizaje', tips: ['15 min al día: leer 1 newsletter de IA', '1 herramienta nueva por semana (solo una)', '1 proyecto personal con IA por mes', '1 tutorial aplicado a mi negocio cada 2 semanas'] },
      { tipo: 'lista', tit: 'Canales de YouTube recomendados', items: ['@menteenautomatico (Guatemala 🇬🇹)', 'Dot CSV (España, técnico)', 'Midudev (programación con IA)', 'Two Minute Papers (investigación IA)'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 48, categoria: 'LISTA COMPLETA · POST 48',
    titulo: 'Las 10 IA gratuitas que\ncualquier emprendedor necesita.',
    sub: 'Lista actualizada 2025. Guárdala. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: 'Top 10 IA gratis', items: ['1. Claude AI — el cerebro', '2. Perplexity — investigación', '3. Canva AI — diseño', '4. Gemini — ecosistema Google', '5. ElevenLabs — voz'] },
      { tipo: 'lista', tit: 'Top 10 IA gratis (cont.)', items: ['6. Suno AI — música', '7. CapCut AI — video', '8. Notion AI — organización', '9. Remove.bg — fondos de fotos', '10. Ideogram — imágenes con texto'] },
      { tipo: 'tips', tit: 'Cómo usar esta lista', tips: ['No intentes todas a la vez', 'Elige 2 según tu negocio y domínalas', 'Cuando las domines, agrega la siguiente'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 49, categoria: 'CASO DE USO · POST 49',
    titulo: 'De 0 a $3,000/mes\nusando solo IA.',
    sub: 'El modelo de negocio que más está creciendo. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: 'El modelo: Consultor de IA', items: ['Ayudas a negocios a implementar IA', 'No necesitas ser programador', 'Cobras por el tiempo ahorrado al cliente', 'Puedes tener 5-8 clientes a la vez'] },
      { tipo: 'pasos', tit: 'Cómo empezar en 30 días', pasos: ['Días 1-10: domina Claude + Make + Canva AI', 'Días 11-20: documenta tu caso de éxito personal', 'Días 21-25: ofrece servicio gratis a 2 negocios', 'Días 26-30: cobra al tercero con resultados comprobados'] },
      { tipo: 'tips', tit: 'Servicios que puedes ofrecer hoy', tips: ['Automatización de atención al cliente: $300-500/mes', 'Gestión de redes con IA: $400-800/mes', 'Sistema de contenido automatizado: $500-1,000/mes'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 50, categoria: 'PROMPTS REALES · POST 50',
    titulo: '50 posts de contenido\ngenerados en 1 hora.',
    sub: 'El sistema exacto, paso a paso. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'pasos', tit: 'El proceso en 4 fases', pasos: ['Fase 1 (15 min): pide a Claude 50 ideas de temas para tu nicho', 'Fase 2 (20 min): selecciona 30 y pide el guion completo de cada uno', 'Fase 3 (15 min): genera diseños en lote con Canva AI', 'Fase 4 (10 min): programa todo en Buffer o Meta Suite'] },
      { tipo: 'tips', tit: 'El prompt maestro', tips: ['"Eres estratega de contenido para [industria]. Genera 50 ideas de posts de carrusel para [cliente ideal]. Cada idea: [gancho potente] + [3 puntos clave] + [CTA]. Formato tabla."'] },
      { tipo: 'lista', tit: 'Tipos de contenido que más funcionan', items: ['Listas con números: "7 formas de..."', 'Comparaciones: "Antes vs Después"', 'Errores comunes: "Por qué falla..."', 'Paso a paso: "Cómo hacer X en Y minutos"'] },
      { tipo: 'cta' },
    ],
  },

  // ═══ BLOQUE 11: INDUSTRISS ESPECÍFICAS (51-58) ═══════════════════════════
  {
    post: 51, categoria: 'IA POR INDUSTRIA · POST 51',
    titulo: 'IA para clínicas y\nconsultorios médicos.',
    sub: 'Menos papeleo. Más tiempo para pacientes. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: 'Usos de IA en salud', items: ['Redacción de expedientes clínicos', 'Recordatorios de citas automatizados', 'FAQ de pacientes respondido por bot', 'Análisis de síntomas para triage básico'] },
      { tipo: 'tips', tit: 'Automatizaciones esenciales', tips: ['Cita agendada → confirmación WhatsApp automática', '24h antes de cita → recordatorio personalizado', 'Post-consulta → instrucciones de cuidado por email'] },
      { tipo: 'lista', tit: 'Herramientas recomendadas', items: ['Claude: redacción de documentos clínicos', 'ManyChat: bot de WhatsApp para citas', 'Make: automatización de flujos', 'Notion: historial de pacientes organizado'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 52, categoria: 'IA POR INDUSTRIA · POST 52',
    titulo: 'IA para abogados y\ndespachos jurídicos.',
    sub: 'Contratos en minutos. Investigación en segundos. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: 'Lo que la IA puede hacer en derecho', items: ['Redactar borradores de contratos estándar', 'Resumir expedientes de 200 páginas', 'Investigar jurisprudencia (con verificación)', 'Traducir documentos legales al instante'] },
      { tipo: 'tips', tit: 'Prompt para borradores legales', tips: ['"Redacta un contrato de [tipo] entre [parte A] y [parte B] bajo las leyes de [país]. Incluye: cláusulas de incumplimiento, confidencialidad y resolución de disputas"'] },
      { tipo: 'lista', tit: 'Advertencia importante', items: ['Siempre revisa el output con criterio profesional', 'La IA comete errores en referencias legales específicas', 'Úsala para acelerar, no para sustituir tu expertise', 'Verifica la legislación vigente en cada caso'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 53, categoria: 'IA POR INDUSTRIA · POST 53',
    titulo: 'IA para tiendas físicas\ny comercios locales.',
    sub: 'Compite con las grandes cadenas usando IA. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: 'Problemas que resuelve la IA', items: ['Inventario desactualizado → predicción automática de stock', 'Clientes que no vuelven → sistema de fidelización', 'Ventas en descenso → análisis de causa con IA', 'Poco tiempo para marketing → contenido generado en 30 min'] },
      { tipo: 'tips', tit: 'Empezar con presupuesto $0', tips: ['WhatsApp Business + ManyChat gratis para atención', 'Canva AI para carteles y promociones', 'Google Sheets + Claude para control de inventario', 'Instagram con contenido generado por IA'] },
      { tipo: 'pasos', tit: 'Plan de 2 semanas para comercio', pasos: ['Semana 1: WhatsApp automatizado + Canva para redes', 'Semana 2: Inventario en Sheets + reporte semanal con Claude'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 54, categoria: 'IA POR INDUSTRIA · POST 54',
    titulo: 'IA para educadores\ny creadores de cursos.',
    sub: 'Crea, enseña y escala sin agotarte. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: 'Usos de IA en educación', items: ['Genera el temario de un curso en 10 minutos', 'Crea ejercicios y exámenes automáticamente', 'Personaliza feedback para cada estudiante', 'Produce material didáctico visual con IA'] },
      { tipo: 'tips', tit: 'Prompts para educadores', tips: ['"Crea un temario de 8 semanas para curso de [tema] dirigido a [nivel]. Incluye: objetivo, materiales y ejercicio práctico por semana"', '"Genera 20 preguntas de opción múltiple sobre [tema], dificultad progresiva"'] },
      { tipo: 'pasos', tit: 'Lanza tu curso con IA', pasos: ['Claude: estructura y contenido del curso', 'Canva AI: presentaciones y material visual', 'ElevenLabs: audios de cada lección', 'Make: automatiza emails a estudiantes'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 55, categoria: 'HERRAMIENTA IA · POST 55',
    titulo: 'Gamma AI: presenta\ncomo si tuvieras diseñador.',
    sub: 'De texto a presentación profesional en 1 minuto. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: '¿Qué hace Gamma AI?', items: ['Convierte texto en presentaciones hermosas', 'Diseño profesional automático', 'Animaciones y transiciones incluidas', 'Exporta a PowerPoint, PDF o comparte online'] },
      { tipo: 'pasos', tit: 'Cómo crear tu presentación', pasos: ['Ve a gamma.app y crea cuenta gratis', 'Pega el texto o escribe el tema', 'Gamma genera toda la presentación', 'Personaliza colores según tu marca', 'Exporta o comparte con link'] },
      { tipo: 'tips', tit: 'Cuándo usar Gamma', tips: ['Propuestas a clientes (causa gran impresión)', 'Presentaciones internas de equipo', 'Pitches de inversión o proyectos', 'Webinars y cursos online'] },
      { tipo: 'cta' },
    ],
  },

  // ═══ BLOQUE 12: CIERRE (56-60) ════════════════════════════════════════════
  {
    post: 56, categoria: 'REFLEXIÓN · POST 56',
    titulo: 'La IA no te va a\nquitar el trabajo.',
    sub: 'Alguien que SABE usarla sí puede. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: 'La realidad del mercado laboral con IA', items: ['Los que usan IA producen 3-5x más en el mismo tiempo', 'Los empleadores buscan quién usa IA, no quién la teme', 'Las tareas rutinarias sí están en riesgo', 'Las habilidades de criterio, estrategia y relaciones: nunca'] },
      { tipo: 'tips', tit: 'Lo que siempre tendrás valor', tips: ['Entender a tus clientes mejor que cualquier IA', 'Tomar decisiones con información incompleta', 'Construir confianza y relaciones duraderas', 'Liderar equipos humanos con empatía'] },
      { tipo: 'lista', tit: 'La pregunta que debes hacerte', items: ['"¿Estoy aprendiendo a usar IA o esperando que no cambie nada?"', 'El cambio ya llegó. Tú decides si subirte o quedarte.'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 57, categoria: 'LISTA COMPLETA · POST 57',
    titulo: 'Las 7 herramientas IA\nde mi stack diario.',
    sub: 'No las que están de moda. Las que uso. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: 'Mi stack personal (2025)', items: ['1. Claude AI — para pensar y escribir todo', '2. Claude Code — para construir herramientas', '3. Perplexity — para investigar antes de decidir', '4. Canva AI — para diseñar contenido rápido', '5. Make — para automatizar procesos', '6. Notion — para organizar proyectos y equipo', '7. ElevenLabs — para audios y voice-overs'] },
      { tipo: 'tips', tit: 'Por qué estas y no otras', tips: ['Son gratis o muy baratas para empezar', 'Tienen la mejor relación potencia/facilidad', 'Se conectan entre sí fácilmente', 'La comunidad de usuarios es enorme'] },
      { tipo: 'lista', tit: 'Cuánto me ahorran por mes', items: ['Contenido: ~20 horas → 4 horas', 'Investigación: ~8 horas → 1 hora', 'Diseño: ~12 horas → 2 horas', 'Automatizaciones: trabajo que antes no hacía'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 58, categoria: 'GUÍA COMPLETA · POST 58',
    titulo: 'Hoja de ruta completa:\nde principiante a experto en IA.',
    sub: '6 meses. Un paso a la vez. Sin abrumarte. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'pasos', tit: 'Mes 1-2: Fundamentos', pasos: ['Mes 1: Claude AI diario + prompts básicos', 'Mes 2: Canva AI + primera automatización en Make'] },
      { tipo: 'pasos', tit: 'Mes 3-4: Intermedio', pasos: ['Mes 3: Claude Code instalado + primer proyecto', 'Mes 4: MCP conectado + base de datos con Supabase'] },
      { tipo: 'pasos', tit: 'Mes 5-6: Avanzado', pasos: ['Mes 5: Agente de IA para tu proceso principal', 'Mes 6: Ofrece IA como servicio a tus clientes'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 59, categoria: 'RECURSOS · POST 59',
    titulo: 'Comunidades de IA\ndonde aprendo más.',
    sub: 'Aprende con otros, no solo. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: 'Comunidades activas en 2025', items: ['Reddit: r/ClaudeAI, r/artificial, r/MachineLearning', 'Discord: servidores de Anthropic, OpenAI y Make', 'X (Twitter): comunidad de builders de IA', 'LinkedIn: grupos de IA para empresas', 'YouTube: comentarios son gold puro'] },
      { tipo: 'tips', tit: 'Cómo aprender más rápido en comunidad', tips: ['Comparte lo que aprendes, no solo lo que necesitas', 'Pregunta con contexto: "Quiero hacer X para Y, probé Z"', 'Conecta con alguien que vaya 3 meses adelante de ti'] },
      { tipo: 'lista', tit: 'Newsletters que no puedo perder', items: ['The Rundown AI (inglés, diario)', 'TLDR AI (inglés, diario conciso)', 'Ben\'s Bites (inglés, curado)', '@menteenautomatico (español, práctico 😉)'] },
      { tipo: 'cta' },
    ],
  },
  {
    post: 60, categoria: 'DÍA FINAL · POST 60',
    titulo: 'Si llegaste al post 60,\nya sabes más que el 95%.',
    sub: 'Todo lo que aprendiste. Lo que sigue. Swipe →',
    slides: [
      { tipo: 'cover' },
      { tipo: 'lista', tit: 'Lo que dominas ahora', items: ['Las mejores herramientas de IA gratuitas', 'Prompts que realmente funcionan para negocios', 'Automatizaciones que ahorran horas cada semana', 'Claude Code para construir sin saber programar', 'El sistema completo de contenido con IA'] },
      { tipo: 'tips', tit: 'El siguiente paso', tips: ['Elige 1 automatización que implementarás esta semana', 'Comparte este post con alguien que lo necesite', 'Sígueme para más contenido práctico de IA'] },
      { tipo: 'lista', tit: 'Gracias por el viaje 🎉', items: ['Esta fue la guía más completa de IA para negocios en español', 'Tú pusiste la constancia. Yo puse el contenido.', 'Lo que sigue es tuyo. Ve y constrúyelo.', '@menteenautomatico — nos vemos en el próximo reto'] },
      { tipo: 'cta_final' },
    ],
  },
];

// ─── GENERADOR DE HTML ───────────────────────────────────────────────────────
function getPaleta(postNum) {
  return PALETAS[PALETA_ORDEN[(postNum - 1) % 3]];
}

function htmlBase(p, content) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1080px;height:1350px;overflow:hidden;background:${p.bg};font-family:'Arial','Helvetica Neue',Helvetica,sans-serif;position:relative}
  .glow{position:absolute;inset:0;background:${p.glow};pointer-events:none;z-index:0}
  .content{position:relative;z-index:1;width:100%;height:100%;padding:54px 72px;display:flex;flex-direction:column}
  .top-bar{display:flex;justify-content:space-between;align-items:center;margin-bottom:auto}
  .handle{font-size:26px;font-weight:500;color:${p.handle};letter-spacing:0.5px}
  .pill{background:${p.pillBg};color:${p.pillColor};font-size:22px;font-weight:700;letter-spacing:2px;padding:10px 24px;border-radius:40px;text-transform:uppercase;white-space:nowrap}
  .pill-sm{font-size:19px;padding:8px 20px}
  .cat-label{font-size:24px;font-weight:700;letter-spacing:3px;color:${p.accent};text-transform:uppercase;margin-bottom:24px}
  .main-title{font-family:'Arial Black','Impact',sans-serif;font-size:108px;line-height:1.0;color:${p.text};margin-bottom:28px;white-space:pre-wrap}
  .subtitle{font-size:30px;color:${p.subtext};font-weight:400;line-height:1.4}
  .bottom{display:flex;align-items:center;gap:18px;margin-top:auto;padding-top:32px}
  .swipe-text{font-size:26px;font-weight:700;letter-spacing:2px;color:${p.subtext};text-transform:uppercase}
  .dots{display:flex;gap:10px}
  .dot{width:32px;height:6px;border-radius:3px;background:${p.dotInactive}}
  .dot.active{background:${p.dotActive};width:52px}
  /* content slides */
  .slide-num{font-size:26px;font-weight:500;color:${p.subtext}}
  .slide-title{font-family:'Arial Black','Impact',sans-serif;font-size:72px;line-height:1.05;color:${p.text};margin-bottom:40px;white-space:pre-wrap}
  .slide-title-sm{font-size:60px}
  .items{display:flex;flex-direction:column;gap:20px;flex:1}
  .item{display:flex;align-items:flex-start;gap:22px;background:${p.cardBg};border:1px solid ${p.cardBorder};border-radius:16px;padding:24px 28px}
  .item-bullet{width:10px;height:10px;border-radius:50%;background:${p.accent};flex-shrink:0;margin-top:11px}
  .item-text{font-size:32px;line-height:1.4;color:${p.text};font-weight:500}
  .item-text.sm{font-size:28px}
  /* steps */
  .steps{display:flex;flex-direction:column;gap:18px;flex:1}
  .step{display:flex;align-items:flex-start;gap:22px;background:${p.cardBg};border:1px solid ${p.cardBorder};border-radius:16px;padding:22px 28px}
  .step-num{font-family:'Arial Black','Impact',sans-serif;font-size:48px;color:${p.numColor};flex-shrink:0;line-height:1;width:48px;text-align:center}
  .step-text{font-size:30px;line-height:1.4;color:${p.text};font-weight:500}
  /* comparison */
  .table{width:100%;border-collapse:separate;border-spacing:0 10px;flex:1}
  .table th{font-size:22px;font-weight:700;letter-spacing:2px;color:${p.accent};text-transform:uppercase;text-align:left;padding:0 20px 8px}
  .table th:not(:first-child){text-align:center}
  .table td{font-size:28px;color:${p.text};font-weight:500;background:${p.cardBg};padding:18px 20px;border:1px solid ${p.cardBorder}}
  .table td:not(:first-child){text-align:center}
  .table tr td:first-child{border-radius:12px 0 0 12px}
  .table tr td:last-child{border-radius:0 12px 12px 0}
  /* tips */
  .tips{display:flex;flex-direction:column;gap:20px;flex:1}
  .tip{background:${p.cardBg};border-left:4px solid ${p.accent};border-radius:0 16px 16px 0;padding:22px 28px}
  .tip-text{font-size:30px;line-height:1.4;color:${p.text};font-weight:500}
  /* cta */
  .cta-center{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:32px}
  .cta-handle{font-size:52px;font-weight:900;color:${p.text}}
  .cta-handle span{color:${p.accent}}
  .cta-msg{font-size:34px;color:${p.subtext};line-height:1.5;max-width:700px}
  .cta-btns{display:flex;gap:20px;flex-wrap:wrap;justify-content:center;margin-top:8px}
  .cta-btn{background:${p.pillBg};color:${p.pillColor};font-size:28px;font-weight:700;padding:16px 40px;border-radius:50px}
  /* herramienta */
  .tool-card{background:${p.cardBg};border:1px solid ${p.cardBorder};border-radius:24px;padding:36px;flex:1;display:flex;flex-direction:column;gap:20px}
  .tool-name{font-family:'Arial Black','Impact',sans-serif;font-size:80px;color:${p.accent};line-height:1}
  .tool-desc{font-size:30px;color:${p.subtext};font-weight:500}
</style></head><body>
<div class="glow"></div>
<div class="content">${content}</div>
</body></html>`;
}

function dots(total, active) {
  return `<div class="dots">${Array.from({length: total}, (_, i) =>
    `<div class="dot${i === active ? ' active' : ''}"></div>`
  ).join('')}</div>`;
}

function renderSlide(post, slideIndex, slide, totalSlides, p) {
  if (slide.tipo === 'cover') {
    return htmlBase(p, `
      <div class="top-bar">
        <span class="handle">@menteenautomatico</span>
        <span class="pill pill-sm">${post.categoria}</span>
      </div>
      <div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;padding-bottom:40px">
        <div class="cat-label">${post.categoria}</div>
        <div class="main-title">${post.titulo}</div>
        <div class="subtitle">${post.sub}</div>
      </div>
      <div class="bottom">
        <span class="swipe-text">SWIPE</span>
        ${dots(totalSlides, 0)}
      </div>
    `);
  }

  if (slide.tipo === 'lista') {
    const small = slide.items.length >= 4;
    return htmlBase(p, `
      <div class="top-bar">
        <span class="slide-num">${String(slideIndex+1).padStart(2,'0')} / ${String(totalSlides).padStart(2,'0')}</span>
        <span class="pill pill-sm">${post.categoria}</span>
      </div>
      <div class="slide-title${small?' slide-title-sm':''}" style="margin-top:32px">${slide.tit}</div>
      <div class="items">
        ${slide.items.map(it => `<div class="item"><div class="item-bullet"></div><div class="item-text${small?' sm':''}">${it}</div></div>`).join('')}
      </div>
      <div class="bottom" style="padding-top:24px">
        ${dots(totalSlides, slideIndex)}
      </div>
    `);
  }

  if (slide.tipo === 'pasos') {
    return htmlBase(p, `
      <div class="top-bar">
        <span class="slide-num">${String(slideIndex+1).padStart(2,'0')} / ${String(totalSlides).padStart(2,'0')}</span>
        <span class="pill pill-sm">${post.categoria}</span>
      </div>
      <div class="slide-title slide-title-sm" style="margin-top:32px">${slide.tit}</div>
      <div class="steps">
        ${slide.pasos.map((p2, i) => `<div class="step"><div class="step-num">${String(i+1).padStart(2,'0')}</div><div class="step-text">${p2}</div></div>`).join('')}
      </div>
      <div class="bottom" style="padding-top:24px">
        ${dots(totalSlides, slideIndex)}
      </div>
    `);
  }

  if (slide.tipo === 'comparacion') {
    return htmlBase(p, `
      <div class="top-bar">
        <span class="slide-num">${String(slideIndex+1).padStart(2,'0')} / ${String(totalSlides).padStart(2,'0')}</span>
        <span class="pill pill-sm">${post.categoria}</span>
      </div>
      <div class="slide-title slide-title-sm" style="margin-top:32px">${slide.tit}</div>
      <table class="table">
        <thead><tr>${slide.filas[0] ? `<th></th><th>${slide.filas[0][1]}</th><th>${slide.filas[0][2]}</th>` : ''}</tr></thead>
        <tbody>
          ${slide.filas.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}
        </tbody>
      </table>
      <div class="bottom" style="padding-top:24px">
        ${dots(totalSlides, slideIndex)}
      </div>
    `);
  }

  if (slide.tipo === 'tips') {
    return htmlBase(p, `
      <div class="top-bar">
        <span class="slide-num">${String(slideIndex+1).padStart(2,'0')} / ${String(totalSlides).padStart(2,'0')}</span>
        <span class="pill pill-sm">${post.categoria}</span>
      </div>
      <div class="slide-title slide-title-sm" style="margin-top:32px">${slide.tit}</div>
      <div class="tips">
        ${slide.tips.map(t => `<div class="tip"><div class="tip-text">${t}</div></div>`).join('')}
      </div>
      <div class="bottom" style="padding-top:24px">
        ${dots(totalSlides, slideIndex)}
      </div>
    `);
  }

  if (slide.tipo === 'cta' || slide.tipo === 'cta_final') {
    const isFinal = slide.tipo === 'cta_final';
    return htmlBase(p, `
      <div class="top-bar">
        <span class="handle">@menteenautomatico</span>
        <span class="pill pill-sm">${post.categoria}</span>
      </div>
      <div class="cta-center">
        <div class="cta-handle"><span>@</span>menteenautomatico</div>
        <div class="cta-msg">${isFinal ? '¡Gracias por llegar hasta el final! Sígueme para más contenido de IA para negocios cada semana.' : 'Sígueme para más contenido práctico de IA para negocios. Comparte este post si te fue útil.'}</div>
        <div class="cta-btns">
          <div class="cta-btn">Sígueme</div>
          <div class="cta-btn">${isFinal ? '¡Gracias! 🎉' : 'Comparte'}</div>
        </div>
      </div>
      <div class="bottom" style="padding-top:24px">
        ${dots(totalSlides, slideIndex)}
      </div>
    `);
  }

  return htmlBase(p, `<div style="color:white;padding:40px">Slide: ${JSON.stringify(slide)}</div>`);
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);
  const inicio = parseInt(args[0] || '1');
  const fin    = parseInt(args[1] || '60');

  console.log(`\n🚀 Generando posts ${inicio}-${fin} de 60`);
  console.log('─'.repeat(50));

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox','--disable-setuid-sandbox','--disable-gpu',
           '--disable-dev-shm-usage','--window-size=1080,1350'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1350 });

  const postsToGen = POSTS.filter(p => p.post >= inicio && p.post <= fin);

  for (const post of postsToGen) {
    const paleta = getPaleta(post.post);
    const dir = path.join('ig', `post-${String(post.post).padStart(2,'0')}`);
    fs.mkdirSync(dir, { recursive: true });

    for (let i = 0; i < post.slides.length; i++) {
      const html = renderSlide(post, i, post.slides[i], post.slides.length, paleta);
      await page.setContent(html, { waitUntil: 'domcontentloaded', timeout: 15000 });
      const outPath = path.join(dir, `slide-${String(i+1).padStart(2,'0')}.png`);
      await page.screenshot({ path: outPath, type: 'png' });
    }

    console.log(`✅ Post ${String(post.post).padStart(2,'0')} — ${paleta.nombre} — "${post.titulo.split('\n')[0]}..." (${post.slides.length} slides)`);

    // Checkpoint cada 5 posts
    if (post.post % 5 === 0) {
      console.log(`\n📍 CHECKPOINT: posts ${Math.max(inicio, post.post-4)}-${post.post} completados`);
      console.log(`   Siguiente batch: node gen-slides.js ${post.post+1} ${Math.min(60, post.post+5)}\n`);
    }
  }

  await browser.close();

  console.log('\n' + '═'.repeat(50));
  console.log(`✨ COMPLETADO: posts ${inicio}-${fin}`);
  if (fin < 60) {
    console.log(`👉 Continúa con: node gen-slides.js ${fin+1} ${Math.min(60, fin+5)}`);
  } else {
    console.log('🎉 ¡Todos los 60 posts generados!');
  }
  console.log('═'.repeat(50) + '\n');
}

main().catch(err => { console.error('ERROR:', err); process.exit(1); });
