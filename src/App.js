import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Neu: Import für Routes und Route
import Home from './Home'; // Deine Home-Komponente (aus src/Home.js)
import Kits from './Kits'; // Annahme: Deine Kits-Komponente (erstelle sie, falls nicht da)

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Route für die Home-Seite */}
        <Route path="/kits" element={<Kits />} /> {/* Route für /kits (deine Navigate-Ziel) */}
        {/* Füge hier weitere Routes hinzu, falls du mehr hast */}
      </Routes>
    </div>
  );
}

export default App;