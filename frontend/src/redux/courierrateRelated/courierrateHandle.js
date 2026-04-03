

import axios from "axios";
import {
  getRequest,
  getSuccess,
  getFailed,
  getError,
  updateSuccess,
  createSuccess,
} from "./courierrateSlice";

// 🟢 Get All Courier Rates
export const getAllCourierRates = () => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/CourierRateList`
    );
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getSuccess(result.data));
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";
    dispatch(getError({ message: errorMessage }));
  }
};

// 🟢 Create Courier Rate
export const createCourierRate = (formData) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/CourierRateCreate`,
      formData
    );

    if (result.data) {
      dispatch(createSuccess(result.data)); // ✅ use createSuccess for POST result
      return result.data; // ✅ for chaining .then in UI
    } else {
      dispatch(getFailed("Failed to create courier rate"));
      return null;
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";
    dispatch(getError({ message: errorMessage }));
    throw error;
  }
};

// 🟢 Update Courier Rate
// export const updateCourierRate = (id, formData) => async (dispatch) => {
//   dispatch(getRequest());
//   try {
//     const result = await axios.put(
//       `${process.env.REACT_APP_BASE_URL}/CourierRate/${id}`,
//       formData
//     );
//     if (result.data) {
//       dispatch(updateSuccess({ id, updatedData: result.data }));
//     } else {
//       dispatch(getFailed("Failed to update courier rate"));
//     }
//   } catch (error) {
//     const errorMessage =
//       error.response?.data?.message || error.message || "Something went wrong";
//     dispatch(getError({ message: errorMessage }));
//   }
// };

export const updateCourierRate = (id, formData) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/CourierRate/${id}`,
      formData,  // pass the FormData here
      {
        headers: {
          "Content-Type": "multipart/form-data",  // ensure proper content type
        },
      }
    );

    if (result.data) {
      dispatch(updateSuccess({ id, updatedData: result.data }));
    } else {
      dispatch(getFailed("Failed to update courier rate"));
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";
    dispatch(getError({ message: errorMessage }));
  }
};



// 🟢 Delete Courier Rate
export const deleteCourierRate = (id) => async (dispatch) => {
  dispatch(getRequest());
  try {
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/CourierRate/${id}`);
    dispatch(getSuccess(id));
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";
    dispatch(getError({ message: errorMessage }));
  }
};

// 🟢 Upload Courier Rates via CSV
export const uploadCourierRatesCSV = (formData) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/UploadCourierRatesCSV`,
      formData,
      config
    );

    if (response.data) {
      dispatch(getSuccess(response.data));
    } else {
      dispatch(getFailed("CSV upload failed"));
    }

    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong during CSV upload";
    dispatch(getError({ message: errorMessage }));
  }
};
