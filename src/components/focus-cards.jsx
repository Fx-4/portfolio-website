import React, { useState } from "react";
import PropTypes from 'prop-types';
import '../styles/focus-cards.css';
import ProjectModal from './ProjectModal';

const Card = React.memo(({
  card,
  index,
  hovered,
  setHovered,
  onCardClick
}) => {
  const isBlurred = hovered !== null && hovered !== index;
  const isOverlayVisible = hovered === index;
  
  const handleCardClick = () => {
    onCardClick(card);
  };
  
  return (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      onClick={handleCardClick}
      className={`focus-card ${isBlurred ? 'blurred' : ''}`}
      style={{ cursor: card.url ? 'pointer' : 'default' }}
    >
      <img
        src={card.src}
        alt={card.title}
        className="focus-card-image"
      />
      <div className={`focus-card-overlay ${isOverlayVisible ? 'visible' : 'hidden'}`}>
        <div className="focus-card-title">
          {card.title}
        </div>
      </div>
    </div>
  );
});

Card.propTypes = {
  card: PropTypes.shape({
    src: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string,
    description: PropTypes.string,
    technologies: PropTypes.arrayOf(PropTypes.string),
    date: PropTypes.shape({
      month: PropTypes.string,
      year: PropTypes.number
    }),
    githubUrl: PropTypes.string,
    demoUrl: PropTypes.string
  }).isRequired,
  index: PropTypes.number.isRequired,
  hovered: PropTypes.number,
  setHovered: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired
};

Card.displayName = "Card";

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
    setTimeout(() => setSelectedProject(null), 300); // Clear after animation
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
      date: PropTypes.shape({
        month: PropTypes.string,
        year: PropTypes.number
      }),
      githubUrl: PropTypes.string,
      demoUrl: PropTypes.string
    })
  ).isRequired
};

export { FocusCards, Card };