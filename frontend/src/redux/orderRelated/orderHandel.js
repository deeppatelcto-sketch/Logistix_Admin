// redux/orderRelated/orderHandel.js
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';

// 1. Calculate courier rates
export const calculateRates = createAsyncThunk(   
  'order/calculateRates',
  async (orderDetails, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/calculate-rates`,  
        orderDetails
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Rate calculation failed'
      );
    }
  }
);

// 2. Create new order (Admin Flow)
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/create-order-admin`, 
        orderData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Order creation failed'
      );
    }
  }
);

// 3. Get all orders (Admin)
export const getAllOrders = createAsyncThunk(
  'order/getAllOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/orderList`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch orders'
      );
    }
  }
);

// 4. Update full order
export const updateOrder = createAsyncThunk(
  'order/updateOrder',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/order/${id}`,
        updatedData
      );
      return { id, updatedOrder: response.data.order };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update order'
      );
    }
  }
);

// 5. Delete order
export const deleteOrder = createAsyncThunk(
  'order/deleteOrder',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/order/${id}`);

      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete order'
      );  
    }
  }
);

// 6. Fetch order count
export const fetchOrderCount = createAsyncThunk(
  'order/fetchOrderCount',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/myorder/count`);
      return response.data; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch order count'
      );
    }
  }
);

// 7. Update only order status
export const updateOrderStatus = createAsyncThunk(
  'order/updateOrderStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/order/${id}/status`,
        { status }
      );
      return response.data.order;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update order status'
      );
    }
  }
);



// 8. Fetch Dashboard Stats
export const fetchDashboardStats = createAsyncThunk(
  "order/fetchDashboardStats",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/dashboard-stats`);
      return data;
    } catch (error) {
      return rejectWithValue("Dashboard Stats Error");
    }
  }
);









// // redux/orderRelated/orderHandel.js

// import axios from 'axios';
// import { createAsyncThunk } from '@reduxjs/toolkit';

// 1. Calculate courier rates
// export const calculateRates = createAsyncThunk(
//   'order/calculateRates',
//   async (orderDetails, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}/calculate-rates`,
//         orderDetails
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || 'Rate calculation failed'
//       );
//     }
//   }
// );

// // 2. Create new order (Admin Flow)
// export const createOrder = createAsyncThunk(
//   'order/createOrder',
//   async (orderData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}/create-order-admin`, // ✅ admin API
//         orderData
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || 'Order creation failed'
//       );
//     }
//   }
// );

// // 3. Get all orders (Admin)
// export const getAllOrders = createAsyncThunk(
//   'order/getAllOrders',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/orderList`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || 'Failed to fetch orders'
//       );
//     }
//   }
// );

// // 4. Update full order
// export const updateOrder = createAsyncThunk(
//   'order/updateOrder',
//   async ({ id, updatedData }, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(
//         `${process.env.REACT_APP_BASE_URL}/order/${id}`,
//         updatedData
//       );
//       return { id, updatedOrder: response.data.order };
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || 'Failed to update order'
//       );
//     }
//   }
// );

// // 5. Delete order
// export const deleteOrder = createAsyncThunk(
//   'order/deleteOrder',
//   async (id, { rejectWithValue }) => {
//     try {
//       await axios.delete(`${process.env.REACT_APP_BASE_URL}/order/${id}`);
//       return id;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || 'Failed to delete order'
//       );
//     }
//   }
// );

// // 6. Fetch order count
// export const fetchOrderCount = createAsyncThunk(
//   'order/fetchOrderCount',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get("http://localhost:8000/allorder/count");
//       return response.data; // ✅ returns { total, pending, shipped, etc. }
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || 'Failed to fetch order count'
//       );
//     }
//   }
// );

// // 7. Update only order status
// export const updateOrderStatus = createAsyncThunk(
//   'order/updateOrderStatus',
//   async ({ id, status }, { rejectWithValue }) => {
//     try {
//       const response = await axios.patch(
//         `${process.env.REACT_APP_BASE_URL}/order/${id}/status`,
//         { status }
//       );
//       return response.data.order;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || 'Failed to update order status'
//       );
//     }
//   }
// );




// export const fetchOrderRevenue = createAsyncThunk(
//   'order/fetchOrderRevenue',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get("http://localhost:8000/orderRevenue");
//       return response.data; 
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || 'Failed to fetch order revenue summary'
//       );
//     }
//   }
// );