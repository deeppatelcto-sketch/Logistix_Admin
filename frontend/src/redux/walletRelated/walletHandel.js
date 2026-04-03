// // redux/walletRelated/walletHandle.js

// import axios from 'axios';
// import {
//   setLoading,
//   rechargeSuccess,
//   debitSuccess,
//   refundSuccess,
//   getDetailsSuccess,
//   getAllWalletsSuccess,
//   operationFailed,
// } from './walletSlice';
// import { setWalletBalance } from "./walletSlice";

// const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';

// // 🔵 Recharge Wallet
// export const rechargeWallet = ({ userId, userModel, amount, description }) => async (dispatch) => {
//   dispatch(setLoading());
//   try {
//     const res = await axios.post(`${BASE_URL}/recharge`, {
//       userId,
//       userModel,
//       amount,
//       description,
//     });

//     if (res.data.balance !== undefined) {
//       dispatch(rechargeSuccess(res.data));
//     } else {
//       dispatch(operationFailed('Recharge failed'));
//     }
//   } catch (err) {
//     const message = err.response?.data?.message || err.message || 'Something went wrong';
//     dispatch(operationFailed(message));
//   }
// };

// // 🔴 Debit Wallet
// export const debitWallet = ({ userId, amount, description }) => async (dispatch) => {
//   dispatch(setLoading());
//   try {
//     const res = await axios.post(`${BASE_URL}/debit`, {
//       userId,
//       amount,
//       description,
//     });

//     if (res.data.balance !== undefined) {
//       dispatch(debitSuccess(res.data));
//     } else {
//       dispatch(operationFailed('Debit failed'));
//     }
//   } catch (err) {
//     const message = err.response?.data?.message || err.message || 'Something went wrong';
//     dispatch(operationFailed(message));
//   }
// };

// // 🟢 Refund Wallet
// export const refundWallet = ({ userId, userModel, amount, description }) => async (dispatch) => {
//   dispatch(setLoading());
//   try {
//     const res = await axios.post(`${BASE_URL}/refund`, {
//       userId,
//       userModel,
//       amount,
//       description,
//     });

//     if (res.data.balance !== undefined) {
//       dispatch(refundSuccess(res.data));
//     } else {
//       dispatch(operationFailed('Refund failed'));
//     }
//   } catch (err) {
//     const message = err.response?.data?.message || err.message || 'Something went wrong';
//     dispatch(operationFailed(message));
//   }
// };

// // 🔍 Get Single Wallet Details
// export const getWalletDetails = ({ userId, userModel }) => async (dispatch) => {
//   dispatch(setLoading());
//   try {
//     const response = await axios.get(`${BASE_URL}/wallet`, {
//       params: { userId, userModel },
//     });

//     if (response.data && response.data.balance !== undefined) {
//       dispatch(getDetailsSuccess(response.data));
//     } else {
//       dispatch(operationFailed('Failed to fetch wallet details'));
//     }
//   } catch (err) {
//     const message = err.response?.data?.message || err.message || 'Something went wrong';
//     dispatch(operationFailed(message));
//   }
// };

// // 📋 Get All Wallets (Admin)
// export const getAllWallets = () => async (dispatch) => {
//   dispatch(setLoading());
//   try {
//     const res = await axios.get(`${BASE_URL}/wallets`);
//     if (Array.isArray(res.data)) {
//       dispatch(getAllWalletsSuccess(res.data));
//     } else {
//       dispatch(operationFailed('Failed to fetch all wallets'));
//     }
//   } catch (err) {
//     const message = err.response?.data?.message || err.message || 'Something went wrong';
//     dispatch(operationFailed(message));
//   }
// };

// export const fetchWalletBalance = (userId, userModel) => async (dispatch) => {
//   try {
//     const { data } = await axios.get(`/api/wallet/balance/${userModel}/${userId}`);
//     dispatch(setWalletBalance(data.balance));
//     return data.balance;
//   } catch (err) {
//     console.error("Wallet fetch error", err);
//     return 0;
//   }
// };




import axios from "axios";
import {
  setLoading,
  rechargeSuccess,
  debitSuccess,
  refundSuccess,
  getDetailsSuccess,
  getAllWalletsSuccess,
  operationFailed,
} from "./walletSlice";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:8000";

// ADMIN & CLIENT: recharge
export const rechargeWallet = ({ userId, userModel, amount, description }) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const res = await axios.post(`${BASE_URL}/admin/recharge`, {
      userId,
      userModel,
      amount,
      description,
    });

    if (res.data.balance !== undefined) {
      dispatch(rechargeSuccess(res.data));
    } else {
      dispatch(operationFailed("Recharge failed"));
    }
  } catch (err) {
    const message = err.response?.data?.message || err.message;
    dispatch(operationFailed(message));
  }
};

// ADMIN & CLIENT: debit
export const debitWallet = ({ userId, userModel, amount, description }) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const res = await axios.post(`${BASE_URL}/admin/debit`, {
      userId,
      userModel,
      amount,
      description,
    });

    if (res.data.balance !== undefined) {
      dispatch(debitSuccess(res.data));
    } else {
      dispatch(operationFailed("Debit failed"));
    }
  } catch (err) {
    const message = err.response?.data?.message || err.message;
    dispatch(operationFailed(message));
  }
};

// ADMIN & CLIENT: refund
export const refundWallet = ({ userId, userModel, amount, description }) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const res = await axios.post(`${BASE_URL}/admin/refund`, {
      userId,
      userModel,
      amount,
      description,
    });

    if (res.data.balance !== undefined) {
      dispatch(refundSuccess(res.data));
    } else {
      dispatch(operationFailed("Refund failed"));
    }
  } catch (err) {
    const message = err.response?.data?.message || err.message;
    dispatch(operationFailed(message));
  }
};

// Get one wallet detail (Admin or client)
export const getWalletDetails = ({ userId, userModel }) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await axios.get(`${BASE_URL}/wallet`, {
      params: { userId, userModel },
    });

    if (response.data && response.data.balance !== undefined) {
      dispatch(getDetailsSuccess(response.data));
    } else {
      dispatch(operationFailed("Failed to fetch wallet details"));
    }
  } catch (err) {
    const message = err.response?.data?.message || err.message;
    dispatch(operationFailed(message));
  }
};

// Get all wallets (Admin)
export const getAllWallets = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const res = await axios.get(`${BASE_URL}/wallets`);
    if (Array.isArray(res.data)) {
      dispatch(getAllWalletsSuccess(res.data));
    } else {
      dispatch(operationFailed("Failed to fetch all wallets"));
    }
  } catch (err) {
    const message = err.response?.data?.message || err.message;
    dispatch(operationFailed(message));
  }
};
