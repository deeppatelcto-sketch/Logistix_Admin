import { createSlice } from '@reduxjs/toolkit';

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState: {
    invoices: [],
    loading: false,
    error: null,
  },
  reducers: {
    invoiceRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    invoiceSuccess: (state, action) => {
      state.loading = false;
      state.invoices = action.payload;
    },
    invoiceFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearInvoices: (state) => {
      state.invoices = [];
    },
  },
});

export const { invoiceRequest, invoiceSuccess, invoiceFail, clearInvoices } = invoiceSlice.actions;
export default invoiceSlice.reducer;
