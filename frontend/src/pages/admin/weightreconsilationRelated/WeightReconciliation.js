import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  calculateExtraCharge,
} from "../../../redux/reconsilationRelated/reconciliationHandel";
import {
  clearResult,
} from "../../../redux/reconsilationRelated/reconciliationSlice";
import { getAllOrders } from "../../../redux/orderRelated/orderHandel";
import {
  Button,
  CircularProgress,
  // TextField,
  Typography,
  Card,
  CardContent,
  // Autocomplete,
  Grid,
  // FormHelperText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const WeightReconciliation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, result, error } = useSelector((state) => state.reconciliation);
  const { orders } = useSelector((state) => state.order);

  const [orderId, setOrderId] = useState("");
  const [extraWeightKg, setExtraWeightKg] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  useEffect(() => {
    if (result?.message) {
      setMessage(result.message);
      setStatus("success");
      setErrors({});
      setTimeout(() => {
        dispatch(clearResult());
        navigate("/Admin/ShowExtraWeight");
      }, 1500);
    } else if (error) {
      setMessage(error);
      setStatus("error");
    } else {
      setMessage("");
      setStatus("");
    }
  }, [result, error, dispatch, navigate]);

  const filteredOrders = orders.filter(
    (o) => o.status === "pending" || o.status === "readytoship"
  );

  const validate = () => {
    const newErrors = {};
    if (!orderId) newErrors.orderId = "Order ID is required";
    if (!extraWeightKg) newErrors.extraWeightKg = "Extra weight is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    dispatch(calculateExtraCharge(orderId, parseFloat(extraWeightKg)));
  };

  const handleBack = () => {
    dispatch(clearResult());
    navigate("/Admin/ShowExtraWeight");
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "auto", mt: 5, p: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Weight Reconciliation
        </Typography>

        <InputGroup>
  <Label htmlFor="orderId">Select Order ID</Label>
  <StyledSelect
    id="orderId"
    value={orderId}
    onChange={(e) => {
      setOrderId(e.target.value);
      if (errors.orderId) setErrors({ ...errors, orderId: "" });
    }}
    hasError={!!errors.orderId}
  >
    <option value="" disabled hidden>-- Select Order ID --</option>
    {filteredOrders.map((order) => (
      <option key={order._id} value={order.orderId}>
        {order.orderId}
      </option>
    ))}
  </StyledSelect>
  {errors.orderId && <ErrorText>{errors.orderId}</ErrorText>}
</InputGroup>


        <InputGroup>
  <Label htmlFor="extraWeightKg">Extra Weight (kg)</Label>
  <StyledInput
    id="extraWeightKg"
    type="number"
    value={extraWeightKg}
    onChange={(e) => {
      setExtraWeightKg(e.target.value);
      if (errors.extraWeightKg) setErrors({ ...errors, extraWeightKg: "" });
    }}
    hasError={!!errors.extraWeightKg}
  />
  {errors.extraWeightKg && <ErrorText>{errors.extraWeightKg}</ErrorText>}
</InputGroup>


        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : "Calculate Extra Charge"}
        </Button>

        {result && (
          <Card sx={{ mt: 3, background: "#f9f9f9" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Reconciliation Result</Typography>
              <Grid container spacing={1}>
                {Object.entries(result).map(([key, value]) => (
                  key !== "message" && (
                    <Grid item xs={12} sm={6} key={key}>
                      <Typography>
                        <strong>{key.replace(/([A-Z])/g, ' $1')}:</strong> {value}
                      </Typography>
                    </Grid>
                  )
                ))}
              </Grid>

              <Button onClick={handleBack} variant="outlined" size="small" sx={{ mt: 2 }}>
                Back to All Extra Weights
              </Button>
            </CardContent>
          </Card>
        )}

        {message && (
          <MessageText error={status === "error"}>{message}</MessageText>
        )}
      </CardContent>
    </Card>
  );
};

export default WeightReconciliation;

// ✅ Styled component for message
const MessageText = styled.p`
  margin-top: 20px;
  text-align: center;
  font-weight: 500;
  color: ${({ error }) => (error ? "#e03131" : "#2f9e44")};
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 6px;
  color: #495057;
`;

const StyledInput = styled.input`
  padding: 10px 12px;
  border: 1px solid ${({ hasError }) => (hasError ? "red" : "#ced4da")};
  border-radius: 6px;
  font-size: 14px;

  &:focus {
    border-color: ${({ hasError }) => (hasError ? "red" : "#339af0")};
    outline: none;
  }
`;

// const StyledSelect = styled.select`
//   padding: 10px 12px;
//   border: 1px solid ${({ hasError }) => (hasError ? "red" : "#ced4da")};
//   border-radius: 6px;
//   font-size: 14px;

//   &:focus {
//     border-color: ${({ hasError }) => (hasError ? "red" : "#339af0")};
//     outline: none;
//   }
// `;

const StyledSelect = styled.select`
  padding: 10px 12px;
  border: 1px solid ${({ hasError }) => (hasError ? 'red' : '#ced4da')};
  border-radius: 6px;
  font-size: 14px;
  background-color: white;
  appearance: none; /* hide default arrow */

  /* ✅ custom large gray arrow */
  background-image: url("data:image/svg+xml;utf8,<svg fill='gray' height='22' width='22' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 20px;

  &:focus {
    border-color: ${({ hasError }) => (hasError ? 'red' : '#339af0')};
    outline: none;
  }

  @media (max-width: 480px) {
    background-position: right 8px center;
    background-size: 18px;
  }
`;


const ErrorText = styled.p`
  color: red;
  font-size: 13px;
  margin-top: 4px;
`;











// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   calculateExtraCharge,
// } from "../../../redux/reconsilationRelated/reconciliationHandel";
// import {
//   clearResult,
// } from "../../../redux/reconsilationRelated/reconciliationSlice";
// import {
//   Button,
//   CircularProgress,
//   Typography,
//   Card,
//   CardContent,
//   Grid,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import axios from "axios";

// const WeightReconciliation = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { loading, result, error } = useSelector(
//     (state) => state.reconciliation
//   );

//   const [orders, setOrders] = useState([]);
//   const [orderId, setOrderId] = useState("");
//   const [extraWeightKg, setExtraWeightKg] = useState("");
//   const [message, setMessage] = useState("");
//   const [status, setStatus] = useState("");
//   const [errors, setErrors] = useState({});

//   // ✅ Orders direct API se fetch
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await axios.get("http://localhost:8000/createorder/allorders");
//         setOrders(res.data || []);
//       } catch (err) {
//         console.error("Error fetching orders:", err);
//       }
//     };
//     fetchOrders();
//   }, []);

//   useEffect(() => {
//     if (result?.message) {
//       setMessage(result.message);
//       setStatus("success");
//       setErrors({});
//       setTimeout(() => {
//         dispatch(clearResult());
//         navigate("/Admin/ShowExtraWeight");
//       }, 1500);
//     } else if (error) {
//       setMessage(error);
//       setStatus("error");
//     } else {
//       setMessage("");
//       setStatus("");
//     }
//   }, [result, error, dispatch, navigate]);

//   const validate = () => {
//     const newErrors = {};
//     if (!orderId) newErrors.orderId = "Order ID is required";
//     if (!extraWeightKg) newErrors.extraWeightKg = "Extra weight is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = () => {
//     if (!validate()) return;
//     dispatch(calculateExtraCharge(orderId, parseFloat(extraWeightKg)));
//   };

//   const handleBack = () => {
//     dispatch(clearResult());
//     navigate("/Admin/ShowExtraWeight");
//   };

//   return (
//     <Card sx={{ maxWidth: 600, margin: "auto", mt: 5, p: 2 }}>
//       <CardContent>
//         <Typography variant="h5" gutterBottom>
//           Weight Reconciliation
//         </Typography>

//         {/* Order Dropdown */}
//         <InputGroup>
//           <Label htmlFor="orderId">Select Order ID</Label>
//           <StyledSelect
//             id="orderId"
//             value={orderId}
//             onChange={(e) => {
//               setOrderId(e.target.value);
//               if (errors.orderId) setErrors({ ...errors, orderId: "" });
//             }}
//             hasError={!!errors.orderId}
//           >
//             <option value="">-- Select Order ID --</option>
//             {orders.map((order) => (
//               <option key={order._id} value={order.orderId || order._id}>
//                 {order.orderId} - {order.calculationDetails?.fileName
//                   ? String(order.calculationDetails.fileName)
//                   : "No File"}
//               </option>
//             ))}

//           </StyledSelect>

//           {errors.orderId && <ErrorText>{errors.orderId}</ErrorText>}
//         </InputGroup>

//         {/* Extra Weight */}
//         <InputGroup>
//           <Label htmlFor="extraWeightKg">Extra Weight (kg)</Label>
//           <StyledInput
//             id="extraWeightKg"
//             type="number"
//             value={extraWeightKg}
//             onChange={(e) => {
//               setExtraWeightKg(e.target.value);
//               if (errors.extraWeightKg)
//                 setErrors({ ...errors, extraWeightKg: "" });
//             }}
//             hasError={!!errors.extraWeightKg}
//           />
//           {errors.extraWeightKg && <ErrorText>{errors.extraWeightKg}</ErrorText>}
//         </InputGroup>

//         {/* Submit */}
//         <Button
//           variant="contained"
//           color="primary"
//           fullWidth
//           onClick={handleSubmit}
//           disabled={loading}
//           sx={{ mt: 2 }}
//         >
//           {loading ? <CircularProgress size={24} /> : "Calculate Extra Charge"}
//         </Button>

//         {/* Result */}
//         {result && (
//           <Card sx={{ mt: 3, background: "#f9f9f9" }}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Reconciliation Result
//               </Typography>
//               <Grid container spacing={1}>
//                 {Object.entries(result).map(
//                   ([key, value]) =>
//                     key !== "message" && (
//                       <Grid item xs={12} sm={6} key={key}>
//                         <Typography>
//                           <strong>
//                             {key.replace(/([A-Z])/g, " $1")}:
//                           </strong>{" "}
//                           {value}
//                         </Typography>
//                       </Grid>
//                     )
//                 )}
//               </Grid>

//               <Button
//                 onClick={handleBack}
//                 variant="outlined"
//                 size="small"
//                 sx={{ mt: 2 }}
//               >
//                 Back to All Extra Weights
//               </Button>
//             </CardContent>
//           </Card>
//         )}

//         {/* Message */}
//         {message && (
//           <MessageText error={status === "error"}>{message}</MessageText>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default WeightReconciliation;

// // ✅ Styled Components
// const MessageText = styled.p`
//   margin-top: 20px;
//   text-align: center;
//   font-weight: 500;
//   color: ${({ error }) => (error ? "#e03131" : "#2f9e44")};
// `;

// const InputGroup = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-bottom: 20px;
// `;

// const Label = styled.label`
//   font-size: 14px;
//   font-weight: 500;
//   margin-bottom: 6px;
//   color: #495057;
// `;

// const StyledInput = styled.input`
//   padding: 10px 12px;
//   border: 1px solid ${({ hasError }) => (hasError ? "red" : "#ced4da")};
//   border-radius: 6px;
//   font-size: 14px;

//   &:focus {
//     border-color: ${({ hasError }) => (hasError ? "red" : "#339af0")};
//     outline: none;
//   }
// `;

// const StyledSelect = styled.select`
//   padding: 10px 12px;
//   border: 1px solid ${({ hasError }) => (hasError ? "red" : "#ced4da")};
//   border-radius: 6px;
//   font-size: 14px;

//   &:focus {
//     border-color: ${({ hasError }) => (hasError ? "red" : "#339af0")};
//     outline: none;
//   }
// `;

// const ErrorText = styled.p`
//   color: red;
//   font-size: 13px;
//   margin-top: 4px;
// `;

