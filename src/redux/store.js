
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import rootReducer from './rootReducer'; 


const persistConfig = {
  key: 'root', 
  storage,     
  whitelist: ['contacts', 'auth'], 
};


const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production', 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], 
        ignoredPaths: ['auth.token'], 
      },
    }),
});


const persistor = persistStore(store);

export { store, persistor }; 
