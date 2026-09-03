import { useState } from "react";
import { gelars } from "./data/gelars";
import "./App.css";

function App() {
  const [sortAscending, setSortAscending] = useState(true);

  const sortedGelars = [...gelars].sort((a, b) => {
    return sortAscending
      ? a.holder_count - b.holder_count
      : b.holder_count - a.holder_count;
  });

  const totalGelars = gelars.length;

  const emptyGelars = gelars.filter(
    (gelar) => gelar.holder_count === 0
  ).length;

  const totalHolders = gelars.reduce(
    (total, gelar) => total + gelar.holder_count,
    0
  );

  function toggleSort() {
    setSortAscending((current) => !current);
  }

  return (
    <main className="app">
      {/* HEADER */}
      <header className="header">
        <div className="header-text">
          <p className="eyebrow">CATATAN GELAR</p>

          <h1>Daftar Gelar</h1>

          <p className="subtitle">
            Catatan gelar dan para pemegangnya
          </p>
        </div>

        <button
          className="sort-button"
          onClick={toggleSort}
          type="button"
        >
          <span className="sort-icon">↕</span>

          <span>
            {sortAscending
              ? "Belum Diambil → Paling Banyak"
              : "Paling Banyak → Belum Diambil"}
          </span>
        </button>
      </header>

      {/* SUMMARY */}
      <section className="summary">
        <div className="summary-item">
          <span className="summary-number">
            {totalGelars}
          </span>

          <span className="summary-label">
            Total Gelar
          </span>
        </div>

        <div className="summary-item">
          <span className="summary-number">
            {emptyGelars}
          </span>

          <span className="summary-label">
            Belum Diambil
          </span>
        </div>

        <div className="summary-item">
          <span className="summary-number">
            {totalHolders}
          </span>

          <span className="summary-label">
            Pemegang
          </span>
        </div>
      </section>

      {/* LIST HEADER */}
      <section className="list-section">
        <div className="list-heading">
          <h2>Daftar Gelar</h2>

          <span className="list-count">
            {totalGelars} gelar
          </span>
        </div>

        {/* GELAR LIST */}
        <div className="gelar-list">
          {sortedGelars.map((item, index) => (
            <article
              className={`gelar-card ${
                item.holder_count === 0 ? "untaken" : ""
              }`}
              key={item.gelar}
            >
              {/* NUMBER */}
              <div className="number">
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* INFO */}
              <div className="gelar-info">
                <h3>{item.gelar}</h3>

                <p className="holder-status">
                  {item.holder_count === 0
                    ? "Belum ada pemegang"
                    : `${item.holder_count} pemegang`}
                </p>

                {/* SECRETIFIED NAMES */}
                {item.holders.length > 0 && (
                  <div className="holders">
                    {item.holders.map((holder) => (
                      <span
                        className="holder"
                        key={holder}
                      >
                        {holder}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* COUNT */}
              <div className="holder-count">
                <strong>{item.holder_count}</strong>

                <span>orang</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;