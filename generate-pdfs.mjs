import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const guides = [
  {
    file: 'guia-mcp-01-intro.html',
    pdf: 'Guia-MCP-01-Los5-MCPs-Imprescindibles.pdf'
  },
  {
    file: 'guia-mcp-02-playwright.html',
    pdf: 'Guia-MCP-02-Playwright-Automatiza-la-Web.pdf'
  },
  {
    file: 'guia-mcp-03-github.html',
    pdf: 'Guia-MCP-03-GitHub-DevOps-con-IA.pdf'
  },
  {
    file: 'guia-mcp-04-busqueda.html',
    pdf: 'Guia-MCP-04-Perplexity-Sequential-Thinking.pdf'
  },
  {
    file: 'guia-01-claude.html',
    pdf: 'Guia-01-Claude-de-Cero-Tu-Primera-Semana.pdf'
  },
  {
    file: 'guia-clientes-locales.html',
    pdf: 'Guia-Vende-Paginas-Web-a-Clientes-Locales.pdf'
  }
];

const outDir = path.join(__dirname, 'pdfs');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
});

for (const g of guides) {
  const htmlPath = path.join(__dirname, g.file);
  if (!fs.existsSync(htmlPath)) {
    console.log(`⚠️  Saltando (no existe): ${g.file}`);
    continue;
  }

  const page = await browser.newPage();
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0', timeout: 30000 });

  // Oculta elementos de navegación y animaciones para el PDF
  await page.addStyleTag({ content: `
    canvas, header.nav, footer, .pdf-bar, .guia-nav, .cta-final, .menu-btn,
    .filtros, .rec-featured, #particles { display: none !important; }
    body { background: #fff !important; color: #111 !important; }
    .guia-hero, .guia-wrap, .recursos-hero, .wrap {
      padding: 0 !important; max-width: 100% !important;
    }
    .guia-section, .indice, .escena, .tiktok-section, .diff-card, .paso,
    .callout, .code-block, .mcp-table, .rec-card, .rec-section {
      border: 1px solid #ddd !important; background: #fff !important;
      box-shadow: none !important; color: #111 !important;
      break-inside: avoid;
    }
    .guia-section h2, .guia-num, .seccion-tag, .tiktok-badge,
    .rec-cat, .rec-action {
      color: #1a4fa0 !important; background: none !important;
      -webkit-text-fill-color: #1a4fa0 !important;
    }
    h1, h2, h3, h4 { color: #111 !important; -webkit-text-fill-color: #111 !important; }
    h1 span { -webkit-text-fill-color: #1a4fa0 !important; background: none !important; }
    .guia-section .intro, .diff-card p, .paso-body p, .callout p,
    .escena-campo p, .code-line, .mcp-table td, .rec-card p,
    .feature p, .caso p { color: #333 !important; }
    .code-line { color: #1a56db !important; font-family: monospace !important; }
    .code-block { background: #f0f4ff !important; border: 1px solid #c0d0f0 !important; }
    .tiktok-section { background: #fff8f0 !important; border: 1px solid #ffa0a0 !important; }
    .escena { background: #f9f9f9 !important; border: 1px solid #ddd !important; }
    .escena-campo p { background: #f0f0f0 !important; color: #333 !important; }
    .pantalla-txt { color: #b8860b !important; }
    .mvb-col.malo { background: #fff0f0 !important; }
    .mvb-col.bueno { background: #f0fff4 !important; }
    a { color: #1a4fa0 !important; }
    * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  `});

  const pdfPath = path.join(outDir, g.pdf);
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    margin: { top: '1.5cm', bottom: '1.5cm', left: '1.5cm', right: '1.5cm' },
    printBackground: true
  });

  await page.close();
  console.log(`✅ ${g.pdf}`);
}

await browser.close();
console.log('\n🎉 Todos los PDFs generados en /pdfs/');
