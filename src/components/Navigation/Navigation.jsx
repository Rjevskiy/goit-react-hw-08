import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className='planerLi'>
      <Link to="/">Home</Link>
      <Link to="/contacts">Contacts</Link>
      <Link to="/planer">Planer</Link>
    </nav>
  );
};

export default Navigation;
