// CustomCursor.js

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorDotRef = useRef(null);
  const cursorOutlineRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      cursorDotRef.current.style.left = `${posX}px`;
      cursorDotRef.current.style.top = `${posY}px`;

      cursorOutlineRef.current.style.left = `${posX}px`;
      cursorOutlineRef.current.style.top = `${posY}px`;

      const backgroundColor = getComputedStyle(document.body).backgroundColor;
      const isLightBackground = isLightColor(backgroundColor);

      // Use GSAP to animate cursor outline
      gsap.to(cursorOutlineRef.current, {
        left: `${posX}px`,
        top: `${posY}px`,
        duration: 0.5,
        ease: 'power2.out',
      });

      // Update cursor styles based on background color
      updateCursorStyles(isLightBackground);
    };

    const isLightColor = (color) => {
      const rgb = color.match(/\d+/g);
      const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
      return brightness > 128; // Adjust the threshold as needed
    };

    const updateCursorStyles = (isLightBackground) => {
      const dotColor = isLightBackground ? 'rgb(250, 250, 249)' : 'rgb(14, 14, 12)';
      const outlineColor = isLightBackground
        ? 'rgb(250, 250, 249)'
        : 'rgb(14, 14, 12)';

      gsap.to(cursorDotRef.current, {
        backgroundColor: dotColor,
        duration: 0.5,
        ease: 'power2.out',
      });

      gsap.to(cursorOutlineRef.current, {
        borderColor: outlineColor,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <div ref={cursorDotRef} className="cursor-dot" />
      <div ref={cursorOutlineRef} className="cursor-outline" />
    </>
  );
};

export default CustomCursor;