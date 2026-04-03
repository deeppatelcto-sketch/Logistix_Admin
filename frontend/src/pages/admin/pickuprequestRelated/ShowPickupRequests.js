import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPickups, deletePickup } from '../../../redux/pickuprequestRelated/pickupHandle';

import {
  Table, TableHead, TableBody, TableRow, TableCell,
  IconButton, Tooltip, Dialog, DialogTitle,
  DialogContent, DialogContentText, DialogActions, Box, CircularProgress,
  Snackbar, Alert
} from '@mui/material';

import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';
import AddPickupRequest from './AddPickupRequest';

// 🔽 Responsive Styled Components
const Wrapper = styled.div`
  padding: 20px;
  background-color: white;
  min-height: 100vh;

  @media (max-width: 600px) {
    padding: 10px;
  }
`;

const Header = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;

  h2 {
    margin: 0;
    font-size: 1.5rem;

    @media (max-width: 480px) {
      font-size: 1.2rem;
    }
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

  @media (max-width: 770px) {
    width: 100%;
    padding: 10px;
  }
`;

const StyledTableContainer = styled.div`
  margin-top: 30px;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  /* Add this to make sure inner table doesn't shrink */
  white-space: nowrap;

  /* Optional: smooth scroll on mobile */
  scroll-behavior: smooth;
`;


const StyledTable = styled(Table)`
width: max-content;
  min-width: 700px;  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  th, td {
    padding: 14px 20px;
    text-align: left;
    font-size: 14px;

    @media (max-width: 600px) {
      padding: 10px 12px;
      font-size: 13px;
    }
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

// 🔽 Main Component
const ShowPickupRequests = () => {
  const dispatch = useDispatch();
  const { pickups = [], loading } = useSelector((state) => state.pickup);

  const [openDialog, setOpenDialog] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    dispatch(getAllPickups());
  }, [dispatch]);

  const handleDelete = () => {
    if (selectedId) {
      dispatch(deletePickup(selectedId))
        .then(() => {
          setSnack({ open: true, message: 'Pickup request deleted successfully!', severity: 'success' });
          dispatch(getAllPickups());
        })
        .catch(() => {
          setSnack({ open: true, message: 'Error deleting pickup request.', severity: 'error' });
        });
    }
    setConfirmOpen(false);
  };

  return (
    <Wrapper>
      {/* Header */}
      <Header>
        <h2>📦 Pickup Requests</h2>
        <AddButton onClick={() => setOpenDialog(true)}>
          + Add New Pickup
        </AddButton>
      </Header>

      <AddPickupRequest open={openDialog} onClose={() => setOpenDialog(false)} />

      {loading ? (
        <LoaderContainer><CircularProgress /></LoaderContainer>
      ) : (
        <StyledTableContainer>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell>Request ID</TableCell>
                <TableCell>Pickup Point</TableCell>
                <TableCell>Pickup Date & Time</TableCell>
                <TableCell>Package Count</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pickups.length > 0 ? (
                pickups.map((p) => (
                  <TableRow key={p._id}>
                    <TableCell>{p.requestId}</TableCell>
                    <TableCell>{p.warehouse}, {p.center}</TableCell>
                    <TableCell>
                      {new Date(p.pickupDate).toLocaleDateString()}<br />
                      <small>{p.pickupTime}</small>
                    </TableCell>
                    <TableCell>{p.expectedPackageCount}</TableCell>

                    <TableCell>
                      <Tooltip title="Delete Request">
                        <IconButton
                          color="error"
                          onClick={() => {
                            setSelectedId(p._id);
                            setConfirmOpen(true);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No Pickup Requests Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </StyledTable>
        </StyledTableContainer>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this pickup request?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            onClick={() => setConfirmOpen(false)}
            style={{
              padding: "6px 12px",
              color: "#1976d2",
              border: "none",
              background: "transparent",
              cursor: "pointer"
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            style={{
              padding: "6px 12px",
              backgroundColor: "#d32f2f",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Delete
          </button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for messages */}
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

export default ShowPickupRequests;


