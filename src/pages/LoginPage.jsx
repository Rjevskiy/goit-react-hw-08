import React from 'react';
import LoginForm from '../components/LoginForm/LoginForm'; // Импорт компонента формы входа

const LoginPage = () => {
  return (
    <div>
      <h1>Вхід</h1>
      <LoginForm /> {/* Используем компонент формы входа */}
    </div>
  );
};

export default LoginPage;
