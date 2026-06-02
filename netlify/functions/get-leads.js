// get-leads.js — Lee todos los leads desde Supabase (usa service key, nunca expuesta al cliente)
exports.handler = async () => {
  const url  = process.env.SUPABASE_URL;
  const key  = process.env.SUPABASE_SERVICE_KEY;

  if (!url || !key) {
    return { statusCode: 500, body: 'Missing Supabase env vars' };
  }

  try {
    const r = await fetch(
      `${url}/rest/v1/leads?select=*&order=created_at.desc`,
      {
        headers: {
          'apikey': key,
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!r.ok) {
      const err = await r.text();
      return { statusCode: r.status, body: `Supabase error: ${err}` };
    }

    const data = await r.json();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
};
