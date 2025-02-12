import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, setAuthHeader, clearAuthHeader, getToken } from '../auth/operations'; 


export const fetchContacts = createAsyncThunk('contacts/fetchAll', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.token || getToken();

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
  const token = state.auth.token || getToken();

  if (!token) {
    return thunkAPI.rejectWithValue('Немає токена, запит відхилено');
  }

  setAuthHeader(token);

  try {
    const response = await api.post('contacts', contact);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Помилка додавання контакту');
  }
});


export const deleteContact = createAsyncThunk('contacts/deleteContact', async (contactId, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.token || getToken();

  if (!token) {
    return thunkAPI.rejectWithValue('Немає токена, запит відхилено');
  }

  setAuthHeader(token);

  try {
    await api.delete(`contacts/${contactId}`);
    return contactId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Помилка видалення контакту');
  }
});
