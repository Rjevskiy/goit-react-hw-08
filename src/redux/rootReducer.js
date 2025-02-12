    import { combineReducers } from 'redux';
    import contactsReducer from './contacts/slice'; // Путь к вашему редьюсеру контактов
    import filtersReducer from './filters/slice';   // Путь к вашему редьюсеру фильтров
    import authReducer from './auth/slice';         // Путь к вашему редьюсеру аутентификации

    // Объединяем редьюсеры
    const rootReducer = combineReducers({
    contacts: contactsReducer,
    filters: filtersReducer,
    auth: authReducer,
    });

    export default rootReducer; // Экспортируем объединённый редьюсер
