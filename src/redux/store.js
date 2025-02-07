import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import contactsReducer from './contacts/slice';
import filtersReducer from './filters/slice';
import authReducer from './auth/slice';

// Конфиг для persist (сохраняем только token, но не user)
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'], // Храним только токен, чтобы не терять аутентификацию
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filters: filtersReducer,
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Отключаем проверку сериализации (нужно для persist)
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

