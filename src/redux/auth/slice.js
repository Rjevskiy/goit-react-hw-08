import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser, logoutUser, refreshUser } from './operations'; // Используем refreshUser

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: Boolean(localStorage.getItem('token')),
  loading: false,
  isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log('registerUser.fulfilled', action.payload);
        const { user, token } = action.payload;
        state.user = user;
        state.token = token;
        state.isAuthenticated = true;
        state.loading = false;
        localStorage.setItem('token', token);
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log('loginUser.fulfilled', action.payload);
        const { user, token } = action.payload;
        state.user = user;
        state.token = token;
        state.isAuthenticated = true;
        state.loading = false;
        localStorage.setItem('token', token);
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        console.log('logoutUser.fulfilled');
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        localStorage.removeItem('token');
        state.error = null;
      })
      .addCase(refreshUser.pending, (state) => {  // Используем refreshUser
        console.log('refreshUser.pending');
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {  // Используем refreshUser
        console.log('refreshUser.fulfilled', action.payload);
        state.user = action.payload;
        state.isRefreshing = false;
        state.loading = false;
        state.error = null;
      })
      .addCase(refreshUser.rejected, (state, action) => {  // Используем refreshUser
        console.log('refreshUser.rejected', action.payload || action.error.message);
        state.isRefreshing = false;
        state.loading = false;
        state.error = action.payload || action.error.message || 'Помилка при завантаженні даних';
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
          state.error = action.payload || action.error.message || 'Сталася помилка';
        }
      );
  },
});

export default authSlice.reducer;
