import React, { useState } from 'react';

const Login = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Состояние ошибки

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Пытаемся выполнить логин, ожидаем промис
      await onSubmit({ email, password });
    } catch (err) {
      // Если произошла ошибка, обрабатываем её
      const errorMessage = err?.response?.data?.message || err?.message || 'Ошибка при логине';
      setError(errorMessage); // Обработка ошибки
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email"
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password"
      />
      <button type="submit">Login</button>
      {/* Если ошибка существует, отображаем её */}
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;



