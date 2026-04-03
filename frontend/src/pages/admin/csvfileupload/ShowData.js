import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:8000";

const ShowData = ({ selectedFile }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (selectedFile) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [selectedFile]);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/files/${selectedFile._id}`
      );
      setData(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching file data");
    }
  };

  if (!selectedFile) return <p>Please select a file to view data.</p>;

  return (
    <div style={{ margin: "20px" }}>
      <h3>Data for: {selectedFile.filename}</h3>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((col) => <th key={col}>{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((val, j) => (
                <td key={j}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowData;
