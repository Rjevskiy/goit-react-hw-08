import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Очистка попередніх помилок
    setError('');

    try {
      const response = await fetch('https://connections-api.goit.global/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Зберігаємо токен
        navigate('/contacts'); // Перенаправляємо на сторінку контактів після реєстрації
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Не вдалося зареєструватися');
      }
    } catch (err) {
      setError('Сталася помилка при реєстрації');
    }
  };

  return (
    <div>
      <h1>Реєстрація</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <label>
          Ім'я:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
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
        <button type="submit">Зареєструватися</button>
      </form>
    </div>
  );
};

export default Register;



