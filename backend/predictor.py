import numpy as np
from schemas import HouseFeatures


def predict_price(model, features: HouseFeatures) -> float:
    X = np.array([[
        features.bedrooms,
        features.bathrooms,
        features.sqft,
        features.age_years,
        features.distance_km
    ]])

    price = model.predict(X)[0]
    return max(float(price), 0)  # no negative prices