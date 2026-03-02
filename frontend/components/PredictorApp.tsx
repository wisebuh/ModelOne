import dynamic from "next/dynamic";

// ssr: false ensures this only renders on the client
// This prevents the hydration mismatch error
const PredictorApp = dynamic(() => import("../components/PredictorApp"), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-md space-y-6">
      <div className="h-8 w-48 bg-gray-800 rounded animate-pulse" />
      <div className="h-4 w-36 bg-gray-800 rounded animate-pulse" />
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-10 bg-gray-800 rounded animate-pulse" />
        ))}
      </div>
    </div>
  ),
});

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-8">
      <PredictorApp />
    </main>
  );
}