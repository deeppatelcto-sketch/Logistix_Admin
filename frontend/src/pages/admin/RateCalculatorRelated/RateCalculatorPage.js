// import React, { useState, useEffect } from 'react';
// import {
//   Box, TextField, Button, Grid, MenuItem, Checkbox, FormControlLabel,
//   Accordion, AccordionSummary, AccordionDetails, Typography, CircularProgress, Paper
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { useDispatch, useSelector } from 'react-redux';
// import { calculateRates } from '../../../redux/rateCalculatorRelated/rateCalculatorHandel';
// import styled from 'styled-components';

// const RateCalculatorPage = () => {
//   const dispatch = useDispatch();
//   const { rates, loading, zone, error } = useSelector((state) => state.rateCalculator);

//   const [formData, setFormData] = useState({
//     pickupPincode: '',
//     deliveryPincode: '',
//     weight: '',
//     qty: '',
//     length: '',
//     width: '',
//     height: '',
//     paymentMode: '',
//     invoiceValue: '',
//     insurance: false,
//     appointmentDelivery: false,
//   });

//   const [message, setMessage] = useState('');
//   const [status, setStatus] = useState('');

//   useEffect(() => {
//     if (rates && rates.length > 0) {
//       setMessage('Rates calculated successfully ✅');
//       setStatus('success');
//     } else if (error) {
//       setMessage('Failed to calculate rates ❌');
//       setStatus('error');
//     } else {
//       setMessage('');
//       setStatus('');
//     }
//   }, [rates, error]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(calculateRates(formData));
//   };

//   return (
//     <Wrapper>
//       <Box p={3}>
//         <Typography variant="h5" mb={2} fontWeight={600}>🚚 Courier Rate Calculator</Typography>

//         {message && (
//           <TopMessage error={status === 'error'}>{message}</TopMessage>
//         )}

//         <FormContainer>
//           <form onSubmit={handleSubmit}>
//             <Grid container spacing={2} mb={2}>

//               <Grid item xs={12} md={6}>
//                 <Label htmlFor="pickupPincode">Origin Pincode</Label>
//                 <TextField
//                   id="pickupPincode"
//                   name="pickupPincode"
//                   fullWidth
//                   required
//                   value={formData.pickupPincode}
//                   onChange={handleChange}
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <Label htmlFor="deliveryPincode">Destination Pincode</Label>
//                 <TextField
//                   id="deliveryPincode"
//                   name="deliveryPincode"
//                   fullWidth
//                   required
//                   value={formData.deliveryPincode}
//                   onChange={handleChange}
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <Label htmlFor="weight">Weight (Kg)</Label>
//                 <TextField
//                   id="weight"
//                   name="weight"
//                   fullWidth
//                   required
//                   type="number"
//                   value={formData.weight}
//                   onChange={handleChange}
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <Label htmlFor="invoiceValue">Invoice Value</Label>
//                 <TextField
//                   id="invoiceValue"
//                   name="invoiceValue"
//                   fullWidth
//                   required
//                   value={formData.invoiceValue}
//                   onChange={handleChange}
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <Label htmlFor="paymentMode">Payment Mode</Label>
//                 <TextField
//                   id="paymentMode"
//                   select
//                   name="paymentMode"
//                   fullWidth
//                   required
//                   value={formData.paymentMode}
//                   onChange={handleChange}
//                 >
//                   <MenuItem value="Prepaid">Prepaid</MenuItem>
//                   <MenuItem value="COD">COD</MenuItem>
//                 </TextField>
//               </Grid>
//             </Grid>

//             <DimensionContainer>
//               <Typography variant="subtitle1" mb={1}><b>📦 Dimensions (in cms)</b></Typography>
//               <Grid container spacing={2}>
//                 <Grid item xs={3}>
//                   <Label htmlFor="qty">Qty</Label>
//                   <TextField
//                     id="qty"
//                     name="qty"
//                     fullWidth
//                     value={formData.qty}
//                     onChange={handleChange}
//                   />
//                 </Grid>
//                 <Grid item xs={3}>
//                   <Label htmlFor="length">Length</Label>
//                   <TextField
//                     id="length"
//                     name="length"
//                     fullWidth
//                     value={formData.length}
//                     onChange={handleChange}
//                   />
//                 </Grid>
//                 <Grid item xs={3}>
//                   <Label htmlFor="width">Width</Label>
//                   <TextField
//                     id="width"
//                     name="width"
//                     fullWidth
//                     value={formData.width}
//                     onChange={handleChange}
//                   />
//                 </Grid>
//                 <Grid item xs={3}>
//                   <Label htmlFor="height">Height</Label>
//                   <TextField
//                     id="height"
//                     name="height"
//                     fullWidth
//                     value={formData.height}
//                     onChange={handleChange}
//                   />
//                 </Grid>
//               </Grid>
//             </DimensionContainer>

//             <FormControlLabel
//               control={<Checkbox checked={formData.insurance} onChange={handleChange} name="insurance" />}
//               label="Insurance"
//             />
//             <FormControlLabel
//               control={<Checkbox checked={formData.appointmentDelivery} onChange={handleChange} name="appointmentDelivery" />}
//               label="Appointment Base Delivery"
//             />

//             <Box mt={2}>
//               <Button type="submit" variant="contained" color="primary" fullWidth>
//                 Calculate
//               </Button>
//             </Box>
//           </form>
//         </FormContainer>

//         <Box mt={4}>
//           {loading ? (
//             <CircularProgress />
//           ) : (
//             rates.map((rate, idx) => (
//               <Paper elevation={3} sx={{ p: 2, mb: 2 }} key={idx}>
//                 <Typography variant="h6" fontWeight={600}>{rate.companyName} - ₹ {rate.totalRate}</Typography>
//                 <Accordion>
//                   <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                     <Typography fontWeight={500}>Charges Bifurcation</Typography>
//                   </AccordionSummary>
//                   <AccordionDetails>
//                     {Object.entries(rate.breakdown).map(([key, value]) => (
//                       <Typography key={key}>
//                         {key.replace(/([A-Z])/g, ' $1')} : ₹ {value}
//                       </Typography>
//                     ))}
//                   </AccordionDetails>
//                 </Accordion>
//               </Paper>
//             ))
//           )}
//         </Box>
//       </Box>
//     </Wrapper>
//   );
// };

// export default RateCalculatorPage;

// // ✅ Full white background screen
// const Wrapper = styled.div`
//   min-height: 100vh;
//   background: #ffffff;
// `;

// // ✅ Styled message box
// const TopMessage = styled.p`
//   background: ${({ error }) => (error ? "#fff5f5" : "#e6ffed")};
//   color: ${({ error }) => (error ? "#d32f2f" : "#2e7d32")};
//   border: 1px solid ${({ error }) => (error ? "#f44336" : "#81c784")};
//   padding: 12px 18px;
//   font-weight: 500;
//   border-radius: 8px;
//   margin-bottom: 20px;
//   text-align: center;
//   font-size: 15px;
// `;

// // ✅ White card form container
// const FormContainer = styled(Box)`
//   background: white;
//   padding: 24px;
//   border-radius: 12px;
//   box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.08);
//   margin-bottom: 32px;
// `;

// // ✅ Dimensions section also in white card style
// const DimensionContainer = styled(Box)`
//   background: white;
//   padding: 16px 24px;
//   border-radius: 10px;
//   box-shadow: 0px 2px 10px rgba(0,0,0,0.05);
//   margin-bottom: 20px;
// `;

// // ✅ New styled Label component for above inputs labels
// const Label = styled.label`
//   display: block;
//   margin-bottom: 6px;
//   font-weight: 600;
//   font-size: 14px;
//   color: #333;
// `;



// import React, { useState, useEffect } from 'react';
// import {
//   Box, TextField, Button, Grid, MenuItem, Checkbox, FormControlLabel,
//   Accordion, AccordionSummary, AccordionDetails, Typography, CircularProgress, Paper
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { useDispatch, useSelector } from 'react-redux';
// import { calculateRates } from '../../../redux/rateCalculatorRelated/rateCalculatorHandel';
// import styled from 'styled-components';

// const RateCalculatorPage = () => {
//   const dispatch = useDispatch();
//   const { rates, loading, zone, error } = useSelector((state) => state.rateCalculator);

//   const [formData, setFormData] = useState({
//     pickupPincode: '',
//     deliveryPincode: '',
//     weight: '',
//     qty: '',
//     length: '',
//     width: '',
//     height: '',
//     paymentMode: '',
//     invoiceValue: '',
//     insurance: false,
//     appointmentDelivery: false,
//   });

//   const [message, setMessage] = useState('');
//   const [status, setStatus] = useState('');

//   useEffect(() => {
//     if (rates && rates.length > 0) {
//       setMessage('Rates calculated successfully ✅');
//       setStatus('success');
//     } else if (error) {
//       setMessage('Failed to calculate rates ❌');
//       setStatus('error');
//     } else {
//       setMessage('');
//       setStatus('');
//     }
//   }, [rates, error]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Frontend validation: check if all required fields are filled
//     const requiredFields = [
//       'pickupPincode', 'deliveryPincode', 'weight', 'qty', 'length', 'width', 'height',
//       'paymentMode', 'invoiceValue'
//     ];

//     for (const field of requiredFields) {
//       if (!formData[field] || formData[field].toString().trim() === '') {
//         setMessage(`Please fill all required fields ❌`);
//         setStatus('error');
//         return;
//       }
//     }

//     dispatch(calculateRates(formData));
//   };

//   return (
//     <Wrapper>
//       <Box p={3}>
//         <Typography variant="h5" mb={2} fontWeight={600}>🚚 Courier Rate Calculator</Typography>

//         {message && (
//           <TopMessage error={status === 'error'}>{message}</TopMessage>
//         )}

//         <FormContainer>
//           <form onSubmit={handleSubmit}>
//             <Grid container spacing={2} mb={2}>

//               <Grid item xs={12} md={6}>
//                 <Label htmlFor="pickupPincode">Origin Pincode</Label>
//                 <TextField
//                   id="pickupPincode"
//                   name="pickupPincode"
//                   fullWidth
//                   required
//                   value={formData.pickupPincode}
//                   onChange={handleChange}
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <Label htmlFor="deliveryPincode">Destination Pincode</Label>
//                 <TextField
//                   id="deliveryPincode"
//                   name="deliveryPincode"
//                   fullWidth
//                   required
//                   value={formData.deliveryPincode}
//                   onChange={handleChange}
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <Label htmlFor="weight">Weight (Kg)</Label>
//                 <TextField
//                   id="weight"
//                   name="weight"
//                   fullWidth
//                   required
//                   type="number"
//                   value={formData.weight}
//                   onChange={handleChange}
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <Label htmlFor="invoiceValue">Invoice Value</Label>
//                 <TextField
//                   id="invoiceValue"
//                   name="invoiceValue"
//                   fullWidth
//                   required
//                   value={formData.invoiceValue}
//                   onChange={handleChange}
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <Label htmlFor="paymentMode">Payment Mode</Label>
//                 <TextField
//                   id="paymentMode"
//                   select
//                   name="paymentMode"
//                   fullWidth
//                   required
//                   value={formData.paymentMode}
//                   onChange={handleChange}
//                 >
//                   <MenuItem value="Prepaid">Prepaid</MenuItem>
//                   <MenuItem value="COD">COD</MenuItem>
//                 </TextField>
//               </Grid>
//             </Grid>

//             <DimensionContainer>
//               <Typography variant="subtitle1" mb={1}><b>📦 Dimensions (in cms)</b></Typography>
//               <Grid container spacing={2}>
//                 <Grid item xs={3}>
//                   <Label htmlFor="qty">Qty</Label>
//                   <TextField
//                     id="qty"
//                     name="qty"
//                     fullWidth
//                     required
//                     value={formData.qty}
//                     onChange={handleChange}
//                   />
//                 </Grid>
//                 <Grid item xs={3}>
//                   <Label htmlFor="length">Length</Label>
//                   <TextField
//                     id="length"
//                     name="length"
//                     fullWidth
//                     required
//                     value={formData.length}
//                     onChange={handleChange}
//                   />
//                 </Grid>
//                 <Grid item xs={3}>
//                   <Label htmlFor="width">Width</Label>
//                   <TextField
//                     id="width"
//                     name="width"
//                     fullWidth
//                     required
//                     value={formData.width}
//                     onChange={handleChange}
//                   />
//                 </Grid>
//                 <Grid item xs={3}>
//                   <Label htmlFor="height">Height</Label>
//                   <TextField
//                     id="height"
//                     name="height"
//                     fullWidth
//                     required
//                     value={formData.height}
//                     onChange={handleChange}
//                   />
//                 </Grid>
//               </Grid>
//             </DimensionContainer>

//             <FormControlLabel
//               control={<Checkbox checked={formData.insurance} onChange={handleChange} name="insurance" />}
//               label="Insurance"
//             />
//             <FormControlLabel
//               control={<Checkbox checked={formData.appointmentDelivery} onChange={handleChange} name="appointmentDelivery" />}
//               label="Appointment Base Delivery"
//             />

//             <Box mt={2}>
//               <Button type="submit" variant="contained" color="primary" fullWidth>
//                 Calculate
//               </Button>
//             </Box>
//           </form>
//         </FormContainer>

//         <Box mt={4}>
//           {loading ? (
//             <CircularProgress />
//           ) : (
//             rates.map((rate, idx) => (
//               <Paper elevation={3} sx={{ p: 2, mb: 2 }} key={idx}>
//                 <Typography variant="h6" fontWeight={600}>{rate.companyName} - ₹ {rate.totalRate}</Typography>
//                 <Accordion>
//                   <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                     <Typography fontWeight={500}>Charges Bifurcation</Typography>
//                   </AccordionSummary>
//                   <AccordionDetails>
//                     {Object.entries(rate.breakdown).map(([key, value]) => (
//                       <Typography key={key}>
//                         {key.replace(/([A-Z])/g, ' $1')} : ₹ {value}
//                       </Typography>
//                     ))}
//                   </AccordionDetails>
//                 </Accordion>
//               </Paper>
//             ))
//           )}
//         </Box>
//       </Box>
//     </Wrapper>
//   );
// };

// export default RateCalculatorPage;

// // ✅ Full white background screen
// const Wrapper = styled.div`
//   min-height: 100vh;
//   background: #ffffff;
// `;

// // ✅ Styled message box
// const TopMessage = styled.p`
//   background: ${({ error }) => (error ? "#fff5f5" : "#e6ffed")};
//   color: ${({ error }) => (error ? "#d32f2f" : "#2e7d32")};
//   border: 1px solid ${({ error }) => (error ? "#f44336" : "#81c784")};
//   padding: 12px 18px;
//   font-weight: 500;
//   border-radius: 8px;
//   margin-bottom: 20px;
//   text-align: center;
//   font-size: 15px;
// `;

// // ✅ White card form container
// const FormContainer = styled(Box)`
//   background: white;
//   padding: 24px;
//   border-radius: 12px;
//   box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.08);
//   margin-bottom: 32px;
// `;

// // ✅ Dimensions section also in white card style
// const DimensionContainer = styled(Box)`
//   background: white;
//   padding: 16px 24px;
//   border-radius: 10px;
//   box-shadow: 0px 2px 10px rgba(0,0,0,0.05);
//   margin-bottom: 20px;
// `;

// // ✅ New styled Label component for above inputs labels
// const Label = styled.label`
//   display: block;
//   margin-bottom: 6px;
//   font-weight: 600;
//   font-size: 14px;
//   color: #333;
// `;




import React, { useState, useEffect } from 'react';
import {
  Box, TextField, Button, Grid, MenuItem, Checkbox, FormControlLabel,
  Accordion, AccordionSummary, AccordionDetails, Typography, CircularProgress, Paper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { calculateRates } from '../../../redux/rateCalculatorRelated/rateCalculatorHandel';
import styled from 'styled-components';

const RateCalculatorPage = () => {
  const dispatch = useDispatch();
  const { rates, loading, zone, error } = useSelector((state) => state.rateCalculator);

  const [formData, setFormData] = useState({
    pickupPincode: '',
    deliveryPincode: '',
    weight: '',
    qty: '',
    length: '',
    width: '',
    height: '',
    paymentMode: '',
    invoiceValue: '',
    insurance: false,
    appointmentDelivery: false,
  });

  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (rates && rates.length > 0) {
      setMessage('Rates calculated successfully ✅');
      setStatus('success');
    } else if (error) {
      setMessage('Failed to calculate rates ❌');
      setStatus('error');
    } else {
      setMessage('');
      setStatus('');
    }
  }, [rates, error]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Frontend validation: check if all required fields are filled
    const requiredFields = [
      'pickupPincode', 'deliveryPincode', 'weight', 'qty', 'length', 'width', 'height',
      'paymentMode', 'invoiceValue'
    ];

    for (const field of requiredFields) {
      if (!formData[field] || formData[field].toString().trim() === '') {
        setMessage(`Please fill all required fields ❌`);
        setStatus('error');
        return;
      }
    }

    dispatch(calculateRates(formData));
  };

  return (
    <Wrapper>
      <Box p={3}>
        <Typography variant="h5" mb={2} fontWeight={600}>🚚 Courier Rate Calculator</Typography>

        {message && (
          <TopMessage error={status === 'error'}>{message}</TopMessage>
        )}

        <FormContainer>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} mb={2}>

              <Grid item xs={12} md={6}>
                <Label htmlFor="pickupPincode">
                  Origin Pincode <RequiredMark>*</RequiredMark>
                </Label>
                <TextField
                  id="pickupPincode"
                  name="pickupPincode"
                  fullWidth
                  required
                  value={formData.pickupPincode}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Label htmlFor="deliveryPincode">
                  Destination Pincode <RequiredMark>*</RequiredMark>
                </Label>
                <TextField
                  id="deliveryPincode"
                  name="deliveryPincode"
                  fullWidth
                  required
                  value={formData.deliveryPincode}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Label htmlFor="weight">
                  Weight (Kg) <RequiredMark>*</RequiredMark>
                </Label>
                <TextField
                  id="weight"
                  name="weight"
                  fullWidth
                  required
                  type="number"
                  value={formData.weight}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Label htmlFor="invoiceValue">
                  Invoice Value <RequiredMark>*</RequiredMark>
                </Label>
                <TextField
                  id="invoiceValue"
                  name="invoiceValue"
                  fullWidth
                  required
                  value={formData.invoiceValue}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Label htmlFor="paymentMode">
                  Payment Mode <RequiredMark>*</RequiredMark>
                </Label>
                <TextField
                  id="paymentMode"
                  select
                  name="paymentMode"
                  fullWidth
                  required
                  value={formData.paymentMode}
                  onChange={handleChange}
                >
                  <MenuItem value="Prepaid">Prepaid</MenuItem>
                  <MenuItem value="COD">COD</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            <DimensionContainer>
              <Typography variant="subtitle1" mb={1}><b>📦 Dimensions (in cms)</b></Typography>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Label htmlFor="qty">
                    Qty <RequiredMark>*</RequiredMark>
                  </Label>
                  <TextField
                    id="qty"
                    name="qty"
                    fullWidth
                    required
                    value={formData.qty}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Label htmlFor="length">
                    Length <RequiredMark>*</RequiredMark>
                  </Label>
                  <TextField
                    id="length"
                    name="length"
                    fullWidth
                    required
                    value={formData.length}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Label htmlFor="width">
                    Width <RequiredMark>*</RequiredMark>
                  </Label>
                  <TextField
                    id="width"
                    name="width"
                    fullWidth
                    required
                    value={formData.width}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Label htmlFor="height">
                    Height <RequiredMark>*</RequiredMark>
                  </Label>
                  <TextField
                    id="height"
                    name="height"
                    fullWidth
                    required
                    value={formData.height}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </DimensionContainer>

            <FormControlLabel
              control={<Checkbox checked={formData.insurance} onChange={handleChange} name="insurance" />}
              label="Insurance"
            />
            <FormControlLabel
              control={<Checkbox checked={formData.appointmentDelivery} onChange={handleChange} name="appointmentDelivery" />}
              label="Appointment Base Delivery"
            />

            <Box mt={2}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Calculate
              </Button>
            </Box>
          </form>
        </FormContainer>

        <Box mt={4}>
          {loading ? (
            <CircularProgress />
          ) : (
            rates.map((rate, idx) => (
              <Paper elevation={3} sx={{ p: 2, mb: 2 }} key={idx}>
                <Typography variant="h6" fontWeight={600}>{rate.companyName} - ₹ {rate.totalRate}</Typography>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography fontWeight={500}>Charges Bifurcation</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {Object.entries(rate.breakdown).map(([key, value]) => (
                      <Typography key={key}>
                        {key.replace(/([A-Z])/g, ' $1')} : ₹ {value}
                      </Typography>
                    ))}
                  </AccordionDetails>
                </Accordion>
              </Paper>
            ))
          )}
        </Box>
      </Box>
    </Wrapper>
  );
};

export default RateCalculatorPage;

// ✅ Full white background screen
const Wrapper = styled.div`
  min-height: 100vh;
  background: #ffffff;
`;

// ✅ Styled message box
const TopMessage = styled.p`
  background: ${({ error }) => (error ? "#fff5f5" : "#e6ffed")};
  color: ${({ error }) => (error ? "#d32f2f" : "#2e7d32")};
  border: 1px solid ${({ error }) => (error ? "#f44336" : "#81c784")};
  padding: 12px 18px;
  font-weight: 500;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 15px;
`;

// ✅ White card form container
const FormContainer = styled(Box)`
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.08);
  margin-bottom: 32px;
`;

// ✅ Dimensions section also in white card style
const DimensionContainer = styled(Box)`
  background: white;
  padding: 16px 24px;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 20px;
`;

// ✅ Label with optional red asterisk
const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  font-size: 14px;
  color: #333;
`;

const RequiredMark = styled.span`
  color: red;
  margin-left: 3px;
  font-weight: 700;
`;
