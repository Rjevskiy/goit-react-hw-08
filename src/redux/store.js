import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth/slice'; // Проверка: существует ли файл authSlice.js?
import contactsReducer from './contacts/slice'; // Проверка: правильный путь к редьюсеру

// Конфигурация для auth
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'], // Сохраняем только token
};

// Оборачиваем authReducer в persistReducer
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

// Создаём store
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // Используем persistedAuthReducer
    contacts: contactsReducer,  // contactsReducer без persist
  },
  devTools: process.env.NODE_ENV !== 'production', // Включение devTools
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], // Игнорируем действия persist
      },
    }),
});

// Создаём persistor
const persistor = persistStore(store);

// Экспортируем store и persistor
export { store, persistor };
