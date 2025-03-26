import React, { useEffect } from 'react';

const AnimatedBackground = () => {
  useEffect(() => {
    // Create stars
    const starsContainer = document.querySelector('.stars-container');
    const createStars = () => {
      for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = `${Math.random() * 3}px`;
        star.style.height = star.style.width;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDuration = `${Math.random() * 5 + 3}s`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        starsContainer.appendChild(star);
      }
    };

    // Create constellations
    const createConstellations = () => {
      for (let i = 0; i < 3; i++) {
        const constellation = document.createElement('div');
        constellation.className = 'constellation';
        constellation.style.width = `${Math.random() * 200 + 100}px`;
        constellation.style.height = constellation.style.width;
        constellation.style.borderRadius = '50%';
        constellation.style.left = `${Math.random() * 70 + 15}%`;
        constellation.style.top = `${Math.random() * 70 + 15}%`;
        constellation.style.animationDuration = `${Math.random() * 60 + 60}s`;
        constellation.style.transform = `rotate(${Math.random() * 360}deg)`;
        starsContainer.appendChild(constellation);
      }
    };

    // Create Tux mascots
    const createTux = () => {
      for (let i = 0; i < 5; i++) {
        const tux = document.createElement('div');
        tux.className = 'tux';
        tux.style.left = `${Math.random() * 90 + 5}%`;
        tux.style.top = `${Math.random() * 90 + 5}%`;
        tux.style.animationDelay = `${Math.random() * 5}s`;
        starsContainer.appendChild(tux);
      }
    };

    // Create code particles
    const createCodeParticles = () => {
      const codeSnippets = ['</', '{;}', '#!/', '$ _', '0x1', 'sudo', '://'];
      
      setInterval(() => {
        const code = document.createElement('div');
        code.className = 'code-particle';
        code.innerText = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        code.style.left = `${Math.random() * 90 + 5}%`;
        code.style.bottom = '-20px';
        starsContainer.appendChild(code);
        
        setTimeout(() => {
          code.remove();
        }, 8000);
      }, 1000);
    };

    // Create glow circles
    const createGlowCircles = () => {
      for (let i = 0; i < 3; i++) {
        const circle = document.createElement('div');
        circle.className = 'glow-circle';
        const size = Math.random() * 300 + 200;
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;
        circle.style.left = `${Math.random() * 80 + 10}%`;
        circle.style.top = `${Math.random() * 80 + 10}%`;
        circle.style.animationDelay = `${Math.random() * 5}s`;
        starsContainer.appendChild(circle);
      }
    };

    createStars();
    createConstellations();
    createTux();
    createCodeParticles();
    createGlowCircles();

    // Cleanup function
    return () => {
      // Optional: clean up animations if component unmounts
    };
  }, []);

  return <div className="stars-container"></div>;
};

export default AnimatedBackground;