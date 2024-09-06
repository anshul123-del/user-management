import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchUsers, deleteUser } from "../services/api";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers()
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch users.");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    deleteUser(id)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch(() => setError("Failed to delete user."));
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="app-container">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <Link
        to="/create"
        className="mb-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Create New User
      </Link>
      <ul className="list-none p-0">
        {users.map((user) => (
          <li
            key={user.id}
            className="mb-4 p-4 border border-gray-300 rounded-lg shadow-sm"
          >
            <div className="text-lg font-semibold mb-2">{user.name}</div>
            <div className="text-sm text-gray-600">{user.email}</div>
            <div className="text-sm text-gray-600">{user.phone}</div>
            <div className="mt-2">
              <Link
                to={`/user/${user.id}`}
                className="inline-block px-3 py-1 mr-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                View
              </Link>
              <Link
                to={`/edit/${user.id}`}
                className="inline-block px-3 py-1 mr-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(user.id)}
                className="inline-block px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
