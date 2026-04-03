// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   getAllCourierRates,
//   deleteCourierRate,
//   updateCourierRate,
// } from '../../../redux/courierrateRelated/courierrateHandle';
// import { useNavigate } from 'react-router-dom';
// import SearchIcon from '@mui/icons-material/Search';


// import {
//   CircularProgress,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Typography,
//   Grid,
//   TextField,
//   Box
// } from '@mui/material';

// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import CloseIcon from '@mui/icons-material/Close';
// import styled from 'styled-components';


// const ShowCourierRates = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { courierRates, loading } = useSelector((state) => state.courierRate);

//   const [viewRate, setViewRate] = useState(null);
//   const [editRate, setEditRate] = useState(null);
//   const [editedValues, setEditedValues] = useState({});

//   const [showB2B, setShowB2B] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');


//   useEffect(() => {
//     if (!showB2B) {
//       dispatch(getAllCourierRates());
//     }
//   }, [dispatch, showB2B]);

//   const handleDelete = (id) => {
//     dispatch(deleteCourierRate(id)).then(() => dispatch(getAllCourierRates()));
//   };

//   const handleEditClick = (rate) => {
//     setEditRate(rate);
//     setEditedValues(rate);
//   };

//   const handleChange = (e) => {
//     setEditedValues({
//       ...editedValues,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleUpdateSubmit = async () => {
//     try {
//       await dispatch(updateCourierRate(editRate._id, editedValues));
//       setEditRate(null);
//       dispatch(getAllCourierRates());
//     } catch (error) {
//       console.error('Update failed:', error);
//     }
//   };

//   const handleToggleClick = (type) => {
//     if (type === 'b2b') {
//       setShowB2B(true);
//       navigate('/Admin/b2bcourierrates');
//     } else {
//       setShowB2B(false);
//       navigate('/Admin/showcourierrates');
//     }
//   };

//   const filteredRates = courierRates?.filter((rate) =>
//     rate.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
//   );


//   const renderTable = () => {
//     if (loading) return <LoaderContainer><CircularProgress /></LoaderContainer>;
//     if (!Array.isArray(courierRates)) return <p>❌ Invalid data format</p>;
//     if (courierRates.length === 0) return <p>No courier rates found.</p>;

//     return (
//       <Table>
//         <thead>
//           <tr>
//             <th>Company</th>
//             <th>Service Type</th>
//             <th>Mode</th>
//             <th>Min Weight</th>
//             <th>COD Charge</th>
//             <th>Fuel Surcharge</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredRates.map((rate) => (
//             <tr key={rate._id}>
//               <td>{rate.companyName}</td>
//               <td>{rate.serviceType}</td>
//               <td>{rate.mode}</td>
//               <td>{rate.minWeight}</td>
//               <td>{rate.codCharge_charge} / {rate.codCharge_percentage}</td>
//               <td>{rate.fuelSurcharge}</td>
//               <td>
//                 <IconButton onClick={() => setViewRate(rate)}><VisibilityIcon color="primary" /></IconButton>
//                 <IconButton onClick={() => handleEditClick(rate)}><EditIcon color="secondary" /></IconButton>
//                 <IconButton onClick={() => handleDelete(rate._id)}><DeleteIcon color="error" /></IconButton>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     );
//   };

//   const fields = [
//     { label: 'Courier Company', name: 'companyName' },
//     { label: 'Service Type', name: 'serviceType' },
//     { label: 'Mode', name: 'mode' },
//     { label: 'Min Weight', name: 'minWeight' },
//     { label: 'Zone A Upto', name: 'zoneA_upto' },
//     { label: 'Zone A Additional', name: 'zoneA_additional' },
//     { label: 'Zone B Upto', name: 'zoneB_upto' },
//     { label: 'Zone B Additional', name: 'zoneB_additional' },
//     { label: 'Zone C1 Upto', name: 'zoneC1_upto' },
//     { label: 'Zone C1 Additional', name: 'zoneC1_additional' },
//     { label: 'Zone C2 Upto', name: 'zoneC2_upto' },
//     { label: 'Zone C2 Additional', name: 'zoneC2_additional' },
//     { label: 'Zone D1 Upto', name: 'zoneD1_upto' },
//     { label: 'Zone D1 Additional', name: 'zoneD1_additional' },
//     { label: 'Zone D2 Upto', name: 'zoneD2_upto' },
//     { label: 'Zone D2 Additional', name: 'zoneD2_additional' },
//     { label: 'Zone E Upto', name: 'zoneE_upto' },
//     { label: 'Zone E Additional', name: 'zoneE_additional' },
//     { label: 'Zone F Upto', name: 'zoneF_upto' },
//     { label: 'Zone F Additional', name: 'zoneF_additional' },
//     { label: 'COD Charge', name: 'codCharge_charge' },
//     { label: 'COD Percentage', name: 'codCharge_percentage' },
//     { label: 'Fuel Surcharge', name: 'fuelSurcharge' },
//   ];

//   return (
//     <Wrapper>
//       <ToggleWrapper>
//         <ToggleOption
//           active={!showB2B}
//           onClick={() => handleToggleClick('b2c')}
//         >
//           B2C
//         </ToggleOption>
//         <ToggleOption
//           active={showB2B}
//           onClick={() => handleToggleClick('b2b')}
//         >
//           B2B
//         </ToggleOption>
//       </ToggleWrapper>

//      <Header>
//   <h2>📦 Courier Rate Management</h2>

//   <CenterBox>
//     <SearchInputWrapper>
//       <SearchIconStyled />
//       <StyledSearchInput
//         type="text"
//         placeholder="Search by Company Name"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//     </SearchInputWrapper>
//   </CenterBox>

//   <ButtonGroup>
//     <AddButton onClick={() => navigate('/Admin/addcourierrate')}>
//       + Add B2C Courier Rate
//     </AddButton>
//     <AddButton onClick={() => navigate('/Admin/addb2bcourierrateCSV')}>
//       + Add B2C Courier Rate CSV File
//     </AddButton>
//   </ButtonGroup>
// </Header>



//       {renderTable()}

//       {/* View Dialog */}
//       <Dialog open={!!viewRate} onClose={() => setViewRate(null)} fullWidth maxWidth="md">
//         <DialogTitle sx={{ fontWeight: 700, fontSize: '1.5rem', color: '#333', position: 'relative', pb: 1 }}>
//           Rate Details
//           <IconButton
//             onClick={() => setViewRate(null)}
//             sx={{ position: 'absolute', right: 8, top: 8, color: 'grey.500' }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>

//         <DialogContent dividers sx={{ backgroundColor: '#fafafa', px: 3, py: 2 }}>
//           {/* Company Logo */}
//           {viewRate?.companiesLogo && (
//             <Box mb={4} display="flex" justifyContent="center">
//               <a
//                 href={`http://localhost:8000/${viewRate.companiesLogo}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <img
//                   src={`http://localhost:8000/${viewRate.companiesLogo}`}
//                   alt="Company Logo"
//                   style={{
//                     maxHeight: 100,
//                     borderRadius: 8,
//                     objectFit: 'contain',
//                     border: '1px solid #ccc',
//                     padding: 8,
//                     backgroundColor: '#fff',
//                     boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//                     transition: 'transform 0.3s ease',
//                     cursor: 'pointer'
//                   }}
//                   onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
//                   onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
//                 />
//               </a>
//             </Box>
//           )}

//           {/* Rate Fields */}
//           <Grid container spacing={2}>
//             {viewRate &&
//               fields.map(({ label, name }) => {
//                 const value = viewRate[name];

//                 // Check if it's an object and render safely
//                 let displayValue;
//                 if (typeof value === 'object' && value !== null) {
//                   if (value.companyName) {
//                     displayValue = value.companyName; // Show company name from courierCompany object
//                   } else {
//                     displayValue = '—'; // fallback for objects
//                   }
//                 } else {
//                   displayValue = value !== undefined && value !== '' ? value : '—';
//                 }

//                 return (
//                   <Grid item xs={12} sm={6} md={4} lg={3} key={name}>
//                     <Box
//                       sx={{
//                         backgroundColor: '#fff',
//                         borderRadius: 2,
//                         p: 2,
//                         boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
//                         border: '1px solid #e0e0e0',
//                         height: '100%',
//                       }}
//                     >
//                       <Typography
//                         variant="caption"
//                         fontWeight={600}
//                         color="text.secondary"
//                         gutterBottom
//                         sx={{ display: 'block', mb: 0.5 }}
//                       >
//                         {label}
//                       </Typography>
//                       <Typography
//                         variant="body1"
//                         fontWeight={600}
//                         color="text.primary"
//                       >
//                         {displayValue}
//                       </Typography>
//                     </Box>
//                   </Grid>
//                 );
//               })}
//           </Grid>

//         </DialogContent>
//       </Dialog>

//       {/* Edit Dialog */}
//       <Dialog open={!!editRate} onClose={() => setEditRate(null)} fullWidth maxWidth="md">
//         <DialogTitle>
//           Edit Courier Rate
//           <IconButton
//             onClick={() => setEditRate(null)}
//             sx={{ position: 'absolute', right: 8, top: 8 }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>

//         <DialogContent>
//           <Grid container spacing={2}>
//             {fields.map(({ label, name }) => (
//               <Grid item xs={12} sm={6} md={4} lg={3} key={name}>
//                 <TextField
//                   label={label}
//                   name={name}
//                   value={editedValues[name] || ''}
//                   onChange={handleChange}
//                   fullWidth
//                 />
//               </Grid>
//             ))}

//             {/* Company Logo Preview & Upload */}
//             <Grid item xs={12} sm={6} md={4} lg={3}>
//               <Box
//                 sx={{
//                   border: '1px solid #e0e0e0',
//                   borderRadius: 2,
//                   p: 2,
//                   backgroundColor: '#fafafa',
//                   textAlign: 'center',
//                 }}
//               >
//                 <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
//                   Company Logo
//                 </Typography>
//                 {editedValues?.companiesLogo && typeof editedValues.companiesLogo === 'string' && (
//                   <Box mb={1}>
//                     <img
//                       src={`http://localhost:8000/${editedValues.companiesLogo}`}
//                       alt="Company Logo"
//                       style={{
//                         height: 80,
//                         objectFit: 'contain',
//                         borderRadius: 6,
//                         border: '1px solid #ccc',
//                         padding: 4,
//                       }}
//                     />
//                   </Box>
//                 )}
//                 <Button variant="outlined" component="label" fullWidth>
//                   Upload New Logo
//                   <input
//                     type="file"
//                     name="companiesLogo"
//                     hidden
//                     accept="image/*"
//                     onChange={(e) =>
//                       setEditedValues({ ...editedValues, companiesLogo: e.target.files[0] })
//                     }
//                   />
//                 </Button>
//               </Box>
//             </Grid>
//           </Grid>
//         </DialogContent>

//         <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
//           <Button onClick={handleUpdateSubmit} variant="contained" color="primary">Update</Button>
//         </DialogActions>
//       </Dialog>

//     </Wrapper>
//   );
// };

// export default ShowCourierRates;

// // Styled Components
// const Wrapper = styled.div`
//   padding: 20px;
// `;



// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   background: white;
//   border-radius: 10px;
//   overflow: hidden;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

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

// const LoaderContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-top: 40px;
// `;

// const ButtonContainer = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   gap: 10px;
//   margin-bottom: 16px;
// `;

// const AddButton = styled.button`
//   background-color: #1976d2;
//   color: white;
//   border: none;
//   padding: 8px 12px;
//   font-size: 14px;
//   border-radius: 6px;
//   cursor: pointer;

//   &:hover {
//     background-color: #1565c0;
//   }
// `;

// // New styled toggle container and options for blue centered toggle like your screenshot
// const ToggleWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   gap: 2rem;
//   margin-bottom: 20px;
//   user-select: none;
// `;

// const ToggleOption = styled.div`
//   cursor: pointer;
//   padding: 8px 24px;
//   font-weight: 600;
//   font-size: 16px;
//   border-radius: 30px;
//   border: 2px solid #1976d2;
//   color: ${props => (props.active ? 'white' : '#1976d2')};
//   background-color: ${props => (props.active ? '#1976d2' : 'transparent')};
//   box-shadow: ${props => (props.active ? '0 4px 12px rgba(25, 118, 210, 0.4)' : 'none')};
//   transition: all 0.3s ease;

//   &:hover {
//     background-color: #1565c0;
//     color: white;
//     box-shadow: 0 4px 12px rgba(21, 101, 192, 0.6);
//   }
// `;




// const SearchInputWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   background: #fff;
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   padding: 6px 12px;
//   width: 300px;
//   box-shadow: 0 2px 6px rgba(0,0,0,0.05);

//   &:focus-within {
//     border-color: #1976d2;
//     box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.2);
//   }
// `;

// const StyledSearchInput = styled.input`
//   border: none;
//   outline: none;
//   font-size: 14px;
//   flex: 1;
//   padding-left: 8px;
// `;

// const SearchIconStyled = styled(SearchIcon)`
//   color: #1976d2;
// `;

// const Header = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin: 20px 0 30px;
//   flex-wrap: wrap;
//   gap: 20px;
// `;

// const ButtonGroup = styled.div`
//   display: flex;
//   gap: 10px;
//   margin-left: auto;
// `;

// const CenterBox = styled.div`
//   flex: 1;
//   display: flex;
//   justify-content: center;
// `;



import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllCourierRates,
  deleteCourierRate,
  updateCourierRate,
} from '../../../redux/courierrateRelated/courierrateHandle';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import {
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  TextField,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';

const ShowCourierRates = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courierRates, loading } = useSelector((state) => state.courierRate);

  const [viewRate, setViewRate] = useState(null);
  const [editRate, setEditRate] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [errors, setErrors] = useState({});
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const [showB2B, setShowB2B] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!showB2B) {
      dispatch(getAllCourierRates());
    }
  }, [dispatch, showB2B]);

  const handleDelete = (id) => {
    dispatch(deleteCourierRate(id)).then(() => dispatch(getAllCourierRates()));
  };

  const handleEditClick = (rate) => {
    setEditRate(rate);
    setEditedValues(rate);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedValues({ ...editedValues, [name]: value });

    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const validateFields = () => {
    const newErrors = {};
    Object.keys(editedValues).forEach((key) => {
      if (
        typeof editedValues[key] === 'string' &&
        editedValues[key].trim() === ''
      ) {
        newErrors[key] = `${key.replace(/([A-Z])/g, ' $1')} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateSubmit = async () => {
    if (!validateFields()) return;

    try {
      setLoadingUpdate(true);
      await dispatch(updateCourierRate(editRate._id, editedValues));
      setEditRate(null);
      setLoadingUpdate(false);
      dispatch(getAllCourierRates());
    } catch (error) {
      console.error('Update failed:', error);
      setLoadingUpdate(false);
    }
  };

  const handleToggleClick = (type) => {
    if (type === 'b2b') {
      setShowB2B(true);
      navigate('/Admin/b2bcourierrates');
    } else {
      setShowB2B(false);
      navigate('/Admin/showcourierrates');
    }
  };

  const filteredRates = courierRates?.filter((rate) =>
    rate.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderTable = () => {
    if (loading)
      return (
        <LoaderContainer>
          <CircularProgress />
        </LoaderContainer>
      );
    if (!Array.isArray(courierRates)) return <p>❌ Invalid data format</p>;
    if (courierRates.length === 0) return <p>No courier rates found.</p>;

    return (
      <Table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Service Type</th>
            <th>Mode</th>
            <th>Min Weight</th>
            <th>COD Charge</th>
            <th>Fuel Surcharge</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRates.map((rate) => (
            <tr key={rate._id}>
              <td>{rate.companyName}</td>
              <td>{rate.serviceType}</td>
              <td>{rate.mode}</td>
              <td>{rate.minWeight}</td>
              <td>
                {rate.codCharge_charge} / {rate.codCharge_percentage}
              </td>
              <td>{rate.fuelSurcharge}</td>
              <td>
                <IconButton onClick={() => setViewRate(rate)}>
                  <VisibilityIcon color="primary" />
                </IconButton>
                <IconButton onClick={() => handleEditClick(rate)}>
                  <EditIcon color="secondary" />
                </IconButton>
                <IconButton onClick={() => handleDelete(rate._id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  const fields = [
    { label: 'Courier Company', name: 'companyName' },
    { label: 'Service Type', name: 'serviceType' },
    { label: 'Mode', name: 'mode' },
    { label: 'Min Weight', name: 'minWeight' },
    { label: 'Zone A Upto', name: 'zoneA_upto' },
    { label: 'Zone A Additional', name: 'zoneA_additional' },
    { label: 'Zone B Upto', name: 'zoneB_upto' },
    { label: 'Zone B Additional', name: 'zoneB_additional' },
    { label: 'Zone C1 Upto', name: 'zoneC1_upto' },
    { label: 'Zone C1 Additional', name: 'zoneC1_additional' },
    { label: 'Zone C2 Upto', name: 'zoneC2_upto' },
    { label: 'Zone C2 Additional', name: 'zoneC2_additional' },
    { label: 'Zone D1 Upto', name: 'zoneD1_upto' },
    { label: 'Zone D1 Additional', name: 'zoneD1_additional' },
    { label: 'Zone D2 Upto', name: 'zoneD2_upto' },
    { label: 'Zone D2 Additional', name: 'zoneD2_additional' },
    { label: 'Zone E Upto', name: 'zoneE_upto' },
    { label: 'Zone E Additional', name: 'zoneE_additional' },
    { label: 'Zone F Upto', name: 'zoneF_upto' },
    { label: 'Zone F Additional', name: 'zoneF_additional' },
    { label: 'COD Charge', name: 'codCharge_charge' },
    { label: 'COD Percentage', name: 'codCharge_percentage' },
    { label: 'Fuel Surcharge', name: 'fuelSurcharge' },
  ];

  return (
    <Wrapper>
      <ToggleWrapper>
        <ToggleOption active={!showB2B} onClick={() => handleToggleClick('b2c')}>
          B2C
        </ToggleOption>
        <ToggleOption active={showB2B} onClick={() => handleToggleClick('b2b')}>
          B2B
        </ToggleOption>
      </ToggleWrapper>

      <Header>
        <h2>📦 Courier Rate Management</h2>

        <CenterBox>
          <SearchInputWrapper>
            <SearchIconStyled />
            <StyledSearchInput
              type="text"
              placeholder="Search by Company Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchInputWrapper>
        </CenterBox>

        <ButtonGroup>
          <AddButton onClick={() => navigate('/Admin/addcourierrate')}>
            + Add B2C Courier Rate
          </AddButton>
          <AddButton onClick={() => navigate('/Admin/addb2bcourierrateCSV')}>
            + Add B2C Courier Rate CSV File
          </AddButton>
        </ButtonGroup>
      </Header>

      {renderTable()}

      {/* View Dialog */}
      {/* <Dialog
        open={!!viewRate}
        onClose={() => setViewRate(null)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            fontSize: '1.5rem',
            color: '#333',
            position: 'relative',
            pb: 1,
          }}
        >
          Rate Details
          <IconButton
            onClick={() => setViewRate(null)}
            sx={{ position: 'absolute', right: 8, top: 8, color: 'grey.500' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ backgroundColor: '#fafafa', px: 3, py: 2 }}>
          {viewRate?.companiesLogo && (
            <Box mb={4} display="flex" justifyContent="center">
              <a
                href={`${process.env.REACT_APP_BASE_URL || 'http://localhost:8000'}/${viewRate.companiesLogo}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`${process.env.REACT_APP_BASE_URL || 'http://localhost:8000'}/${viewRate.companiesLogo}`}
                  alt="Company Logo"
                  style={{
                    maxHeight: 100,
                    borderRadius: 8,
                    objectFit: 'contain',
                    border: '1px solid #ccc',
                    padding: 8,
                    backgroundColor: '#fff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease',
                    cursor: 'pointer',
                  }}
                />
              </a>
            </Box>
          )}

          <Grid container spacing={2}>
            {viewRate &&
              fields.map(({ label, name }) => {
                const value = viewRate[name];
                let displayValue;
                if (typeof value === 'object' && value !== null) {
                  displayValue = value.companyName || '—';
                } else {
                  displayValue =
                    value !== undefined && value !== '' ? value : '—';
                }

                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={name}>
                    <Box
                      sx={{
                        backgroundColor: '#fff',
                        borderRadius: 2,
                        p: 2,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                        border: '1px solid #e0e0e0',
                      }}
                    >
                      <Typography
                        variant="caption"
                        fontWeight={600}
                        color="text.secondary"
                      >
                        {label}
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {displayValue}
                      </Typography>
                    </Box>
                  </Grid>
                );
              })}
          </Grid>
        </DialogContent>
      </Dialog> */}

      <Dialog
        open={!!viewRate}
        onClose={() => setViewRate(null)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle
          sx={{
            fontWeight: 600,
            fontSize: "1.4rem",
            color: "#2c3e50",
            position: "relative",
            pb: 1,
            letterSpacing: 0.3,
          }}
        >
          Rate Details
          <IconButton
            onClick={() => setViewRate(null)}
            sx={{ position: "absolute", right: 8, top: 8, color: "grey.500" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent
          dividers
          sx={{
            backgroundColor: "#fafafa",
            px: 3,
            py: 2,
          }}
        >
          {viewRate?.companiesLogo && (
            <Box mb={4} display="flex" justifyContent="center">
              <a
                href={`${process.env.REACT_APP_BASE_URL || 'http://localhost:8000'}/${viewRate.companiesLogo}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`${process.env.REACT_APP_BASE_URL || 'http://localhost:8000'}/${viewRate.companiesLogo}`}
                  alt="Company Logo"
                  style={{
                    maxHeight: 100,
                    borderRadius: 8,
                    objectFit: "contain",
                    border: "1px solid #ccc",
                    padding: 8,
                    backgroundColor: "#fff",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s ease",
                    cursor: "pointer",
                  }}
                />
              </a>
            </Box>
          )}

          <Grid container spacing={2}>
            {viewRate &&
              fields.map(({ label, name }) => {
                const value = viewRate[name];
                let displayValue;
                if (typeof value === "object" && value !== null) {
                  displayValue = value.companyName || "—";
                } else {
                  displayValue =
                    value !== undefined && value !== "" ? value : "—";
                }

                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={name}>
                    <Box
                      sx={{
                        backgroundColor: "#fff",
                        borderRadius: 2,
                        p: 2,
                        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                        border: "1px solid #e0e0e0",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        fontWeight={500}
                        sx={{
                          color: "#607d8b",
                          fontSize: "0.85rem",
                          textTransform: "capitalize",
                        }}
                      >
                        {label}
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight={500}
                        sx={{
                          color: "#212121",
                          fontSize: "0.95rem",
                          mt: 0.3,
                        }}
                      >
                        {displayValue}
                      </Typography>
                    </Box>
                  </Grid>
                );
              })}
          </Grid>
        </DialogContent>
      </Dialog>


      {/* Edit Dialog */}
      <Dialog
        open={!!editRate}
        onClose={() => setEditRate(null)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          Edit Courier Rate
          <IconButton
            onClick={() => setEditRate(null)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={2}>
            {fields.map(({ label, name }) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={name}>
                <TextField
                  label={label}
                  name={name}
                  value={editedValues[name] || ''}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors[name]}
                  helperText={errors[name]}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button
            onClick={handleUpdateSubmit}
            variant="contained"
            color="primary"
            disabled={loadingUpdate}
          >
            {loadingUpdate ? <CircularProgress size={24} color="inherit" /> : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  );
};

export default ShowCourierRates;

// Styled Components
const Wrapper = styled.div`
  padding: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  th,
  td {
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

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const AddButton = styled.button`
  background-color: #1976d2;
  color: white;
  border: none;
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: #1565c0;
  }
`;

const ToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 20px;
  user-select: none;
`;

const ToggleOption = styled.div`
  cursor: pointer;
  padding: 8px 24px;
  font-weight: 600;
  font-size: 16px;
  border-radius: 30px;
  border: 2px solid #1976d2;
  color: ${(props) => (props.active ? 'white' : '#1976d2')};
  background-color: ${(props) => (props.active ? '#1976d2' : 'transparent')};
`;

const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 6px 12px;
  width: 300px;
`;

const StyledSearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 14px;
  flex: 1;
  padding-left: 8px;
`;

const SearchIconStyled = styled(SearchIcon)`
  color: #1976d2;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 30px;
  flex-wrap: wrap;
  gap: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-left: auto;
`;

const CenterBox = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;
