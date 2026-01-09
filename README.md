# Properfier

Properfier is a data-driven property investment discovery tool.
It consists of:

- A **Python backend** (FastAPI, models, data processing)
- A **React frontend** (Vite + Tailwind + Leaflet maps)

---

## 📁 Project structure

properfier/
├── backend/
│ ├── main.py
│ ├── create_fake_data.py
│ └── data/
├── frontend/
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── vite.config.js
└── README.md

yaml
Copy code

---

## 🧩 Requirements

### Backend
- Python 3.10+
- pip
- virtualenv (recommended)

### Frontend
- Node.js 18+
- npm

---

## ⚙️ Setup instructions

### 1️⃣ Clone the repository

```bash
git clone <repo-url>
cd properfier
🐍 Backend setup
bash
Copy code
cd backend
python3 -m venv venv
source venv/bin/activate   # Mac/Linux
# OR
venv\Scripts\activate      # Windows

pip install -r requirements.txt
Run backend:

bash
Copy code
uvicorn main:app --reload
Backend will run at:

arduino
Copy code
http://localhost:8000
⚛️ Frontend setup
Open a new terminal:

bash
Copy code
cd frontend
npm install
npm run dev
Frontend will run at:

arduino
Copy code
http://localhost:5173
🌍 Environment variables
If .env is required, create it in the backend folder:

bash
Copy code
cd backend
touch .env
Example .env:

env
Copy code
API_KEY=your_key_here
🗺 Maps
We use:

Leaflet

react-leaflet

OpenStreetMap tiles (free)

No API key required.

🚀 Running both
Service	Command
Backend	uvicorn main:app --reload
Frontend	npm run dev

🧪 Development notes
Do not commit .env, node_modules, venv, or generated data.

All teammates should use the same Node & Python versions for consistency.

If you see dependency errors: delete node_modules and run npm install again.