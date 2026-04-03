// import axios from 'axios';
// import { createAsyncThunk } from '@reduxjs/toolkit';

// export const createKYCRequest = createAsyncThunk(
//   'kyc/create',
//   async (formData, { rejectWithValue }) => {
//     try {
//       const res = await axios.post('http://localhost:8000/submit-kyc', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       return res.data.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || 'Failed to create KYC');
//     }
//   }
// );

// export const getAllKYCRequests = createAsyncThunk(
//   'kyc/getAll',
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await axios.get('http://localhost:8000/getallKYC');
//       return res.data.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || 'Failed to fetch KYC');
//     }
//   }
// );

// export const updateKYCStatus = createAsyncThunk(
//   'kyc/updateStatus',
//   async ({ id, status }, { rejectWithValue }) => {
//     try {
//       const res = await axios.patch(`http://localhost:8000/update-status/${id}`, { status });
//       return res.data.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || 'Status update failed');
//     }
//   }
// );



import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';

// ✅ Create KYC
export const createKYCRequest = createAsyncThunk(
  'kyc/create',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/submit-kyc`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create KYC');
    }
  }
);

// ✅ Get All KYC
export const getAllKYCRequests = createAsyncThunk(
  'kyc/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/getallKYC`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch KYC');
    }
  }
);

// ✅ Update KYC Status
export const updateKYCStatus = createAsyncThunk(
  'kyc/updateStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${BASE_URL}/update-status/${id}`, { status });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Status update failed');
    }
  }
);

// ✅ Delete KYC Request
export const deleteKYCRequest = createAsyncThunk(
  'kyc/delete',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${BASE_URL}/kyc/${id}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete KYC');
    }
  }
);
