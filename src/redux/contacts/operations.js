import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://connections-api.goit.global/',
});

const setAuthHeader = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

const clearAuthHeader = () => {
  delete api.defaults.headers.common['Authorization'];
};

// ФУНКЦІЯ ОТРИМАННЯ ТОКЕНА
export const getToken = () => localStorage.getItem('token');

// РЕЄСТРАЦІЯ
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

// ЛОГІН
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

// ВИХІД ІЗ АККАУНТА
export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await api.post('users/logout');
    
    localStorage.removeItem('token');
    clearAuthHeader(); 

    thunkAPI.dispatch({ type: 'contacts/resetContacts' }); 
    return null;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Помилка виходу');
  }
});

// ОТРИМАННЯ ДАНИХ КОРИСТУВАЧА
export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.token || getToken();

  if (!token) {
    return thunkAPI.rejectWithValue('Немає токена, запит відхилено');
  }

  setAuthHeader(token); 

  try {
    const response = await api.get('users/current');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Помилка завантаження даних');
  }
});

// ---------- ОПЕРАЦІЇ ДЛЯ КОНТАКТІВ ----------

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.token || localStorage.getItem('token');

  if (!token) {
    return thunkAPI.rejectWithValue('Немає токена, запит відхилено');
  }

  setAuthHeader(token); 

  try {
    const response = await api.get('contacts');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Помилка завантаження контактів');
  }
});

export const addContact = createAsyncThunk('contacts/addContact', async (contact, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.token || localStorage.getItem('token');

  if (!token) {
    return thunkAPI.rejectWithValue('Немає токена, запит відхилено');
  }

  setAuthHeader(token); 

  try {
    const response = await api.post('contacts', contact);
    return response.data;
  } catch (error) {
    console.error('Помилка додавання контакту:', error.response?.data || error.message);
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (contactId, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.token || localStorage.getItem('token');

  if (!token) {
    return thunkAPI.rejectWithValue('Немає токена, запит відхилено');
  }

  setAuthHeader(token); 

  try {
    await api.delete(`contacts/${contactId}`);
    return contactId;
  } catch (error) {
    console.error('Помилка видалення контакту:', error.response?.data || error.message);
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});
