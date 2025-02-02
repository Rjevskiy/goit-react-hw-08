import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    name: '', 
    searchType: 'name', 
  },
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
