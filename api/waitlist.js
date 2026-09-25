const { isEmail, json, readBody, supabaseInsert } = require('./_lib');

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return json(res, 405, { error: 'Method not allowed' }); }
  const b = readBody(req);
  if (b.company) return json(res, 200, { ok: true }); // honeypot
  const email = String(b.email || '').trim().toLowerCase();
  if (!isEmail(email)) return json(res, 400, { error: 'Please enter a valid email address.' });
  if (b.consent !== true) return json(res, 400, { error: 'Consent is required.' });
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return json(res, 500, { error: 'Waitlist is not configured.' });
  const r = await supabaseInsert('waitlist', { email });
  if (!r || !r.ok) {
    if (r) console.error('supabase waitlist insert', r.status, await r.text().catch(() => ''));
    return json(res, 502, { error: 'Unable to save your email' });
  }
  return json(res, 200, { ok: true });
};
