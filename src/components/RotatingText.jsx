import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

const CreativeRotatingText = ({ words = ['exceptional code'], className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [highlightColor, setHighlightColor] = useState('#2A9D8F');

  useEffect(() => {
    // Update highlight color based on theme
    const updateColor = () => {
      const computedColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--highlight').trim();
      setHighlightColor(computedColor || '#2A9D8F');
    };

    updateColor();

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          updateColor();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (words.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % words.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [words.length]);

  const splitIntoCharactersAndSpaces = (text) => {
    return text.split('').map((char, index) => ({
      char,
      isSpace: char === ' ',
      key: `${char}-${index}`
    }));
  };

  const characters = splitIntoCharactersAndSpaces(words[currentIndex]);

  return (
    <span 
      className={`text-rotate rotating-text-main ${className}`}
      style={{ color: highlightColor }}
    >
      <span className="text-rotate-sr-only">{words[currentIndex]}</span>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="text-rotate"
          aria-hidden="true"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ color: highlightColor }}
        >
          <span className="text-rotate-word" style={{ color: highlightColor }}>
            {characters.map(({ char, isSpace, key }, idx) => (
              isSpace ? (
                <span key={key} className="text-rotate-space">&nbsp;</span>
              ) : (
                <motion.span
                  key={key}
                  className="text-rotate-element"
                  style={{ color: highlightColor }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.05,
                    ease: "easeOut"
                  }}
                >
                  {char}
                </motion.span>
              )
            ))}
          </span>
        </motion.div>
      </AnimatePresence>
    </span>
  );
};

CreativeRotatingText.propTypes = {
  words: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string
};

export default CreativeRotatingText;