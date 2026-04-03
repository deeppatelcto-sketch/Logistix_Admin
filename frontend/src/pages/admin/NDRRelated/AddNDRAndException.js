import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNDREntry } from '../../../redux/ndrRelated/ndrHandle';
import { getAllOrders } from '../../../redux/orderRelated/orderHandel';
import styled from 'styled-components';
import { TextField, MenuItem, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddNDRAndException = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders } = useSelector((state) => state.order);

  const [formData, setFormData] = useState({
    orderId: '',
    reason: '',
    attempts: '',
    lastUpdate: '',
    date: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.orderId) newErrors.orderId = 'Order is required';
    if (!formData.reason.trim()) newErrors.reason = 'Reason is required';
    if (!formData.attempts.trim()) newErrors.attempts = 'Attempts is required';
    if (!formData.lastUpdate.trim()) newErrors.lastUpdate = 'Last Update is required';
    if (!formData.date.trim()) newErrors.date = 'Date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setStatus(null);

    if (!validate()) return;

    setLoading(true);
    const selectedOrder = orders.find((o) => o._id === formData.orderId);
    const payload = {
      ...formData,
      mode: selectedOrder?.paymentMode || '',
    };

    const result = await dispatch(createNDREntry(payload));
    if (result.meta.requestStatus === 'fulfilled') {
      setMessage('✅ Entry Added Successfully');
      setStatus('success');
      setFormData({ orderId: '', reason: '', attempts: '', lastUpdate: '', date: '' });
      setErrors({});

      setTimeout(() => navigate('/Admin/ShowNDR&Exception'), 1500);
    } else {
      setMessage('❌ Failed to Add Entry');
      setStatus('error');
    }

    setLoading(false);
  };

  return (
    <StyledContainer>
      <StyledForm onSubmit={handleSubmit}>
        <Title>Add NDR / Exception</Title>

        <InputRow>
          <InputGroup>
            <Label>Order</Label>
            <StyledSelect name="orderId" value={formData.orderId} onChange={handleChange} hasError={!!errors.orderId}>
              <option value="">Select Order</option>
              {orders?.map((o) => (
                <option key={o._id} value={o._id}>
                  {o.orderId} ({o.paymentMode})
                </option>
              ))}
            </StyledSelect>
            {errors.orderId && <ErrorText>{errors.orderId}</ErrorText>}
          </InputGroup>

          <InputGroup>
            <Label>Reason</Label>
            <StyledInput
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              hasError={!!errors.reason}
            />
            {errors.reason && <ErrorText>{errors.reason}</ErrorText>}
          </InputGroup>
        </InputRow>

        <InputRow>
          <InputGroup>
            <Label>Attempts</Label>
            <StyledInput
              name="attempts"
              value={formData.attempts}
              onChange={handleChange}
              hasError={!!errors.attempts}
            />
            {errors.attempts && <ErrorText>{errors.attempts}</ErrorText>}
          </InputGroup>

          <InputGroup>
            <Label>Last Update</Label>
            <StyledInput
              type="date"
              name="lastUpdate"
              value={formData.lastUpdate}
              onChange={handleChange}
              hasError={!!errors.lastUpdate}
            />
            {errors.lastUpdate && <ErrorText>{errors.lastUpdate}</ErrorText>}
          </InputGroup>
        </InputRow>

        <InputRow>
          <InputGroup>
            <Label>Date</Label>
            <StyledInput
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              hasError={!!errors.date}
            />
            {errors.date && <ErrorText>{errors.date}</ErrorText>}
          </InputGroup>
        </InputRow>

        <StyledButton type="submit" disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
        </StyledButton>

        {message && <MessageText error={status === 'error'}>{message}</MessageText>}
      </StyledForm>
    </StyledContainer>
  );
};

export default AddNDRAndException;


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
  margin-top: -40px;
  font-weight: 600;
  color: #343a40;
  font-size: 2rem;

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-top: -20px;
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

  /* ✅ custom large gray arrow */
  background-image: url("data:image/svg+xml;utf8,<svg fill='gray' height='22' width='22' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 20px;

  &:focus {
    border-color: ${({ hasError }) => (hasError ? 'red' : '#339af0')};
    outline: none;
  }

  @media (max-width: 480px) {
    background-position: right 8px center;
    background-size: 18px;
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
