import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://connections-api.goit.global/',
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
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Помилка реєстрації');
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
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Помилка входу');
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
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Помилка виходу');
  }
});

// Получение данных пользователя
export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  let token = state.auth.token || getToken(); // Получаем токен из состояния или из localStorage.

  if (!token) {
    return thunkAPI.rejectWithValue('Немає токена, запит відхилено');
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
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Помилка завантаження даних');
  }
});
