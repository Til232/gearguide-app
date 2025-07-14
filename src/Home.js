import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRobot, FaArrowRight } from 'react-icons/fa';

// Neutral hero image: Excitement and adventure emotion (from Unsplash - a person jumping with joy in nature)
const heroImage = 'https://images.unsplash.com/photo-1501555081622-7a546c061434?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80';

// Hobby images (from Unsplash - appear on hover)
const hobbyImages = {
  Golf: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  Hiking: 'https://images.unsplash.com/photo-1551632811-4a82a418b50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  Ski: 'https://images.unsplash.com/photo-1485809052956-5113b0ff51af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  Snowboard: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
};

const Home = () => {
  const [selectedHobby, setSelectedHobby] = useState('Golf');

  const hobbies = [
    { name: 'Golf' },
    { name: 'Hiking' },
    { name: 'Ski' },
    { name: 'Snowboard' },
  ];

  const steps = [
    { title: 'Gamified Setup – Fun and Easy', description: 'Start with a quick, interactive quiz: Choose your hobby (e.g., Golf), colors, size, budget, and frequency. Simple and engaging—no boring forms!' },
    { title: 'AI Agents Do the Heavy Lifting', description: 'Our clever AI agents research thousands of options from shops like Amazon. They match your preferences, check availability, prices, and minimize shipping by grouping items from one seller.' },
    { title: 'Get 3 Personalized Kits', description: 'In seconds, see 3 full, ready-to-buy gear kits tailored to you—complete with descriptions, prices, and order links. E.g., a €180 beginner golf kit with fast shipping!' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 font-sans antialiased">
      {/* Hero Section with Neutral Image */}
      <header className="relative h-screen flex items-center justify-center text-center text-white" style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 max-w-4xl px-4">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">GearGuide: Your AI Smart Gear Finder</h1>
          <p className="text-xl mb-8 drop-shadow-md">Discover the thrill of hobbies like Golf, Hiking, Ski, or Snowboard without the hassle—let AI curate your perfect gear!</p>
          {/* Prominent CTA Button */}
          <Link to="/kits" className="bg-primary text-white px-12 py-6 rounded-full font-bold text-xl hover:bg-secondary transition transform hover:scale-105 shadow-lg hover:shadow-2xl">Start Your Adventure Now</Link>
        </div>
      </header>

      {/* 4 Hobbies Section – Buttons with Hover-Reveal Images */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Choose Your Hobby</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {hobbies.map((hobby) => (
            <button
              key={hobby.name}
              onClick={() => setSelectedHobby(hobby.name)}
              className="relative p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden text-center"
              style={{ backgroundColor: selectedHobby === hobby.name ? '#e6f4ea' : '#f9f9f9' }}
            >
              {/* Background Image - Appears on Hover */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-0 hover:opacity-50 transition-opacity duration-300"
                style={{ backgroundImage: `url(${hobbyImages[hobby.name]})` }}
              ></div>
              <h3 className="relative z-10 text-2xl font-bold">{hobby.name}</h3>
            </button>
          ))}
        </div>
      </section>

      {/* 3 Modern, Sleek Steps Section */}
      <section className="py-16 bg-gray-100 max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">How GearGuide Works for {selectedHobby}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <FaArrowRight className="text-4xl text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-2">Step {index + 1}: {step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI Bots Explanation Section */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our AI Agents in Action</h2>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <FaRobot className="text-6xl text-primary mb-4 md:mb-0" />
          <p className="text-xl text-gray-700">
            While you quiz, our AI bots scan shops like Amazon for {selectedHobby} gear. They optimize for your answers, ensuring the best matches and savings.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 text-center">
        <p className="text-xl font-bold mb-2">GearGuide – Your Smart Gear Finder</p>
        <div className="flex justify-center gap-4">
          <Link to="/about" className="hover:underline">About Us</Link>
          <Link to="/kits" className="hover:underline">Start Now</Link>
        </div>
        <p className="mt-4 text-sm">© 2025 GearGuide. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;