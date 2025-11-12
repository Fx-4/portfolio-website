import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import TooltipCard from './TooltipCard';
import '../styles/EnhancedAboutText.css';

const EnhancedAboutText = ({
  baseOpacity = 0.18,
  enableBlur = true,
  blurStrength = 4,
  className = ''
}) => {
  const [inView, setInView] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          const progress = Math.min(Math.max(entry.intersectionRatio * 1.5, 0), 1);
          setScrollProgress(progress);
        } else {
          setScrollProgress(0);
        }
      },
      {
        // Reduced threshold points for better performance
        threshold: [0, 0.25, 0.5, 0.75, 1.0],
        rootMargin: '0px 0px -10% 0px'
      }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: scrollProgress > 0.1 ? 1 : 0,
      y: scrollProgress > 0.1 ? 0 : 30,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        staggerChildren: 0.8
      }
    }
  };

  const paragraphVariants = {
    hidden: {
      opacity: baseOpacity,
      filter: enableBlur ? `blur(${blurStrength}px)` : 'blur(0px)',
      y: 20
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  // Cleanup on unmount - cancel animations for faster navigation
  useEffect(() => {
    return () => {
      // Cleanup when component unmounts
      setInView(false);
      setScrollProgress(0);
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className={`enhanced-about-text ${className}`}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Paragraph 1 - Introduction */}
      <motion.p variants={paragraphVariants} className="about-paragraph">
        Hi, I&apos;m <span className="name-gradient">Haikal Hifzhi Helmy</span>, an{' '}
        <TooltipCard content="Studying Informatics Engineering with focus on Software Development">
          <span className="keyword">Informatics student</span>
        </TooltipCard>{' '}
        passionate about{' '}
        <TooltipCard content="Building innovative solutions using modern web technologies">
          <span className="keyword">technology</span>
        </TooltipCard>{' '}
        and innovation. My journey began with a deep curiosity about how technology can simplify human life, both physically and virtually. This passion has driven me to explore{' '}
        <TooltipCard content="JavaScript, React, Next.js, Python, Java & more">
          <span className="keyword">programming</span>
        </TooltipCard>
        , software development, and problem-solving.
      </motion.p>

      {/* Paragraph 2 - Goals and Vision */}
      <motion.p variants={paragraphVariants} className="about-paragraph">
        I thrive in{' '}
        <TooltipCard content="Team projects, open-source contributions & tech communities">
          <span className="keyword">collaborative environments</span>
        </TooltipCard>
        , love tackling challenges, and continuously seek opportunities to learn and grow. My goal is to create impactful technological solutions that contribute to society and put Indonesia on the global innovation map.
      </motion.p>

      {/* Paragraph 3 - Education & Experience */}
      <motion.p variants={paragraphVariants} className="about-paragraph">
        Currently pursuing a{' '}
        <TooltipCard content="Studying at both UII Yogyakarta (Indonesia) and Nanjing Xiaozhuang University (China)">
          <span className="keyword">unique double degree program</span>
        </TooltipCard>
        , I&apos;m gaining diverse perspectives and international experience in{' '}
        <TooltipCard content="Full-stack development, UI/UX design, database management & DevOps">
          <span className="keyword">software engineering</span>
        </TooltipCard>
        . This journey has equipped me with both technical skills and cross-cultural insights that shape my approach to building innovative solutions. Let&apos;s connect and build something amazing together!
      </motion.p>
    </motion.div>
  );
};

EnhancedAboutText.propTypes = {
  baseOpacity: PropTypes.number,
  enableBlur: PropTypes.bool,
  blurStrength: PropTypes.number,
  className: PropTypes.string
};

export default EnhancedAboutText;
