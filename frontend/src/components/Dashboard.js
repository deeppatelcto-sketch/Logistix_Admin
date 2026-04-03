import React, { useEffect, useState } from "react";
import API from "../api";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get("/dashboard")
      .then((res) => setUser(res.data.user))
      .catch((err) => alert("Access denied or error loading dashboard"));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {user ? (
        <pre>{JSON.stringify(user, null, 2)}</pre>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default Dashboard;


