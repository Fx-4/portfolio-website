import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/SkillsCarousel.css';

// Import icons from react-icons with correct names
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaDocker, 
  FaAws, FaGitAlt, FaJava, FaDatabase 
} from 'react-icons/fa';
import { 
  SiTypescript, SiNextdotjs, SiAngular, SiRedux, SiExpress, SiMysql,
  SiMongodb, SiPostgresql, SiCypress, SiFirebase,
  SiFramer, SiFigma, SiTailwindcss, SiPython,
  SiAdobeillustrator, SiCanva, SiPhpmyadmin
} from 'react-icons/si';
// Removed SiNagios as it doesn't exist, using FaDatabase as a replacement

// Icon mapping
const ICON_MAP = {
  'HTML': FaHtml5,
  'CSS': FaCss3Alt,
  'JavaScript': FaJs,
  'TypeScript': SiTypescript,
  'React.js': FaReact,
  'Next.js': SiNextdotjs,
  'Angular': SiAngular,
  'Redux': SiRedux,
  'Node.js': FaNodeJs,
  'Express.js': SiExpress,
  'MySQL': SiMysql,
  'MongoDB': SiMongodb,
  'PostgreSQL': SiPostgresql,
  'Cypress': SiCypress,
  'Docker': FaDocker,
  'Firebase': SiFirebase,
  'AWS': FaAws,
  'GSAP': FaReact, // Using a substitute icon for GSAP
  'Framer Motion': SiFramer,
  'Figma': SiFigma,
  'Tailwind CSS': SiTailwindcss,
  'GIT': FaGitAlt,
  'Python': SiPython, 
  'Java': FaJava,
  'Adobe Illustrator': SiAdobeillustrator,
  'Canva': SiCanva,
  'phpMyAdmin': SiPhpmyadmin,
  'Nagios': FaDatabase // Using FaDatabase as a substitute for Nagios
};

// Fallback icon if not found
const DefaultIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
    <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
  </svg>
);

// Skill item component with icon from library
const SkillItem = ({ skill, iconColor = "currentColor" }) => {
  // Get icon component from mapping
  const IconComponent = ICON_MAP[skill] || DefaultIcon;
  
  return (
    <div className="skill-item">
      <IconComponent size={18} color={iconColor} style={{ minWidth: '18px' }} />
      {skill}
    </div>
  );
};

SkillItem.propTypes = {
  skill: PropTypes.string.isRequired,
  iconColor: PropTypes.string
};

const SkillsCarousel = ({ 
  skills, 
  className = "", 
  speed = 1.5,
  iconColor
}) => {
  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Default skills if not provided
  const defaultSkills = [
    "HTML", "CSS", "JavaScript", "TypeScript", "React.js", "Next.js", 
    "Angular", "Redux", "Node.js", "Express.js", "MySQL", "MongoDB", 
    "PostgreSQL", "Cypress", "Docker", "Firebase", "AWS", "GSAP", 
    "Framer Motion", "Figma", "Tailwind CSS", "GIT"
  ];

  const displaySkills = skills || defaultSkills;
  
  // Tripling the skills to ensure smooth infinite scrolling
  const allSkills = [...displaySkills, ...displaySkills, ...displaySkills];

  useEffect(() => {
    // Set up the auto-scrolling animation
    let animationFrameId;
    let lastTime = 0;
    
    const animate = (currentTime) => {
      if (!lastTime) lastTime = currentTime;
      const deltaTime = currentTime - lastTime;
      
      if (containerRef.current && !isPaused) {
        // Update scroll position
        setScrollPosition(prevPosition => {
          const newPosition = prevPosition - speed * (deltaTime / 16);
          
          // When we've scrolled far enough, shift position to create illusion of infinite scroll
          const itemWidth = containerRef.current.scrollWidth / 3;
          if (Math.abs(newPosition) > itemWidth) {
            // Instead of resetting to 0, we shift by the width of one set of items
            // This creates a seamless loop
            return newPosition + itemWidth;
          }
          return newPosition;
        });
      }
      
      lastTime = currentTime;
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [displaySkills, isPaused, speed]);

  // Handle pause on hover
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div className={`skills-carousel ${className}`}>
      <div 
        className="carousel-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          className="carousel-content" 
          ref={containerRef}
          style={{ transform: `translateX(${scrollPosition}px)` }}
        >
          {allSkills.map((skill, index) => (
            <SkillItem 
              key={`${skill}-${index}`} 
              skill={skill}
              iconColor={iconColor}
            />
          ))}
        </div>
        <div className="gradient-overlay left"></div>
        <div className="gradient-overlay right"></div>
      </div>
    </div>
  );
};

SkillsCarousel.propTypes = {
  skills: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
  speed: PropTypes.number,
  iconColor: PropTypes.string
};

export default SkillsCarousel;