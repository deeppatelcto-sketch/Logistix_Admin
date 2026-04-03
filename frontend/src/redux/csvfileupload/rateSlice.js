import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';

export const calculateRate = createAsyncThunk('rate/calculate', async (data) => {
  const res = await axios.post(`${BASE_URL}/api/calculate`, data);
  return res.data;
});

const rateSlice = createSlice({
  name: 'rates',
  initialState: { result: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(calculateRate.fulfilled, (state, action) => {
      state.result = action.payload;
    });
  }
});

export default rateSlice.reducer;
