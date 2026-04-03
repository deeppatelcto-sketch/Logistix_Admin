// import axios from "axios";
// import {
//   request,
//   success,
//   failure,
//   created
// } from "./pickupPointSlice";

// // GET all
// export const getAllPickupPoints = () => async (dispatch) => {
//   dispatch(request());
//   try {
//     const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/allpickup`);
//     dispatch(success(data));
//   } catch (err) {
//     dispatch(failure(err.response?.data?.error || "Something went wrong"));
//   }
// };

// // POST
// export const createPickupPoint = (formData) => async (dispatch) => {
//   dispatch(request());
//   try {
//     await axios.post(`${process.env.REACT_APP_BASE_URL}/createpickup`, formData);
//     dispatch(created());
//     dispatch(getAllPickupPoints());
//   } catch (err) {
//     dispatch(failure(err.response?.data?.error || "Failed to create"));
//   }
// };


// 🔁 Updated Actions
import axios from "axios";
import {
  request,
  success,
  failure,
  created,
 toggled ,

} from "./pickupPointSlice";



const authHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// GET all
export const getAllPickupPoints = () => async (dispatch) => { 
  dispatch(request());
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/allpickuppoints`);
    dispatch(success(data));
  } catch (err) {
    dispatch(failure(err.response?.data?.error || "Something went wrong"));     
  }
};

// POST - Create
export const createPickupPoint = (formData) => async (dispatch) => {
  dispatch(request());
  try {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/createpickuppointAdmin`, formData,  authHeader());   
    dispatch(created());
    dispatch(getAllPickupPoints());
  } catch (err) {
    dispatch(failure(err.response?.data?.error || "Failed to create"));
  }
};



// PUT - Update
export const updatePickupPoint = (id, updatedData) => async (dispatch) => {     
  dispatch(request());
  try {
    await axios.put(`${process.env.REACT_APP_BASE_URL}/updatepoint/${id}`, updatedData);
    dispatch(getAllPickupPoints());
  } catch (err) {
    dispatch(failure(err.response?.data?.error || "Failed to update"));
  }
};

// DELETE - Delete
export const deletePickupPoint = (id) => async (dispatch) => {
  dispatch(request());
  try {
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/deletepickuppoint/${id}`);
    dispatch(getAllPickupPoints());
  } catch (err) {
    dispatch(failure(err.response?.data?.error || "Failed to delete"));
  }
};

// PATCH - Toggle status
export const togglePickupPointStatus = (id) => async (dispatch) => {
  dispatch(request());
  try {
    await axios.patch(`${process.env.REACT_APP_BASE_URL}/status/${id}`);     
    dispatch(toggled()); // Optional
    dispatch(getAllPickupPoints());
  } catch (err) {
    dispatch(failure(err.response?.data?.error || "Failed to toggle status"));
  }
};


