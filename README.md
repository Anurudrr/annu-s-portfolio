# AS.DEV — Anurudh Singh Portfolio

A neo-brutalist personal portfolio for **Anurudh Singh Rajawat** — 3rd-year B.Tech CSE, full-stack developer & UI/UX designer.

Live at: `https://as-dev.example.com` (set this to your real domain)

## Stack

- **Frontend** — React 18, TypeScript, Vite 5, Tailwind CSS 4, Motion (Framer), Lucide
- **Server** — Express 4 (single Node process serves API + static in prod, Vite middleware in dev)
- **AI** — `@google/genai` (Gemini) for the in-page "AS.AI" chat assistant
- **Optional** — Spotify Web API for the "now playing" widget

## Features

- Single-page brutalist design with custom cursor, audio SFX toggle, text-scramble animations
- Section-based navigation with smooth scroll + active-section indicator
- AI chat assistant with rate-limited server endpoint
- Admin dashboard (separate route, scaffolded — see Roadmap)

## Local development

**Requirements:** Node.js 20+

```bash
npm install
cp .env.example .env       # then fill in GEMINI_API_KEY (and optionally Spotify keys)
npm run dev                # http://localhost:3000
```

The server runs on port 3000 (overridden by Vite's dev server config). The Express app
mounts the Vite middleware in dev and serves the built `dist/` in production.

## Production build

```bash
npm run build              # bundles client to dist/, server to dist/server.cjs
npm start                  # node dist/server.cjs
```

## Environment variables

See [`.env.example`](.env.example) — every key has a comment explaining where to obtain it.
The app degrades gracefully: without `GEMINI_API_KEY` the chat runs in demo mode; without
Spotify keys the now-playing widget hides itself.

## Deployment

Any Node 20+ host works. Tested target: **Railway / Render / Fly.io**.

1. Push to GitHub.
2. Connect the repo on your host of choice.
3. Set the env vars from `.env.example` in the host's secrets UI.
4. Build command: `npm run build`
5. Start command: `npm start`
6. Health check: `GET /api/spotify/currently-playing` returns JSON (even on error)

## Project structure

```
.
├── index.html               # entry, SEO meta, favicon
├── server.ts                # Express server, /api/chat, /api/spotify/*
├── src/
│   ├── main.tsx             # React entry
│   ├── App.tsx              # the single home page (all sections)
│   ├── index.css            # Tailwind v4 theme + brutalist base styles
│   ├── types.ts             # shared TS types (db.json shape)
│   └── components/          # Hero, About, Skills, Projects, etc.
├── public/                  # favicon, robots.txt, sitemap.xml (served as-is)
├── db.json                  # canonical content (projects, blog, gallery, hobbies)
├── scripts/                 # local dev scripts (gitignored)
└── .github/workflows/ci.yml # lint + build on every PR
```

## Roadmap

- [ ] Migrate from a single-page `App.tsx` to `react-router-dom` (so the `pages/` work
      that was scaffolded earlier can ship)
- [ ] Wire up the admin dashboard so content in `db.json` can be edited at runtime
- [ ] Add Playwright smoke test
- [ ] Lighthouse pass (perf + a11y)

## License

All rights reserved. Code is public for review only; please don't copy the design verbatim.
