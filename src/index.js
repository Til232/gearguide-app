import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Neu: Import für den Router
import './index.css'; // Must be here
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/gearguide-app"> {/* Neu: Router mit basename für GitHub Pages */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);