import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/auth/authOperations'; // Исправленный путь
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Проверка авторизации

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()); // Ожидаем завершения операции выхода
      navigate('/login'); // Перенаправление на страницу логина после выхода
    } catch (error) {
      console.error(' Ошибка выхода:', error);
    }
  };

  return (
    <header>
      <h1>Phonebook</h1>
      <nav>
        <ul className='navigation'>
          <li>
            <Link to="/">Головна</Link>
          </li>
          <li>
            <Link to="/register">Реєстрація</Link>
          </li>
          <li>
            <Link to="/login">Логін</Link>
          </li>
          <li>
            <Link to="/contacts">Контакти</Link>
          </li>
          <li>
            <Link to="/planer">Планувальник</Link> {/* Линк на страницу планировщика */}
          </li>  
        </ul>
      </nav>
      {/* Кнопка "Вийти" появляется только если пользователь авторизован */}
      {isAuthenticated && (<button onClick={handleLogout}>Вийти</button>)}
    </header>
  );
};

export default Header;




