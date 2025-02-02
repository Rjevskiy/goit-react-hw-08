import { createSelector } from '@reduxjs/toolkit';

const selectContacts = (state) => state.contacts.items;
const selectFilters = (state) => state.filters;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilters],
  (contacts, { name, searchType }) => {
    // Проверка на наличие данных в фильтре и контактах
    if (!name) return contacts;
    
    return contacts.filter((contact) => {
      const valueToSearch =
        searchType === 'name' ? contact.name : contact.number;
      
      // Обработать возможные пустые значения или ошибки
      return valueToSearch && valueToSearch.toLowerCase().includes(name.toLowerCase());
    });
  }
);
