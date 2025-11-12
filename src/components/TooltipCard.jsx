import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/TooltipCard.css';

const TooltipCard = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span className="tooltip-wrapper">
      <span
        className="tooltip-trigger"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </span>

      {isVisible && (
        <span className="tooltip-box">
          {content}
        </span>
      )}
    </span>
  );
};

TooltipCard.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  delay: PropTypes.number
};

export default TooltipCard;
