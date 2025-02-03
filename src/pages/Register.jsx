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

    if (!userData.name || !userData.email || !userData.password) {
      setError('All fields are required');
      return;
    }

    dispatch(registerUser(userData))
      .unwrap()
      .catch((err) => setError(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
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





