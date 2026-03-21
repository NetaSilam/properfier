# Properfier

Properfier is a data-driven property investment discovery tool for the UK market.
It recommends the best areas to invest in based on your budget and predicted ROI.

It consists of:
- A **Python backend** (serverless function, pandas, Supabase)
- A **React frontend** (Vite + Tailwind + Leaflet maps + Recharts)
- Deployed on **Vercel** with data hosted on **Supabase**

---

## 🌐 Live demo

The app is live at: [https://properfier.vercel.app](https://properfier.vercel.app)

> ⚠️ The app is designed to run on Vercel only. Local development is not supported as the backend relies on Vercel serverless functions and private Supabase credentials.

---

## 📁 Project structure
```
properfier/
├── api/
│   ├── recommend.py         # Serverless function (Vercel)
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── ResultsPage.jsx
│   │   ├── MiniMapLeaflet.jsx
│   │   └── ...
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── vercel.json
└── README.md
```

---

## 🚀 Deployment

The app is deployed on **Vercel**:
- Frontend: built with Vite, served as static files
- Backend: `api/recommend.py` runs as a serverless function
- Routing is configured in `vercel.json`

To deploy your own instance:

1. Fork this repository
2. Import the project into [Vercel](https://vercel.com)
3. Set the following environment variables in Vercel dashboard → Settings → Environment Variables:
```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
```

4. Deploy — Vercel will build the frontend and register the Python serverless function automatically.

---

## 🗄️ Data

Property data is stored in **Supabase** (PostgreSQL).
The table `zoopla_recommendations` contains UK property listings with predicted ROI.

Required columns: `city`, `price_cleaned`, `predicted_roi`, `lat`, `long`

Make sure Supabase Row Level Security (RLS) is disabled or a public read policy is set for the API to access data.

---

## 🗺️ Maps

We use:
- [Leaflet](https://leafletjs.com/)
- [react-leaflet](https://react-leaflet.js.org/)
- OpenStreetMap tiles (free, no API key required)

---

## 🧪 Notes

- Do not commit `.env`, `node_modules`, `.venv`, or CSV data files.
- The backend uses `BaseHTTPRequestHandler` format required by Vercel's Python runtime — it is not compatible with uvicorn or local servers.