import { createAsyncThunk } from '@reduxjs/toolkit';
import { setSelectedTicker } from '../slices/tickerSlice';

export const fetchSelectedTicker = createAsyncThunk(
  'ticker/fetchSelectedTicker',
  async (storedSelectedTicker, { dispatch }) => {
    if (storedSelectedTicker) {
      await dispatch(setSelectedTicker(JSON.parse(storedSelectedTicker)));
    }
  }
);