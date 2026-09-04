import { useState } from "react";
import { gelars } from "./data/gelars";
import "./App.css";

function App() {
  const [showUntakenFirst, setShowUntakenFirst] = useState(false);

  const sortedGelars = showUntakenFirst
    ? [...gelars].sort((a, b) => {
        if (a.holder_count === 0 && b.holder_count !== 0) return -1;
        if (a.holder_count !== 0 && b.holder_count === 0) return 1;
        return 0;
      })
    : gelars;

  const totalGelars = gelars.length;

  const emptyGelars = gelars.filter(
    (gelar) => gelar.holder_count === 0
  ).length;

  const totalHolders = gelars.reduce(
    (total, gelar) => total + gelar.holder_count,
    0
  );

  function toggleSort() {
    setShowUntakenFirst((current) => !current);
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
            {showUntakenFirst
              ? "Kembali ke Urutan Gelar"
              : "Tampilkan yang Belum Diambil"}
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

                {item.holders.length > 0 ? (
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
                ) : (
                  <p className="holder-status">
                    Belum ada pemegang
                  </p>
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