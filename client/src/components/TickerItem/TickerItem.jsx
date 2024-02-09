import cn from "classnames";
import './TickerItem.css';

export const TickerItem = ({ ticker, selectTicker }) => {
  return (
    <div
      key={ticker.ticker}
      onClick={() => selectTicker(ticker)}
      className="ticker-card"
    >
      <div className="ticker-title">{ticker.ticker} - USD</div>
      <div
        className={cn("ticker-change-percent", {
          "ticker-change-percent--down": ticker.change < 10,
        })}
      >
        {ticker.change}%
      </div>
      <div className="ticker-price">{ticker.price}$</div>
    </div>
  );
};
