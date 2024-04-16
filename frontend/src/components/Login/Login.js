import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Import the CSS file
import loginBG from '../../images/loginBG.png'; // Import the loginBG image file
import loginBG2 from '../../images/daluhenabg.png'; // Import the loginBG image file
import userNameIcon from '../../icons/userName.png'; // Import the username icon
import passwordIcon from '../../icons/password.png'; // Import the password icon

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // State to track login status
  const [usernameIconVisible, setUsernameIconVisible] = useState(true);
  const [passwordIconVisible, setPasswordIconVisible] = useState(true);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setUsernameIconVisible(e.target.value === '');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordIconVisible(e.target.value === '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8070/users/login", {
        username,
        password,
      });
      localStorage.setItem('token', response.data.token);
      setLoginError(''); // Clear any previous login error
      console.log('Login successful:', response.data);
      setLoggedIn(true); // Set login status to true
      window.location.href = '/dashboard'; // Redirect to dashboard after successful login
    } catch (error) {
      setLoggedIn(false); // Set login status to false
      setLoginError(error.response.data.message); // Set login error message
      console.error('Login failed:', error.response.data.message);
    }
  };

  return (
    <div className="dashboard-container-view" style={{  
      backgroundImage: `url(${loginBG2})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '0',
      padding: '0'
    }}>
      {!loggedIn ? (
        <div className="login-container">
          <img src={loginBG} alt="Login Background" className="login-bg" /> {/* Add the image here */}
          <div className="login-content">
            <span className="login-heading">Welcome to Login</span>
            <form className="login-form" onSubmit={handleSubmit}>
            <label className="login-label1">Username:</label>
              <div className="input-container">
                <input 
                  className="login-input" 
                  type="text" 
                  placeholder="Enter the User Name" 
                  value={username} 
                  onChange={handleUsernameChange} 
                />
                {usernameIconVisible && <img src={userNameIcon} alt="Username Icon" className="input-icon" />} {/* Username icon */}
              </div>
              <label className="login-label2">Password:</label>
              <div className="input-container">
                <input 
                  className="login-input" 
                  type="password" 
                  placeholder="Enter the Password" 
                  value={password} 
                  onChange={handlePasswordChange} 
                />
                {passwordIconVisible && <img src={passwordIcon} alt="Password Icon" className="input-icon" />} {/* Password icon */}
              </div>
              <button className="login-button" type="submit">Login</button>
              {loginError && <p className="login-error">{loginError}</p>}
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Login;
