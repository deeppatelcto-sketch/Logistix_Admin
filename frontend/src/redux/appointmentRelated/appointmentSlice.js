// import { createSlice } from '@reduxjs/toolkit';

// const appointmentSlice = createSlice({
//   name: 'appointment',
//   initialState: {
//     appointments: [],
//     loading: false,
//   },
//   reducers: {
//     setAppointments: (state, action) => {
//       state.appointments = action.payload;
//     },
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//   },
// });

// export const { setAppointments, setLoading } = appointmentSlice.actions;
// export default appointmentSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState: {
    appointments: [],
    loading: false,
    error: null,
    successMessage: '',
  },
  reducers: {
    getRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = '';
    },
    getSuccess: (state, action) => {
      state.loading = false;
      state.successMessage = action.payload;
    },
    getFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getError: (state, action) => {
      state.loading = false;
      state.error = action.payload.message || 'Unknown error';
    },
    setAppointments: (state, action) => {
      state.appointments = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.successMessage = '';
    },
    underControl: (state) => {
      state.status = null;
      state.error = null;
      state.successMessage = '';
    }

  },
});

export const {
  getRequest,
  getSuccess,
  getFailed,
  getError,
  setAppointments,
  setLoading,
  resetState,
  underControl,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
