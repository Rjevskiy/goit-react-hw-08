import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';  
import { fetchContacts, addContact, deleteContact } from './operations';


const initialState = {
  items: [],
  loading: false,
  error: null,
};


const selectContacts = (state) => state.contacts.items;
const selectFilters = (state) => state.filters;


export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilters],
  (contacts, { name, searchType }) => {
    if (!contacts || contacts.length === 0 || !name) return contacts;

    return contacts.filter((contact) => {
      const valueToSearch = searchType === 'name' ? contact.name : contact.number;
      return valueToSearch?.toLowerCase().includes(name.toLowerCase());
    });
  }
);


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

export default contactsSlice.reducer;


