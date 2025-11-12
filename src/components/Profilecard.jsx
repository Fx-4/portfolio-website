
import PropTypes from 'prop-types';
import '../styles/Profilecard.css';
import profileImg from '../assets/profile/Profile.png';

const ProfileCard = ({
  avatarUrl = profileImg,
  name = 'Haikal Hifzhi Helmy',
  title = 'Informatics Student',
  handle = 'haikalhelmy',
  status = 'Available',
  contactText = 'Contact',
  linkedinUrl,
  className = '',
}) => {
  const computedLinkedinUrl = linkedinUrl || `https://www.linkedin.com/in/${handle}`;

  return (
    <div className={`profile-card-wrapper ${className}`.trim()}>
      <div className="profile-card">
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
            <span className="profile-handle">@{handle}</span>
            <span className="profile-status">
              <span className="status-dot"></span>
              {status}
            </span>
          </div>

          {/* Contact Button */}
          <a
            className="profile-contact-btn"
            href={computedLinkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Connect with ${name} on LinkedIn`}
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
    </div>
  );
};

ProfileCard.propTypes = {
  avatarUrl: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
  handle: PropTypes.string,
  status: PropTypes.string,
  contactText: PropTypes.string,
  linkedinUrl: PropTypes.string,
  className: PropTypes.string,
};

export default ProfileCard;
