"use client";
import { useState, useEffect } from "react";
import PredictForm from "../../components/PredictForm";
import PredictResult from "../../components/PredictResult";
import { predictPrice, checkHealth, HouseFeatures } from "../../lib/api";

export default function Home() {
  const [result, setResult]       = useState<string | null>(null);
  const [loading, setLoading]     = useState<boolean>(false);
  const [error, setError]         = useState<string | null>(null);
  const [apiOnline, setApiOnline] = useState<boolean | null>(null);

  // Check if backend is reachable on load
  useEffect(() => {
    checkHealth().then(setApiOnline);
  }, []);

  const handleSubmit = async (formData: HouseFeatures): Promise<void> => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await predictPrice(formData);
      console.log("Prediction response:", data);   // visible in browser DevTools
      setResult(data.formatted);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("Prediction failed:", message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-8">
      <div className="w-full max-w-md space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-sky-400">House Price Predictor</h1>
          <p className="text-gray-400 text-sm mt-1">ML model served via FastAPI</p>
        </div>

        {/* API status indicator */}
        <div className="flex items-center gap-2 text-sm">
          <span
            className={`w-2 h-2 rounded-full ${
              apiOnline === null ? "bg-gray-500 animate-pulse" :
              apiOnline ? "bg-green-400" : "bg-red-400"
            }`}
          />
          <span className="text-gray-400">
            {apiOnline === null ? "Checking API..." :
             apiOnline ? "API connected (localhost:8000)" :
             "API offline — run: uvicorn main:app --reload"}
          </span>
        </div>

        <PredictForm onSubmit={handleSubmit} loading={loading} />
        <PredictResult result={result} error={error} />

      </div>
    </main>
  );
}