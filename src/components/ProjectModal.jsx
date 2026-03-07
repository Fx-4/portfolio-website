import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/ProjectModal.css';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaCalendarAlt, FaExpand } from 'react-icons/fa';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        if (lightboxOpen) {
          setLightboxOpen(false);
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, lightboxOpen]);

  // Reset lightbox when modal closes
  useEffect(() => {
    if (!isOpen) setLightboxOpen(false);
  }, [isOpen]);

  if (!isOpen || !project) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleLightboxClose = (e) => {
    if (e.target === e.currentTarget) setLightboxOpen(false);
  };

  return (
    <>
      <div className="pm-backdrop" onClick={handleBackdropClick}>
        <div className="pm-container">
          {/* Close button */}
          <button className="pm-close" onClick={onClose} aria-label="Close modal">
            <FaTimes />
          </button>

          <div className="pm-layout">
            {/* ── Left: Image Panel ── */}
            <div
              className="pm-image-panel"
              onClick={() => setLightboxOpen(true)}
              title="Click to expand"
            >
              <img
                src={project.src}
                alt={project.title}
                className="pm-image"
              />
              {/* Expand hint overlay */}
              <div className="pm-image-expand-hint">
                <FaExpand />
                <span>Click to expand</span>
              </div>
              <div className="pm-image-overlay">
                <div className="pm-image-overlay-content">
                  <span className="pm-image-category">{project.category}</span>
                  <h2 className="pm-image-title">{project.title}</h2>
                </div>
              </div>
            </div>

            {/* ── Right: Details Panel ── */}
            <div className="pm-details-panel">
              {/* Date row */}
              <div className="pm-date-row">
                <FaCalendarAlt />
                <span>{project.date.month} {project.date.year}</span>
              </div>

              {/* Overview */}
              <div className="pm-section">
                <span className="pm-section-label">Overview</span>
                <p className="pm-description">{project.description}</p>
              </div>

              {/* Tech Stack */}
              <div className="pm-section">
                <span className="pm-section-label">Tech Stack</span>
                <div className="pm-tech-grid">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="pm-tech-item">{tech}</span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pm-actions">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pm-btn pm-btn-github"
                  >
                    <FaGithub />
                    <span>View Code</span>
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pm-btn pm-btn-demo"
                  >
                    <FaExternalLinkAlt />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightboxOpen && (
        <div
          className="pm-lightbox-backdrop"
          onClick={handleLightboxClose}
        >
          <button
            className="pm-lightbox-close"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close lightbox"
          >
            <FaTimes />
          </button>
          <div className="pm-lightbox-img-wrap" onClick={handleLightboxClose}>
            <img
              src={project.src}
              alt={project.title}
              className="pm-lightbox-img"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="pm-lightbox-caption">
            <span className="pm-lightbox-caption-category">{project.category}</span>
            <span className="pm-lightbox-caption-title">{project.title}</span>
          </div>
        </div>
      )}
    </>
  );
};

ProjectModal.propTypes = {
  project: PropTypes.shape({
    src: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
    date: PropTypes.shape({
      month: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired
    }).isRequired,
    githubUrl: PropTypes.string,
    demoUrl: PropTypes.string
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default ProjectModal;
