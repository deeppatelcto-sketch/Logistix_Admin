import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCourierRate } from '../../../redux/b2bcourierrateRelated/b2bcourierrateHandel';
import {
  Box, Button, Grid, Paper, TextField, Typography, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const AddB2BCourierRate = () => {
  const dispatch = useDispatch();
  const [courierName, setCourierName] = useState('');
  const [overheads, setOverheads] = useState({
    minWeight: '', docketCharge: '', fuel: '', rovCharge: '', insurance: '', codCharge: '',
    handlingCharge: '', fmCharge: '', appointmentCharge: '', greenTax: '', stateCharge: '',
    divisor: '', minCharge: '',
  });

  const [odaMatrix, setOdaMatrix] = useState([]);
  const [zoneRates, setZoneRates] = useState([]);

  const handleOverheadChange = (e) => {
    setOverheads({ ...overheads, [e.target.name]: e.target.value });
  };

  const addOdaRow = () => {
    setOdaMatrix([...odaMatrix, { distanceRange: '', weightRange: '', charge: '' }]);
  };

  const updateOdaRow = (index, field, value) => {
    const updated = [...odaMatrix];
    updated[index][field] = value;
    setOdaMatrix(updated);
  };

  const removeOdaRow = (index) => {
    const updated = [...odaMatrix];
    updated.splice(index, 1);
    setOdaMatrix(updated);
  };

  const addZoneRow = () => {
    setZoneRates([...zoneRates, { fromZone: '', toZone: '', rate: '' }]);
  };

  const updateZoneRow = (index, field, value) => {
    const updated = [...zoneRates];
    updated[index][field] = value;
    setZoneRates(updated);
  };

  const removeZoneRow = (index) => {
    const updated = [...zoneRates];
    updated.splice(index, 1);
    setZoneRates(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      courierName,
      overheads: {
        ...overheads,
        minWeight: Number(overheads.minWeight),
        docketCharge: Number(overheads.docketCharge),
        fuel: Number(overheads.fuel),
        divisor: Number(overheads.divisor),
      },
      odaMatrix: odaMatrix.map((item) => ({
        ...item,
        charge: Number(item.charge),
      })),
      zoneRates: zoneRates.map((item) => ({
        ...item,
        rate: Number(item.rate),
      })),
    };
    dispatch(addCourierRate(payload));
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5">Add B2B Courier Rate</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField label="Courier Name" fullWidth value={courierName} onChange={(e) => setCourierName(e.target.value)} sx={{ my: 2 }} />

        <Typography variant="h6">Overheads</Typography>
        <Grid container spacing={2}>
          {Object.keys(overheads).map((key) => (
            <Grid item xs={12} sm={6} md={4} key={key}>
              <TextField label={key} name={key} value={overheads[key]} onChange={handleOverheadChange} fullWidth />
            </Grid>
          ))}
        </Grid>

        <Box mt={4}>
          <Typography variant="h6">ODA Matrix</Typography>
          {odaMatrix.map((row, index) => (
            <Grid container spacing={1} key={index} alignItems="center" sx={{ mb: 1 }}>
              <Grid item xs={12} sm={4}>
                <TextField label="Distance Range" value={row.distanceRange} onChange={(e) => updateOdaRow(index, 'distanceRange', e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label="Weight Range" value={row.weightRange} onChange={(e) => updateOdaRow(index, 'weightRange', e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField label="Charge" value={row.charge} onChange={(e) => updateOdaRow(index, 'charge', e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={12} sm={1}>
                <IconButton onClick={() => removeOdaRow(index)}><DeleteIcon /></IconButton>
              </Grid>
            </Grid>
          ))}
          <Button variant="outlined" onClick={addOdaRow}>+ Add ODA Row</Button>
        </Box>

        <Box mt={4}>
          <Typography variant="h6">Zone Rates</Typography>
          {zoneRates.map((row, index) => (
            <Grid container spacing={1} key={index} alignItems="center" sx={{ mb: 1 }}>
              <Grid item xs={12} sm={4}>
                <TextField label="From Zone" value={row.fromZone} onChange={(e) => updateZoneRow(index, 'fromZone', e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label="To Zone" value={row.toZone} onChange={(e) => updateZoneRow(index, 'toZone', e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField label="Rate" value={row.rate} onChange={(e) => updateZoneRow(index, 'rate', e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={12} sm={1}>
                <IconButton onClick={() => removeZoneRow(index)}><DeleteIcon /></IconButton>
              </Grid>
            </Grid>
          ))}
          <Button variant="outlined" onClick={addZoneRow}>+ Add Zone Rate</Button>
        </Box>

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 4 }}>Submit</Button>
      </Box>
    </Paper>
  );
};

export default AddB2BCourierRate; 