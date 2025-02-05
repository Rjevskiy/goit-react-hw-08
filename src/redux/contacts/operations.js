import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Установка заголовка авторизации
const getToken = () => {
  return localStorage.getItem('token');
};

const setAuthHeader = () => {
  const token = getToken();
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.replace(/^"|"$/g, '')}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Получение всех контактов
export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      setAuthHeader(); // Устанавливаем заголовок авторизации
      const response = await axios.get("https://connections-api.goit.global/contacts");
      return response.data;
    } catch (error) {
      // Логирование ошибки для отладки
      console.error('Fetch contacts error:', error.response?.data || error.message);
      
      // Обработка ошибки авторизации (401)
      if (error.response && error.response.status === 401) {
        console.log('Session expired. Please log in again.');
        // Здесь можно выполнить редирект на страницу входа или очистку состояния авторизации
      }
      
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Добавление нового контакта
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact, thunkAPI) => {
    try {
      setAuthHeader();  // Устанавливаем заголовок авторизации
      const response = await axios.post("https://connections-api.goit.global/contacts", contact);
      return response.data;
    } catch (error) {
      console.error('Add contact error:', error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Удаление контакта
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      setAuthHeader();  // Устанавливаем заголовок авторизации
      await axios.delete(`https://connections-api.goit.global/contacts/${contactId}`);
      return contactId;
    } catch (error) {
      console.error('Delete contact error:', error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
