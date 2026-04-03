// import axios from "axios";
// import {
//   setTickets,
//   setCustomers,
//   setCouriers,
//   setLoading,
// } from "./supportSlice";

// const API = process.env.REACT_APP_BASE_URL || "http://localhost:8000";

// // ✅ Create Support Ticket
// export const createSupportTicket = (formData) => async (dispatch) => {
//   dispatch(setLoading(true));
//   try {
//     await axios.post(`${API}/create`, formData);
//     dispatch(fetchAllTickets());
//   } catch (error) {
//     console.error("Create Ticket Error:", error);
//   } finally {
//     dispatch(setLoading(false));
//   }
// };

// // ✅ Fetch All Tickets
// export const fetchAllTickets = () => async (dispatch) => {
//   try {
//     const res = await axios.get(`${API}/all`);
//     dispatch(setTickets(res.data));
//   } catch (error) {
//     console.error("Fetch Tickets Error:", error);
//   }
// };

// // ✅ Delete Ticket
// export const deleteTicket = (ticketId) => async (dispatch) => {
//   try {
//     await axios.delete(`${API}/${ticketId}`);
//     dispatch(fetchAllTickets());
//   } catch (error) {
//     console.error("Delete Ticket Error:", error);
//   }
// };

// // ✅ Reply to Ticket (Fix: changed from PUT → POST)
// export const replyToTicket = (ticketId, formData) => async (dispatch) => {
//   try {
//     await axios.post(`${API}/reply/${ticketId}`, formData); // ✅ Fix here
//     dispatch(fetchAllTickets());
//   } catch (error) {
//     console.error("Reply Ticket Error:", error);
//   }
// };

// // ✅ Change Ticket Status (Fix: Corrected URL path)
// export const changeTicketStatus = (ticketId, status) => async (dispatch) => {
//   try {
//     await axios.patch(`${API}/status/${ticketId}`, { status }); // ✅ Keep status exact
//     dispatch(fetchAllTickets());
//   } catch (error) {
//     console.error("Change Status Error:", error);
//   }
// };

// // ✅ Get Customers (assumes you have a route like /CustList/:id)
// export const getAllCustomers = (id) => async (dispatch) => {
//   try {
//     const res = await axios.get(`${API}/CustList/${id}`);
//     dispatch(setCustomers(res.data));
//   } catch (error) {
//     console.error("Get Customers Error:", error);
//   }
// };

// // ✅ Get Couriers
// export const getAllCourierCompanies = () => async (dispatch) => {
//   try {
//     const res = await axios.get(`${API}/CourierCompanyList`);
//     dispatch(setCouriers(res.data));
//   } catch (error) {
//     console.error("Get Couriers Error:", error);
//   }
// };



// src/redux/supportTicketRelated/supportHandle.js
import axios from "axios";
import {
  setTickets,
  setCustomers,
  setCouriers,
  setLoading,
} from "./supportSlice";

const API = process.env.REACT_APP_BASE_URL || "http://localhost:8000";

// ✅ Create Support Ticket
export const createSupportTicket = (formData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await axios.post(`${API}/create`, formData); // Matches: POST /create
    dispatch(fetchAllTickets());
  } catch (error) {
    console.error("Create Ticket Error:", error);
  } finally {
    dispatch(setLoading(false));
  }
};

// ✅ Fetch All Tickets
export const fetchAllTickets = () => async (dispatch) => {
  try {
    const res = await axios.get(`${API}/all`); // Matches: GET /all
    dispatch(setTickets(res.data));
  } catch (error) {
    console.error("Fetch Tickets Error:", error);
  }
};

// ✅ Delete Ticket
export const deleteTicket = (ticketId) => async (dispatch) => {
  try {
    await axios.delete(`${API}/deleteticket/${ticketId}`);
    dispatch(fetchAllTickets()); // Optionally re-fetch all tickets
  } catch (error) {
    console.error("Delete Ticket Error:", error.response?.data || error.message);
  }
};


// ✅ Reply to Ticket
export const replyToTicket = (ticketId, formData) => async (dispatch) => {
  try {
    await axios.post(`${API}/reply/${ticketId}`, formData); // Matches: POST /reply/:ticketId
    dispatch(fetchAllTickets());
  } catch (error) {
    console.error("Reply Ticket Error:", error);
  }
};

// ✅ Change Ticket Status (was incorrect before)
export const changeTicketStatus = (ticketId, status) => async (dispatch) => {
  try {
    await axios.patch(`${API}/status/support/${ticketId}`, { status }); // Matches: PATCH /status/:ticketId
    dispatch(fetchAllTickets());
  } catch (error) {
    console.error("Change Status Error:", error);
  }
};

// ✅ Get Customers
export const getAllCustomers = () => async (dispatch) => {
  try {
    const res = await axios.get(`${API}/CustList`); // Matches: GET /CustList
    dispatch(setCustomers(res.data));
  } catch (error) {
    console.error("Get Customers Error:", error);
  }
};

// ✅ Get Couriers
export const getAllCourierCompanies = () => async (dispatch) => {
  try {
    const res = await axios.get(`${API}/CourierCompanyList`); // Matches: GET /CourierCompanyList
    dispatch(setCouriers(res.data));
  } catch (error) {
    console.error("Get Couriers Error:", error);
  }
};





