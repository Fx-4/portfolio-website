import { useEffect } from 'react';

const SmoothScroll = () => {
  useEffect(() => {
    let isScrolling = false;
    let scrollTarget = window.scrollY || document.body.scrollTop;
    let currentScroll = scrollTarget;

    const smoothScrollStep = () => {
      if (!isScrolling) return;

      const difference = scrollTarget - currentScroll;
      const speed = 0.1; // Adjust this value: lower = smoother but slower (0.05-0.2)

      if (Math.abs(difference) < 0.5) {
        currentScroll = scrollTarget;
        isScrolling = false;
      } else {
        currentScroll += difference * speed;
        window.scrollTo(0, currentScroll);
        requestAnimationFrame(smoothScrollStep);
      }
    };

    const handleWheel = (e) => {
      e.preventDefault();

      // Adjust scroll speed based on wheel delta
      const delta = e.deltaY * 0.8; // Multiply by factor to control speed
      scrollTarget = Math.max(0, scrollTarget + delta);

      if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(smoothScrollStep);
      }
    };

    // Add wheel listener with passive: false to allow preventDefault
    document.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return null;
};

export default SmoothScroll;
