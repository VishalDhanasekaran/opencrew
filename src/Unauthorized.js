import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Unauthorized.css'; // Create a matching CSS file

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="unauthorized-container">
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="terminal-button red"></span>
            <span className="terminal-button yellow"></span>
            <span className="terminal-button green"></span>
          </div>
          <div className="terminal-title">access-denied.sh</div>
        </div>
        <div className="terminal-body">
          <div className="terminal-content">
            <div className="ascii-error">
              <pre>
{`  _____                             _____            _          _ 
 |  ___|                           |  __ \\          (_)        | |
 | |__ _ __ _ __ ___  _ __   ___   | |  | | ___ _ __ _  ___  __| |
 |  __| '__| '__/ _ \\| '_ \\ / _ \\  | |  | |/ _ \\ '__| |/ _ \\/ _\` |
 | |__| |  | | | (_) | | | |  __/  | |__| |  __/ |  | |  __/ (_| |
 \\____/_|  |_|  \\___/|_| |_|\\___|  |_____/ \\___|_|  |_|\\___|\\__,_|`}
              </pre>
            </div>
            <div className="prompt-line">
              <span className="user">user@foss</span>
              <span className="separator">:</span>
              <span className="directory">~</span>
              <span className="command-symbol">$ </span>
              <span className="command-text">sudo access --admin-portal</span>
            </div>
            <div className="command-output">
              <p className="error-text">Error: Permission denied (sudo: unauthorized access)</p>
              <p>You do not have sufficient privileges to access this resource.</p>
              <p>Please contact your system administrator if you believe this is an error.</p>
            </div>
            <div className="login-buttons">
              <button 
                className="btn btn-outline-light terminal-btn" 
                onClick={() => navigate('/home')}
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;