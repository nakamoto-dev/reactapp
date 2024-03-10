import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './AuthContext';
import 'flowbite';


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => { });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
       <App />
       </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
