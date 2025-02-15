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
import { getToken } from './redux/auth/operations';

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isRefreshing = useSelector((state) => state.auth.isRefreshing);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const token = getToken();
    if (token && !user && !isRefreshing) {
      dispatch(refreshUser());
    }
  }, [dispatch, user, isRefreshing]);

  useEffect(() => {
    console.log('isAuthenticated:', isAuthenticated);
  }, [isAuthenticated]);

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
            element={<RestrictedRoute element={<RegistrationPage />} />}
          />
          <Route
            path="/login"
            element={<RestrictedRoute element={<LoginPage />} />}
          />
          <Route
            path="/contacts"
            element={<PrivateRoute element={<ContactsPage />} />}
          />
          <Route
            path="/planer"
            element={<PrivateRoute element={<PlanerPage />} />}
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
