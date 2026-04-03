// import React, { useState } from "react";

// const OrderModule = () => {
//   const [userId, setUserId] = useState("");      // user ek baar input karega
//   const [pincode, setPincode] = useState("");
//   const [state, setState] = useState("");
//   const [weight, setWeight] = useState("");
//   const [invoiceValue, setInvoiceValue] = useState("");
//   const [calculations, setCalculations] = useState([]); // API se aayega
//   const [selectedCalculation, setSelectedCalculation] = useState("");

//   // STEP 1: Call calculation API
// //   const handleCalculate = async () => {
// //     try {
// //       const res = await fetch(`${process.env.REACT_APP_BASE_URL || 'http://localhost:8000'}/createorder/calculation`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           userId,         // ✅ yaha ek hi bar userId input hota hai
// //           pincode,
// //           state,
// //           weight,
// //           invoiceValue,
// //         }),
// //       });

// //       const data = await res.json();
// //       if (res.ok) {
// //         setCalculations(data.calculations || []);  // tumhare backend ka response
// //         alert("Calculation Done, please select one.");
// //       } else {
// //         alert(data.message || "Calculation failed");
// //       }
// //     } catch (err) {
// //       console.error("Error:", err);
// //     }
// //   };

// const handleCalculate = async () => {
//   try {
//     const res = await fetch("http://localhost:8000/createorder/calculation", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         userId,         
//         pincode,
//         state,
//         weight,
//         invoiceValue,
//       }),
//     });

//     const data = await res.json();
//     console.log("Calculation API Response:", data); // 🔍 Debugging

//     if (res.ok) {
//       if (Array.isArray(data)) {
//         setCalculations(data);     // ✅ Directly set array
//       } else if (data.calculations) {
//         setCalculations(data.calculations);
//       } else {
//         setCalculations([data]);   // fallback
//       }
//       alert("Calculation Done, please select one.");
//     } else {
//       alert(data.message || "Calculation failed");
//     }
//   } catch (err) {
//     console.error("Error:", err);
//   }
// };


//   // STEP 2: Create Order API
//   const handleCreateOrder = async () => {
//     if (!selectedCalculation) {
//       alert("Please select a calculation first!");
//       return;
//     }

//     try {
//       const res = await fetch(`${process.env.REACT_APP_BASE_URL || 'http://localhost:8000'}/createorder/order`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId,                // ✅ yahi auto use ho raha hai
//           calculationId: selectedCalculation,
//         }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert("Order Created Successfully!");
//         console.log("Order:", data.order);
//       } else {
//         alert(data.message || "Order creation failed");
//       }
//     } catch (err) {
//       console.error("Error:", err);
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Order Creation Module</h2>

//       {/* User input only once */}
//       <input
//         type="text"
//         placeholder="User ID"
//         value={userId}
//         onChange={(e) => setUserId(e.target.value)}
//       />
//       <br />

//       <input
//         type="text"
//         placeholder="Pincode"
//         value={pincode}
//         onChange={(e) => setPincode(e.target.value)}
//       />
//       <br />

//       <input
//         type="text"
//         placeholder="State"
//         value={state}
//         onChange={(e) => setState(e.target.value)}
//       />
//       <br />

//       <input
//         type="text"
//         placeholder="Weight"
//         value={weight}
//         onChange={(e) => setWeight(e.target.value)}
//       />
//       <br />

//       <input
//         type="text"
//         placeholder="Invoice Value"
//         value={invoiceValue}
//         onChange={(e) => setInvoiceValue(e.target.value)}
//       />
//       <br />

//       <button onClick={handleCalculate}>Get Calculation</button>

//       {/* Show calculation options */}
//       {calculations.length > 0 && (
//         <div>
//           <h3>Select Calculation:</h3>
//           <select
//             value={selectedCalculation}
//             onChange={(e) => setSelectedCalculation(e.target.value)}
//           >
//             <option value="">-- Select --</option>
//             {calculations.map((calc) => (
//               <option key={calc._id} value={calc._id}>
//                 {calc._id} - {calc.finalRate || "Rate"}
//               </option>
//             ))}
//           </select>
//           <br />
//           <button onClick={handleCreateOrder}>Create Order</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderModule;







import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCust } from "../../../redux/custRelated/custHandle";

const OrderModule = () => {
  const [userId, setUserId] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [weight, setWeight] = useState("");
  const [invoiceValue, setInvoiceValue] = useState("");
  const [calculations, setCalculations] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);

  const dispatch = useDispatch();
  const { custList } = useSelector((state) => state.cust);

  useEffect(() => {
    dispatch(getAllCust());
  }, [dispatch]);

  // STEP 1: Call calculation API
  const handleCalculate = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL || 'http://localhost:8000'}/createorder/calculation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          pincode,
          state,
          weight,
          invoiceValue,
        }),
      });

      const data = await res.json();
      console.log("Calculation API Response:", data);

      if (res.ok) {
        if (Array.isArray(data)) {
          setCalculations(data);
        } else if (data.calculations) {
          setCalculations(data.calculations);
        } else {
          setCalculations([data]);
        }
        alert("Calculation Done, please select one.");
      } else {
        alert(data.message || "Calculation failed");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // STEP 2: Create Order API
  const handleCreateOrder = async (calculationId) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL || 'http://localhost:8000'}/createorder/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          calculationId,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Order Created Successfully!");
        console.log("Order:", data.order);
        setOrderDetails(data.order);
      } else {
        alert(data.message || "Order creation failed");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Order</h2>

      {/* USER SELECT DROPDOWN */}
      <div style={{ marginBottom: "15px" }}>
        <label><strong>Select Customer</strong></label>
        <select
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        >
          <option value="">-- Select Customer --</option>
          {custList &&
            custList.map((cust) => (
              <option key={cust._id} value={cust._id}>
                {cust.name} ({cust.email})
              </option>
            ))}
        </select>
      </div>

      {/* INPUT FIELDS */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
        <input
          type="text"
          placeholder="Pickup Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
        <input
          type="text"
          placeholder="Delivery State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <input
          type="text"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <input
          type="text"
          placeholder="Invoice Value"
          value={invoiceValue}
          onChange={(e) => setInvoiceValue(e.target.value)}
        />
      </div>

      <button
        style={{
          marginTop: "20px",
          background: "blue",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={handleCalculate}
      >
        NEXT
      </button>

      {/* SHOW CALCULATION CARDS */}
      {calculations.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h3>Select Courier Company</h3>
          {calculations.map((calc) => (
            <div
              key={calc._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid #ddd",
                borderRadius: "10px",
                margin: "15px 0",
                padding: "15px",
                background: "#f9f9f9",
              }}
            >
              {/* LEFT SIDE INFO */}
              <div>
                <h4>{calc.fileName}</h4>
                <p><strong>State:</strong> {calc.state}</p>
                <p><strong>Pincode:</strong> {calc.pincode}</p>
                <p><strong>Zone:</strong> {calc.zone}</p>
                <p><strong>Weight:</strong> {calc.weight} kg</p>
                <p><strong>Rate/kg:</strong> ₹{calc.ratePerKg}</p>
                <p><strong>Freight:</strong> ₹{calc.freight}</p>
                <p><strong>DWB:</strong> ₹{calc.DWB}</p>
                <p><strong>FOV:</strong> ₹{calc.FOV}</p>
                <p><strong>NGT:</strong> ₹{calc.NGT}</p>
                <p><strong>ODA:</strong> ₹{calc.ODA}</p>
                <p><strong>Total w/o FSC:</strong> ₹{calc.totalWithoutFSC}</p>
                <p><strong>FSC:</strong> ₹{calc.FSC}</p>
                <p><strong>Subtotal:</strong> ₹{calc.subtotal}</p>
                <p><strong>GST:</strong> ₹{calc.GST}</p>
              </div>

              {/* RIGHT SIDE PRICE + BUTTON */}
              <div
                style={{
                  background: "blue",
                  color: "white",
                  padding: "20px",
                  borderRadius: "10px",
                  textAlign: "center",
                  minWidth: "150px",
                }}
              >
                <h3>₹{calc.total}</h3>
                <p>Zone: {calc.zone}</p>
                <button
                  style={{
                    background: "white",
                    color: "blue",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginTop: "10px",
                  }}
                  onClick={() => handleCreateOrder(calc._id)}
                >
                  SELECT
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SHOW ORDER DETAILS */}
      {orderDetails && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            border: "2px solid green",
            borderRadius: "10px",
            background: "#e6ffe6",
          }}
        >
          <h3>✅ Order Created Successfully</h3>
          <p><strong>Order ID:</strong> {orderDetails._id}</p>
          <p><strong>User:</strong> {orderDetails.user}</p>
          <p><strong>Calculation ID:</strong> {orderDetails.calculationId}</p>
          <p><strong>Created At:</strong> {new Date(orderDetails.createdAt).toLocaleString()}</p>

          {/* Extra Calculation Details */}
          {orderDetails.calculation && (
            <div style={{ marginTop: "15px" }}>
              <h4>📦 Calculation Details</h4>
              <p><strong>File:</strong> {orderDetails.calculation.fileName}</p>
              <p><strong>Weight:</strong> {orderDetails.calculation.weight} kg</p>
              <p><strong>Rate/kg:</strong> ₹{orderDetails.calculation.ratePerKg}</p>
              <p><strong>Freight:</strong> ₹{orderDetails.calculation.freight}</p>
              <p><strong>DWB:</strong> ₹{orderDetails.calculation.DWB}</p>
              <p><strong>FOV:</strong> ₹{orderDetails.calculation.FOV}</p>
              <p><strong>Total:</strong> ₹{orderDetails.calculation.total}</p>
              <p><strong>GST:</strong> ₹{orderDetails.calculation.GST}</p>
              <h3 style={{ color: "green" }}>Final Total: ₹{orderDetails.calculation.total}</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderModule;

