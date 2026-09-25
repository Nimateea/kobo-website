const { isEmail, json, readBody, oneLine, resend } = require('./_lib');
const TOPICS = ['General question', 'How Kobo works', 'Press & media', 'Partnerships'];

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return json(res, 405, { error: 'Method not allowed' }); }
  const b = readBody(req);
  if (b.company) return json(res, 200, { ok: true }); // honeypot
  const name = oneLine(b.name, 100), email = String(b.email || '').trim().toLowerCase();
  const topic = TOPICS.includes(b.topic) ? b.topic : TOPICS[0];
  const message = String(b.message || '').trim().slice(0, 5000);
  if (!name) return json(res, 400, { error: 'Please tell us your name.' });
  if (!isEmail(email)) return json(res, 400, { error: 'Please enter a valid email address.' });
  if (message.length < 10) return json(res, 400, { error: 'Please add a short message.' });
  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) return json(res, 500, { error: 'Contact form is not configured.' });
  const r = await resend('/emails', {
    from: CONTACT_FROM_EMAIL,
    to: [CONTACT_TO_EMAIL],
    reply_to: email,
    subject: `[Kobo contact] ${topic}: ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`,
  });
  if (!r.ok) return json(res, 502, { error: 'Unable to send your message' });
  return json(res, 200, { ok: true });
};
