# Drawing Practice

A timed drawing-practice web app. Each session generates varied subjects via the Claude API, gives you a construction diagram or reference link, and runs a per-item countdown.

## Features

- AI-generated subjects (living + non-living, configurable)
- Complex subjects auto-simplified to a drawable part
- SVG construction diagrams for geometric subjects, reference links for organic ones
- Configurable timer (1/2/3/5/10 min) and subject count
- Pause/Resume, Skip, auto-advance, session summary
- Keyboard shortcuts: **Space** = pause/resume, **Arrow Right** = skip
- Fallback subject pool if the API is unreachable
- PWA-capable (add to home screen)

## Local development

```bash
npm install
```

Create a `.env.local` file:

```
ANTHROPIC_API_KEY=sk-ant-...
```

```bash
npm run dev
```

The app runs at `http://localhost:5173`.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Import the repo in vercel.com.
3. In **Settings → Environment Variables**, add `ANTHROPIC_API_KEY` = your Anthropic API key.
4. Deploy. The `api/generate.js` serverless function is picked up automatically.

The API key lives only in Vercel's environment and is never exposed to the browser.
