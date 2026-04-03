import { createSlice } from "@reduxjs/toolkit";
import { uploadCompanyRate, fetchCompanies, fetchRates } from "./companyRateHandel";

const companyRateSlice = createSlice({
  name: "companyRate",
  initialState: {
    companies: [],
    rates: [],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Upload company
      .addCase(uploadCompanyRate.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadCompanyRate.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
        state.companies.unshift(action.payload.company);
      })
      .addCase(uploadCompanyRate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Upload failed";
      })

      // Fetch companies
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching companies";
      })

      // Fetch rates
      .addCase(fetchRates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRates.fulfilled, (state, action) => {
        state.loading = false;
        state.rates = action.payload.rates;
      })
      .addCase(fetchRates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching rates";
      });
  },
});

export const { clearMessages } = companyRateSlice.actions;
export default companyRateSlice.reducer;
