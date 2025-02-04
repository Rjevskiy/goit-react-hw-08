import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/auth/operations'; 
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); 

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()); 
      navigate('/login'); 
    } catch (error) {
      console.error(' Ошибка выхода:', error);
    }
  };

  return (
    <header>
      <h1>Phonebook</h1>
      <nav>
        <ul className='navigation'>
          <li>
            <Link to="/">Головна</Link>
          </li>
          <li>
            <Link to="/register">Реєстрація</Link>
          </li>
          <li>
            <Link to="/login">Логін</Link>
          </li>
          <li>
            <Link to="/contacts">Контакти</Link>
          </li>
          <li>
            <Link to="/planer">Планувальник</Link> 
          </li>  
        </ul>
      </nav>
      
      {isAuthenticated && (<button onClick={handleLogout}>Вийти</button>)}
    </header>
  );
};

export default Header;




