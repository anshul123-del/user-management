import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import UserList from "./components/UserList";
// import UserForm from "./components/UserForm";
// import UserDetail from "./components/UserDetail";
// import Home from "./pages/Home";
import "./App.css";
import Home from "./pages/Home";
import UserList from "./component/UserList";
import UserForm from "./component/UserForm";
import UserDetail from "./component/UserDetail";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/create" element={<UserForm />} />
          <Route path="/edit/:id" element={<UserForm />} />
          <Route path="/user/:id" element={<UserDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
