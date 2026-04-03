import axios from 'axios';
import {
  setAppointments,
  setLoading,
  getRequest,
  getSuccess,
  getFailed,
  getError,
} from './appointmentSlice';

import { setOrders, setError } from "./orderSlice";

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';

// export const addAppointment = (formData) => async (dispatch) => {
//   try {
//     await axios.post('http://localhost:8000/addappointment', formData);
//     dispatch(getAllAppointments());
//   } catch (error) {
//     console.error('Add Appointment Error:', error);
//   }
// };


export const addAppointment = (deliveryData) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.post(
      `${BASE_URL}/addappointmentAdmin`,
      deliveryData
    );
    if (result.data) {
      dispatch(getSuccess(result.data.message || "Appointment Delivery created successfully"));
    } else {
      dispatch(getFailed("Failed to create appointment delivery"));
    }
  } catch (error) {
    dispatch(
      getError({
        message: error?.response?.data?.message || error.message || "Something went wrong",
      })
    );
  }
};



export const getAllAppointments = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await axios.get(`${BASE_URL}/allappointments`);
    dispatch(setAppointments(res.data));
  } catch (error) {
    console.error('Get Appointments Error:', error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteAppointment = (id) => async (dispatch) => {
  try {
    await axios.delete(`${BASE_URL}/deleteappointment/${id}`);
    dispatch(getAllAppointments());
  } catch (error) {
    console.error('Delete Appointment Error:', error);
  }
};   


export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await axios.get(`${BASE_URL}/allorders`);
    dispatch(setOrders(res.data));
    dispatch(setLoading(false));
  } catch (error) {
    console.error("Get Orders Error:", error);
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};
