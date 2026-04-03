import axios from "axios";
import {
  requestStart,
  requestSuccess,
  requestFailure,
  setAllExtraWeights,
} from "./reconciliationSlice";

// POST: Calculate Extra Charge
export const calculateExtraCharge = (orderId, extraWeightKg) => async (dispatch) => {
  dispatch(requestStart());
  try {
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/weight`, {
      orderId,
      extraWeightKg,
    });
    dispatch(requestSuccess(res.data));
  } catch (error) {
    dispatch(requestFailure(error.response?.data?.message || "Calculation failed"));
  }
};

// GET: Fetch All Reconciliations
export const fetchAllExtraWeights = () => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/reconciliation/list`);
    dispatch(setAllExtraWeights(res.data));
  } catch (error) {
    console.error("Failed to fetch extra weights");
  }
};

// ✅ DELETE: Delete Reconciliation by Order ID
export const deleteExtraWeightByOrderId = (orderId) => async (dispatch) => {
  dispatch(requestStart());
  try {
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/reconciliation/${orderId}`);
    const result = await dispatch(fetchAllExtraWeights()); // return this promise
    dispatch(requestSuccess("Deleted successfully"));
    return result;
  } catch (error) {
    dispatch(requestFailure(error.response?.data?.message || "Delete failed"));
    throw error; // re-throw so .catch() works in component
  }
};

