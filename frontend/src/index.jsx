import React from 'react';
import ReactDOM from 'react-dom/client';
// FIX: Removed BrowserRouter and AuthProvider imports (they are now in App.jsx)
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // FIX: Removed the wrappers. App.jsx is now self-contained.
  <React.StrictMode>
    <App />
  </React.StrictMode>
);