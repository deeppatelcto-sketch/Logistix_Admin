import { createSlice } from "@reduxjs/toolkit";

const reconciliationSlice = createSlice({
  name: "reconciliation",
  initialState: {
    loading: false,
    result: null,
    error: null,
    allExtraWeights: [],
  },
  reducers: {
    requestStart: (state) => {
      state.loading = true;
      state.result = null;
      state.error = null;
    },
    requestSuccess: (state, action) => {
      state.loading = false;
      state.result = action.payload;
    },
    requestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearResult: (state) => {
      state.result = null;
    },
    setAllExtraWeights: (state, action) => {
      state.allExtraWeights = action.payload;
    },
  },
});

export const {
  requestStart,
  requestSuccess,
  requestFailure,
  clearResult,
  setAllExtraWeights,
} = reconciliationSlice.actions;


export const reconciliationReducer = reconciliationSlice.reducer;
