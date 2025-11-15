import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import '../styles/CircularText.css';

const CircularText = ({ 
  text = 'DEVELOPER • DESIGNER • CREATOR • ',
  radius = 80,
  fontSize = 14,
  letterSpacing = 8,
  className = '',
  animate = true,
  speed = 30, // seconds for one rotation
  startAngle = 0, // starting rotation offset
}) => {
  const textRef = useRef(null);

  useEffect(() => {
    const textElement = textRef.current;
    if (!textElement) return;

    const characters = text.split('');
    textElement.innerHTML = '';

    const angleStep = 360 / characters.length;

    characters.forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.setProperty('--index', i);
      span.style.setProperty('--angle', `${startAngle + (i * angleStep)}deg`);
      textElement.appendChild(span);
    });
  }, [text, startAngle]);

  return (
    <div 
      className={`circular-text-wrapper ${animate ? 'animate' : ''} ${className}`}
      style={{
        '--radius': `${radius}px`,
        '--font-size': `${fontSize}px`,
        '--letter-spacing': `${letterSpacing}deg`,
        '--speed': `${speed}s`,
      }}
    >
      {/* SVG Circle Background with Stroke */}
      <svg 
        className="circular-text-background" 
        width={radius * 2} 
        height={radius * 2}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none'
        }}
      >
        <circle
          cx={radius}
          cy={radius}
          r={radius - 8}
          fill="none"
          stroke="currentColor"
          strokeWidth="14"
          className="circle-stroke"
        />
      </svg>
      <div className="circular-text" ref={textRef}></div>
    </div>
  );
};

CircularText.propTypes = {
  text: PropTypes.string,
  radius: PropTypes.number,
  fontSize: PropTypes.number,
  letterSpacing: PropTypes.number,
  className: PropTypes.string,
  animate: PropTypes.bool,
  speed: PropTypes.number,
  startAngle: PropTypes.number,
};

export default CircularText;
