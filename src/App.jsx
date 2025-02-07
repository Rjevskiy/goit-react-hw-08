import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from './redux/contacts/operations';
import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import ContactsPage from './pages/ContactsPage';
import Planer from './pages/Planer';
import PrivateRoute from './components/Routes/PrivateRoute'; // Для защищенных маршрутов
import RestrictedRoute from './components/Routes/RestrictedRoute'; // Для ограниченных маршрутов
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.contacts.isLoading);
  const contacts = useSelector((state) => state.contacts.items);

  useEffect(() => {
    if (isAuthenticated && contacts.length === 0) {
      dispatch(fetchContacts());
    }
  }, [dispatch, isAuthenticated, contacts.length]);

  return (
    <div className="app">
      <Layout />

      {isLoading && <div>Загрузка...</div>}

      <Routes>
        <Route path="/" element={<h2>Головна сторінка</h2>} />
        
        {/* Ограничиваем доступ к страницам регистрации и входа для аутентифицированных пользователей */}
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

        {/* Защищаем доступ к контактам и планировщику для аутентифицированных пользователей */}
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
              <Planer />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
