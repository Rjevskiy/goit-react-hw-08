    import { combineReducers } from 'redux';
    import contactsReducer from './contacts/slice'; 
    import filtersReducer from './filters/slice';   
    import authReducer from './auth/slice';         

   
    const rootReducer = combineReducers({
    contacts: contactsReducer,
    filters: filtersReducer,
    auth: authReducer,
    });

    export default rootReducer; 
