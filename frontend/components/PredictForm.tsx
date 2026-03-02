"use client";
import { useState } from "react";
import { HouseFeatures } from "../lib/api";

interface Field {
  name: keyof HouseFeatures;
  label: string;
  min: number;
  max: number;
  step: number;
}

const FIELDS: Field[] = [
  { name: "bedrooms",    label: "Bedrooms",       min: 1,   max: 10,    step: 1   },
  { name: "bathrooms",   label: "Bathrooms",      min: 1,   max: 6,     step: 1   },
  { name: "sqft",        label: "Square Footage", min: 200, max: 10000, step: 1   },
  { name: "age_years",   label: "Age (years)",    min: 0,   max: 100,   step: 1   },
  { name: "distance_km", label: "Distance (km)",  min: 0.1, max: 50,    step: 0.1 },
];

const DEFAULT_VALUES: HouseFeatures = {
  bedrooms: 3,
  bathrooms: 2,
  sqft: 1500,
  age_years: 10,
  distance_km: 5,
};

interface PredictFormProps {
  onSubmit: (data: HouseFeatures) => void;
  loading: boolean;
}

export default function PredictForm({ onSubmit, loading }: PredictFormProps) {
  const [form, setForm] = useState<HouseFeatures>(DEFAULT_VALUES);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: Number(e.target.value) });
  };

  return (
    <div className="space-y-4">
      {FIELDS.map(({ name, label, min, max, step }) => (
        <div key={name} className="flex flex-col gap-1">
          <label className="text-sm text-gray-300">{label}</label>
          <input
            type="number"
            name={name}
            value={form[name]}
            min={min}
            max={max}
            step={step}
            onChange={handleChange}
            className="bg-gray-800 border border-gray-700 rounded px-3 py-2 focus:outline-none focus:border-sky-500 text-white"
          />
        </div>
      ))}
      <button
        onClick={() => onSubmit(form)}
        disabled={loading}
        className="w-full bg-sky-500 hover:bg-sky-400 disabled:opacity-50 py-3 rounded font-semibold transition-colors"
      >
        {loading ? "Predicting..." : "Predict Price"}
      </button>
    </div>
  );
}