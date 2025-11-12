import { motion } from 'framer-motion';
import { useEffect, useRef, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import '../styles/ScrollReveal.css';

const WordReveal = ({ text, enableBlur, baseOpacity, blurStrength, delay = 50 }) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -20% 0px' }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const words = useMemo(() => {
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return { word, index };
    }).filter(item => typeof item === 'object');
  }, [text]);

  const fromSnapshot = {
    opacity: baseOpacity,
    filter: enableBlur ? `blur(${blurStrength}px)` : 'blur(0px)'
  };

  const toSnapshot = {
    opacity: 1,
    filter: 'blur(0px)'
  };

  return (
    <p ref={ref} className="scroll-reveal-text">
      {text.split(/(\s+)/).map((segment, index) => {
        if (segment.match(/^\s+$/)) return segment;
        
        const wordIndex = words.findIndex(w => w.word === segment && w.index >= index);
        
        return (
          <motion.span
            className="word inline-block will-change-[transform,filter,opacity]"
            key={index}
            initial={fromSnapshot}
            animate={inView ? toSnapshot : fromSnapshot}
            transition={{
              duration: 0.6,
              delay: (wordIndex * delay) / 1000,
              ease: 'easeOut'
            }}
          >
            {segment}
          </motion.span>
        );
      })}
    </p>
  );
};

const ParagraphReveal = ({ 
  text, 
  enableBlur, 
  baseOpacity, 
  blurStrength, 
  delay, 
  paragraphIndex, 
  paragraphDelay, 
  parentInView 
}) => {
  const [shouldStart, setShouldStart] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const ref = useRef(null);

  // Enhanced realtime scroll tracking
  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Calculate more precise scroll progress
          const rect = entry.boundingClientRect;
          const windowHeight = window.innerHeight;
          const elementCenter = rect.top + rect.height / 2;
          const viewportCenter = windowHeight / 2;
          
          // Calculate how close element is to center of viewport
          const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
          const maxDistance = windowHeight / 2;
          const centerProgress = Math.max(0, 1 - (distanceFromCenter / maxDistance));
          
          // Enhanced progress calculation
          const intersectionProgress = entry.intersectionRatio;
          const combinedProgress = (intersectionProgress + centerProgress) / 2;
          
          setScrollProgress(Math.min(Math.max(combinedProgress, 0), 1));
        } else {
          setScrollProgress(0);
        }
      },
      { 
        threshold: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1.0],
        rootMargin: '0px 0px 0px 0px'
      }
    );
    
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Enhanced timing control for paragraph sequence
  useEffect(() => {
    if (parentInView && scrollProgress > 0.4) { // Start when element is closer to center
      const startDelay = paragraphIndex * paragraphDelay;
      
      const timer = setTimeout(() => {
        setShouldStart(true);
      }, startDelay);
      
      return () => clearTimeout(timer);
    } else if (scrollProgress < 0.2) {
      setShouldStart(false);
    }
  }, [parentInView, paragraphIndex, paragraphDelay, scrollProgress]);

  const words = useMemo(() => {
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return { word, index };
    }).filter(item => typeof item === 'object');
  }, [text]);

  const fromSnapshot = {
    opacity: baseOpacity,
    filter: enableBlur ? `blur(${blurStrength}px)` : 'blur(0px)',
    y: 20,
    scale: 0.98
  };

  const toSnapshot = {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    scale: 1
  };

  const hiddenSnapshot = {
    opacity: 0,
    filter: enableBlur ? `blur(${blurStrength * 1.5}px)` : 'blur(0px)',
    y: -15,
    scale: 0.95
  };

  return (
    <p ref={ref} className="scroll-reveal-text text-left">
      {text.split(/(\s+)/).map((segment, index) => {
        if (segment.match(/^\s+$/)) return segment;
        
        const wordIndex = words.findIndex(w => w.word === segment && w.index >= index);
        
        return (
          <motion.span
            className="word inline-block will-change-[transform,filter,opacity]"
            key={index}
            initial={fromSnapshot}
            animate={
              scrollProgress < 0.2 ? hiddenSnapshot :
              shouldStart ? toSnapshot : fromSnapshot
            }
            transition={{
              duration: 0.6,
              delay: shouldStart ? (wordIndex * delay) / 1000 : 0,
              ease: [0.25, 0.1, 0.25, 1], // Custom cubic-bezier for smoother animation
              opacity: { duration: 0.4 },
              scale: { duration: 0.5 }
            }}
          >
            {segment}
          </motion.span>
        );
      })}
    </p>
  );
};

const ScrollReveal = ({
  children,
  enableBlur = true,
  baseOpacity = 0.1,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  delay = 30,
  paragraphDelay = 1800 // Lebih cepat untuk feel yang lebih responsive
}) => {
  const [inView, setInView] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  const paragraphs = useMemo(() => {
    const content = typeof children === 'string' ? children : children.toString();
    return content.split(/\n\s*\n/);
  }, [children]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          // Track overall scroll progress for the container
          const progress = Math.min(Math.max(entry.intersectionRatio * 1.5, 0), 1);
          setScrollProgress(progress);
        } else {
          setScrollProgress(0);
        }
      },
      { 
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: '0px 0px -10% 0px'
      }
    );
    
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div 
      ref={containerRef} 
      className={`scroll-reveal ${containerClassName}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ 
        opacity: scrollProgress > 0.1 ? 1 : 0,
        y: scrollProgress > 0.1 ? 0 : 30
      }}
      transition={{ 
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      <div className={`${textClassName} space-y-6 md:space-y-8 text-left`}>
        {paragraphs.map((paragraph, index) => (
          <ParagraphReveal
            key={index}
            text={paragraph}
            enableBlur={enableBlur}
            baseOpacity={baseOpacity}
            blurStrength={blurStrength}
            delay={delay}
            paragraphIndex={index}
            paragraphDelay={paragraphDelay}
            parentInView={inView}
          />
        ))}
      </div>
    </motion.div>
  );
};

ParagraphReveal.propTypes = {
  text: PropTypes.string.isRequired,
  enableBlur: PropTypes.bool,
  baseOpacity: PropTypes.number,
  blurStrength: PropTypes.number,
  delay: PropTypes.number,
  paragraphIndex: PropTypes.number.isRequired,
  paragraphDelay: PropTypes.number.isRequired,
  parentInView: PropTypes.bool.isRequired
};

WordReveal.propTypes = {
  text: PropTypes.string.isRequired,
  enableBlur: PropTypes.bool,
  baseOpacity: PropTypes.number,
  blurStrength: PropTypes.number,
  delay: PropTypes.number
};

ScrollReveal.propTypes = {
  children: PropTypes.node.isRequired,
  enableBlur: PropTypes.bool,
  baseOpacity: PropTypes.number,
  blurStrength: PropTypes.number,
  containerClassName: PropTypes.string,
  textClassName: PropTypes.string,
  delay: PropTypes.number,
  paragraphDelay: PropTypes.number
};

export default ScrollReveal;