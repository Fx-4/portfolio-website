// src/pages/About.jsx
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AboutSection from '../components/AboutSection';
import ScrollFadeOverlay from '../components/ScrollFadeOverlay';

function About() {
  return (
    <div className="bg-gray-50" style={{ overflowX: 'hidden', width: '100%', maxWidth: '100vw', backgroundColor: 'var(--background)' }}>
      <ScrollFadeOverlay />
      <Navbar />

      <section className="max-w-[1400px] mx-auto px-3 xs:px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24" style={{ textAlign: 'center', overflowX: 'hidden', width: '100%', paddingBottom: 'clamp(40px, 8vw, 80px)' }}>
        {/* About Section */}
        <AboutSection />

        {/* Footer with consistent spacing */}
        <div style={{ paddingTop: 'clamp(40px, 8vw, 60px)' }}>
          <Footer />
        </div>
      </section>
    </div>
  );
}

export default About;