import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courierRates: [],   // Array to hold rate entries
  loading: false,
  error: null,
  response: null,
};

const courierRateSlice = createSlice({
  name: "courierRate",
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.response = null;
    },
    getSuccess: (state, action) => {
      state.courierRates = Array.isArray(action.payload) ? action.payload : [];
      state.loading = false;
      state.error = null;
      state.response = null;
    },
    getFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload || "Request failed";
    },
    getError: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "An error occurred";
      state.response = null;
    },
    updateSuccess: (state, action) => {
      const updatedRate = action.payload.updatedData;
      state.courierRates = state.courierRates.map((rate) =>
        rate._id === updatedRate._id ? updatedRate : rate
      );
      state.response = "Courier rate updated successfully!";
      state.loading = false;
      state.error = null;
    },
    createSuccess: (state, action) => {
      // ✅ Safely push new data into the existing array
      if (state.courierRates && Array.isArray(state.courierRates)) {
        state.courierRates.push(action.payload);
      } else {
        state.courierRates = [action.payload];
      }
      state.loading = false;
      state.error = null;
      state.response = "Courier rate added successfully!";
    },
  },
});

export const {
  getRequest,
  getSuccess,
  getFailed,
  getError,
  updateSuccess,
  createSuccess,
} = courierRateSlice.actions;

export const courierRateReducer = courierRateSlice.reducer;

