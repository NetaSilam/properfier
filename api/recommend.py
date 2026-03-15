from http.server import BaseHTTPRequestHandler
from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
from supabase import create_client
import pandas as pd
import numpy as np
import os

def haversine(lat1, lon1, lat2, lon2):
    R = 6371
    lat1, lon1, lat2, lon2 = map(np.radians, [lat1, lon1, lat2, lon2])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = np.sin(dlat/2)**2 + np.cos(lat1) * np.cos(lat2) * np.sin(dlon/2)**2
    return 2 * R * np.arcsin(np.sqrt(a))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/recommend")
def recommend(
    budget: float = Query(..., gt=0),
    region: str | None = None,
    top_k: int = 10,
    radius_km: float = Query(80.0, gt=0)
):
    try:
        url = os.environ["SUPABASE_URL"]
        key = os.environ["SUPABASE_KEY"]
        supabase = create_client(url, key)

        # Filter in Supabase directly instead of fetching all rows
        query = supabase.table("zoopla_recommendations")\
            .select("city, price_cleaned, predicted_roi, lat, long")\
            .lte("price_cleaned", budget)

        if region:
            query = query.ilike("city", f"%{region}%")

        response = query.execute()
        df = pd.DataFrame(response.data)

        grouped = df.groupby('city').agg({
            'price_cleaned': 'mean',
            'predicted_roi': 'mean',
            'lat': 'mean',
            'long': 'mean'
        }).reset_index()

        grouped = grouped.rename(columns={
            'city': 'area',
            'price_cleaned': 'avg_price',
            'predicted_roi': 'predicted_ROI',
            'long': 'lng'
        })
        grouped['avg_revenue'] = grouped['avg_price'] * grouped['predicted_ROI']

        price_lists = []
        roi_lists = []

        for _, row in grouped.iterrows():
            distances = haversine(row['lat'], row['lng'], df['lat'], df['long'])
            nearby = df[distances <= radius_km]
            price_lists.append(nearby['price_cleaned'].tolist())
            roi_lists.append(nearby['predicted_roi'].tolist())

        grouped['price_dist'] = price_lists
        grouped['roi_dist'] = roi_lists
        grouped = grouped.sort_values('predicted_ROI', ascending=False).head(top_k)

        top_areas = grouped['area'].tolist()
        overall_df = df[df['city'].isin(top_areas)]
        results = grouped.to_dict('records')
        for rec in results:
            rec['overall_price_dist'] = overall_df['price_cleaned'].tolist()
            rec['overall_roi_dist'] = overall_df['predicted_roi'].tolist()
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

handler = Mangum(app)