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


const slice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    resetContacts: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; 
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      
      .addCase(addContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload); 
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          (contact) => contact.id !== action.payload
        );
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetContacts } = slice.actions;
export default slice.reducer;
