import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18 import
import './index.css';
import App from './App';

// Create a root.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your app inside the root.
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
