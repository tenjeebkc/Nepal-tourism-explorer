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
  const [year, setYear] = useState(2025);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <main className="state">
        <p>Loading tourism data...</p>
      </main>
    );
  }

  const currentArrivals =
    annualArrivals.find((item) => item.year === year)?.arrivals ?? 0;

  const previousArrivals =
    annualArrivals.find((item) => item.year === year - 1)?.arrivals ?? 0;

  const growth =
    previousArrivals > 0
      ? ((currentArrivals - previousArrivals) / previousArrivals) * 100
      : 0;

  const recovery =
    ((currentArrivals / 1197191) * 100);

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
          <strong>1.16M</strong>
        </article>

        <article className="card">
          <span>2025 vs 2024</span>
          <strong>+0.95%</strong>
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
            <p>How international arrivals to Nepal have changed since 2019.</p>
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
            <p>Top source markets for the selected year.</p>
          </div>

          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            <option value={2025}>2025</option>
          </select>
        </div>

        <div className="chart-card">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={sourceMarkets[year as keyof typeof sourceMarkets]}
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
        </div>
      </section>

      <section className="limitations">
        <h2>About the data</h2>
        <p>
          The figures represent international visitor arrivals published
          by the Nepal Tourism Board. Arrival counts do not measure tourism
          revenue, visitor spending, length of stay, satisfaction, or
          overall economic impact.
        </p>
      </section>

      <footer>
        Data source: Nepal Tourism Board
      </footer>
    </main>
  );
}

export default App;