import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    // user not logged in, redirect to login

    return <Navigate to="/login" replace />;
  }

  // user logged in, render children
  return children;
};

export default ProtectedRoute;
