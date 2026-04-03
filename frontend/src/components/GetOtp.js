import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const GetOtp = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      const res = await API.post("/get-otp", { phoneNumber });
      alert(res.data.message);
      localStorage.setItem("phoneNumber", phoneNumber);
      navigate("/verify-otp");
    } catch (err) {
      alert(err.response.data.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h2>Get OTP</h2>
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={handleSendOtp}>Send OTP</button>
    </div>
  );
};

export default GetOtp;
