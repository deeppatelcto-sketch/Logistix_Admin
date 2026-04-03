// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { uploadB2BCourierRatesCSV } from '../../../redux/b2bcourierrateRelated/b2bcourierrateHandel';
// import styled from 'styled-components';
// import { CircularProgress } from '@mui/material';

// const AddB2BCourierRatesCsv = () => {
//   const dispatch = useDispatch();

//   const [csvFile, setCsvFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleFileChange = (e) => {
//     setCsvFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!csvFile) {
//       setMessage('Please select a B2B Courier Rates CSV file.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', csvFile);

//     setLoading(true);
//     setMessage('');

//     try {
//       await dispatch(uploadB2BCourierRatesCSV(formData));
//       setMessage('B2B CSV uploaded and data stored successfully!');
//     } catch (err) {
//       setMessage('Failed to upload B2B CSV.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <StyledContainer>
//       <StyledForm onSubmit={handleSubmit}>
//         <Title>Upload B2B Courier Rates CSV 📦</Title>

//         <InputGroup>
//           <Label>Select B2B CSV File</Label>
//           <StyledInput type="file" accept=".csv" onChange={handleFileChange} />
//         </InputGroup>

//         <StyledButton type="submit" disabled={loading}>
//           {loading ? <CircularProgress size={24} color="inherit" /> : 'Upload CSV'}
//         </StyledButton>

//         {message && <Message>{message}</Message>}
//       </StyledForm>
//     </StyledContainer>
//   );
// };

// export default AddB2BCourierRatesCsv;

// // ✅ Styled Components (Copied from your original code)
// const StyledContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   padding: 5rem;
//   min-height: 100vh;
//   background: #ffffff;
// `;

// const StyledForm = styled.form`
//   background: #fff;
//   padding: 2rem;
//   border-radius: 12px;
//   max-width: 900px;
//   width: 100%;
// `;

// const Title = styled.h2`
//   text-align: center;
//   margin-bottom: 20px;
//   color: #343a40;
// `;

// const InputGroup = styled.div`
//   margin-bottom: 20px;
// `;

// const Label = styled.label`
//   font-weight: 500;
//   margin-bottom: 6px;
//   display: block;
// `;

// const StyledInput = styled.input`
//   padding: 10px;
//   border: 1px solid #ced4da;
//   border-radius: 6px;
//   width: 100%;
// `;

// const StyledButton = styled.button`
//   background: #339af0;
//   color: white;
//   font-weight: 600;
//   padding: 12px;
//   border: none;
//   border-radius: 6px;
//   cursor: pointer;
//   width: 100%;

//   &:hover {
//     background: #1c7ed6;
//   }

//   &:disabled {
//     background: #74c0fc;
//     cursor: not-allowed;
//   }
// `;

// const Message = styled.p`
//   margin-top: 20px;
//   color: #495057;
//   text-align: center;
// `;
