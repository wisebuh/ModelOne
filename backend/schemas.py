from pydantic import BaseModel


class HouseFeatures(BaseModel):
    bedrooms: int
    bathrooms: int
    sqft: int
    age_years: int
    distance_km: float


class PredictionResponse(BaseModel):
    predicted_price: float
    formatted: str