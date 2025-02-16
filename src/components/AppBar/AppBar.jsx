  import React from 'react';
  import { useSelector } from 'react-redux';  
  import Navigation from '../Navigation/Navigation';
  import UserMenu from '../UserMenu/UserMenu';
  import AuthNav from '../AuthNav/AuthNav';

  const AppBar = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); 

    return (
      <header>
        <h1>Мій записник</h1>
        {isAuthenticated ? <UserMenu /> : <AuthNav />} 
        <Navigation />
      </header>
    );
  };

  export default AppBar;
