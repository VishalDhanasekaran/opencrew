import React from 'react';
import './Home.css'; // Assuming your CSS is in this file

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="foss-home-footer container-fluid py-4 mt-5">
      <div className="foss-home-footer-bottom text-center">
        <p className="foss-home-footer-copyright mb-0">
          <span className="foss-home-terminal-prompt">$ echo </span> 
          <span className="foss-copyright-text">
            "Together, we build the future of Open Source | FOSS Club of CIT © {currentYear} | Developed by: Lithika Rajkumar . Vishal D . Anush M"
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;