
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Set the backend URL from environment variable for all components
if (!process.env.REACT_APP_CODESPACE_URL) {
  // Try to infer from window.location if not set
  const { hostname, protocol } = window.location;
  let url = `${protocol}//${hostname}`;
  if (hostname.includes('-3000')) {
    url = `${protocol}//${hostname.replace('-3000', '-8000')}.app.github.dev`;
  }
  process.env.REACT_APP_CODESPACE_URL = url;
  // eslint-disable-next-line
  console.log('Inferred REACT_APP_CODESPACE_URL:', url);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
