import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import contactsReducer from './contacts/slice';
import filtersReducer from './filters/slice';
import authReducer from './auth/slice';


const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'], 
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
      serializableCheck: false, 
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);