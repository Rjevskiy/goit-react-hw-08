import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser, logoutUser, fetchUserData } from './operations';

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
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        localStorage.removeItem('token');
      })
      .addCase(fetchUserData.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isRefreshing = false;
        state.loading = false;
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.isRefreshing = false;
        state.loading = false;
        state.error = 'Сталася помилка при оновленні даних';
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
          state.error = action.payload || 'Сталася помилка';
        }
      );
  },
});

export default authSlice.reducer;
