import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Layout from './components/Layout/Layout';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import ContactsPage from './pages/ContactsPage';
import PlanerPage from './pages/Planer';
import PrivateRoute from './components/Routes/PrivateRoute';
import RestrictedRoute from './components/Routes/RestrictedRoute';
import { refreshUser } from './redux/auth/operations';  
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector((state) => state.auth.isRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) {
    return <div>Завантаження...</div>;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<h2>Головна сторінка</h2>} />
          <Route
            path="/register"
            element={<RestrictedRoute element={RegistrationPage} />}  // Теперь это JSX-элемент
          />
          <Route
            path="/login"
            element={<RestrictedRoute element={LoginPage} />}  // Теперь это JSX-элемент
          />
          <Route
            path="/contacts"
            element={<PrivateRoute element={ContactsPage} />}  // Теперь это JSX-элемент
          />
          <Route
            path="/planer"
            element={<PrivateRoute element={PlanerPage} />}  // Теперь это JSX-элемент
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
