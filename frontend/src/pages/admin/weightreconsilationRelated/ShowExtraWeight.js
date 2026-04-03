import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllExtraWeights,
  deleteExtraWeightByOrderId,
} from "../../../redux/reconsilationRelated/reconciliationHandel";

import {
  Table, TableHead, TableRow, TableCell, TableBody,
  IconButton, CircularProgress, Snackbar, Alert, Dialog,
  DialogTitle, DialogContent, DialogContentText, DialogActions, Button
} from "@mui/material";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';

// Styled components
const Wrapper = styled.div`
  padding: 20px;
  background-color: white;
  min-height: 100vh;
`;

const Header = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const AddButton = styled.button`
  padding: 8px 16px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  white-space: nowrap;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  margin-top: 30px;
`;

const StyledTable = styled(Table)`
  width: 100%;
  background: white;
  border-radius: 10px;
  min-width: 900px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  th, td {
    padding: 14px 20px;
    text-align: left;
    font-size: 14px;
    white-space: nowrap;
  }

  th {
    background-color: #f1f3f5;
    font-weight: 600;
  }

  tr:hover {
    background-color: #f8f9fa;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px;
`;

const ShowExtraWeight = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allExtraWeights, loading } = useSelector((state) => state.reconciliation);

  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    dispatch(fetchAllExtraWeights());
  }, [dispatch]);

  const confirmDelete = (orderId) => {
    setSelectedId(orderId);
    setConfirmOpen(true);
  };

  const handleDelete = () => {
  dispatch(deleteExtraWeightByOrderId(selectedId))
    .then(() => {
      setSnack({
        open: true,
        message: "Reconciliation deleted successfully!",
        severity: "success",
      });
      setConfirmOpen(false);
    })
    .catch(() => {
      setSnack({
        open: true,
        message: "Failed to delete. Try again.",
        severity: "error",
      });
      setConfirmOpen(false);
    });
};



  return (
    <Wrapper>
      {/* Header */}
      <Header>
        <h2>⚖️ Reconciled Weights</h2>
        <AddButton onClick={() => navigate("/Admin/WeightReconciliation")}>
          + Reconcile New
        </AddButton>
      </Header>

      {loading ? (
        <LoaderContainer><CircularProgress /></LoaderContainer>
      ) : (
        <TableWrapper>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Courier</TableCell>
                <TableCell>Zone</TableCell>
                <TableCell>Entered Weight (kg)</TableCell>
                <TableCell>Extra Weight (kg)</TableCell>
                <TableCell>Rate/kg</TableCell>
                <TableCell>Weight Charge</TableCell>
                <TableCell>Fuel</TableCell>
                <TableCell>GST</TableCell>
                <TableCell>Total Extra</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allExtraWeights.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row.orderId}</TableCell>
                  <TableCell>{row.courierCompany}</TableCell>
                  <TableCell>{row.zone}</TableCell>
                  <TableCell>{parseFloat(row.enteredWeightKg).toFixed(2)}</TableCell>
                  <TableCell>{parseFloat(row.extraWeightKg).toFixed(2)}</TableCell>
                  <TableCell>{parseFloat(row.additionalRatePerKg).toFixed(2)}</TableCell>
                  <TableCell>{parseFloat(row.weightCharge).toFixed(2)}</TableCell>
                  <TableCell>{parseFloat(row.fuelCharge).toFixed(2)}</TableCell>
                  <TableCell>{parseFloat(row.gst).toFixed(2)}</TableCell>
                  <TableCell>{parseFloat(row.totalExtraCharge).toFixed(2)}</TableCell>
                  <TableCell>
                    <IconButton color="error" onClick={() => confirmDelete(row.orderId)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </TableWrapper>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this reconciliation?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} sx={{ color: "#1976d2" }}>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="error"
            sx={{ color: "#fff" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnack({ ...snack, open: false })}
          severity={snack.severity}
          variant="filled"
          sx={{
            width: '100%',
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
            fontWeight: 500,
            fontSize: '15px',
          }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Wrapper>
  );
};

export default ShowExtraWeight;
