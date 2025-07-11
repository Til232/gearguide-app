import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import skiBild from './assets/bg.png';  // Dein Bild-Import – stelle sicher, es liegt in src/assets/

const Home = () => {
  console.log('Bild-Pfad:', skiBild);  // Debug: Check Console für Pfad
  return (
    <div>
      <header style={{
        backgroundImage: `url(${skiBild})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        position: 'relative'
      }}>
        <div className="hero-content">
          <h1>Willkommen bei GearGuide!</h1>
          <p>Dein AI-gestützter Helfer, um perfekte Gear-Kits für Hobbys wie Ski, Golf, Hiking und mehr zu finden – ohne stundenlanges Suchen. Lass uns gamified deine Vorlieben abfragen (Farben, Größe, Budget, Häufigkeit) und dir 3 komplette Kits vorschlagen. Unser AI-Bot crawlt im Hintergrund Infos, checkt Verfügbarkeit, Preise und minimiert Versandkosten (z.B. durch Empfehlungen von 3 Items vom selben Händler).</p>
          <Link to="/kits" className="cta-button" onClick={() => console.log('CTA geklickt')}>Starte dein Abenteuer jetzt!</Link>
        </div>
      </header>

      <section className="section">
        <h2>Was kannst du bei GearGuide machen?</h2>
        <div className="features">
          <div className="feature">
            <h3>Entdecke Kits</h3>
            <p>Finde maßgeschneiderte Kits für Ski, Golf, Hiking und andere Hobbys. Unser AI passt sie an deine Bedürfnisse an.</p>
          </div>
          <div className="feature">
            <h3>Zusammenstellen & Bestellen</h3>
            <p>Lass Kits automatisch zusammenstellen und direkt bestellen – mit Fokus auf günstige Versandkosten.</p>
          </div>
          <div className="feature">
            <h3>AI-Bot Magic</h3>
            <p>Der Bot recherchiert im Hintergrund: Farben, Größen, Budget, Verfügbarkeit – und schlägt 3 Optionen vor.</p>
          </div>
        </div>
      </section>

      <footer>
        <p>© 2025 GearGuide. Alle Rechte vorbehalten.</p>
      </footer>
    </div>
  );
};

const Kits = () => (
  <div>
    <h1>Deine Gear-Kits zusammenstellen</h1>
    <p>Hier startet der gamified Prozess: Wähle dein Hobby (Ski, Golf, Hiking), gib Farben, Größe, Budget und Häufigkeit an – unser AI-Bot recherchiert im Background und schlägt 3 volle Kits vor, optimiert für Verfügbarkeit und Versandkosten.</p>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kits" element={<Kits />} />
      </Routes>
    </Router>
  );
}

export default App;  // Das steht jetzt korrekt am Ende, top-level!