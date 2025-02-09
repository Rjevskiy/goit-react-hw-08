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

// Получение токена из localStorage
export const getToken = () => localStorage.getItem('token');

// Запрос контактов
export const fetchContacts = createAsyncThunk('contacts/fetchAll', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.token || getToken();

  if (!token) {
    return thunkAPI.rejectWithValue('Нет токена, запрос отклонен');
  }

  setAuthHeader(token);

  try {
    const response = await api.get('contacts');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Ошибка загрузки контактов');
  }
});

// Добавление контакта
export const addContact = createAsyncThunk('contacts/addContact', async (contact, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.token || getToken();

  if (!token) {
    return thunkAPI.rejectWithValue('Нет токена, запрос отклонен');
  }

  setAuthHeader(token);

  try {
    const response = await api.post('contacts', contact);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Ошибка добавления контакта');
  }
});

// Удаление контакта
export const deleteContact = createAsyncThunk('contacts/deleteContact', async (contactId, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.token || getToken();

  if (!token) {
    return thunkAPI.rejectWithValue('Нет токена, запрос отклонен');
  }

  setAuthHeader(token);

  try {
    await api.delete(`contacts/${contactId}`);
    return contactId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Ошибка удаления контакта');
  }
});
