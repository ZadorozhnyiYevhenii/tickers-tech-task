import { renderStore } from "../helpers/testWithProvider";
import { TickerItem } from "../components/TickerItem/TickerItem";
import { useDispatch } from "react-redux";
import { clearGraphData, setSelectedTicker } from "../store/slices/tickerSlice";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

const ticker = {
  ticker: "AAPL",
  change: 5,
  price: 150,
};

describe("Ticker item component tests", () => {
  const mockDispatch = jest.fn();
  useDispatch.mockReturnValue(mockDispatch);

  test("renders ticker item correctly", () => {
    const { getByTestId } = renderStore(<TickerItem ticker={ticker} />);
    
    const tickerTitle = getByTestId("ticker-title");
    expect(tickerTitle.textContent).toBe("AAPL - USD");
    
    const tickerChangePercent = getByTestId("ticker-change-percent");
    expect(tickerChangePercent.textContent).toBe("5%");
    
    const tickerPrice = getByTestId("ticker-price");
    expect(tickerPrice.textContent).toBe("150$");
  });

  test("clicking on ticker item dispatches actions", () => {
    require('react-redux').useDispatch.mockReturnValue(mockDispatch);

    const { getByText } = renderStore(<TickerItem ticker={ticker} />);

    getByText("AAPL - USD").click();

    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toHaveBeenCalledWith(setSelectedTicker(ticker));
    expect(mockDispatch).toHaveBeenCalledWith(clearGraphData());
  });
});
