import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from './redux/contacts/operations';
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import RegisterPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import ContactsPage from './pages/ContactsPage';
import PlanerPage from './pages/Planer';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.contacts.isLoading); // Assuming loading state exists
  const contacts = useSelector((state) => state.contacts.items); // Assuming contacts are stored in state

  useEffect(() => {
    if (isAuthenticated && contacts.length === 0) { // Prevent fetching if contacts are already loaded
      dispatch(fetchContacts());
    }
  }, [dispatch, isAuthenticated, contacts.length]);

  return (
    <div className="app">
      <Header />
      
      {isLoading && <div>Loading...</div>} {/* Display loading message if contacts are being fetched */}

      <Routes>
        <Route path="/" element={<h2>Головна сторінка</h2>} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/contacts" /> : <RegisterPage />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/contacts" /> : <LoginPage />} />
        <Route path="/contacts" element={isAuthenticated ? <ContactsPage /> : <Navigate to="/login" />} />
        <Route path="/planer" element={isAuthenticated ? <PlanerPage /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;


