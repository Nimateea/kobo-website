const { isEmail, json, readBody, resend } = require('./_lib');

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return json(res, 405, { error: 'Method not allowed' }); }
  const b = readBody(req);
  if (b.company) return json(res, 200, { ok: true }); // honeypot
  const email = String(b.email || '').trim().toLowerCase();
  if (!isEmail(email)) return json(res, 400, { error: 'Please enter a valid email address.' });
  if (b.consent !== true) return json(res, 400, { error: 'Consent is required.' });
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_AUDIENCE_ID) return json(res, 500, { error: 'Waitlist is not configured.' });
  const r = await resend(`/audiences/${process.env.RESEND_AUDIENCE_ID}/contacts`, { email, unsubscribed: false });
  if (!r.ok) return json(res, 502, { error: 'Unable to save your email' });
  return json(res, 200, { ok: true });
};
