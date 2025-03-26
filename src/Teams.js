import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import './Teams.css';
import createStarsBackground from './StarsAnimation';
import Footer from './Footer';
import { FaHome, FaUsers, FaArrowLeft, FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Teams = () => {
  // Hardcoded teams data
  const teamsData = [
    {
      id: "Joint Secretary",
      name: "Development Team",
      description: "Responsible for building and maintaining open-source applications and tools. Our developers work with various technologies including React, Node.js, and Python to create impactful solutions for the campus community.",
      projects: ["FOSS Club Website", "Campus Navigation App", "Student Resource Hub"]
    },
    {
      id: "design-team",
      name: "Design Team",
      description: "Our creative minds who work on visual elements, user experience, and overall aesthetics of all FOSS projects. The team ensures that our applications are not only functional but also intuitive and visually appealing.",
      projects: ["FOSS Brand Identity", "UI Component Library", "UX Research"]
    },
    {
      id: "research-team",
      name: "Research Team",
      description: "Dedicated to exploring new technologies, evaluating tools, and conducting studies on open-source trends. This team helps guide our technical decisions and ensures we stay at the cutting edge of technology.",
      projects: ["Blockchain Study", "AI Ethics Research", "Open Source Survey"]
    },
    {
      id: "events-team",
      name: "Events Team",
      description: "Plans and executes workshops, hackathons, and awareness programs. The events team bridges the gap between technical knowledge and practical implementation through engaging community activities.",
      projects: ["Annual Hackathon", "Monthly Workshops", "Tech Talks Series"]
    }
  ];

  const [activeTeam, setActiveTeam] = useState(teamsData[0].id);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [candidates, setCandidates] = useState([]);

  // Rest of the code remains the same...


  // Fetch candidates from Firestore
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const candidatesCollection = collection(db, 'candidates');
        const snapshot = await getDocs(candidatesCollection);
        const candidatesList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCandidates(candidatesList);
      } catch (err) {
        console.error('Error fetching candidates:', err);
        setError('Failed to load team members. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  // Initialize stars animation after component renders
  useEffect(() => {
    if (!loading) {
      createStarsBackground();
    }
  }, [loading]);

  const ContentWrapper = ({ children }) => (
    <div className="teams-page-container">
      <div className="teams-page-background"></div>
      <div className="teams-page-stars-container"></div>
      
      {/* Header */}
      <header className="foss-home-header">
        <div className="foss-home-title">
          <span className="foss-home-title-prefix">~/FOSS-CIT/teams</span>
        </div>
        <div className="foss-home-nav">
          <ul className="foss-home-nav-list">
            <li className="foss-home-nav-item">
              <Link to="/home" className="foss-home-nav-link">
                <FaHome className="foss-home-nav-icon" /> Home
              </Link>
            </li>
            <li className="foss-home-nav-item">
              <Link to="/results" className="foss-home-nav-link">
                <FaUsers className="foss-home-nav-icon" /> Results
              </Link>
            </li>
            <li className="foss-home-nav-item">
              <Link to="/results" className="foss-home-nav-link">
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
        <div className="teams-page-loading-container">
          <div className="teams-page-loading-spinner"></div>
          <div className="teams-page-loading-text">Loading teams data</div>
        </div>
      </ContentWrapper>
    );
  }

  if (error) {
    return (
      <ContentWrapper>
        <div className="teams-page-content">
          <h1 className="teams-page-title">Our Teams</h1>
          <div className="teams-page-error-container">
            {error}
          </div>
        </div>
      </ContentWrapper>
    );
  }

  return (
    <ContentWrapper>
      <div className="teams-page-content">
        <h1 className="teams-page-title">Our Teams</h1>
        
        <div className="teams-page-intro">
          <p>The FOSS Club is organized into specialized teams, each contributing unique skills to our open-source mission. Together, we create innovative solutions and promote open-source culture on campus.</p>
        </div>
        
        <div className="teams-page-navigation">
          {teamsData.map(team => (
            <button 
              key={team.id}
              className={`teams-page-nav-button ${activeTeam === team.id ? 'active' : ''}`}
              onClick={() => setActiveTeam(team.id)}
            >
              {team.name}
            </button>
          ))}
        </div>
        
        {teamsData.map(team => (
          <div 
            key={team.id} 
            className={`teams-page-team-section ${activeTeam === team.id ? 'active' : ''}`}
          >
            <div className="teams-page-team-info">
              <h2 className="teams-page-team-name">{team.name}</h2>
              <p className="teams-page-team-description">{team.description}</p>
              
              
            </div>
            
            <h3 className="teams-page-members-title">Our Members</h3>
            
            {candidates.length === 0 ? (
              <div className="teams-page-empty-container">
                <p className="teams-page-empty-text">No team members found.</p>
              </div>
            ) : (
              <div className="teams-page-members-grid">
                {candidates.map((member) => (
                  <div key={member.id} className="teams-page-member-card">
                    <div className="teams-page-member-photo-container">
                      {member.photo ? (
                        <img 
                          src={member.photo} 
                          alt={member.name}
                          className="teams-page-member-photo"
                        />
                      ) : (
                        <div className="teams-page-member-photo-placeholder">
                          No image
                        </div>
                      )}
                    </div>
                    
                    <h4 className="teams-page-member-name">{member.name}</h4>
                    <p className="teams-page-member-role">{member.role}</p>
                    <p className="teams-page-member-department">{member.department || 'Department not specified'}</p>
                    <p className="teams-page-member-year">
                      {member.yearOfStudy ? `Year ${member.yearOfStudy}` : 'Year not specified'}
                    </p>
                    
                    <div className="teams-page-member-socials">
                      {member.github && (
                        <a href={member.github} target="_blank" rel="noopener noreferrer" className="teams-page-social-link">
                          <FaGithub className="teams-page-social-icon" />
                        </a>
                      )}
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="teams-page-social-link">
                          <FaLinkedin className="teams-page-social-icon" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </ContentWrapper>
  );
};

export default Teams;