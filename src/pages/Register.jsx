import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser, loginUser } from '../redux/auth/authOperations';

const Register = () => {
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
      await dispatch(registerUser(userData)).unwrap();

      // После успешной регистрации сразу логиним пользователя
      await dispatch(loginUser({ email: userData.email, password: userData.password })).unwrap();
      
      setError('');
    } catch (err) {
      setError(err || 'Ошибка регистрации');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Имя"
        value={userData.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={userData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Пароль"
        value={userData.password}
        onChange={handleChange}
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
};

export default Register;






