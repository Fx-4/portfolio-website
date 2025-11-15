import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import ShinyText from '../components/ShinyText';
import SkillsCarousel from '../components/SkillsCarousel';
import { FocusCards } from '../components/focus-cards';
import Footer from '../components/Footer';
import ScrollVelocity from '../components/ScrollVelocity';
import ScrollFadeOverlay from '../components/ScrollFadeOverlay';
import { focusCardsData } from '../utils/imageData';
import ProfileCard from '../components/Profilecard';
import EnhancedAboutText from '../components/EnhancedAboutText';
import '../styles/cta.css';
import '../styles/AboutSection.css';

function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulasi loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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
      <section className="max-w-[1400px] mx-auto px-4 xs:px-6 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-28 py-6 sm:py-8 md:py-12 lg:py-16" style={{ textAlign: 'center', overflowX: 'hidden', width: '100%', paddingBottom: 'clamp(60px, 12vw, 95px)' }}>
        <ShinyText text="</> About Me" />

        {/* About Section - 3 Column Layout: Profile (Left) | Gap (Center) | Text (Right) */}
        <div className="about-section-wrapper">
          <div className="about-section-container">
            {/* Profile Card - Left Column */}
            {/* Try: 'default', 'badge', 'split', 'floating', 'pill', 'icon-grid' */}
            <div className="about-profile-column">
              <ProfileCard compact={true} compactStyle="split" />
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
        {/* Tampilkan hanya 3 proyek pada beranda */}
        <FocusCards cards={focusCardsData.slice(0, 3)} />
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