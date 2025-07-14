import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGolfBall, FaHiking, FaSkiing, FaSnowboarding, FaRobot, FaArrowRight } from 'react-icons/fa';
import heroImage from './assets/golf-hero.jpg'; // Use your image from src/assets/ or replace with Unsplash

const Home = () => {
  const [selectedHobby, setSelectedHobby] = useState('Golf'); // Default hobby

  const hobbies = [
    { name: 'Golf', icon: <FaGolfBall className="text-5xl text-green-500" /> },
    { name: 'Hiking', icon: <FaHiking className="text-5xl text-green-500" /> },
    { name: 'Ski', icon: <FaSkiing className="text-5xl text-green-500" /> },
    { name: 'Snowboard', icon: <FaSnowboarding className="text-5xl text-green-500" /> },
  ];

  const steps = [
    { title: 'Wähle dein Hobby', description: `Starte mit ${selectedHobby} – dein Einstieg ins Abenteuer. (Adapts to hobby: e.g., for Hiking, focus on trails.)` },
    { title: 'Farben wählen', description: 'Welche Farben passen zu deinem Style? Rot, Blau oder Grün? (Adapts: Golf clubs in color.)' },
    { title: 'Größe angeben', description: 'Deine Maße für perfekte Passform – S, M, L? (Adapts: Ski boots sizing.)' },
    { title: 'Budget setzen', description: 'Wie viel willst du ausgeben? Von €100 bis €500. (Adapts: Affordable Hiking packs.)' },
    { title: 'Häufigkeit einschätzen', description: 'Wie oft machst du\'s? Wöchentlich oder monatlich? (Adapts: Durable gear for frequent use.)' }, // Fixed: Escaped apostroph in "du\'s"
    { title: 'Skill Level', description: 'Anfänger oder Pro? Wir passen die Empfehlungen an. (Adapts: Beginner Snowboard kits.)' },
    { title: 'Zusätzliche Vorlieben', description: 'Marken, Materialien oder Extras – mach\'s persönlich. (Adapts: Waterproof for Hiking.)' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden" style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'cover' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
        <div className="relative z-10 max-w-4xl px-8">
          <h1 className="text-6xl font-bold mb-6">GearGuide: AI-Powered Gear Finder for Golf, Hiking, Ski & Snowboard</h1>
          <p className="text-2xl mb-10">No more hours of research – our AI bots curate 3 perfect kits based on your gamified preferences: colors, size, budget, frequency, and more.</p>
          <Link to="/kits" className="bg-green-500 text-white px-10 py-5 rounded-full font-bold hover:bg-green-600 transition transform hover:scale-105">Start Your Adventure</Link>
        </div>
      </header>

      {/* 4 Hobbies Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-5xl font-bold text-center mb-16 text-gray-800">Choose Your Hobby</h2>
          <div className="grid md:grid-cols-4 gap-12">
            {hobbies.map((hobby) => (
              <div
                key={hobby.name}
                onClick={() => setSelectedHobby(hobby.name)}
                className={`p-8 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer ${selectedHobby === hobby.name ? 'bg-green-100 border-green-500 border-2' : 'bg-gray-50'}`}
              >
                <div className="text-green-500 mb-6">{hobby.icon}</div>
                <h3 className="text-2xl font-bold text-center">{hobby.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 Gamified Steps Section – Adapts to Selected Hobby */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-5xl font-bold text-center mb-16 text-gray-800">Our 7-Step Gamified Process (for {selectedHobby})</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
                <div className="text-green-500 mb-6"><FaArrowRight className="text-4xl" /></div>
                <h3 className="text-2xl font-bold mb-4">Step {index + 1}: {step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Bots Explanation Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center gap-12">
          <FaRobot className="text-8xl text-green-500" />
          <div>
            <h2 className="text-5xl font-bold mb-8 text-gray-800">How Our AI Bots Work in the Background</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-6">
              While you answer the gamified questions, our AI bots crawl shops like Amazon or specialty retailers. They check availability, prices, colors, sizes, and minimize shipping costs (e.g., by recommending 3 items from the same seller).
            </p>
            <p className="text-xl text-gray-600 leading-relaxed">
              At the end, we suggest 3 full {selectedHobby} kits – e.g., driver, gloves, shoes for Golf – perfectly matched to your preferences.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 text-center">
        <p className="text-3xl font-bold mb-4">GearGuide – Your Smart Gear Finder</p>
        <div className="flex justify-center gap-8 mb-6">
          <Link to="/about" className="text-lg hover:text-green-400 transition">About Us</Link>
          <Link to="/kits" className="text-lg hover:text-green-400 transition">Start Now</Link>
        </div>
        <p className="text-sm">© 2025 GearGuide. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;