import { useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/ProjectModal.css';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaCalendarAlt, FaFolder, FaCode } from 'react-icons/fa';

const ProjectModal = ({ project, isOpen, onClose }) => {
  // Close modal on ESC key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="project-modal-backdrop" onClick={handleBackdropClick}>
      <div className="project-modal-container">
        {/* Close Button */}
        <button className="project-modal-close" onClick={onClose} aria-label="Close modal">
          <FaTimes />
        </button>

        {/* Modal Content */}
        <div className="project-modal-content">
          {/* Project Image */}
          <div className="project-modal-image-container">
            <img 
              src={project.src} 
              alt={project.title}
              className="project-modal-image"
            />
            <div className="project-modal-image-overlay" />
          </div>

          {/* Project Details */}
          <div className="project-modal-details">
            {/* Category Badge */}
            <div className="project-modal-category">
              <FaFolder />
              <span>{project.category}</span>
            </div>

            {/* Title */}
            <h2 className="project-modal-title">{project.title}</h2>

            {/* Date */}
            <div className="project-modal-date">
              <FaCalendarAlt />
              <span>{project.date.month} {project.date.year}</span>
            </div>

            {/* Description */}
            <p className="project-modal-description">
              {project.description}
            </p>

            {/* Technologies Section */}
            <div className="project-modal-section">
              <h3 className="project-modal-section-title">
                <FaCode />
                Technologies Used
              </h3>
              <div className="project-modal-technologies">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="project-modal-tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="project-modal-actions">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-modal-button project-modal-button-github"
                >
                  <FaGithub />
                  <span>View on GitHub</span>
                </a>
              )}
              
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-modal-button project-modal-button-demo"
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
