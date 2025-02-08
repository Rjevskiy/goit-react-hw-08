import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RestrictedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  
  if (isAuthenticated) {
    return <Navigate to="/contacts" />;
  }

  return children; 
};

export default RestrictedRoute;
