import { createAsyncThunk } from '@reduxjs/toolkit';
import { socket } from '../../api/core';
import { setTickers } from '../slices/tickerSlice';
import { fetchGraphData } from './fetchGraphData';
import { fetchSelectedTicker } from './fetchSelectedTicker';

export const connectToTickersSocket = createAsyncThunk(
  'socket/connect',
  async (_, { dispatch }) => {
    const storedGraph = localStorage.getItem("graph");
    const storedSelectedTicker = localStorage.getItem("selectedTicker");

    await dispatch(fetchGraphData(storedGraph));
    await dispatch(fetchSelectedTicker(storedSelectedTicker));

    socket.emit("start");
    socket.on("ticker", (quotes) => {
      dispatch(setTickers(quotes));
    });

    return true;
  }
);
