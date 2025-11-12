import React from 'react';
import PropTypes from 'prop-types';
import { Sparkle, Linkedin, Github, Instagram, Mail, LoaderCircle } from 'lucide-react';
import AnimatedText from './AnimatedText';
import '../styles/ContactSection.css';
import { SOCIAL_LINKS } from '../constants/social';

// Import the profile image properly to ensure it works in React
import profileImg from '../assets/profile/kal.png'; // Adjust path as needed

const SocialIcon = ({ href, icon: Icon, ariaLabel }) => (
  <a 
    target="_blank" 
    rel="noopener noreferrer" 
    href={href}
    aria-label={ariaLabel}
  >
    <Icon className="opacity-container-child" width={20} height={20} />
  </a>
);

SocialIcon.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  ariaLabel: PropTypes.string
};

const FormField = ({
  label,
  id,
  type = "text",
  name,
  isTextarea = false,
  delay = 0,
  placeholder = "",
  disabled = false
}) => (
  <span
    data-aos="fade"
    data-aos-offset="0"
    data-aos-duration="300"
    data-aos-easing="ease-in-out-sine"
    data-aos-delay={delay}
    className="aos-init aos-animate"
  >
    <div className="space-y-2 mb-4">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        htmlFor={`${id}-form-item`}
      >
        {label}
      </label>
      {isTextarea ? (
        <textarea
          className="flex min-h-[100px] w-full rounded-xl border border-bg-600 bg-bg-800 px-3 py-2 text-sm ring-offset-background placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-bg-900 resize-none"
          name={name}
          id={`${id}-form-item`}
          aria-describedby={`${id}-form-item-description`}
          aria-invalid="false"
          placeholder={placeholder}
          disabled={disabled}
        />
      ) : (
        <input
          className="flex h-11 w-full rounded-xl border border-bg-600 bg-bg-800 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-bg-900"
          id={`${id}-form-item`}
          type={type}
          aria-describedby={`${id}-form-item-description`}
          aria-invalid="false"
          defaultValue=""
          name={name}
          placeholder={placeholder}
          disabled={disabled}
        />
      )}
    </div>
  </span>
);

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  isTextarea: PropTypes.bool,
  delay: PropTypes.number,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool
};

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [status, setStatus] = React.useState({ type: '', message: '' });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    try {
      // Check if we're in development mode
      const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      
      if (isDevelopment) {
        // Mock success in development
        console.log('Development mode - Form data:', data);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
        setStatus({ 
          type: 'success', 
          message: '✅ Development mode: Form would be sent in production!' 
        });
        e.target.reset();
        setIsSubmitting(false);
        return;
      }
      
      // Production mode - actual API call
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setStatus({ type: 'success', message: 'Message sent successfully! 🎉' });
        e.target.reset();
      } else {
        setStatus({ type: 'error', message: result.error || 'Failed to send message.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Network error. Please try again.' });
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section className="max-screen">
      <span 
        data-aos="fade" 
        data-aos-offset="0" 
        data-aos-duration="300" 
        data-aos-easing="ease-in-out-sine" 
        data-aos-delay="0" 
        className="aos-init aos-animate"
      >
        <div className="mb-4 flex w-fit items-center gap-2 text-highlight-primary">
          <Sparkle width={18} height={18} />
          <p className="shimmer word-spacing font-clashDisplay text-sm uppercase leading-none text-highlight-primary">
            Connect with me
          </p>
        </div>
      </span>
      
      <span 
        data-aos="fade" 
        data-aos-offset="0" 
        data-aos-duration="300" 
        data-aos-easing="ease-in-out-sine" 
        data-aos-delay="150" 
        className="aos-init aos-animate"
      >
        <h1 role="heading" className="mb-sm w-full md:w-2/3 lg:w-1/2">
          <AnimatedText 
            text="Let's start a project together"
            type="split"
            animateBy="letters"
            duration={0.5}
            delay={0.1}
            direction="bottom"
            staggerChildren={0.05}
          />
        </h1>
      </span>
      
      <div className="flex w-full flex-col gap-10 sm:flex-row sm:gap-8">
        <form className="w-full space-y-4" onSubmit={handleSubmit}>
          <FormField
            label="Full Name"
            id="fullName"
            name="fullName"
            delay={0}
            placeholder="Your name"
            disabled={isSubmitting}
          />

          <FormField
            label="Email"
            id="email"
            name="email"
            type="email"
            delay={150}
            placeholder="your.email@example.com"
            disabled={isSubmitting}
          />

          <FormField
            label="Message"
            id="message"
            name="message"
            isTextarea={true}
            delay={300}
            placeholder="Tell me about your project..."
            disabled={isSubmitting}
          />
          
          {status.message && (
            <div 
              className={`rounded-lg p-3 text-sm ${
                status.type === 'success' 
                  ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                  : 'bg-red-500/10 text-red-500 border border-red-500/20'
              }`}
            >
              {status.message}
            </div>
          )}
          
          <span 
            data-aos="fade" 
            data-aos-offset="0" 
            data-aos-duration="300" 
            data-aos-easing="ease-in-out-sine" 
            data-aos-delay="450" 
            className="aos-init aos-animate"
          >
            <button 
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight-primary focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isSubmitting ? 'Sending...' : 'Submit'}
            </button>
          </span>
        </form>
        
        <div className="h-full w-full rounded-3xl bg-bg-800 p-6 shadow">
          <span 
            data-aos="fade" 
            data-aos-offset="0" 
            data-aos-duration="300" 
            data-aos-easing="ease-in-out-sine" 
            data-aos-delay="0" 
            className="aos-init aos-animate"
          >
          </span>
          
          <span 
            data-aos="fade" 
            data-aos-offset="0" 
            data-aos-duration="300" 
            data-aos-easing="ease-in-out-sine" 
            data-aos-delay="150" 
            className="aos-init aos-animate"
          >
            {/* Fix for image not showing - using imported image or public URL with correct path */}
            <img 
              alt="Haikal Hifzhi Helmy" 
              loading="lazy" 
              width="100" 
              height="100" 
              decoding="async" 
              className="aspect-square overflow-hidden rounded-full border border-bg-600 object-cover p-2" 
              src={profileImg} 
            />
          </span>
          
          <span 
            data-aos="fade" 
            data-aos-offset="0" 
            data-aos-duration="300" 
            data-aos-easing="ease-in-out-sine" 
            data-aos-delay="300" 
            className="aos-init aos-animate"
          >
            <p className="mb-6 mt-4">
              With a deep passion for technology, I focus on transforming complex challenges into practical and impactful solutions. Feel free to reach out if you&apos;d like to collaborate on a project!
            </p>
          </span>
          
          <span 
            data-aos="fade" 
            data-aos-offset="0" 
            data-aos-duration="300" 
            data-aos-easing="ease-in-out-sine" 
            data-aos-delay="450" 
            className="aos-init aos-animate"
          >
            <div className="opacity-container flex items-center justify-start gap-6 text-text-secondary">
              <SocialIcon
                href={SOCIAL_LINKS.linkedin}
                icon={Linkedin}
                ariaLabel="LinkedIn"
              />
              <SocialIcon
                href={SOCIAL_LINKS.github}
                icon={Github}
                ariaLabel="GitHub"
              />
              <SocialIcon
                href={SOCIAL_LINKS.instagram}
                icon={Instagram}
                ariaLabel="Instagram"
              />
              <SocialIcon
                href={`mailto:${SOCIAL_LINKS.email}`}
                icon={Mail}
                ariaLabel="Email"
              />
            </div>
          </span>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;