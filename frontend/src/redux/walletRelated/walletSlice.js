// redux/walletRelated/walletSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  balance: 0,
  transactions: [],
  allWallets: [],     
  loading: false,
  error: null,
  status: 'idle',
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
      state.status = 'loading';
    },
    rechargeSuccess: (state, action) => {
      state.loading = false;
      state.status = 'success';
      state.balance = action.payload.balance;
      state.transactions = action.payload.transactions;
      state.error = null;
    },
    debitSuccess: (state, action) => {
      state.loading = false;
      state.status = 'success';
      state.balance = action.payload.balance;
      state.transactions = action.payload.transactions;
      state.error = null;
    },
    refundSuccess: (state, action) => {
      state.loading = false;
      state.status = 'success';
      state.balance = action.payload.balance;
      state.transactions = action.payload.transactions;
      state.error = null;
    },
    getDetailsSuccess: (state, action) => {
      state.loading = false;
      state.status = 'success';
      state.balance = action.payload.balance;
      state.transactions = action.payload.transactions;
      state.error = null;
    },
    getAllWalletsSuccess: (state, action) => {
      state.loading = false;
      state.status = 'success';
      state.allWallets = action.payload;
      state.error = null;
    },
    operationFailed: (state, action) => {
      state.loading = false;
      state.status = 'failed';
      state.error = action.payload;
    },
    setWalletBalance: (state, action) => {
      state.walletBalance = action.payload;
    },
  },
});

export const {
  clearError,
  setLoading,
  rechargeSuccess,
  debitSuccess,
  refundSuccess,
  getDetailsSuccess,
  getAllWalletsSuccess,
  operationFailed,
  setWalletBalance,
} = walletSlice.actions;

export const walletReducer = walletSlice.reducer;
