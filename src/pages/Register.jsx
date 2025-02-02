// pages/Register.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/auth/authOperations';

const Register = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Проверка на пустые поля
    if (!userData.name || !userData.email || !userData.password) {
      setError('All fields are required');
      return;
    }

    // Очистка предыдущих ошибок перед отправкой
    setError('');

    dispatch(registerUser(userData))
      .catch((err) => setError('Registration failed. Please try again.'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={userData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="email"
        placeholder="Email"
        value={userData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={userData.password}
        onChange={handleChange}
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;




