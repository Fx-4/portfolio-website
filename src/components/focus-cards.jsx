import React, { useState } from "react";
import PropTypes from 'prop-types';
import { FiArrowRight } from 'react-icons/fi';
import '../styles/focus-cards.css';
import ProjectModal from './ProjectModal';

const Card = React.memo(({ card, index, hovered, setHovered, onCardClick }) => {
  const isBlurred = hovered !== null && hovered !== index;
  const num = String(index + 1).padStart(2, '0');

  return (
    <div
      className={`focus-card${isBlurred ? ' blurred' : ''}`}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      onClick={() => onCardClick(card)}
    >
      {/* Project image */}
      <img src={card.src} alt={card.title} className="focus-card-image" />

      {/* Always-on bottom gradient */}
      <div className="focus-card-gradient" />

      {/* Number badge */}
      <span className="focus-card-number">{num}</span>

      {/* Footer: category + title (visible by default, hides on hover) */}
      <div className="focus-card-footer">
        <div className="focus-card-footer-category">{card.category}</div>
        <div className="focus-card-footer-title">{card.title}</div>
      </div>

      {/* Hover reveal panel */}
      <div className="focus-card-hover-panel">
        <div className="focus-card-hover-category">{card.category}</div>
        <div className="focus-card-hover-title">{card.title}</div>
        <p className="focus-card-hover-desc">{card.description}</p>
        <div className="focus-card-tech-list">
          {card.technologies.slice(0, 3).map((tech, i) => (
            <span key={i} className="focus-card-tech-chip">{tech}</span>
          ))}
          {card.technologies.length > 3 && (
            <span className="focus-card-tech-chip">+{card.technologies.length - 3}</span>
          )}
        </div>
        <div className="focus-card-cta">
          <span>View Project</span>
          <FiArrowRight />
        </div>
      </div>
    </div>
  );
});

Card.displayName = "Card";

Card.propTypes = {
  card: PropTypes.shape({
    src: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string,
    description: PropTypes.string,
    technologies: PropTypes.arrayOf(PropTypes.string),
    date: PropTypes.shape({ month: PropTypes.string, year: PropTypes.number }),
    githubUrl: PropTypes.string,
    demoUrl: PropTypes.string
  }).isRequired,
  index: PropTypes.number.isRequired,
  hovered: PropTypes.number,
  setHovered: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired
};

function FocusCards({ cards }) {
  const [hovered, setHovered] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (card) => {
    setSelectedProject(card);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <>
      <div className="focus-cards-grid">
        {cards.map((card, index) => (
          <Card
            key={card.title}
            card={card}
            index={index}
            hovered={hovered}
            setHovered={setHovered}
            onCardClick={handleCardClick}
          />
        ))}
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}

FocusCards.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string,
      description: PropTypes.string,
      technologies: PropTypes.arrayOf(PropTypes.string),
      date: PropTypes.shape({ month: PropTypes.string, year: PropTypes.number }),
      githubUrl: PropTypes.string,
      demoUrl: PropTypes.string
    })
  ).isRequired
};

export { FocusCards, Card };
