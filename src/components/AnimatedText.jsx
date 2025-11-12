import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const AnimatedText = ({ 
  text, 
  animateBy = "words", 
  duration = 0.5, 
  delay = 0.1,
  direction = "bottom",
  staggerChildren = 0.05
}) => {
  // Split the text into words
  const words = text.split(' ');

  // Direction settings
  const getInitialPosition = () => {
    switch(direction) {
      case "top": return { y: -20, opacity: 0 };
      case "bottom": return { y: 20, opacity: 0 };
      case "left": return { x: -20, opacity: 0 };
      case "right": return { x: 20, opacity: 0 };
      default: return { y: 20, opacity: 0 };
    }
  };
  
  const getFinalPosition = () => {
    return { x: 0, y: 0, opacity: 1 };
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren, 
        delayChildren: delay 
      } 
    }
  };
  
  const childVariants = {
    hidden: getInitialPosition(),
    visible: {
      ...getFinalPosition(),
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration
      }
    }
  };
  
  // Split by characters for letter-by-letter animation
  if (animateBy === "letters") {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{ opacity: 1, willChange: "auto" }}
      >
        {words.map((word, wordIndex) => (
          <React.Fragment key={wordIndex}>
            <span className="mr-[0.25em] inline-block overflow-y-hidden whitespace-nowrap">
              {word.split('').map((char, charIndex) => (
                <motion.span
                  key={`${wordIndex}-${charIndex}`}
                  className="inline-block"
                  variants={childVariants}
                  style={{ opacity: 1, transform: "none", willChange: "auto" }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
            {wordIndex < words.length - 1 && " "}
          </React.Fragment>
        ))}
      </motion.div>
    );
  }
  
  // Default: animate by words
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ opacity: 1, willChange: "auto" }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="mr-[0.25em] inline-block overflow-y-hidden whitespace-nowrap"
          variants={childVariants}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

AnimatedText.propTypes = {
  text: PropTypes.string.isRequired,
  animateBy: PropTypes.oneOf(["words", "letters"]),
  duration: PropTypes.number,
  delay: PropTypes.number,
  direction: PropTypes.oneOf(["top", "bottom", "left", "right"]),
  staggerChildren: PropTypes.number
};
export default AnimatedText;