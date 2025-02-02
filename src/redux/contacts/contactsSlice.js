
import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './contactsOperations';
import { createSelector } from '@reduxjs/toolkit'; // Импортируем createSelector для создания селектора

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          (contact) => contact.id !== action.payload
        );
      });

    builder
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

// Селектор для фильтрации контактов
export const selectFilteredContacts = createSelector(
  [(state) => state.contacts.items, (state) => state.filters],
  (contacts, { name, searchType }) => {
    return contacts.filter((contact) => {
      const valueToSearch =
        searchType === 'name' ? contact.name : contact.number;
      return valueToSearch.toLowerCase().includes(name.toLowerCase());
    });
  }
);

export default contactsSlice.reducer;



