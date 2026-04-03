import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courierCompanies: [],
  loading: false,
  error: null,
  response: null,
};

const couriercompanySlice = createSlice({
  name: "couriercompany",
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.response = null;
    },
    getSuccess: (state, action) => {
      state.courierCompanies = action.payload;
      state.loading = false;
      state.error = null;
      state.response = null;
    },
    getFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload || { general: "Request failed" };
      state.response = null;
    },
    getError: (state, action) => {
      state.loading = false;
      state.error = { general: action.payload?.message || "An error occurred" };
      state.response = null;
    },
    createSuccess: (state, action) => {
      state.courierCompanies.unshift(action.payload.data);
      state.loading = false;
      state.error = null;
      state.response = action.payload.message || "Courier company created successfully!";
    },
    updateSuccess: (state, action) => {
      const updatedCompany = action.payload.updatedData;
      state.courierCompanies = state.courierCompanies.map((company) =>
        company._id === updatedCompany._id ? updatedCompany : company
      );
      state.response = "Courier company updated successfully!";
      state.loading = false;
      state.error = null;
    },
    deleteSuccess: (state, action) => {
      state.courierCompanies = state.courierCompanies.filter(
        (company) => company._id !== action.payload
      );
      state.loading = false;
      state.response = "Courier company deleted successfully!";
      state.error = null;
    },
  },
});

export const {
  getRequest,
  getSuccess,
  getFailed,
  getError,
  createSuccess,
  updateSuccess,
  deleteSuccess,
} = couriercompanySlice.actions;

export const couriercompanyReducer = couriercompanySlice.reducer;

// **Selector `underControl` that returns loading and error state for component use**
export const underControl = (state) => ({
  loading: state.couriercompany.loading,
  error: state.couriercompany.error,
});

