import { createAsyncThunk } from "@reduxjs/toolkit";
import { setGraphData } from "../slices/tickerSlice";

export const fetchGraphData = createAsyncThunk(
  "ticker/fetchGraphData",
  async (storedGraph, { dispatch }) => {
    if (storedGraph) {
      dispatch(setGraphData(JSON.parse(storedGraph)));
    }
  }
);
