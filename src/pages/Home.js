import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white text-center">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to the User Management System
      </h1>
      <p className="text-lg mb-8">
        Manage users: create, view, update, or delete user information.
      </p>
      <Link
        to="/users"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition ease-in-out duration-300"
        style={{ textDecoration: "none" }}
      >
        Go to User List
      </Link>
    </div>
  );
};

export default Home;
