
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// If REACT_APP_CODESPACE_NAME is not set at build time, infer it from window.location
if (!process.env.REACT_APP_CODESPACE_NAME) {
  const { hostname } = window.location;
  // GitHub Codespaces hostname format: <codespace-name>-<port>.app.github.dev
  const match = hostname.match(/^(.+)-3000\.app\.github\.dev$/);
  if (match) {
    process.env.REACT_APP_CODESPACE_NAME = match[1];
    // eslint-disable-next-line
    console.log('Inferred REACT_APP_CODESPACE_NAME:', match[1]);
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
