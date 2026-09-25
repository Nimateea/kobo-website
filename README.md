# Kobo website

Static site (`public/`) + two Vercel serverless functions (`api/`). Tailwind is compiled to `public/assets/site.css` (no CDN at runtime).

## Pages
- `/` (`index.html`): home, plus hash-routed use-case pages (`#/use-cases/students` etc.)
- `/contact` (`contact.html`): contact page
- `404.html`, `robots.txt`, `sitemap.xml`

## Deploy (Vercel)
1. Push this folder to a Git repo and import it in Vercel (settings come from `vercel.json`).
2. Add the env vars from `.env.example` (Resend key, audience ID, contact recipient/sender).
3. Verify your sending domain in Resend, then add your domain in Vercel.

## Before going live
- Domain is set to `https://getappkobo.com` in canonical/OG tags, `sitemap.xml`, `robots.txt` and JSON-LD. Find and replace it if the live domain differs.
- `public/og-image.jpeg` and the favicons are the current social preview and site icons.
- Privacy Policy and Terms are still the placeholder note at `/#privacy`. Publish them before launch.
- Add rate limiting (Vercel Firewall) in front of `/api/*`.

## Local development
```
npm install
npm run build       # or: npm run watch
npx vercel dev      # serves public/ and api/ together
```
Rebuild CSS after adding new Tailwind classes to HTML or JS.
