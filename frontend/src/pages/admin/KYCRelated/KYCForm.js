import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createKYCRequest } from '../../../redux/kycRelated/kycHandel';
import { getAllCourierCompanies } from '../../../redux/couriercompanyRelated/couriercompanyHandle';
import styled from 'styled-components';
import { CircularProgress, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const KYCForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { courierCompanies, loading } = useSelector((state) => state.couriercompany);

  const [form, setForm] = useState({
    consignerMobileNo: '',
    organizationType: '',
    documentOneType: '',
    documentTwoType: '',
    documentOne: null,
    documentTwo: null,
  });

  const [docOptions, setDocOptions] = useState([]);
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const orgDocMap = {
    Individual: ["Passport", "PAN Card", "Voter ID", "Driving Licence", "Bank Acc Statement", "Ration Card", "Aadhaar Card"],
    Company: ["Certificate of Incorporation", "Memorandum of Association", "Article of Association", "Power of Attorney", "PAN Card", "Telephone Bill", "IEC Copy", "GST Certificate"],
    "Partnership firm": ["Registration Certificate", "Partnership Deed", "Power of Attorney", "Telephone Bill", "Other Documents"],
    "Trusts, Foundations": ["Certificate of Registration", "Power of Attorney", "Resolution of Entity", "Telephone Bill", "Other Documents"]
  };

  useEffect(() => {
    dispatch(getAllCourierCompanies());
  }, [dispatch]);

  useEffect(() => {
    if (form.organizationType && orgDocMap[form.organizationType]) {
      setDocOptions(orgDocMap[form.organizationType]);
      setForm((prev) => ({
        ...prev,
        documentOneType: '',
        documentTwoType: ''
      }));
    }
  }, [form.organizationType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleFileChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.files[0] }));
    if (errors[e.target.name]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[e.target.name];
        return updated;
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.consignerMobileNo) newErrors.consignerMobileNo = "Courier Company is required";
    if (!form.organizationType) newErrors.organizationType = "Organization Type is required";
    if (!form.documentOneType) newErrors.documentOneType = "Document 1 Type is required";
    if (!form.documentTwoType) newErrors.documentTwoType = "Document 2 Type is required";
    if (!form.documentOne) newErrors.documentOne = "Document 1 file is required";
    if (!form.documentTwo) newErrors.documentTwo = "Document 2 file is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setStatus(null);

    if (!validate()) {
      return;
    }

    setLoader(true);
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    try {
      const result = await dispatch(createKYCRequest(formData));

      if (result?.meta?.requestStatus === 'fulfilled') {
        setMessage("KYC submitted successfully ✅");
        setStatus('success');
        setTimeout(() => navigate('/Admin/ShowKYC'), 1500);
      } else {
        const errorMsg = result?.payload?.message || result?.error?.message || "KYC submission failed ❌";
        setMessage(errorMsg);
        setStatus('error');
      }
    } catch (err) {
      setMessage("Something went wrong ❌");
      setStatus('error');
    }

    setLoader(false);
  };

  return (
    <StyledContainer>
      <StyledForm onSubmit={handleSubmit}>
        <Title>KYC Submission</Title>

        <InputRow>
          <InputGroup>
            <Label>Courier Company</Label>
            <StyledSelect
              name="consignerMobileNo"
              value={form.consignerMobileNo}
              onChange={handleChange}
              disabled={loading}
              hasError={!!errors.consignerMobileNo}
            >
              <option value="" disabled hidden>Select Courier Company</option>
              {courierCompanies?.map((company) => (
                <option key={company._id} value={company.contactNo}>
                  {company.companyName} ({company.contactNo})
                </option>
              ))}
            </StyledSelect>
            {errors.consignerMobileNo && <ErrorText>{errors.consignerMobileNo}</ErrorText>}
          </InputGroup>

          <InputGroup>
            <Label>Organization Type</Label>
            <StyledSelect
              name="organizationType"
              value={form.organizationType}
              onChange={handleChange}
              hasError={!!errors.organizationType}
            >
              <option value="" disabled hidden>Select Organization</option>
              {Object.keys(orgDocMap).map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </StyledSelect>
            {errors.organizationType && <ErrorText>{errors.organizationType}</ErrorText>}
          </InputGroup>
        </InputRow>

        <InputRow>
          <InputGroup>
            <Label>Document 1 Type</Label>
            <StyledSelect
              name="documentOneType"
              value={form.documentOneType}
              onChange={handleChange}
              disabled={!form.organizationType}
              hasError={!!errors.documentOneType}
            >
              <option value="" disabled hidden>Select Document 1</option>
              {docOptions.map((doc) => (
                <option key={doc} value={doc} disabled={doc === form.documentTwoType}>
                  {doc}
                </option>
              ))}
            </StyledSelect>
            {errors.documentOneType && <ErrorText>{errors.documentOneType}</ErrorText>}
          </InputGroup>

          <InputGroup>
            <Label>Upload Document 1</Label>
            <StyledInputFile
              type="file"
              name="documentOne"
              onChange={handleFileChange}
              hasError={!!errors.documentOne}
            />
            {errors.documentOne && <ErrorText>{errors.documentOne}</ErrorText>}
          </InputGroup>
        </InputRow>

        <InputRow>
          <InputGroup>
            <Label>Document 2 Type</Label>
            <StyledSelect
              name="documentTwoType"
              value={form.documentTwoType}
              onChange={handleChange}
              disabled={!form.organizationType}
              hasError={!!errors.documentTwoType}
            >
              <option value="" disabled hidden>Select Document 2</option>
              {docOptions.map((doc) => (
                <option key={doc} value={doc} disabled={doc === form.documentOneType}>
                  {doc}
                </option>
              ))}
            </StyledSelect>
            {errors.documentTwoType && <ErrorText>{errors.documentTwoType}</ErrorText>}
          </InputGroup>

          <InputGroup>
            <Label>Upload Document 2</Label>
            <StyledInputFile
              type="file"
              name="documentTwo"
              onChange={handleFileChange}
              hasError={!!errors.documentTwo}
            />
            {errors.documentTwo && <ErrorText>{errors.documentTwo}</ErrorText>}
          </InputGroup>
        </InputRow>

        <StyledButton type="submit" disabled={loader}>
          {loader ? <CircularProgress size={24} color="inherit" /> : "Submit"}
        </StyledButton>

        {message && <MessageText error={status === 'error'}>{message}</MessageText>}
      </StyledForm>
    </StyledContainer>
  );
};

export default KYCForm;

// Styled Components adapted from AddCustomer for consistent style

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

const StyledInputFile = styled.input`
  padding: 6px 10px;
  border: 1px solid ${({ hasError }) => (hasError ? 'red' : '#ced4da')};
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;

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
