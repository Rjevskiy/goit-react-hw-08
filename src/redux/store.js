import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contacts/contactsSlice';
import filtersReducer from './filters/filtersSlice';
import authReducer from './auth/authSlice';  // Импортируем редуктор для аутентификации

const store = configureStore({
  reducer: {
    contacts: contactsReducer, 
    filters: filtersReducer,  
    auth: authReducer,  // Добавляем редуктор аутентификации
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
  devTools: process.env.NODE_ENV !== 'production', 
});

export default store;



