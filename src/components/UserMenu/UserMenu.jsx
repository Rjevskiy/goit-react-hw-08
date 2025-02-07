import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/auth/operations';

const UserMenu = () => {
  const dispatch = useDispatch();

  // Получаем состояние пользователя и флаг загрузки
  const userName = useSelector((state) => state.auth.user?.name);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.auth.isLoading); // добавляем проверку на загрузку

  // Если данные о пользователе всё ещё загружаются, показываем Loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Если пользователь не аутентифицирован, показываем сообщение о необходимости авторизации
  if (!isAuthenticated) {
    return <div>Please log in to continue.</div>;
  }

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <p>Welcome, {userName}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserMenu;
