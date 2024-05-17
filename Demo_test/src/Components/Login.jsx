import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    navigate('/user/1');
  };

  return (
    <div className='login-container'>
      <form onSubmit={handleLogin}>
        <div className='form-group'>
          <label>Email</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='Email'
            className='input_field'
          />
        </div>
        <div className='form-group'>
          <label>Password</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Password'
            className='input_field'
          />
        </div>
        <button type="submit" className='login_btn'>Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
