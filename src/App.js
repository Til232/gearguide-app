import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Kits from './Kits';
import About from './About';
import './index.css'; // Tailwind

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kits" element={<Kits />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;