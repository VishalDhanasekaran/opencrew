// StarsAnimation.js - Creates the star background for the Linux/FOSS/Space theme

const createStarsBackground = () => {
    // Use setTimeout to ensure the DOM has been fully rendered
    setTimeout(() => {
      const starsContainer = document.querySelector('.results-page-stars-container');
      
      if (!starsContainer) {
        console.warn('Stars container not found in the DOM');
        return;
      }
      
      // Clear any existing stars
      starsContainer.innerHTML = '';
      
      // Create 50 stars
      for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'results-page-star';
        
        // Random position
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Random size (1-3px)
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random animation duration (85-120s)
        star.style.animationDuration = `${Math.random() * 35 + 85}s`;
        
        // Random animation delay
        star.style.animationDelay = `${Math.random() * 50}s`;
        
        starsContainer.appendChild(star);
      }
      
      // Add some "binary" elements for Linux theme
      for (let i = 0; i < 20; i++) {
        const binary = document.createElement('div');
        binary.className = 'results-page-binary';
        binary.style.position = 'absolute';
        binary.style.color = '#FFD700';
        binary.style.fontSize = '8px';
        binary.style.width = 'auto';
        binary.style.height = 'auto';
        binary.style.background = 'none';
        binary.style.opacity = Math.random() * 0.2 + 0.1;
        binary.textContent = Math.random() > 0.5 ? '1' : '0';
        
        binary.style.left = `${Math.random() * 100}%`;
        binary.style.top = `${Math.random() * 100}%`;
        binary.style.animationDuration = `${Math.random() * 35 + 85}s`;
        binary.style.animationDelay = `${Math.random() * 50}s`;
        
        starsContainer.appendChild(binary);
      }
      
      console.log('Stars animation initialized');
    }, 100); // Short delay to ensure DOM elements are ready
  };
  
  // Remove global event listeners from this module - let React handle it
  export default createStarsBackground;