import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const CompleteProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: "",
    email: "",
    phoneNumber: localStorage.getItem("phoneNumber") || "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await API.post("/complete-profile", formData);
      alert("Profile completed!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response.data.message || "Error submitting profile");
    }
  };

  return (
    <div>
      <h2>Complete Profile</h2>
      <input name="firstName" placeholder="First Name" onChange={handleChange} />
      <input name="lastName" placeholder="Last Name" onChange={handleChange} />
      <input name="gender" placeholder="Gender (male/female)" onChange={handleChange} />
      <input name="birthDate" type="date" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} readOnly />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CompleteProfile;
