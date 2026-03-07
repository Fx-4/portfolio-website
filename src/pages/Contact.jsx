// src/pages/Contact.jsx
import Navbar from '../components/Navbar';
import FAQ from '../components/FAQ';
import ContactSection from '../components/ContactSection';
import ScrollFadeOverlay from '../components/ScrollFadeOverlay';
import Footer from '../components/Footer';


function ContactPage() {
    return (
      <div className="min-h-screen" style={{ overflowX: 'hidden', width: '100%', maxWidth: '100vw', backgroundColor: 'var(--background)' }}>
        <ScrollFadeOverlay />
        <Navbar />

        {/* Contact Section with better spacing */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24" style={{ paddingTop: 'clamp(80px, 15vw, 120px)', paddingBottom: 'clamp(60px, 12vw, 95px)' }}>
          <ContactSection profileImage="../assets/profile/kal.JPG"/>
        </section>

        {/* FAQ Section with better spacing */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24" style={{ paddingBottom: 'clamp(60px, 12vw, 95px)', textAlign: 'center' }}>
          <FAQ />

          {/* Footer */}
          <Footer />
        </section>
      </div>
    );
  }

  export default ContactPage;