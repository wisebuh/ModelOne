const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface HouseFeatures {
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  age_years: number;
  distance_km: number;
}

export interface PredictionResponse {
  predicted_price: number;
  formatted: string;
}

export async function checkHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/`);
    return res.ok;
  } catch {
    return false;
  }
}

export async function predictPrice(features: HouseFeatures): Promise<PredictionResponse> {
  let res: Response;

  try {
    res = await fetch(`${API_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(features),
    });
  } catch (err) {
    throw new Error(`Network error — is FastAPI running on ${API_URL}? (${err})`);
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }

  const json = await res.json();

  // Validate response shape
  if (typeof json.predicted_price !== "number" || typeof json.formatted !== "string") {
    throw new Error(`Unexpected response shape: ${JSON.stringify(json)}`);
  }

  return json;
}