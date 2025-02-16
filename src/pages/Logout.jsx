import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/auth/operations';  
import { useNavigate } from 'react-router-dom'; 

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser()) 
      .then(() => {
        navigate('/login'); 
      })
      .catch((error) => {
        console.error('Помилка виходу:', error);
      });
  };

  return <button onClick={handleLogout}>Вийти</button>;
};

export default Logout;
