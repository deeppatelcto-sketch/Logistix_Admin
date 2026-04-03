import { createSlice } from '@reduxjs/toolkit';

const rateCalculatorSlice = createSlice({
  name: 'rateCalculator',
  initialState: {
    loading: false,
    rates: [],
    zone: '',
    error: null,
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setRates: (state, action) => {
      state.loading = false;
      state.rates = action.payload.rates;
      state.zone = action.payload.zone;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearRates: (state) => {
      state.rates = [];
      state.zone = '';
      state.error = null;
    },
  },
});

export const { setLoading, setRates, setError, clearRates } = rateCalculatorSlice.actions;

export default rateCalculatorSlice.reducer;
