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
  const [scrollState, setScrollState] = useState('top'); // 'top', 'scrolling', 'scrolled'

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

  // Handle scroll with class-based approach
  useEffect(() => {
    let frameId = null;

    const handleScroll = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      frameId = requestAnimationFrame(() => {
        // Try multiple methods to get scroll position
        const scrollY = window.scrollY
          || window.pageYOffset
          || document.documentElement.scrollTop
          || document.body.scrollTop
          || 0;

        if (scrollY === 0) {
          setScrollState('top');
        } else if (scrollY < 100) {
          setScrollState('scrolling');
        } else {
          setScrollState('scrolled');
        }
      });
    };

    // Add scroll listener to window (most reliable)
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
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

  // Build class names
  const navbarClasses = `navbar navbar-${scrollState}`;

  return (
    <header className="navbar-header" style={{ pointerEvents: 'auto', zIndex: 9999 }}>
      <nav className={navbarClasses} style={{ pointerEvents: 'auto' }}>
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
