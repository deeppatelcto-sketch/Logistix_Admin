
// AddOrder.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  calculateRates,
  createOrder,
  resetOrderState
} from '../../../redux/orderRelated/orderSlice';

import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  Paper,
  Grid,
  Box,
  MenuItem
} from '@mui/material';

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Autocomplete } from '@mui/material';
import { getAllCust } from "../../../redux/custRelated/custHandle";
import { debitWallet } from "../../../redux/walletRelated/walletHandel";

// Styled Components
const Wrapper = styled(Paper)`
  padding: 24px;
  max-width: 1300px;
  margin: 10px auto;
  border-radius: 16px;
  background-color: #ffffff;
`;

const Row = styled(Box)`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

const FullWidthRow = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 24px;
`;

const ChargesGrid = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ChargesBlock = styled(Box)`
  min-width: 48%;
  margin-bottom: 12px;
`;

const FlexField = styled(Box)`
  flex: 1;
  min-width: 200px;
`;

const AddOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    rates,
    zone,
    rateLoading,
    rateSuccess,
    orderLoading,
    orderSuccess
  } = useSelector((state) => state.order);

  const { custList } = useSelector((state) => state.cust);

  const initialFormData = {
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
    status: 'pending'
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showRates, setShowRates] = useState(false);

  const [selectedEntity, setSelectedEntity] = useState(null);
  const [entities, setEntities] = useState([]);

  const [confirmationDialog, setConfirmationDialog] = useState(false);
  const [selectedRateInfo, setSelectedRateInfo] = useState(null);

  // Load customers
  useEffect(() => {
    dispatch(getAllCust());
  }, [dispatch]);

  // Format customer list
  useEffect(() => {
    setEntities(
      custList.map((cust) => ({
        ...cust,
        label: `${cust.firstName || cust.name || ""} ${cust.lastName || ""} (${cust.phoneNumber || cust.mobile || "N/A"})`,
      }))
    );
  }, [custList]);

  useEffect(() => {
    setFormData(initialFormData);
    setShowRates(false);
    dispatch(resetOrderState());
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleCalculate = () => {
    const { pickupPincode, deliveryPincode, weight } = formData;
    if (!pickupPincode || !deliveryPincode || !weight) {
      alert('Please fill Pickup Pincode, Delivery Pincode, and Weight before proceeding.');
      return;
    }
    dispatch(calculateRates(formData)).then(() => setShowRates(true));
  };

  const handleSelectCourier = (companyName, rate) => {
    setSelectedRateInfo({ companyName, rate });
    setConfirmationDialog(true);
  };

  const handleConfirmOrder = () => {
    const { companyName, rate } = selectedRateInfo;
    const finalRate = parseFloat(rate);

    const orderData = {
      ...formData,
      selectedCourierCompany: companyName,
      finalRate,
      zone,
      user: selectedEntity?._id, // ✅ backend ke hisaab se admin ko user bhejna hai
    };

    dispatch(createOrder(orderData)).then((res) => {
      if (res?.payload?.redirectToWallet) {
        alert("Insufficient wallet balance. Please recharge wallet.");
        navigate("/Admin/wallet");
        return;
      }

      if (res?.payload?.order?._id && selectedEntity?._id) {
        const walletPayload = {
          userId: selectedEntity._id,
          userModel: "Customer",
          amount: finalRate,
          description: `Order placed. Amount ₹${rate} debited from wallet.`,
        };
        dispatch(debitWallet(walletPayload));
      }
    });

    setConfirmationDialog(false);
  };

  const handleCancelOrder = () => {
    setSelectedRateInfo(null);
    setConfirmationDialog(false);
  };

  const handleCloseDialog = () => {
    dispatch(resetOrderState());
    setFormData(initialFormData);
    setShowRates(false);
  };

  useEffect(() => {
    if (orderSuccess) {
      navigate('/Admin/orders');
    }
  }, [orderSuccess, navigate]);

  // Helper function to safely call .toFixed() on a value
  const formatCurrency = (value) => {
    return parseFloat(value || 0).toFixed(2);
  };

  return (
    <Wrapper elevation={4}>
      <Typography variant="h5" gutterBottom>Create Order</Typography>

      {/* Autocomplete for selecting customer */}
      <FullWidthRow>
        <Typography variant="subtitle2" sx={{ fontSize: '14px', fontWeight: '400', mb: 0.5 }} >
          Select Customer
        </Typography>
        <Autocomplete
          options={entities || []}
          getOptionLabel={(option) => option.label || ""}
          renderInput={(params) => (
            <TextField {...params} fullWidth />
          )}
          value={selectedEntity}
          onChange={(e, val) => setSelectedEntity(val)}
          sx={{ width: '100%', maxWidth: '600px', mb: 3 }}
        />
      </FullWidthRow>

      {/* Row 1 */}
      <Row>
        <FlexField>
          <Typography variant="subtitle2" sx={{ mb: 0.5 }} >Pickup Pincode</Typography>
          <TextField name="pickupPincode" value={formData.pickupPincode} onChange={handleChange} size="small" fullWidth />
        </FlexField>
        <FlexField>
          <Typography variant="subtitle2" sx={{ mb: 0.5 }} >Delivery Pincode</Typography>
          <TextField name="deliveryPincode" value={formData.deliveryPincode} onChange={handleChange} size="small" fullWidth />
        </FlexField>
      </Row>

      {/* Row 2 */}
      <Row>
        <FlexField>
          <Typography variant="subtitle2" sx={{ mb: 0.5 }} >Weight (kg)</Typography>
          <TextField name="weight" value={formData.weight} onChange={handleChange} size="small" fullWidth />
        </FlexField>
        <FlexField>
          <Typography variant="subtitle2" sx={{ mb: 0.5 }} >Qty</Typography>
          <TextField name="qty" value={formData.qty} onChange={handleChange} size="small" fullWidth />
        </FlexField>
        <FlexField>
          <Typography variant="subtitle2" sx={{ mb: 0.5 }} >Length (cm)</Typography>
          <TextField name="length" value={formData.length} onChange={handleChange} size="small" fullWidth />
        </FlexField>
        <FlexField>
          <Typography variant="subtitle2" sx={{ mb: 0.5 }} >Width (cm)</Typography>
          <TextField name="width" value={formData.width} onChange={handleChange} size="small" fullWidth />
        </FlexField>
        <FlexField>
          <Typography variant="subtitle2" sx={{ mb: 0.5 }} >Height (cm)</Typography>
          <TextField name="height" value={formData.height} onChange={handleChange} size="small" fullWidth />
        </FlexField>
      </Row>

      {/* Row 3 */}
      <Row>
        <FlexField>
          <Typography variant="subtitle2" sx={{ mb: 0.5 }} >Payment Mode</Typography>
          <TextField name="paymentMode" value={formData.paymentMode} onChange={handleChange} size="small" fullWidth />
        </FlexField>
        <FlexField>
          <Typography variant="subtitle2" sx={{ mb: 0.5 }} >Invoice Value</Typography>
          <TextField name="invoiceValue" value={formData.invoiceValue} onChange={handleChange} size="small" fullWidth />
        </FlexField>
        <FlexField>
          <Typography variant="subtitle2" sx={{ mb: 0.5 }} >Status</Typography>
          <TextField select name="status" value={formData.status} onChange={handleChange} size="small" fullWidth >
            <MenuItem value="Drafted">Drafted</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="readytoship">Ready to Ship</MenuItem>
            <MenuItem value="shipped">Shipped</MenuItem>
            <MenuItem value="delivered">Delivered</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </TextField>
        </FlexField>
      </Row>

      {/* Checkboxes + Button */}
      <FullWidthRow>
        <Row>
          <FormControlLabel control={<Checkbox name="insurance" checked={formData.insurance} onChange={handleChange} />} label="Insurance" />
          <FormControlLabel control={<Checkbox name="appointmentDelivery" checked={formData.appointmentDelivery} onChange={handleChange} />} label="Appointment Delivery" />
        </Row>
        <Button variant="contained" color="primary" onClick={handleCalculate} disabled={rateLoading}>
          {rateLoading ? <CircularProgress size={24} /> : 'Next'}
        </Button>
      </FullWidthRow>

      {/* Rates Display */}
      {showRates && rateSuccess && (
        <>
          <Typography variant="h6" mt={4}>Select Courier Company (Zone: {zone})</Typography>
          <Grid container spacing={2} mt={2}>
            {rates.map((r, index) => (
              <Grid item xs={12} key={index}>
                <Paper elevation={3} style={{ padding: 16, borderRadius: 12 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={2} textAlign="center">
                      <Box sx={{ padding: 2 }}>
                        <img src={r.companiesLogo} style={{ width: 80, height: 80, borderRadius: '50%' }} alt={r.companyName} />
                        <Typography variant="subtitle1" fontWeight="bold">{r.companyName}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={7}>
                      <Box sx={{ background: '#e3f2fd', borderRadius: 2, padding: 2 }}>
                        <Typography variant="subtitle2" fontWeight="bold" color="primary">Charges & Breakdown</Typography>
                        <ChargesGrid>
                          <ChargesBlock>
                            <Box display="flex" justifyContent="space-between"><Typography>Weight:</Typography><Typography>₹{formatCurrency(r.breakdown.weightCharge)}</Typography></Box>
                            <Box display="flex" justifyContent="space-between"><Typography>Fuel:</Typography><Typography>₹{formatCurrency(r.breakdown.fuelCharge)}</Typography></Box>
                            <Box display="flex" justifyContent="space-between"><Typography>Freight:</Typography><Typography>₹{formatCurrency(r.breakdown.freightCharges)}</Typography></Box>
                            <Box display="flex" justifyContent="space-between"><Typography>COD:</Typography><Typography>₹{formatCurrency(r.breakdown.codCharges)}</Typography></Box>
                          </ChargesBlock>
                          <ChargesBlock>
                            <Box display="flex" justifyContent="space-between"><Typography>+ GST:</Typography><Typography>₹{formatCurrency(r.breakdown.gst)}</Typography></Box>
                            <Box display="flex" justifyContent="space-between"><Typography>Vol. Wt.:</Typography><Typography>{formatCurrency(r.breakdown.volumetricWeight)} Kg</Typography></Box>
                            <Box display="flex" justifyContent="space-between"><Typography>Charged Wt.:</Typography><Typography>{formatCurrency(r.breakdown.chargedWeight)} Kg</Typography></Box>
                            <Box display="flex" justifyContent="space-between"><Typography>Min. Wt.:</Typography><Typography>{formatCurrency(r.breakdown.minimumWeight)} Kg</Typography></Box>
                          </ChargesBlock>
                        </ChargesGrid>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Box sx={{ textAlign: 'center', backgroundColor: '#1976d2', color: '#fff', padding: 2, borderRadius: 2 }}>
                        <Typography variant="h6">₹ {formatCurrency(r.totalRate)}</Typography>
                        <Typography variant="body2">Zone: {zone}</Typography>
                        <Button variant="contained" sx={{ backgroundColor: '#fff', color: '#1976d2', mt: 1 }}
                          onClick={() => handleSelectCourier(r.companyName, formatCurrency(r.totalRate))}
                          disabled={orderLoading}>
                          Select
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      <Dialog open={confirmationDialog} onClose={handleCancelOrder}>
        <DialogTitle>Confirm Order Creation</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Are you sure you want to create order and debit ₹
            {selectedRateInfo?.rate} from{' '}
            <strong>{selectedEntity?.label || 'Selected User'}</strong>'s wallet?
          </Typography>
          <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
            <Button onClick={handleCancelOrder} color="error">Cancel</Button>
            <Button onClick={handleConfirmOrder} variant="contained" color="primary">Yes, Confirm</Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog open={orderSuccess} onClose={handleCloseDialog}>
        <DialogTitle>Order Created Successfully</DialogTitle>
        <DialogContent>
          <Typography variant="body2">Your order has been created successfully.</Typography>
        </DialogContent>
      </Dialog>
    </Wrapper>
  );
};

export default AddOrder;


