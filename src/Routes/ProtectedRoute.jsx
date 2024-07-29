import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import authService from "../Service/authService";

const ProtectedRoute = () => {
  const isLoggedIn = authService.getCurrentUser();

  return isLoggedIn ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
