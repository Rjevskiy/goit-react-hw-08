import { createSelector } from '@reduxjs/toolkit';

const selectContacts = (state) => state.contacts.items;
const selectFilters = (state) => state.filters;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilters],
  (contacts, { name = '', searchType = 'name' }) => {
    if (!contacts || contacts.length === 0) return [];

    const normalizedFilter = name.trim().toLowerCase();

    return contacts.filter((contact) => {
      const valueToSearch =
        searchType === 'name' ? contact.name : contact.number;

      return valueToSearch?.toLowerCase().includes(normalizedFilter);
    });
  }
);
