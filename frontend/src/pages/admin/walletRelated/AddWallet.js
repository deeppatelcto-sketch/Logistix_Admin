// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { clearError } from "../../../redux/walletRelated/walletSlice";
// import {
//   rechargeWallet,
//   debitWallet,
//   refundWallet,
//   getWalletDetails,
// } from "../../../redux/walletRelated/walletHandel";
// import { getAllCust } from "../../../redux/custRelated/custHandle";
// import { getAllCourierCompanies } from "../../../redux/couriercompanyRelated/couriercompanyHandle";
// import { Autocomplete, TextField } from "@mui/material";

// const WalletRecharge = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { custList } = useSelector((state) => state.cust);
//   const { courierCompanies } = useSelector((state) => state.couriercompany);
//   const { balance, loading, error } = useSelector((state) => state.wallet);

//   const [userType, setUserType] = useState("");
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [amount, setAmount] = useState("");
//   const [description, setDescription] = useState("");
//   const [actionType, setActionType] = useState("Recharge");
//   const [successMsg, setSuccessMsg] = useState("");
//   const [fieldErrors, setFieldErrors] = useState({});

//   useEffect(() => {
//     dispatch(getAllCust());
//     dispatch(getAllCourierCompanies());
//   }, [dispatch]);

//   useEffect(() => {
//     if (selectedUser) {
//       dispatch(getWalletDetails(selectedUser));
//     }
//   }, [selectedUser, dispatch]);

//   const validate = () => {
//     const errors = {};
//     if (!userType) errors.userType = "User type is required";
//     if (!selectedUser) errors.selectedUser = "User selection is required";
//     if (!amount || isNaN(amount) || Number(amount) <= 0) errors.amount = "Enter a valid amount";
//     setFieldErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     const payload = {
//       userId: selectedUser.userId,
//       userModel: selectedUser.userModel,
//       amount: Number(amount),
//       description: description || `${actionType} via admin panel`,
//     };

//     try {
//       if (actionType === "Recharge") {
//         await dispatch(rechargeWallet(payload));
//         setSuccessMsg("✅ Wallet Recharged Successfully");
//       } else if (actionType === "Debit") {
//         await dispatch(debitWallet(payload));
//         setSuccessMsg("✅ Wallet Debited Successfully");
//       } else if (actionType === "Refund") {
//         await dispatch(refundWallet(payload));
//         setSuccessMsg("✅ Wallet Refunded Successfully");
//       }

//       setAmount("");
//       setDescription("");
//       setFieldErrors({});

//       setTimeout(() => {
//         setSuccessMsg("");
//         navigate("/Admin/walletsHistory");
//       }, 2000);
//     } catch (error) {
//       console.error("Transaction failed:", error);
//     }
//   };

//   const getAutocompleteOptions = () => {
//     if (userType === "Customer") {
//       return custList.map((cust) => ({
//         label: `${cust.firstName || ""} ${cust.lastName || ""} (${cust.phoneNumber || "N/A"})`,
//         userId: cust._id,
//         userModel: "Customer",
//       }));
//     } else if (userType === "CourierCompany") {
//       return courierCompanies.map((cc) => ({
//         label: cc.companyName || cc.name,
//         userId: cc._id,
//         userModel: "CourierCompany",
//       }));
//     }
//     return [];
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.heading}>💼 Wallet Manager</h2>

//       <select
//         onChange={(e) => setActionType(e.target.value)}
//         disabled={loading}
//         value={actionType}
//         style={styles.select}
//       >
//         <option value="Recharge">Recharge Wallet</option>
//         <option value="Debit">Debit Wallet</option>
//         <option value="Refund">Refund Wallet</option>
//       </select>

//       <select
//         onChange={(e) => {
//           setUserType(e.target.value);
//           setSelectedUser(null);
//           setFieldErrors((prev) => ({ ...prev, userType: "" }));
//         }}
//         disabled={loading}
//         value={userType}
//         style={styles.select}
//       >
//         <option value="">-- Select User Type --</option>
//         <option value="Customer">Customer</option>
//         <option value="CourierCompany">Courier Company</option>
//       </select>
//       {fieldErrors.userType && (
//         <p style={styles.errorInline}>{fieldErrors.userType}</p>
//       )}

//       {userType && (
//         <>
//           <label
//             style={{
//               fontWeight: 500,
//               fontSize: 14,
//               marginBottom: 6,
//               display: "block",
//               color: "#333",
//             }}
//           >
//             Select {userType}
//           </label>
//           <Autocomplete
//             options={getAutocompleteOptions()}
//             getOptionLabel={(option) => option.label}
//             onChange={(_, value) => {
//               setSelectedUser(value ? { userId: value.userId, userModel: value.userModel } : null);
//               setFieldErrors((prev) => ({ ...prev, selectedUser: "" }));
//             }}
//             value={
//               selectedUser
//                 ? getAutocompleteOptions().find(
//                     (item) => item.userId === selectedUser.userId
//                   ) || null
//                 : null
//             }
//             isOptionEqualToValue={(option, value) => option.userId === value.userId}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 variant="outlined"
//                 fullWidth
//                 error={!!fieldErrors.selectedUser}
//                 helperText={fieldErrors.selectedUser}
//               />
//             )}
//             disabled={loading}
//             style={{ marginBottom: 16 }}
//           />
//         </>
//       )}

//       <p style={styles.balance}>
//         <strong>Current Wallet Balance:</strong>{" "}
//         <span style={{ color: "#2e7d32" }}>
//           ₹{balance?.toFixed(2) ?? "0.00"}
//         </span>
//       </p>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="number"
//           placeholder="Enter amount"
//           value={amount}
//           onChange={(e) => {
//             setAmount(e.target.value);
//             setFieldErrors((prev) => ({ ...prev, amount: "" }));
//           }}
//           disabled={loading}
//           min={1}
//           style={styles.input}
//         />
//         {fieldErrors.amount && (
//           <p style={styles.errorInline}>{fieldErrors.amount}</p>
//         )}

//         <input
//           type="text"
//           placeholder="Description (optional)"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           disabled={loading}
//           style={styles.input}
//         />
//         <button type="submit" disabled={loading} style={styles.button}>
//           {loading ? "Processing..." : actionType}
//         </button>
//       </form>

//       {successMsg && (
//         <p style={styles.success}>
//           {successMsg}
//         </p>
//       )}

//       {error && (
//         <p style={styles.error}>
//           ⚠️ {error}
//           <button
//             onClick={() => dispatch(clearError())}
//             style={styles.clearButton}
//           >
//             ✖
//           </button>
//         </p>
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: 500,
//     margin: "40px auto",
//     padding: 24,
//     backgroundColor: "#ffffff",
//     borderRadius: 12,
//     boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
//     fontFamily: "'Segoe UI', sans-serif",
//   },
//   heading: {
//     fontSize: 24,
//     marginBottom: 20,
//     color: "#333",
//     textAlign: "center",
//     fontWeight: "600",
//   },
//   select: {
//     width: "100%",
//     padding: 10,
//     marginBottom: 16,
//     borderRadius: 6,
//     border: "1px solid #ccc",
//     fontSize: 15,
//     backgroundColor: "#fff",
//   },
//   input: {
//     width: "100%",
//     padding: 10,
//     marginBottom: 8,
//     borderRadius: 6,
//     border: "1px solid #ccc",
//     fontSize: 15,
//   },
//   button: {
//     width: "100%",
//     padding: 12,
//     backgroundColor: "#1976d2",
//     color: "#fff",
//     border: "none",
//     borderRadius: 6,
//     cursor: "pointer",
//     fontSize: 16,
//     fontWeight: "600",
//     transition: "background-color 0.3s",
//   },
//   balance: {
//     marginBottom: 16,
//     fontSize: 16,
//     color: "#333",
//     fontWeight: "500",
//   },
//   error: {
//     color: "#d32f2f",
//     marginTop: 12,
//     fontSize: 14,
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "#fff3f3",
//     padding: 10,
//     borderRadius: 4,
//     border: "1px solid #f5c6cb",
//   },
//   errorInline: {
//     color: "#d32f2f",
//     fontSize: "13px",
//     marginBottom: "10px",
//     marginTop: "-6px",
//   },
//   clearButton: {
//     background: "none",
//     border: "none",
//     color: "#d32f2f",
//     fontSize: 18,
//     cursor: "pointer",
//     fontWeight: "bold",
//   },
//   success: {
//     backgroundColor: "#2e7d32",
//     color: "#fff",
//     padding: "12px",
//     borderRadius: "6px",
//     marginTop: "16px",
//     textAlign: "center",
//     fontSize: "15px",
//     fontWeight: "500",
//     transition: "all 0.3s ease",
//   },
// };

// export default WalletRecharge;



// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { clearError } from "../../../redux/walletRelated/walletSlice";
// import {
//   rechargeWallet,
//   debitWallet,
//   refundWallet,
//   getWalletDetails,
// } from "../../../redux/walletRelated/walletHandel";
// import { getAllCust } from "../../../redux/custRelated/custHandle";
// import { getAllCourierCompanies } from "../../../redux/couriercompanyRelated/couriercompanyHandle";
// import { Autocomplete, TextField } from "@mui/material";

// const WalletRecharge = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { custList } = useSelector((state) => state.cust);
//   const { courierCompanies } = useSelector((state) => state.couriercompany);
//   const { balance, loading, error } = useSelector((state) => state.wallet);

//   const [userType, setUserType] = useState("");
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [amount, setAmount] = useState("");
//   const [description, setDescription] = useState("");
//   const [actionType, setActionType] = useState("Recharge");
//   const [successMsg, setSuccessMsg] = useState("");
//   const [fieldErrors, setFieldErrors] = useState({});

//   useEffect(() => {
//     dispatch(getAllCust());
//     dispatch(getAllCourierCompanies());
//   }, [dispatch]);

//   // Whenever selected user changes, fetch their wallet
//   useEffect(() => {
//     if (selectedUser) {
//       dispatch(
//         getWalletDetails({
//           userId: selectedUser.userId,
//           userModel: selectedUser.userModel,
//         })
//       );
//     }
//   }, [selectedUser, dispatch]);

//   const validate = () => {
//     const errors = {};
//     if (!userType) errors.userType = "User type is required";
//     if (!selectedUser) errors.selectedUser = "User selection is required";
//     if (!amount || isNaN(amount) || Number(amount) <= 0)
//       errors.amount = "Enter a valid amount";
//     setFieldErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     const payload = {
//       userId: selectedUser.userId,
//       userModel: selectedUser.userModel,
//       amount: Number(amount),
//       description: description || `${actionType} via admin panel`,
//     };

//     try {
//       if (actionType === "Recharge") {
//         await dispatch(rechargeWallet(payload));
//         setSuccessMsg("✅ Wallet Recharged Successfully");
//       } else if (actionType === "Debit") {
//         await dispatch(debitWallet(payload));
//         setSuccessMsg("✅ Wallet Debited Successfully");
//       } else if (actionType === "Refund") {
//         await dispatch(refundWallet(payload));
//         setSuccessMsg("✅ Wallet Refunded Successfully");
//       }

//       // Clear inputs
//       setAmount("");
//       setDescription("");
//       setFieldErrors({});

//       // After short delay, navigate to history or listing
//       setTimeout(() => {
//         setSuccessMsg("");
//         navigate("/Admin/walletsHistory");
//       }, 2000);
//     } catch (err) {
//       console.error("Transaction failed:", err);
//     }
//   };

//   const getAutocompleteOptions = () => {
//     if (userType === "Customer") {
//       return custList.map((cust) => ({
//         label: `${cust.firstName || ""} ${cust.lastName || ""} (${cust.phoneNumber || ""})`,
//         userId: cust._id,
//         userModel: "Customer",
//       }));
//     } else if (userType === "CourierCompany") {
//       return courierCompanies.map((cc) => ({
//         label: cc.companyName || cc.name || "",
//         userId: cc._id,
//         userModel: "CourierCompany",
//       }));
//     }
//     return [];
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.heading}>💼 Wallet Manager</h2>

//       <select
//         onChange={(e) => setActionType(e.target.value)}
//         disabled={loading}
//         value={actionType}
//         style={styles.select}
//       >
//         <option value="Recharge">Recharge Wallet</option>
//         <option value="Debit">Debit Wallet</option>
//         <option value="Refund">Refund Wallet</option>
//       </select>

//       <select
//         onChange={(e) => {
//           setUserType(e.target.value);
//           setSelectedUser(null);
//           setFieldErrors((prev) => ({ ...prev, userType: "" }));
//         }}
//         disabled={loading}
//         value={userType}
//         style={styles.select}
//       >
//         <option value="">-- Select User Type --</option>
//         <option value="Customer">Customer</option>
//         <option value="CourierCompany">Courier Company</option>
//       </select>
//       {fieldErrors.userType && (
//         <p style={styles.errorInline}>{fieldErrors.userType}</p>
//       )}

//       {userType && (
//         <>
//           <label
//             style={{
//               fontWeight: 500,
//               fontSize: 14,
//               marginBottom: 6,
//               display: "block",
//               color: "#333",
//             }}
//           >
//             Select {userType}
//           </label>
//           <Autocomplete
//             options={getAutocompleteOptions()}
//             getOptionLabel={(option) => option.label}
//             onChange={(_, value) => {
//               if (value) {
//                 setSelectedUser({
//                   userId: value.userId,
//                   userModel: value.userModel,
//                 });
//               } else {
//                 setSelectedUser(null);
//               }
//               setFieldErrors((prev) => ({
//                 ...prev,
//                 selectedUser: "",
//               }));
//             }}
//             value={
//               selectedUser
//                 ? getAutocompleteOptions().find(
//                     (opt) => opt.userId === selectedUser.userId
//                   ) || null
//                 : null
//             }
//             isOptionEqualToValue={(opt, val) => opt.userId === val.userId}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 variant="outlined"
//                 fullWidth
//                 error={!!fieldErrors.selectedUser}
//                 helperText={fieldErrors.selectedUser}
//               />
//             )}
//             disabled={loading}
//             style={{ marginBottom: 16 }}
//           />
//         </>
//       )}

//       <p style={styles.balance}>
//         <strong>Current Wallet Balance:</strong>{" "}
//         <span style={{ color: "#2e7d32" }}>
//           ₹{balance !== undefined ? balance.toFixed(2) : "0.00"}
//         </span>
//       </p>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="number"
//           placeholder="Enter amount"
//           value={amount}
//           onChange={(e) => {
//             setAmount(e.target.value);
//             setFieldErrors((prev) => ({ ...prev, amount: "" }));
//           }}
//           disabled={loading}
//           min={1}
//           style={styles.input}
//         />
//         {fieldErrors.amount && (
//           <p style={styles.errorInline}>{fieldErrors.amount}</p>
//         )}

//         <input
//           type="text"
//           placeholder="Description (optional)"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           disabled={loading}
//           style={styles.input}
//         />
//         <button type="submit" disabled={loading} style={styles.button}>
//           {loading ? "Processing..." : actionType}
//         </button>
//       </form>

//       {successMsg && <p style={styles.success}>{successMsg}</p>}

//       {error && (
//         <p style={styles.error}>
//           ⚠️ {error}
//           <button
//             onClick={() => dispatch(clearError())}
//             style={styles.clearButton}
//           >
//             ✖
//           </button>
//         </p>
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: 500,
//     margin: "40px auto",
//     padding: 24,
//     backgroundColor: "#ffffff",
//     borderRadius: 12,
//     boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
//     fontFamily: "'Segoe UI', sans-serif",
//   },
//   heading: {
//     fontSize: 24,
//     marginBottom: 20,
//     color: "#333",
//     textAlign: "center",
//     fontWeight: "600",
//   },
//   select: {
//     width: "100%",
//     padding: 10,
//     marginBottom: 16,
//     borderRadius: 6,
//     border: "1px solid #ccc",
//     fontSize: 15,
//     backgroundColor: "#fff",
//   },
//   input: {
//     width: "100%",
//     padding: 10,
//     marginBottom: 8,
//     borderRadius: 6,
//     border: "1px solid #ccc",
//     fontSize: 15,
//   },
//   button: {
//     width: "100%",
//     padding: 12,
//     backgroundColor: "#1976d2",
//     color: "#fff",
//     border: "none",
//     borderRadius: 6,
//     cursor: "pointer",
//     fontSize: 16,
//     fontWeight: "600",
//     transition: "background-color 0.3s",
//   },
//   balance: {
//     marginBottom: 16,
//     fontSize: 16,
//     color: "#333",
//     fontWeight: "500",
//   },
//   error: {
//     color: "#d32f2f",
//     marginTop: 12,
//     fontSize: 14,
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "#fff3f3",
//     padding: 10,
//     borderRadius: 4,
//     border: "1px solid #f5c6cb",
//   },
//   errorInline: {
//     color: "#d32f2f",
//     fontSize: "13px",
//     marginBottom: "10px",
//     marginTop: "-6px",
//   },
//   clearButton: {
//     background: "none",
//     border: "none",
//     color: "#d32f2f",
//     fontSize: 18,
//     cursor: "pointer",
//     fontWeight: "bold",
//   },
//   success: {
//     backgroundColor: "#2e7d32",
//     color: "#fff",
//     padding: "12px",
//     borderRadius: "6px",
//     marginTop: "16px",
//     textAlign: "center",
//     fontSize: "15px",
//     fontWeight: "500",
//     transition: "all 0.3s ease",
//   },
// };

// export default WalletRecharge;





import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearError } from "../../../redux/walletRelated/walletSlice";
import {
  rechargeWallet,
  debitWallet,
  refundWallet,
  getWalletDetails,
} from "../../../redux/walletRelated/walletHandel";
import { getAllCust } from "../../../redux/custRelated/custHandle";
import { getAllCourierCompanies } from "../../../redux/couriercompanyRelated/couriercompanyHandle";
import { Autocomplete, TextField } from "@mui/material";

const WalletRecharge = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { custList } = useSelector((state) => state.cust);
  const { courierCompanies } = useSelector((state) => state.couriercompany);
  const { balance, loading, error } = useSelector((state) => state.wallet);

  const [userType, setUserType] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [actionType, setActionType] = useState("Recharge");
  const [successMsg, setSuccessMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    dispatch(getAllCust());
    dispatch(getAllCourierCompanies());
  }, [dispatch]);

  // Whenever selected user changes, fetch their wallet
  useEffect(() => {
    if (selectedUser) {
      dispatch(
        getWalletDetails({
          userId: selectedUser.userId,
          userModel: selectedUser.userModel,
        })
      );
    }
  }, [selectedUser, dispatch]);

  const validate = () => {
    const errors = {};
    if (!userType) errors.userType = "User type is required";
    if (!selectedUser) errors.selectedUser = "User selection is required";
    if (!amount || isNaN(amount) || Number(amount) <= 0)
      errors.amount = "Enter a valid amount";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      userId: selectedUser.userId,
      userModel: selectedUser.userModel,
      amount: Number(amount),
      description: description || `${actionType} via admin panel`,
    };

    try {
      if (actionType === "Recharge") {
        await dispatch(rechargeWallet(payload));
        setSuccessMsg("✅ Wallet Recharged Successfully");
      } else if (actionType === "Debit") {
        await dispatch(debitWallet(payload));
        setSuccessMsg("✅ Wallet Debited Successfully");
      } else if (actionType === "Refund") {
        await dispatch(refundWallet(payload));
        setSuccessMsg("✅ Wallet Refunded Successfully");
      }

      // Clear inputs
      setAmount("");
      setDescription("");
      setFieldErrors({});

      // After short delay, navigate to history or listing
      setTimeout(() => {
        setSuccessMsg("");
        navigate("/Admin/walletsHistory");
      }, 2000);
    } catch (err) {
      console.error("Transaction failed:", err);
    }
  };

  const getAutocompleteOptions = () => {
    if (userType === "Customer") {
      return custList.map((cust) => ({
        label: `${cust.firstName || ""} ${cust.lastName || ""} (${cust.phoneNumber || ""})`,
        userId: cust._id,
        userModel: "Customer",
      }));
    } else if (userType === "CourierCompany") {
      return courierCompanies.map((cc) => ({
        label: cc.companyName || cc.name || "",
        userId: cc._id,
        userModel: "CourierCompany",
      }));
    }
    return [];
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>💼 Wallet Manager</h2>

      {/* ✅ Action Type Dropdown with custom arrow */}
      <select
        onChange={(e) => setActionType(e.target.value)}
        disabled={loading}
        value={actionType}
        style={{ ...styles.select, ...styles.selectArrow }}
      >
        <option value="Recharge">Recharge Wallet</option>  
        <option value="Debit">Debit Wallet</option>
        <option value="Refund">Refund Wallet</option>
      </select>

      {/* ✅ User Type Dropdown with same arrow */}
      <select
        onChange={(e) => {
          setUserType(e.target.value);
          setSelectedUser(null);
          setFieldErrors((prev) => ({ ...prev, userType: "" }));
        }}
        disabled={loading}
        value={userType}
        style={{ ...styles.select, ...styles.selectArrow }}
      >
        <option value="" disabled hidden>Select User Type</option>
        <option value="Customer">Customer</option>
        <option value="CourierCompany">Courier Company</option>
      </select>
      {fieldErrors.userType && (
        <p style={styles.errorInline}>{fieldErrors.userType}</p>
      )}

      {userType && (
        <>
          <label
            style={{
              fontWeight: 500,
              fontSize: 14,
              marginBottom: 6,
              display: "block",
              color: "#333",
            }}
          >
            Select {userType}
          </label>
          <Autocomplete
            options={getAutocompleteOptions()}
            getOptionLabel={(option) => option.label}
            onChange={(_, value) => {
              if (value) {
                setSelectedUser({
                  userId: value.userId,
                  userModel: value.userModel,
                });
              } else {
                setSelectedUser(null);
              }
              setFieldErrors((prev) => ({
                ...prev,
                selectedUser: "",
              }));
            }}
            value={
              selectedUser
                ? getAutocompleteOptions().find(
                    (opt) => opt.userId === selectedUser.userId
                  ) || null
                : null
            }
            isOptionEqualToValue={(opt, val) => opt.userId === val.userId}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                fullWidth
                error={!!fieldErrors.selectedUser}
                helperText={fieldErrors.selectedUser}
              />
            )}
            disabled={loading}
            style={{ marginBottom: 16 }}
          />
        </>
      )}

      <p style={styles.balance}>
        <strong>Current Wallet Balance:</strong>{" "}
        <span style={{ color: "#2e7d32" }}>
          ₹{balance !== undefined ? balance.toFixed(2) : "0.00"}
        </span>
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            setFieldErrors((prev) => ({ ...prev, amount: "" }));
          }}
          disabled={loading}
          min={1}
          style={styles.input}
        />
        {fieldErrors.amount && (
          <p style={styles.errorInline}>{fieldErrors.amount}</p>
        )}

        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
          style={styles.input}
        />
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Processing..." : actionType}
        </button>
      </form>

      {successMsg && <p style={styles.success}>{successMsg}</p>}

      {error && (
        <p style={styles.error}>
          ⚠️ {error}
          <button
            onClick={() => dispatch(clearError())}
            style={styles.clearButton}
          >
            ✖
          </button>
        </p>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 500,
    margin: "40px auto",
    padding: 24,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', sans-serif",
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
    fontWeight: "600",
  },
  select: {
    width: "100%",
    padding: 10,
    marginBottom: 16,
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 15,
    backgroundColor: "#fff",
  },
  /* ✅ Custom dropdown arrow (same style as previous forms) */
  selectArrow: {
    appearance: "none",
    backgroundImage:
      "url(\"data:image/svg+xml;utf8,<svg fill='gray' height='22' width='22' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 12px center",
    backgroundSize: "20px",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 8,
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 15,
  },
  button: {
    width: "100%",
    padding: 12,
    backgroundColor: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 16,
    fontWeight: "600",
    transition: "background-color 0.3s",
  },
  balance: {
    marginBottom: 16,
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  error: {
    color: "#d32f2f",
    marginTop: 12,
    fontSize: 14,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff3f3",
    padding: 10,
    borderRadius: 4,
    border: "1px solid #f5c6cb",
  },
  errorInline: {
    color: "#d32f2f",
    fontSize: "13px",
    marginBottom: "10px",
    marginTop: "-6px",
  },
  clearButton: {
    background: "none",
    border: "none",
    color: "#d32f2f",
    fontSize: 18,
    cursor: "pointer",
    fontWeight: "bold",
  },
  success: {
    backgroundColor: "#2e7d32",
    color: "#fff",
    padding: "12px",
    borderRadius: "6px",
    marginTop: "16px",
    textAlign: "center",
    fontSize: "15px",
    fontWeight: "500",
    transition: "all 0.3s ease",
  },
};

export default WalletRecharge;
