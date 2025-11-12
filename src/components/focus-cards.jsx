import React, { useState } from "react";
import PropTypes from 'prop-types';
import '../styles/focus-cards.css';

const Card = React.memo(({
  card,
  index,
  hovered,
  setHovered
}) => {
  const isBlurred = hovered !== null && hovered !== index;
  const isOverlayVisible = hovered === index;
  
  const handleCardClick = () => {
    if (card.url) {
      window.open(card.url, '_blank');
    }
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
    url: PropTypes.string
  }).isRequired,
  index: PropTypes.number.isRequired,
  hovered: PropTypes.number,
  setHovered: PropTypes.func.isRequired
};

Card.displayName = "Card";

function FocusCards({ cards }) {
  const [hovered, setHovered] = useState(null);
  
  return (
    <div className="focus-cards-grid">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered} 
        />
      ))}
    </div>
  );
}

FocusCards.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      url: PropTypes.string
    })
  ).isRequired
};

export { FocusCards, Card };