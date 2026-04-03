


// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import {
//   Button,
//   TextField,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   MenuItem,
//   Grid,
//   CircularProgress,
//   Typography,
// } from '@mui/material';
// import styled from 'styled-components';
// import { addPickup } from '../../../redux/pickuprequestRelated/pickupHandle';

// const AddPickupRequest = ({ open, onClose }) => {
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState({
//     shippingPartner: '',
//     warehouse: '',
//     expectedPackageCount: '',
//     pickupDate: '',
//     pickupTime: '',

//   });

//   const [errors, setErrors] = useState({});
//   const [status, setStatus] = useState('');
//   const [message, setMessage] = useState('');
//   const [loader, setLoader] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));

//     if (errors[name]) {
//       setErrors((prev) => {
//         const newErrors = { ...prev };
//         delete newErrors[name];
//         return newErrors;
//       });
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.shippingPartner.trim()) newErrors.shippingPartner = 'Shipping Partner is required';
//     if (!formData.warehouse.trim()) newErrors.warehouse = 'Warehouse is required';
//     if (!formData.expectedPackageCount.trim()) newErrors.expectedPackageCount = 'Package count is required';
//     if (!formData.pickupDate.trim()) newErrors.pickupDate = 'Pickup Date is required';
//     if (!formData.pickupTime.trim()) newErrors.pickupTime = 'Pickup Time is required';


//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = () => {
//     if (!validateForm()) {
//       setLoader(false);
//       return;
//     }

//     setLoader(true);
//     const payload = {
//       ...formData,
//       expectedPackageCount: parseInt(formData.expectedPackageCount),
//       pickupDate: new Date(formData.pickupDate),
//     };

//     dispatch(addPickup(payload))
//       .then(() => {
//         setStatus('success');
//         setMessage('Pickup request added successfully ✅');
//         setErrors({});
//         setLoader(false);
//         setTimeout(() => {
//           setMessage('');
//           setStatus('');
//           onClose();
//         }, 1500);
//       })
//       .catch(() => {
//         setStatus('error');
//         setMessage('Failed to add pickup request ❌');
//         setLoader(false);
//       });
//   };

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
//       <DialogTitle>New Pickup Request</DialogTitle>
//       <DialogContent>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <Typography variant="subtitle2">Shipping Partner</Typography>
//             <TextField
//               name="shippingPartner"
//               fullWidth
//               select
//               required
//               value={formData.shippingPartner}
//               onChange={handleChange}
//               error={!!errors.shippingPartner}
//               helperText={errors.shippingPartner}
//             >
//               <MenuItem value="DELHIVERY">DELHIVERY</MenuItem>
//               <MenuItem value="EKART">EKART</MenuItem>
//             </TextField>
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <Typography variant="subtitle2">Warehouse</Typography>
//             <TextField
//               name="warehouse"
//               fullWidth
//               required
//               value={formData.warehouse}
//               onChange={handleChange}
//               error={!!errors.warehouse}
//               helperText={errors.warehouse}
//             />
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <Typography variant="subtitle2">Expected Package Count</Typography>
//             <TextField
//               name="expectedPackageCount"
//               type="number"
//               fullWidth
//               required
//               value={formData.expectedPackageCount}
//               onChange={handleChange}
//               error={!!errors.expectedPackageCount}
//               helperText={errors.expectedPackageCount}
//             />
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <Typography variant="subtitle2">Pickup Date</Typography>
//             <TextField
//               name="pickupDate"
//               type="date"
//               fullWidth
//               required
//               InputLabelProps={{ shrink: true }}
//               value={formData.pickupDate}
//               onChange={handleChange}
//               error={!!errors.pickupDate}
//               helperText={errors.pickupDate}
//             />
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <Typography variant="subtitle2">Pickup Time</Typography>
//             <TextField
//               name="pickupTime"
//               fullWidth
//               select
//               required
//               value={formData.pickupTime}
//               onChange={handleChange}
//               error={!!errors.pickupTime}
//               helperText={errors.pickupTime}
//             >
//               <MenuItem value="01:00 pm - 03:00 pm">01:00 pm - 03:00 pm</MenuItem>
//               <MenuItem value="03:00 pm - 05:00 pm">03:00 pm - 05:00 pm</MenuItem>
//               <MenuItem value="05:00 pm - 07:00 pm">05:00 pm - 07:00 pm</MenuItem>
//             </TextField>
//           </Grid>







//           {message && (
//             <Grid item xs={12}>
//               <MessageText error={status === 'error'}>{message}</MessageText>
//             </Grid>
//           )}
//         </Grid>

//         <Grid container justifyContent="flex-end" mt={3} spacing={2}>
//           <Grid item>
//             <Button variant="outlined" onClick={onClose} color="error">
//               Cancel Request
//             </Button>
//           </Grid>
//           <Grid item>
//             <StyledButton type="button" onClick={handleSubmit} disabled={loader}>
//               {loader ? <CircularProgress size={24} color="inherit" /> : 'Add Pickup Request'}
//             </StyledButton>
//           </Grid>
//         </Grid>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default AddPickupRequest;

// // === STYLED COMPONENTS ===

// const MessageText = styled.p`
//   margin-top: 20px;
//   text-align: center;
//   font-weight: 500;
//   color: ${({ error }) => (error ? '#e03131' : '#2f9e44')};
// `;

// const StyledButton = styled(Button)`
//   background-color: #339af0;
//   color: white;
//   font-weight: 600;
//   padding: 10px 24px;
//   border-radius: 6px;

//   &:hover {
//     background-color: #1c7ed6;
//   }

//   &:disabled {
//     background-color: #74c0fc;
//   }
// `;




import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  MenuItem,
  Grid,
  CircularProgress,
  Typography,
} from '@mui/material';
import styled from 'styled-components';
import { addPickup } from '../../../redux/pickuprequestRelated/pickupHandle';
import { getAllCust } from "../../../redux/custRelated/custHandle";

const AddPickupRequest = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    shippingPartner: '',
    warehouse: '',
    expectedPackageCount: '',
    pickupDate: '',
    pickupTime: '',
    user: '',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [loader, setLoader] = useState(false);

  const { custList } = useSelector((state) => state.cust);

  useEffect(() => {
    dispatch(getAllCust());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.shippingPartner.trim()) newErrors.shippingPartner = 'Shipping Partner is required';
    if (!formData.warehouse.trim()) newErrors.warehouse = 'Warehouse is required';
    if (!formData.expectedPackageCount.trim()) newErrors.expectedPackageCount = 'Package count is required';
    if (!formData.pickupDate.trim()) newErrors.pickupDate = 'Pickup Date is required';
    if (!formData.pickupTime.trim()) newErrors.pickupTime = 'Pickup Time is required';
    if (!formData.user) newErrors.user = 'User is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      setLoader(false);
      return;
    }

    setLoader(true);
    const payload = {
      ...formData,
      expectedPackageCount: parseInt(formData.expectedPackageCount),
      pickupDate: new Date(formData.pickupDate),
    };

    dispatch(addPickup(payload))
      .then(() => {
        setStatus('success');
        setMessage('Pickup request added successfully ✅');
        setErrors({});
        setLoader(false);
        setTimeout(() => {
          setMessage('');
          setStatus('');
          onClose();
        }, 1500);
      })
      .catch(() => {
        setStatus('error');
        setMessage('Failed to add pickup request ❌');
        setLoader(false);
      });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>New Pickup Request</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">Shipping Partner</Typography>
            <TextField
              name="shippingPartner"
              fullWidth
              select
              required
              value={formData.shippingPartner}
              onChange={handleChange}
              error={!!errors.shippingPartner}
              helperText={errors.shippingPartner}
            >
              <MenuItem value="DELHIVERY">DELHIVERY</MenuItem>
              <MenuItem value="EKART">EKART</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">Warehouse</Typography>
            <TextField
              name="warehouse"
              fullWidth
              required
              value={formData.warehouse}
              onChange={handleChange}
              error={!!errors.warehouse}
              helperText={errors.warehouse}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">Expected Package Count</Typography>
            <TextField
              name="expectedPackageCount"
              type="number"
              fullWidth
              required
              value={formData.expectedPackageCount}
              onChange={handleChange}
              error={!!errors.expectedPackageCount}
              helperText={errors.expectedPackageCount}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">Pickup Date</Typography>
            <TextField
              name="pickupDate"
              type="date"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              value={formData.pickupDate}
              onChange={handleChange}
              error={!!errors.pickupDate}
              helperText={errors.pickupDate}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">Pickup Time</Typography>
            <TextField
              name="pickupTime"
              fullWidth
              select
              required
              value={formData.pickupTime}
              onChange={handleChange}
              error={!!errors.pickupTime}
              helperText={errors.pickupTime}
            >
              <MenuItem value="01:00 pm - 03:00 pm">01:00 pm - 03:00 pm</MenuItem>
              <MenuItem value="03:00 pm - 05:00 pm">03:00 pm - 05:00 pm</MenuItem>
              <MenuItem value="05:00 pm - 07:00 pm">05:00 pm - 07:00 pm</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">User</Typography>
            <TextField
              name="user"
              fullWidth
              select
              required
              value={formData.user}
              onChange={handleChange}
              error={!!errors.user}
              helperText={errors.user}
            >
              {custList &&
                custList.map((cust) => (
                  <MenuItem key={cust._id} value={cust._id}>
                    {cust.firstName} ({cust.phoneNumber})
                  </MenuItem>
                ))}

            </TextField>
          </Grid>

          {message && (
            <Grid item xs={12}>
              <MessageText error={status === 'error'}>{message}</MessageText>
            </Grid>
          )}
        </Grid>

        <Grid container justifyContent="flex-end" mt={3} spacing={2}>
          <Grid item>
            <Button variant="outlined" onClick={onClose} color="error">
              Cancel Request
            </Button>
          </Grid>
          <Grid item>
            <StyledButton type="button" onClick={handleSubmit} disabled={loader}>
              {loader ? <CircularProgress size={24} color="inherit" /> : 'Add Pickup Request'}
            </StyledButton>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default AddPickupRequest;

// === STYLED COMPONENTS ===

const MessageText = styled.p`
  margin-top: 20px;
  text-align: center;
  font-weight: 500;
  color: ${({ error }) => (error ? '#e03131' : '#2f9e44')};
`;

const StyledButton = styled(Button)`
  background-color: #339af0;
  color: white;
  font-weight: 600;
  padding: 10px 24px;
  border-radius: 6px;

  &:hover {
    background-color: #1c7ed6;
  }

  &:disabled {
    background-color: #74c0fc;
  }
`;
