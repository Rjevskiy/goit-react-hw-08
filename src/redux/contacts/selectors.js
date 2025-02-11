import { createSelector } from '@reduxjs/toolkit';

const selectContacts = (state) => state.contacts.items;
const selectFilters = (state) => state.filters;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilters],
  (contacts, filters) => {
    if (!contacts?.length) return [];

    const { name = '', searchType = 'name' } = filters || {};
    const normalizedFilter = name.trim().toLowerCase();

    return contacts.filter((contact) => {
      const valueToSearch =
        searchType === 'name' ? contact.name : contact.number;

      return valueToSearch?.toLowerCase().includes(normalizedFilter);
    });
  }
);
