import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navigation = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Получаем состояние авторизации

  return (
    <nav className='planerLi'>
      <Link to="/">Home</Link>
      {isAuthenticated && <Link to="/contacts">Contacts</Link>} {/* Показываем ссылку только если пользователь авторизован */}
      {isAuthenticated && <Link to="/planer">Planer</Link>} {/* Показываем ссылку только если пользователь авторизован */}
    </nav>
  );
};

export default Navigation;
