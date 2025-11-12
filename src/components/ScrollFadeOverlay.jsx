import '../styles/ScrollFadeOverlay.css';

const ScrollFadeOverlay = () => {
  return (
    <>
      {/* Top gradient - content fades when scrolling down */}
      <div className="scroll-fade-overlay scroll-fade-top" aria-hidden="true"></div>

      {/* Bottom gradient - content fades when scrolling up */}
      <div className="scroll-fade-overlay scroll-fade-bottom" aria-hidden="true"></div>
    </>
  );
};

export default ScrollFadeOverlay;
