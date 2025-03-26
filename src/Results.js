import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase'; // Make sure this path matches your project structure
import './Results.css'; // Import the CSS file
import createStarsBackground from './StarsAnimation'; // Import the animation
import Footer from './Footer';

// New imports for icons if needed
import { FaHome, FaUsers, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Assuming you're using React Router

const Results = () => {
  const [candidates, setCandidates] = useState([]);
  const [roleOrder, setRoleOrder] = useState([]); // Store the order of roles as they appear
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const candidatesCollection = collection(db, 'candidates');
        const snapshot = await getDocs(candidatesCollection);
        const candidatesList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          order: doc.data().order || 0 // Ensure order is set
        }));
        // Sort candidates by order field
        candidatesList.sort((a, b) => a.order - b.order);
        setCandidates(candidatesList);
        
        // Extract roles in order of appearance and remove duplicates
        const roles = candidatesList.map(candidate => candidate.role);
        const uniqueRoles = [...new Set(roles)]; // This preserves the order of first occurrence
        setRoleOrder(uniqueRoles);
      } catch (err) {
        console.error('Error fetching candidates:', err);
        setError('Failed to load candidates. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  // Initialize stars animation after component renders and when loading state changes
  useEffect(() => {
    // Only initialize stars when component is fully rendered and not in loading state
    if (!loading) {
      createStarsBackground();
    }
  }, [loading]);

  // Group candidates by role for organized display
  const groupedCandidates = candidates.reduce((acc, candidate) => {
    if (!acc[candidate.role]) {
      acc[candidate.role] = [];
    }
    acc[candidate.role].push(candidate);
    return acc;
  }, {});

  // Content wrapper to include header and footer
  const ContentWrapper = ({ children }) => (
    <div className="results-page-container">
      <div className="results-page-background"></div>
      <div className="results-page-stars-container"></div>
      
      {/* Header */}
      <header className="foss-home-header">
        <div className="foss-home-title">
          <span className="foss-home-title-prefix">~/FOSS-CIT/</span>
         
        </div>
        <div className="foss-home-nav">
          <ul className="foss-home-nav-list">
            <li className="foss-home-nav-item">
              <Link to="/home" className="foss-home-nav-link">
                <FaHome className="foss-home-nav-icon" /> Home
              </Link>
            </li>
            <li className="foss-home-nav-item">
              <Link to="/teams" className="foss-home-nav-link">
                <FaUsers className="foss-home-nav-icon" /> Our Teams
              </Link>
            </li>
            <li className="foss-home-nav-item">
              <Link to="/home" className="foss-home-nav-link">
                <FaArrowLeft className="foss-home-nav-icon" /> Back
              </Link>
            </li>
          </ul>
        </div>
      </header>
      
      {/* Main Content */}
      {children}
      
      {/* Footer */}
      <Footer />
    </div>
  );

  if (loading) {
    return (
      <ContentWrapper>
        <div className="results-page-loading-container">
          <div className="results-page-loading-spinner"></div>
          <div className="results-page-loading-text">Loading candidates</div>
        </div>
      </ContentWrapper>
    );
  }

  if (error) {
    return (
      <ContentWrapper>
        <div className="results-page-content">
          <h1 className="results-page-title">Recruitment Results</h1>
          <div className="results-page-error-container">
            {error}
          </div>
        </div>
      </ContentWrapper>
    );
  }

  if (candidates.length === 0) {
    return (
      <ContentWrapper>
        <div className="results-page-content">
          <h1 className="results-page-title">Recruitment Results</h1>
          <div className="results-page-empty-container">
            <p className="results-page-empty-text">No candidates have been added yet.</p>
          </div>
          <div className="results-page-info-section">
            <h3>Looking to Join?</h3>
            <p>Applications for the next recruitment drive will open soon. Check back for updates!</p>
            <Link to="/apply" className="foss-home-apply-button">Register Interest</Link>
          </div>
        </div>
      </ContentWrapper>
    );
  }

  return (
    <ContentWrapper>
      <div className="results-page-content">
        <h1 className="results-page-title">Recruitment Results</h1>
        
        <div className="results-page-intro">
          <p>Congratulations to all the new members who have joined the FOSS Club! We're excited to welcome this talented group to our community.</p>
        </div>
        
        {/* Render roles in order of their first appearance */}
        {roleOrder.map((role) => (
          <div 
            key={role} 
            className={`results-page-role-section ${
              groupedCandidates[role].length >= 4 ? 'full-width-section' : ''
            }`}
          >
            <h2 className="results-page-role-title">{role}</h2>
            
            <div 
              className={`results-page-candidates-grid ${
                groupedCandidates[role].length === 1 
                  ? 'single-candidate' 
                  : groupedCandidates[role].length === 3 
                    ? 'three-cards' 
                    : groupedCandidates[role].length === 4
                      ? 'four-cards'
                      : ''
              }`}
            >
              {groupedCandidates[role].map((candidate) => (
                <div key={candidate.id} className="results-page-candidate-card">
                  <div className="results-page-candidate-photo-container">
                    {candidate.photo ? (
                      <img 
                        src={candidate.photo} 
                        alt={candidate.name}
                        className="results-page-candidate-photo"
                      />
                    ) : (
                      <div className="results-page-candidate-photo-placeholder">
                        No image
                      </div>
                    )}
                  </div>
                  
                  <h3 className="results-page-candidate-name">{candidate.name}</h3>
                  <p className="results-page-candidate-department">{candidate.department}</p>
                  <p className="results-page-candidate-year">Year {candidate.yearOfStudy}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ContentWrapper>
  );
};

export default Results;