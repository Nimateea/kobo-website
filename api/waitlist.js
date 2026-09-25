const { isEmail, json, readBody, supabaseInsert } = require('./_lib');

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return json(res, 405, { error: 'Method not allowed' }); }
  const b = readBody(req);
  if (b.company) return json(res, 200, { ok: true }); // honeypot
  const email = String(b.email || '').trim().toLowerCase();
  if (!isEmail(email)) return json(res, 400, { error: 'Please enter a valid email address.' });
  if (b.consent !== true) return json(res, 400, { error: 'Consent is required.' });
  // No database integration is configured for this project, so acknowledge the
  // request without attempting a network call to stale or incomplete settings.
  return json(res, 200, { ok: true, demo: true });
};
