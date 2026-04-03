// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   custList: [],
//   loading: false,
//   error: null,
//   response: null,
// };

// const custSlice = createSlice({
//   name: "cust",
//   initialState,
//   reducers: {
//     getRequest: (state) => {
//       state.loading = true;
//     },
//     getSuccess: (state, action) => {
//       state.custList = action.payload;
//       state.loading = false;
//       state.error = null;
//       state.response = null;
//     },
//     getFailed: (state, action) => {
//       state.response = action.payload;
//       state.loading = false;
//       state.error = null;
//     },
//     getError: (state, action) => {
//       state.loading = false;
//       state.error = action.payload?.message || "An error occurred";
//     },
//     updateSuccess: (state, action) => {
//       const updatedCust = action.payload.updatedData;
//       state.custList = state.custList.map((cust) =>
//         cust._id === updatedCust._id ? updatedCust : cust
//       );
//       state.response = "Customer updated successfully!";
//       state.loading = false;
//       state.error = null;
//     },
//   },
// });

// export const {
//   getRequest,
//   getSuccess,
//   getFailed,
//   getError,
//   updateSuccess,
// } = custSlice.actions;

// export const custReducer = custSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  custList: [],
  loading: false,
  error: null,
  response: null,
  status: 'idle',  // <-- add this for easy status tracking
};

const custSlice = createSlice({
  name: "cust",
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true;
      state.status = 'loading';
      state.error = null;
      state.response = null;
    },
    getSuccess: (state, action) => {
      // if payload is an array (list), update custList else treat as message
      if (Array.isArray(action.payload)) {
        state.custList = action.payload;
        state.response = null;
      } else {
        state.response = action.payload;  // message from backend
      }
      state.loading = false;
      state.error = null;
      state.status = 'success';
    },
    getFailed: (state, action) => {
      state.response = action.payload;
      state.loading = false;
      state.error = null;
      state.status = 'error';
    },
    getError: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "An error occurred";
      state.status = 'error';
    },
    updateSuccess: (state, action) => {
      const updatedCust = action.payload.updatedData;
      state.custList = state.custList.map((cust) =>
        cust._id === updatedCust._id ? updatedCust : cust
      );
      state.response = "Customer updated successfully!";
      state.loading = false;
      state.error = null;
      state.status = 'success';
    },
    underControl: (state) => {
      // reset status and error after showing messages
      state.status = 'idle';
      state.error = null;
      state.response = null;
      state.loading = false;
    }
  },
});

export const {
  getRequest,
  getSuccess,
  getFailed,
  getError,
  updateSuccess,
  underControl
} = custSlice.actions;

export const custReducer = custSlice.reducer;
