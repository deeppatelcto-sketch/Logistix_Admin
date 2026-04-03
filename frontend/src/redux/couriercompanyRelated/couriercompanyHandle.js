
// import axios from "axios";
// import {
//   getRequest,
//   getSuccess,
//   getFailed,
//   getError,
//   updateSuccess,
// } from "./couriercompanySlice";

// // 🟢 Get All Courier Companies
// export const getAllCourierCompanies = (id) => async (dispatch) => {
//   dispatch(getRequest());
//   try {
//     const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/CourierCompanyList`);
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

// // 🟢 Create Courier Company (with file upload)
// // Update createCourierCompany to return errors to component
// export const createCourierCompany = (formData) => async (dispatch) => {
//   dispatch(getRequest());
//   try {
//     const result = await axios.post(
//       `${process.env.REACT_APP_BASE_URL}/CourierCompanyCreate`,
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
//     dispatch(getSuccess(result.data));
//     return { success: true };
//   } catch (error) {
//     const message = error.response?.data?.message;
//     const formatted = Array.isArray(message) ? message : [message || "Something went wrong"];
//     dispatch(getError({ message: formatted.join(', ') }));
//     return { success: false, errors: formatted };
//   }
// };


// // 🟢 Update Courier Company (with file upload)

// export const updateCourierCompany = (id, formData) => async (dispatch) => {
//   dispatch(getRequest());
//   try {
//     const result = await axios.put(
//       `${process.env.REACT_APP_BASE_URL}/CourierCompany/${id}`,
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );

//     if (result.data && result.data.success) {
//       dispatch(updateSuccess({ id, updatedData: result.data.data }));
//       return { success: true };
//     } else {
//       dispatch(getFailed("Failed to update courier company"));
//       return { success: false, errors: { general: "Failed to update courier company" } };
//     }
//   } catch (error) {
//     const validationErrors = error.response?.data?.errors || null;

//     if (validationErrors && typeof validationErrors === 'object' && !Array.isArray(validationErrors)) {
//       // Errors object { fieldName: errorMessage }
//       dispatch(getFailed(validationErrors));
//       return { success: false, errors: validationErrors };
//     } else if (Array.isArray(validationErrors)) {
//       // Errors as array fallback
//       const generalErrors = validationErrors.join(", ");
//       dispatch(getFailed({ general: generalErrors }));
//       return { success: false, errors: { general: generalErrors } };
//     } else {
//       const message = error.response?.data?.message || error.message || "Something went wrong";
//       dispatch(getFailed(message));
//       return { success: false, errors: { general: message } };
//     }
//   }
// };


// // 🟢 Delete Single Courier Company
// export const deleteCourierCompany = (id) => async (dispatch) => {
//   dispatch(getRequest());
//   try {
//     await axios.delete(`${process.env.REACT_APP_BASE_URL}/CourierCompany/${id}`);
//     dispatch(getSuccess(id));
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
  createSuccess,
  deleteSuccess,
} from "./couriercompanySlice";

// 🟢 Get All Courier Companies
export const getAllCourierCompanies = () => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/CourierCompanyList`);
    dispatch(getSuccess(result.data));
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";
    dispatch(getError({ message: errorMessage }));
  }
};

// 🟢 Create Courier Company (with file upload)
export const createCourierCompany = (formData) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/CourierCompanyCreate`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch(createSuccess(result.data));
    return { success: true };
  } catch (error) {
    const validationErrors = error.response?.data?.errors || null;

    if (validationErrors && typeof validationErrors === "object" && !Array.isArray(validationErrors)) {
      dispatch(getFailed(validationErrors));
      return { success: false, errors: validationErrors };
    }

    const message = error.response?.data?.message || error.message || "Something went wrong";
    dispatch(getError({ message }));
    return { success: false, errors: { general: message } };
  }
};

// 🟢 Update Courier Company (with file upload)
export const updateCourierCompany = (id, formData) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/CourierCompany/update/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (result.data && result.data.success) {
      dispatch(updateSuccess({ id, updatedData: result.data.data }));
      return { success: true };
    } else {
      dispatch(getFailed({ general: "Failed to update courier company" }));
      return { success: false, errors: { general: "Failed to update courier company" } };
    }
  } catch (error) {
    const validationErrors = error.response?.data?.errors || null;

    if (validationErrors && typeof validationErrors === "object" && !Array.isArray(validationErrors)) {
      dispatch(getFailed(validationErrors));
      return { success: false, errors: validationErrors };
    } else if (Array.isArray(validationErrors)) {
      const generalErrors = validationErrors.join(", ");
      dispatch(getFailed({ general: generalErrors }));
      return { success: false, errors: { general: generalErrors } };
    } else {
      const message = error.response?.data?.message || error.message || "Something went wrong";
      dispatch(getFailed({ general: message }));
      return { success: false, errors: { general: message } };
    }
  }
};

// 🟢 Delete Single Courier Company
export const deleteCourierCompany = (id) => async (dispatch) => {
  dispatch(getRequest());
  try {
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/CourierCompany/${id}`);
    dispatch(deleteSuccess(id));
        return { type: 'cust/deleteSuccess' }; // ensure return type

  } catch (error) {
    const errorMessage =  
      error.response?.data?.message || error.message || "Something went wrong";
    dispatch(getError({ message: errorMessage }));
  }
};
