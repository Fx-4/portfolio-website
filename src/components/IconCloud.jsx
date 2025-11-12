import { useEffect, useMemo, useState } from 'react';
import { Cloud, renderSimpleIcon } from 'react-icon-cloud';
import PropTypes from 'prop-types';

const IconCloud = ({ iconSlugs }) => {
  const [theme, setTheme] = useState('light');
  const [simpleIcons, setSimpleIcons] = useState(null);

  // Load simple-icons dynamically
  useEffect(() => {
    import('simple-icons').then((icons) => {
      setSimpleIcons(icons);
    }).catch((error) => {
      console.error('Failed to load simple-icons:', error);
    });
  }, []);

  useEffect(() => {
    // Detect theme
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    setTheme(isDark ? 'dark' : 'light');

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      setTheme(isDark ? 'dark' : 'light');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  const renderedIcons = useMemo(() => {
    if (!simpleIcons) return [];

    const bgHex = theme === 'dark' ? '#1D3557' : '#F4F4F4';
    const fallbackHex = theme === 'dark' ? '#E9C46A' : '#2A9D8F';

    return iconSlugs.map((slug) => {
      try {
        // Convert slug to proper camelCase (e.g., 'nextdotjs' -> 'siNextdotjs')
        const iconKey = 'si' + slug.charAt(0).toUpperCase() + slug.slice(1);
        const icon = simpleIcons[iconKey];

        if (!icon) {
          console.warn(`Icon not found: ${slug} (${iconKey})`);
          return null;
        }

        return renderSimpleIcon({
          icon,
          bgHex,
          fallbackHex,
          minContrastRatio: 1.2,
          size: 42,
          aProps: {
            href: undefined,
            target: undefined,
            rel: undefined,
            onClick: (e) => e.preventDefault(),
          },
        });
      } catch (error) {
        console.error(`Error rendering icon ${slug}:`, error);
        return null;
      }
    }).filter(Boolean);
  }, [simpleIcons, iconSlugs, theme]);

  // Show loading state while icons are being fetched
  if (!simpleIcons) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        minHeight: '400px',
        color: 'var(--text-muted)',
        fontSize: '1rem'
      }}>
        Loading tech stack...
      </div>
    );
  }

  // Show message if no valid icons
  if (renderedIcons.length === 0) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        minHeight: '400px',
        color: 'var(--text-muted)',
        fontSize: '1rem'
      }}>
        Loading icons...
      </div>
    );
  }

  return (
    <Cloud
      containerProps={{
        style: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          paddingTop: 40,
        },
      }}
      options={{
        reverse: true,
        depth: 1,
        wheelZoom: false,
        imageScale: 2,
        activeCursor: 'default',
        tooltip: 'native',
        initial: [0.1, -0.1],
        clickToFront: 500,
        tooltipDelay: 0,
        outlineColour: '#0000',
        maxSpeed: 0.04,
        minSpeed: 0.02,
      }}
    >
      {renderedIcons}
    </Cloud>
  );
};

IconCloud.propTypes = {
  iconSlugs: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default IconCloud;
