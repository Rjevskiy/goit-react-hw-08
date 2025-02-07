import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser, logoutUser } from './operations';

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null, // Токен уже строка, парсить не нужно
  isAuthenticated: Boolean(localStorage.getItem('token')), // Проверяем, есть ли токен
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
        localStorage.setItem('token', action.payload.token); // Сохраняем токен как строку
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
        localStorage.setItem('token', action.payload.token); // Сохраняем токен как строку
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        localStorage.removeItem('token'); // Удаляем токен при выходе
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload || 'Произошла ошибка';
        }
      );
  },
});

export default authSlice.reducer;
