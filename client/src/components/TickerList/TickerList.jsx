import { useSelector } from 'react-redux';
import { TickerItem } from '../TickerItem/TickerItem';
import './TickerList.css';

export const TickerList = () => {
  const { tickers } = useSelector(state => state.tickers);

  return (
    <>
      <hr />
      <ul className="ticker-container">
        {tickers.map((ticker) => (
          <TickerItem ticker={ticker} key={ticker.price} />
        ))}
      </ul>
      <hr />
    </>
  );
};
