// src/components/Admin/Plans/AddPlan.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff, updateUser } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { CircularProgress } from '@mui/material';
import styled from 'styled-components';

const AddPlan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { status, response, error } = useSelector(state => state.user);
  const plans = useSelector(state => state.plan.plans || []);

  const [plan, setPlan] = useState({
    name: '',
    price: '',
    baseRate: '',
    docketCharge: '',
    fuelCharge: '',
    minCharge: '',
    odaCharge: '',
    appointmentDeliveries: '',
    integrations: '',
    whatsappUpdates: false,
    prioritySupport: '',
    ndrCallSetup: false,
    additionalUsers: '',
    usageLimit: '',
    isActive: true,
  });

  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");

  const isNonNegativeNumber = (value) => !isNaN(value) && Number(value) >= 0;

  const validate = () => {
    let newErrors = {};

    if (!plan.name || plan.name.trim() === '') {
      newErrors.name = 'Plan name is required';
    } else {
      const nameExists = plans.some(p => p.name.toLowerCase() === plan.name.trim().toLowerCase() && p._id !== id);
      if (nameExists) newErrors.name = 'Plan name must be unique';
    }

    if (!plan.price || plan.price.trim() === '') {
      newErrors.price = 'Price is required';
    }

    if (plan.docketCharge === '' || plan.docketCharge === null) {
      newErrors.docketCharge = 'Docket Charge is required';
    } else if (!isNonNegativeNumber(plan.docketCharge)) {
      newErrors.docketCharge = 'Must be non-negative number';
    }

    if (plan.fuelCharge === '' || plan.fuelCharge === null) {
      newErrors.fuelCharge = 'Fuel Charge is required';
    } else if (!isNonNegativeNumber(plan.fuelCharge)) {
      newErrors.fuelCharge = 'Must be non-negative number';
    }

    if (plan.minCharge === '' || plan.minCharge === null) {
      newErrors.minCharge = 'Minimum Charge is required';
    } else if (!isNonNegativeNumber(plan.minCharge)) {
      newErrors.minCharge = 'Must be non-negative number';
    }

    if (!plan.odaCharge || plan.odaCharge.trim() === '') {
      newErrors.odaCharge = 'ODA Charge is required';
    }

    if (plan.appointmentDeliveries === '' || plan.appointmentDeliveries === null) {
      newErrors.appointmentDeliveries = 'Appointment Deliveries is required';
    } else if (!isNonNegativeNumber(plan.appointmentDeliveries)) {
      newErrors.appointmentDeliveries = 'Must be non-negative number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (status === 'added' || status === 'updated') {
      setMessage(id ? "Plan updated successfully ✅" : "Plan added successfully ✅");
      setLoader(false);
      setTimeout(() => {
        dispatch(underControl());
        navigate('/Admin/plans');
      }, 1500);
    } else if (status === 'failed') {
      setMessage(response || "Something went wrong. Please try again.");
      setLoader(false);
      dispatch(underControl());
    } else if (status === 'error') {
      setMessage(error || "Network Error. Please try again.");
      setLoader(false);
      dispatch(underControl());
    }
  }, [status, response, error, id, dispatch, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let val = type === 'checkbox' ? checked : value;
    if (type === 'number' && val !== '') val = Number(val);

    setPlan(prev => ({
      ...prev,
      [name]: val,
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoader(true);
    if (id) {
      dispatch(updateUser(id, plan, "Plan"));
      setMessage("Updating plan...");
    } else {
      dispatch(addStuff(plan, "Plan"));
    }
  };

  const hasError = status === 'error' || status === 'failed';

  return (
    <StyledContainer>
      <StyledForm onSubmit={submitHandler}>
        <Title>{id ? "Update Plan ✏️" : "Add Plan 📜"}</Title>

        {/* Row 1 */}
        <InputRow>
          <InputGroup>
            <Label>Plan Name</Label>
            <StyledInput
              name="name"
              value={plan.name}
              onChange={handleChange}
              error={errors.name}
            />
            {errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}
          </InputGroup>
          <InputGroup>
            <Label>Price (₹)</Label>
            <StyledInput
              name="price"
              value={plan.price}
              onChange={handleChange}
              error={errors.price}
            />
            {errors.price && <ErrorMsg>{errors.price}</ErrorMsg>}
          </InputGroup>
        </InputRow>

        {/* Row 2 */}
        <InputRow>
          <InputGroup>
            <Label>Base Rate</Label>
            <StyledInput name="baseRate" value={plan.baseRate} onChange={handleChange} />
          </InputGroup>
          <InputGroup>
            <Label>Docket Charge (%)</Label>
            <StyledInput
              type="number"
              name="docketCharge"
              value={plan.docketCharge}
              onChange={handleChange}
              error={errors.docketCharge}
            />
            {errors.docketCharge && <ErrorMsg>{errors.docketCharge}</ErrorMsg>}
          </InputGroup>
        </InputRow>

        {/* Row 3 */}
        <InputRow>
          <InputGroup>
            <Label>Fuel Charge (%)</Label>
            <StyledInput
              type="number"
              name="fuelCharge"
              value={plan.fuelCharge}
              onChange={handleChange}
              error={errors.fuelCharge}
            />
            {errors.fuelCharge && <ErrorMsg>{errors.fuelCharge}</ErrorMsg>}
          </InputGroup>
          <InputGroup>
            <Label>Minimum Charge (₹)</Label>
            <StyledInput
              type="number"
              name="minCharge"
              value={plan.minCharge}
              onChange={handleChange}
              error={errors.minCharge}
            />
            {errors.minCharge && <ErrorMsg>{errors.minCharge}</ErrorMsg>}
          </InputGroup>
        </InputRow>

        {/* Row 4 */}
        <InputRow>
          <InputGroup>
            <Label>ODA Charge</Label>
            <StyledInput name="odaCharge" value={plan.odaCharge} onChange={handleChange} error={errors.odaCharge} />
            {errors.odaCharge && <ErrorMsg>{errors.odaCharge}</ErrorMsg>}
          </InputGroup>
          <InputGroup>
            <Label>Appointment Deliveries</Label>
            <StyledInput
              type="number"
              name="appointmentDeliveries"
              value={plan.appointmentDeliveries}
              onChange={handleChange}
              error={errors.appointmentDeliveries}
            />
            {errors.appointmentDeliveries && <ErrorMsg>{errors.appointmentDeliveries}</ErrorMsg>}
          </InputGroup>
        </InputRow>

        {/* Optional Fields */}
        <InputRow>
          <InputGroup>
            <Label>Integrations</Label>
            <StyledInput name="integrations" value={plan.integrations} onChange={handleChange} />
          </InputGroup>
          <InputGroup>
            <Label>Priority Support</Label>
            <StyledInput name="prioritySupport" value={plan.prioritySupport} onChange={handleChange} />
          </InputGroup>
        </InputRow>

        <InputRow>
          <InputGroup>
            <Label>Additional Users</Label>
            <StyledInput name="additionalUsers" value={plan.additionalUsers} onChange={handleChange} />
          </InputGroup>
          <InputGroup>
            <Label>Usage Limit</Label>
            <StyledInput name="usageLimit" value={plan.usageLimit} onChange={handleChange} />
          </InputGroup>
        </InputRow>

        {/* Checkbox Options */}
        <CheckboxRow>
          <CheckboxGroup>
            <StyledCheckbox type="checkbox" name="whatsappUpdates" checked={plan.whatsappUpdates} onChange={handleChange} />
            <Label>WhatsApp Updates</Label>
          </CheckboxGroup>
          <CheckboxGroup>
            <StyledCheckbox type="checkbox" name="ndrCallSetup" checked={plan.ndrCallSetup} onChange={handleChange} />
            <Label>NDR Call Setup</Label>
          </CheckboxGroup>
          
        </CheckboxRow>

        <StyledButton type="submit" disabled={loader}>
          {loader ? <CircularProgress size={24} color="inherit" /> : id ? "Update Plan" : "Add Plan"}
        </StyledButton>

        {message && <MessageText error={hasError}>{message}</MessageText>}
      </StyledForm>
    </StyledContainer>
  );
};

export default AddPlan;

// Styled-components remain unchanged as in your version

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
  border: 1px solid ${({ error }) => (error ? 'red' : '#ced4da')};
  border-radius: 6px;
  font-size: 14px;

  &:focus {
    border-color: ${({ error }) => (error ? 'red' : '#339af0')};
    outline: none;
  }
`;

const ErrorMsg = styled.span`
  color: red;
  font-size: 13px;
  margin-top: 4px;
`;

const CheckboxRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CheckboxGroup = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StyledCheckbox = styled.input`
  width: 18px;
  height: 18px;
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

const MessageText = styled.p`
  margin-top: 20px;
  text-align: center;
  font-weight: 500;
  color: ${({ error }) => (error ? '#e03131' : '#2f9e44')};
`;
