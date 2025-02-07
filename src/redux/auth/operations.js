import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Создаём axios инстанс с базовым URL
const api = axios.create({
  baseURL: 'https://connections-api.goit.global/',
});

// Функция для получения токена из localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Функция для установки токена в заголовок
const setAuthHeader = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

// Убираем токен из заголовков при логауте
const clearAuthHeader = () => {
  delete api.defaults.headers.common['Authorization'];
};

// РЕГИСТРАЦИЯ
export const registerUser = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const response = await api.post('users/signup', userData);
    const { token } = response.data;

    localStorage.setItem('token', token);
    setAuthHeader(token); // Устанавливаем токен в заголовки

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

// ЛОГИН
export const loginUser = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const response = await api.post('users/login', credentials);
    const { token } = response.data;

    localStorage.setItem('token', token);
    setAuthHeader(token); // Устанавливаем токен в заголовки

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

// ЛОГАУТ
export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await api.post('users/logout');

    localStorage.removeItem('token');
    clearAuthHeader(); // Убираем токен из заголовков

    return null;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

// ФУНКЦИЯ ДЛЯ ЗАГРУЗКИ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.token || getToken(); // Получаем токен из Redux или localStorage

  if (!token) {
    return thunkAPI.rejectWithValue('Нет токена, запрос отклонен');
  }

  setAuthHeader(token); // Устанавливаем заголовок перед запросом

  try {
    const response = await api.get('users/current');
    return response.data; // Возвращаем данные пользователя
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

// ЗАГРУЗКА КОНТАКТОВ
export const fetchContacts = createAsyncThunk('contacts/fetchAll', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.token || getToken(); // Получаем токен из Redux или localStorage

  if (!token) {
    return thunkAPI.rejectWithValue('Нет токена, запрос отклонен');
  }

  setAuthHeader(token); // Устанавливаем заголовок перед запросом

  try {
    const response = await api.get('contacts');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});
