// redux/auth/authOperations.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.goit.global/';  

// Операция для регистрации
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      // Отправляем запрос на регистрацию с полями name, email, password
      const response = await axios.post('users/signup', {
        name: userData.name,        // Поле name
        email: userData.email,      // Поле email
        password: userData.password // Поле password
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);  // Обработка ошибки
    }
  }
);

// redux/auth/authOperations.js
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      // Отправляем запрос на логин с полями email и password
      const response = await axios.post('users/login', {
        email: credentials.email,  // Поле email
        password: credentials.password  // Поле password
      });
      localStorage.setItem('token', response.data.token); // Сохраняем токен в localStorage
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message); // Обработка ошибки
    }
  }
);

