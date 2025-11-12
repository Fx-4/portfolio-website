import { Hand, ArrowUpRight, Github, Linkedin, Instagram, Mail, Paintbrush } from 'lucide-react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import 'aos/dist/aos.css';
import AOS from 'aos';
import '../styles/Header.css';
import RotatingText from '../components/RotatingText';
import '../styles/RotatingText.css';
import { SOCIAL_LINKS } from '../constants/social';

const SocialLink = ({ href, icon: Icon, label }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="social-link"
    aria-label={label}
  >
    <span className="social-link-content">
      <Icon className="social-icon" size={18} />
      {label}
      <span className="social-underline"></span>
    </span>
    <ArrowUpRight className="arrow-icon" size={16} />
  </a>
);

const Button = ({ href, children }) => (
  <a href={href} className="cta-button">
    <span className="button-content">
      {children}
      <ArrowUpRight className="arrow-icon" size={16} />
    </span>
    <span className="button-background"></span>
  </a>
);

Button.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

const Header = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section className="header-section" id="home"> 
      <div data-aos="fade" data-aos-duration="300" className="header-content">
        <p className="greeting">
          <span className="wave-container">
            <Hand className="wave-icon" size={24} />
          </span>
          Hey! I&apos;m Haikal
        </p>

        <h1 className="main-title">
          <div className="title-line">Crafting</div>
          <div className="title-line">
            <RotatingText 
              words={[
                'exceptional code',
                'beautiful designs',
                'purposeful flow',
                'innovative minds'
              ]} 
              className="highlight" 
            />
          </div>
          <div className="title-line">with wisdom & innovation.</div>
        </h1>

        <div className="description-container">
          <div className="description-wrapper">
            <div className="divider"></div>
            <p className="description-text">
              With a deep passion for technology, I focus on transforming complex challenges into practical and impactful solutions. By blending fundamental principles with the latest innovations, I strive to develop software that is both efficient and forward-thinking.
            </p>
          </div>
        </div>

        <div className="action-container">
          <Button href="/about">
            Discover My Work
          </Button>

          <nav className="social-links">
            <SocialLink
              href={SOCIAL_LINKS.github}
              icon={Github}
              label="GITHUB"
            />
            <SocialLink
              href={SOCIAL_LINKS.linkedin}
              icon={Linkedin}
              label="LINKEDIN"
            />
            <SocialLink
              href={SOCIAL_LINKS.instagram}
              icon={Instagram}
              label="INSTAGRAM"
            />
            <SocialLink
              href="https://behance.net/yourusername"
              icon={Paintbrush}
              label="BEHANCE"
            />
            <SocialLink
              href={`mailto:${SOCIAL_LINKS.email}`}
              icon={Mail}
              label="EMAIL"
            />
          </nav>
        </div>
      </div>
    </section>
  );
};

SocialLink.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired
};

export default Header;