import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import gsap from 'gsap';
import './CardSwap.css';

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div ref={ref} {...rest} className={`cs-card ${customClass ?? ''} ${rest.className ?? ''}`.trim()} />
));
Card.displayName = 'Card';
Card.propTypes = {
  customClass: PropTypes.string,
};

const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true,
  });

const CardSwap = forwardRef(({
  width = 440,
  height = 320,
  cardDistance = 55,
  verticalDistance = 60,
  delay = 4000,
  pauseOnHover = true,
  onCardClick,
  onActiveChange,
  skewAmount = 5,
  easing = 'elastic',
  children,
}, ref) => {
  const config =
    easing === 'elastic'
      ? { ease: 'elastic.out(0.6,0.9)', durDrop: 2, durMove: 2, durReturn: 2, promoteOverlap: 0.9, returnDelay: 0.05 }
      : { ease: 'power1.inOut', durDrop: 0.8, durMove: 0.8, durReturn: 0.8, promoteOverlap: 0.45, returnDelay: 0.2 };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const refs = useMemo(() => childArr.map(() => React.createRef()), [childArr.length]);
  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = useRef(null);
  const intervalRef = useRef();
  const container = useRef(null);
  const onActiveChangeRef = useRef(onActiveChange);
  const swapFnRef = useRef(null);
  const goToFnRef = useRef(null);

  useEffect(() => { onActiveChangeRef.current = onActiveChange; }, [onActiveChange]);

  useImperativeHandle(ref, () => ({
    swap: () => swapFnRef.current?.(),
    goTo: (idx) => goToFnRef.current?.(idx),
  }));

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));
    onActiveChangeRef.current?.(order.current[0]);

    const swap = () => {
      if (order.current.length < 2) return;
      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, { y: '+=500', duration: config.durDrop, ease: config.ease });
      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);

      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(el, { x: slot.x, y: slot.y, z: slot.z, duration: config.durMove, ease: config.ease }, `promote+=${i * 0.15}`);
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      tl.call(() => { gsap.set(elFront, { zIndex: backSlot.zIndex }); }, undefined, 'return');
      tl.to(elFront, { x: backSlot.x, y: backSlot.y, z: backSlot.z, duration: config.durReturn, ease: config.ease }, 'return');
      tl.call(() => {
        order.current = [...rest, front];
        onActiveChangeRef.current?.(order.current[0]);
      });
    };

    const goTo = (targetIdx) => {
      const pos = order.current.indexOf(targetIdx);
      if (pos === 0) return;

      tlRef.current?.kill();
      clearInterval(intervalRef.current);

      const elTarget = refs[targetIdx].current;

      // Build sequential rest: targetIdx+1, targetIdx+2, ... (wraps around)
      // This keeps auto-swap going left-to-right after goTo instead of jumping
      const sequentialRest = [];
      for (let i = 1; i < total; i++) {
        sequentialRest.push((targetIdx + i) % total);
      }
      const newOrder = [targetIdx, ...sequentialRest];

      const tl = gsap.timeline();
      tlRef.current = tl;

      // ── Phase 1 (t=0): other cards animate to sequential slots ──
      sequentialRest.forEach((cardIdx, i) => {
        const el = refs[cardIdx].current;
        const newSlot = makeSlot(i + 1, cardDistance, verticalDistance, total);
        tl.set(el, { zIndex: newSlot.zIndex }, 0);
        tl.to(el, {
          x: newSlot.x, y: newSlot.y, z: newSlot.z,
          duration: 0.6,
          ease: 'power2.inOut',
        }, 0);
      });

      // ── Phase 2 (t=0): target card rises UP out of the deck ──
      tl.to(elTarget, {
        y: '-=280',
        z: '+=100',
        duration: 0.42,
        ease: 'power2.out',
      }, 0);

      // ── Phase 3: target sweeps to front position and lands ──
      tl.set(elTarget, { zIndex: total }, 0.35);
      tl.to(elTarget, {
        x: 0, y: 0, z: 0,
        duration: 0.48,
        ease: 'power2.inOut',
      }, 0.38);

      tl.call(() => {
        order.current = newOrder;           // sequential from targetIdx onward
        onActiveChangeRef.current?.(targetIdx);
        intervalRef.current = window.setInterval(swap, delay);
      });
    };

    swapFnRef.current = swap;
    goToFnRef.current = goTo;

    swap();
    intervalRef.current = window.setInterval(swap, delay);

    if (pauseOnHover) {
      const node = container.current;
      const pause = () => { tlRef.current?.pause(); clearInterval(intervalRef.current); };
      const resume = () => {
        tlRef.current?.play();
        clearInterval(intervalRef.current);
        intervalRef.current = window.setInterval(swap, delay);
      };
      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);
      return () => {
        node.removeEventListener('mouseenter', pause);
        node.removeEventListener('mouseleave', resume);
        clearInterval(intervalRef.current);
      };
    }
    return () => clearInterval(intervalRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: e => { child.props.onClick?.(e); onCardClick?.(i); },
        })
      : child
  );

  return (
    <div ref={container} className="cs-container" style={{ width, height }}>
      {rendered}
    </div>
  );
});

CardSwap.displayName = 'CardSwap';

CardSwap.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  cardDistance: PropTypes.number,
  verticalDistance: PropTypes.number,
  delay: PropTypes.number,
  pauseOnHover: PropTypes.bool,
  onCardClick: PropTypes.func,
  onActiveChange: PropTypes.func,
  skewAmount: PropTypes.number,
  easing: PropTypes.oneOf(['elastic', 'power1']),
  children: PropTypes.node,
};

export default CardSwap;
