import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from './redux/contacts/operations';
import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout'; // Новый компонент Layout
import RegistrationPage from './pages/RegistrationPage'; 
import LoginPage from './pages/LoginPage'; 
import ContactsPage from './pages/ContactsPage'; 
import Planer from './pages/Planer'; 
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.contacts.isLoading); // Предположим, что состояние загрузки существует
  const contacts = useSelector((state) => state.contacts.items); // Предположим, что контакты хранятся в состоянии

  useEffect(() => {
    if (isAuthenticated && contacts.length === 0) { // Не загружать, если контакты уже загружены
      dispatch(fetchContacts());
    }
  }, [dispatch, isAuthenticated, contacts.length]);

  return (
    <div className="app">
      <Layout /> {/* Используем новый компонент Layout для структуры */}
      
      {isLoading && <div>Загрузка...</div>} {/* Показываем сообщение о загрузке, если контакты загружаются */}

      <Routes>
        <Route path="/" element={<h2>Головна сторінка</h2>} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/contacts" /> : <RegistrationPage />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/contacts" /> : <LoginPage />} />
        <Route path="/contacts" element={isAuthenticated ? <ContactsPage /> : <Navigate to="/login" />} />
        <Route path="/planer" element={isAuthenticated ? <Planer /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;



