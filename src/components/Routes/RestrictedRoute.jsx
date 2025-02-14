import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RestrictedRoute = ({ component: Component, redirectTo = '/contacts' }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Component />;
};

export default RestrictedRoute;
