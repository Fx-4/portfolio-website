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

  // Auto scroll to top when route changes
  useEffect(() => {
    // Force immediate scroll to top - more reliable
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
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

  // Calculate opacity and blur based on scroll - main opacity untuk efek kaca
  // Dark theme: opacity rendah untuk efek transparan kaca
  const startOpacity = isDark ? 0.1 : 0.15; // Sangat transparan di awal
  const endOpacity = isDark ? 0.75 : 0.85; // Semi-transparan, tidak full solid
  const currentOpacity = startOpacity + (endOpacity - startOpacity) * scrollProgress;

  // Backdrop blur menggunakan CSS variable
  const backdropBlur = scrollProgress > 0.05 ? 12 : 0; // 12px blur saat scroll
  const backdropSaturate = 100;

  // Shadow dengan multiple layers untuk efek glass yang lebih realistis
  const currentShadow = scrollProgress > 0.05 
    ? `0 8px 32px 0 rgba(0, 0, 0, ${scrollProgress * 0.15}), 
       0 4px 6px -1px rgba(0, 0, 0, ${scrollProgress * 0.1}),
       inset 0 1px 1px 0 rgba(255, 255, 255, ${scrollProgress * 0.15}),
       inset 0 -1px 1px 0 rgba(0, 0, 0, ${scrollProgress * 0.1})`
    : 'none';
  
  // Border untuk glass effect - menggunakan bg-700 color
  const glassBorder = scrollProgress > 0.05 
    ? `1px solid ${isDark ? 'rgba(41, 72, 113, 0.6)' : 'rgba(0, 0, 0, 0.05)'}`
    : '1px solid transparent';

  // Dynamic navbar style dengan design system yang lebih sophisticated
  const navbarStyle = {
    pointerEvents: 'auto',
    width: `${currentWidth}%`,
    backgroundColor: isDark 
      ? `rgba(29, 53, 87, ${currentOpacity})`
      : `rgba(244, 244, 244, ${currentOpacity})`,
    backdropFilter: `blur(${backdropBlur}px) saturate(${backdropSaturate}%)`,
    WebkitBackdropFilter: `blur(${backdropBlur}px) saturate(${backdropSaturate}%)`,
    boxShadow: currentShadow,
    border: glassBorder,
    transition: 'none',
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
