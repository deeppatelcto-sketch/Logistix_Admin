import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "MLOrder",
  initialState: {
    MLOrder: [],  
    loading: false,
    error: null,
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload; 
    },
    addOrder: (state, action) => {
      state.orders.push(action.payload); 
    },
    removeOrder: (state, action) => {
      state.orders = state.orders.filter(
        (order) => order._id !== action.payload
      );
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});


export const { setOrders, addOrder, removeOrder, setLoading, setError } =
  orderSlice.actions;


export default orderSlice.reducer;
