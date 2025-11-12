// src/pages/About.jsx
import Navbar from '../components/Navbar';

import Footer from '../components/Footer';
import AboutSection from '../components/AboutSection';
import ScrollFadeOverlay from '../components/ScrollFadeOverlay';

function About() {
  return (
    <div className="bg-gray-50" style={{ overflowX: 'hidden', width: '100%', maxWidth: '100vw' }}>
      <ScrollFadeOverlay />
      <Navbar />

      <section className="max-w-[1400px] mx-auto px-4 xs:px-6 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-28 py-6 sm:py-8 md:py-12 lg:py-16" style={{ textAlign: 'center', overflowX: 'hidden', width: '100%', paddingBottom: 'clamp(60px, 12vw, 95px)' }}>
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