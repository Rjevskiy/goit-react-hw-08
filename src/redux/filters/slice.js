import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',         
  searchType: 'name', 
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeFilter(state, action) {
      const { name, value } = action.payload;
      if (Object.prototype.hasOwnProperty.call(state, name)) {
        state[name] = value;
      }
    },
  },
});

export const { changeFilter } = filtersSlice.actions;

export default filtersSlice.reducer;
