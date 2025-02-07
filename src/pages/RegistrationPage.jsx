import React from 'react';
import RegistrationForm from '../components/RegistrationForm/RegistrationForm'; // Импорт компонента формы регистрации

const RegistrationPage = () => {
  return (
    <div>
      <h1>Реєстрація</h1>
      <RegistrationForm /> {/* Используем компонент формы регистрации */}
    </div>
  );
};

export default RegistrationPage;
