import PropTypes from 'prop-types';
import '../styles/ShinyText.css';

const ShinyText = ({ text, disabled = false, speed = 5, className = '' }) => {
  // The CSS handles theme changes automatically through the [data-theme="dark"] selector
  // No need to track theme state in the component
  
  return (
    <div
      className={`shiny-text ${disabled ? 'disabled' : ''} ${className}`}
      style={{ 
        animationDuration: `${speed}s`,
      }}
    >
      {text}
    </div>
  );
};

ShinyText.propTypes = {
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  speed: PropTypes.number,
  className: PropTypes.string
};

export default ShinyText;