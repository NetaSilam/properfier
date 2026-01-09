import pandas as pd
import os

df = pd.DataFrame([
    {"area": "London", "region": "ENG", "avg_price": 450000, "avg_revenue": 24000, "roi": 0.053, "yield": 0.05},
    {"area": "Manchester", "region": "ENG", "avg_price": 280000, "avg_revenue": 19000, "roi": 0.068, "yield": 0.06},
    {"area": "Leeds", "region": "ENG", "avg_price": 230000, "avg_revenue": 17500, "roi": 0.076, "yield": 0.07},
    {"area": "Liverpool", "region": "ENG", "avg_price": 210000, "avg_revenue": 17000, "roi": 0.081, "yield": 0.075},
    {"area": "Bristol", "region": "ENG", "avg_price": 320000, "avg_revenue": 18500, "roi": 0.058, "yield": 0.055},
])

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
os.makedirs(DATA_DIR, exist_ok=True)

df.to_parquet(os.path.join(DATA_DIR, "areas.parquet"))
print("Saved to", os.path.join(DATA_DIR, "areas.parquet"))