import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Импорт Router
import Layout from './components/Layout/Layout';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import ContactsPage from './pages/ContactsPage';
import PlanerPage from './pages/Planer';
import PrivateRoute from './components/Routes/PrivateRoute';
import RestrictedRoute from './components/Routes/RestrictedRoute';
import { fetchUserData } from './redux/auth/operations';
import './App.css';
import { getToken } from './redux/auth/operations';

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isRefreshing = useSelector((state) => state.auth.isRefreshing);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const token = getToken();
    if (token && !user && !isRefreshing) {
      // Якщо є токен, користувач не завантажений і не відбувається оновлення
      dispatch(fetchUserData()); // Викликаємо dispatch для оновлення даних користувача
    }
  }, [dispatch, user, isRefreshing]); // Завжди перевіряємо на оновлення користувача та токен

  useEffect(() => {
    console.log('isAuthenticated:', isAuthenticated);
  }, [isAuthenticated]);

  if (isRefreshing) {
    return <div>Завантаження...</div>;
  }

  return (
    <Router>
      <div className="app">
        <Layout />
        <Routes>
          <Route path="/" element={<h2>Головна сторінка</h2>} />
          <Route
            path="/register"
            element={
              <RestrictedRoute>
                <RegistrationPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute>
                <LoginPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute>
                <ContactsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/planer"
            element={
              <PrivateRoute>
                <PlanerPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
