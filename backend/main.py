from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib

from schemas import HouseFeatures, PredictionResponse
from predictor import predict_price

app = FastAPI(title="House Price Predictor API")

# CORS — allow all origins in development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model once when server starts
model = joblib.load("model.pkl")


@app.get("/")
def root():
    return {"status": "API is running"}


@app.post("/predict", response_model=PredictionResponse)
def predict(features: HouseFeatures):
    price = predict_price(model, features)
    return {
        "predicted_price": round(float(price), 2),
        "formatted": f"${price:,.0f}"
    }