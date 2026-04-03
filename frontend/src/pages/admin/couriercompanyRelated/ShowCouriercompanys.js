
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllCourierCompanies,
  deleteCourierCompany,
  updateCourierCompany,
} from '../../../redux/couriercompanyRelated/couriercompanyHandle';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { MenuItem, TextField } from '@mui/material';
import { getAllWallets } from '../../../redux/walletRelated/walletHandel';
import SearchIcon from '@mui/icons-material/Search';





import {
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
  Grid,
  Chip,
  Box,

} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';
import { getAllPlans } from '../../../redux/planRelated/planHandle';


const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:8000";

const ShowCourierCompanies = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { plansList, loading: planLoading } = useSelector((state) => state.plan);

  const { courierCompanies, loading } = useSelector((state) => state.couriercompany);

  const [viewCompany, setViewCompany] = useState(null);
  const [editCompany, setEditCompany] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [updateLoading, setUpdateLoading] = useState(false);

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSnackbarClose = () => setSnackbarOpen(false);
  const { allWallets } = useSelector(state => state.wallet);

  const [searchTerm, setSearchTerm] = useState('');




  useEffect(() => {
    dispatch(getAllPlans());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllCourierCompanies());
    dispatch(getAllWallets());
  }, [dispatch]);


  useEffect(() => {
    dispatch(getAllCourierCompanies());
  }, [dispatch]);

  const confirmDelete = () => {
    dispatch(deleteCourierCompany(confirmDeleteId))
      .then(() => {
        dispatch(getAllCourierCompanies());
        setSnackbarMessage('Courier company deleted successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      })
      .catch(() => {
        setSnackbarMessage('❌ Failed to delete courier company.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      })
      .finally(() => setConfirmDeleteId(null));
  };

  // const handleEditClick = (company) => {
  //   setEditCompany(company);
  //   setEditedValues(company);
  //   setFormErrors({});
  // };

  const handleEditClick = (company) => {
    setEditCompany(company);
    setEditedValues({
      ...company,
      // ensure shippingPlan is _id string, not object
      shippingPlan: company.shippingPlan?._id || company.shippingPlan || "",
    });
    setFormErrors({});
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setEditedValues((prev) => ({
        ...prev,
        [fieldName]: file,
      }));
      setFormErrors((prev) => ({ ...prev, [fieldName]: null }));
    }
  };

  const buildFormData = () => {
    const formData = new FormData();
    Object.entries(editedValues).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });
    return formData;
  };

  const handleUpdateSubmit = async () => {
    setFormErrors({});
    setUpdateLoading(true);
    try {
      const formData = buildFormData();
      const result = await dispatch(updateCourierCompany(editCompany._id, formData));
      const res = result.payload || result;
      if (res?.success) {
        setSnackbarMessage('Courier company updated successfully!');
        setSnackbarSeverity('success');
        setEditCompany(null);
        dispatch(getAllCourierCompanies());
      } else if (res.errors) {
        setFormErrors(res.errors);
        setSnackbarMessage('Validation errors. Please check the form.');
        setSnackbarSeverity('error');
      } else {
        setSnackbarMessage(res.message || 'Update failed. Try again.');
        setSnackbarSeverity('error');
      }
    } catch (error) {
      setSnackbarMessage(error.message || 'Update failed. Try again.');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
      setUpdateLoading(false);
    }
  };

  const getCourierBalance = (userId) => {
    const wallet = allWallets?.find(
      (wallet) => String(wallet.userId) === String(userId) && wallet.userModel === "CourierCompany"
    );
    return wallet?.balance ?? 0;
  };



  const renderTable = () => {
    if (loading) return <LoaderContainer><CircularProgress /></LoaderContainer>;
    if (!Array.isArray(courierCompanies)) return <p>❌ Invalid data</p>;
    if (courierCompanies.length === 0) return <p>No courier companies found.</p>;



    return (
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Owner Name</th>
              <th>GST No</th>
              <th>Bank Details</th>
              <th>Shipping Plan</th>
              <th>Balance</th>

              <th>Actions</th>

            </tr>
          </thead>
          <tbody>
            {courierCompanies
              .filter((company) => {
                const search = searchTerm.toLowerCase();
                return (
                  company.companyName?.toLowerCase().includes(search) ||
                  company.name?.toLowerCase().includes(search) ||
                  company.gstNo?.toLowerCase().includes(search) ||
                  company.shippingPlan?.name?.toLowerCase().includes(search)
                );
              }).map((company) => (
                <tr key={company._id}>
                  <td>{company.companyName}</td>
                  <td>{company.name}</td>
                  <td>{company.gstNo}</td>
                  <td>
                    {company.bankHolderName &&
                      company.bankName &&
                      company.accountNumber &&
                      company.ifscCode &&
                      company.cancelledChequeImage
                      ? '✅ Yes'
                      : '❌ No'}
                  </td>
                  <td>{company.shippingPlan?.name || "N/A"}</td>
                  <td>₹ {getCourierBalance(company._id)}</td>

                  <td>
                    <IconButton onClick={() => setViewCompany(company)}><VisibilityIcon color="primary" /></IconButton>
                    <IconButton onClick={() => handleEditClick(company)}><EditIcon color="secondary" /></IconButton>
                    <IconButton onClick={() => setConfirmDeleteId(company._id)}><DeleteIcon color="error" /></IconButton>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </TableWrapper>
    );
  };



  return (
    <Wrapper>

      <Header>
        <LeftSection>
          <h2>CourierCompany</h2>
        </LeftSection>

        <CenterSection>
          <SearchWrapper>
            <SearchIconStyled />
            <SearchInput
              type="text"
              placeholder="Search by company, owner, GST, plan..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </SearchWrapper>
        </CenterSection>

        <RightSection>
          <AddButton onClick={() => navigate('/Admin/addcouriercompany')}>
            + Add Company
          </AddButton>
        </RightSection>
      </Header>

      {renderTable()}

      {/* ✅ Confirm Delete Dialog */}
      <Dialog open={!!confirmDeleteId} onClose={() => setConfirmDeleteId(null)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this courier company?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteId(null)} color="inherit">Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>

      {/*  View */}
      <Dialog open={!!viewCompany} onClose={() => setViewCompany(null)} fullWidth maxWidth="md">
        <DialogTitle>
          Company Details
          <IconButton
            onClick={() => setViewCompany(null)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          {viewCompany && (
            <>
             
              <Grid container spacing={2}>
                {Object.entries({
                  'User ID': viewCompany.userId,
                  'Company Name': viewCompany.companyName,
                  'Owner Name': viewCompany.name,
                  'Contact Number': viewCompany.contactNo,
                  'GST Number': viewCompany.gstNo,
                  'PAN Card Number': viewCompany.panCardNo,
                  'Aadhar Number': viewCompany.aadharNo,
                  Address: viewCompany.address,
                  City: viewCompany.city,
                  State: viewCompany.state,
                  Pincode: viewCompany.pincode,
                  'Remittance Preference': viewCompany.remittancePreference,
                  'COD Plan': viewCompany.codPlan,
                  'Shipping Plan': viewCompany.shippingPlan?.name || 'N/A',
                }).map(([key, value]) => (
                  <Grid item xs={12} sm={6} key={key}>
                    <Box sx={{
                      border: '1px solid #e0e0e0',
                      borderRadius: 2,
                      p: 2,
                      height: '100%'
                    }}>
                      <Typography variant="body2" color="text.secondary" fontWeight={500}>
                        {key}
                      </Typography>
                      <Typography variant="body1" fontWeight={400} color="text.primary">
                        {value}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              
              <Typography variant="h6" fontWeight={600} sx={{ mt: 4, mb: 2 }}>
                Bank Details
              </Typography>
              <Grid container spacing={2}>
                {Object.entries({
                  'Bank Holder Name': viewCompany.bankHolderName,
                  'Bank Name': viewCompany.bankName,
                  'Account Number': viewCompany.accountNumber,
                  'IFSC Code': viewCompany.ifscCode,
                }).map(([key, value]) => (
                  <Grid item xs={12} sm={6} key={key}>
                    <Box sx={{
                      border: '1px solid #e0e0e0',
                      borderRadius: 2,
                      p: 2,
                      height: '100%'
                    }}>
                      <Typography variant="body2" color="text.secondary" fontWeight={500}>
                        {key}
                      </Typography>
                      <Typography variant="body1" fontWeight={400} color="text.primary">
                        {value}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

             
              <Typography variant="h6" fontWeight={600} sx={{ mt: 4, mb: 2 }}>
                Uploaded Documents
              </Typography>
              <Grid container spacing={2}>
                {[
                  { label: 'Company Logo', url: viewCompany.companyLogo },
                  { label: 'ID Proof', url: viewCompany.idProof },
                  { label: 'Cancelled Cheque Image', url: viewCompany.cancelledChequeImage }
                ].map(({ label, url }) => {
                  
                  const fullUrl = url?.startsWith("http")
                    ? url
                    : `${BASE_URL}/uploads/${url?.split('uploads/')[1]?.replace(/\\/g, "/")}`;

                  return (
                    <Grid item xs={12} sm={4} key={label}>
                      <Box sx={{
                        border: '1px solid #e0e0e0',
                        borderRadius: 2,
                        p: 2,
                        textAlign: 'center'
                      }}>
                        <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
                          {label}
                        </Typography>
                        {url ? (
                          <a href={fullUrl} target="_blank" rel="noopener noreferrer">
                            <img
                              src={fullUrl}
                              alt={label}
                              style={{
                                height: 100,
                                borderRadius: 8,
                                border: '1px solid #ccc',
                                objectFit: 'cover',
                              }}
                            />
                          </a>
                        ) : (
                          <Chip label="Not Uploaded" color="error" size="small" />
                        )}
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </>
          )}
        </DialogContent>
      </Dialog>


      {/* Edit Dialog */}
      <Dialog open={!!editCompany} onClose={() => setEditCompany(null)} fullWidth maxWidth="md">
        <DialogTitle>
          Edit Company
          <IconButton onClick={() => setEditCompany(null)} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {editCompany && (
            <Grid container spacing={2}>
              {[
                { label: 'User ID', name: 'userId', disabled: true },
                { label: 'Company Name', name: 'companyName' },
                { label: 'Owner Name', name: 'name' },
                { label: 'Contact Number', name: 'contactNo' },
                { label: 'GST Number', name: 'gstNo' },
                { label: 'PAN Card Number', name: 'panCardNo' },
                { label: 'Aadhar Number', name: 'aadharNo' },
                { label: 'Address', name: 'address' },
                { label: 'City', name: 'city' },
                { label: 'State', name: 'state' },
                { label: 'Pincode', name: 'pincode' },
                { label: 'Remittance Preference', name: 'remittancePreference' },
                { label: 'COD Plan', name: 'codPlan' },
                { label: 'Shipping Plan', name: 'shippingPlan' },
                { label: 'Bank Holder Name', name: 'bankHolderName' },
                { label: 'Bank Name', name: 'bankName' },
                { label: 'Account Number', name: 'accountNumber' },
                { label: 'IFSC Code', name: 'ifscCode' },
              ].map(({ label, name, disabled }) => (
                <Grid item xs={12} sm={6} key={name}>
                  <Box sx={{ border: '1px solid #e0e0e0', borderRadius: 2, p: 2 }}>
                    <Typography variant="body2" fontWeight={500} mb={1}>
                      {label}
                    </Typography>

                    {name === 'shippingPlan' ? (
                      <TextField
                        select
                        name={name}
                        value={editedValues[name] || ''}   // <-- ab hamesha _id string aayega
                        onChange={handleChange}
                        fullWidth
                        size="small"
                        error={!!formErrors[name]}
                        helperText={formErrors[name]}
                      >
                        <MenuItem value="" disabled hidden>Select a plan</MenuItem>
                        {planLoading ? (
                          <MenuItem disabled>Loading plans...</MenuItem>
                        ) : (
                          plansList.map((plan) => (
                            <MenuItem key={plan._id} value={plan._id}>
                              {plan.name}
                            </MenuItem>
                          ))
                        )}
                      </TextField>
                    ) : (
                      <TextField
                        name={name}
                        value={editedValues[name] || ''}
                        onChange={handleChange}
                        fullWidth
                        disabled={disabled}
                        size="small"
                        error={!!formErrors[name]}
                        helperText={formErrors[name]}
                      />
                    )}


                  </Box>
                </Grid>
              ))}

              {/* File Uploads */}
              {[
                { label: 'Company Logo', name: 'companyLogo' },
                { label: 'ID Proof', name: 'idProof' },
                { label: 'Cancelled Cheque Image', name: 'cancelledChequeImage' },
              ].map(({ label, name }) => (
                <Grid item xs={12} sm={6} key={name}>
                  <Box sx={{ border: '1px solid #e0e0e0', borderRadius: 2, p: 2 }}>
                    <Typography variant="body2" fontWeight={500} mb={1}>
                      {label}
                    </Typography>
                    <input
                      type="file"
                      accept="image/*"
                      name={name}
                      onChange={(e) => handleFileChange(e, name)}
                      style={{ marginBottom: 4 }}
                    />
                    {formErrors[name] && (
                      <Typography color="error" variant="caption" display="block" mb={1}>
                        {formErrors[name]}
                      </Typography>
                    )}
                    {editedValues[name] && typeof editedValues[name] === 'string' && (
                      <Box mt={1}>
                        <img
                          src={
                            editedValues[name].startsWith('http')
                              ? editedValues[name]
                              : `${BASE_URL}/${editedValues[name]}`
                          }
                          alt={label}
                          style={{
                            height: 80,
                            borderRadius: 8,
                            border: '1px solid #ccc',
                            objectFit: 'cover',
                          }}
                        />
                      </Box>
                    )}
                    {editedValues[name] instanceof File && (
                      <Box mt={1}>
                        <img
                          src={URL.createObjectURL(editedValues[name])}
                          alt={label}
                          style={{
                            height: 80,
                            borderRadius: 8,
                            border: '1px solid #ccc',
                            objectFit: 'cover',
                          }}
                        />
                      </Box>
                    )}
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button variant="contained" color="primary" onClick={handleUpdateSubmit}>
            Update
          </Button>
        </DialogActions>
      </Dialog>


      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%', fontWeight: 500, fontSize: '1rem', borderRadius: '8px' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

    </Wrapper>
  );
};

export default ShowCourierCompanies;

// ✅ Responsive Styled Components
const Wrapper = styled.div`
  padding: 2rem;
  max-width: 1500px;
  margin: auto;
  background: #f8f9fa;
  min-height: 100vh;
`;



const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;



const TableWrapper = styled.div`
  overflow-x: auto;
  width: 100%;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  th, td {
    padding: 14px 20px;
    text-align: left;
    border-bottom: 1px solid #dee2e6;
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

const SearchBarWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
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
  display: flex;               /* make it flex container */
  justify-content: center;     /* center child horizontally */
  min-width: 200px;

  

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;  /* align left on small */
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

