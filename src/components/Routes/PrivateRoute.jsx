import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Компонент PrivateRoute для проверки аутентификации
const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    // Перенаправляем пользователя на страницу логина, если он не аутентифицирован
    return <Navigate to="/login" />;
  }

  return children; // Возвращаем дочерние компоненты, если пользователь аутентифицирован
};

export default PrivateRoute;
