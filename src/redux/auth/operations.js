import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const api = axios.create({
  baseURL: 'https://connections-api.goit.global/',  // Убедитесь, что это правильный URL для вашего API
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthHeader = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

export const clearAuthHeader = () => {
  delete api.defaults.headers.common['Authorization'];
};

export const getToken = () => localStorage.getItem('token');

// Регистрация
export const registerUser = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const response = await api.post('/users/signup', userData);
    const { token } = response.data;
    if (token) {
      localStorage.setItem('token', token); 
      setAuthHeader(token);
    }
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Ошибка при регистрации');
  }
});

// Логин
export const loginUser = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    const response = await api.post('/users/login', userData);
    const { token } = response.data;
    if (token) {
      localStorage.setItem('token', token); 
      setAuthHeader(token);
    }
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Ошибка при входе');
  }
});

// Логаут
export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await api.post('/users/logout');
    clearAuthHeader();
    localStorage.removeItem('token');
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Ошибка при выходе');
  }
});

// Обновление пользователя (проверка токена и обработка ошибки)
export const refreshUser = createAsyncThunk('auth/refreshUser', async (_, thunkAPI) => {
  try {
    const token = getToken();  // Проверяем токен в localStorage
    if (!token) {
      return thunkAPI.rejectWithValue('Нет токена для обновления пользователя');  // Если токен отсутствует, возвращаем ошибку
    }

    setAuthHeader(token);  // Устанавливаем токен в заголовки

    const response = await api.get('/users/current');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Ошибка при обновлении пользователя');
  }
});
