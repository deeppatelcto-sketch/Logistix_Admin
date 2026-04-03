import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllNDREntries,
  deleteNDREntry,
  updateNDRAction
} from '../../../redux/ndrRelated/ndrHandle';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  IconButton,
  Pagination,
  Snackbar,
  Alert,
  Grid,
  Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const ShowNDRAndException = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ndrs } = useSelector((state) => state.ndr);

  const [editData, setEditData] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    dispatch(getAllNDREntries());
  }, [dispatch]);

  const handleEditOpen = (entry) => {
    setEditData(entry);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async () => {
    const updatePayload = {
      reason: editData.reason,
      attempts: editData.attempts,
      lastUpdate: editData.lastUpdate,
      date: editData.date,
    };

    const res = await dispatch(updateNDRAction({ id: editData._id, update: updatePayload }));

    if (res.meta.requestStatus === 'fulfilled') {
      await dispatch(getAllNDREntries());
      setSnackbarMessage('✅ Entry updated successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setEditData(null);
    } else {
      setSnackbarMessage('❌ Failed to update entry.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleDelete = async () => {
    const res = await dispatch(deleteNDREntry(confirmDeleteId));
    if (res.meta.requestStatus === 'fulfilled') {
      await dispatch(getAllNDREntries());
      setSnackbarMessage('✅ Entry deleted successfully!');
      setSnackbarSeverity('success');
    } else {
      setSnackbarMessage('❌ Failed to delete entry.');
      setSnackbarSeverity('error');
    }
    setSnackbarOpen(true);
    setConfirmDeleteId(null);
  };

  const handlePageChange = (_, value) => setCurrentPage(value);

  const totalPages = Math.ceil(ndrs.length / itemsPerPage);
  const paginatedNDRs = ndrs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Wrapper>
      {/* <Header>
        <LeftSection>
          <h2>NDR & Exception List</h2>
        </LeftSection>

        <RightSection>
          <AddButton onClick={() => navigate('/Admin/NDR&Exception')}>
           + Add Entry
          </AddButton>
        </RightSection>
      </Header> */}

      <Header>
        <h2>NDR & Exception List</h2>
        <AddButton onClick={() => navigate('/Admin/NDR&Exception')}>+ Add Entry</AddButton>
      </Header>

      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Order ID</th>
              <th>Mode</th>
              <th>Last Update</th>
              <th>Reason</th>
              <th>Attempts</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedNDRs.map((entry) => (
              <tr key={entry._id}>
                <td>{entry.date}</td>
                <td>{entry.orderId?.orderId || 'N/A'}</td>
                <td>{entry.mode}</td>
                <td>{entry.lastUpdate}</td>
                <td>{entry.reason}</td>
                <td>{entry.attempts}</td>
                <td>
                  <IconButton onClick={() => handleEditOpen(entry)}>
                    <EditIcon color="secondary" />
                  </IconButton>
                  <IconButton onClick={() => setConfirmDeleteId(entry._id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>

      {totalPages > 1 && (
        <PaginationWrapper>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            size="medium"
          />
        </PaginationWrapper>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!editData} onClose={() => setEditData(null)} fullWidth maxWidth="sm">
        <DialogTitle>
          Edit Entry
          <IconButton
            onClick={() => setEditData(null)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={2}>
            {/* Reason */}
            <Grid item xs={12}>
              <Box sx={{ mb: 1, fontWeight: 600, fontSize: '0.9rem' }}>Reason</Box>
              <TextField
                name="reason"
                value={editData?.reason}
                onChange={handleEditChange}
                fullWidth
                variant="outlined"
                label=""
              />
            </Grid>

            {/* Attempts */}
            <Grid item xs={12}>
              <Box sx={{ mb: 1, fontWeight: 600, fontSize: '0.9rem' }}>Attempts</Box>
              <TextField
                name="attempts"
                value={editData?.attempts}
                onChange={handleEditChange}
                fullWidth
                variant="outlined"
                label=""
              />
            </Grid>

            {/* Last Update */}
            <Grid item xs={12}>
              <Box sx={{ mb: 1, fontWeight: 600, fontSize: '0.9rem' }}>Last Update</Box>
              <TextField
                name="lastUpdate"
                value={editData?.lastUpdate}
                onChange={handleEditChange}
                fullWidth
                variant="outlined"
                label=""
              />
            </Grid>

            {/* Date */}
            <Grid item xs={12}>
              <Box sx={{ mb: 1, fontWeight: 600, fontSize: '0.9rem' }}>Date</Box>
              <TextField
                name="date"
                type="date"
                value={editData?.date}
                onChange={handleEditChange}
                fullWidth
                variant="outlined"
                label=""
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button variant="contained" onClick={handleEditSubmit}>Save</Button>
        </DialogActions>
      </Dialog>



      {/* Confirm Delete */}
      <Dialog open={!!confirmDeleteId} onClose={() => setConfirmDeleteId(null)} fullWidth maxWidth="xs">
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this entry?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteId(null)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Alert */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          variant="filled"
          sx={{
            fontWeight: 500,
            fontSize: '1rem',
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Wrapper>
  );
};

export default ShowNDRAndException;

const Wrapper = styled.div`
  padding: 2rem;
  max-width: 1500px;
  margin: auto;
  background: #ffffff;
  min-height: 100vh;

  @media (max-width: 600px) {
    padding: 1rem;
  }
`;

const Header = styled.div`
  margin-top: 10px;
  margin-bottom:30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;  /* prevent wrapping on large screens */
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;

    /* Ensure button full width and left aligned */
    button {
      width: 100%;
      margin-top: 10px; /* some spacing below title */
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
`;


const TableWrapper = styled.div`
  overflow-x: auto;
  border-radius: 10px;    
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);

  /* Ensure the wrapper doesn’t shrink, allows horizontal scroll */
  width: 100%;
`;

const Table = styled.table`
  width: max-content;  /* allow table to be as wide as content */
  min-width: 700px;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  width:100%;

  th, td {
    padding: 14px 20px;
    text-align: left;
    border-bottom: 1px solid #dee2e6;
    font-size: 14px;
    white-space: nowrap; /* prevent text wrapping inside cells */

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

  td:last-child {
    white-space: nowrap;
  }
`;

const PaginationWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

