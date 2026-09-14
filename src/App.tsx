import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

import { annualArrivals, sourceMarkets } from "./data/tourismData";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [year, setYear] = useState(2025);

  const loadData = () => {
    setLoading(true);
    setError(false);

    const timer = setTimeout(() => {
      try {
        if (!annualArrivals.length || !sourceMarkets[2025]?.length) {
          throw new Error("Tourism data is unavailable.");
        }

        setLoading(false);
      } catch {
        setError(true);
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    return loadData();
  }, []);

  if (loading) {
    return (
      <main className="state">
        <p>Loading tourism data...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="state">
        <div>
          <h1>Unable to load data</h1>
          <p>Please try again.</p>
          <button onClick={loadData}>Retry</button>
        </div>
      </main>
    );
  }

  const arrivals2025 =
    annualArrivals.find((item) => item.year === 2025)?.arrivals ?? 0;

  const arrivals2024 =
    annualArrivals.find((item) => item.year === 2024)?.arrivals ?? 0;

  const arrivals2019 =
    annualArrivals.find((item) => item.year === 2019)?.arrivals ?? 0;

  const growth =
    ((arrivals2025 - arrivals2024) / arrivals2024) * 100;

  const recovery = (arrivals2025 / arrivals2019) * 100;

  const selectedMarkets =
    sourceMarkets[year as keyof typeof sourceMarkets] ?? [];

  return (
    <main className="container">
      <header>
        <p className="eyebrow">NEPAL TOURISM</p>

        <h1>Nepal Tourism Explorer</h1>

        <p className="intro">
          Explore international visitor arrivals to Nepal and see
          where visitors come from.
        </p>
      </header>

      <section className="summary-grid">
        <article className="card">
          <span>2025 arrivals</span>
          <strong>{(arrivals2025 / 1000000).toFixed(2)}M</strong>
        </article>

        <article className="card">
          <span>2025 vs 2024</span>
          <strong>
            {growth >= 0 ? "+" : ""}
            {growth.toFixed(2)}%
          </strong>
        </article>

        <article className="card">
          <span>2025 vs 2019</span>
          <strong>{recovery.toFixed(1)}%</strong>
        </article>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <h2>Visitor arrivals over time</h2>

            <p>
              How international arrivals to Nepal have changed since
              2019.
            </p>
          </div>
        </div>

        <div className="chart-card">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={annualArrivals}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="arrivals"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <h2>Where visitors come from</h2>

            <p>
              Top source markets for the selected year.
            </p>
          </div>

          <select
            value={year}
            onChange={(event) => setYear(Number(event.target.value))}
            aria-label="Select year"
          >
            <option value={2025}>2025</option>
          </select>
        </div>

        <div className="chart-card">
          {selectedMarkets.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={selectedMarkets}
                layout="vertical"
                margin={{ left: 40 }}
              >
                <XAxis type="number" />
                <YAxis
                  dataKey="country"
                  type="category"
                  width={120}
                />
                <Tooltip />
                <Bar dataKey="arrivals" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p>No source market data is available for this year.</p>
          )}
        </div>
      </section>

      <section className="limitations">
        <h2>About the data</h2>

        <p>
          The figures represent international visitor arrivals
          published by the Nepal Tourism Board. Arrival counts do not
          measure tourism revenue, visitor spending, length of stay,
          visitor satisfaction, or overall economic impact.
        </p>
      </section>

      <footer>
        Data source: Nepal Tourism Board
      </footer>
    </main>
  );
}

export default App;