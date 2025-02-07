import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RestrictedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Если пользователь аутентифицирован, перенаправляем его на страницу контактов
  if (isAuthenticated) {
    return <Navigate to="/contacts" />;
  }

  return children; // Если пользователь не аутентифицирован, отображаем дочерние компоненты
};

export default RestrictedRoute;
