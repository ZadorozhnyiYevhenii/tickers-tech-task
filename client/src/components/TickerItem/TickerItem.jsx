import { useDispatch } from 'react-redux'
import cn from "classnames";
import { clearGraphData, setSelectedTicker } from '../../store/slices/tickerSlice';
import './TickerItem.css';

export const TickerItem = ({ ticker }) => {
  const dispatch = useDispatch();

  const selectTicker = (ticker) => {
    dispatch(setSelectedTicker(ticker));
    dispatch(clearGraphData());
  };

  return (
    <li
      key={ticker.ticker}
      onClick={() => selectTicker(ticker)}
      className="ticker-card"
    >
      <div className="ticker-title" data-testid='ticker-title'>{ticker.ticker} - USD</div>
      <div
        className={cn("ticker-change-percent", {
          "ticker-change-percent--down": ticker.change < 10,
        })}
        data-testid='ticker-change-percent'
      >
        {ticker.change}%
      </div>
      <div className='ticker-exchange'>{ticker.exchange}</div>
      <div className="ticker-price" data-testid='ticker-price'>{ticker.price}$</div>
    </li>
  );
};
