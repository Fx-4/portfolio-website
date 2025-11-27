import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Masonry({ items, columnCount = 3, gap = 20 }) {
  const [columns, setColumns] = useState([]);
  const [responsiveColumns, setResponsiveColumns] = useState(columnCount);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;

      // Responsive column logic
      if (width < 640) {
        // Mobile: 1 column
        setResponsiveColumns(1);
      } else if (width < 1024) {
        // Tablet: 2 columns
        setResponsiveColumns(2);
      } else {
        // Desktop: use original columnCount prop
        setResponsiveColumns(columnCount);
      }
    };

    // Initial update
    updateColumns();

    // Listen for window resize
    window.addEventListener('resize', updateColumns);

    return () => window.removeEventListener('resize', updateColumns);
  }, [columnCount]);

  useEffect(() => {
    // Distribute items across columns
    const cols = Array.from({ length: responsiveColumns }, () => []);

    items.forEach((item, index) => {
      const columnIndex = index % responsiveColumns;
      cols[columnIndex].push(item);
    });

    setColumns(cols);
  }, [items, responsiveColumns]);

  return (
    <div
      style={{
        display: 'flex',
        gap: `${gap}px`,
        alignItems: 'flex-start',
        width: '100%',
      }}
    >
      {columns.map((column, columnIndex) => (
        <div
          key={columnIndex}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: `${gap}px`,
            minWidth: 0,
          }}
        >
          {column.map((item, itemIndex) => (
            <div key={itemIndex}>{item}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

Masonry.propTypes = {
  items: PropTypes.array.isRequired,
  columnCount: PropTypes.number,
  gap: PropTypes.number
};

export default Masonry;
