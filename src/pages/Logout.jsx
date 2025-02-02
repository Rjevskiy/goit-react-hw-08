import React from 'react';
import { useNavigate } from 'react-router-dom'; // Для перенаправлення

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); // Перенаправлення на сторінку логіну після виходу
  };

  return <button onClick={handleLogout}>Вийти</button>;
};

export default Logout;

