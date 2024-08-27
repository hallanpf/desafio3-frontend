import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/signIn', { email, password });
      localStorage.setItem('token', response.data.accessToken);
      toast.success('Login successful!');
      navigate('/checkout');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className='auth-content'>
    <div className='left'>
      <form onSubmit={handleSubmit}>
        <h2>Welcome back!</h2>
        <p>Enter your Credentials to access your account</p>
        <label htmlFor="email">Email address</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <label htmlFor="password">Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <p><button type="submit">Login</button></p>
        <p>Don't have an accout? <Link to="/signup">Sign Up</Link></p>
      </form>
    </div>
    <div className='right'>
      ...
    </div>
    </div>
  );
}

export default Signin;
