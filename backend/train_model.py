import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
import joblib

# --- Sample dataset (replace with real data) ---
np.random.seed(42)
n = 500

data = pd.DataFrame({
    "bedrooms":    np.random.randint(1, 6, n),
    "bathrooms":   np.random.randint(1, 4, n),
    "sqft":        np.random.randint(500, 4000, n),
    "age_years":   np.random.randint(0, 50, n),
    "distance_km": np.round(np.random.uniform(1, 30, n), 1),
})

# Target: house price (synthetic formula + noise)
data["price"] = (
    data["sqft"] * 150
    + data["bedrooms"] * 10000
    + data["bathrooms"] * 8000
    - data["age_years"] * 500
    - data["distance_km"] * 3000
    + np.random.normal(0, 15000, n)
)

# --- Train/test split ---
X = data.drop("price", axis=1)
y = data["price"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# --- Pipeline: scale + model ---
pipeline = Pipeline([
    ("scaler", StandardScaler()),
    ("model", LinearRegression())
])

pipeline.fit(X_train, y_train)
score = pipeline.score(X_test, y_test)
print(f"R² Score: {score:.3f}")

# --- Save the trained pipeline ---
joblib.dump(pipeline, "model.pkl")
print("Model saved to model.pkl")