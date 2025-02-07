import React from 'react';
import { Link } from 'react-router-dom';

const AuthNav = () => {
  return (
    <nav className='planerLi'>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </nav>
  );
};

export default AuthNav;
