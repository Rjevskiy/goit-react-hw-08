import { setUser, logout } from './authSlice';

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('https://connections-api.goit.global/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser({ user: data.user, token: data.token }));
    localStorage.setItem('token', data.token);
  } else {
    // Обробка помилок
  }
};

export const register = (email, password, name) => async (dispatch) => {
  const response = await fetch('https://connections-api.goit.global/users/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser({ user: data.user, token: data.token }));
    localStorage.setItem('token', data.token);
  } else {
    // Обробка помилок
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch(logout());
};
