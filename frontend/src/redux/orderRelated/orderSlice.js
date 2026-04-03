
import { createSlice } from '@reduxjs/toolkit';
import {
  calculateRates,
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
  fetchOrderCount,
  updateOrderStatus,
  fetchDashboardStats
} from './orderHandel';

const initialState = {
  rateLoading: false,
  rateError: null,
  rateSuccess: false,
  zone: null,
  rates: [],

  orderLoading: false,
  orderError: null,
  orderSuccess: false,
  newOrder: null,

  orders: [],
  count: 0,
  loading: false,
  error: null,
  response: null,

  orderCount: {},
  dashboard: {
    revenue: {},
    orderPerformance: {},
    weightSummary: {},
    zoneWeight: {},
  },

};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrderState: (state) => {
      Object.assign(state, initialState);
    },
    setOrderCount: (state, action) => {
      state.orderCount = action.payload;
    },
   
  },

  extraReducers: (builder) => {
    builder


      // 🟡 Calculate Rates
      .addCase(calculateRates.pending, (state) => {
        state.rateLoading = true;
        state.rateError = null;
        state.rateSuccess = false;
      })
      .addCase(calculateRates.fulfilled, (state, action) => {
        state.rateLoading = false;
        state.rateSuccess = true;
        state.zone = action.payload.zone;
        state.rates = action.payload.rates;
      })
      .addCase(calculateRates.rejected, (state, action) => {
        state.rateLoading = false;
        state.rateError = action.payload;
      })

      // 🟢 Create Order
      .addCase(createOrder.pending, (state) => {
        state.orderLoading = true;
        state.orderError = null;
        state.orderSuccess = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderLoading = false;
        state.orderSuccess = true;
        state.newOrder = action.payload.order;
        state.orders.push(action.payload.order);
        state.count = state.orders.length;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = action.payload;
      })

      // 🔵 Get All Orders
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.count = action.payload.length;
        state.loading = false;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🟣 Update Order
      .addCase(updateOrder.fulfilled, (state, action) => {
        const updatedOrder = action.payload.updatedOrder;
        state.orders = state.orders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        );
        state.response = 'Order updated successfully!';
      })

      // 🔴 Delete Order
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter((order) => order._id !== action.payload);
        state.count = state.orders.length;
        state.response = 'Order deleted successfully!';
      })

      // ✅ Fetch Status-Wise Order Count
      .addCase(fetchOrderCount.fulfilled, (state, action) => {
        state.orderCount = action.payload;
      })

      // 🟡 Update Order Status
      .addCase(updateOrderStatus.pending, (state) => {
        state.orderLoading = true;
        state.response = null;
        state.orderError = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        state.orders = state.orders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        );
        state.orderLoading = false;
        state.response = 'Order status updated successfully!';
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = action.payload;
      })

      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.dashboard = action.payload;
      });




  },
});

export const { resetOrderState,setOrderCount,
  setDashboardStats } = orderSlice.actions;
export default orderSlice.reducer;

export {
  calculateRates,
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
  fetchOrderCount,
  updateOrderStatus,
  fetchDashboardStats,
  
};

























// import { createSlice } from '@reduxjs/toolkit';
// import {
//   calculateRates,
//   createOrder,
//   getAllOrders,
//   updateOrder,
//   deleteOrder,
//   fetchOrderCount,
//   fetchOrderRevenue, // ✅ add this import
//   updateOrderStatus,
// } from './orderHandel';

// const initialState = {
//   rateLoading: false,
//   rateError: null,
//   rateSuccess: false,
//   zone: null,
//   rates: [],

//   orderLoading: false,
//   orderError: null,
//   orderSuccess: false,
//   newOrder: null,

//   orders: [],
//   count: 0,
//   loading: false,
//   error: null,
//   response: null,

//   // ✅ Updated to store count by status
//   orderCount: {
//     total: 0,
//     pending: 0,
//     readytoship: 0,
//     shipped: 0,
//     delivered: 0,
//     cancelled: 0,
//   },

//   // ✅ Added revenue summary
//   revenueSummary: {
//     totalRevenue: 0,
//     totalPrepaid: 0,
//     totalCOD: 0,
//     totalToPay: 0,
//     totalFranchiseeToPay: 0,
//   },
// };

// const orderSlice = createSlice({
//   name: 'order',
//   initialState,
//   reducers: {
//     resetOrderState: (state) => {
//       Object.assign(state, initialState);
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // 🟡 Calculate Rates
//       .addCase(calculateRates.pending, (state) => {
//         state.rateLoading = true;
//         state.rateError = null;
//         state.rateSuccess = false;
//       })
//       .addCase(calculateRates.fulfilled, (state, action) => {
//         state.rateLoading = false;
//         state.rateSuccess = true;
//         state.zone = action.payload.zone;
//         state.rates = action.payload.rates;
//       })
//       .addCase(calculateRates.rejected, (state, action) => {
//         state.rateLoading = false;
//         state.rateError = action.payload;
//       })

//       // 🟢 Create Order
//       .addCase(createOrder.pending, (state) => {
//         state.orderLoading = true;
//         state.orderError = null;
//         state.orderSuccess = false;
//       })
//       .addCase(createOrder.fulfilled, (state, action) => {
//         state.orderLoading = false;
//         state.orderSuccess = true;
//         state.newOrder = action.payload.order;
//         state.orders.push(action.payload.order);
//         state.count = state.orders.length;
//       })
//       .addCase(createOrder.rejected, (state, action) => {
//         state.orderLoading = false;
//         state.orderError = action.payload;
//       })

//       // 🔵 Get All Orders
//       .addCase(getAllOrders.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getAllOrders.fulfilled, (state, action) => {
//         state.orders = action.payload;
//         state.count = action.payload.length;
//         state.loading = false;
//       })
//       .addCase(getAllOrders.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // 🟣 Update Order
//       .addCase(updateOrder.fulfilled, (state, action) => {
//         const updatedOrder = action.payload.updatedOrder;
//         state.orders = state.orders.map((order) =>
//           order._id === updatedOrder._id ? updatedOrder : order
//         );
//         state.response = 'Order updated successfully!';
//       })

//       // 🔴 Delete Order
//       .addCase(deleteOrder.fulfilled, (state, action) => {
//         state.orders = state.orders.filter((order) => order._id !== action.payload);
//         state.count = state.orders.length;
//         state.response = 'Order deleted successfully!';
//       })

//       // ✅ Fetch Status-Wise Order Count
//       .addCase(fetchOrderCount.fulfilled, (state, action) => {
//         state.orderCount = action.payload;
//       })

//       // ✅ Fetch Revenue Summary
//       .addCase(fetchOrderRevenue.fulfilled, (state, action) => {
//         state.revenueSummary = action.payload; // assign the API response directly
//       })

//       // 🟡 Update Order Status
//       .addCase(updateOrderStatus.pending, (state) => {
//         state.orderLoading = true;
//         state.response = null;
//         state.orderError = null;
//       })
//       .addCase(updateOrderStatus.fulfilled, (state, action) => {
//         const updatedOrder = action.payload;
//         state.orders = state.orders.map((order) =>
//           order._id === updatedOrder._id ? updatedOrder : order
//         );
//         state.orderLoading = false;
//         state.response = 'Order status updated successfully!';
//       })
//       .addCase(updateOrderStatus.rejected, (state, action) => {
//         state.orderLoading = false;
//         state.orderError = action.payload;
//       });
//   },
// });

// export const { resetOrderState } = orderSlice.actions;
// export default orderSlice.reducer;

// export {
//   calculateRates,
//   createOrder,
//   getAllOrders,
//   updateOrder,
//   deleteOrder,
//   fetchOrderCount,
//   fetchOrderRevenue,
//   updateOrderStatus,
// };
