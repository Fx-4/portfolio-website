import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useSprings, animated } from '@react-spring/web';
import { Github, ArrowUpRight, Download, User, Calendar } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/About.css';
import EducationTimeline from './EducationTimeline';
import TooltipCard from './TooltipCard';
// Import your image - update the path if needed
import profileImage from '../assets/profile/Profile.png';
// Import resume PDF
import resumePDF from '../assets/resume/HAIKAL HIFZHI HELMY-resume (2).pdf';

// SplitText Component
const SplitText = ({
  text = '',
  className = '',
  delay = 100,
  animationFrom = { opacity: 0, transform: 'translate3d(0,40px,0)' },
  animationTo = { opacity: 1, transform: 'translate3d(0,0,0)' },
  easing = 'easeOutCubic',
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  onLetterAnimationComplete,
}) => {
  const words = text.split(' ').map(word => word.split(''));
  const letters = words.flat();
  const [inView, setInView] = useState(false);
  const ref = useRef();
  const animatedCount = useRef(0);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, [threshold, rootMargin]);
  
  const springs = useSprings(
    letters.length,
    letters.map((_, i) => ({
      from: animationFrom,
      to: inView
        ? async (next) => {
          await next(animationTo);
          animatedCount.current += 1;
          if (animatedCount.current === letters.length && onLetterAnimationComplete) {
            onLetterAnimationComplete();
          }
        }
        : animationFrom,
      delay: i * delay,
      config: { easing },
    }))
  );
  
  return (
    <p
      ref={ref}
      className={`split-parent ${className}`}
      style={{ 
        textAlign, 
        overflow: 'hidden', 
        display: 'inline-block', 
        whiteSpace: 'normal', 
        wordWrap: 'break-word',
        width: '100%'
      }}
      aria-label={text}
    >
      {words.map((word, wordIndex) => (
        <span 
          key={wordIndex} 
          style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
          aria-hidden="true"
        >
          {word.map((letter, letterIndex) => {
            const index = words
              .slice(0, wordIndex)
              .reduce((acc, w) => acc + w.length, 0) + letterIndex;
            return (
              <animated.span
                key={index}
                className="animated-letter"
                style={{
                  ...springs[index],
                  display: 'inline-block',
                  willChange: 'transform, opacity',
                }}
              >
                {letter}
              </animated.span>
            );
          })}
          <span style={{ display: 'inline-block', width: '0.3em' }}>&nbsp;</span>
        </span>
      ))}
    </p>
  );
};

// PropTypes for SplitText
SplitText.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  delay: PropTypes.number,
  animationFrom: PropTypes.object,
  animationTo: PropTypes.object,
  easing: PropTypes.string,
  threshold: PropTypes.number,
  rootMargin: PropTypes.string,
  textAlign: PropTypes.string,
  onLetterAnimationComplete: PropTypes.func
};

// Skill Card Component
const SkillCard = ({ icon: Icon, title, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="skill-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
    >
      <div className={`skill-card-icon ${isHovered ? 'hovered' : ''}`}>
        <Icon size={24} />
        <div className="icon-background" />
      </div>
      <h3 className="skill-card-title">{title}</h3>
      <p className="skill-card-description">{description}</p>
      <motion.div 
        className="skill-card-indicator" 
        initial={{ width: 0 }} 
        animate={{ width: isHovered ? '100%' : '0%' }} 
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

// PropTypes for SkillCard
SkillCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

// Experience Item Component
const ExperienceItem = ({ year, title, company, description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <motion.div 
      className={`experience-item ${isExpanded ? 'expanded' : ''}`}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="experience-timeline">
        <div className="experience-year">
          <Calendar size={14} className="year-icon" />
          {year}
        </div>
        <div className="experience-line"></div>
      </div>
      <div className="experience-content">
        <h3 className="experience-title">{title}</h3>
        <div className="experience-company">
          <User size={14} className="company-icon" />
          {company}
        </div>
        <motion.p 
          className="experience-description"
          initial={{ height: 'auto' }}
          animate={{ height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          {description}
        </motion.p>
        <motion.button 
          className="experience-expand-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isExpanded ? "Show less" : "Show more"}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show less" : "Show more"}
        </motion.button>
      </div>
    </motion.div>
  );
};

// PropTypes for ExperienceItem
ExperienceItem.propTypes = {
  year: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

// Main About Component
const AboutSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out'
    });
  }, []);

  return (
    <section className="about-section" id="about" style={{ paddingTop: '40px' }}>
      <div className="about-container">
        {/* Simple Header */}
        <motion.div
          className="about-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="about-main-title">About Me</h1>
          <p className="about-subtitle">
            Turning vision into digital reality through code and creativity
          </p>
        </motion.div>

        {/* Profile & Bio Section */}
        <div className="about-content-wrapper" data-aos="fade-up">
          <div className="about-content">
            {/* Left Column: Photo + Stats */}
            <div className="profile-left-column">
              <motion.div
                className="profile-photo-container"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="profile-photo-wrapper">
                  <img
                    src={profileImage}
                    alt="Haikal Hifzhi Helmy Profile"
                    className="profile-photo"
                    loading="lazy"
                  />
                  <div className="photo-overlay"></div>
                  <div className="photo-badge">Developer & Designer</div>
                </div>
              </motion.div>

              {/* Stats moved to left column */}
              <motion.div 
                className="bio-stats"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="stat-item">
                  <span className="stat-number">2+</span>
                  <span className="stat-label">Years Learning</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">10+</span>
                  <span className="stat-label">Projects Built</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">2</span>
                  <span className="stat-label">Countries</span>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Bio Text */}
            <motion.div
              className="about-bio"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ staggerChildren: 0.06, delayChildren: 0.2 }}
            >
              <motion.p
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.06 } }
                }}
              >
                {[
                  "Hi, I'm ",
                  { text: "Haikal Hifzhi Helmy", bold: true },
                  ", an ",
                  { text: "Informatics student", keyword: true, tooltip: "Studying Informatics Engineering with focus on Software Development" },
                  " passionate about ",
                  { text: "technology", keyword: true, tooltip: "Building innovative solutions using modern web technologies" },
                  " and innovation. My journey began with a deep curiosity about how technology can simplify human life, both physically and virtually. This passion has driven me to explore ",
                  { text: "programming", keyword: true, tooltip: "JavaScript, React, Next.js, Python, Java & more" },
                  ", software development, and problem-solving."
                ].map((item, index) => {
                  const wordVariants = {
                    hidden: { opacity: 0, filter: 'blur(4px)', y: 10 },
                    visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.6 } }
                  };

                  if (typeof item === 'string') {
                    return item.split(' ').map((word, i) => (
                      <motion.span
                        key={`${index}-${i}`}
                        variants={wordVariants}
                        style={{ display: 'inline-block', marginRight: '0.25em' }}
                      >
                        {word}
                      </motion.span>
                    ));
                  } else if (item.bold) {
                    return (
                      <motion.strong
                        key={index}
                        variants={wordVariants}
                        style={{ display: 'inline-block', marginRight: '0.25em' }}
                      >
                        {item.text}
                      </motion.strong>
                    );
                  } else if (item.keyword) {
                    return (
                      <TooltipCard key={index} content={item.tooltip}>
                        <motion.span
                          variants={wordVariants}
                          className="keyword"
                          style={{ display: 'inline-block', marginRight: '0.25em' }}
                        >
                          {item.text}
                        </motion.span>
                      </TooltipCard>
                    );
                  }
                  return null;
                })}
              </motion.p>
              <motion.p
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.5 } }
                }}
              >
                {[
                  "I thrive in ",
                  { text: "collaborative environments", keyword: true, tooltip: "Team projects, open-source contributions & tech communities" },
                  ", love tackling challenges, and continuously seek opportunities to learn and grow. My goal is to create impactful technological solutions that contribute to society and put Indonesia on the global innovation map."
                ].map((item, index) => {
                  const wordVariants = {
                    hidden: { opacity: 0, filter: 'blur(4px)', y: 10 },
                    visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.6 } }
                  };

                  if (typeof item === 'string') {
                    return item.split(' ').map((word, i) => (
                      <motion.span
                        key={`${index}-${i}`}
                        variants={wordVariants}
                        style={{ display: 'inline-block', marginRight: '0.25em' }}
                      >
                        {word}
                      </motion.span>
                    ));
                  } else if (item.keyword) {
                    return (
                      <TooltipCard key={index} content={item.tooltip}>
                        <motion.span
                          variants={wordVariants}
                          className="keyword"
                          style={{ display: 'inline-block', marginRight: '0.25em' }}
                        >
                          {item.text}
                        </motion.span>
                      </TooltipCard>
                    );
                  }
                  return null;
                })}
              </motion.p>
              <motion.p
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.8 } }
                }}
              >
                {[
                  "Currently, I'm pursuing a ",
                  { text: "unique double degree program", keyword: true, tooltip: "Studying at both UII Yogyakarta (Indonesia) and Nanjing Xiaozhuang University (China)" },
                  ", studying both at Universitas Islam Indonesia in Yogyakarta and Nanjing Xiaozhuang University in China, gaining diverse perspectives and international experience in ",
                  { text: "software engineering", keyword: true, tooltip: "Full-stack development, UI/UX design, database management & DevOps" },
                  "."
                ].map((item, index) => {
                  const wordVariants = {
                    hidden: { opacity: 0, filter: 'blur(4px)', y: 10 },
                    visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.6 } }
                  };

                  if (typeof item === 'string') {
                    return item.split(' ').map((word, i) => (
                      <motion.span
                        key={`${index}-${i}`}
                        variants={wordVariants}
                        style={{ display: 'inline-block', marginRight: '0.25em' }}
                      >
                        {word}
                      </motion.span>
                    ));
                  } else if (item.keyword) {
                    return (
                      <TooltipCard key={index} content={item.tooltip}>
                        <motion.span
                          variants={wordVariants}
                          className="keyword"
                          style={{ display: 'inline-block', marginRight: '0.25em' }}
                        >
                          {item.text}
                        </motion.span>
                      </TooltipCard>
                    );
                  }
                  return null;
                })}
              </motion.p>
              <div className="about-cta">
                <a href={resumePDF} className="resume-button" download="Haikal_Hifzhi_Helmy_Resume.pdf" target="_blank" rel="noopener noreferrer">
                  <Download size={16} className="button-icon" />
                  <span>Download Resume</span>
                  <ArrowUpRight size={16} className="arrow-icon" />
                </a>
                <a href="https://github.com/Fx-4" className="github-link" target="_blank" rel="noopener noreferrer">
                  <Github size={18} />
                  <span>GitHub Profile</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Education Timeline */}
        <EducationTimeline
          educationData={[
            {
              degree: 'Bachelor of Informatics',
              university: 'Universitas Islam Indonesia (UII)',
              location: 'Yogyakarta, Indonesia',
              period: 'Aug 2023 - Aug 2026',
              status: 'In Progress',
              description: 'Currently pursuing a degree in Informatics with a GPA of 3.34/4.00. Focusing on software engineering, web development, and data structures. Active in campus organizations and tech communities.'
            },
            {
              degree: 'Bachelor of Software Engineering',
              university: 'Nanjing Xiaozhuang University',
              location: 'Nanjing, China',
              period: '2025 - 2027',
              status: 'Currently Studying',
              description: 'Double degree program focusing on advanced software engineering practices, international collaboration, and cutting-edge technologies.'
            },
            {
              degree: 'High School Diploma - Natural Sciences',
              university: 'SMA Citra Islami',
              location: 'Tangerang, Indonesia',
              period: 'Jul 2020 - Jul 2023',
              description: 'Completed high school education with a focus on Natural Sciences, including Mathematics, Physics, Chemistry, and Computer Science.'
            }
          ]}
          certificationData={[
            {
              title: 'Bootcamp Instructor & Speaker Certificate',
              issuer: 'Google Developer Groups on Campus (GDGoC) UII',
              date: 'January 2025',
              skills: ['UI/UX Fundamentals', 'Testing', 'Public Speaking', 'Mentoring']
            },
            {
              title: 'Belajar Dasar AI',
              issuer: 'Dicoding Indonesia',
              date: 'December 2024',
              credentialId: '07Z64YGJMPQR',
              skills: ['Artificial Intelligence', 'Machine Learning', 'AI Fundamentals']
            },
            {
              title: 'Belajar Dasar Data Science',
              issuer: 'Dicoding Indonesia',
              date: 'December 2024',
              credentialId: 'MRZMY14ORZYQ',
              skills: ['Data Science', 'Data Analysis', 'Statistics']
            },
            {
              title: 'Belajar Dasar Structured Query Language (SQL)',
              issuer: 'Dicoding Indonesia',
              date: 'December 2024',
              credentialId: 'N9ZOY842RPG5',
              skills: ['SQL', 'Database', 'Query Language']
            },
            {
              title: 'Memulai Pemrograman dengan Python',
              issuer: 'Dicoding Indonesia',
              date: 'December 2024',
              credentialId: 'JLX14OL52X72',
              skills: ['Python', 'Programming Fundamentals', 'Coding']
            },
            {
              title: 'English Proficiency Certificate',
              issuer: 'Duolingo English Test',
              date: 'February 2024',
              skills: ['English Proficiency', 'Communication', 'Language Skills']
            }
          ]}
          organizationData={[
            {
              role: 'Member of PDD Division',
              organization: 'Porsematik (Pekan Olahraga dan Seni Informatika) at UII',
              period: 'Nov 2024 - Dec 2024',
              description: 'Part of the Publication, Documentation & Design (PDD) division for Informatics Sports and Arts Week. Created promotional content, managed event visuals, and documented activities for proper coverage.'
            },
            {
              role: 'Core Team - Creative Division',
              organization: 'Google Developer Groups on Campus (GDGoC) UII',
              period: 'Aug 2024 - Oct 2024',
              description: 'Designed promotional materials, branding assets, and event visuals for game development community. Coordinated creative strategy to boost engagement and visibility for GDGoC events and workshops.'
            },
            {
              role: 'Mentoring Member, Waljam Division',
              organization: 'PESTA (Pesona Ta\'aruf) - Universitas Islam Indonesia',
              period: 'Aug 2024 - Sep 2024',
              description: 'Guided new students during orientation, introducing campus culture and academic systems. Facilitated group discussions and mentoring sessions to ease student transition to university life at UII.'
            },
            {
              role: 'Co-Founder',
              organization: 'BEGIN (Board Enthusiasts\' Group for Interactive Networking)',
              period: 'Jul 2024 - Present',
              description: 'Co-founded BEGIN, a board game community that organizes weekly board game sessions. Fostering social connections and strategic thinking through interactive board gaming experiences at UII.'
            },
            {
              role: 'Member of Ministry of Communication and Information',
              organization: 'Student Council - SMA Citra Islami',
              period: 'Aug 2022 - Aug 2023',
              description: 'Managed publication and academic documentation, ensuring clear communication across school events. Coordinated digital content creation and information dissemination during high school.'
            },
            {
              role: 'Member',
              organization: 'Ambalan (Scout Organization) - SMA Citra Islami',
              period: 'Aug 2022 - Aug 2023',
              description: 'Conducted socialization of regulations and implementation instructions for Pramuka Penegak. Ensured compliance and guided members in organizational discipline and scouting values.'
            },
            {
              role: 'Crew Member',
              organization: 'Scouting Activities - SMA Citra Islami',
              period: 'Jul 2020 - Jul 2023',
              description: 'Led scouting activities, coordinated training schedules, and supervised junior members. Developed leadership and teamwork skills through outdoor programs and community service initiatives.'
            },
            {
              role: 'Head of Graphic Design Club',
              organization: 'SMA Citra Islami - Extracurricular',
              period: 'Jul 2020 - Jul 2023',
              description: 'Led the graphic design club and served as an extracurricular teacher for graphic design. Mentored students in visual design principles, digital tools, and creative project development.'
            },
            {
              role: 'Core Team - Creative Division',
              organization: 'Google Developer Groups on Campus (GDGoC) UII',
              period: 'Jan 2021 - Jan 2022',
              description: 'Initial involvement with GDGoC during first year at UII. Contributed to creative design work for early campus developer community events and initiatives.'
            }
          ]}
          achievementData={[
            {
              title: '1st Place + Diamond Award Best of the Best',
              event: 'INDES 2024 Competition - UiTM (Universiti Teknologi MARA)',
              rank: 'Gold Medal',
              date: '2024',
              description: 'Achieved the highest honor with a Gold Medal and received the prestigious Diamond Award for Best of the Best at the International Design Exhibition (INDES) 2024 held at Universiti Teknologi MARA, Malaysia.'
            },
            {
              title: '3rd Place - Electroscope Section',
              event: 'Airnology 2.0 Competition - Universitas Airlangga',
              rank: '3rd Place',
              date: '2024',
              description: 'Secured third place in the electroscope section of Airnology 2.0, an innovation competition focused on environmental science and technology solutions at Universitas Airlangga.'
            }
          ]}
        />

      </div>
    </section>
  );
};

export default AboutSection;