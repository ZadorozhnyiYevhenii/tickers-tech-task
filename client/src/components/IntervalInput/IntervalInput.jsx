import './IntervalInput.css';

export const IntervalInput = ({ value, onChange }) => {
  return (
    <div className="interval-input-container">
      <label htmlFor="intervalInput" className="interval-input-label">
        Interval Time (ms):
      </label>
      <input
        type="number"
        step={500}
        id="intervalInput"
        value={value}
        onChange={onChange}
        className="interval-input"
      />
    </div>
  );
};
