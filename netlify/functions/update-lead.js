// update-lead.js — Actualiza campos de un lead (status, ai_analysis, ai_score)
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;

  if (!url || !key) {
    return { statusCode: 500, body: 'Missing Supabase env vars' };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { id, ...fields } = body;
  if (!id) return { statusCode: 400, body: 'Missing lead id' };

  // Only allow updating these fields
  const allowed = ['status', 'ai_analysis', 'ai_score'];
  const patch = {};
  for (const k of allowed) {
    if (fields[k] !== undefined) patch[k] = fields[k];
  }

  if (!Object.keys(patch).length) {
    return { statusCode: 400, body: 'No valid fields to update' };
  }

  try {
    const r = await fetch(
      `${url}/rest/v1/leads?id=eq.${id}`,
      {
        method: 'PATCH',
        headers: {
          'apikey': key,
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify(patch),
      }
    );

    if (!r.ok) {
      const err = await r.text();
      return { statusCode: r.status, body: `Supabase error: ${err}` };
    }

    return { statusCode: 200, body: 'ok' };
  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
};
