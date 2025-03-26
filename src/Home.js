  import React, { useState, useEffect, useRef } from 'react';
  import { useNavigate } from 'react-router-dom';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import './Home.css';
  import Footer from './Footer'



  // Function to create floating Linux commands
  function createFloatingCommands() {
    const container = document.querySelector('.foss-home-container');
    const commands = [
      'ls -la', 'cd /home', 'grep -r "pattern"', 'sudo apt update', 
      'git commit -m "fix"', 'chmod +x script.sh', 'cat /proc/cpuinfo',
      'systemctl status', 'less /var/log/syslog', 'vim ~/.bashrc',
      'find . -name "*.js"', 'ps aux | grep node', 'make install',
      'ssh user@host', 'df -h', 'ip a'
    ];
    
    for (let i = 0; i < 10; i++) {
      const cmdElement = document.createElement('div');
      cmdElement.className = 'command-float';
      cmdElement.textContent = commands[Math.floor(Math.random() * commands.length)];
      
      // Random properties
      const duration = 10 + Math.random() * 15;
      const delay = Math.random() * 20;
      const position = {
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 80
      };
      
      cmdElement.style.left = `${position.x}%`;
      cmdElement.style.top = `${position.y}%`;
      cmdElement.style.animationDuration = `${duration}s`;
      cmdElement.style.animationDelay = `${delay}s`;
      
      container.appendChild(cmdElement);
    }
  }

  // Function to create terminal particles
  function createTerminalParticles() {
    const particleCount = 30;
    const container = document.querySelector('.foss-home-container');
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'terminal-particle';
      
      // Random properties
      const size = 2 + Math.random() * 8;
      const duration = 20 + Math.random() * 40;
      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * window.innerHeight;
      const moveX = -100 + Math.random() * 200;
      const moveY = -100 + Math.random() * 200;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${startX}px`;
      particle.style.top = `${startY}px`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.setProperty('--x', `${moveX}px`);
      particle.style.setProperty('--y', `${moveY}px`);
      
      container.appendChild(particle);
    }
  }

  // Function to create terminal blips
  function createTerminalBlips() {
    const container = document.querySelector('.foss-home-container');
    
    // Create blips at regular intervals
    const createBlip = () => {
      const blip = document.createElement('div');
      blip.className = 'terminal-blip';
      
      // Random position
      const posX = Math.random() * window.innerWidth;
      const posY = Math.random() * window.innerHeight;
      
      blip.style.left = `${posX}px`;
      blip.style.top = `${posY}px`;
      
      container.appendChild(blip);
      
      // Remove blip after animation completes
      setTimeout(() => {
        blip.remove();
      }, 3000);
    };
    
    // Create initial blips
    for (let i = 0; i < 5; i++) {
      setTimeout(createBlip, i * 300);
    }
    
    // Continue creating blips
    return setInterval(createBlip, 2000);
  }

  // Create cosmic background elements
  function createCosmicBackground() {
    const container = document.querySelector('.foss-home-container');
    const cosmic = document.createElement('div');
    cosmic.className = 'cosmic-background';
    
    // Create stars
    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div');
      star.className = 'cosmic-star';
      
      // Random properties
      const size = 1 + Math.random() * 3;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const duration = 2 + Math.random() * 5;
      const delay = Math.random() * 5;
      
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${posX}%`;
      star.style.top = `${posY}%`;
      star.style.animationDuration = `${duration}s`;
      star.style.animationDelay = `${delay}s`;
      
      cosmic.appendChild(star);
    }
    
    // Create constellations
    for (let i = 0; i < 3; i++) {
      const constellation = document.createElement('div');
      constellation.className = 'constellation';
      
      // Random position
      const posX = 10 + Math.random() * 80;
      const posY = 10 + Math.random() * 80;
      
      constellation.style.left = `${posX}%`;
      constellation.style.top = `${posY}%`;
      
      // Create constellation points and lines
      const pointCount = 3 + Math.floor(Math.random() * 4);
      const points = [];
      
      for (let j = 0; j < pointCount; j++) {
        const point = document.createElement('div');
        point.className = 'constellation-point';
        
        // Position within constellation
        const pointX = 50 + (Math.random() * 40 - 20);
        const pointY = 50 + (Math.random() * 40 - 20);
        
        point.style.left = `${pointX}%`;
        point.style.top = `${pointY}%`;
        point.style.animationDelay = `${Math.random() * 5}s`;
        
        constellation.appendChild(point);
        points.push({ x: pointX, y: pointY });
      }
      
      // Create lines between points
      for (let j = 0; j < points.length - 1; j++) {
        const line = document.createElement('div');
        line.className = 'constellation-line';
        
        // Calculate line position and length
        const x1 = points[j].x;
        const y1 = points[j].y;
        const x2 = points[j + 1].x;
        const y2 = points[j + 1].y;
        
        const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        
        line.style.width = `${length}%`;
        line.style.left = `${x1}%`;
        line.style.top = `${y1}%`;
        line.style.transform = `rotate(${angle}deg)`;
        line.style.animationDelay = `${Math.random() * 8}s`;
        
        constellation.appendChild(line);
      }
      
      cosmic.appendChild(constellation);
    }
    
    // Create shooting stars at random intervals
    const createShootingStar = () => {
      const star = document.createElement('div');
      star.className = 'shooting-star';
      
      // Random position and angle
      const posX = Math.random() * 70;
      const posY = Math.random() * 50;
      const angle = 30 + Math.random() * 30;
      
      star.style.left = `${posX}%`;
      star.style.top = `${posY}%`;
      star.style.transform = `rotate(${angle}deg)`;
      
      cosmic.appendChild(star);
      
      // Remove after animation completes
      setTimeout(() => {
        star.remove();
      }, 3000);
    };
    
    // Create shooting stars at random intervals
    for (let i = 0; i < 3; i++) {
      setTimeout(createShootingStar, 1000 + i * 4000);
    }
    
    setInterval(createShootingStar, 8000);
    
    container.appendChild(cosmic);
  }

  // Create Tux silhouette
  function createTuxSilhouette() {
    const tux = document.createElement('div');
    tux.className = 'tux-silhouette';
    document.querySelector('.foss-home-container').appendChild(tux);
  }

  // Initialize all animations
  function initBackgroundAnimations() {

    createFloatingCommands();
    createTerminalParticles();
    createCosmicBackground();
    createTuxSilhouette();
    return createTerminalBlips(); // Returns interval ID
  }

  const Home = () => {
    const navigate = useNavigate();
    const [showAdminLogin, setShowAdminLogin] = useState(false);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [activeSection, setActiveSection] = useState('about-foss');
    const [terminalText, setTerminalText] = useState('cd /about-foss');
    const [isTyping, setIsTyping] = useState(false);
    const blipIntervalRef = useRef(null);

    const [applyButtonEnabled, setApplyButtonEnabled] = useState(true);


    const [pulseResults, setPulseResults] = useState(true);



    
    // Admin credentials from .env
    const ADMIN_NAME = process.env.REACT_APP_ADMIN_NAME;
    const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD;

    // Adjust content height after section change
    useEffect(() => {
      const activeEl = document.querySelector('.foss-home-section-active');
      const contentEl = document.querySelector('.foss-home-content');
      
      if (activeEl && contentEl) {
        contentEl.style.minHeight = `${activeEl.offsetHeight}px`;
      }


  // Initialize animations only once on component mount
  blipIntervalRef.current = initBackgroundAnimations();
      
  return () => {
    // Clean up animation elements
    clearInterval(blipIntervalRef.current);
    
    const elements = [
      '.matrix-background',
      '.terminal-particle', 
      '.command-float',
      '.cosmic-background',
      '.tux-silhouette',
      '.terminal-blip'
    ];
    
    elements.forEach(selector => {
      const elems = document.querySelectorAll(selector);
      elems.forEach(el => el.remove());
    });
  };
    }, [activeSection]);




      // Add this useEffect to control the pulsing animation
      useEffect(() => {
        const pulseTiming = setInterval(() => {
          setPulseResults(prev => !prev);
        }, 1500); // Toggle the pulse state every 1.5 seconds
        
        return () => clearInterval(pulseTiming);
      }, []);


    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }

      fetch('/home', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }, [navigate]);




    useEffect(() => {
      const fetchApplyButtonStatus = async () => {
        const response = await fetch('/apply-button-status', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        setApplyButtonEnabled(data.enabled);
      };
      fetchApplyButtonStatus();
    }, []);



    const handleAdminLogin = (e) => {
      e.preventDefault();
      
      // Validate admin credentials
      if (name === ADMIN_NAME && password === ADMIN_PASSWORD) {
        setError('');
        setTerminalText('sudo access granted; navigating to admin-portal...');
        setIsTyping(true);
        
        setTimeout(() => {
          navigate('/admin-portal');
        }, 2000);
      } else {
        setError('Permission denied: Invalid credentials');
      }
    };



    const handleResultsNavigation = () => {
      navigate('/results');
    };


  

    const simulateTerminalNavigation = (section) => {
      setIsTyping(true);
      setTerminalText(`cd /${section}`);
      
      setTimeout(() => {
        setActiveSection(section);
        setIsTyping(false);
      }, 800);
    };

    const handleApplyNavigation = () => {
      setIsTyping(true);
      setTerminalText('./run-application.sh');
      
      setTimeout(() => {
        setTerminalText('Launching application portal...');
        
        setTimeout(() => {
          navigate('/apply');
        }, 1000);
      }, 800);
    };



    

    return (
      <div className="foss-home-container">
        <div className="foss-home-header">
          <h1 className="foss-home-title">
            <span className="foss-home-title-prefix">$</span> Welcome to FOSS Club of CIT
          </h1>
          <button 
            className="foss-home-admin-button"
            onClick={() => setShowAdminLogin(prev => !prev)}
          >
            {showAdminLogin ? 'sudo cancel' : 'sudo access'}
          </button>
        </div>

        {showAdminLogin && (
          <div className="foss-home-admin-modal">
            <div className="foss-home-admin-modal-content">
              <h2 className="foss-home-admin-title">
                <span className="foss-home-title-prefix">$</span> sudo authenticate
              </h2>
              <form onSubmit={handleAdminLogin} className="foss-home-admin-form">
                <div className="foss-home-form-group">
                  <label className="foss-home-form-label">username:</label>
                  <input
                    type="text"
                    className="foss-home-form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="foss-home-form-group">
                  <label className="foss-home-form-label">password:</label>
                  <input
                    type="password"
                    className="foss-home-form-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="foss-home-submit-button">
                  Enter
                </button>
              </form>
              {error && <p className="foss-home-error-message">{error}</p>}
            </div>
          </div>
        )}

        <div className="foss-home-terminal">
          <div className="foss-home-terminal-header">
            <span className="foss-home-terminal-button foss-home-terminal-close"></span>
            <span className="foss-home-terminal-button foss-home-terminal-minimize"></span>
            <span className="foss-home-terminal-button foss-home-terminal-maximize"></span>
            <span className="foss-home-terminal-title">user@foss-community:~</span>
          </div>
          <div className="foss-home-terminal-body">
            <div className="foss-home-terminal-line">
              <span className="foss-home-prompt">user@foss-community:~$</span> {terminalText}
              <span className={isTyping ? "foss-home-cursor-blink" : "foss-home-cursor"}></span>
            </div>
          </div>
        </div>

        <nav className="foss-home-nav">
          <ul className="foss-home-nav-list">
            <li className={`foss-home-nav-item ${activeSection === 'about-foss' ? 'foss-home-nav-active' : ''}`}>
              <a 
                href="#about-foss" 
                className="foss-home-nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  simulateTerminalNavigation('about-foss');
                }}
              >
                <span className="foss-home-nav-icon">$</span> about-foss
              </a>
            </li>
            <li className={`foss-home-nav-item ${activeSection === 'why-foss' ? 'foss-home-nav-active' : ''}`}>
              <a 
                href="#why-foss" 
                className="foss-home-nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  simulateTerminalNavigation('why-foss');
                }}
              >
                <span className="foss-home-nav-icon">$</span> why-foss
              </a>
            </li>
            <li className={`foss-home-nav-item ${activeSection === 'teams' ? 'foss-home-nav-active' : ''}`}>
              <a 
                href="#teams" 
                className="foss-home-nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  simulateTerminalNavigation('teams');
                }}
              >
                <span className="foss-home-nav-icon">$</span> teams
              </a>
            </li>
            <li className={`foss-home-nav-item ${activeSection === 'faq' ? 'foss-home-nav-active' : ''}`}>
              <a 
                href="#faq" 
                className="foss-home-nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  simulateTerminalNavigation('faq');
                }}
              >
                <span className="foss-home-nav-icon">$</span> faq
              </a>
            </li>
            <li className="foss-home-nav-item">
              
              <button 
          className="foss-home-apply-button" 
          onClick={handleApplyNavigation}
          disabled={!applyButtonEnabled}
        >
          <span className="foss-home-nav-icon">$</span> ./apply
        </button>
            
            </li>

            <li className="foss-home-nav-item">
              <button 
                className={`foss-home-results-button ${pulseResults ? 'foss-results-highlight' : ''}`}
                onClick={handleResultsNavigation}
              >
                <span className="foss-home-nav-icon">$</span> ./results
                
              </button>
            </li>
          </ul>
        </nav>

        <div className="foss-home-content">
          <section 
            id="about-foss" 
            className={`foss-home-section ${activeSection === 'about-foss' ? 'foss-home-section-active' : ''}`}
          >
            <h2 className="foss-home-section-title">
              <span className="foss-home-section-prefix">#</span> About FOSS
            </h2>
            <div className="foss-home-section-content">
              <p>FOSS-CIT is the open-source community of Coimbatore Institute of Technology, dedicated to exploring and mastering open-source frameworks and tools across various domains of computer technology. We empower students to dive into the world of open source through workshops, bootcamps, tech talks, webinars, and coding competitions, Hackathons,etc .
              </p>
              <p>
              But we don’t just stop at learning—we build. FOSS Club focuses on developing exciting open-source projects and encourages students to contribute to real-world open-source ecosystems, shaping them into skilled developers and innovators. </p>
            </div>
          </section>

          <section 
            id="why-foss" 
            className={`foss-home-section ${activeSection === 'why-foss' ? 'foss-home-section-active' : ''}`}
          >
            <h2 className="foss-home-section-title">
              <span className="foss-home-section-prefix">#</span> Why FOSS
            </h2>
            <div className="foss-home-section-content">
              <p>FOSS-CIT is more than just a club—it's a thriving open-source community where students transform from learners to innovators. Here’s what makes us stand out:
              </p>
              <ul className="foss-home-list">
                <li>Practical Learning – Gain hands-on experience through real-world projects, workshops, and bootcamps.
                </li>
                <li>Technical Excellence – Master industry-relevant open-source tools and frameworks.
                </li>
                <li>Collaborative Growth – Engage with a network of passionate peers and mentors who drive innovation.
                </li>
                <li>Global Contribution – Work on open-source projects that have an impact beyond the classroom.
                </li>
              
              </ul>
            </div>
          </section>

          <section 
            id="teams" 
            className={`foss-home-section ${activeSection === 'teams' ? 'foss-home-section-active' : ''}`}
          >
            <h2 className="foss-home-section-title">
              <span className="foss-home-section-prefix">#</span> Teams in FOSS
              
            </h2>
            <div className="foss-home-section-content">
              <p>Our community is organized into specialized teams:</p>
              <div className="foss-home-teams-grid">
                <div className="foss-home-team-card">
                  <h3>Event Management Team</h3>
                  <p>Plans and executes events, monitors participant attendance, and ensures smooth and fair event proceedings.</p>
                </div>
                <div className="foss-home-team-card">
                  <h3>Outreach Team</h3>
                  <p>Engages with participants, gathers feedback, and manages promotional outreach efforts.</p>
                </div>
                <div className="foss-home-team-card">
                  <h3>Social Media Team</h3>
                  <p>Promotes events through social media platforms and oversees the club's official digital presence.  
                  </p>
                </div>
                <div className="foss-home-team-card">
                  <h3>Content Writing Team</h3>
                  <p>Creates technical articles, blog posts, social media content, registration forms, and other official documentation.  
                  </p>
                </div>

                <div className="foss-home-team-card">
                  <h3>Editing Team</h3>
                  <p>Designs event posters, videos, and brochures using professional design tools.  
    
                  </p>
                </div>

                <div className="foss-home-team-card">
                  <h3>Technical Team</h3>
                  <p>Organizes coding contests and Hackathons, develops problem statements, and actively contributes to the club’s open-source projects.
    
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section 
            id="faq" 
            className={`foss-home-section ${activeSection === 'faq' ? 'foss-home-section-active' : ''}`}
          >
            <h2 className="foss-home-section-title">
              <span className="foss-home-section-prefix">#</span> FAQ
            </h2>
            <div className="foss-home-section-content">
              <div className="foss-home-faq-item">
                <h3>Who can join FOSS-CIT?
                </h3>
                <p>Students from the Computer Science and related departments of Coimbatore Institute of Technology are eligible to join FOSS-CIT.</p>
              </div>
              <div className="foss-home-faq-item">
                <h3>How can I join the FOSS Club of CIT?
                </h3>
                <p>The club's recruitment process begins annually in March or April. Interested candidates can apply through the OpenCrew app of FOSS Club.</p>
              </div>
              <div className="foss-home-faq-item">
                <h3>How can I contact FOSS-CIT?</h3>
                <p>You can contact FOSS-CIT through official social media platforms like linkedin and instagram.</p>
              </div>
            </div>
          </section>
        </div>


        <Footer />
        
      </div>
    );
  };

  export default Home;