import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff, updateUser } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { CircularProgress, MenuItem } from '@mui/material';
import styled from 'styled-components';

const AddCustomer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { status, error } = useSelector(state => state.user);

  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    birthDate: '',
    email: '',
    phoneNumber: '',
    otp: ''
  });

  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (status === 'added' || status === 'updated') {
      setMessage(`Customer ${status === 'added' ? 'added' : 'updated'} successfully ✅`);
      setLoader(false);
      setErrors({});
      setTimeout(() => {
        navigate('/Admin/custs');
        dispatch(underControl());
      }, 1500);
    } else if (status === 'error') {
      setLoader(false);
      if (error && typeof error === 'object' && !Array.isArray(error)) {
        setErrors(error);
        setMessage("");
      } else {
        setMessage(error || "Something went wrong");
      }
    }
  }, [status, navigate, error, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!customer.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!customer.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!customer.gender.trim()) newErrors.gender = "Gender is required";
    if (!customer.birthDate.trim()) newErrors.birthDate = "Birth Date is required";

    // if (!customer.email.trim()) {
    //   newErrors.email = "Email is required";
    // } else if (!/\S+@\S+\.\S+/.test(customer.email)) {
    //   newErrors.email = "Invalid email format";
    // }

    if (!customer.email.trim()) {
      newErrors.email = "Email is required";
    } else if (/[A-Z]/.test(customer.email)) {
      newErrors.email = "Capital letters not allowed in email";
    } else if (!/\S+@\S+\.\S+/.test(customer.email)) {
      newErrors.email = "Invalid email format";
    }


    if (!/^\d{10}$/.test(customer.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!validate()) {
      setLoader(false);
      return;
    }

    setLoader(true);
    if (id) {
      dispatch(updateUser(id, customer, "Cust"));
    } else {
      dispatch(addStuff(customer, "Cust"));
    }
  };

  return (
    <StyledContainer>
      <StyledForm onSubmit={submitHandler}>
        <Title>{id ? "Update Customer ✏️" : "Add Customer 🧍"}</Title>

        <InputRow>
          <InputGroup>
            <Label>First Name</Label>
            <StyledInput
              name="firstName"
              value={customer.firstName}
              onChange={handleChange}
              hasError={!!errors.firstName}
            />
            {errors.firstName && <ErrorText>{errors.firstName}</ErrorText>}
          </InputGroup>
          <InputGroup>
            <Label>Last Name</Label>
            <StyledInput
              name="lastName"
              value={customer.lastName}
              onChange={handleChange}
              hasError={!!errors.lastName}
            />
            {errors.lastName && <ErrorText>{errors.lastName}</ErrorText>}
          </InputGroup>
        </InputRow>

        <InputRow>
          <InputGroup>
            <Label>Gender</Label>
            <StyledSelect name="gender" value={customer.gender} onChange={handleChange} hasError={!!errors.gender}>
              <option value="" disabled hidden>Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </StyledSelect>
            {errors.gender && <ErrorText>{errors.gender}</ErrorText>}
          </InputGroup>
          <InputGroup>
            <Label>Birth Date</Label>
            <StyledInput
              type="date"
              name="birthDate"
              value={customer.birthDate}
              onChange={handleChange}
              hasError={!!errors.birthDate}
            />
            {errors.birthDate && <ErrorText>{errors.birthDate}</ErrorText>}
          </InputGroup>
        </InputRow>

        <InputRow>
          <InputGroup>
            <Label>Email</Label>
            <StyledInput
              type="email"
              name="email"
              value={customer.email}
              onChange={handleChange}
              hasError={!!errors.email}
            />
            {errors.email && <ErrorText>{errors.email}</ErrorText>}
          </InputGroup>
          <InputGroup>
            <Label>Phone Number</Label>
            <StyledInput
              type="tel"
              name="phoneNumber"
              value={customer.phoneNumber}
              onChange={handleChange}
              hasError={!!errors.phoneNumber}
            />
            {errors.phoneNumber && <ErrorText>{errors.phoneNumber}</ErrorText>}
          </InputGroup>
        </InputRow>

        <StyledButton type="submit" disabled={loader}>
          {loader ? <CircularProgress size={24} color="inherit" /> : id ? "Update Customer" : "Add Customer"}
        </StyledButton>

        {message && <MessageText error={status === 'error'}>{message}</MessageText>}
      </StyledForm>
    </StyledContainer>
  );
};

export default AddCustomer;

// 🌟 Styled Components (matches courier form style + responsive updates)

const StyledContainer = styled.div`
  padding: 5rem;
  background: #ffffff;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const StyledForm = styled.form`
  width: 100%;
  max-width: 900px;
  background: #ffffff;
  padding: 40px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 30px 20px;
  }

  @media (max-width: 480px) {
    padding: 20px 15px;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  margin-top:-40px;
  font-weight: 600;
  color: #343a40;
  font-size: 2rem;

  @media (max-width: 480px) {
    font-size: 1.5rem;
      margin-top:-20px;

  }
`;

const InputRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const InputGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 200px;

  @media (max-width: 480px) {
    min-width: 100%;
  }
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 6px;
  color: #495057;
`;

const StyledInput = styled.input`
  padding: 10px 12px;
  border: 1px solid ${({ hasError }) => (hasError ? 'red' : '#ced4da')};
  border-radius: 6px;
  font-size: 14px;

  &:focus {
    border-color: ${({ hasError }) => (hasError ? 'red' : '#339af0')};
    outline: none;
  }
`;

// const StyledSelect = styled.select`
//   padding: 10px 12px;
//   border: 1px solid ${({ hasError }) => (hasError ? 'red' : '#ced4da')};
//   border-radius: 6px;
//   font-size: 14px;

//   &:focus {
//     border-color: ${({ hasError }) => (hasError ? 'red' : '#339af0')};
//     outline: none;
//   }
// `;

const StyledSelect = styled.select`
  padding: 10px 12px;
  border: 1px solid ${({ hasError }) => (hasError ? 'red' : '#ced4da')};
  border-radius: 6px;
  font-size: 14px;
  background-color: white;
  appearance: none; /* hide default arrow */

  /* custom arrow icon */
  background-image: url("data:image/svg+xml;utf8,<svg fill='gray' height='22' viewBox='0 0 24 24' width='22' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 10px center; /* adjust arrow position */
  background-size: 20px; /* 🔹 increased from 16px → 20px */

  &:focus {
    border-color: ${({ hasError }) => (hasError ? 'red' : '#339af0')};
    outline: none;
  }

  @media (max-width: 480px) {
    background-position: right 8px center;
    background-size: 18px; /* slightly smaller for small screens */
  }
`;


const StyledButton = styled.button`
  margin-top: 30px;
  background: #339af0;
  color: white;
  font-weight: 600;
  padding: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover:not(:disabled) {
    background: #1c7ed6;
  }

  &:disabled {
    background: #74c0fc;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    padding: 14px;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 13px;
  margin-top: 4px;
`;

const MessageText = styled.p`
  margin-top: 20px;
  text-align: center;
  font-weight: 500;
  color: ${({ error }) => (error ? '#e03131' : '#2f9e44')};
`;
