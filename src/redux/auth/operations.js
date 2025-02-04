import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.goit.global/';

// Функция для установки токена
const setAuthToken = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Функция для удаления токена
const clearAuthToken = () => {
  delete axios.defaults.headers.common.Authorization;
};

// Проверяем наличие токена при запуске и устанавливаем его, если есть
const savedToken = localStorage.getItem('token');
if (savedToken) {
  setAuthToken(savedToken);
}

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('/users/signup', userData);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      setAuthToken(token);

      return { user, token };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      if (errorMessage.includes('User') || errorMessage.includes('exists')) {
        return thunkAPI.rejectWithValue('Пользователь уже зарегистрирован');
      }

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/users/login', credentials);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      setAuthToken(token);

      return { user, token };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');

    localStorage.removeItem('token');
    clearAuthToken();

    return null;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Ошибка при выходе');
  }
});
