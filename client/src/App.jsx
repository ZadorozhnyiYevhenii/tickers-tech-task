import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGraphData } from "./store/slices/tickerSlice";
import { GraphItem } from "./components/GraphItem/GraphItem";
import { TickerList } from "./components/TickerList/TickerList";
import { connectToTickersSocket } from "./store/thunks/connectTicketsSocket";
import { disconnectSocket } from "./store/thunks/disconnectTicketsSocket";
import "./App.css";
import { intervalTime } from "./utils/constants";

function App() {
  const { graph, selected, tickers } = useSelector((state) => state.tickers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connectToTickersSocket());

    return () => {
      dispatch(disconnectSocket());
    };
  }, [dispatch]);

  useEffect(() => {
    let timer = 0;

    const tickerToGraph = tickers.find(
      (quote) => quote.ticker === selected?.ticker
    );
    if (tickerToGraph) {
      timer = setInterval(() => {
        dispatch(setGraphData([...graph, { price: tickerToGraph.price }]));
      }, intervalTime);
    }

    return () => {
      clearInterval(timer);
    };
  }, [graph, selected?.ticker, tickers]);

  useEffect(() => {
    localStorage.setItem("graph", JSON.stringify(graph));
    localStorage.setItem("selectedTicker", JSON.stringify(selected));
  }, [graph, selected]);

  return (
    <div className="wrapper">
      <div className="container">
        <TickerList />

        {selected && <GraphItem />}
      </div>
    </div>
  );
}

export default App;
