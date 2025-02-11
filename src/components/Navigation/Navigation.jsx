import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav className="planerLi">
      <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink to="/contacts" className={({ isActive }) => (isActive ? 'active' : '')}>
          Contacts
        </NavLink>
      )}
      {isLoggedIn && (
        <NavLink to="/planer" className={({ isActive }) => (isActive ? 'active' : '')}>
          Planer
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
