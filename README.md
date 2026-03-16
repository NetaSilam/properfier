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

## 🧩 Requirements

### Backend
- Python 3.12+
- pip

### Frontend
- Node.js 18+
- npm

---

## ⚙️ Setup instructions

### 1️⃣ Clone the repository
```bash
git clone <repo-url>
cd properfier
```

### 🐍 Backend setup
```bash
cd api
python3 -m venv .venv
source .venv/bin/activate   # Mac/Linux
# OR
.venv\Scripts\activate      # Windows

pip install -r requirements.txt
```

Run backend locally:
```bash
uvicorn recommend:app --reload
```

Backend will run at `http://localhost:8000`

### ⚛️ Frontend setup

Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```

Frontend will run at `http://localhost:5173`

The Vite dev server proxies `/api/*` requests to `http://localhost:8000` automatically.

---

## 🌍 Environment variables

Create a `.env` file in the project root (or set in Vercel dashboard):
```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
```

For local development, set these in your terminal before running the backend:
```bash
export SUPABASE_URL=your_supabase_project_url
export SUPABASE_KEY=your_supabase_anon_key
```

---

## 🗄️ Data

Property data is stored in **Supabase** (PostgreSQL).
The table `zoopla_recommendations` contains UK property listings with predicted ROI.

Required columns: `city`, `price_cleaned`, `predicted_roi`, `lat`, `long`

---

## 🗺️ Maps

We use:
- [Leaflet](https://leafletjs.com/)
- [react-leaflet](https://react-leaflet.js.org/)
- OpenStreetMap tiles (free, no API key required)

---

## 🚀 Deployment

The app is deployed on **Vercel**:
- Frontend: built with Vite, served as static files
- Backend: `api/recommend.py` runs as a serverless function
- Routing is configured in `vercel.json`

| Service  | Command            |
|----------|--------------------|
| Backend  | `uvicorn recommend:app --reload` |
| Frontend | `npm run dev`      |

---

## 🧪 Development notes

- Do not commit `.env`, `node_modules`, `.venv`, or CSV data files.
- All teammates should use the same Node & Python versions for consistency.
- If you see dependency errors: delete `node_modules` and run `npm install` again.
- Supabase Row Level Security (RLS) must be disabled or a public read policy must be set for the API to access data.