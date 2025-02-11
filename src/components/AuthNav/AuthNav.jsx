import React from 'react';
import { NavLink } from 'react-router-dom';

const AuthNav = () => {
  return (
    <nav className="planerLi">
      <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
        Login
      </NavLink>
      <NavLink to="/register" className={({ isActive }) => (isActive ? 'active' : '')}>
        Register
      </NavLink>
    </nav>
  );
};

export default AuthNav;
