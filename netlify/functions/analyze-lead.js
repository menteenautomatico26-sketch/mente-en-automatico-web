// analyze-lead.js — Llama a Claude para analizar un lead y generar email de contacto
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const apiKey = process.env.CLAUDE_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: 'Missing CLAUDE_API_KEY env var' };
  }

  let lead;
  try {
    ({ lead } = JSON.parse(event.body));
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const tipoLabel = lead.tipo === 'asesoria'
    ? 'Asesoría 1:1 de IA'
    : 'Proyecto técnico a medida';

  const prompt = `Eres el asistente de ventas de "Mente en Automático", marca personal de Jonathan Bautista.
Jonathan es un profesional de logística y operaciones en Taco Bell Guatemala que construye herramientas con IA y ofrece dos servicios:
- Asesoría 1:1 de IA: ayuda a profesionales a integrar IA en su trabajo real ($50–150 USD/hora)
- Proyectos técnicos a medida: dashboards, apps operativas y automatizaciones con IA (desde $500 USD)

Analiza el siguiente lead y responde ÚNICAMENTE con un objeto JSON válido (sin texto antes ni después).

DATOS DEL LEAD:
- Tipo de servicio solicitado: ${tipoLabel}
- Nombre: ${lead.nombre}
- Email: ${lead.email}
- Empresa: ${lead.empresa || 'No especificada'}
- Rol: ${lead.rol || 'No especificado'}
- Problema que quiere resolver: ${lead.problema}
${lead.herramientas ? `- Herramientas de IA que usa: ${lead.herramientas}` : ''}
${lead.tipo_proyecto ? `- Tipo de proyecto: ${lead.tipo_proyecto}` : ''}
- Presupuesto: ${lead.presupuesto || 'No especificado'}
- Timeline: ${lead.timeline || 'No especificado'}
- Cómo llegó: ${lead.como_encontro || 'No especificado'}

Responde con este JSON exacto:
{
  "score": <número del 1 al 10>,
  "score_label": "<etiqueta del score, ej: 'Encaje excelente' | 'Buen encaje' | 'Encaje moderado' | 'Bajo encaje'>",
  "analisis": "<párrafo de 3-4 oraciones analizando el perfil del cliente: su contexto, el problema real que tiene, qué tan adecuado es para los servicios de Jonathan, señales de urgencia o motivación, y potencial del proyecto>",
  "banderas": ["<señal positiva o punto de atención 1>", "<señal positiva o punto de atención 2>", "<señal positiva o punto de atención 3>"],
  "email_asunto": "<asunto del email, personalizado, máx 60 caracteres>",
  "email_cuerpo": "<email completo en español, tono cercano y profesional, latinoamericano, de Jonathan a ${lead.nombre}. Debe: saludar por nombre, mostrar que leyó su problema específico, proponer una llamada de 30 minutos, incluir enlace placeholder [LINK_CALENDLY] y firmar como Jonathan de Mente en Automático. Máx 200 palabras.>"
}`;

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1500,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!r.ok) {
      const err = await r.text();
      return { statusCode: r.status, body: `Claude API error: ${err}` };
    }

    const data = await r.json();
    const text = data.content[0].text.trim();

    // Extract JSON from response (handles cases with extra text)
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) {
      return { statusCode: 500, body: 'Claude did not return valid JSON' };
    }

    const result = JSON.parse(match[0]);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result),
    };
  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
};
