import { createSlice } from '@reduxjs/toolkit';

const pickupSlice = createSlice({
  name: 'pickup',
  initialState: {
    pickups: [],
    singlePickup: null,
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setPickups: (state, action) => {
      state.pickups = action.payload;
      state.loading = false;
    },
    setSinglePickup: (state, action) => {
      state.singlePickup = action.payload;
      state.loading = false;
    },
    pickupError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setPickups, setSinglePickup, pickupError } = pickupSlice.actions;
export const pickupReducer = pickupSlice.reducer;