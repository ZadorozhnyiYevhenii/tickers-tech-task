import React, { useState, useEffect } from "react";
import cn from 'classnames';
import io from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:4000");

function App() {
  const [tickers, setTickers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [graph, setGraph] = useState([]);

  useEffect(() => {
    socket.emit("start");
    socket.on("ticker", (quotes) => {
      setTickers(quotes);
    });

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    let timer = 0;

    const tickerToGraph = tickers.find((quote) => quote.ticker === selected?.ticker);
    if (tickerToGraph) {
      timer = setInterval(() => {
        setGraph((prevGraph) => [...prevGraph, { price: tickerToGraph.price }]);
      }, 3000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [graph, selected?.ticker, tickers]);

  const selectTicker = (ticker) => {
    setSelected(ticker);
    setGraph([]);
  };

  const renderGraphBars = () => {
    const minValue = Math.min(...graph.map((g) => g.price));
    const maxValue = Math.max(...graph.map((g) => g.price));

    return graph.map(({ price }, idx) => {
      const heightPercentage = 5 + ((price - minValue) * 95) / (maxValue - minValue);
      console.log("height", heightPercentage);
      console.log("price", price);

      return <div key={idx} style={{ height: `${graph.length === 1 ? 100 : heightPercentage}%` }} className="graph-bar"/>;
    });
  };

  const handleCloseGraph = () => {
    setSelected(null);
    setGraph([]);
  };

  return (
    <div className="mx-auto flex flex-col items-center bg-gray-100 p-4">
      <div className="container">
        {tickers.length > 0 && (
          <>
            <hr className="w-full border-t border-gray-600 my-4" />
            <div className="ticker-container">
              {tickers.map((t) => (
                <div
                  key={t.ticker}
                  onClick={() => selectTicker(t)}
                  className="ticker-card"
                >
                  <div className="ticker-title">{t.ticker} - USD</div>
                  <div className={cn("ticker-change-percent", {'ticker-change-percent--down': t.change < 10})}>{t.change}%</div>
                  <div className="ticker-price">{t.price}$</div>
                </div>
              ))}
            </div>
            <hr />
          </>
        )}

        {selected && (
          <section className="relative">
            <h3 className="text-lg leading-6 font-medium text-gray-900 my-8">
              {selected.ticker} - USD
            </h3>
            <div className="graph-container">{renderGraphBars()}</div>
            <button onClick={handleCloseGraph} type="button" className="absolute top-0 right-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 511.76 511.76">
                <g>
                  <path
                    d="M436.896,74.869c-99.84-99.819-262.208-99.819-362.048,0c-99.797,99.819-99.797,262.229,0,362.048    c49.92,49.899,115.477,74.837,181.035,74.837s131.093-24.939,181.013-74.837C536.715,337.099,536.715,174.688,436.896,74.869z     M361.461,331.317c8.341,8.341,8.341,21.824,0,30.165c-4.16,4.16-9.621,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251    l-75.413-75.435l-75.392,75.413c-4.181,4.16-9.643,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251    c-8.341-8.341-8.341-21.845,0-30.165l75.392-75.413l-75.413-75.413c-8.341-8.341-8.341-21.845,0-30.165    c8.32-8.341,21.824-8.341,30.165,0l75.413,75.413l75.413-75.413c8.341-8.341,21.824-8.341,30.165,0    c8.341,8.32,8.341,21.824,0,30.165l-75.413,75.413L361.461,331.317z"
                    fill="#718096"
                    data-original="#000000"
                  ></path>
                </g>
              </svg>
            </button>
          </section>
        )}
      </div>
    </div>
  );
}

export default App;
