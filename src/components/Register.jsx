import React, { useState } from 'react';

const Register = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Состояние ошибки

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = { name, email, password };
    try {
      // Пытаемся зарегистрировать пользователя, ожидаем промис
      await onSubmit(credentials);
    } catch (err) {
      // Если произошла ошибка, обрабатываем её
      const errorMessage = err?.response?.data?.message || err?.message || 'Ошибка при регистрации';
      setError(errorMessage); // Обработка ошибки регистрации
    }
  };

  return (
    <div>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Имя"
          required
        />
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email"
          required
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Пароль"
          required
        />
        <button type="submit">Зарегистрироваться</button>
      </form>
      {/* Если ошибка существует, отображаем её */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Register;



