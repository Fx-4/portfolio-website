import { Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/Navbar.css';

const NavItem = ({ to = "/", children = "", isActive = false }) => (
  <li className="nav-item" style={{ pointerEvents: 'auto' }}>
    <Link className={`nav-link ${isActive ? 'active-link' : ''}`} to={to} style={{ pointerEvents: 'auto', cursor: 'pointer' }}>
      <span className="link-content" style={{ pointerEvents: 'auto' }}>
        <div className="text-default">{children}</div>
        <div className="text-hover">{children}</div>
      </span>
    </Link>
  </li>
);

NavItem.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
  isActive: PropTypes.bool
};

const Navbar = () => {
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 to 1 untuk smooth transition

  const updateTheme = (dark) => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  };

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setIsDark(initialTheme === 'dark');
    updateTheme(initialTheme === 'dark');
  }, []);

  // Reset scroll state when route changes
  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
    setScrollProgress(0);
  }, [location.pathname]);

  // Handle scroll with smooth progressive approach
  useEffect(() => {
    const handleScroll = () => {
      // Get scroll position from multiple sources
      const scrollY = Math.max(
        window.scrollY,
        window.pageYOffset,
        document.documentElement.scrollTop,
        document.body.scrollTop,
        0
      );

      // Calculate progress: 0 at top, 1 at 300px scroll
      // Smooth transition dari 0-300px
      const maxScroll = 300;
      const progress = Math.min(scrollY / maxScroll, 1);
      
      setScrollProgress(progress);
    };

    // Add multiple scroll listeners for better compatibility
    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    document.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    
    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll, { capture: true });
      document.removeEventListener('scroll', handleScroll, { capture: true });
    };
  }, []);

  // System theme change
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setIsDark(e.matches);
        updateTheme(e.matches);
      }
    };
    mediaQuery.addEventListener('change', handleThemeChange);
    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, []);

  const handleToggleTheme = () => {
    // Simple smooth color morph - no fancy effects
    setIsDark(prev => {
      const next = !prev;
      updateTheme(next);
      return next;
    });

    // Icon animation
    setAnimating(false);
    requestAnimationFrame(() => setAnimating(true));
  };

  // Calculate dynamic width based on scroll progress
  // Desktop: 80% -> 40% (shrink 40%)
  // Mobile: 95% -> 90% (shrink 5%)
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const startWidth = isMobile ? 95 : 80;
  const endWidth = isMobile ? 90 : 40;
  const currentWidth = startWidth - (startWidth - endWidth) * scrollProgress;

  // Calculate opacity and blur based on scroll - start hampir transparan
  const startOpacity = 0.15; // Sedikit lebih tinggi untuk dark theme
  const endOpacity = 0.85; // Solid saat scroll
  const currentOpacity = startOpacity + (endOpacity - startOpacity) * scrollProgress;

  const startBlur = 15; // Blur tipis di awal
  const endBlur = 40; // Blur kuat saat scroll
  const currentBlur = startBlur + (endBlur - startBlur) * scrollProgress;

  // Shadow muncul bertahap dari 0
  const currentShadow = scrollProgress > 0.05 
    ? `0 8px 32px 0 rgba(0, 0, 0, ${scrollProgress * 0.3})`
    : 'none';

  // Dynamic navbar style dengan warna yang match background
  const navbarStyle = {
    pointerEvents: 'auto',
    width: `${currentWidth}%`,
    background: isDark 
      ? `linear-gradient(135deg, rgba(29, 53, 87, ${currentOpacity}), rgba(35, 65, 103, ${currentOpacity * 0.9}))`
      : `linear-gradient(135deg, rgba(244, 244, 244, ${currentOpacity}), rgba(255, 255, 255, ${currentOpacity * 0.85}))`,
    backdropFilter: `blur(${currentBlur}px) saturate(${150 + scrollProgress * 100}%)`,
    WebkitBackdropFilter: `blur(${currentBlur}px) saturate(${150 + scrollProgress * 100}%)`,
    boxShadow: currentShadow,
    border: 'none',
  };

  return (
    <header className="navbar-header" style={{ pointerEvents: 'auto', zIndex: 9999 }}>
      <nav className="navbar" style={navbarStyle}>
        <Link className="navbar-brand" to="/">
          F-4
        </Link>

        <ul className="nav-links">
          <NavItem to="/" isActive={location.pathname === '/'}>Home</NavItem>
          <NavItem to="/about" isActive={location.pathname === '/about'}>About</NavItem>
          <NavItem to="/projects" isActive={location.pathname === '/projects'}>Projects</NavItem>
          <NavItem to="/contact" isActive={location.pathname === '/contact'}>Contact</NavItem>
        </ul>

        <button
          aria-label="Toggle Theme"
          type="button"
          className="theme-toggle-button"
          onClick={handleToggleTheme}
        >
          <div
            className={`theme-toggle-icon ${animating ? 'animate' : ''}`}
            onAnimationEnd={() => setAnimating(false)}
          >
            {isDark ? <Moon size={16} /> : <Sun size={16} />}
          </div>
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
