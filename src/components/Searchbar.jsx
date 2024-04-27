import PropTypes from 'prop-types';
import { useState } from 'react';

export const Searchbar = ({ handleSearch }) => {
  const [query, setQuery] = useState('');

  const onChange = e => {
    setQuery(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <header className="searchbar">
      <form className="searchForm" onSubmit={onSubmit}>
        <button type="submit" className="searchForm-button">
          <span className="searchForm-button-label">Search</span>
        </button>

        <input
          className="searchForm-input"
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
          value={query}
          onChange={onChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  handleSearch: PropTypes.func,
};
