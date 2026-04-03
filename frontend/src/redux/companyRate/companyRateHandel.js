import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_URL || "http://localhost:8000";

// Upload company + CSV
export const uploadCompanyRate = createAsyncThunk(
  "companyRate/upload",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/uploadb2b`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Get all companies
export const fetchCompanies = createAsyncThunk(
  "companyRate/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/allb2brate`);
      return res.data.companies;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// View rates for a company
export const fetchRates = createAsyncThunk(
  "companyRate/fetchRates",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/view/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);


