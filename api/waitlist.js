const { isEmail, json, readBody, supabaseInsert } = require('./_lib');

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return json(res, 405, { error: 'Method not allowed' }); }
  const b = readBody(req);
  if (b.company) return json(res, 200, { ok: true }); // honeypot
  const email = String(b.email || '').trim().toLowerCase();
  if (!isEmail(email)) return json(res, 400, { error: 'Please enter a valid email address.' });
  if (b.consent !== true) return json(res, 400, { error: 'Consent is required.' });
  try {
    const result = await supabaseInsert('waitlist', { email });
    if (!result) return json(res, 503, { error: 'Waitlist is temporarily unavailable.' });
    if (!result.ok) {
      console.error('waitlist insert failed', result.status);
      return json(res, 500, { error: 'Unable to join the waitlist right now.' });
    }
    return json(res, 200, { ok: true });
  } catch (error) {
    console.error('waitlist insert failed', error);
    return json(res, 500, { error: 'Unable to join the waitlist right now.' });
  }
};
