import { useState, useEffect, useCallback, useRef } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import ShinyText from '../components/ShinyText';
import SkillsCarousel from '../components/SkillsCarousel';
import Footer from '../components/Footer';
import ScrollVelocity from '../components/ScrollVelocity';
import ScrollFadeOverlay from '../components/ScrollFadeOverlay';
import { focusCardsData } from '../utils/imageData';
import ProfileCard from '../components/Profilecard';
import EnhancedAboutText from '../components/EnhancedAboutText';
import CardSwap, { Card } from '../components/CardSwap';
import '../styles/cta.css';
import '../styles/AboutSection.css';

const CARD_COUNT = 5;

const getCardSize = (w) => {
  // dist must satisfy: w/2 + (CARD_COUNT-1)*dist + cardWidth/2 <= w
  // → dist <= w / (2*(CARD_COUNT-1)) keeps back cards on screen
  if (w <= 320) return { width: 210, height: 158, dist: 12, vDist: 18 };
  if (w <= 375) return { width: 240, height: 180, dist: 14, vDist: 20 };
  if (w <= 430) return { width: 260, height: 195, dist: 16, vDist: 22 };
  if (w <= 768) return { width: 300, height: 225, dist: 28, vDist: 32 };
  if (w <= 1024) return { width: 360, height: 270, dist: 42, vDist: 44 };
  return { width: 420, height: 300, dist: 52, vDist: 52 };
};

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [cardSize, setCardSize] = useState(() => getCardSize(window.innerWidth));
  const [activeCard, setActiveCard] = useState(0);
  const cardSwapRef = useRef(null);
  const handleActiveChange = useCallback((i) => setActiveCard(i), []);
  const handlePrev = useCallback(() => {
    cardSwapRef.current?.goTo((activeCard - 1 + CARD_COUNT) % CARD_COUNT);
  }, [activeCard]);
  const handleNext = useCallback(() => {
    cardSwapRef.current?.goTo((activeCard + 1) % CARD_COUNT);
  }, [activeCard]);

  useEffect(() => {
    // Simulasi loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const handleResize = () => setCardSize(getCardSize(window.innerWidth));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-gray-50 home-container" style={{ overflowX: 'hidden', width: '100%', maxWidth: '100vw', backgroundColor: 'var(--background)' }}>
      <style>{`
        /* Add padding top for mobile only */
        @media (max-width: 768px) {
          .home-container {
            padding-top: 30px;
          }
        }
        
        @media (max-width: 430px) {
          .home-container {
            padding-top: 15px;
          }
        }

        @media (max-width: 320px) {
          .home-container {
            padding-top: 10px;
          }
        }
      `}</style>
      <Loading
        isLoading={isLoading}
        pingEndpoint="/api/ping"
        pingInterval={2000}
        initialSpeed={500}
      />
      <ScrollFadeOverlay />
      <Navbar />

      <Header />

      <SkillsCarousel
        skills={["Framer Motion", "Figma", "Tailwind CSS",
          "GIT","Docker","MySQL","HTML", "CSS",
          "JavaScript","React", "Next.js", "TypeScript",
          "Python","Java","Adobe Illustrator","Canva",
          "Nagios","phpMyAdmin","React.js",
          "PostgreSQL"
        ]} 
        speed={0.8} 
        className="my-custom-carousel" 
      />

      {/* Hero Text Animation */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-28 py-6 sm:py-8 md:py-12 lg:py-16" style={{ textAlign: 'center', overflowX: 'hidden', width: '100%', paddingTop: 'clamp(80px, 12vw, 120px)', paddingBottom: 'clamp(60px, 12vw, 95px)' }}>
        <ShinyText text="</> About Me" />

        {/* About Section - 3 Column Layout: Profile (Left) | Gap (Center) | Text (Right) */}
        <div className="about-section-wrapper">
          <div className="about-section-container">
            {/* Profile Card - Left Column */}
            {/* Try: 'default', 'badge', 'split', 'floating', 'pill', 'icon-grid' */}
            <div className="about-profile-column">
              <ProfileCard compact={true} compactStyle="split" location="China" />
            </div>

            {/* Gap - Center Column (Empty space) */}
            <div className="about-gap-column"></div>

            {/* About Text - Right Column */}
            <div className="about-text-column">
              <EnhancedAboutText
                baseOpacity={0.18}
                enableBlur={true}
                blurStrength={2}
                className="text-[0.9375rem] sm:text-[1rem] md:text-[1.0625rem] lg:text-[1.125rem]"
              />
            </div>
          </div>
        </div>
        <div className="My Project" style={{ paddingTop: 'clamp(60px, 15vw, 130px)', paddingBottom: 'clamp(24px, 5vw, 40px)' }}>
          <ShinyText text="</> My Project" />
        </div>
        {/* CardSwap — featured projects */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          {/* Stack area: arrows flank the card on desktop, hidden on mobile */}
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

            {/* Prev arrow — desktop only */}
            <button
              onClick={handlePrev}
              aria-label="Previous project"
              className="cs-nav-btn cs-nav-prev"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Card stack wrapper */}
            <div style={{ position: 'relative' }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                height: `${cardSize.height + Math.round(cardSize.vDist * 3) + 30}px`,
                paddingBottom: '16px',
              }}>
                <CardSwap
                  ref={cardSwapRef}
                  width={cardSize.width}
                  height={cardSize.height}
                  cardDistance={cardSize.dist}
                  verticalDistance={cardSize.vDist}
                  delay={3500}
                  pauseOnHover
                  skewAmount={4}
                  easing="elastic"
                  onActiveChange={handleActiveChange}
                >
                  {focusCardsData.slice(0, CARD_COUNT).map((project, i) => (
                    <Card
                      key={i}
                      onClick={() => project.demoUrl
                        ? window.open(project.demoUrl, '_blank')
                        : project.githubUrl
                          ? window.open(project.githubUrl, '_blank')
                          : null}
                      style={{ cursor: project.demoUrl || project.githubUrl ? 'pointer' : 'default' }}
                    >
                      <img
                        src={project.src}
                        alt={project.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '16px' }}
                      />
                      <div style={{
                        position: 'absolute',
                        bottom: 0, left: 0, right: 0,
                        padding: '0.875rem 1rem',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)',
                        borderRadius: '0 0 16px 16px',
                      }}>
                        <p style={{ margin: 0, color: '#fff', fontSize: '0.65rem', fontWeight: 500, opacity: 0.75, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{project.category}</p>
                        <p style={{ margin: '2px 0 0', color: '#fff', fontSize: '0.95rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>{project.title}</p>
                      </div>
                    </Card>
                  ))}
                </CardSwap>
              </div>

            </div>

            {/* Next arrow — desktop only */}
            <button
              onClick={handleNext}
              aria-label="Next project"
              className="cs-nav-btn cs-nav-next"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Dots — always visible, clickable */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', paddingTop: '4px', paddingBottom: '8px' }}>
            {focusCardsData.slice(0, CARD_COUNT).map((_, i) => (
              <button
                key={i}
                aria-label={`Go to project ${i + 1}`}
                onClick={() => cardSwapRef.current?.goTo(i)}
                style={{
                  width: activeCard === i ? '22px' : '8px',
                  height: '8px',
                  borderRadius: '999px',
                  background: activeCard === i ? 'var(--brand-primary)' : 'rgba(128,128,128,0.35)',
                  transition: 'width 0.35s cubic-bezier(0.16,1,0.3,1), background 0.35s ease',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
        </div>
        {/* Creative CTA to see more projects (CSS-based, no Tailwind dependency) */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'clamp(1.5rem, 4vw, 2.5rem)', position: 'relative', zIndex: 10 }}>
          <a href="/projects" aria-label="Lihat lebih banyak proyek" className="cta-gradient-btn">
            <span className="shine" aria-hidden="true"></span>
            <span className="inner">
              Lihat lebih lanjut
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </span>
          </a>
        </div>
        {/* /Creative CTA */}
        <section className="max-w-6xl mx-auto px-4" style={{ paddingTop: 'clamp(80px, 20vw, 150px)', paddingBottom: 'clamp(16px, 3vw, 25px)' }}>
          <ScrollVelocity
            texts={[
              "CREATIVE DEVELOPER WEB DEVELOPER",
              "FRONTEND DEVELOPER UI/UX DESIGNER"
            ]}
            className="text-3xl font-bold text-center mb-8"
            numCopies={4}
            velocity={30}
            damping={30}
            stiffness={300}
          />
        </section>

        {/* Footer with consistent spacing */}
        <div style={{ paddingTop: 'clamp(40px, 8vw, 60px)' }}>
          <Footer />
        </div>
      </section>
    </div>
  );
}

export default Home;