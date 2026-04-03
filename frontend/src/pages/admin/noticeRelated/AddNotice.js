// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { addStuff } from '../../../redux/userRelated/userHandle';
// import { underControl } from '../../../redux/userRelated/userSlice';
// import { CircularProgress } from '@mui/material';
// import Popup from '../../../components/Popup';
// import styled from 'styled-components';

// const AddNotice = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { status, response, error } = useSelector(state => state.user);
//   const { currentUser } = useSelector(state => state.user);

//   const [title, setTitle] = useState('');
//   const [details, setDetails] = useState('');
//   const [date, setDate] = useState('');
//   const adminID = currentUser._id;

//   const [loader, setLoader] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [message, setMessage] = useState("");

//   const fields = { title, details, date, adminID };
//   const address = "Notice";

//   const submitHandler = (event) => {
//     event.preventDefault();
//     setLoader(true);
//     dispatch(addStuff(fields, address));
//   };

//   useEffect(() => {
//     if (status === 'added') {
//       navigate('/Admin/notices');
//       dispatch(underControl());
//     } else if (status === 'error') {
//       setMessage("Network Error");
//       setShowPopup(true);
//       setLoader(false);
//     }
//   }, [status, navigate, error, response, dispatch]);

//   return (
//     <StyledContainer>
//       <StyledForm onSubmit={submitHandler}>
//         <Title>Add Notice 📝</Title>

//         <Label>Title</Label>
//         <StyledInput
//           type="text"
//           placeholder="Enter notice title..."
//           value={title}
//           onChange={(event) => setTitle(event.target.value)}
//           required
//         />

//         <Label>Details</Label>
//         <StyledTextarea
//           placeholder="Enter notice details..."
//           value={details}
//           onChange={(event) => setDetails(event.target.value)}
//           required
//         />

//         <Label>Date</Label>
//         <StyledInput
//           type="date"
//           value={date}
//           onChange={(event) => setDate(event.target.value)}
//           required
//         />

//         <StyledButton type="submit" disabled={loader}>
//           {loader ? <CircularProgress size={24} color="inherit" /> : 'Add Notice'}
//         </StyledButton>
//       </StyledForm>

//       <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
//     </StyledContainer>
//   );
// };

// export default AddNotice;

// // 🔹 Styled Components
// const StyledContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   min-height: 100vh;
// `;

// const StyledForm = styled.form`
// margin-top:-50px;
//   display: flex;
//   flex-direction: column;
//   padding: 30px;
//   border-radius: 12px;
//   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
//   backdrop-filter: blur(10px);
//   width: 100%;
//   max-width: 400px;
//     background: linear-gradient(135deg,rgb(249, 249, 249), rgb(251, 250, 250));
//     position:absolute;

// `;

// const Title = styled.h2`
//   color:rgb(80, 164, 238);
//   text-align: center;
//   margin-bottom: 20px;
  
// `;

// const Label = styled.label`
//   color:rgb(0, 0, 0);
//   margin-top: 10px;
//   font-size: 14px;
// `;

// const StyledInput = styled.input`
//   background: rgba(228, 228, 228, 0.77);
//   border: none;
//   padding: 10px;
//   color: black;
//   font-size: 16px;
//   border-radius: 8px;
//   margin-top: 5px;
//   outline: none;
//   transition: 0.3s;

//   &:focus {
//     background: rgba(228, 228, 228, 0.77);
//   }
// `;

// const StyledTextarea = styled.textarea`
//   background: rgba(228, 228, 228, 0.77);
//   border: none;
//   padding: 10px;
//   color: black;
//   font-size: 16px;
//   border-radius: 8px;
//   margin-top: 5px;
//   height: 80px;
//   resize: none;
//   outline: none;
//   transition: 0.3s;

//   &:focus {
//     background: rgba(228, 228, 228, 0.77);
//   }
// `;

// const StyledButton = styled.button`
//   background: #4caf50;
//   color: white;
//   padding: 12px;
//   font-size: 16px;
//   border: none;
//   border-radius: 8px;
//   margin-top: 20px;
//   cursor: pointer;
//   transition: 0.3s;

//   &:hover {
//     background: #45a049;
//   }

//   &:disabled {
//     background: gray;
//     cursor: not-allowed;
//   }
// `;



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { CircularProgress } from '@mui/material';
import Popup from '../../../components/Popup';
import styled from 'styled-components';

const AddNotice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, response, error } = useSelector(state => state.user);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const fields = { firstName, lastName, email, password, address, phoneNumber };
  
  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(addStuff(fields, "Notice"));
  };

  useEffect(() => {
    if (status === 'added') {
      navigate('/Admin/notices');
      dispatch(underControl());
    } else if (status === 'error') {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, response, dispatch]);

  return (
    <StyledContainer>
      <StyledForm onSubmit={submitHandler}>
        <Title>Add Customer 📝</Title>

        <Row>
          <Column>
            <Label>First Name</Label>
            <StyledInput type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          </Column>
          <Column>
            <Label>Last Name</Label>
            <StyledInput type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </Column>
        </Row>

        <Row>
          <Column>
            <Label>Email</Label>
            <StyledInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Column>
          <Column>
            <Label>Password</Label>
            <StyledInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Column>
        </Row>

        <Label>Address</Label>
        <StyledTextarea value={address} onChange={(e) => setAddress(e.target.value)} required />

        <Label>Phone Number</Label>
        <StyledInput type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />

        <StyledButton type="submit" disabled={loader}>
          {loader ? <CircularProgress size={24} color="inherit" /> : 'Add Customer'}
        </StyledButton>
      </StyledForm>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </StyledContainer>
  );
};

export default AddNotice;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f8f9fa;
`;

const StyledForm = styled.form`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 500px;
  display: flex;
  flex-direction: column;
  position: absolute;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-top: 10px;
`;

const StyledInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

const StyledTextarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  height: 80px;
  resize: none;
`;

const StyledButton = styled.button`
  background: #007bff;
  color: white;
  padding: 10px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Column = styled.div`
  width: 48%;
  display: flex;
  flex-direction: column;
`;
