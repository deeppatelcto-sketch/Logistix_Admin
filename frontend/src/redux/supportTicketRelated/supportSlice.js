import { createSlice } from "@reduxjs/toolkit";

const supportSlice = createSlice({
  name: "support",
  initialState: {
    tickets: [],
    customers: [],
    couriers: [],
    loading: false,
  },
  reducers: {
    setTickets: (state, action) => {
      state.tickets = action.payload;
    },
    setCustomers: (state, action) => {
      state.customers = action.payload;
    },
    setCouriers: (state, action) => {
      state.couriers = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setTickets,
  setCustomers,
  setCouriers,
  setLoading,
} = supportSlice.actions;

export default supportSlice.reducer;