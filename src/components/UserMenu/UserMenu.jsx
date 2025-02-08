import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/auth/operations';
import { fetchUserData } from '../../redux/auth/operations'; 

const UserMenu = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth); 

  useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated);
    console.log("user:", user);
    if (isAuthenticated && !user) {
      dispatch(fetchUserData()); 
    }
  }, [isAuthenticated, dispatch, user]);
  
  const handleLogout = () => {
    console.log("Logging out...");
    dispatch(logoutUser());
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Раді вас бачити, {user ? user.name : 'Guest'}</p>
          <button onClick={handleLogout}>Вихід</button>
        </>
      ) : (
        <p>Раді вас бачити</p>
      )}
    </div>
  );
};

export default UserMenu;
