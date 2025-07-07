import React, { useState } from "react";
import "./index.css";

function CoinFlipApp() {
  const [result, setResult] = useState(null);
  const [flipping, setFlipping] = useState(false);
  const [history, setHistory] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const flipCoin = () => {
    if (flipping) return;
    setFlipping(true);
    setResult(null);

    if (soundEnabled) {
      const audio = new Audio(
        "https://www.soundjay.com/coins/sounds/coin-flip-01.mp3"
      );
      audio.play().catch((e) => console.log("Audio play failed:", e));
    }

    setTimeout(() => {
      const res = Math.random() > 0.5 ? "heads" : "tails";
      setResult(res);
      setHistory((prev) => [res, ...prev.slice(0, 4)]);
      setFlipping(false);
    }, 2000);
  };

  return (
    <div className="app">
      <div className="card">
        <h1 className="title">Coin Flip </h1>

        <div className="coin-section">
          <div
            className={`coin ${flipping ? "flipping" : ""} ${
              result ? `coin-${result}` : ""
            }`}
            onClick={flipCoin}
          >
            {!flipping && !result && (
              <div className="click-text">
                <div>Click</div>
                <div>to flip</div>
              </div>
            )}
            {result && (
              <div className={`coin-face ${result}`}>
                <div className="symbol">{result === "heads" ? "H" : "T"}</div>
                <div className="label">{result.toUpperCase()}</div>
              </div>
            )}
          </div>

          <button
            className="flip-button"
            onClick={flipCoin}
            disabled={flipping}
          >
            {flipping ? "Flipping..." : "Flip Coin"}
          </button>
        </div>

        {result && !flipping && (
          <div className="result-text">
            It's <span className={result}>{result}</span>!
          </div>
        )}

        {history.length > 0 && (
          <div className="history-section">
            <h3>Previous Flips</h3>
            <div className="history-list">
              {history.map((item, index) => (
                <div key={index} className={`history-item ${item}`}>
                  {item === "heads" ? "H" : "T"}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <p className="footer-note">Flip a virtual coin for quick decisions</p>
    </div>
  );
}

export default CoinFlipApp;
