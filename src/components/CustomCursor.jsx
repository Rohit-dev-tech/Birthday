import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  // Raw mouse coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics config for smooth deceleration and target snapping
  const springConfig = { damping: 30, stiffness: 350, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (isHidden) setIsHidden(false);
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const handleHoverStart = () => setIsHovered(true);
    const handleHoverEnd = () => setIsHovered(false);

    // Scan the DOM for hoverable elements
    const updateHoverables = () => {
      const hoverables = document.querySelectorAll('a, button, [role="button"], .hover-glow-card, .clickable');
      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', handleHoverStart);
        el.addEventListener('mouseleave', handleHoverEnd);
      });
    };

    updateHoverables();

    // Observe document changes to bind to elements loaded later
    const observer = new MutationObserver(updateHoverables);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      observer.disconnect();
    };
  }, [cursorX, cursorY, isHidden]);

  if (isHidden) return null;

  return (
    <>
      {/* Outer Smooth Glow Circle */}
      <motion.div
        className="custom-cursor hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          width: isHovered ? 64 : 28,
          height: isHovered ? 64 : 28,
          backgroundColor: isHovered ? 'rgba(255, 143, 163, 0.15)' : 'transparent',
          borderColor: isHovered ? '#ff8fa3' : 'rgba(255, 143, 163, 0.45)',
          boxShadow: isHovered ? '0 0 20px rgba(255, 143, 163, 0.4)' : 'none',
          mixBlendMode: 'screen',
        }}
      />
      {/* Inner Dot with quicker spring */}
      <motion.div
        className="custom-cursor-dot hidden lg:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          scale: isHovered ? 1.5 : 1,
          backgroundColor: isHovered ? '#ff8fa3' : '#c084fc',
          boxShadow: isHovered ? '0 0 10px #ff8fa3' : '0 0 5px rgba(192, 132, 252, 0.8)',
        }}
      />
    </>
  );
};

export default CustomCursor;
