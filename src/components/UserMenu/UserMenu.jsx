import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/auth/operations';
import { fetchUserData } from '../../redux/auth/operations'; // Пример добавления запроса для пользователя

const UserMenu = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth); // Получаем данные пользователя и статус аутентификации

  useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated);
    console.log("user:", user);
    if (isAuthenticated && !user) {
      dispatch(fetchUserData()); // Получаем данные пользователя
    }
  }, [isAuthenticated, dispatch, user]);
  
  const handleLogout = () => {
    console.log("Logging out...");
    dispatch(logoutUser());
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Welcome, {user ? user.name : 'Guest'}!</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Welcome!</p>
      )}
    </div>
  );
};

export default UserMenu;
