

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  TextField, Typography, CircularProgress,
  IconButton, InputAdornment, Checkbox, FormControlLabel,
  Backdrop
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styled from 'styled-components';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';
import logo from '../assets/mylogisticimage.png';

const LoginPage = ({ role }) => {             
  const dispatch = useDispatch();
  const navigate = useNavigate();     

  const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);    

  const [toggle, setToggle] = useState(false);     
  const [guestLoader, setGuestLoader] = useState(false);        
  const [loader, setLoader] = useState(false);    
  const [showPopup, setShowPopup] = useState(false);       
  const [message, setMessage] = useState("");                       

  const [emailError, setEmailError] = useState(false);          
  const [passwordError, setPasswordError] = useState(false);    
  const [rollNumberError, setRollNumberError] = useState(false);
  const [studentNameError, setStudentNameError] = useState(false);         

  const handleSubmit = (event) => {    
    event.preventDefault();

    if (role === 'Student') {     
      const rollNum = event.target.rollNumber.value;  
      const studentName = event.target.studentName.value;       
      const password = event.target.password.value;           

      if (!rollNum || !studentName || !password) {     
        if (!rollNum) setRollNumberError(true);       
        if (!studentName) setStudentNameError(true);         
        if (!password) setPasswordError(true);           
        return;
      }

      const fields = { rollNum, studentName, password };                  
      setLoader(true);                       
      dispatch(loginUser(fields, role));                                                              
    } else {
      const email = event.target.email.value;                 
      const password = event.target.password.value;             

      if (!email || !password) {            
        if (!email) setEmailError(true);       
        if (!password) setPasswordError(true);         
        return;                              
      }

      const fields = { email, password };
      setLoader(true);
      dispatch(loginUser(fields, role));
    }
  };

  const handleInputChange = (e) => {
    const { name } = e.target;
    if (name === 'email') setEmailError(false);   
    if (name === 'password') setPasswordError(false);
    if (name === 'rollNumber') setRollNumberError(false);   
    if (name === 'studentName') setStudentNameError(false);
  };

  const guestModeHandler = () => {        
    const password = 'zxc';        

    if (role === 'Admin') {
      const email = 'yogendra@12';
      dispatch(loginUser({ email, password }, role));
    } else if (role === 'Student') {
      const rollNum = '1';
      const studentName = 'Dipesh Awasthi';
      dispatch(loginUser({ rollNum, studentName, password }, role));
    } else if (role === 'Teacher') {
      const email = 'tony@12';
      dispatch(loginUser({ email, password }, role));
    }

    setGuestLoader(true);                                             
  };

  useEffect(() => {     
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') navigate('/Admin/dashboard');
      else if (currentRole === 'Student') navigate('/Student/dashboard');
      else if (currentRole === 'Teacher') navigate('/Teacher/dashboard');
    } else if (status === 'failed') {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
      setGuestLoader(false);
    } else if (status === 'error') {
      setMessage('Network Error');
      setShowPopup(true);
      setLoader(false);
      setGuestLoader(false);
    }
  }, [status, currentUser, currentRole, response, error, navigate]);

  return (
    <Wrapper>
      <LogoSection>
        <LogoImage src={logo} alt="Logo" />                         
      </LogoSection>

      <FormSection>
        <FormContainer onSubmit={handleSubmit}>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>{role} Login</Typography>
          <Typography sx={{ mb: 3, color: '#555' }}>Welcome back! Please enter your details</Typography>

          {role === 'Student' ? (
            <>
              <Label>Email / Roll Number</Label>             
              <TextField
                fullWidth
                name="rollNumber"
                type="number"
                error={rollNumberError}
                helperText={rollNumberError && 'Roll Number is required'}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
                variant="outlined"
              />


              <Label>Name</Label>

              <TextField
                fullWidth
                name="studentName"
                error={studentNameError}
                helperText={studentNameError && 'Name is required'}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
                variant="outlined"
              />   

            </>
          ) : (
            <>
              <Label>Email</Label>
              <TextField
                fullWidth
                name="email"
                error={emailError}
                helperText={emailError && 'Email is required'}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
                variant="outlined"
              />
            </>
          )}

          <Label>Password</Label>
          <TextField
            fullWidth
            name="password"
            type={toggle ? 'text' : 'password'}
            error={passwordError}
            helperText={passwordError && 'Password is required'}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setToggle(!toggle)}>
                    {toggle ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />


          <StyledButton type="submit">
            {loader ? <CircularProgress size={22} color="inherit" /> : 'Login'}
          </StyledButton>

          {role === 'Admin' && (
            <Typography sx={{ mt: 3 }}>
            </Typography>
          )}
        </FormContainer>
      </FormSection>

      <Backdrop open={guestLoader} sx={{ color: '#fff', zIndex: 9999 }}>
        <CircularProgress color="inherit" />
        &nbsp; Please wait...
      </Backdrop>

      <Popup message={message} showPopup={showPopup} setShowPopup={setShowPopup} />
    </Wrapper>
  );
};

export default LoginPage;

// ---------------- Styled Components ----------------                

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  background: #e6f2ff;
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

const FormSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  padding: 20px;

  @media (max-width: 768px) {
    min-height: 100vh;
    padding: 40px 20px;
    align-items: center;
    justify-content: center;
  }
`;


const FormContainer = styled.form`
  width: 100%;
  max-width: 400px;
  padding: 40px;
  border-radius: 16px;
  background: #f9fcff;
  box-shadow: 0px 0px 15px rgba(0, 123, 255, 0.1);
  @media (max-width: 480px) {
    padding: 20px;
  }
`;

const LogoSection = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;

  // 🧠 Hide LogoSection on small screens
  @media (max-width: 768px) {
    display: none;
  }
`;

const LogoImage = styled.img`
  width: 80%;
  max-width: 400px;
  object-fit: contain;
`;

// const StyledLink = styled(Link)`
//   color: #0077cc;
//   text-decoration: none;
//   font-weight: 500;
//   &:hover {
//     text-decoration: underline;
//   }
// `;

const StyledButton = styled.button`
  width: 100%;
  background-color: #0077cc;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background-color: #005fa3;
  }
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
  display: block;
`;

const StyledOutlinedButton = styled(StyledButton)`
  background-color: transparent;
  color: #0077cc;
  border: 2px solid #0077cc;
  margin-top: 15px;
  &:hover {
    background-color: #e6f2ff;
  }
`;    








