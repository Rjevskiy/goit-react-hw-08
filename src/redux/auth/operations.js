import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const api = axios.create({
  baseURL: 'https://connections-api.goit.global/',
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


export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, thunkAPI) => {
  const token = getToken();

  if (!token) {
    return thunkAPI.rejectWithValue('Нет токена, запрос отклонен');
  }

  clearAuthHeader();
  localStorage.removeItem('token');

  return { message: 'Выход выполнен успешно' };
});


export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (_, thunkAPI) => {
  const token = getToken();

  if (!token) {
    return thunkAPI.rejectWithValue('Нет токена, запрос отклонен');
  }

  setAuthHeader(token);

  try {
    const response = await api.get('/users/current');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Ошибка при загрузке данных пользователя');
  }
});


export const loginUser = createAsyncThunk('auth/loginUser', async (userData, thunkAPI) => {
  try {
    const response = await api.post('/users/login', userData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Ошибка при входе');
  }
});


export const registerUser = createAsyncThunk('auth/registerUser', async (userData, thunkAPI) => {
  try {
    const response = await api.post('/users/signup', userData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Ошибка при регистрации');
  }
});
