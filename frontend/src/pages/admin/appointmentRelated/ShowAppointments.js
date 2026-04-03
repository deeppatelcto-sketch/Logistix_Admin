import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAppointments, deleteAppointment } from '../../../redux/appointmentRelated/appointmentHandle';
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ShowAppointments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { appointments, loading } = useSelector((state) => state.appointment);

  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    dispatch(getAllAppointments());
  }, [dispatch]);

  const handleView = (data) => {
    setSelected(data);
    setViewDialogOpen(true);
  };

  const handleCloseView = () => {
    setViewDialogOpen(false);
    setSelected(null);
  };

  const openConfirmDialog = (id) => setConfirmDeleteId(id);
  const closeConfirmDialog = () => setConfirmDeleteId(null);

  const confirmDelete = () => {
    dispatch(deleteAppointment(confirmDeleteId))
      .then(() => {
        setSnackbarMessage('Appointment deleted successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        dispatch(getAllAppointments());
      })
      .catch(() => {
        setSnackbarMessage('❌ Failed to delete appointment.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      })
      .finally(() => closeConfirmDialog());
  };

  const handleSnackbarClose = (_, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  const filteredAppointments = appointments?.filter((a) =>
    a.lrNo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Wrapper>
      {/* <Header>
  <HeaderTitle>📅 Appointment Management</HeaderTitle>
  <HeaderSearchWrapper>
    <SearchIconStyled />
    <SearchInput
      type="text"
      placeholder="Search by LR No"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </HeaderSearchWrapper>
  <AddButton onClick={() => navigate('/Admin/AddAppointment')}>
    + Add Appointment
  </AddButton>
</Header> */}


      <Header>
        <LeftSection><h2>Appointment Management</h2></LeftSection>
        <CenterSection>
          <SearchWrapper>
            <SearchIconStyled />
            <SearchInput
              type="text"
              placeholder="Search by LR No"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchWrapper>
        </CenterSection>
        <RightSection>
          <AddButton onClick={() => navigate('/Admin/AddAppointment')}>+ Add Appointment</AddButton>
        </RightSection>
      </Header>


      {loading ? (
        <LoaderContainer><CircularProgress /></LoaderContainer>
      ) : (
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th>LR No</th>
                <th>Appointment Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>PO Number</th>
                <th>ASN</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments?.map((a) => (
                <tr key={a._id}>
                  <td>{a.lrNo}</td>
                  <td>{new Date(a.appointmentDate).toLocaleDateString()}</td>
                  <td>{a.startTime}</td>
                  <td>{a.endTime}</td>
                  <td>{a.poNumber}</td>
                  <td>{a.asn}</td>
                  <td>
                    <IconButton onClick={() => handleView(a)}><VisibilityIcon color="primary" /></IconButton>
                    <IconButton onClick={() => openConfirmDialog(a._id)}><DeleteIcon color="error" /></IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}

      {/* View Dialog */}
      {/* <Dialog
        open={viewDialogOpen}
        onClose={handleCloseView}
        fullWidth
        maxWidth="md"
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 4,
            boxShadow: 6,
            padding: 1,
            width: '700px'
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 600, fontSize: '1.5rem', position: 'relative', pr: 6 }}>
          Appointment Details
          <IconButton
            onClick={handleCloseView}
            sx={{ position: 'absolute', right: 8, top: 8, color: 'grey.500' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selected && (
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography><strong>LR No:</strong> {selected.lrNo}</Typography>
              <Typography><strong>Appointment Date:</strong> {new Date(selected.appointmentDate).toLocaleDateString()}</Typography>
              <Typography><strong>Start Time:</strong> {selected.startTime}</Typography>
              <Typography><strong>End Time:</strong> {selected.endTime}</Typography>
              <Typography><strong>PO Number:</strong> {selected.poNumber}</Typography>
              <Typography><strong>ASN:</strong> {selected.asn}</Typography>
              {selected.poCopy && (
                <Typography>
                  <strong>PO Copy:</strong>{' '}
                  <a
                    href={`${process.env.REACT_APP_BASE_URL || 'http://localhost:8000'}/${selected.poCopy}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View File
                  </a>
                </Typography>
              )}
            </Box>
          )}
        </DialogContent>
      </Dialog> */}

      {/* 🟩 View Dialog (Styled same as ShowCustomers / PickupPoints) */}
      <Dialog
        open={viewDialogOpen}
        onClose={handleCloseView}
        fullWidth
        maxWidth="md"
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 4,
            boxShadow: 6,
            padding: 1,
            width: '700px',
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 600,
            fontSize: '1.5rem',
            position: 'relative',
            pr: 6,
          }}
        >
          Appointment Details
          <IconButton
            onClick={handleCloseView}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'grey.500',
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          {selected && (
            <Box sx={{ mt: 1 }}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  rowGap: 2,
                  columnGap: 4,
                }}
              >
                <Typography variant="subtitle2" color="text.secondary">LR No</Typography>
                <Typography variant="body1" fontWeight={500}>{selected.lrNo}</Typography>

                <Typography variant="subtitle2" color="text.secondary">Appointment Date</Typography>
                <Typography variant="body1" fontWeight={500}>{new Date(selected.appointmentDate).toLocaleDateString()}</Typography>

                <Typography variant="subtitle2" color="text.secondary">Start Time</Typography>
                <Typography variant="body1" fontWeight={500}>{selected.startTime}</Typography>

                <Typography variant="subtitle2" color="text.secondary">End Time</Typography>
                <Typography variant="body1" fontWeight={500}>{selected.endTime}</Typography>

                <Typography variant="subtitle2" color="text.secondary">PO Number</Typography>
                <Typography variant="body1" fontWeight={500}>{selected.poNumber}</Typography>

                <Typography variant="subtitle2" color="text.secondary">ASN</Typography>
                <Typography variant="body1" fontWeight={500}>{selected.asn}</Typography>

                {selected.poCopy && (
                  <>
                    <Typography variant="subtitle2" color="text.secondary">PO Copy</Typography>
                    <Typography variant="body1" fontWeight={500}>
                      <a
                        href={`${process.env.REACT_APP_BASE_URL || 'http://localhost:8000'}/${selected.poCopy}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 600 }}
                      >
                        View File
                      </a>
                    </Typography>     
                  </>
                )}
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>


      {/* Snackbar */}         
      <Snackbar        
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          variant="standard"
          sx={{
            width: '100%',
            fontWeight: 500,
            fontSize: '1rem',
            backgroundColor: snackbarSeverity === 'success' ? 'green' : 'red',
            color: 'white',
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
            padding: '0 16px',
          }}
          icon={false}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Delete Confirmation */}
      <Dialog open={!!confirmDeleteId} onClose={closeConfirmDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this appointment?</DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmDialog} color="primary">Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  );
};

export default ShowAppointments;

// Styled Components
const Wrapper = styled.div`
  padding: 2rem 1rem;
  max-width: 1500px;
  margin: auto;
  background: #ffffff;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;      /* allow wrap when no space */
  align-items: center;  /* vertically center on big screens */
  justify-content: flex-start;
  gap: 1rem;
  margin-bottom: 25px;

  @media (max-width: 768px) {
    flex-direction: column;   /* stack vertically on small */
    align-items: flex-start;  /* left align all items */
  }
`;

const LeftSection = styled.div`
  flex-shrink: 0;        /* prevent shrinking */
`;

const CenterSection = styled.div`
  flex-grow: 1;
  display: flex;             
  justify-content: center;  
  min-width: 200px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

const RightSection = styled.div`
  flex-shrink: 0;        /* prevent shrinking */

  @media (max-width: 768px) {
    width: 100%;         /* full width on small */
  }
`;

const SearchWrapper = styled.div`
  width: 50%;                  /* half width on large screens */

  @media (max-width: 768px) {
    width: 100%;               /* full width on small */
  }

  position: relative;
`;

const SearchInput = styled.input`
   width: 100%;
  padding: 8px 12px 8px 36px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  &:focus { border-color: #339af0; }

  &:focus {
    border-color: #339af0;
    outline: none;
  }
`;

const SearchIconStyled = styled(SearchIcon)`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #339af0;
  font-size: 20px;
`;

const AddButton = styled.button`
  background-color: #1976d2;
  color: white;
  border: none;
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #1c7ed6;
  }

  @media (max-width: 768px) {
    width: 100%;       /* full width button on small */
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-size: 14px;

  th, td {
    padding: 14px 20px;
    text-align: left;
    border-bottom: 1px solid #dee2e6;
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
  margin-top: 50px;
`;

