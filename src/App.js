import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home'; // Your Home component
import Golf from './Golf'; // Your Golf component

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page */}
        <Route path="/golf" element={<Golf />} /> {/* Specific Golf page */}
        {/* No /kits anymore – add routes for other hobbies later, e.g., <Route path="/hiking" element={<Hiking />} /> */}
      </Routes>
    </div>
  );
}

export default App;