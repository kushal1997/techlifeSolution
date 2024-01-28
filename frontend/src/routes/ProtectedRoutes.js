import React from 'react'
import { Navigate } from 'react-router-dom';

export const ProtectedRoutes = ({element}) => {
  const tokenData = localStorage.getItem("token");

return tokenData ? element : <Navigate to="/" />;
}
