import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaSearch, FaTimes } from 'react-icons/fa';
import '../styles/SearchBar.css';

const SearchBar = ({ value, onChange, placeholder = "Search projects..." }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className={`search-bar-container ${isFocused ? 'focused' : ''}`}>
      <div className="search-bar-wrapper">
        <FaSearch className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {value && (
          <button
            className="search-clear-button"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <FaTimes />
          </button>
        )}
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

export default SearchBar;
