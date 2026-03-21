import { useState } from "react";
import ResultsPage from "./ResultsPage";
import "leaflet/dist/leaflet.css";

export default function App() {
  const [budget, setBudget] = useState("");
  const [area, setArea] = useState("");
  const [page, setPage] = useState("landing");
  const [showAbout, setShowAbout] = useState(false);

  if (page === "results") {
    return <ResultsPage budget={budget} area={area} onBack={() => setPage("landing")} />;
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-sans">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/london.avif')" }}
      />
      <div className="absolute inset-0 bg-[#0a1a33]/70" />

      {/* Header */}
      <header className="relative z-20 p-6">
        <div className="text-white text-4xl font-extrabold tracking-wide">
          <span className="text-yellow-400">Pro</span>perfier
        </div>
      </header>

      {/* Main content */}
      <div className="relative z-10 min-h-[calc(100vh-80px)] flex items-center justify-center px-6">
        <div className="max-w-4xl w-full text-center">
          <h1 className="text-5xl font-bold text-white leading-tight mb-2">
            Find Your Next Profitable <br /> Property Investment.
          </h1>
          <p className="text-2xl text-yellow-400 mb-10">Real Data, Real Returns.</p>

          {/* Gold container */}
          <div className="bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 p-6 rounded-2xl shadow-2xl">
            <div className="bg-white rounded-xl p-4 flex flex-col sm:flex-row gap-3">
              <input
                type="number"
                placeholder="Budget (in GBP, e.g., £70,000)"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Optional Area (e.g., London)"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={() => setPage("results")}
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl text-lg font-semibold"
            >
              FIND HIGH-ROI AREAS
            </button>
          </div>

          <p className="mt-6 text-white/80 text-sm flex items-center justify-center gap-2">
            <span>✓</span> Backed by verified data from Airbnb and real estate sources.
          </p>
        </div>
      </div>

      {/* About button */}
      <button
        onClick={() => setShowAbout(true)}
        className="fixed bottom-6 right-6 z-20 bg-white/90 hover:bg-white text-gray-900 px-5 py-2 rounded-full shadow-lg backdrop-blur-md transition"
      >
        About
      </button>

      {/* About Modal */}
      {showAbout && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/60">
          <div className="relative max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-8 shadow-xl">
            <button
              onClick={() => setShowAbout(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4">About Properfier</h2>
            <div className="space-y-5 text-left text-sm leading-6 text-gray-700">
              <p>
                Properfier is a data-driven property investment discovery tool that combines
                Airbnb demand signals, Zoopla sale listings, spatial analysis, and machine
                learning to rank areas by predicted investment potential.
              </p>

              <div>
                <h3 className="mb-2 text-base font-semibold text-gray-900">How The Data Was Prepared</h3>
                <p>
                  Airbnb data was filtered to UK listings and standardized so fields could be
                  compared consistently. Zoopla data was cleaned by removing duplicate records
                  and listings missing critical values such as property price. Minor gaps in
                  non-critical fields were retained when the missing rate was low enough not to
                  distort the analysis.
                </p>
                <p className="mt-2">
                  A major preprocessing step was geocoding Zoopla property addresses into
                  latitude and longitude using OpenStreetMap. Because geocoding success was
                  limited, a substantial share of properties was dropped at this stage, but the
                  remaining set was still large enough for spatial analysis and model training.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-base font-semibold text-gray-900">How ROI Was Estimated</h3>
                <p>
                  The ROI used in Properfier is an approximation rather than a direct measure of
                  true investment return. It is calculated by taking the median projected annual
                  Airbnb revenue of nearby comparable listings and dividing it by the property
                  purchase price. This creates a consistent proxy for comparing relative
                  opportunity across areas.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-base font-semibold text-gray-900">What The Analysis Found</h3>
                <p>
                  Exploratory analysis showed that property prices are strongly right-skewed,
                  meaning most listings are concentrated in lower price bands with a smaller
                  number of expensive outliers. A negative relationship was observed between
                  price and ROI, suggesting lower-priced properties often provide stronger
                  returns. ROI patterns across bedroom counts were non-linear, with
                  mid-sized properties tending to underperform compared with smaller or larger
                  ones.
                </p>
                <p className="mt-2">
                  Correlation analysis showed that bedrooms, bathrooms, and geographic location
                  were among the most meaningful predictors, while weak features such as premium
                  amenities were removed when they added little explanatory value.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-base font-semibold text-gray-900">How The Model Works</h3>
                <p>
                  After preprocessing and feature engineering, the dataset was split into 80%
                  training and 20% testing subsets. A Random Forest Regressor was trained using
                  property characteristics, spatial coordinates, and neighborhood-level demand
                  features. The model was tuned to capture non-linear relationships and evaluated
                  with standard regression metrics such as RMSE, MAE, and R².
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-base font-semibold text-gray-900">How Recommendations Are Generated</h3>
                <p>
                  Model predictions are stored in Supabase for fast retrieval. The backend
                  filters properties by user budget and optional regional constraints, aggregates
                  them by area, and returns the top-ranked areas by predicted ROI. The frontend
                  then presents those areas with maps, distributions, comparison charts, and AI
                  explanations to help users understand both the quantitative and contextual side
                  of each recommendation.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
