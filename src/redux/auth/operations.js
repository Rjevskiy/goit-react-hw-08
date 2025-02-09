import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://connections-api.goit.global/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Функция для установки заголовка авторизации
const setAuthHeader = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

// Функция для очистки заголовка авторизации
const clearAuthHeader = () => {
  delete api.defaults.headers.common['Authorization'];
};

// Функция получения токена из localStorage
export const getToken = () => localStorage.getItem('token');

// Регистрация пользователя
export const registerUser = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const response = await api.post('users/signup', userData);
    const { token } = response.data;

    localStorage.setItem('token', token);
    setAuthHeader(token);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Ошибка регистрации');
  }
});

// Логин пользователя
export const loginUser = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const response = await api.post('users/login', credentials);
    const { token } = response.data;

    localStorage.setItem('token', token);
    setAuthHeader(token);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Ошибка входа');
  }
});

// Выход из аккаунта
export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await api.post('users/logout');

    // Удаляем токен и очищаем заголовки
    localStorage.removeItem('token');
    clearAuthHeader();

    // Сбрасываем контакты
    thunkAPI.dispatch({ type: 'contacts/resetContacts' });
    return null;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Ошибка выхода');
  }
});

// Получение данных пользователя
export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.token || getToken();

  if (!token) {
    return thunkAPI.rejectWithValue('Нет токена, запрос отклонен');
  }

  setAuthHeader(token);

  try {
    const response = await api.get('users/current');
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      // Очистка токена, если он невалиден
      localStorage.removeItem('token');
      clearAuthHeader();
    }
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Ошибка загрузки данных');
  }
});
