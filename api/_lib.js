// Shared helpers. Files starting with "_" are not exposed as routes on Vercel.
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) && v.length <= 254;
const json = (res, status, body) => res.status(status).json(body);
function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  try { return JSON.parse(req.body || '{}'); } catch { return {}; }
}
const oneLine = (v, max) => String(v || '').replace(/[\r\n]+/g, ' ').trim().slice(0, max);
async function resend(path, payload) {
  const r = await fetch('https://api.resend.com' + path, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + process.env.RESEND_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!r.ok) console.error('resend', path, r.status, await r.text().catch(() => ''));
  return r;
}
module.exports = { isEmail, json, readBody, oneLine, resend };
