interface PredictResultProps {
  result: string | null;
  error: string | null;
}

export default function PredictResult({ result, error }: PredictResultProps) {
  if (!result && !error) return null;

  if (error) {
    return (
      <div className="bg-red-900/40 border border-red-500 rounded p-4 text-red-300 text-sm">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-green-900/40 border border-green-500 rounded p-4 text-center">
      <p className="text-sm text-green-400">Estimated Price</p>
      <p className="text-4xl font-bold text-green-300 mt-1">{result}</p>
    </div>
  );
}