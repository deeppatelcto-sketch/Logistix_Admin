import { createSlice } from "@reduxjs/toolkit";

const pickupPointSlice = createSlice({
  name: "pickupPoint",
  initialState: {
    loading: false,
    error: null,
    success: false,
    pickupPoints: [],
  },
  reducers: {
    request(state) {
      state.loading = true;
      state.error = null;
    },
    success(state, action) {
      state.loading = false;
      state.pickupPoints = action.payload;
    },
    failure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    created(state) {
      state.loading = false;
      state.success = true;
    },
    resetSuccess(state) {
      state.success = false;
    },
    toggled(state) {
      state.loading = false;
      state.success = true; // optional: you can also separate this as toggledSuccess
    }

  },
});

export const {
  request,
  success,
  failure,
  created,
  resetSuccess,
  toggled
} = pickupPointSlice.actions;

export const pickupPointReducer = pickupPointSlice.reducer;

