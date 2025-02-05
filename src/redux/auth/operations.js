import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Устанавливаем заголовок авторизации
const setAuthHeader = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};

// Очищаем заголовок авторизации при логауте
const clearAuthHeader = () => {
  delete axios.defaults.headers.common.Authorization;
};

// Функция для получения токена из localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// РЕГИСТРАЦИЯ
export const registerUser = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const response = await axios.post('https://connections-api.goit.global/users/signup', userData);
    const { token } = response.data;

    localStorage.setItem('token', token);
    setAuthHeader(token); // Устанавливаем токен

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

// ЛОГИН
export const loginUser = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post('https://connections-api.goit.global/users/login', credentials);
    const { token } = response.data;

    localStorage.setItem('token', token);
    setAuthHeader(token); // Устанавливаем токен

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

// ЛОГАУТ
export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('https://connections-api.goit.global/users/logout');

    localStorage.removeItem('token');
    clearAuthHeader(); // Очищаем токен

    return null;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

// ЗАГРУЗКА КОНТАКТОВ
export const fetchContacts = createAsyncThunk('contacts/fetchAll', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.token || getToken(); // Проверяем токен в state или localStorage

  if (!token) {
    return thunkAPI.rejectWithValue('Нет токена, запрос отклонен');
  }

  setAuthHeader(token); // Устанавливаем заголовок перед запросом

  try {
    const response = await axios.get('https://connections-api.goit.global/contacts');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});
