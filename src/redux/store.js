import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth/slice'; 
import contactsReducer from './contacts/slice'; 


const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'], 
};


const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);


const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, 
    contacts: contactsReducer,  
  },
  devTools: process.env.NODE_ENV !== 'production', 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], 
      },
    }),
});


const persistor = persistStore(store);


export { store, persistor };
