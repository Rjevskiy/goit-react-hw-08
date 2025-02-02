// redux/contacts/contactsSelectors.js
import { createSelector } from '@reduxjs/toolkit';

const selectContacts = (state) => state.contacts.items;
const selectFilters = (state) => state.filters;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilters],
  (contacts, { name, searchType }) => {
    return contacts.filter((contact) => {
      const valueToSearch =
        searchType === 'name' ? contact.name : contact.number;
      return valueToSearch.toLowerCase().includes(name.toLowerCase());
    });
  }
);
