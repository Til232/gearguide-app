import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-16 px-4 max-w-6xl mx-auto">
      <h1 className="text-5xl font-bold text-center mb-12">About GearGuide</h1>
      <p className="text-xl text-gray-700 mb-8">
        GearGuide ist dein AI-powered Partner für Golf-Gear. Wir sparen dir Stunden Research, indem wir gamifizierte Fragen stellen und unsere Bots die besten Kits zusammenstellen – passend zu Farben, Größe, Budget und mehr. Fokus auf Golf, bald mehr Hobbys!
      </p>
      <h2 className="text-3xl font-bold mb-4">Unser Team</h2>
      <p className="text-gray-700 mb-8">Ein Team von Enthusiasten und AI-Experten, die Golf lieben und Technologie nutzen, um es einfach zu machen.</p>
      <h2 className="text-3xl font-bold mb-4">Unsere Tech</h2>
      <p className="text-gray-700 mb-8">AI-Bots crawlen Shops, optimieren für Preise und Verfügbarkeit – alles im Background für 3 perfekte Optionen.</p>
      <Link to="/" className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-secondary transition">Zurück zur Homepage</Link>
    </div>
  );
};

export default About;