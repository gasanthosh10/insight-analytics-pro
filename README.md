# InsightPulse Pro - Full-Stack Analytics App

InsightPulse Pro is a full-stack analytics dashboard for tracking product usage, revenue, campaigns, traffic sources, funnels, and live events.

It is built to run immediately without MongoDB setup. The Express backend serves a realistic analytics API with seeded data, and the React frontend consumes that API with charts, filters, tables, and live activity views.

## Features

- Executive analytics dashboard with KPI cards.
- Revenue and active-user trend charts.
- Acquisition channel breakdown.
- Conversion funnel visualization.
- Campaign performance table.
- Live event stream.
- Date-range and segment filters.
- Express API with analytics, events, campaigns, and CSV export endpoints.
- Production setup where Express can serve the built React app.
- Ready for GitHub and deployment on Render, Railway, Vercel, Netlify, or any Node host.

## Tech Stack

- Frontend: React, Vite, Axios, Recharts, Lucide React
- Backend: Node.js, Express, Helmet, CORS, Morgan
- Deployment: Render config, production static serving, Dockerfile

## Quick Start

```bash
npm run install:all
npm run dev
```

Open:

```text
http://localhost:5173
```

Backend API runs on:

```text
http://localhost:5000/api
```

## Production Build

```bash
npm run build
npm start
```

Open:

```text
http://localhost:5000
```

## Useful API Endpoints

- `GET /api/health`
- `GET /api/analytics/summary`
- `GET /api/analytics/timeseries`
- `GET /api/analytics/channels`
- `GET /api/analytics/funnel`
- `GET /api/campaigns`
- `GET /api/events/live`
- `POST /api/events`
- `GET /api/export/campaigns.csv`

## Deployment

### Render

1. Push this project to GitHub.
2. Create a new Render Web Service.
3. Connect the GitHub repository.
4. Use:

```text
Build Command: npm run render-build
Start Command: npm start
```

The included `render.yaml` can also be used as a blueprint.

### Vercel/Netlify + Render API

- Deploy `client` on Vercel or Netlify.
- Deploy `server` on Render or Railway.
- Add frontend env variable:

```env
VITE_API_URL=https://your-backend-url.com/api
```

