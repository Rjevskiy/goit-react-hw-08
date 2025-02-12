import React from 'react';
import ReactDOM from 'react-dom/client'; // Новый импорт для React 18
import { store, persistor } from './redux/store'; // Импортируем store и persistor
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Для загрузки persisted состояния
import App from './App'; // Импорт компонента App

// Создаём корневой элемент с помощью createRoot
const root = ReactDOM.createRoot(document.getElementById('root')); 

// Рендерим приложение с Redux Provider и PersistGate
root.render(
  <Provider store={store}>
    <PersistGate loading={<div>Загрузка...</div>} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
