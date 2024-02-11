import { fireEvent } from "@testing-library/react";
import { GraphItem } from "../components/GraphItem/GraphItem";
import { renderStore } from "../helpers/testWithProvider";
import { clearGraphData, setSelectedTicker } from "../store/slices/tickerSlice";

const ticker = {
  ticker: "AAPL",
  change: 5,
  price: 150,
};

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("GraphItem component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders with no selected ticker", () => {
    const mockDispatch = jest.fn();
    require("react-redux").useDispatch.mockReturnValue(mockDispatch);

    const { getByTestId } = renderStore(<GraphItem />);
    const tickerTitle = getByTestId("graph-ticker-name");

    expect(tickerTitle.textContent).toBe("No selected ticker");
  });

  test("renders with selected ticker", () => {
    require("react-redux").useSelector.mockReturnValue(ticker);

    const { getByTestId } = renderStore(<GraphItem />);
    const tickerTitle = getByTestId("graph-ticker-name");

    expect(tickerTitle.textContent).toBe("AAPL - USD");
  });

  test("handles closing graph", () => {
    const mockDispatch = jest.fn();
    require("react-redux").useDispatch.mockReturnValue(mockDispatch);

    const { getByTestId } = renderStore(<GraphItem />);
    fireEvent.click(getByTestId("close-button"));

    expect(mockDispatch).toHaveBeenCalledWith(setSelectedTicker(null));
    expect(mockDispatch).toHaveBeenCalledWith(clearGraphData());
  });
});
