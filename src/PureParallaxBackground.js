// PureParallaxBackground.js
import React, { useEffect, useState } from 'react';
import './PureParallaxBackground.css';

const PureParallaxBackground = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="parallax-container">
      {/* Deep space background - slowest moving */}
      <div 
        className="parallax-layer deep-space"
        style={{ transform: `translateY(${scrollPosition * 0.1}px)` }}
      ></div>
      
      {/* Nebula layer - medium movement */}
      <div 
        className="parallax-layer nebula"
        style={{ transform: `translateY(${scrollPosition * 0.25}px)` }}
      ></div>
      
      {/* Stars layer - faster movement */}
      <div 
        className="parallax-layer stars"
        style={{ transform: `translateY(${scrollPosition * 0.4}px)` }}
      >
        {/* Generate multiple star dots with CSS */}
        {Array.from({ length: 50 }).map((_, index) => (
          <div 
            key={index}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
      
      {/* Closest bright stars - fastest movement */}
      <div 
        className="parallax-layer bright-stars"
        style={{ transform: `translateY(${scrollPosition * 0.6}px)` }}
      >
        {Array.from({ length: 20 }).map((_, index) => (
          <div 
            key={index}
            className="bright-star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 2}px`,
              height: `${Math.random() * 3 + 2}px`,
              animationDelay: `${Math.random() * 7}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default PureParallaxBackground;