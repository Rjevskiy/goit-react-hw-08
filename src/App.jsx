import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
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
    if (token && !user && !isRefreshing) { // Проверяем, что данные пользователя еще не получены и что мы не в процессе загрузки
      dispatch(fetchUserData());
    }
  }, [dispatch, user, isRefreshing]);

  if (isRefreshing) {
    return <div>Завантаження...</div>;
  }

  return (
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
  );
};

export default App;
