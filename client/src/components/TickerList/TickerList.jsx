import { useSelector } from "react-redux";
import { TickerItem } from "../TickerItem/TickerItem";
import "./TickerList.css";

export const TickerList = () => {
  const { tickers } = useSelector((state) => state.tickers);

  return (
    <section>
      <hr />
      {tickers.length > 0 ? (
        <ul className="ticker-container">
          {tickers.map((ticker) => (
            <TickerItem ticker={ticker} key={ticker.price} />
          ))}
        </ul>
      ) : (
        <div>There aren`t any tickers</div>
      )}
      <hr />
    </section>
  );
};
