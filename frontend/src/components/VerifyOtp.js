import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const phoneNumber = localStorage.getItem("phoneNumber");
  const navigate = useNavigate();

  const handleVerify = async () => {
    try {
      const res = await API.post("/verify-otp", { phoneNumber, otp });
      localStorage.setItem("token", res.data.token);
      alert("OTP Verified!");
      navigate("/complete-profile");
    } catch (err) {
      alert(err.response.data.message || "Verification failed");
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleVerify}>Verify</button>
    </div>
  );
};

export default VerifyOtp;
