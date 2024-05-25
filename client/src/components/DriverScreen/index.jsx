import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DriverScreen = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div>
      Driver Pick Up Details
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default DriverScreen;
