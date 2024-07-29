import React, { useEffect, useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import authService from "../../Service/authService";
import DocsList from "../../Components/DocsList";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [sharedData, setSharedData] = useState([]);
  const [error, setError] = useState("");
  const [docs, setDocs] = useState("document");
  const goto = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const user = authService.getCurrentUser();
      if (user && user.token) {
        try {
          const response = await axios.get(
            "http://localhost:5000/document/get-document",
            {
              headers: { Authorization: `Bearer ${user.token}` },
            }
          );
          setData(response.data.data);
          setSharedData(response.data.share);
        } catch (err) {
          setError("Failed to fetch data");
        }
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <div className="button-end">
        <button
          onClick={() => {
            goto("/log");
          }}
        >
          Activity
        </button>
        <button
          onClick={() => {
            authService.logout();
            goto("/login");
          }}
        >
          Logout
        </button>
      </div>
      Dashboard{" "}
      <button
        onClick={() => {
          goto("/editor");
        }}
      >
        Create Document
      </button>
      <div className="navbar-wrapper">
        <div
          className={`navbar-menu ${
            docs === "document" ? "navbar-wrapper-select" : ""
          }`}
          onClick={() => setDocs("document")}
        >
          Document
        </div>
        <div
          className={`navbar-menu ${
            docs === "share" ? "navbar-wrapper-select" : ""
          }`}
          onClick={() => setDocs("share")}
        >
          Shared Document
        </div>
      </div>
      {docs === "document"
        ? data.map((docs, i) => {
            return (
              <Link to={`/editor/${docs._id}`}>
                <DocsList fileName={docs.fileName} />
              </Link>
            );
          })
        : sharedData.map((docs, i) => {
            return (
              <Link to={`/editor/${docs._id}`}>
                <DocsList fileName={docs.fileName} />
              </Link>
            );
          })}
    </div>
  );
};

export default Dashboard;
