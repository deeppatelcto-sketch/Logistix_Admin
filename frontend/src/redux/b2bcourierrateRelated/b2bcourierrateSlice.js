import { createSlice } from '@reduxjs/toolkit';

const b2bCourierRateSlice = createSlice({
  name: 'b2bcourierRate',
  initialState: {
    courierRates: [],
    loading: false,
    error: null,
  },
  reducers: {
    getRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSuccess: (state, action) => {
      state.loading = false;
      state.courierRates = action.payload;
    },
    createSuccess: (state, action) => {
      state.loading = false;
      state.courierRates.push(action.payload);
    },
    updateSuccess: (state, action) => {
      state.loading = false;
      const index = state.courierRates.findIndex((item) => item._id === action.payload._id);
      if (index !== -1) {
        state.courierRates[index] = action.payload;
      }
    },
    deleteSuccess: (state, action) => {
      state.loading = false;
      state.courierRates = state.courierRates.filter((item) => item._id !== action.payload);
    },
    getFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  getRequest,
  getSuccess,
  getFailed,
  createSuccess,
  updateSuccess,
  deleteSuccess
} = b2bCourierRateSlice.actions;

export default b2bCourierRateSlice.reducer;
