import { useState } from "react";
import MiniMapLeaflet from "./MiniMapLeaflet";

export default function ResultsPage({ budget, area, onBack }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const results = [
    {
      area: "Manchester",
      region: "ENG",
      avg_price: 280000,
      avg_revenue: 1900,
      roi: 0.068,
      yield: 0.06,
      zoopla_url: "https://www.zoopla.co.uk",
      lat: 53.4808,
      lng: -2.2426,
    },
    {
      area: "Leeds",
      region: "ENG",
      avg_price: 230000,
      avg_revenue: 1750,
      roi: 0.076,
      yield: 0.07,
      zoopla_url: "https://www.zoopla.co.uk",
      lat: 53.8008,
      lng: -1.5491,
    },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-sans">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/london.avif')" }} />
      <div className="absolute inset-0 bg-[#0a1a33]/80" />

      <div className="relative z-10 px-6 py-10 text-white">
        <div className="max-w-4xl mx-auto">
          <button onClick={onBack} className="text-yellow-400 hover:underline mb-6">
            ← Back
          </button>

          <h1 className="text-3xl font-bold mb-2 text-yellow-400">
            Your budget — up to £{budget || "—"}
          </h1>

          {area && <p className="text-white/70 mb-8">Filtered by area: {area}</p>}

          <div className="space-y-6">
            {results.map((r, i) => {
              const isExpanded = expandedIndex === i;
              const isHidden = expandedIndex !== null && expandedIndex !== i;

              if (isHidden) return null;

              return (
                <div
                  key={i}
                  className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6 transition-all ${
                    isExpanded ? "min-h-[80vh]" : ""
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold">{r.area} area</h2>
                      <p className="text-white/60 mb-2">Region: {r.region}</p>

                      <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm text-white/80">
                        <span>Avg price:</span>
                        <span>£{r.avg_price.toLocaleString()}</span>
                        <span>Avg revenue / mo:</span>
                        <span>£{r.avg_revenue.toLocaleString()}</span>
                        <span>ROI:</span>
                        <span>{(r.roi * 100).toFixed(1)}%</span>
                        <span>Yield:</span>
                        <span>{(r.yield * 100).toFixed(1)}%</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <MiniMapLeaflet lat={r.lat} lng={r.lng} />

                      <a
                        href={r.zoopla_url}
                        target="_blank"
                        className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg text-sm"
                      >
                        See on Zoopla
                      </a>
                    </div>
                  </div>

                  <div className="mt-4">
                    {!isExpanded ? (
                      <button
                        onClick={() => setExpandedIndex(i)}
                        className="text-yellow-400 hover:underline text-sm"
                      >
                        Read more →
                      </button>
                    ) : (
                      <button
                        onClick={() => setExpandedIndex(null)}
                        className="text-yellow-400 hover:underline text-sm"
                      >
                        ← See less
                      </button>
                    )}
                  </div>

                  {isExpanded && (
                    <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-3">Mini Dashboard</h3>
                      <div className="h-48 border border-dashed border-white/30 flex items-center justify-center text-white/50">
                        Graphs & analytics coming soon 📊
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
