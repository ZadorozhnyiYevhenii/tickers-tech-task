import { createSlice } from '@reduxjs/toolkit';

export const tickerSlice = createSlice({
  name: 'ticker',
  initialState: {
    selected: null,
    graph: [],
    tickers: []
  },
  reducers: {
    setSelectedTicker: (state, action) => {
      state.selected = action.payload;
    },
    setGraphData: (state, action) => {
      state.graph = action.payload;
    },
    clearGraphData: (state) => {
      state.graph = [];
    },
    setTickers: (state, action) => {
      state.tickers = action.payload;
    },
  },
});

export const { 
  setSelectedTicker, 
  setGraphData, 
  clearGraphData, 
  setTickers,
} = tickerSlice.actions;

export const tickersReducer = tickerSlice.reducer;
