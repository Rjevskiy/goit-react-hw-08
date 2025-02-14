import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const api = axios.create({
  baseURL: 'https://connections-api.goit.global/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Устанавливаем токен в заголовок
export const setAuthHeader = (token) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Удаляем токен из заголовков
export const clearAuthHeader = () => {
  delete api.defaults.headers.common['Authorization'];
};

// Получаем токен из localStorage
export const getToken = () => localStorage.getItem('token');

// Регистрация
export const registerUser = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const response = await api.post('/users/signup', userData);
    const { token } = response.data;
    localStorage.setItem('token', token); // Сохраняем токен
    setAuthHeader(token);
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
    localStorage.setItem('token', token); // Сохраняем токен
    setAuthHeader(token);
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

// Обновление данных пользователя (refresh)
export const refreshUser = createAsyncThunk('auth/refreshUser', async (_, thunkAPI) => {
  const token = getToken();

  if (!token) {
    return thunkAPI.rejectWithValue('Нет токена, запрос отклонен');
  }

  setAuthHeader(token);

  try {
    const response = await api.get('/users/current'); // Запрос GET
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Ошибка при обновлении пользователя');
  }
});
