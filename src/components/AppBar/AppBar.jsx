import React from 'react';
import { useSelector } from 'react-redux';  // Импортируем useSelector
import Navigation from '../Navigation/Navigation';
import UserMenu from '../UserMenu/UserMenu';
import AuthNav from '../AuthNav/AuthNav';

const AppBar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Получаем статус аутентификации

  return (
    <header>
      <h1>My Application</h1>
      {isAuthenticated ? <UserMenu /> : <AuthNav />} {/* В зависимости от аутентификации, показываем меню */}
      <Navigation />
    </header>
  );
};

export default AppBar;

