import axios from 'axios';
import { invoiceRequest, invoiceSuccess, invoiceFail } from './invoiceSlice';

export const generateCourierInvoices = (from, to) => async (dispatch) => {
  try {
    dispatch(invoiceRequest());

    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/generate-invoices?from=${from}&to=${to}`); //http://localhost:8000/generate-invoices?from=${from}&to=${to}
    dispatch(invoiceSuccess(response.data.invoices));
  } catch (error) {
    dispatch(invoiceFail(
      error.response?.data?.msg || "Failed to generate invoices"
    ));
  }
};
