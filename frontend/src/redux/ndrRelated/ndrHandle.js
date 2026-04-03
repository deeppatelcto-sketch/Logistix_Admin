import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';

export const createNDREntry = createAsyncThunk(
  'ndr/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/createNDRException`, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getAllNDREntries = createAsyncThunk(
  'ndr/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/getallNDR`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateNDRAction = createAsyncThunk(
  'ndr/update',
  async ({ id, update }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/updateNDR/${id}`, update);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteNDREntry = createAsyncThunk(
  'ndr/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/deleteNDR/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);   
