import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element: Component, redirectTo = '/' }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  
  return Component;
};

export default PrivateRoute;
