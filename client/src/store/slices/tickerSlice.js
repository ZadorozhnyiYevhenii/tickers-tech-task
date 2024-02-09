import { createSlice } from '@reduxjs/toolkit';

export const tickerSlice = createSlice({
  name: 'ticker',
  initialState: {
    selected: null,
    graph: [],
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
  },
});

export const { setSelectedTicker, setGraphData, clearGraphData } = tickerSlice.actions;

export const selectSelectedTicker = (state) => state.ticker.selected;
export const selectGraphData = (state) => state.ticker.graph;

export const tickersReducer = tickerSlice.reducer;
