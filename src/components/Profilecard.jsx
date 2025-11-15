
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import '../styles/Profilecard.css';
import profileImg from '../assets/profile/Profile.png';

const ProfileCard = ({
  avatarUrl = profileImg,
  name = 'Haikal Hifzhi Helmy',
  title = 'Informatics Student',
  status = 'Available',
  contactText = 'Contact',
  className = '',
  compact = false,
  compactStyle = 'split', // 'default', 'badge', 'split', 'floating', 'pill', 'icon-grid'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: '0px'
      }
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      filter: 'blur(8px)',
      y: 30
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.1
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={`profile-card-wrapper ${compact ? `compact-mode compact-${compactStyle}` : ''} ${className}`.trim()}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={cardVariants}
    >
      <div className="profile-card">
        {/* Dot Pattern Background */}
        <div className="profile-card-dot-pattern"></div>

        {/* Glassmorphism card background */}
        <div className="profile-card-background"></div>

        {/* Avatar Section */}
        <div className="profile-avatar-section">
          <div className="profile-avatar-container">
            <img
              className="profile-avatar"
              src={avatarUrl}
              alt={`${name} avatar`}
              loading="lazy"
            />
            <div className="profile-avatar-glow"></div>
          </div>
        </div>

        {/* Info Section */}
        <div className="profile-info-section">
          <h3 className="profile-name">{name}</h3>
          <p className="profile-title">{title}</p>

          <div className="profile-handle-status">
            <span className="profile-status">
              <span className="status-dot"></span>
              {status}
            </span>
          </div>

          {/* Interactive Stats Pills */}
          <div className="profile-stats-pills">
            <div className="stat-pill pill-education" data-tooltip="Currently Studying">
              <div className="pill-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
              </div>
              <span className="pill-text">Student</span>
            </div>
            
            <div className="stat-pill pill-work" data-tooltip="Seeking Opportunities">
              <div className="pill-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
              <span className="pill-text">Open to Work</span>
            </div>
            
            <div className="stat-pill pill-location" data-tooltip="Based in Indonesia">
              <div className="pill-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <span className="pill-text">Indonesia</span>
            </div>
          </div>

          {/* Contact Button */}
          <a
            className="profile-contact-btn"
            href="/contact"
            aria-label={`Contact ${name}`}
          >
            <span className="btn-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
            {contactText}
          </a>
        </div>
      </div>
    </motion.div>
  );
};

ProfileCard.propTypes = {
  avatarUrl: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
  status: PropTypes.string,
  contactText: PropTypes.string,
  className: PropTypes.string,
  compact: PropTypes.bool,
  compactStyle: PropTypes.oneOf(['default', 'badge', 'split', 'floating', 'pill', 'icon-grid'])
};

export default ProfileCard;
