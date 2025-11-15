import PropTypes from 'prop-types';
import '../styles/CategoryFilter.css';

// Color mapping untuk setiap kategori
const categoryColors = {
  'All': 'all',
  'UI/UX Design': 'design',
  'Web Development': 'web',
  'Mobile Development': 'mobile',
  'Mobile Application': 'mobile-app',
  'Web Application': 'web-app',
  'Mental Health App': 'health'
};

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="category-filter-container">
      <div className="category-filter-wrapper">
        {categories.map((category) => {
          const colorClass = categoryColors[category] || 'default';
          return (
            <button
              key={category}
              className={`category-filter-button category-${colorClass} ${activeCategory === category ? 'active' : ''}`}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
};

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired
};

export default CategoryFilter;
