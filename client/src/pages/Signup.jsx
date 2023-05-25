import React, { useState } from 'react';
import axios from 'axios';
import MyNavbar from '../components/Navbar';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3001/auth/register', {
        name,
        email,
        password
      });
  
      if (response && response.data) {
        setResponseMessage(response.data.message);
        setErrorMessage('');
        setName('');
        setEmail('');
        setPassword('');
      } else {
        setErrorMessage('An error occurred.');
        setResponseMessage('');
      }
    } catch (error) {
      console.error(error.response.data);
      setErrorMessage(error.response.data.message || 'An error occurred.');
      setResponseMessage('');
    }
  };

  const isEmailValid = (value) => {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
    return emailRegex.test(value);
  };

  return (
    <div>
      <MyNavbar heading="Already have an account?" buttonRoute="/" buttonLabel="Login" />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>  
      <div style={{ border: "1px solid", marginTop: "5%", width: '30%', display: 'flex', justifyContent: 'center' ,height:'45vh', borderRadius:'25px'}}>
        <div className='CardBody' style={{ width: '80%',margin:'10px'}}>
          <h3>Sign-UP</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-2">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ width: '100%' }}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder={isEmailValid(email) ? '' : 'Enter your email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: '100%' }}
              />
              <small className="form-text text-muted">
                Please enter a valid email address.
              </small>
            </div>
            <div className="form-group mb-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%' }}
              />
            </div>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            {responseMessage && <div className="alert alert-success">{responseMessage}</div>}
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>

    </div>
    
  
  );
};

export default Signup;
