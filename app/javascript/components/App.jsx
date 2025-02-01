import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Login"; // Ensure this file exists
import Gallery from "./Gallery"; // Ensure this file exists
import SignUp from "./SignUp";
import Profile from "./Profile";




const App = () => {
  return (
    <Router>
      <nav style={{ padding: "10px", textAlign: "center" }}>
      <Link to="/signup" style={{ margin: "10px" }}>SignUp</Link>
        <Link to="/login" style={{ margin: "10px" }}>Login</Link>
        <Link to="/gallery" style={{ margin: "10px" }}>Gallery</Link>
        <Link to="/profile" style={{ margin: "10px" }}>Profile</Link>

      </nav>
      
      <Routes>
      
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile" element={<Profile />} />

        <Route path="/login" element={<Login />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Router>
  );
};

export default App;
