import React, { useState,useEffect } from "react";
import { createPickupPoint } from "../../../redux/pickuppointRelated/pickupPointHandel";
import {
  TextField,
  Grid,
  Typography,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getAllCust } from "../../../redux/custRelated/custHandle";
import { useDispatch, useSelector } from "react-redux";


const containerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "8px",
  overflow: "hidden",
};

const defaultCenter = { lat: 23.0225, lng: 72.5714 };
const addressTypes = ["Office", "Warehouse", "Shop", "Home", "Other"];

const AddPickupPoint = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const [formData, setFormData] = useState({
    pickupPointName: "",
    contactName: "",
    contactNumber: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    email: "",
    addressType: "Office",
    latitude: defaultCenter.lat,
    longitude: defaultCenter.lng,
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const { custList } = useSelector((state) => state.cust);


  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDqnDBKkPCnJhlwoyLpuGSakkjUH7lfiAU",
  });

  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setFormData((prev) => ({ ...prev, latitude: lat, longitude: lng }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  useEffect(() => {
  dispatch(getAllCust());
}, [dispatch]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.pickupPointName.trim()) newErrors.pickupPointName = "Pickup Point Name is required";
    if (!formData.contactName.trim()) newErrors.contactName = "Contact Name is required";
    if (!formData.contactNumber.trim()) newErrors.contactNumber = "Contact Number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.addressType.trim()) newErrors.addressType = "Address Type is required";
    if (!formData.user) newErrors.user = "User is required";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (formData.contactNumber && !/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Contact Number must be 10 digits";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setLoader(false);
      return;
    }

    setLoader(true);
    dispatch(createPickupPoint(formData))
      .then(() => {
        setStatus("success");
        setMessage("Pickup point added successfully ✅");
        setErrors({});
        setLoader(false);
        setTimeout(() => navigate("/Admin/pickuppoints"), 1500);
      })
      .catch(() => {
        setStatus("error");
        setMessage("Failed to add pickup point ❌");
        setLoader(false);
      });
  };

  return (
    <StyledContainer>
      <StyledForm onSubmit={handleSubmit}>
        <Title>Add Pickup Point 📍</Title>

        <Grid container spacing={2}>
          {[
            { name: "pickupPointName", label: "Pickup Point Name" },
            { name: "contactName", label: "Contact Name" },
            { name: "contactNumber", label: "Contact Number" },
            { name: "email", label: "Email" },
            { name: "address", label: "Address" },
            { name: "city", label: "City" },
            { name: "state", label: "State" },
            { name: "pincode", label: "Pincode" },
          ].map((field) => (
            <Grid item xs={12} sm={6} key={field.name}>
              <InputGroup>
                <Label>{field.label}</Label>
                <StyledInput
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  hasError={!!errors[field.name]}
                />
                {errors[field.name] && <ErrorText>{errors[field.name]}</ErrorText>}
              </InputGroup>
            </Grid>
          ))}

          <Grid item xs={12} sm={6}>
  <InputGroup>
    <Label>Select User</Label>
    <StyledSelect
      name="user"
      value={formData.user}
      onChange={handleChange}
      hasError={!!errors.user}
    >
      <option value="" disabled hidden>-- Select User --</option>
      {custList &&
        custList.map((cust) => (
          <option key={cust._id} value={cust._id}>
            {cust.firstName} ({cust.phoneNumber})
          </option>
        ))}
    </StyledSelect>
    {errors.user && <ErrorText>{errors.user}</ErrorText>}
  </InputGroup>
</Grid>


          <Grid item xs={12} sm={6}>
            <InputGroup>
              <Label>Address Type</Label>
              <StyledSelect
                name="addressType"
                value={formData.addressType}
                onChange={handleChange}
                hasError={!!errors.addressType}
              >
                {addressTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </StyledSelect>
              {errors.addressType && <ErrorText>{errors.addressType}</ErrorText>}
            </InputGroup>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1">Select Location on Map</Typography>
            <Box sx={containerStyle}>
              {isLoaded && (
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "100%" }}
                  center={{ lat: formData.latitude, lng: formData.longitude }}
                  zoom={14}
                  onClick={handleMapClick}
                >
                  <Marker
                    position={{ lat: formData.latitude, lng: formData.longitude }}
                    draggable
                    onDragEnd={handleMapClick}
                  />
                </GoogleMap>
              )}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2">
              <b>Latitude:</b> {formData.latitude.toFixed(6)} |{" "}
              <b>Longitude:</b> {formData.longitude.toFixed(6)}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <StyledButton type="submit" disabled={loader}>
              {loader ? <CircularProgress size={24} color="inherit" /> : "Add Pickup Point"}
            </StyledButton>
          </Grid>

          {message && (
            <Grid item xs={12}>
              <MessageText error={status === "error"}>{message}</MessageText>
            </Grid>
          )}
        </Grid>
      </StyledForm>
    </StyledContainer>
  );
};

export default AddPickupPoint;

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

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
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
  width: 100%;

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
//   width: 100%;

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

