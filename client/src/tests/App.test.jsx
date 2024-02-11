import { fireEvent } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { renderStore } from "../helpers/testWithProvider";
import App from "../App";

const initialState = {
  tickers: {
    graph: [],
    selected: null,
    tickers: [
      { ticker: "AAPL", price: 150 },
      { ticker: "GOOG", price: 2500 },
    ],
  },
};

const mockStore = configureStore();
let store;

describe('App component test', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });
  
  test("updates interval time when interval input changes", () => {
    const { getByLabelText } = renderStore(<App />);
  
    const intervalInput = getByLabelText("Interval Time (ms):");
    fireEvent.change(intervalInput, { target: { value: "5000" } });
  
    expect(intervalInput.value).toBe("5000");
  });
})
