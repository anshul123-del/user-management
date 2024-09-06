import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUser, createUser, updateUser } from "../services/api";

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [user, setUser] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      fetchUser(id)
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to fetch user.");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = id ? updateUser(id, user) : createUser(user);
    request
      .then(() => {
        navigate("/users"); // Use navigate to redirect
      })
      .catch(() => setError("Failed to save user."));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{id ? "Edit User" : "Create User"}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="phone"
          value={user.phone}
          onChange={handleChange}
          placeholder="Phone"
          required
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default UserForm;
