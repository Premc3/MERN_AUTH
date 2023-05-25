import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyNavbar from '../components/Navbar';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        email,
        password,
      });
  
      const { userID, message } = response.data;
      localStorage.setItem('userID', userID); 
  
      if (message !== 'Username or password is incorrect') {
        navigate('/home', { state: { userID } }); 
      } else {
        setErrorMessage(message);
      }
    } catch (error) {
      console.error(error);
  
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };
  return (
    <div>
  <MyNavbar heading="Don't have an Account?" buttonRoute="/signup" buttonLabel="Signup" />
  <div className="container" style={{ marginTop: '5%', width: '50%' }}>
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card mt-5">
          <div className="card-body" style={{ height: '40vh' ,width:'90%', marginLeft:'5%'}}>
            <h3 className="card-title text-center">Login</h3>
            <br />
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form onSubmit={handleLogin}>
              <div className="form-group mb-4">
                <label htmlFor="email" style={{ marginBottom: '15px' }}>Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="password" style={{ marginBottom: '10px' }}>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  
  );
};

export default Login;
