import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllPickupPoints,
  deletePickupPoint,
  togglePickupPointStatus,
  updatePickupPoint,
} from '../../../redux/pickuppointRelated/pickupPointHandel';
import {
  Table, TableHead, TableBody, TableRow, TableCell, CircularProgress,
  Dialog, DialogTitle, DialogContent, IconButton, Button, TextField, Box, Grid,
  Switch, DialogActions, Snackbar, Alert, Pagination, Typography
} from '@mui/material';

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import PlaceIcon from '@mui/icons-material/Place';
import PinDropIcon from '@mui/icons-material/PinDrop';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DomainIcon from '@mui/icons-material/Domain';
import SearchIcon from "@mui/icons-material/Search";


// 🟦 Component unchanged
const ShowPickupPoints = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pickupPoints, loading, error } = useSelector((state) => state.pickupPoint);

  const [viewData, setViewData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [editErrors, setEditErrors] = useState({});


  useEffect(() => {
    dispatch(getAllPickupPoints());
  }, [dispatch]);

  const fieldsToRender = [
    { label: 'Pickup Point Name', key: 'pickupPointName', icon: <DomainIcon /> },
    { label: 'Contact Name', key: 'contactName', icon: <PersonIcon /> },
    { label: 'Phone Number', key: 'contactNumber', icon: <PhoneIcon /> },
    { label: 'Email', key: 'email', icon: <EmailIcon /> },
    { label: 'Address', key: 'address', icon: <LocationOnIcon /> },
    { label: 'Pincode', key: 'pincode', icon: <PinDropIcon /> },
    { label: 'City', key: 'city', icon: <ApartmentIcon /> },
    { label: 'State', key: 'state', icon: <PlaceIcon /> },
  ];


  const validateEditForm = (data) => {
    const newErrors = {};
    if (!data.pickupPointName?.trim()) newErrors.pickupPointName = "Pickup Point Name is required";
    if (!data.contactName?.trim()) newErrors.contactName = "Contact Name is required";
    if (!data.contactNumber?.trim()) newErrors.contactNumber = "Contact Number is required";
    if (!data.address?.trim()) newErrors.address = "Address is required";
    if (!data.city?.trim()) newErrors.city = "City is required";
    if (!data.state?.trim()) newErrors.state = "State is required";
    if (!data.pincode?.trim()) newErrors.pincode = "Pincode is required";
    if (!data.email?.trim()) newErrors.email = "Email is required";
    if (data.email && !/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Invalid email format";
    }
    if (data.contactNumber && !/^\d{10}$/.test(data.contactNumber)) {
      newErrors.contactNumber = "Contact Number must be 10 digits";
    }
    setEditErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleDelete = () => {
    if (deleteData?._id) {
      dispatch(deletePickupPoint(deleteData._id))
        .then(() => {
          dispatch(getAllPickupPoints());
          setSnackbarMessage('Pickup Point deleted successfully!');
          setSnackbarSeverity('success');
        })
        .catch(() => {
          setSnackbarMessage('❌ Failed to delete pickup point.');
          setSnackbarSeverity('error');
        })
        .finally(() => {
          setSnackbarOpen(true);
          setDeleteData(null);
        });
    }
  };

  // const handleUpdate = () => {
  //   if (editData?._id) {
  //     const updatedFields = { ...editData };
  //     delete updatedFields._id;
  //     dispatch(updatePickupPoint(editData._id, updatedFields))
  //       .then(() => {
  //         dispatch(getAllPickupPoints());
  //         setSnackbarMessage('Pickup Point updated successfully!');
  //         setSnackbarSeverity('success');
  //       })
  //       .catch(() => {
  //         setSnackbarMessage('❌ Failed to update pickup point.');
  //         setSnackbarSeverity('error');
  //       })
  //       .finally(() => {
  //         setSnackbarOpen(true);
  //         setEditData(null);
  //       });
  //   }
  // };

  const handleUpdate = () => {
    if (editData?._id) {
      if (!validateEditForm(editData)) return; // ✅ Stop if invalid

      const updatedFields = { ...editData };
      delete updatedFields._id;
      dispatch(updatePickupPoint(editData._id, updatedFields))
        .then(() => {
          dispatch(getAllPickupPoints());
          setSnackbarMessage('Pickup Point updated successfully!');
          setSnackbarSeverity('success');
        })
        .catch(() => {
          setSnackbarMessage('❌ Failed to update pickup point.');
          setSnackbarSeverity('error');
        })
        .finally(() => {
          setSnackbarOpen(true);
          setEditData(null);
        });
    }
  };


  const handleStatusToggle = (id) => {
    dispatch(togglePickupPointStatus(id));
  };

  const handleSnackbarClose = (_, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  const filteredPickupPoints = pickupPoints.filter((item) =>
    item.pickupPointName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.contactName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.contactNumber?.toString().includes(searchTerm) ||
    item.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.state?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPickupPoints.length / itemsPerPage);
  const paginatedData = filteredPickupPoints.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Wrapper>
      <Header>
        <h2>Pickup Points</h2>
        <SearchBarWrapper>
          <SearchIconStyled />
          <SearchInput
            type="text"
            placeholder="Search by pickup point, contact..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBarWrapper>
        <AddButton onClick={() => navigate('/Admin/addpickuppoint')}>+ Add Pickup Point</AddButton>
      </Header>

      {loading ? (
        <LoaderContainer><CircularProgress /></LoaderContainer>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          <TableContainer>
            <StyledTable>
              <TableHead>
                <TableRow>
                  <TableCell>Pickup Point</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Address Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.pickupPointName}</TableCell>
                    <TableCell>{item.contactName} ({item.contactNumber})</TableCell>
                    <TableCell>{item.address}</TableCell>
                    <TableCell>{item.addressType}</TableCell>
                    <TableCell>
                      <Switch
                        checked={item.status}
                        color="primary"
                        onChange={() => handleStatusToggle(item._id)}
                      />
                    </TableCell>
                    <TableCell>
                      <IconBox>
                        <VisibilityIcon
                          style={{ color: '#1976d2', cursor: 'pointer' }}
                          onClick={() => setViewData(item)}
                        />
                        <EditIcon
                          style={{ color: '#9c27b0', cursor: 'pointer' }}
                          onClick={() => setEditData(item)}
                        />
                        <DeleteIcon
                          style={{ color: '#d32f2f', cursor: 'pointer' }}
                          onClick={() => setDeleteData(item)}
                        />
                      </IconBox>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </StyledTable>
          </TableContainer>

          {totalPages > 1 && (
            <PaginationWrapper>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(e, value) => setCurrentPage(value)}
                color="primary"
                shape="rounded"
              />
            </PaginationWrapper>
          )}
        </>
      )}


      {/* 🔽 View Dialog */}
      {/* <Dialog open={!!viewData} onClose={() => setViewData(null)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          PICKUP POINT DETAILS
          <IconButton onClick={() => setViewData(null)}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {viewData && (
            <Grid container spacing={2}>
              {fieldsToRender.map(({ label, key, icon }) => (
                <Grid item xs={12} sm={6} key={key}>
                  <Box display="flex" flexDirection="column">
                    <Box display="flex" alignItems="center" fontWeight="bold">{icon}&nbsp;{label}</Box>
                    <Box color="text.secondary">{viewData[key]}</Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </DialogContent>
      </Dialog> */}

      {/* 🟩 View Dialog (No Icons, Clean Style like ShowCustomers) */}
      <Dialog
        open={!!viewData}
        onClose={() => setViewData(null)}
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
          Pickup Point Details
          <IconButton
            onClick={() => setViewData(null)}
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
          {viewData && (
            <Grid container spacing={3}>
              {fieldsToRender.map(({ label, key }) => (
                viewData[key] && (
                  <Grid item xs={12} sm={6} key={key}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ fontWeight: 500 }}
                    >
                      {label}
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {String(viewData[key])}
                    </Typography>
                  </Grid>
                )
              ))}
            </Grid>
          )}
        </DialogContent>
      </Dialog>

      {/* 🔽 Edit Dialog */}
      {/* <Dialog open={!!editData} onClose={() => setEditData(null)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Edit Pickup Point
          <IconButton onClick={() => setEditData(null)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          {editData && (
            <Box display="flex" flexDirection="column" gap={2}>
              {fieldsToRender.map(({ key, label }) => (
                <Box key={key}>
                  <Box sx={{ mb: 1, fontWeight: 600, fontSize: '0.9rem' }}>{label}</Box>
                  <TextField
                    value={editData[key]}
                    onChange={(e) => setEditData({ ...editData, [key]: e.target.value })}
                    fullWidth
                    variant="outlined"
                    label="" // ✅ no floating label
                  />
                </Box>
              ))}

              <Button variant="contained" color="primary" onClick={handleUpdate}>
                Save
              </Button>
            </Box>
          )}
        </DialogContent>
      </Dialog> */}

      <Dialog
        open={!!editData}
        onClose={() => setEditData(null)}
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
          Edit Pickup Point
          <IconButton
            onClick={() => setEditData(null)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'grey.600',
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ px: 4, py: 3 }}>
          <Grid container spacing={3}>
            {[
              { name: 'pickupPointName', label: 'Pickup Point Name' },
              { name: 'contactName', label: 'Contact Name' },
              { name: 'contactNumber', label: 'Contact Number' },
              { name: 'email', label: 'Email' },
              { name: 'address', label: 'Address' },
              { name: 'city', label: 'City' },
              { name: 'state', label: 'State' },
              { name: 'pincode', label: 'Pincode' },
            ].map((field) => (
              <Grid item xs={12} sm={6} key={field.name}>
                {/* Label above the input */}
                <Box
                  sx={{
                    mb: 1,
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    color: editErrors[field.name] ? 'error.main' : 'text.primary',
                  }}
                >
                  {field.label}
                </Box>

                <TextField
                  fullWidth
                  name={field.name}
                  value={editData?.[field.name] || ''}
                  onChange={(e) =>
                    setEditData({ ...editData, [e.target.name]: e.target.value })
                  }
                  variant="outlined"
                  error={!!editErrors[field.name]}
                  helperText={editErrors[field.name]}
                  label="" // hide default floating label
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button
            onClick={handleUpdate}
            color="primary"
            variant="contained"
            sx={{ minWidth: 150 }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>


      {/* 🔽 Delete Confirmation */}
      <Dialog open={!!deleteData} onClose={() => setDeleteData(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this pickup point?</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteData(null)} sx={{ color: '#1976d2' }}>
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained" sx={{ backgroundColor: '#d32f2f' }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* 🔽 Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
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
            backgroundColor: snackbarSeverity === 'success' ? 'green' : '#d32f2f',
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
    </Wrapper>
  );
};

export default ShowPickupPoints;

const Wrapper = styled.div`
  padding: 20px;
  background: white;
  min-height: 100vh;

  @media (max-width: 600px) {
    padding: 10px;
  }
`;

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;

  h2 {
    flex-shrink: 0;
    margin: 0;
    font-size: 1.5rem;

    @media (max-width: 480px) {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 770px) {
    /* Button stays right, but wraps logic ensures it doesn't stretch full width */
    flex-direction: column;
    align-items: flex-start;
  }

  @media (min-width: 771px) {
    justify-content: space-between;
  }
`;

const SearchBarWrapper = styled.div`
  position: relative;
  flex-grow: 1;
  max-width: 400px;

  @media (max-width: 770px) {
    width: 100%;
    max-width: none;
  }
`;

const SearchIconStyled = styled(SearchIcon)`
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  color: #339af0;
  font-size: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 12px 10px 38px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #339af0;
  }
`;

const AddButton = styled.button`
  padding: 8px 16px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    background-color: #1565c0;
  }

  @media (max-width: 770px) {
    width: 100%;
    
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px;
`;

const IconBox = styled(Box)`
  display: flex;
  gap: 10px;
`;

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: 10px;
  margin-top: 20px;
`;

const StyledTable = styled(Table)`
  min-width: 700px;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  th, td {
    padding: 14px 20px;
    text-align: left;
    font-size: 14px;
    white-space: nowrap;

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

const PaginationWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;
