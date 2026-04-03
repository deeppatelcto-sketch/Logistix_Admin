import axios from 'axios';
import {
    authRequest,
    stuffAdded,
    authSuccess,
    authFailed,
    authError,
    authLogout,
    doneSuccess,
    getDeleteSuccess,
    getRequest,
    getFailed,
    getError,
} from './userSlice';
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';
export const loginUser = (fields, role) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axios.post(`${REACT_APP_BASE_URL}/${role}Login`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data && result.data._id) {
            // Successful login — ensure role is always set
            const userData = { ...result.data, role: result.data.role || role };
            dispatch(authSuccess(userData));
        } else if (result.data && result.data.message) {
            dispatch(authFailed(result.data.message));
        } else {
            dispatch(authFailed("Login failed. Please try again."));
        }
    } catch (error) {
        const errorMessage =
          error.response?.data?.message || error.message || "Something went wrong";
        dispatch(authFailed(errorMessage));
    }
};

export const registerUser = (fields, role) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axios.post(`${REACT_APP_BASE_URL}/${role}Reg`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data.schoolName) {
            dispatch(authSuccess(result.data));
        }
        else if (result.data.school) {
            dispatch(stuffAdded());
        }
        else {
            dispatch(authFailed(result.data.message));
        }
    } catch (error) {
        const errorMessage =
          error.response?.data?.message || error.message || "Something went wrong";
        dispatch(getError({ message: errorMessage }));
      }
};

export const logoutUser = () => (dispatch) => {
    dispatch(authLogout());
};

export const getUserDetails = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${REACT_APP_BASE_URL}/${address}/${id}`);
        if (result.data) {
            dispatch(doneSuccess(result.data));
        }
    } catch (error) {
        const errorMessage =
          error.response?.data?.message || error.message || "Something went wrong";
        dispatch(getError({ message: errorMessage }));
      }
}

export const deleteUser = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.delete(`${REACT_APP_BASE_URL}/${address}/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getDeleteSuccess());
        }
    } catch (error) {
        const errorMessage =
          error.response?.data?.message || error.message || "Something went wrong";
        dispatch(getError({ message: errorMessage }));
      }
}


// export const updateUser = (fields, id, address) => async (dispatch) => {
//     dispatch(getRequest());

//     try {
//         const result = await axios.put(`${REACT_APP_BASE_URL}/${address}/${id}`, fields, {
//             headers: { 'Content-Type': 'application/json' },
//         });

//         if (result.data) {
//             dispatch(authSuccess(result.data)); // Update Redux state
//             localStorage.setItem('user', JSON.stringify(result.data)); // Update localStorage
//         }
//     } catch (error) {
//         const errorMessage =
//           error.response?.data?.message || error.message || "Something went wrong";
//         dispatch(getError({ message: errorMessage }));
//       }
// };


// export const addStuff = (fields, address) => async (dispatch) => {
//     dispatch(authRequest());

//     try {
//         const result = await axios.post(`${REACT_APP_BASE_URL}/${address}Create`, fields, {
//             headers: { 'Content-Type': 'application/json' },
//         });

//         if (result.data.message) {
//             dispatch(authFailed(result.data.message));
//         } else {
//             dispatch(stuffAdded(result.data));
//         }
//     } catch (error) {
//         const errorMessage =
//           error.response?.data?.message || error.message || "Something went wrong";
//         dispatch(getError({ message: errorMessage }));
//       }
// };
export const updateUser = (fields, id, address) => async (dispatch) => {
    dispatch(authRequest()); // Same action used for consistency

    try {
        const result = await axios.put(`${REACT_APP_BASE_URL}/${address}/${id}`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });

        // If backend sends a message (usually means error), dispatch it
        if (result.data.message) {
            dispatch(authFailed(result.data.message));
        } else {
            dispatch(stuffAdded(result.data)); // Just like addStuff
        }          
    } catch (error) {
  const errorMessage = error.response?.data?.message || error.message || "Something went wrong";
  dispatch(authError(errorMessage)); // string only
}
};



export const addStuff = (fields, address) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axios.post(`${REACT_APP_BASE_URL}/${address}Create`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });

        // Agar backend se error message aaya to failed dispatch karo
        if (result.data.message) {
            dispatch(authFailed(result.data.message));
        } else {
            dispatch(stuffAdded(result.data));
        }
    } catch (error) {
  const errorMessage = error.response?.data?.message || error.message || "Something went wrong";
  dispatch(authError(errorMessage)); // string only
}
};
