import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { store, persistor } from './redux/store'; 
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; 
import App from './App'; 


const root = ReactDOM.createRoot(document.getElementById('root')); 


root.render(
  <Provider store={store}>
    <PersistGate loading={<div>Загрузка...</div>} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
