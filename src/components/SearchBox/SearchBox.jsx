import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeFilter } from '../../redux/filtersSlice'; 
import './SearchBox.css';

const SearchBox = () => {
  const filter = useSelector((state) => state.filters.name); 
  const searchType = useSelector((state) => state.filters.searchType); 
  const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    dispatch(changeFilter({ name: 'name', value: e.target.value })); 
  };

  const handleSearchTypeChange = (e) => {
    dispatch(changeFilter({ name: 'searchType', value: e.target.value })); 
  };

  return (
    <div className="divSBox">
      <label className="search-label">Пошук контакту:</label>
      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Пошук контакту:"
      />
      <div className="labelRadio">
        <label>
          <input
            type="radio"
            value="name"
            name="searchType"
            checked={searchType === 'name'}
            onChange={handleSearchTypeChange}
          />
          Введіть ім'я
        </label>
        <label>
          <input
            type="radio"
            value="number"
            name="searchType"
            checked={searchType === 'number'}
            onChange={handleSearchTypeChange}
          />
          Введіть номер
        </label>
      </div>
    </div>
  );
};

export default SearchBox;






