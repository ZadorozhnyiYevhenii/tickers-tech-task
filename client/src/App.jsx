import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.css";
import { GraphItem } from "./components/GraphItem/GraphItem";
import { TickerItem } from "./components/TickerItem/TickerItem";

const socket = io("http://localhost:4000");

function App() {
  const [tickers, setTickers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [graph, setGraph] = useState([]);

  useEffect(() => {
    const storedGraph = localStorage.getItem("graph");
    if (storedGraph) {
      setGraph(JSON.parse(storedGraph));
    }

    const storedSelectedTicker = localStorage.getItem("selectedTicker");

    if (storedSelectedTicker) {
      setSelected(JSON.parse(storedSelectedTicker));
    }

    socket.emit("start");
    socket.on("ticker", (quotes) => {
      setTickers(quotes);
    });

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    let timer = 0;

    const tickerToGraph = tickers.find(
      (quote) => quote.ticker === selected?.ticker
    );
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
      const heightPercentage =
        5 + ((price - minValue) * 95) / (maxValue - minValue);
      console.log("height", heightPercentage);
      console.log("price", price);

      return (
        <div
          key={idx}
          style={{ height: `${graph.length === 1 ? 100 : heightPercentage}%` }}
          className="graph-bar"
        />
      );
    });
  };

  const handleCloseGraph = () => {
    setSelected(null);
    localStorage.removeItem("selectedTicker");
    setGraph([]);
  };

  useEffect(() => {
    localStorage.setItem("graph", JSON.stringify(graph));
    localStorage.setItem("selectedTicker", JSON.stringify(selected));
  }, [graph, selected]);

  return (
    <div className="mx-auto flex flex-col items-center bg-gray-100 p-4">
      <div className="container">
        {tickers.length > 0 && (
          <>
            <hr className="w-full border-t border-gray-600 my-4" />
            <div className="ticker-container">
              {tickers.map((ticker) => (
                <TickerItem
                  ticker={ticker}
                  selectTicker={selectTicker}
                  key={ticker.price}
                />
              ))}
            </div>
            <hr />
          </>
        )}

        {selected && (
          <GraphItem
            selectedTicker={selected.ticker}
            handleCloseGraph={handleCloseGraph}
            renderGraphBars={renderGraphBars()}
          />
        )}
      </div>
    </div>
  );
}

export default App;
