// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllCust, deleteCust, updateCust } from '../../../redux/custRelated/custHandle';
// import { getAllWallets } from '../../../redux/walletRelated/walletHandel';

// import {
//   CircularProgress,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   Typography,
//   TextField,
//   DialogActions,
//   Button,
//   Grid,
//   Alert,
//   Snackbar,
//   Box,
//   Pagination,
// } from '@mui/material';

// import CloseIcon from '@mui/icons-material/Close';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import SearchIcon from '@mui/icons-material/Search';

// import dayjs from 'dayjs';
// import styled from 'styled-components';

// const ShowCustomers = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { custList, loading } = useSelector((state) => state.cust);
//   const { allWallets } = useSelector((state) => state.wallet);

//   const [viewCustomer, setViewCustomer] = useState(null);
//   const [editCustomer, setEditCustomer] = useState(null);
//   const [editedValues, setEditedValues] = useState({});
//   const [formErrors, setFormErrors] = useState({});
//   const [updateLoading, setUpdateLoading] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState('success');
//   const [confirmDeleteId, setConfirmDeleteId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     dispatch(getAllCust());
//     dispatch(getAllWallets());
//   }, [dispatch]);

//   const openConfirmDialog = (id) => setConfirmDeleteId(id);
//   const closeConfirmDialog = () => setConfirmDeleteId(null);

//   const confirmDelete = () => {
//     dispatch(deleteCust(confirmDeleteId))
//       .then(() => {
//         dispatch(getAllCust());
//         setSnackbarMessage('Customer deleted successfully!');
//         setSnackbarSeverity('success');
//         setSnackbarOpen(true);
//       })
//       .catch(() => {
//         setSnackbarMessage('❌ Failed to delete customer.');
//         setSnackbarSeverity('error');
//         setSnackbarOpen(true);
//       })
//       .finally(() => closeConfirmDialog());
//   };

//   const handleEditClick = (cust) => {
//     setEditCustomer(cust);
//     setEditedValues(cust);
//     setFormErrors({});
//     setSnackbarOpen(false);
//   };

//   const handleChange = (e) => {
//     setEditedValues({ ...editedValues, [e.target.name]: e.target.value });
//     setFormErrors((prev) => ({ ...prev, [e.target.name]: '' }));
//   };

//   const validateForm = () => {
//     const errors = {};
//     if (!editedValues.firstName?.trim()) errors.firstName = 'First name is required';
//     if (!editedValues.lastName?.trim()) errors.lastName = 'Last name is required';
//     if (!editedValues.email?.trim()) errors.email = 'Email is required';
//     else if (!/\S+@\S+\.\S+/.test(editedValues.email)) errors.email = 'Invalid email';
//     if (!editedValues.phoneNumber?.trim()) errors.phoneNumber = 'Phone number is required';
//     else if (!/^\d{10,15}$/.test(editedValues.phoneNumber)) errors.phoneNumber = 'Phone number must be 10-15 digits';
//     if (!editedValues.gender?.trim()) errors.gender = 'Gender is required';
//     if (!editedValues.birthDate?.trim()) errors.birthDate = 'Birth date is required';


//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleUpdateSubmit = async () => {
//     if (!validateForm()) return;
//     setUpdateLoading(true);
//     try {
//       const actionResult = await dispatch(updateCust(editCustomer._id, editedValues));
//       const response = actionResult.payload || actionResult;

//       if (response?.success) {
//         setSnackbarMessage('Customer updated successfully!');
//         setSnackbarSeverity('success');
//         setEditCustomer(null);
//         dispatch(getAllCust());
//       } else {
//         setSnackbarMessage(response.message || 'Update failed.');
//         setSnackbarSeverity('error');
//       }
//     } catch (error) {
//       setSnackbarMessage(error.message || 'Update failed.');
//       setSnackbarSeverity('error');
//     } finally {
//       setSnackbarOpen(true);
//       setUpdateLoading(false);
//     }
//   };

//   const getCustomerBalance = (userId) => {
//     const wallet = allWallets?.find(
//       (wallet) => String(wallet.userId) === String(userId) && wallet.userModel === "Customer"
//     );
//     return wallet?.balance ?? 0;
//   };

//   const handleSnackbarClose = (_, reason) => {
//     if (reason === 'clickaway') return;
//     setSnackbarOpen(false);
//   };

//   const filteredCustomers = custList?.filter((cust) => {
//     const search = searchTerm.toLowerCase();
//     return (
//       cust.firstName?.toLowerCase().includes(search) ||
//       cust.lastName?.toLowerCase().includes(search) ||
//       cust.phoneNumber?.toLowerCase().includes(search) ||
//       cust.gender?.toLowerCase().includes(search)
//     );
//   }) || [];

//   const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
//   const paginatedCustomers = filteredCustomers.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handlePageChange = (_, value) => setCurrentPage(value);

//   return (
//     <Wrapper>
//       <Header>
//         <LeftSection><h2>Customers</h2></LeftSection>
//         <CenterSection>
//           <SearchWrapper>
//             <SearchIconStyled />
//             <SearchInput
//               type="text"
//               placeholder="Search by name, phone, gender..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </SearchWrapper>
//         </CenterSection>
//         <RightSection>
//           <AddButton onClick={() => navigate('/Admin/addcust')}>+ Add Customer</AddButton>
//         </RightSection>
//       </Header>


//       {loading ? (
//         <LoaderContainer><CircularProgress /></LoaderContainer>
//       ) : (
//         <>
//           <TableWrapper>
//             <Table>
//               <thead>
//                 <tr>
//                   <th>First Name</th><th>Last Name</th><th>Gender</th><th>Email</th><th>Phone</th><th>Balance</th><th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paginatedCustomers.map((cust) => (
//                   <tr key={cust._id}>
//                     <td>{cust.firstName}</td>
//                     <td>{cust.lastName}</td>
//                     <td>{cust.gender}</td>
//                     <td>{cust.email}</td>
//                     <td>{cust.phoneNumber}</td>
//                     <td>₹ {Number(getCustomerBalance(cust._id)).toFixed(2)}</td>
//                     <td>
//                       <IconButton onClick={() => setViewCustomer(cust)}><VisibilityIcon color="primary" /></IconButton>
//                       <IconButton onClick={() => handleEditClick(cust)}><EditIcon color="secondary" /></IconButton>
//                       <IconButton onClick={() => openConfirmDialog(cust._id)}><DeleteIcon color="error" /></IconButton>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </TableWrapper>

//           {totalPages > 1 && (
//             <PaginationWrapper>
//               <Pagination
//                 count={totalPages}
//                 page={currentPage}
//                 onChange={handlePageChange}
//                 color="primary"
//                 shape="rounded"
//                 size="medium"
//               />
//             </PaginationWrapper>
//           )}
//         </>
//       )}


//       {/* View Dialog */}
//       <Dialog
//         open={!!viewCustomer}
//         onClose={() => setViewCustomer(null)}
//         fullWidth
//         maxWidth="md"
//         sx={{
//           '& .MuiDialog-paper': {
//             borderRadius: 4,
//             boxShadow: 6,
//             padding: 1,
//             width: '700px'
//           }
//         }}
//       >
//         <DialogTitle sx={{ fontWeight: 600, fontSize: '1.5rem', position: 'relative', pr: 6 }}>
//           Customer Details
//           <IconButton
//             onClick={() => setViewCustomer(null)}
//             sx={{
//               position: 'absolute',
//               right: 8,
//               top: 8,
//               color: 'grey.500'
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>

//         <DialogContent dividers>
//           {viewCustomer && (
//             <Grid container spacing={3}>
//               {[
//                 'firstName',
//                 'lastName',
//                 'email',
//                 'phoneNumber',
//                 'gender',
//                 'birthDate'
//               ].map((key) => (
//                 viewCustomer[key] && (
//                   <Grid item xs={12} sm={6} key={key}>
//                     <Typography variant="subtitle2" color="text.secondary">
//                       {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
//                     </Typography>
//                     <Typography variant="body1" fontWeight={500}>
//                       {key === 'birthDate'
//                         ? dayjs(viewCustomer[key]).format('DD/MM/YYYY')
//                         : String(viewCustomer[key])}
//                     </Typography>
//                   </Grid>

//                 )
//               ))}
//             </Grid>
//           )}
//         </DialogContent>
//       </Dialog>



//       {/* Edit Dialog */}
//       <Dialog
//         open={!!editCustomer}
//         onClose={() => setEditCustomer(null)}
//         fullWidth
//         maxWidth="md"
//         sx={{
//           '& .MuiDialog-paper': {
//             borderRadius: 4,
//             boxShadow: 6,
//             padding: 1,
//             width: '700px',
//           },
//         }}
//       >


//         <DialogTitle sx={{ fontWeight: 600, fontSize: '1.5rem', position: 'relative', pr: 6 }}>
//           Edit Customer
//           <IconButton
//             onClick={() => setEditCustomer(null)}
//             sx={{
//               position: 'absolute',
//               right: 8,
//               top: 8,
//               color: 'grey.600',
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>

//         <DialogContent  sx={{ px: 4, py: 3 }}>

//            {snackbarOpen && snackbarSeverity === 'error' && (
//           <Box
//             sx={{
//               display: 'flex',
//               justifyContent: 'center',
//               mb: 2,
//             }}
//           >
//             <Typography
//               sx={{
//                 color: 'red',
//                 fontWeight: 500,
//                 fontSize: '1rem',
//                 textAlign: 'center',
//               }}
//             >
//               {snackbarMessage}
//             </Typography>
//           </Box>
//         )}

//           {editCustomer && (
//             <Grid container spacing={3}>
//               {/** Map through each field to apply the same label-above-input style */}
//               <Grid item xs={12} sm={6}>
//                 <Box sx={{ mb: 1, fontWeight: 600, fontSize: '0.9rem', color: formErrors.firstName ? 'error.main' : 'text.primary' }}>
//                   First Name
//                 </Box>
//                 <TextField
//                   name="firstName"
//                   value={editedValues.firstName || ''}
//                   onChange={handleChange}
//                   fullWidth
//                   variant="outlined"
//                   error={!!formErrors.firstName}
//                   helperText={formErrors.firstName}
//                   label="" // remove default label to prevent double labels
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <Box sx={{ mb: 1, fontWeight: 600, fontSize: '0.9rem', color: formErrors.lastName ? 'error.main' : 'text.primary' }}>
//                   Last Name
//                 </Box>
//                 <TextField
//                   name="lastName"
//                   value={editedValues.lastName || ''}
//                   onChange={handleChange}
//                   fullWidth
//                   variant="outlined"
//                   error={!!formErrors.lastName}
//                   helperText={formErrors.lastName}
//                   label=""
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <Box sx={{ mb: 1, fontWeight: 600, fontSize: '0.9rem', color: formErrors.gender ? 'error.main' : 'text.primary' }}>
//                   Gender
//                 </Box>
//                 <TextField
//                   name="gender"
//                   value={editedValues.gender || ''}
//                   onChange={handleChange}
//                   fullWidth
//                   variant="outlined"
//                   error={!!formErrors.gender}
//                   helperText={formErrors.gender}
//                   label=""
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <Box sx={{ mb: 1, fontWeight: 600, fontSize: '0.9rem', color: formErrors.birthDate ? 'error.main' : 'text.primary' }}>
//                   Birth Date
//                 </Box>
//                 <TextField
//                   type="date"
//                   name="birthDate"
//                   value={editedValues.birthDate?.slice(0, 10) || ''}
//                   onChange={handleChange}
//                   fullWidth
//                   variant="outlined"
//                   InputLabelProps={{ shrink: true }}
//                   error={!!formErrors.birthDate}
//                   helperText={formErrors.birthDate}
//                   label=""
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <Box sx={{ mb: 1, fontWeight: 600, fontSize: '0.9rem', color: formErrors.email ? 'error.main' : 'text.primary' }}>
//                   Email
//                 </Box>
//                 <TextField
//                   name="email"
//                   value={editedValues.email || ''}
//                   onChange={handleChange}
//                   fullWidth
//                   variant="outlined"
//                   error={!!formErrors.email}
//                   helperText={formErrors.email}
//                   label=""
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <Box sx={{ mb: 1, fontWeight: 600, fontSize: '0.9rem', color: formErrors.phoneNumber ? 'error.main' : 'text.primary' }}>
//                   Phone Number
//                 </Box>
//                 <TextField
//                   name="phoneNumber"
//                   value={editedValues.phoneNumber || ''}
//                   onChange={handleChange}
//                   fullWidth
//                   variant="outlined"
//                   error={!!formErrors.phoneNumber}
//                   helperText={formErrors.phoneNumber}
//                   label=""
//                 />
//               </Grid>
//             </Grid>
//           )}
//         </DialogContent>

//         <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
//           <Button variant="contained" color="primary" onClick={handleUpdateSubmit} disabled={updateLoading}>
//             {updateLoading ? <CircularProgress size={24} /> : 'Update'}
//           </Button>
//         </DialogActions>
//       </Dialog>


//       <Snackbar
//         open={snackbarOpen && snackbarSeverity === 'success'}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity="success"
//           variant="standard"
//           sx={{
//             width: '100%',
//             fontWeight: 500,
//             fontSize: '1rem',
//             backgroundColor: 'green',
//             boxShadow: 'none',
//             border: 'white',
//             color: 'white',
//             borderRadius: '8px',
//             boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
//             padding: '0 16px',
//           }}
//           icon={false}
//         >
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>

//       {/* delete confirm  */}
//       <Dialog open={!!confirmDeleteId} onClose={closeConfirmDialog}>
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>Are you sure you want to delete this customer?</DialogContent>
//         <DialogActions>
//           <Button onClick={closeConfirmDialog} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={confirmDelete} color="error" variant="contained">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>




//     </Wrapper>
//   );
// };

// export default ShowCustomers;

// const Wrapper = styled.div`
//   padding: 2rem;
//   max-width: 1500px;
//   margin: auto;
//   background: #ffffff;
//   min-height: 100vh;
//   overflow-y: auto;
//   box-sizing: border-box;
//   display: flex;
//   flex-direction: column;

//   @media (max-width: 768px) {
//     padding: 1rem;
//   }
// `;








// const TableWrapper = styled.div`
//   width: 100%;
//   overflow-x: auto;
// `;

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   background: white;
//   border-radius: 10px;
//   overflow: hidden;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

//   /* Prevent content from collapsing on smaller screens */
//   min-width: 1000px;

//   th, td {
//     padding: 14px 20px;
//     text-align: left;
//     border-bottom: 1px solid #dee2e6;
//     font-size: 14px;
//   }

//   th {
//     background-color: #f1f3f5;
//     font-weight: 600;
//   }

//   tr:hover {
//     background-color: #f8f9fa;
//   }
// `;



// const PaginationWrapper = styled.div`
//   margin-top: 20px;
//   display: flex;
//   justify-content: center;
// `;

// const LoaderContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-top: 50px;
// `;


// const Header = styled.div`
//   display: flex;
//   flex-wrap: wrap;      /* allow wrap when no space */
//   align-items: center;  /* vertically center on big screens */
//   justify-content: flex-start;
//   gap: 1rem;
//   margin-bottom: 25px;

//   @media (max-width: 768px) {
//     flex-direction: column;   /* stack vertically on small */
//     align-items: flex-start;  /* left align all items */
//   }
// `;

// const LeftSection = styled.div`
//   flex-shrink: 0;        /* prevent shrinking */
// `;

// const CenterSection = styled.div`
//   flex-grow: 1;
//   display: flex;               /* make it flex container */
//   justify-content: center;     /* center child horizontally */
//   min-width: 200px;

//   @media (max-width: 768px) {
//     width: 100%;
//     justify-content: flex-start;  /* align left on small */
//   }
// `;

// const RightSection = styled.div`
//   flex-shrink: 0;        /* prevent shrinking */

//   @media (max-width: 768px) {
//     width: 100%;         /* full width on small */
//   }
// `;

// const SearchWrapper = styled.div`
//   width: 50%;                  /* half width on large screens */

//   @media (max-width: 768px) {
//     width: 100%;               /* full width on small */
//   }

//   position: relative;
// `;

// const SearchInput = styled.input`
//    width: 100%;
//   padding: 8px 12px 8px 36px;
//   font-size: 14px;
//   border: 1px solid #ccc;
//   border-radius: 6px;
//   outline: none;
//   &:focus { border-color: #339af0; }

//   &:focus {
//     border-color: #339af0;
//     outline: none;
//   }
// `;

// const SearchIconStyled = styled(SearchIcon)`
//   position: absolute;
//   left: 10px;
//   top: 50%;
//   transform: translateY(-50%);
//   color: #339af0;
//   font-size: 20px;
// `;

// const AddButton = styled.button`
//   background-color: #1976d2;
//   color: white;
//   border: none;
//   padding: 10px 20px;
//   font-weight: bold;
//   border-radius: 6px;
//   cursor: pointer;
//   white-space: nowrap;

//   &:hover {
//     background-color: #1c7ed6;
//   }

//   @media (max-width: 768px) {
//     width: 100%;       /* full width button on small */
//   }
// `;






import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCust, deleteCust, updateCust } from '../../../redux/custRelated/custHandle';
import { getAllWallets } from '../../../redux/walletRelated/walletHandel';
import {
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  TextField,
  DialogActions,
  Button,
  Grid,
  Alert,
  Snackbar,
  Box,
  Pagination,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import dayjs from 'dayjs';
import styled from 'styled-components';

const ShowCustomers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { custList, loading } = useSelector((state) => state.cust);
  const { allWallets } = useSelector((state) => state.wallet);

  const [viewCustomer, setViewCustomer] = useState(null);
  const [editCustomer, setEditCustomer] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [updateLoading, setUpdateLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(getAllCust());
    dispatch(getAllWallets());
  }, [dispatch]);

  const openConfirmDialog = (id) => setConfirmDeleteId(id);
  const closeConfirmDialog = () => setConfirmDeleteId(null);

  const confirmDelete = () => {
    dispatch(deleteCust(confirmDeleteId))
      .then(() => {
        dispatch(getAllCust());
        setSnackbarMessage('Customer deleted successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      })
      .catch(() => {
        setSnackbarMessage('❌ Failed to delete customer.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      })
      .finally(() => closeConfirmDialog());
  };

  const handleEditClick = (cust) => {
    setEditCustomer(cust);
    setEditedValues(cust);
    setFormErrors({});
    setSnackbarOpen(false);
  };

  const handleChange = (e) => {
    setEditedValues({ ...editedValues, [e.target.name]: e.target.value });
    setFormErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const validateForm = () => {
    const errors = {};
    if (!editedValues.firstName?.trim()) errors.firstName = 'First name is required';
    if (!editedValues.lastName?.trim()) errors.lastName = 'Last name is required';
    if (!editedValues.email?.trim()) {
      errors.email = 'Email is required';
    } else if (/[A-Z]/.test(editedValues.email)) {
      errors.email = 'Capital letters not allowed in email';
    } else if (!/\S+@\S+\.\S+/.test(editedValues.email)) {
      errors.email = 'Invalid email';
    }
    if (!editedValues.phoneNumber?.trim()) errors.phoneNumber = 'Phone number is required';
    else if (!/^\d{10,15}$/.test(editedValues.phoneNumber)) errors.phoneNumber = 'Phone number must be 10-15 digits';
    if (!editedValues.gender?.trim()) errors.gender = 'Gender is required';
    if (!editedValues.birthDate?.trim()) errors.birthDate = 'Birth date is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdateSubmit = async () => {
    if (!validateForm()) return;
    setUpdateLoading(true);
    try {
      const actionResult = await dispatch(updateCust(editCustomer._id, editedValues));
      const response = actionResult.payload || actionResult;

      if (response?.success) {
        setSnackbarMessage('Customer updated successfully!');
        setSnackbarSeverity('success');
        setEditCustomer(null);
        dispatch(getAllCust());
      } else {
        setSnackbarMessage(response.message || 'Update failed.');
        setSnackbarSeverity('error');
      }
    } catch (error) {
      setSnackbarMessage(error.message || 'Update failed.');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
      setUpdateLoading(false);
    }
  };

  const getCustomerBalance = (userId) => {
    const wallet = allWallets?.find(
      (wallet) => String(wallet.userId) === String(userId) && wallet.userModel === 'Customer'
    );
    return wallet?.balance ?? 0;
  };

  const handleSnackbarClose = (_, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  // ✅ Ensure new customers appear on top
  const sortedCustomers = [...(custList || [])].reverse();

  const filteredCustomers = sortedCustomers.filter((cust) => {
    const search = searchTerm.toLowerCase();
    return (
      cust.firstName?.toLowerCase().includes(search) ||
      cust.lastName?.toLowerCase().includes(search) ||
      cust.phoneNumber?.toLowerCase().includes(search) ||
      cust.gender?.toLowerCase().includes(search)
    );
  });

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (_, value) => setCurrentPage(value);

  // ✅ FIX: Reset to first page when searching
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <Wrapper>
      <Header>
        <LeftSection><h2>Customers</h2></LeftSection>
        <CenterSection>
          <SearchWrapper>
            <SearchIconStyled />
            <SearchInput
              type="text"
              placeholder="Search by name, phone, gender..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </SearchWrapper>
        </CenterSection>
        <RightSection>
          <AddButton onClick={() => navigate('/Admin/addcust')}>+ Add Customer</AddButton>
        </RightSection>
      </Header>

      {loading ? (
        <LoaderContainer><CircularProgress /></LoaderContainer>
      ) : (
        <>
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Balance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCustomers.map((cust) => (
                  <tr key={cust._id}>
                    <td>{cust.firstName}</td>
                    <td>{cust.lastName}</td>
                    <td>{cust.gender}</td>
                    <td>{cust.email}</td>
                    <td>{cust.phoneNumber}</td>
                    <td>₹ {Number(getCustomerBalance(cust._id)).toFixed(2)}</td>
                    <td>
                      <IconButton onClick={() => setViewCustomer(cust)}><VisibilityIcon color="primary" /></IconButton>
                      <IconButton onClick={() => handleEditClick(cust)}><EditIcon color="secondary" /></IconButton>
                      <IconButton onClick={() => openConfirmDialog(cust._id)}><DeleteIcon color="error" /></IconButton>
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
        </>
      )}


      {/* View Dialog */}
      <Dialog
        open={!!viewCustomer}
        onClose={() => setViewCustomer(null)}
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
          Customer Details
          <IconButton
            onClick={() => setViewCustomer(null)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'grey.500'
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          {viewCustomer && (
            <Grid container spacing={3}>
              {[
                'firstName',
                'lastName',
                'email',
                'phoneNumber',
                'gender',
                'birthDate'
              ].map((key) => (
                viewCustomer[key] && (
                  <Grid item xs={12} sm={6} key={key}>
                    <Typography variant="subtitle2" color="text.secondary">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {key === 'birthDate'
                        ? dayjs(viewCustomer[key]).format('DD/MM/YYYY')
                        : String(viewCustomer[key])}
                    </Typography>
                  </Grid>

                )
              ))}
            </Grid>
          )}
        </DialogContent>
      </Dialog>



      {/* Edit Dialog */}
      <Dialog
        open={!!editCustomer}
        onClose={() => setEditCustomer(null)}
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


        <DialogTitle sx={{ fontWeight: 600, fontSize: '1.5rem', position: 'relative', pr: 6 }}>
          Edit Customer
          <IconButton
            onClick={() => setEditCustomer(null)}
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

          {snackbarOpen && snackbarSeverity === 'error' && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  color: 'red',
                  fontWeight: 500,
                  fontSize: '1rem',
                  textAlign: 'center',
                }}
              >
                {snackbarMessage}
              </Typography>
            </Box>
          )}

          {editCustomer && (
            <Grid container spacing={3}>
              {/** Map through each field to apply the same label-above-input style */}
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 1, fontWeight: 600, fontSize: '0.9rem', color: formErrors.firstName ? 'error.main' : 'text.primary' }}>
                  First Name
                </Box>
                <TextField
                  name="firstName"
                  value={editedValues.firstName || ''}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  error={!!formErrors.firstName}
                  helperText={formErrors.firstName}
                  label="" // remove default label to prevent double labels
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 1, fontWeight: 600, fontSize: '0.9rem', color: formErrors.lastName ? 'error.main' : 'text.primary' }}>
                  Last Name
                </Box>
                <TextField
                  name="lastName"
                  value={editedValues.lastName || ''}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  error={!!formErrors.lastName}
                  helperText={formErrors.lastName}
                  label=""
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 1, fontWeight: 600, fontSize: '0.9rem', color: formErrors.gender ? 'error.main' : 'text.primary' }}>
                  Gender
                </Box>
                <TextField
                  name="gender"
                  value={editedValues.gender || ''}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  error={!!formErrors.gender}
                  helperText={formErrors.gender}
                  label=""
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 1, fontWeight: 600, fontSize: '0.9rem', color: formErrors.birthDate ? 'error.main' : 'text.primary' }}>
                  Birth Date
                </Box>
                <TextField
                  type="date"
                  name="birthDate"
                  value={editedValues.birthDate?.slice(0, 10) || ''}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  error={!!formErrors.birthDate}
                  helperText={formErrors.birthDate}
                  label=""
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 1, fontWeight: 600, fontSize: '0.9rem', color: formErrors.email ? 'error.main' : 'text.primary' }}>
                  Email
                </Box>
                <TextField
                  name="email"
                  value={editedValues.email || ''}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                  label=""
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 1, fontWeight: 600, fontSize: '0.9rem', color: formErrors.phoneNumber ? 'error.main' : 'text.primary' }}>
                  Phone Number
                </Box>
                <TextField
                  name="phoneNumber"
                  value={editedValues.phoneNumber || ''}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  error={!!formErrors.phoneNumber}
                  helperText={formErrors.phoneNumber}
                  label=""
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button variant="contained" color="primary" onClick={handleUpdateSubmit} disabled={updateLoading}>
            {updateLoading ? <CircularProgress size={24} /> : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>


      <Snackbar
        open={snackbarOpen && snackbarSeverity === 'success'}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="standard"
          sx={{
            width: '100%',
            fontWeight: 500,
            fontSize: '1rem',
            backgroundColor: 'green',
            boxShadow: 'none',
            border: 'white',
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

      {/* delete confirm  */}
      <Dialog open={!!confirmDeleteId} onClose={closeConfirmDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this customer?</DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>


    </Wrapper>
  );
};

export default ShowCustomers;

/* ---------- Styled Components (unchanged) ---------- */
const Wrapper = styled.div`
  padding: 2rem;
  max-width: 1500px;
  margin: auto;
  background: #ffffff;
  min-height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  min-width: 1000px;
  th, td {
    padding: 14px 20px;
    text-align: left;
    border-bottom: 1px solid #dee2e6;
    font-size: 14px;
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

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  margin-bottom: 25px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const LeftSection = styled.div`
  flex-shrink: 0;
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
  flex-shrink: 0;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchWrapper = styled.div`
  width: 50%;
  position: relative;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 12px 8px 36px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  &:focus { border-color: #339af0; }
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
  &:hover { background-color: #1c7ed6; }
  @media (max-width: 768px) {
    width: 100%;
  }
`;




