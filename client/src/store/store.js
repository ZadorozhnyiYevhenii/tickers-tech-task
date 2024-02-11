import { configureStore } from "@reduxjs/toolkit";
import { tickersReducer } from "./slices/tickerSlice";
import { thunk } from "redux-thunk";

export const store = configureStore({
  reducer: {
    tickers: tickersReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});