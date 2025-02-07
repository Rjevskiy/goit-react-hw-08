import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser, loginUser } from '../../redux/auth/operations';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.name || !userData.email || !userData.password) {
      setError('Заполните все поля');
      return;
    }

    try {
      // Регистрация пользователя
      await dispatch(registerUser(userData)).unwrap();

      // Вход после успешной регистрации
      await dispatch(loginUser({ email: userData.email, password: userData.password })).unwrap();
      
      setError(''); // Очистка ошибки, если регистрация прошла успешно
    } catch (err) {
      setError(err.message || 'Ошибка регистрации');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Имя:</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Имя"
          value={userData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Пароль:</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Пароль"
          value={userData.password}
          onChange={handleChange}
        />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
};

export default RegistrationForm;
