import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:8000";

const FileList = ({ onFileSelect }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/files`);
      setFiles(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching files");
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      <h3>Uploaded Files</h3>
      <ul>
        {files.map((file) => (
          <li key={file._id}>
            {file.filename}
            <button onClick={() => onFileSelect(file)}>View Data</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
