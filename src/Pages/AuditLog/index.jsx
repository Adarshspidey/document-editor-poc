import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import authService from "../../Service/authService";

const AuditLog = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const user = authService.getCurrentUser();
      if (user && user.token) {
        try {
          const response = await axios.get("http://localhost:5000/audit/user", {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          setData(response.data);
        } catch (err) {
          setError("Failed to fetch data");
        }
      }
    };

    fetchData();
  }, []);
  function dateConverter(isoDateString) {
    return new Date(isoDateString);
  }
  return (
    <div>
      {data.map((log, i) => {
        const date = dateConverter(log.timestamp);
        const localDate = date.toLocaleDateString(); // Get local date in a readable format
        const localTime = date.toLocaleTimeString(); // Get local time in a readable format
        console.log(date, "New date");
        return (
          <div className="audit-wrapper">
            <div>{localDate}</div>
            <div>{localTime}</div>
            <div>{log.action}</div>
          </div>
        );
      })}
    </div>
  );
};

export default AuditLog;
