import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/auth/authOperations';

const Login = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      setError('Both fields are required');
      return;
    }

    dispatch(loginUser(credentials))
      .unwrap()
      .catch((err) => setError(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={credentials.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleChange}
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;



