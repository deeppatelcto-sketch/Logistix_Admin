
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  noticesList: [],
  loading: false,
  error: null, // Store only serializable error messages
  response: null,
};

const noticeSlice = createSlice({
  name: "notice",
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true;
    },
    getSuccess: (state, action) => {
      state.noticesList = action.payload;
      state.loading = false;
      state.error = null;
      state.response = null;
    },
    getFailed: (state, action) => {
      state.response = action.payload;
      state.loading = false;
      state.error = null;
    },
    getError: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "An error occurred"; // Just the error message
    },
    updateSuccess: (state, action) => {
      const updatedNotice = action.payload.updatedData;
      state.noticesList = state.noticesList.map((notice) =>
        notice._id === updatedNotice._id ? updatedNotice : notice
      );
      state.response = "Notice updated successfully!";
      state.loading = false;
      state.error = null;
    },
  },
});

export const { getRequest, getSuccess, getFailed, getError, updateSuccess } = noticeSlice.actions;
export const noticeReducer = noticeSlice.reducer;

