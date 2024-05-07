import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeliveryDisplayPage from './DeliveryHistory';

function LoginPage() {
    const [factoryName, setFactoryName] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        axios.post('http://localhost:8070/delivery/login', { factory_name: factoryName, factory_password: password })
            .then(response => {
                console.log(response.data.message);
                setLoggedIn(true);
                navigate('/pm-DeliveryHistory', { state: { factoryName } });

                // Consider adding navigation to a new page on successful login
                // navigate('/path-to-redirect');
            })
            .catch(error => {
                console.error('Login error:', error.response ? error.response.data.message : 'Error');
                setError(error.response ? error.response.data.message : 'An error occurred');
            });
    };

    if (loggedIn) {
        return <DeliveryDisplayPage factoryName={factoryName} />;
    }

    return (
        <div className="pm-login-container">
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input type="text" placeholder="Factory Name" value={factoryName} onChange={(e) => setFactoryName(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default LoginPage;
