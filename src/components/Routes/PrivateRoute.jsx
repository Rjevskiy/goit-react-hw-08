import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Якщо користувач не аутентифікований, перенаправляємо на задану сторінку (за замовчуванням - '/')
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Якщо користувач аутентифікований, рендеримо переданий компонент
  return <Component />;
};

export default PrivateRoute;
