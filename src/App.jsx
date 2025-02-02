import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchContacts } from './redux/contacts/contactsOperations'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header'; // Импортируем Header
import ContactForm from './components/ContactForm/ContactForm';
import SearchBox from './components/SearchBox/SearchBox';
import ContactList from './components/ContactList/ContactList';
import Register from './pages/Register';
import Login from './pages/Login';
import Planer from './pages/Planer'; // Импортируем новый компонент для планировщика
import './App.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Router>
      <div className="app">
        <Header />
        
        <Routes>
          <Route path="/" element={<h2>Головна сторінка</h2>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contacts" element={<><ContactForm /><SearchBox /><ContactList /></>} />
          <Route path="/planer" element={<Planer />} /> {/* Новая страница планировщика */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;




