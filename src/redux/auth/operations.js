import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.goit.global/';

// Операция для регистрации
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('/users/signup', userData);
      const { token } = response.data;

      // Сохраняем токен и устанавливаем заголовок
      localStorage.setItem('token', token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;

      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      if (errorMessage.includes('User') || errorMessage.includes('exists')) {
        return thunkAPI.rejectWithValue('Пользователь уже зарегистрирован');
      }

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Операция для входа
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/users/login', credentials);
      const { token } = response.data;

      localStorage.setItem('token', token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;

      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Операция для выхода
export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common.Authorization;

    return null;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(errorMessage);
  }
});
