from fastapi import FastAPI, Query
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Property Recommendation API")

areas = pd.read_parquet("data/areas.parquet")

@app.get("/")
def health():
    return {"status": "ok"}

@app.get("/recommend")
def recommend(
    budget: float = Query(..., gt=0),
    region: str | None = None,
    top_k: int = 10
):
    df = areas.copy()

    df = df[df["avg_price"] <= budget]

    if region:
        df = df[df["region"] == region]

    df = df.sort_values("roi", ascending=False)

    return df.head(top_k).to_dict(orient="records")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite default
    allow_methods=["*"],
    allow_headers=["*"],
)
