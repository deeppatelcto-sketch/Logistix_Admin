// import axios from 'axios';
// import {
//   setLoading,
//   setPickups,
//   setSinglePickup,
//   pickupError,
// } from './pickupSlice';

// const BASE_URL = process.env.REACT_APP_BASE_URL;

// export const getAllPickups = () => async (dispatch) => {
//   dispatch(setLoading());
//   try {
//     const res = await axios.get(`${BASE_URL}/pickupreq`); 
//     dispatch(setPickups(res.data));
//   } catch (err) {
//     dispatch(pickupError(err.message));
//   }
// };

// export const addPickup = (pickupData) => async (dispatch) => {
//   dispatch(setLoading());
//   try {
//     await axios.post(`${BASE_URL}/createpickupreq`, pickupData);
//     dispatch(getAllPickups());
//   } catch (err) {
//     dispatch(pickupError(err.message));
//   }
// };

// export const deletePickup = (id) => async (dispatch) => {
//   dispatch(setLoading());
//   try {
//     await axios.delete(`${BASE_URL}/delete/${id}`);
//     dispatch(getAllPickups());
//   } catch (err) {
//     dispatch(pickupError(err.message));
//   }
// };





import axios from 'axios';
import {
  setLoading,
  setPickups,
  // setSinglePickup,
  pickupError,
} from './pickupSlice';

const BASE_URL = process.env.REACT_APP_BASE_URL;

// ✅ Fetch token and attach it to Authorization header
const authHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllPickups = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const res = await axios.get(`${BASE_URL}/pickupreq`, authHeader());
    dispatch(setPickups(res.data));
  } catch (err) {
    dispatch(pickupError(err?.response?.data?.message || err.message));
  }
};

export const addPickup = (pickupData) => async (dispatch) => {
  dispatch(setLoading());
  try {
    await axios.post(`${BASE_URL}/createpickupreqAdmin`, pickupData, authHeader());
    dispatch(getAllPickups());
  } catch (err) {
    dispatch(pickupError(err?.response?.data?.message || err.message));
  }
};

export const deletePickup = (id) => async (dispatch) => {
  dispatch(setLoading());
  try {
    await axios.delete(`${BASE_URL}/deletepickup/${id}`);
    dispatch(getAllPickups());
  } catch (err) {
    dispatch(pickupError(err?.response?.data?.message || err.message));
  }
};     