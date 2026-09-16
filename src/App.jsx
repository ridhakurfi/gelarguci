import { useState } from "react";
import { gelars } from "./data/gelars";
import "./App.css";

function App() {
  const [showUntakenFirst, setShowUntakenFirst] = useState(false);
  const [openGelar, setOpenGelar] = useState(null);

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

  function toggleGelar(gelarName) {
    setOpenGelar((current) =>
      current === gelarName ? null : gelarName
    );
  }

  return (
    <main className="app">

      {/* ================================
          COMMUNITY LEADER
      ================================= */}

      <section className="leader-section">
        <div className="leader-photo-wrapper">
          <img
            className="leader-photo"
            src="https://res.cloudinary.com/ducjx48tv/image/upload/v1789534240/datuakguci_pi09h4.jpg"
            alt="Pemimpin Kampung Guci"
          />
        </div>

        <div className="leader-info">
          <p className="eyebrow">KAMPUNG GUCI</p>

          <h2>Fakhri Zein / Datuak nan Aluih</h2>

          <p>
            Datuak Kampung Guci yang menjadi salah satu
            sumber informasi mengenai gelar dan sejarah adat
            di kampung.
          </p>
        </div>
      </section>

      {/* ================================
          HEADER
      ================================= */}

      <header className="header">
        <div className="header-text">
          <p className="eyebrow">GELAR KAMPUNG GUCI</p>

          <h1>Daftar Gelar</h1>

          <p className="subtitle">
            Gelar Kampung Guci dan para pemegangnya
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
              : "Tampilkan yang belum Diambil"}
          </span>
        </button>
      </header>

      {/* ================================
          SUMMARY
      ================================= */}

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

      {/* ================================
          GELAR LIST
      ================================= */}

      <section className="list-section">
        <div className="list-heading">
          <h2>Daftar Gelar</h2>

          <span className="list-count">
            {totalGelars} gelar
          </span>
        </div>

        <div className="gelar-list">
          {sortedGelars.map((item, index) => {
            const isOpen = openGelar === item.gelar;

            const hasExplanation =
              item.description ||
              item.word_meanings?.length > 0 ||
              item.full_meaning ||
              item.hopes?.length > 0 ||
              item.class ||
              item.context ||
              item.source;

            return (
              <article
                className={`gelar-card ${item.holder_count === 0 ? "untaken" : ""
                  } ${isOpen ? "open" : ""}`}
                key={item.gelar}
              >
                <div className="number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="gelar-info">

                  {/* GELAR HEADER */}

                  <button
                    className="gelar-toggle"
                    type="button"
                    onClick={() =>
                      hasExplanation &&
                      toggleGelar(item.gelar)
                    }
                    disabled={!hasExplanation}
                  >
                    <span className="gelar-title">
                      <span>{item.gelar}</span>

                      {hasExplanation && (
                        <span className="toggle-text">
                          {isOpen ? "Tutup makna ↑" : "Lihat makna gelar →"}
                        </span>
                      )}
                    </span>
                  </button>

                  {/* HOLDERS */}

                  {item.holders.length > 0 ? (
                    <div className="holders">
                      {item.holders.map((holder) => (
                        <div
                          className="holder"
                          key={holder.name}
                        >
                          <strong>{holder.name}</strong>

                          {(holder.mother ||
                            holder.location) && (
                              <div className="holder-details">
                                {holder.mother && (
                                  <span>
                                    Ibu: {holder.mother}
                                  </span>
                                )}

                                {holder.location && (
                                  <span>
                                    Domisili: {holder.location}
                                  </span>
                                )}
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="holder-status">
                      Belum ada pemegang
                    </p>
                  )}

                  {/* EXPLANATION */}

                  {isOpen && hasExplanation && (
                    <div className="gelar-explanation">

                      {item.description && (
                        <div className="explanation-section">
                          <h4>Tentang Gelar</h4>

                          <p>
                            {item.description}
                          </p>
                        </div>
                      )}

                      {item.word_meanings?.length > 0 && (
                        <div className="explanation-section">
                          <h4>Makna Kata</h4>

                          <div className="word-meanings">
                            {item.word_meanings.map(
                              (word) => (
                                <div
                                  className="word-meaning"
                                  key={word.word}
                                >
                                  <strong>
                                    {word.word}
                                  </strong>

                                  <p>
                                    {word.meaning}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                      {item.full_meaning && (
                        <div className="explanation-section">
                          <h4>
                            Makna Keseluruhan
                          </h4>

                          <p>
                            {item.full_meaning}
                          </p>
                        </div>
                      )}

                      {item.hopes?.length > 0 && (
                        <div className="explanation-section">
                          <h4>Harapan</h4>

                          <ul>
                            {item.hopes.map((hope) => (
                              <li key={hope}>
                                {hope}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {item.class && (
                        <div className="explanation-section">
                          <h4>Klasifikasi</h4>

                          <p>{item.class}</p>
                        </div>
                      )}

                      {item.context && (
                        <div className="explanation-section">
                          <h4>Konteks</h4>

                          <p>{item.context}</p>
                        </div>
                      )}

                      {item.source && (
                        <div className="explanation-source">
                          Sumber: {item.source}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* HOLDER COUNT */}

                <div className="holder-count">
                  <strong>
                    {item.holder_count}
                  </strong>

                  <span>orang</span>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default App;
