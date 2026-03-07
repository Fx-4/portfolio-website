import { useEffect, useRef, useState, useCallback } from 'react';
import '../styles/CustomCursor.css';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState('default');
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const animRef = useRef(null);
  const isTouch = useRef(false);

  const lerp = (a, b, t) => a + (b - a) * t;

  const animate = useCallback(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Snap dot to exact mouse position
    dot.style.transform = `translate(${mousePos.current.x - 4}px, ${mousePos.current.y - 4}px)`;

    // Ring lazily follows
    ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.1);
    ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.1);
    const rw = ring.offsetWidth / 2;
    ring.style.transform = `translate(${ringPos.current.x - rw}px, ${ringPos.current.y - rw}px)`;

    animRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Skip on touch-only devices
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      isTouch.current = true;
      return;
    }

    animRef.current = requestAnimationFrame(animate);

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const onMouseOver = (e) => {
      const el = e.target;
      if (el.closest('.focus-card, .pm-image-panel')) {
        setCursorType('view');
      } else if (el.closest('a, button, [role="button"], .cta-gradient-btn, .focus-card-cta, label[for], input, select, textarea')) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(animRef.current);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [animate]);

  if (isTouch.current) return null;

  return (
    <div
      className={`cc-wrap${isVisible ? ' cc-visible' : ''} cc-${cursorType}`}
      aria-hidden="true"
    >
      <div ref={dotRef} className="cc-dot" />
      <div ref={ringRef} className="cc-ring">
        {cursorType === 'view' && (
          <span className="cc-label">VIEW</span>
        )}
      </div>
    </div>
  );
};

export default CustomCursor;
