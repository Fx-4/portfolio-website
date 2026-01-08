import { useState } from 'react';
import { journeyData } from '../utils/journeyData';
// import Masonry from './Masonry'; // Temporarily commented out for redesign
import ShinyText from './ShinyText';

function JourneySection() {
  const [selectedCarousel, setSelectedCarousel] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  // const [selectedPhoto, setSelectedPhoto] = useState(null); // Temporarily commented out for redesign
  const [puzzlePieces, setPuzzlePieces] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const openCarousel = (design) => {
    setSelectedCarousel(design);
    // Initialize puzzle pieces with their original order
    setPuzzlePieces(design.slides.map((slide, index) => ({ src: slide, id: index })));
  };

  const closeCarousel = () => {
    setSelectedCarousel(null);
    setPuzzlePieces([]);
  };

  const openImage = (design) => {
    setSelectedImage(design);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  // Temporarily commented out for redesign
  // const openPhoto = (photo) => {
  //   setSelectedPhoto(photo);
  // };

  // const closePhoto = () => {
  //   setSelectedPhoto(null);
  // };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (dropIndex) => {
    if (draggedIndex === null) return;

    const newPieces = [...puzzlePieces];
    const draggedPiece = newPieces[draggedIndex];

    // Remove the dragged piece and insert it at the drop position
    newPieces.splice(draggedIndex, 1);
    newPieces.splice(dropIndex, 0, draggedPiece);

    setPuzzlePieces(newPieces);
    setDraggedIndex(null);
  };

  return (
    <div className="journey-section" style={{ paddingTop: '0', paddingBottom: '0' }}>
      {/* Photography Section - Temporarily commented out for redesign */}
      {/* <div style={{ marginBottom: 'clamp(80px, 12vw, 120px)' }}>
        <div style={{ marginBottom: 'clamp(20px, 3vw, 24px)' }}>
          <ShinyText text="</> Photography" />
        </div>
        <p style={{
          color: 'var(--text-muted)',
          fontSize: 'clamp(13px, 1.5vw, 15px)',
          maxWidth: '700px',
          margin: '0 auto 24px',
          padding: '0 20px'
        }}>
          Capturing moments and stories through the lens
        </p>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 clamp(12px, 5vw, 60px)'
        }}>
          <div style={{
            maxHeight: '80vh',
            overflowY: 'auto',
            overflowX: 'hidden',
            paddingRight: '10px',
            scrollbarWidth: 'thin',
            scrollbarColor: 'var(--text-muted) transparent'
          }}>
            <Masonry
              columnCount={3}
              gap={window.innerWidth < 640 ? 12 : 20}
              items={journeyData.photography.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => openPhoto(photo)}
                  style={{
                    position: 'relative',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <img
                    src={photo.src}
                    alt={photo.title}
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      borderRadius: '12px'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                    padding: 'clamp(12px, 3vw, 20px)',
                    color: 'white',
                    borderBottomLeftRadius: '12px',
                    borderBottomRightRadius: '12px'
                  }}>
                    <div style={{ fontSize: 'clamp(10px, 2vw, 12px)', opacity: 0.9, marginBottom: '4px' }}>
                      {photo.category} • {photo.year}
                    </div>
                    <div style={{ fontSize: 'clamp(12px, 2.5vw, 14px)', fontWeight: '500', lineHeight: '1.4' }}>
                      {photo.title}
                    </div>
                  </div>
                </div>
              ))}
            />
          </div>
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: '16px',
          color: 'var(--text-muted)',
          fontSize: '13px',
          opacity: 0.7
        }}>
          ↓ Scroll down to see more photos ↓
        </div>
      </div> */}

      {/* Design Section */}
      <div>
        <div style={{ marginBottom: 'clamp(20px, 3vw, 24px)' }}>
          <ShinyText text="</> Graphic Design" />
        </div>
        <p style={{
          color: 'var(--text-muted)',
          fontSize: 'clamp(13px, 1.5vw, 15px)',
          maxWidth: '700px',
          margin: '0 auto 24px',
          padding: '0 20px'
        }}>
          Visual storytelling through creative design and branding
        </p>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 clamp(12px, 5vw, 60px)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
            gap: 'clamp(12px, 2.5vw, 20px)',
            alignItems: 'start'
          }}>
          {journeyData.designs.map((design) => (
            <div
              key={design.id}
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: 'var(--card-background)',
                border: '1px solid var(--border-color)',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
              }}
              onClick={() => design.type === 'carousel' ? openCarousel(design) : openImage(design)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                position: 'relative',
                width: '100%',
                overflow: 'hidden',
                backgroundColor: 'var(--card-background)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 'clamp(200px, 35vw, 350px)'
              }}>
                <img
                  src={design.type === 'single' ? design.src : design.slides[0]}
                  alt={design.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: 'clamp(250px, 40vw, 400px)',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                />
                {design.type === 'carousel' && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {design.slides.length} slides
                  </div>
                )}
              </div>
              <div style={{ padding: 'clamp(16px, 3vw, 20px)' }}>
                <h4 style={{
                  fontSize: 'clamp(16px, 3vw, 18px)',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: 'var(--text-primary)'
                }}>
                  {design.title}
                </h4>
                <p style={{
                  fontSize: 'clamp(13px, 2.5vw, 14px)',
                  color: 'var(--text-muted)',
                  marginBottom: '12px',
                  lineHeight: '1.6'
                }}>
                  {design.description}
                </p>
                <div style={{
                  fontSize: 'clamp(11px, 2vw, 12px)',
                  color: 'var(--text-muted)',
                  borderTop: '1px solid var(--border-color)',
                  paddingTop: '12px',
                  marginTop: '12px'
                }}>
                  <div style={{ marginBottom: '4px' }}>
                    <strong>Context:</strong> {design.context}
                  </div>
                  <div style={{ marginBottom: '4px' }}>
                    <strong>Role:</strong> {design.role}
                  </div>
                  <div>
                    <strong>Year:</strong> {design.year}
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>

      {/* Puzzle Grid Modal */}
      {selectedCarousel && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.95)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(16px, 4vw, 40px)',
            overflowY: 'auto',
            overflowX: 'hidden'
          }}
          onClick={closeCarousel}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '800px',
              width: '100%',
              padding: 'clamp(40px, 8vw, 60px) clamp(8px, 2vw, 16px) clamp(16px, 3vw, 24px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'clamp(12px, 2vw, 16px)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeCarousel}
              style={{
                position: 'absolute',
                top: 'clamp(8px, 2vw, 16px)',
                right: 'clamp(8px, 2vw, 16px)',
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255,255,255,0.3)',
                borderRadius: '50%',
                width: 'clamp(36px, 7vw, 44px)',
                height: 'clamp(36px, 7vw, 44px)',
                color: 'white',
                fontSize: 'clamp(22px, 4.5vw, 26px)',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: '1',
                zIndex: 10,
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.9)';
                e.currentTarget.style.color = '#000';
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0,0,0,0.6)';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.4)';
              }}
            >
              ×
            </button>

            <div style={{
              color: 'white',
              textAlign: 'center',
              width: '100%'
            }}>
              <h4 style={{
                fontSize: 'clamp(16px, 3.5vw, 22px)',
                marginBottom: 'clamp(6px, 1.5vw, 10px)',
                fontWeight: '600',
                lineHeight: '1.3'
              }}>
                {selectedCarousel.title}
              </h4>
              <p style={{
                fontSize: 'clamp(11px, 2.2vw, 14px)',
                opacity: 0.85,
                marginBottom: 'clamp(8px, 1.5vw, 12px)',
                lineHeight: '1.5',
                padding: '0 clamp(8px, 2vw, 16px)'
              }}>
                {selectedCarousel.description}
              </p>
              <p style={{
                fontSize: 'clamp(10px, 1.8vw, 12px)',
                opacity: 0.65,
                fontStyle: 'italic'
              }}>
                Drag and drop to rearrange the puzzle pieces
              </p>
            </div>

            {/* 3x3 Puzzle Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'clamp(4px, 1.2vw, 8px)',
              backgroundColor: 'rgba(255,255,255,0.05)',
              padding: 'clamp(8px, 2vw, 16px)',
              borderRadius: 'clamp(8px, 2vw, 12px)',
              border: '1px solid rgba(255,255,255,0.08)',
              width: '100%',
              maxWidth: '600px'
            }}>
              {puzzlePieces.map((piece, index) => (
                <div
                  key={piece.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(index)}
                  style={{
                    aspectRatio: '1/1',
                    cursor: 'move',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    border: '2px solid rgba(255,255,255,0.2)',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.4)';
                    e.currentTarget.style.zIndex = '1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.zIndex = '0';
                  }}
                >
                  <img
                    src={piece.src}
                    alt={`Puzzle piece ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      pointerEvents: 'none'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: 'clamp(4px, 1vw, 6px)',
                    right: 'clamp(4px, 1vw, 6px)',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    width: 'clamp(20px, 4vw, 24px)',
                    height: 'clamp(20px, 4vw, 24px)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'clamp(10px, 2vw, 12px)',
                    fontWeight: '600'
                  }}>
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              color: 'white',
              textAlign: 'center',
              fontSize: 'clamp(10px, 2vw, 12px)',
              opacity: 0.75,
              padding: '0 clamp(8px, 2vw, 12px)',
              lineHeight: '1.6',
              maxWidth: '600px'
            }}>
              <div style={{ marginBottom: '4px' }}>
                <strong>Context:</strong> {selectedCarousel.context}
              </div>
              <div style={{ marginBottom: '4px' }}>
                <strong>Role:</strong> {selectedCarousel.role}
              </div>
              <div>
                <strong>Year:</strong> {selectedCarousel.year}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Single Image Preview Modal */}
      {selectedImage && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.95)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(16px, 4vw, 40px)',
            overflowY: 'auto',
            overflowX: 'hidden'
          }}
          onClick={closeImage}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '1000px',
              width: '100%',
              padding: 'clamp(40px, 8vw, 60px) clamp(8px, 2vw, 16px) clamp(16px, 3vw, 24px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'clamp(12px, 2vw, 16px)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeImage}
              style={{
                position: 'absolute',
                top: 'clamp(8px, 2vw, 16px)',
                right: 'clamp(8px, 2vw, 16px)',
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255,255,255,0.3)',
                borderRadius: '50%',
                width: 'clamp(36px, 7vw, 44px)',
                height: 'clamp(36px, 7vw, 44px)',
                color: 'white',
                fontSize: 'clamp(22px, 4.5vw, 26px)',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: '1',
                zIndex: 10,
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.9)';
                e.currentTarget.style.color = '#000';
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0,0,0,0.6)';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.4)';
              }}
            >
              ×
            </button>

            <div style={{
              color: 'white',
              textAlign: 'center',
              width: '100%',
              maxWidth: '800px'
            }}>
              <h4 style={{
                fontSize: 'clamp(16px, 3.5vw, 22px)',
                marginBottom: 'clamp(6px, 1.5vw, 10px)',
                fontWeight: '600',
                lineHeight: '1.3'
              }}>
                {selectedImage.title}
              </h4>
              <p style={{
                fontSize: 'clamp(11px, 2.2vw, 14px)',
                opacity: 0.85,
                lineHeight: '1.5',
                padding: '0 clamp(8px, 2vw, 16px)'
              }}>
                {selectedImage.description}
              </p>
            </div>

            {/* Large Image Display */}
            <div style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.03)',
              borderRadius: 'clamp(8px, 2vw, 16px)',
              padding: 'clamp(12px, 2.5vw, 20px)',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: 'calc(85vh - 150px)',
                  width: 'auto',
                  height: 'auto',
                  borderRadius: 'clamp(6px, 1.5vw, 12px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                  objectFit: 'contain'
                }}
              />
            </div>

            <div style={{
              color: 'white',
              textAlign: 'center',
              fontSize: 'clamp(10px, 2vw, 12px)',
              opacity: 0.75,
              padding: '0 clamp(8px, 2vw, 12px)',
              lineHeight: '1.6',
              maxWidth: '700px'
            }}>
              <div style={{ marginBottom: '4px' }}>
                <strong>Category:</strong> {selectedImage.category}
              </div>
              <div style={{ marginBottom: '4px' }}>
                <strong>Context:</strong> {selectedImage.context}
              </div>
              <div style={{ marginBottom: '4px' }}>
                <strong>Role:</strong> {selectedImage.role}
              </div>
              <div>
                <strong>Year:</strong> {selectedImage.year}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Photography Preview Modal - Temporarily commented out for redesign */}
      {/* {selectedPhoto && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.95)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(12px, 3vw, 32px)',
            overflowY: 'auto',
            overflowX: 'hidden'
          }}
          onClick={closePhoto}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '1200px',
              width: '100%',
              padding: 'clamp(40px, 8vw, 60px) clamp(8px, 2vw, 16px) clamp(16px, 3vw, 24px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'clamp(12px, 2vw, 16px)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closePhoto}
              style={{
                position: 'absolute',
                top: 'clamp(8px, 2vw, 16px)',
                right: 'clamp(8px, 2vw, 16px)',
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255,255,255,0.3)',
                borderRadius: '50%',
                width: 'clamp(36px, 7vw, 44px)',
                height: 'clamp(36px, 7vw, 44px)',
                color: 'white',
                fontSize: 'clamp(22px, 4.5vw, 26px)',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: '1',
                zIndex: 10,
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.9)';
                e.currentTarget.style.color = '#000';
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0,0,0,0.6)';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.4)';
              }}
            >
              ×
            </button>

            <div style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.03)',
              borderRadius: 'clamp(8px, 2vw, 16px)',
              padding: 'clamp(12px, 2.5vw, 20px)',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: 'calc(88vh - 160px)',
                  width: 'auto',
                  height: 'auto',
                  borderRadius: 'clamp(6px, 1.5vw, 12px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                  objectFit: 'contain'
                }}
              />
            </div>

            <div style={{
              color: 'white',
              textAlign: 'center',
              width: '100%',
              maxWidth: '900px'
            }}>
              <div style={{
                fontSize: 'clamp(11px, 2.2vw, 13px)',
                opacity: 0.8,
                marginBottom: 'clamp(8px, 1.5vw, 12px)',
                fontWeight: '500',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 'clamp(6px, 1.5vw, 12px)',
                padding: '0 clamp(8px, 2vw, 16px)'
              }}>
                <span>{selectedPhoto.category}</span>
                <span style={{ opacity: 0.5 }}>•</span>
                <span>{selectedPhoto.year}</span>
                <span style={{ opacity: 0.5 }}>•</span>
                <span>{selectedPhoto.location}</span>
              </div>
              <p style={{
                fontSize: 'clamp(12px, 2.5vw, 15px)',
                opacity: 0.9,
                lineHeight: '1.6',
                padding: '0 clamp(12px, 3vw, 24px)',
                margin: '0'
              }}>
                {selectedPhoto.title}
              </p>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default JourneySection;
