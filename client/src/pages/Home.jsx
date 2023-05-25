import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MyNavbar from '../components/Navbar';
import axios from 'axios';
import TokenContext from '../components/TokenContext.js';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState('');
  const userID = localStorage.getItem('userID'); 
  const token = useContext(TokenContext); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!userID) {
          navigate('/'); 
          return;
        }

        const response = await axios.get(`http://localhost:3001/auth/user/${userID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { name } = response.data;
        setName(name);
      } catch (error) {
        console.error(error);
        navigate('/home');
      }
    };

    fetchUserData();
  }, [navigate, userID, token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    navigate('/');
  };

  return (
    <div>
      <MyNavbar
        heading={`Hi ${name}`}
        buttonRoute="/"
        buttonLabel="Logout"
        onButtonClick={handleLogout}
      />
      <h1>Welcome to the Home Page</h1>
    </div>
  );
};

export default Home;
