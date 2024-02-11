import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGraphData } from "./store/slices/tickerSlice";
import { GraphItem } from "./components/GraphItem/GraphItem";
import { TickerList } from "./components/TickerList/TickerList";
import { connectToTickersSocket } from "./store/thunks/connectTicketsSocket";
import { disconnectSocket } from "./store/thunks/disconnectTicketsSocket";
import { intervalTime as defaultIntervalTime, localStorageKeys } from "./utils/constants";
import { IntervalInput } from "./components/IntervalInput/IntervalInput";
import "./App.css";

function App() {
  const { graph, selected, tickers } = useSelector((state) => state.tickers);
  const dispatch = useDispatch();
  const [intervalTime, setIntervalTime] = useState(defaultIntervalTime);

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
  }, [graph, selected?.ticker, tickers, dispatch]);

  useEffect(() => {
    localStorage.setItem(localStorageKeys.graph, JSON.stringify(graph));
    localStorage.setItem(localStorageKeys.selectedTicker, JSON.stringify(selected));
  }, [graph, selected]);

  const handleIntervalChange = (e) => {
    const newInterval = parseInt(e.target.value);
    if (newInterval >= 2500) {
      setIntervalTime(newInterval);
    } else {
      setIntervalTime(2500);
    }
  };

  return (
    <main className="wrapper">
      <div className="container">
        <TickerList />

        <IntervalInput
          value={intervalTime}
          onChange={handleIntervalChange}
        />

        {selected && <GraphItem />}
      </div>
    </main>
  );
}

export default App;
