import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Імпортуємо useNavigate для перенаправлення

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Ініціалізуємо useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();

    // Очистка попередніх помилок
    setError('');

    try {
      const response = await fetch('https://connections-api.goit.global/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Зберігаємо токен
        navigate('/contacts'); // Перенаправляємо на сторінку контактів після успішного входу
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Невірний email або пароль');
      }
    } catch (err) {
      setError('Сталася помилка при вході. Спробуйте ще раз.');
    }
  };

  return (
    <div>
      <h1>Логін</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Пароль:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Увійти</button>
      </form>
    </div>
  );
};

export default Login;

