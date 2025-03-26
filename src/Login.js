import React from 'react';
import { auth, provider } from './firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import AnimatedBackground from './AnimatedBackground';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);



      // Store the token in localStorage
      const token = await result.user.getIdToken();
      localStorage.setItem('token', token);

      
      navigate('/home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AnimatedBackground />
      <div className="login-container">
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-buttons">
              <span className="terminal-button red"></span>
              <span className="terminal-button yellow"></span>
              <span className="terminal-button green"></span>
            </div>
            <div className="terminal-title">login.sh</div>
          </div>
          <div className="terminal-body">
            <div className="terminal-content">
              <div className="ascii-logo">
                <pre>
{`  ______  _____   _____ _____  
 |  ____||  __ \\ / ____/ ____| 
 | |__   | |  | | (___| (___   
 |  __|  | |  | |\\___ \\\\___ \\  
 | |     | |__| |____) |___) | 
 |_|     |_____/|_____/_____/  `}
                </pre>
              </div>
              <div className="prompt-line">
                <span className="user">user@foss</span>
                <span className="separator">:</span>
                <span className="directory">~</span>
                <span className="command-symbol">$ </span>
                <span className="command-text">auth --login</span>
              </div>
              <div className="command-output">
                <p>Welcome to Free and Open Source Software Authentication System</p>
                <p>Please login to access this terminal</p>
              </div>
              <div className="login-buttons">
                <button 
                  className="btn btn-outline-light terminal-btn" 
                  onClick={handleLogin}
                >
                  <i className="fab fa-google me-2"></i>
                  Sign in with Google
                </button>
              </div>
              <div className="blinking-cursor">_</div>
            </div>
          </div>
        </div>
        <div className="footer text-center mt-3">
          <p>&copy; {new Date().getFullYear()} FOSS-CIT | Developed by: Lithika Rajkumar . Vishal D . Anush M</p>
        </div>
      </div>
    </>
  );
};

export default Login;