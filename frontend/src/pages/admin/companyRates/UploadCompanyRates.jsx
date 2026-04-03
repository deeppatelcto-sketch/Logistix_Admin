// src/pages/companyRate/UploadCompanyRates.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadCompanyRate,
  fetchCompanies,
} from "../../../redux/companyRate/companyRateHandel";
import { clearMessages } from "../../../redux/companyRate/companyRateSlice";

const UploadCompanyRates = () => {
  const dispatch = useDispatch();

  // ✅ Safe state selection
  const companyRateState = useSelector((state) => state.companyRate || {});
  const {
    companies = [],
    loading = false,
    error = null,
    success = null,
  } = companyRateState;

  const [companyName, setCompanyName] = useState("");
  const [logo, setLogo] = useState(null);
  const [csvFile, setCsvFile] = useState(null);

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [parsedRates, setParsedRates] = useState([]);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  const handleUpload = (e) => {
    e.preventDefault();
    if (!companyName || !logo || !csvFile) {
      alert("Please fill all fields");
      return;
    }
    const formData = new FormData();
    formData.append("companyName", companyName);
    formData.append("logo", logo);
    formData.append("csvFile", csvFile);

    dispatch(uploadCompanyRate(formData)).then(() => {
      setCompanyName("");
      setLogo(null);
      setCsvFile(null);
    });
  };

  const handleViewRates = async (company) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL || 'http://localhost:8000'}/view/${company._id}`);
      const data = await response.json();

      if (!data.rates || data.rates.length === 0) {
        alert("No rates found for this company");
        return;
      }

      setSelectedCompany(data.company);
      setParsedRates(
        data.rates.map((row) =>
          Object.fromEntries(
            Object.entries(row).map(([k, v]) => [
              k,
              v && typeof v === "object" ? v.result ?? JSON.stringify(v) : v,
            ])
          )
        )
      );
    } catch (err) {
      console.error("Error fetching rates:", err);
    }
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "30px auto", padding: "20px" }}>
      <h1 style={{ color: "#1a73e8", marginBottom: "20px" }}>
        Upload Company & Rates
      </h1>

      {error && (
        <div
          style={{
            background: "#fdecea",
            color: "#d93025",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "15px",
          }}
        >
          {error}
        </div>
      )}
      {success && (
        <div
          style={{
            background: "#e6f4ea",
            color: "#188038",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "15px",
          }}
        >
          {success}
        </div>
      )}

      {/* Upload Form */}
      <form
        onSubmit={handleUpload}
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setLogo(e.target.files[0])}
          required
          style={{ marginBottom: "15px" }}
        />
        <input
          type="file"
          accept=".csv,.xlsx"
          onChange={(e) => setCsvFile(e.target.files[0])}
          required
          style={{ marginBottom: "15px" }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            background: "#1a73e8",
            color: "#fff",
            border: "none",
            padding: "12px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {/* Company List */}
      <h2 style={{ color: "#1a73e8", marginBottom: "10px" }}>
        Uploaded Companies
      </h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {companies.map((company) => (
          <li
            key={company._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px",
              background: "#fff",
              borderRadius: "8px",
              marginBottom: "10px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {company.logo && (
                <img
                  src={company.logoPath}
                  alt="logo"
                  style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                />
              )}
              <span style={{ fontWeight: "500" }}>{company.companyName}</span>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              {company.csvFilePath && (
                <a
                  href={company.csvFilePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#1a73e8", textDecoration: "underline" }}
                >
                  CSV File
                </a>
              )}
              <button
                onClick={() => handleViewRates(company)}
                style={{
                  background: "#4a90e2",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  padding: "6px 12px",
                  cursor: "pointer",
                }}
              >
                View Rates
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Rates Table */}
      {selectedCompany && parsedRates.length > 0 && (
        <div
          style={{
            marginTop: "30px",
            maxHeight: "500px", // vertical scroll
            overflowY: "auto",
            overflowX: "auto", // horizontal scroll
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <h2 style={{ color: "#1a73e8", padding: "10px 20px" }}>Rates</h2>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "800px", // ensures horizontal scroll if table is wide
            }}
          >
            <thead>
              <tr>
                {Object.keys(parsedRates[0]).map((key, idx) => (
                  <th
                    key={idx}
                    style={{
                      border: "1px solid #ddd",
                      padding: "10px",
                      background: "#e8f0fe",
                      color: "#1a73e8",
                    }}
                  >
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {parsedRates.map((row, idx) => (
                <tr key={idx}>
                  {Object.values(row).map((val, i) => (
                    <td
                      key={i}
                      style={{ border: "1px solid #ddd", padding: "10px" }}
                    >
                      {val && typeof val === "object"
                        ? val.result ?? JSON.stringify(val)
                        : val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UploadCompanyRates;     




