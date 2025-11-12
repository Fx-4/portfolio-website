import { Linkedin, Github, Instagram, Mail } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import 'aos/dist/aos.css';
import AOS from 'aos';
import '../styles/Footer.css';
import { SOCIAL_LINKS } from '../constants/social';

// Enhanced SplitText component with CSS animation (no dependencies)
const SplitText = ({
  text = '',
  className = '',
  delay = 50,
  textAlign = 'center',
  onLetterAnimationComplete,
}) => {
  const words = text.split(' ').map(word => word.split(''));
  const letters = words.flat();
  const [inView, setInView] = useState(false);
  const ref = useRef();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.2, rootMargin: '-50px' }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let totalLetters = letters.length;
    let animationEndHandler = (e) => {
      // Check if the animation is for the last letter
      if (e.target.dataset.index === (totalLetters - 1).toString()) {
        if (onLetterAnimationComplete) {
          onLetterAnimationComplete();
        }
      }
    };

    const spans = document.querySelectorAll('.split-letter');
    spans.forEach(span => {
      span.addEventListener('animationend', animationEndHandler);
    });

    return () => {
      spans.forEach(span => {
        span.removeEventListener('animationend', animationEndHandler);
      });
    };
  }, [inView, letters.length, onLetterAnimationComplete]);
  
  return (
    <p
      ref={ref}
      className={`split-parent ${className}`}
      style={{ textAlign, overflow: 'hidden', display: 'inline', whiteSpace: 'normal', wordWrap: 'break-word' }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.map((letter, letterIndex) => {
            const index = words
              .slice(0, wordIndex)
              .reduce((acc, w) => acc + w.length, 0) + letterIndex;
            return (
              <span
                key={index}
                data-index={index}
                className={`split-letter ${inView ? 'animate' : ''}`}
                style={{
                  display: 'inline-block',
                  willChange: 'transform, opacity',
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 30px, 0)',
                  transition: `opacity 500ms ease, transform 500ms ease`,
                  transitionDelay: `${index * delay}ms`,
                }}
              >
                {letter}
              </span>
            );
          })}
          <span style={{ display: 'inline-block', width: '0.3em' }}>&nbsp;</span>
        </span>
      ))}
    </p>
  );
};

SplitText.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  delay: PropTypes.number,
  textAlign: PropTypes.string,
  onLetterAnimationComplete: PropTypes.func
};

const SocialLink = ({ href, icon: Icon, label }) => (
  <a 
    aria-label={label}
    target="_blank"
    rel="noopener noreferrer"
    href={href}
    className="social-link-custom"
  >
    <Icon className="opacity-container-child" width={20} height={20} />
  </a>
);

SocialLink.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired
};

const Footer = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  
  useEffect(() => {
    AOS.init();
  }, []);

  const handleAnimationComplete = () => {
    setAnimationComplete(true);
  };

  return (
    <footer className="max-screen z-10 space-y-6 py-sm">
      <div className="flex-center flex-col rounded-3xl bg-bg-800 px-4 py-14 shadow footer-container">
        <div className="m-auto mb-6 max-w-screen-sm text-center">
          <h2 role="heading" className="heading-text">
            <SplitText 
              text="Let's build something amazing." 
              delay={50}
              textAlign="center"
              className="heading-text"
              onLetterAnimationComplete={handleAnimationComplete}
            />
          </h2>
        </div>
        
        <a
          id="footer-cta-button"
          className="button"
          href="/contact"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '14px 32px',
            fontSize: '1rem',
            fontWeight: 600,
            color: '#ffffff',
            background: 'linear-gradient(135deg, #2A9D8F, #26908A)',
            backgroundColor: '#2A9D8F',
            borderRadius: '12px',
            border: '1px solid rgba(42, 157, 143, 0.6)',
            boxShadow: '0 4px 20px rgba(42, 157, 143, 0.35)',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            opacity: 1
          }}
        >
          Get In Touch
        </a>
      </div>
      
      <div className="footer-bottom-section">
        <div className="footer-content-wrapper">
          <span 
            data-aos="fade" 
            data-aos-offset="0" 
            data-aos-duration="300"
            data-aos-easing="ease-in-out-sine" 
            data-aos-delay="0" 
            data-aos-once="false" 
            className="aos-init aos-animate copyright-wrapper"
          >
            <p className="copyright-text">© {new Date().getFullYear()} Haikal Hifzhi Helmy. All rights reserved.</p>
          </span>
          
          <div className="social-links-container">
            <span data-aos="fade" data-aos-offset="0" data-aos-duration="300" data-aos-easing="ease-in-out-sine" data-aos-delay="0" data-aos-once="false" className="aos-init aos-animate social-item">
              <SocialLink href={SOCIAL_LINKS.linkedin} icon={Linkedin} label="LinkedIn" />
            </span>
            <span data-aos="fade" data-aos-offset="0" data-aos-duration="300" data-aos-easing="ease-in-out-sine" data-aos-delay="150" data-aos-once="false" className="aos-init aos-animate social-item">
              <SocialLink href={SOCIAL_LINKS.github} icon={Github} label="GitHub" />
            </span>
            <span data-aos="fade" data-aos-offset="0" data-aos-duration="300" data-aos-easing="ease-in-out-sine" data-aos-delay="300" data-aos-once="false" className="aos-init aos-animate social-item">
              <SocialLink href={SOCIAL_LINKS.instagram} icon={Instagram} label="Instagram" />
            </span>
            <span data-aos="fade" data-aos-offset="0" data-aos-duration="300" data-aos-easing="ease-in-out-sine" data-aos-delay="450" data-aos-once="false" className="aos-init aos-animate social-item">
              <SocialLink href={`mailto:${SOCIAL_LINKS.email}`} icon={Mail} label="Gmail" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;