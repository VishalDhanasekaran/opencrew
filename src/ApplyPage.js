import React, { useState, useEffect } from 'react';
import './ApplyPage.css';

const ApplicationPage = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Generate stars
    const starCount = 100;
    const newStars = Array.from({ length: starCount }).map((_, index) => ({
      id: index,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 3}px`,
      animationDelay: `${Math.random() * 5}s`
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="application-container">
      <div className="starry-background">
        {stars.map(star => (
          <div 
            key={star.id} 
            className="star" 
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDelay: star.animationDelay
            }}
          />
        ))}
      </div>
      <div className="linux-terminal-effect">
        <div className="application-card">
          <div className="application-header">
            <h1>FOSS-CIT Club Applications</h1>
          </div>
          <div className="application-content">
            <div className="recruitment-status">
              <p>
                <span className="terminal-cursor">_</span> 
                we are currently not recruiting
              </p>
            </div>
            <div className="application-message">
              <p>
                <span className="terminal-icon">🐧</span> 
                Check back later for future opportunities
              </p>
              <p>
                <span className="terminal-icon">🚀</span> 
                Follow our social media for updates
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationPage;