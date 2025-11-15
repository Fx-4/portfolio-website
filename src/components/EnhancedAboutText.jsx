import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/EnhancedAboutText.css';

const EnhancedAboutText = ({
  enableBlur = true,
  blurStrength = 4,
  className = ''
}) => {
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        threshold: 0.3,
        rootMargin: '0px'
      }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.2
      }
    }
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      filter: enableBlur ? `blur(${blurStrength}px)` : 'blur(0px)',
      y: 10
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  // Split text into words while preserving spans
  const text = "Hi, I'm Haikal Hifzhi Helmy, an Informatics student passionate about technology and innovation. Currently pursuing a double degree program, I'm focused on creating impactful solutions that contribute to society and put Indonesia on the global innovation map.";
  
  const renderWords = (text) => {
    const specialWords = {
      'Haikal Hifzhi Helmy': 'name-gradient',
      'Informatics student': 'keyword',
      'technology': 'keyword',
      'double degree program': 'keyword'
    };

    const words = text.split(' ');
    let result = [];
    let i = 0;

    while (i < words.length) {
      let matched = false;
      
      // Check for multi-word special phrases
      for (const [phrase, className] of Object.entries(specialWords)) {
        const phraseWords = phrase.split(' ');
        const nextWords = words.slice(i, i + phraseWords.length).join(' ');
        
        if (nextWords === phrase) {
          result.push(
            <motion.span key={i} variants={wordVariants} className={className} style={{ display: 'inline-block', marginRight: '0.25em' }}>
              {phrase}
            </motion.span>
          );
          i += phraseWords.length;
          matched = true;
          break;
        }
      }
      
      if (!matched) {
        result.push(
          <motion.span key={i} variants={wordVariants} style={{ display: 'inline-block', marginRight: '0.25em' }}>
            {words[i]}
          </motion.span>
        );
        i++;
      }
    }
    
    return result;
  };

  return (
    <motion.div
      ref={containerRef}
      className={`enhanced-about-text ${className}`}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <p className="about-paragraph">
        {renderWords(text)}
      </p>
    </motion.div>
  );
};

EnhancedAboutText.propTypes = {
  enableBlur: PropTypes.bool,
  blurStrength: PropTypes.number,
  className: PropTypes.string
};

export default EnhancedAboutText;
