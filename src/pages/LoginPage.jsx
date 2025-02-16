import React from 'react';
import LoginForm from '../components/LoginForm/LoginForm'; // предполагается, что у вас есть LoginForm компонент

const LoginPage = () => {
  return (
    <div>
      <h1>Login Page</h1>
      <LoginForm /> {/* Вставляем компонент LoginForm */}
    </div>
  );
};

export default LoginPage; // экспортируем компонент LoginPage
