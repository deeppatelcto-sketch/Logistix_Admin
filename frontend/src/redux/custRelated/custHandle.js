// import axios from "axios";
// import {
//   getRequest,
//   getSuccess,
//   getFailed,
//   getError,
//   updateSuccess,
// } from "./custSlice"; // Assuming you have a custSlice.js

// // 🟢 Get All Customers
// export const getAllCust = (id) => async (dispatch) => {
//   dispatch(getRequest());
//   try {
//     const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/CustList/${id}`);
//     if (result.data.message) {
//       dispatch(getFailed(result.data.message));
//     } else {
//       dispatch(getSuccess(result.data));
//     }
//   } catch (error) {
//     const errorMessage =
//       error.response?.data?.message || error.message || "Something went wrong";
//     dispatch(getError({ message: errorMessage }));
//   }
// };

// // 🟢 Create Customer
// export const createCust = (custData) => async (dispatch) => {
//   dispatch(getRequest());
//   try {
//     const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/CustCreate`, custData);
//     if (result.data) {
//       dispatch(getSuccess(result.data));
//     } else {
//       dispatch(getFailed("Failed to create customer"));
//     }
//   } catch (error) {
//     const errorMessage =
//       error.response?.data?.message || error.message || "Something went wrong";
//     dispatch(getError({ message: errorMessage }));
//   }
// };

// // 🟢 Update Customer
// export const updateCust = (id, updatedData) => async (dispatch) => {
//   dispatch(getRequest());
//   try {
//     const result = await axios.put(`${process.env.REACT_APP_BASE_URL}/Custs/${id}`, updatedData);
//     if (result.data) {
//       dispatch(updateSuccess({ id, updatedData: result.data }));
//     } else {
//       dispatch(getFailed("Failed to update customer"));
//     }
//   } catch (error) {
//     const errorMessage =
//       error.response?.data?.message || error.message || "Something went wrong";
//     dispatch(getError({ message: errorMessage }));
//   }
// };

// // 🟢 Delete a Single Customer
// export const deleteCust = (id) => async (dispatch) => {
//   dispatch(getRequest());
//   try {
//     await axios.delete(`${process.env.REACT_APP_BASE_URL}/Cust/${id}`);
//     dispatch(getSuccess(id));
//   } catch (error) {
//     const errorMessage =
//       error.response?.data?.message || error.message || "Something went wrong";
//     dispatch(getError({ message: errorMessage }));
//   }
// };

// // 🟢 Delete All Customers
// export const deleteAllCust = (id) => async (dispatch) => {
//   dispatch(getRequest());
//   try {
//     await axios.delete(`${process.env.REACT_APP_BASE_URL}/Custs/${id}`);
//     dispatch(getSuccess("All users deleted"));
//   } catch (error) {
//     const errorMessage =
//       error.response?.data?.message || error.message || "Something went wrong";
//     dispatch(getError({ message: errorMessage }));
//   }
// };


import axios from "axios";
import {
  getRequest,
  getSuccess,
  getFailed,
  getError,
  updateSuccess,
} from "./custSlice";

// 🟢 Get All Customers
export const getAllCust = (id) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/CustList/${id}`);
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getSuccess(result.data));
    }
  } catch (error) {
    dispatch(
      getError({
        message: error?.response?.data?.message || error.message || "Something went wrong",
      })
    );
  }
};

// 🟢 Create Customer
// export const createCust = (custData) => async (dispatch) => {
//   dispatch(getRequest());
//   try {
//     const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/CustCreate`, custData);
//     if (result.data) {
//       dispatch(getSuccess(result.data));
//     } else {
//       dispatch(getFailed("Failed to create customer"));
//     }
//   } catch (error) {
//     dispatch(
//       getError({
//         message: error?.response?.data?.message || error.message || "Something went wrong",
//       })
//     );
//   }
// };
export const createCust = (custData) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/CustCreate`, custData);
    if (result.data) {
      dispatch(getSuccess(result.data));  // this can be message or data from backend
    } else {
      dispatch(getFailed("Failed to create customer"));
    }
  } catch (error) {
    dispatch(
      getError({
        message: error?.response?.data?.message || error.message || "Something went wrong",
      })
    );
  }
};


// 🟢 Update Customer
export const updateCust = (id, updatedData) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.put(`${process.env.REACT_APP_BASE_URL}/Custs/${id}`, updatedData);
    if (result.data) {
      dispatch(updateSuccess({ id, updatedData: result.data }));
      return { success: true, data: result.data };
    } else {
      dispatch(getFailed("Failed to update customer"));
      return { success: false, message: "Failed to update customer" };
    }
  } catch (error) {
    const message = error?.response?.data?.message || error.message || "Something went wrong";
    dispatch(getError({ message}));
    return { success: false, message};
  }
};

// 🟢 Delete a Single Customer
export const deleteCust = (id) => async (dispatch) => {
  dispatch(getRequest());
  try {
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/Cust/${id}`);
    dispatch(getSuccess(id));
  } catch (error) {
    dispatch(
      getError({
        message: error?.response?.data?.message || error.message || "Something went wrong",
      })
    );
  }
};

// 🟢 Delete All Customers
export const deleteAllCust = (id) => async (dispatch) => {
  dispatch(getRequest());
  try {
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/Custs/${id}`);
    dispatch(getSuccess("All customers deleted"));
  } catch (error) {
    dispatch(
      getError({
        message: error?.response?.data?.message || error.message || "Something went wrong",
      })
    );
  }
};
