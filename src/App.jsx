import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, loginUser, fetchCurrentUser } from './redux/authOps';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, error, isRefreshing, user } = useSelector((state) => state.auth); // Добавляем user сюда
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);

  const handleSwitchForm = () => {
    setShowLogin(!showLogin);
  };

  const handleLoginSubmit = (credentials) => {
    dispatch(loginUser(credentials));
  };

  const handleRegisterSubmit = (credentials) => {
    dispatch(registerUser(credentials));
  };

  return (
    <div className="app">
      <h1>Phonebook</h1>
      {isLoggedIn ? (
        <div>
          <h2>Welcome, {user ? user.name : 'User'}</h2> {/* Теперь выводим name пользователя из состояния */}
          {/* Your app content when logged in */}
        </div>
      ) : (
        <div>
          <h2>{showLogin ? 'Login' : 'Register'}</h2>
          {showLogin ? (
            <Login onSubmit={handleLoginSubmit} />
          ) : (
            <Register onSubmit={handleRegisterSubmit} />
          )}
          <button onClick={handleSwitchForm}>
            Switch to {showLogin ? 'Register' : 'Login'}
          </button>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {isRefreshing && <p>Loading...</p>}
    </div>
  );
};

export default App;



