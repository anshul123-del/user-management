import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUser } from "../services/api";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUser(id)
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch user details.");
        setLoading(false);
      });
  }, [id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const containerStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f8f9fa",
  };

  const buttonStyle = {
    marginBottom: "20px",
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s",
  };

  const buttonHoverStyle = {
    backgroundColor: "#0056b3",
  };

  const cardStyle = {
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    padding: "15px",
    textAlign: "left",
  };

  const headingStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "16px",
  };

  const textStyle = {
    color: "#343a40",
    marginBottom: "12px",
  };

  if (loading)
    return (
      <p style={{ textAlign: "center", color: "#6c757d" }}>
        Loading user details...
      </p>
    );
  if (error)
    return <p style={{ textAlign: "center", color: "#dc3545" }}>{error}</p>;

  return (
    <div style={containerStyle}>
      {user ? (
        <div style={cardStyle}>
          <h1 style={headingStyle}>{user.name}</h1>
          <p style={textStyle}>
            <strong>Email:</strong> {user.email}
          </p>
          <p style={textStyle}>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p style={textStyle}>
            <strong>Website:</strong> {user.website}
          </p>
          <p style={textStyle}>
            <strong>Company:</strong> {user.company.name}
          </p>
          <p style={textStyle}>
            <strong>Address:</strong> {user.address.street}, {user.address.city}
          </p>
          <button
            onClick={handleBackClick}
            style={buttonStyle}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor =
                buttonHoverStyle.backgroundColor)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor =
                buttonStyle.backgroundColor)
            }
          >
            Back
          </button>
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "#6c757d" }}>User not found.</p>
      )}
    </div>
  );
};

export default UserDetail;
