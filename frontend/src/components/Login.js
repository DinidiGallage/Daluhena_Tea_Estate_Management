import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Import the CSS file

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // State to track login status

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
    <div>
      {!loggedIn ? (
        <div className="login-container">
          <h2 className="login-heading">Login</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <div>
              <label className="login-label">Username:</label>
              <input className="login-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
              <label className="login-label">Password:</label>
              <input className="login-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="login-button" type="submit">Login</button>
            {loginError && <p className="login-error">{loginError}</p>}
          </form>
        </div>
      ) : null}
    </div>
  );
}

export default Login;