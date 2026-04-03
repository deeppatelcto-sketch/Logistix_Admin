import axios from 'axios';
import { setLoading, setRates, setError } from './rateCalculatorSlice';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';

export const calculateRates = (formData) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const res = await axios.post(`${BASE_URL}/calculate-rates`, formData);
    dispatch(setRates(res.data));
  } catch (error) {
    dispatch(setError(error?.response?.data?.message || 'Failed to calculate rates'));
  }
};


