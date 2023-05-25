import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import TokenContext from './components/TokenContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <TokenContext.Provider value={localStorage.getItem('token')}>
    <App />
  </TokenContext.Provider>
</React.StrictMode>
);

