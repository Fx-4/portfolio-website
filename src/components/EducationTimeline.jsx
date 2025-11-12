import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import {
  GraduationCap,
  MapPin,
  Calendar,
  Award,
  FileText,
  Users,
  Trophy
} from 'lucide-react';
import '../styles/EducationTimeline.css';

// Education Card Component
const EducationCard = ({ degree, university, location, period, status, description, index }) => {
  return (
    <motion.div
      className="education-card"
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="education-card-header">
        <div className="education-icon">
          <GraduationCap size={24} />
        </div>
        {status && (
          <span className="education-status">{status}</span>
        )}
      </div>

      <div className="education-card-content">
        <h3 className="education-degree">{degree}</h3>
        <h4 className="education-university">{university}</h4>

        <div className="education-details">
          <div className="education-detail-item">
            <MapPin size={14} />
            <span>{location}</span>
          </div>
          <div className="education-detail-item">
            <Calendar size={14} />
            <span>{period}</span>
          </div>
        </div>

        {description && (
          <p className="education-description">{description}</p>
        )}
      </div>

      <div className="education-card-decoration"></div>
    </motion.div>
  );
};

EducationCard.propTypes = {
  degree: PropTypes.string.isRequired,
  university: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  status: PropTypes.string,
  description: PropTypes.string,
  index: PropTypes.number.isRequired,
};

// Certification Card Component
const CertificationCard = ({ title, issuer, date, credentialId, skills, index }) => {
  return (
    <motion.div
      className="education-card certification-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="education-card-header">
        <div className="education-icon">
          <Award size={24} />
        </div>
      </div>

      <div className="education-card-content">
        <h3 className="education-degree">{title}</h3>
        <h4 className="education-university">{issuer}</h4>

        <div className="education-details">
          <div className="education-detail-item">
            <Calendar size={14} />
            <span>{date}</span>
          </div>
          {credentialId && (
            <div className="education-detail-item">
              <FileText size={14} />
              <span>{credentialId}</span>
            </div>
          )}
        </div>

        {skills && skills.length > 0 && (
          <div className="certification-skills">
            {skills.map((skill, idx) => (
              <span key={idx} className="skill-badge">{skill}</span>
            ))}
          </div>
        )}
      </div>

      <div className="education-card-decoration"></div>
    </motion.div>
  );
};

CertificationCard.propTypes = {
  title: PropTypes.string.isRequired,
  issuer: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  credentialId: PropTypes.string,
  skills: PropTypes.arrayOf(PropTypes.string),
  index: PropTypes.number.isRequired,
};

// Organization Card Component
const OrganizationCard = ({ role, organization, period, description, index }) => {
  return (
    <motion.div
      className="education-card organization-card"
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="education-card-header">
        <div className="education-icon">
          <Users size={24} />
        </div>
      </div>

      <div className="education-card-content">
        <h3 className="education-degree">{role}</h3>
        <h4 className="education-university">{organization}</h4>

        <div className="education-details">
          <div className="education-detail-item">
            <Calendar size={14} />
            <span>{period}</span>
          </div>
        </div>

        {description && (
          <p className="education-description">{description}</p>
        )}
      </div>

      <div className="education-card-decoration"></div>
    </motion.div>
  );
};

OrganizationCard.propTypes = {
  role: PropTypes.string.isRequired,
  organization: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  description: PropTypes.string,
  index: PropTypes.number.isRequired,
};

// Achievement Card Component
const AchievementCard = ({ title, event, rank, date, description, index }) => {
  return (
    <motion.div
      className="education-card achievement-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="education-card-header">
        <div className="education-icon">
          <Trophy size={24} />
        </div>
        {rank && (
          <span className="education-status achievement-rank">{rank}</span>
        )}
      </div>

      <div className="education-card-content">
        <h3 className="education-degree">{title}</h3>
        <h4 className="education-university">{event}</h4>

        <div className="education-details">
          <div className="education-detail-item">
            <Calendar size={14} />
            <span>{date}</span>
          </div>
        </div>

        {description && (
          <p className="education-description">{description}</p>
        )}
      </div>

      <div className="education-card-decoration"></div>
    </motion.div>
  );
};

AchievementCard.propTypes = {
  title: PropTypes.string.isRequired,
  event: PropTypes.string.isRequired,
  rank: PropTypes.string,
  date: PropTypes.string.isRequired,
  description: PropTypes.string,
  index: PropTypes.number.isRequired,
};

// Main Timeline Component
const EducationTimeline = ({
  educationData = [],
  certificationData = [],
  organizationData = [],
  achievementData = []
}) => {
  const [activeTab, setActiveTab] = useState('education');

  const tabs = [
    { id: 'education', label: 'Education', icon: GraduationCap, count: educationData.length },
    { id: 'certifications', label: 'Certifications', icon: Award, count: certificationData.length },
    { id: 'organizations', label: 'Organizations', icon: Users, count: organizationData.length },
    { id: 'achievements', label: 'Achievements', icon: Trophy, count: achievementData.length },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'education':
        return educationData.map((edu, index) => (
          <EducationCard key={index} {...edu} index={index} />
        ));
      case 'certifications':
        return certificationData.map((cert, index) => (
          <CertificationCard key={index} {...cert} index={index} />
        ));
      case 'organizations':
        return organizationData.map((org, index) => (
          <OrganizationCard key={index} {...org} index={index} />
        ));
      case 'achievements':
        return achievementData.map((ach, index) => (
          <AchievementCard key={index} {...ach} index={index} />
        ));
      default:
        return null;
    }
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case 'education':
        return educationData;
      case 'certifications':
        return certificationData;
      case 'organizations':
        return organizationData;
      case 'achievements':
        return achievementData;
      default:
        return [];
    }
  };

  return (
    <div className="education-timeline-section">
      <motion.div
        className="education-timeline-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="education-timeline-title">Educational Journey</h2>
        <p className="education-timeline-subtitle">
          Exploring my academic path, certifications, community involvement, and achievements
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <div className="timeline-tabs">
        <div className="tabs-container">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={18} className="tab-icon" />
                <span className="tab-label">{tab.label}</span>
                <span className="tab-count">{tab.count}</span>
              </button>
            );
          })}
        </div>
        <div
          className="tab-indicator"
          style={{
            transform: `translateX(${tabs.findIndex(t => t.id === activeTab) * 100}%)`
          }}
        />
      </div>

      {/* Timeline Content */}
      <div className="education-timeline-container">
        <div className="timeline-line"></div>
        <AnimatePresence mode="wait">
          {getCurrentData().length > 0 ? (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="timeline-content"
            >
              {renderContent()}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="empty-state"
            >
              <div className="empty-icon">
                {activeTab === 'education' && <GraduationCap size={48} />}
                {activeTab === 'certifications' && <Award size={48} />}
                {activeTab === 'organizations' && <Users size={48} />}
                {activeTab === 'achievements' && <Trophy size={48} />}
              </div>
              <p>No {activeTab} added yet</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

EducationTimeline.propTypes = {
  educationData: PropTypes.array,
  certificationData: PropTypes.array,
  organizationData: PropTypes.array,
  achievementData: PropTypes.array,
};

export default EducationTimeline;
