import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearGraphData } from '../slices/tickerSlice';
import { socket } from '../../api/core';

export const disconnectSocket = createAsyncThunk(
  'socket/disconnect',
  async (_, { dispatch }) => {
    socket.disconnect();
    await dispatch(clearGraphData());
  }
);