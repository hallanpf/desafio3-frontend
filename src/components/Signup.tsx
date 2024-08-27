import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const role = 'client';
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/users', { name, email, password, role });
      toast.success('Registration successful!');
      navigate('/products');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Registration failed');
    }
  };

  return (
    <div className='auth-content'>
      <div className='left'>
        <form onSubmit={handleSubmit}>
          <h2>Get Started Now</h2>
          <p>Enter your Credentials to access your account</p>
          <label htmlFor="name">Name</label>
          <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' required />
          <label htmlFor="email">Email address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <label htmlFor="password">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <p><input type='checkbox' name='agree' value='agree' /> I agree to the terms & policy</p>
          <p><button type="submit">Signup</button></p>
          <p>Have an accout? <Link to="/signin">Sign In</Link></p>
        </form>
      </div>
      <div className='right'>
        ...
      </div>
    </div>
  );
}

export default Signup;
