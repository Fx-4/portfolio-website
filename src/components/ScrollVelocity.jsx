import { useRef, useLayoutEffect, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import "../styles/ScrollVelocity.css";

const useElementWidth = (ref) => {
  const [width, setWidth] = useState(0);
  
  useLayoutEffect(() => {
    const updateWidth = () => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    };
    
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [ref]);
  
  return width;
};

const VelocityText = ({
  children,
  baseVelocity,
  scrollContainerRef,
  className = "",
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = {
    input: [0, 1000],
    output: [0, 5]
  },
  parallaxClassName = "parallax",
  scrollerClassName = "scroller",
  parallaxStyle = {},
  scrollerStyle = {},
}) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');
    
    setIsDark(savedTheme === 'dark' || (!savedTheme && darkModeQuery.matches));

    const handleThemeChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setIsDark(e.matches);
      }
    };

    darkModeQuery.addEventListener('change', handleThemeChange);
    return () => darkModeQuery.removeEventListener('change', handleThemeChange);
  }, []);

  const baseX = useMotionValue(0);
  const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {};
  const { scrollY } = useScroll(scrollOptions);
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping,
    stiffness,
  });

  const velocityFactor = useTransform(
    smoothVelocity,
    velocityMapping.input,
    velocityMapping.output,
    { clamp: false }
  );

  const copyRef = useRef(null);
  const copyWidth = useElementWidth(copyRef);

  const wrap = (min, max, v) => {
    const range = max - min;
    const mod = (((v - min) % range) + range) % range;
    return mod + min;
  };

  const x = useTransform(baseX, (v) => {
    if (copyWidth === 0) return "0px";
    return `${wrap(-copyWidth, 0, v)}px`;
  });

  const directionFactor = useRef(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }
    
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const computedParallaxStyle = {
    backgroundColor: isDark ? 'var(--background)' : 'var(--background)',
    ...parallaxStyle
  };

  const computedScrollerStyle = {
    color: isDark ? 'var(--text)' : 'var(--text)',
    x,
    ...scrollerStyle
  };

  return (
    <div className={parallaxClassName} style={computedParallaxStyle}>
      <motion.div className={scrollerClassName} style={computedScrollerStyle}>
        {Array.from({ length: numCopies }, (_, i) => (
          <span className={className} key={i} ref={i === 0 ? copyRef : null}>
            {children}&nbsp;
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// Define velocityMapping PropType
const velocityMappingShape = PropTypes.shape({
  input: PropTypes.arrayOf(PropTypes.number).isRequired,
  output: PropTypes.arrayOf(PropTypes.number).isRequired
});

VelocityText.propTypes = {
  children: PropTypes.node.isRequired,
  baseVelocity: PropTypes.number.isRequired,
  scrollContainerRef: PropTypes.object,
  className: PropTypes.string,
  damping: PropTypes.number,
  stiffness: PropTypes.number,
  numCopies: PropTypes.number,
  velocityMapping: velocityMappingShape,
  parallaxClassName: PropTypes.string,
  scrollerClassName: PropTypes.string,
  parallaxStyle: PropTypes.object,
  scrollerStyle: PropTypes.object
};

const ScrollVelocity = ({
  scrollContainerRef,
  texts = [],
  velocity = 50,
  className = "",
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = {
    input: [0, 1000],
    output: [0, 5]
  },
  parallaxClassName = "parallax",
  scrollerClassName = "scroller",
  parallaxStyle = {},
  scrollerStyle = {},
}) => {
  if (!texts.length) {
    return null;
  }

  return (
    <section>
      {texts.map((text, index) => (
        <VelocityText
          key={index}
          className={className}
          baseVelocity={index % 2 !== 0 ? -velocity : velocity}
          scrollContainerRef={scrollContainerRef}
          damping={damping}
          stiffness={stiffness}
          numCopies={numCopies}
          velocityMapping={velocityMapping}
          parallaxClassName={parallaxClassName}
          scrollerClassName={scrollerClassName}
          parallaxStyle={parallaxStyle}
          scrollerStyle={scrollerStyle}
        >
          {text}
        </VelocityText>
      ))}
    </section>
  );
};

ScrollVelocity.propTypes = {
  scrollContainerRef: PropTypes.object,
  texts: PropTypes.arrayOf(PropTypes.string),
  velocity: PropTypes.number,
  className: PropTypes.string,
  damping: PropTypes.number,
  stiffness: PropTypes.number,
  numCopies: PropTypes.number,
  velocityMapping: velocityMappingShape,
  parallaxClassName: PropTypes.string,
  scrollerClassName: PropTypes.string,
  parallaxStyle: PropTypes.object,
  scrollerStyle: PropTypes.object
};

export default ScrollVelocity;