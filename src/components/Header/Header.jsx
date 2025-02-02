import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>Phonebook</h1>
      <nav>
        <ul>
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
            <Link to="/planer">Планувальник</Link> {/* Добавлен линк на страницу планировщика */}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;


