import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Home from './pages/Home.jsx';


const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  const PrivateRoute = ({ element, path }) => {
    return isAuthenticated ? element : <Navigate to="/" />;
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        </Routes>
      </Router>
      
      
    </div>
  );
};

export default App;