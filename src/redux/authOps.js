import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Устанавливаем базовый URL
axios.defaults.baseURL = "https://connections-api.goit.global/";

// Устанавливаем заголовок авторизации
const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Очищаем заголовок авторизации
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

// Регистрация пользователя
export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      // Отправка запроса на регистрацию с добавлением поля name
      const response = await axios.post("/users/signup", credentials);
      setAuthHeader(response.data.token); // Устанавливаем токен
      return response.data; // Возвращаем данные пользователя и токен
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error?.message || 'Ошибка при регистрации';
      console.error('Registration error:', errorMessage);
      return thunkAPI.rejectWithValue(errorMessage); // Отправляем ошибку
    }
  }
);

// Логин пользователя
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/users/login", credentials);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error?.message || 'Ошибка при входе';
      console.error('Login error:', errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Логаут пользователя
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await axios.post("/users/logout");
      clearAuthHeader();
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error?.message || 'Ошибка при выходе';
      console.error('Logout error:', errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Получение информации о текущем пользователе
export const fetchCurrentUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue("Нет токена");
    }

    setAuthHeader(token);

    try {
      const response = await axios.get("/users/current");
      return response.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error?.message || 'Ошибка при получении информации о пользователе';
      console.error('Fetch current user error:', errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

