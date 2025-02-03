import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from './redux/auth/authOperations'; // Импортируем операцию logout
import { useNavigate } from 'react-router-dom'; // Для перенаправления

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser()) // Выполнение операции выхода
      .then(() => {
        navigate('/login'); // Перенаправляем на страницу логина после выхода
      })
      .catch((error) => {
        console.error('Ошибка выхода:', error);
      });
  };

  return <button onClick={handleLogout}>Выйти</button>;
};

export default Logout;

