


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addAppointment } from '../../../redux/appointmentRelated/appointmentHandle';
// import { getAllOrders } from '../../../redux/orderRelated/orderHandel';
// import { getAllCust } from '../../../redux/custRelated/custHandle';
// import { CircularProgress, Typography } from '@mui/material';
// import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';
// import { resetState } from '../../../redux/appointmentRelated/appointmentSlice';

// const generateTimeSlots = () => {
//   const times = [];
//   for (let hour = 0; hour < 24; hour++) {
//     for (let min = 0; min < 60; min += 30) {
//       const h = hour.toString().padStart(2, '0');
//       const m = min.toString().padStart(2, '0');
//       times.push(`${h}:${m}`);
//     }
//   }
//   return times;
// };

// const AddAppointment = () => {
//   const dispatch = useDispatch();
//   const { orders } = useSelector((state) => state.order);
//   const { custList } = useSelector((state) => state.cust);
//   const { successMessage, error } = useSelector((state) => state.appointment);

//   const [message, setMessage] = useState('');
//   const [errors, setErrors] = useState({});
//   const [loader, setLoader] = useState(false);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     lrNo: '',
//     appointmentDate: '',
//     startTime: '',
//     endTime: '',
//     appointmentId: '',
//     poNumber: '',
//     asn: '',
//     poCopy: null,
//     user: '',
//   });

//   useEffect(() => {
//     dispatch(getAllOrders());
//     dispatch(getAllCust());
//   }, [dispatch]);

//   useEffect(() => {
//     if (successMessage) {
//       const timer = setTimeout(() => {
//         dispatch(resetState());
//         navigate('/Admin/ShowAppointments');
//       }, 1500);
//       return () => clearTimeout(timer);
//     }
//   }, [successMessage, dispatch, navigate]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData({
//       ...formData,
//       [name]: files ? files[0] : value,
//     });
//     if (errors[name]) {
//       setErrors((prev) => {
//         const newErrors = { ...prev };
//         delete newErrors[name];
//         return newErrors;
//       });
//     }
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.user) newErrors.user = 'User is required';
//     if (!formData.lrNo) newErrors.lrNo = 'LR No (Order ID) is required';
//     if (!formData.appointmentDate) newErrors.appointmentDate = 'Date is required';
//     if (!formData.startTime) newErrors.startTime = 'Start Time is required';
//     if (!formData.endTime) newErrors.endTime = 'End Time is required';
//     if (!formData.poNumber.trim()) newErrors.poNumber = 'PO Number is required';
//     if (!formData.asn.trim()) newErrors.asn = 'ASN is required';
//     if (!formData.poCopy) newErrors.poCopy = 'PO Copy is required';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validate()) return;
//     setLoader(true);
//     const data = new FormData();
//     Object.keys(formData).forEach((key) => {
//       if (formData[key]) data.append(key, formData[key]);
//     });
//     dispatch(addAppointment(data));
//   };

//   const timeSlots = generateTimeSlots();

//   // ✅ Filter pending or readytoship orders (same as WeightReconciliation)
//   const filteredOrders = orders.filter(
//     (o) => o.status === 'pending' || o.status === 'readytoship'
//   );

//   return (
//     <StyledContainer>
//       <StyledForm onSubmit={handleSubmit}>
//         <Title>Add Appointment 📅</Title>

//         <InputGroup style={{ marginBottom: '20px' }}>
//           <Label>Select User</Label>
//           <StyledSelect
//             name="user"
//             value={formData.user}
//             onChange={handleChange}
//             hasError={!!errors.user}
//           >
//             <option value="" disabled hidden>Select User</option>
//             {custList.map((cust) => (
//               <option key={cust._id} value={cust._id}>
//                 {cust.name || cust.email || cust._id}
//               </option>
//             ))}
//           </StyledSelect>
//           {errors.user && <ErrorText>{errors.user}</ErrorText>}
//         </InputGroup>

//         <InputRow>
//           <InputGroup>
//             <Label>LR No (Order ID)</Label>
//             {/* ✅ Replaced with dropdown like WeightReconciliation */}
//             <StyledSelect
//               name="lrNo"
//               value={formData.lrNo}
//               onChange={handleChange}
//               hasError={!!errors.lrNo}
//             >
//               <option value="" disabled hidden>-- Select Order ID --</option>
//               {filteredOrders.map((order) => (
//                 <option key={order._id} value={order.orderId}>
//                   {order.orderId}
//                 </option>
//               ))}
//             </StyledSelect>
//             {errors.lrNo && <ErrorText>{errors.lrNo}</ErrorText>}
//           </InputGroup>

//           <InputGroup>
//             <Label>Appointment Date</Label>
//             <StyledInput
//               type="date"
//               name="appointmentDate"
//               value={formData.appointmentDate}
//               onChange={handleChange}
//               hasError={!!errors.appointmentDate}
//             />
//             {errors.appointmentDate && <ErrorText>{errors.appointmentDate}</ErrorText>}
//           </InputGroup>
//         </InputRow>

//         <InputRow>
//           <InputGroup>
//             <Label>Start Time</Label>
//             <StyledSelect
//               name="startTime"
//               value={formData.startTime}
//               onChange={handleChange}
//               hasError={!!errors.startTime}
//             >
//               <option value="">Select Start Time</option>
//               {timeSlots.map((slot) => (
//                 <option key={slot} value={slot}>
//                   {slot}
//                 </option>
//               ))}
//             </StyledSelect>
//             {errors.startTime && <ErrorText>{errors.startTime}</ErrorText>}
//           </InputGroup>

//           <InputGroup>
//             <Label>End Time</Label>
//             <StyledSelect
//               name="endTime"
//               value={formData.endTime}
//               onChange={handleChange}
//               hasError={!!errors.endTime}
//             >
//               <option value="">Select End Time</option>
//               {timeSlots.map((slot) => (
//                 <option key={slot} value={slot}>
//                   {slot}
//                 </option>
//               ))}
//             </StyledSelect>
//             {errors.endTime && <ErrorText>{errors.endTime}</ErrorText>}
//           </InputGroup>
//         </InputRow>

//         <InputRow>
//           <InputGroup>
//             <Label>Appointment ID</Label>
//             <StyledInput
//               name="appointmentId"
//               value={formData.appointmentId}
//               onChange={handleChange}
//             />
//           </InputGroup>

//           <InputGroup>
//             <Label>PO Number</Label>
//             <StyledInput
//               name="poNumber"
//               value={formData.poNumber}
//               onChange={handleChange}
//               hasError={!!errors.poNumber}
//             />
//             {errors.poNumber && <ErrorText>{errors.poNumber}</ErrorText>}
//           </InputGroup>
//         </InputRow>

//         <InputRow>
//           <InputGroup>
//             <Label>ASN</Label>
//             <StyledInput
//               name="asn"
//               value={formData.asn}
//               onChange={handleChange}
//               hasError={!!errors.asn}
//             />
//             {errors.asn && <ErrorText>{errors.asn}</ErrorText>}
//           </InputGroup>

//           <InputGroup>
//             <Label>PO Copy</Label>
//             <StyledInput
//               type="file"
//               name="poCopy"
//               accept=".pdf,.jpg,.jpeg,.png"
//               onChange={handleChange}
//               hasError={!!errors.poCopy}
//             />
//             {formData.poCopy && typeof formData.poCopy === 'object' && (
//               <small>{formData.poCopy.name}</small>
//             )}
//             {errors.poCopy && <ErrorText>{errors.poCopy}</ErrorText>}
//           </InputGroup>
//         </InputRow>

//         <StyledButton type="submit" disabled={loader}>
//           {loader ? <CircularProgress size={24} color="inherit" /> : 'Add Appointment'}
//         </StyledButton>

//         {message && <MessageText error>{message}</MessageText>}
//         {successMessage && <MessageText>{successMessage}</MessageText>}
//         {error && <MessageText error>{error}</MessageText>}
//       </StyledForm>
//     </StyledContainer>
//   );
// };

// export default AddAppointment;

// // === ✅ STYLING (same as before) ===

// const StyledContainer = styled.div`
//   padding: 5rem;
//   background: #ffffff;
//   min-height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: flex-start;

//   @media (max-width: 768px) {
//     padding: 2rem 1rem;
//   }
// `;

// const StyledForm = styled.form`
//   width: 100%;
//   max-width: 900px;
//   background: #ffffff;
//   padding: 40px;
//   border-radius: 12px;
//   display: flex;
//   flex-direction: column;

//   @media (max-width: 768px) {
//     padding: 30px 20px;
//   }
// `;

// const Title = styled.h2`
//   text-align: center;
//   margin-bottom: 2rem;
//   font-weight: 600;
//   color: #333;
//   margin-top: -70px;
// `;

// const InputRow = styled.div`
//   display: flex;
//   gap: 20px;
//   margin-bottom: 20px;
//   flex-wrap: wrap;
// `;

// const InputGroup = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   min-width: 200px;
// `;

// const Label = styled.label`
//   font-size: 14px;
//   font-weight: 500;
//   margin-bottom: 6px;
//   color: #495057;
// `;

// const StyledInput = styled.input`
//   padding: 10px 12px;
//   border: 1px solid ${({ hasError }) => (hasError ? 'red' : '#ced4da')};
//   border-radius: 6px;
//   font-size: 14px;

//   &:focus {
//     border-color: ${({ hasError }) => (hasError ? 'red' : '#339af0')};
//     outline: none;
//   }
// `;

// const StyledSelect = styled.select`
//   padding: 10px 12px;
//   border: 1px solid ${({ hasError }) => (hasError ? 'red' : '#ced4da')};
//   border-radius: 6px;
//   font-size: 14px;
//   background-color: white;
//   appearance: none;

//   /* ✅ Custom gray dropdown arrow */
//   background-image: url("data:image/svg+xml;utf8,<svg fill='gray' height='22' width='22' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
//   background-repeat: no-repeat;
//   background-position: right 10px center;
//   background-size: 20px;

//   &:focus {
//     border-color: ${({ hasError }) => (hasError ? 'red' : '#339af0')};
//     outline: none;
//   }

//   @media (max-width: 480px) {
//     background-position: right 8px center;
//     background-size: 18px;
//   }
// `;

// const StyledButton = styled.button`
//   margin-top: 30px;
//   background: #339af0;
//   color: white;
//   font-weight: 600;
//   padding: 12px;
//   border: none;
//   border-radius: 6px;
//   cursor: pointer;
//   transition: background 0.3s ease;

//   &:hover:not(:disabled) {
//     background: #1c7ed6;
//   }

//   &:disabled {
//     background: #74c0fc;
//     cursor: not-allowed;
//   }
// `;

// const ErrorText = styled.p`
//   color: red;
//   font-size: 13px;
//   margin-top: 4px;
// `;

// const MessageText = styled.p`
//   margin-top: 20px;
//   text-align: center;
//   font-weight: 500;
//   color: ${({ error }) => (error ? '#e03131' : '#2f9e44')};
// `;





import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAppointment } from '../../../redux/appointmentRelated/appointmentHandle';
import { getAllOrders } from '../../../redux/orderRelated/orderHandel';
import { getAllCust } from '../../../redux/custRelated/custHandle';
import { CircularProgress } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { resetState } from '../../../redux/appointmentRelated/appointmentSlice';

// ✅ Updated 12-hour format time slot generator (with AM/PM)
const generateTimeSlots = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let min = 0; min < 60; min += 30) {
      let period = hour < 12 ? 'AM' : 'PM';
      let adjustedHour = hour % 12 || 12; // 0 becomes 12
      const h = adjustedHour.toString().padStart(2, '0');
      const m = min.toString().padStart(2, '0');
      times.push(`${h}:${m} ${period}`);
    }
  }
  return times;
};

const AddAppointment = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { custList } = useSelector((state) => state.cust);
  const { successMessage, error } = useSelector((state) => state.appointment);

  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    lrNo: '',
    appointmentDate: '',
    startTime: '',
    endTime: '',
    appointmentId: '',
    poNumber: '',
    asn: '',
    poCopy: null,
    user: '',
  });

  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(getAllCust());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        dispatch(resetState());
        navigate('/Admin/ShowAppointments');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [successMessage, dispatch, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
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
    if (!formData.user) newErrors.user = 'User is required';
    if (!formData.lrNo) newErrors.lrNo = 'LR No (Order ID) is required';
    if (!formData.appointmentDate) newErrors.appointmentDate = 'Date is required';
    if (!formData.startTime) newErrors.startTime = 'Start Time is required';
    if (!formData.endTime) newErrors.endTime = 'End Time is required';
    if (!formData.poNumber.trim()) newErrors.poNumber = 'PO Number is required';
    if (!formData.asn.trim()) newErrors.asn = 'ASN is required';
    if (!formData.poCopy) newErrors.poCopy = 'PO Copy is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoader(true);
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) data.append(key, formData[key]);
    });
    dispatch(addAppointment(data));
  };

  const timeSlots = generateTimeSlots();

  const filteredOrders = orders.filter(
    (o) => o.status === 'pending' || o.status === 'readytoship'
  );

  return (
    <StyledContainer>
      <StyledForm onSubmit={handleSubmit}>
        <Title>Add Appointment 📅</Title>

        <InputGroup style={{ marginBottom: '20px' }}>
          <Label>Select User</Label>
          <StyledSelect
            name="user"
            value={formData.user}
            onChange={handleChange}
            hasError={!!errors.user}
          >
            <option value="" disabled hidden>Select User</option>
            {custList.map((cust) => (
              <option key={cust._id} value={cust._id}>
                {cust.name || cust.email || cust._id}
              </option>
            ))}
          </StyledSelect>
          {errors.user && <ErrorText>{errors.user}</ErrorText>}
        </InputGroup>

        <InputRow>
          <InputGroup>
            <Label>LR No (Order ID)</Label>
            <StyledSelect
              name="lrNo"
              value={formData.lrNo}
              onChange={handleChange}
              hasError={!!errors.lrNo}
            >
              <option value="" disabled hidden>-- Select Order ID --</option>
              {filteredOrders.map((order) => (
                <option key={order._id} value={order.orderId}>
                  {order.orderId}
                </option>
              ))}
            </StyledSelect>
            {errors.lrNo && <ErrorText>{errors.lrNo}</ErrorText>}
          </InputGroup>

          <InputGroup>
            <Label>Appointment Date</Label>
            <StyledInput
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              hasError={!!errors.appointmentDate}
            />
            {errors.appointmentDate && <ErrorText>{errors.appointmentDate}</ErrorText>}
          </InputGroup>
        </InputRow>

        <InputRow>
          <InputGroup>
            <Label>Start Time</Label>
            <StyledSelect
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              hasError={!!errors.startTime}
            >
              <option value="" disabled hidden>Select Start Time</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </StyledSelect>
            {errors.startTime && <ErrorText>{errors.startTime}</ErrorText>}
          </InputGroup>

          <InputGroup>
            <Label>End Time</Label>
            <StyledSelect
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              hasError={!!errors.endTime}
            >
              <option value="" disabled hidden>Select End Time</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </StyledSelect>
            {errors.endTime && <ErrorText>{errors.endTime}</ErrorText>}
          </InputGroup>
        </InputRow>

        <InputRow>
          <InputGroup>
            <Label>Appointment ID</Label>
            <StyledInput
              name="appointmentId"
              value={formData.appointmentId}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <Label>PO Number</Label>
            <StyledInput
              name="poNumber"
              value={formData.poNumber}
              onChange={handleChange}
              hasError={!!errors.poNumber}
            />
            {errors.poNumber && <ErrorText>{errors.poNumber}</ErrorText>}
          </InputGroup>
        </InputRow>

        <InputRow>
          <InputGroup>
            <Label>ASN</Label>
            <StyledInput
              name="asn"
              value={formData.asn}
              onChange={handleChange}
              hasError={!!errors.asn}
            />
            {errors.asn && <ErrorText>{errors.asn}</ErrorText>}
          </InputGroup>

          <InputGroup>
            <Label>PO Copy</Label>
            <StyledInput
              type="file"
              name="poCopy"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleChange}
              hasError={!!errors.poCopy}
            />
            {formData.poCopy && typeof formData.poCopy === 'object' && (
              <small>{formData.poCopy.name}</small>
            )}
            {errors.poCopy && <ErrorText>{errors.poCopy}</ErrorText>}
          </InputGroup>
        </InputRow>

        <StyledButton type="submit" disabled={loader}>
          {loader ? <CircularProgress size={24} color="inherit" /> : 'Add Appointment'}
        </StyledButton>

        {message && <MessageText error>{message}</MessageText>}
        {successMessage && <MessageText>{successMessage}</MessageText>}
        {error && <MessageText error>{error}</MessageText>}
      </StyledForm>
    </StyledContainer>
  );
};

export default AddAppointment;

// === ✅ Styling (unchanged) ===

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
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 600;
  color: #333;
  margin-top: -70px;
`;

const InputRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const InputGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 200px;
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

const StyledSelect = styled.select`
  padding: 10px 12px;
  border: 1px solid ${({ hasError }) => (hasError ? 'red' : '#ced4da')};
  border-radius: 6px;
  font-size: 14px;
  background-color: white;
  appearance: none;

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
