import { useState } from 'react';
import {
  Box, TextField, Typography, CircularProgress,
  IconButton, InputAdornment, Checkbox, FormControlLabel
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import newLogo from '../../assets/mylogisticimage.png'; // Replace with your new image

const RegisterPage = () => {
  const [toggle, setToggle] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle registration logic here
    setLoader(true);
    setTimeout(() => setLoader(false), 1500); // mock loader
  };

  return (
    <Wrapper>
     

      <LogoSection>
        <LogoImage src={newLogo} alt="New Logo" />
      </LogoSection>

       <FormSection>
        <FormContainer onSubmit={handleSubmit}>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>Register</Typography>
          <Typography sx={{ mb: 3, color: '#555' }}>Create a new account</Typography>

          <TextField fullWidth label="Full Name" name="name" sx={{ mb: 2 }} />
          <TextField fullWidth label="Email" name="email" sx={{ mb: 2 }} />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type={toggle ? 'text' : 'password'}
            sx={{ mb: 2 }}
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
          <FormControlLabel control={<Checkbox />} label="I agree to the terms" sx={{ mb: 2 }} />

          <StyledButton type="submit">
            {loader ? <CircularProgress size={22} color="inherit" /> : 'Register'}
          </StyledButton>

          <Typography sx={{ mt: 3 }}>
            Already have an account? <StyledLink to="/Adminlogin">Login</StyledLink>
          </Typography>
        </FormContainer>
      </FormSection>
    </Wrapper>
  );
};

export default RegisterPage;



const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  background: #e6f2ff;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
`;

const FormContainer = styled.form`
  width: 100%;
  max-width: 400px;
  padding: 40px;
  border-radius: 16px;
  background: #f9fcff;
  box-shadow: 0px 0px 15px rgba(0, 123, 255, 0.1);
`;

const LogoSection = styled.div`
  flex: 1;
    background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const LogoImage = styled.img`
  width: 80%;
  max-width: 400px;
  object-fit: contain;
`;

const StyledLink = styled(Link)`
  color: #0077cc;
  text-decoration: none;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
`;

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

const StyledOutlinedButton = styled(StyledButton)`
  background-color: transparent;
  color: #0077cc;
  border: 2px solid #0077cc;
  margin-top: 15px;
  &:hover {
    background-color: #e6f2ff;
  }
`;
