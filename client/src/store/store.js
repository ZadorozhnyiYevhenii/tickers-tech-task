import { configureStore } from "@reduxjs/toolkit";
import { tickersReducer } from "./slices/tickerSlice";

export const store = configureStore({
  reducer: {
    tickers: tickersReducer
  }
});