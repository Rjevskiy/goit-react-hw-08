import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from './redux/contacts/operations';
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import ContactForm from './components/ContactForm/ContactForm';
import SearchBox from './components/SearchBox/SearchBox';
import ContactList from './components/ContactList/ContactList';
import Register from './pages/Register';
import Login from './pages/Login';
import Planer from './pages/Planer';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="app">
      <Header />

      <Routes>
        <Route path="/" element={<h2>Головна сторінка</h2>} />

        <Route path="/register" element={isAuthenticated ? <Navigate to="/contacts" /> : <Register />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/contacts" /> : <Login />} />

        <Route
          path="/contacts"
          element={isAuthenticated ? (
            <>
              <ContactForm />
              <SearchBox />
              <ContactList />
            </>
          ) : (
            <Navigate to="/login" />
          )}
        />

        <Route path="/planer" element={isAuthenticated ? <Planer /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;




