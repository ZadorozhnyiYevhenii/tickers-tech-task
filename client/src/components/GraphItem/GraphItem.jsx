import { useSelector, useDispatch } from 'react-redux';
import { clearGraphData, setSelectedTicker } from '../../store/slices/tickerSlice';
import './GraphItem.css';
import { CrossIcon } from '../../assets/icons/CrossIcon';

export const GraphItem = () => {
  const selected = useSelector(state => state.tickers.selected);
  const graph = useSelector(state => state.tickers.graph) || [];

  const dispatch = useDispatch();

  const handleCloseGraph = () => {
    localStorage.removeItem("selectedTicker");
    dispatch(setSelectedTicker(null));
    dispatch(clearGraphData());
  };

  const renderGraphBars = () => {
    if (!Array.isArray(graph)) {
      return null
    };

    const minValue = Math.min(...graph.map((g) => g.price));
    const maxValue = Math.max(...graph.map((g) => g.price));

    return graph.map(({ price }, idx) => {
      let heightPercentage = 5 + ((price - minValue) * 95) / (maxValue - minValue);
      console.log('Price', price);
      console.log('Height', heightPercentage)
      if (isNaN(heightPercentage)) {
        heightPercentage = 100;
      }

      return (
        <div
          key={idx}
          style={{ height: `${graph.length === 1 ? 100 : heightPercentage}%` }}
          className="graph-bar"
        />
      );
    });
  };

  return (
    <section className="relative">
      <h3 className="text-lg leading-6 font-medium text-gray-900 my-8">
        {selected ? `${selected.ticker} - USD` : 'No selected ticker'}
      </h3>
      <div className="graph-container">
        {renderGraphBars()}
      </div>
      <button
        onClick={handleCloseGraph}
        type="button"
        className="absolute top-0 right-0"
      >
        <CrossIcon />
      </button>
    </section>
  );
};
