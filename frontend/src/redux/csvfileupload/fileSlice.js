import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';

export const fetchFiles = createAsyncThunk('files/fetch', async () => {
  const res = await axios.get(`${BASE_URL}/files`);
  return res.data;
});

export const uploadFile = createAsyncThunk('files/upload', async (formData) => {
  const res = await axios.post(`${BASE_URL}/files/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data.file;
});

const fileSlice = createSlice({
  name: 'files',
  initialState: { list: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  }
});

export default fileSlice.reducer;
