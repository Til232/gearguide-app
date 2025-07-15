import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import logo from './assets/logo.png'; // Your logo from src/assets/

// Hero slider images (imported from src/assets/[hobby]/ – matching your screenshot)
import golfHero from './assets/golf/golfhero1.jpg';
import hikingHero from './assets/hiking/hikinghero1.jpg';
import skiHero from './assets/ski/skihero1.jpg';
import snowboardHero from './assets/snowboard/snowboardhero1.jpg';

// Hobby background images (using gear images as background since you don't have separate ones – adjust if added)
import golfGear from './assets/golf/golfgear1.jpg';
import hikingGear from './assets/hiking/hikinggear1.jpg';
import skiGear from './assets/ski/skigear1.jpg';
import snowboardGear from './assets/snowboard/snowboardgear1.jpg';

// Step icons (your PNGs from src/assets/steps/)
import gamification from './assets/steps/gamification.png';
import ai from './assets/steps/ai.png';
import kit from './assets/steps/kit.png';

// Shipping icons (your PNGs from src/assets/steps/)
import versand from './assets/steps/versand.png';
import money from './assets/steps/money.png';

// Partner logos (imported from src/assets/partnerlogos – all files from your screenshot)
import six86Snowboards from './assets/partnerlogos/686_Snowboards.jpg';
import arcteryx from './assets/partnerlogos/Arcteryx.jpg';
import atomic from './assets/partnerlogos/Atomic.png';
import burtonSnowboards from './assets/partnerlogos/Burton_Snowboards.jpg';
import callawayGolf from './assets/partnerlogos/Callaway_Golf.jpg';
import columbiaWandern from './assets/partnerlogos/Columbia_Wandern.jpg';
import k2Skis from './assets/partnerlogos/K2Skis.jpg';
import mammutWandern from './assets/partnerlogos/Mammut_Wandern.jpg';
import meindlWanderschuhe from './assets/partnerlogos/Meindl_Wanderschuhe.png';
import pingGolf from './assets/partnerlogos/Ping_Golf.jpg';
import quicksilverSnowboard from './assets/partnerlogos/Quicksilver_Snowboard.jpg';
import rideSnowboards from './assets/partnerlogos/ride-snowboards.png';
import rossignol from './assets/partnerlogos/Rossignol.png';
import taylormadeGolf from './assets/partnerlogos/Taylormade-Golf.jpg';
import theNorthFaceWandern from './assets/partnerlogos/TheNorthFace_Wandern.jpg';
import titleistGolf from './assets/partnerlogos/titleist-golf.png';

const heroImages = [
  golfHero,
  hikingHero,
  skiHero,
  snowboardHero,
];

const hobbyImages = {
  Golf: golfGear,
  Hiking: hikingGear,
  Ski: skiGear,
  Snowboard: snowboardGear,
};

// Partner logos array for the grid
const partnerLogos = [
  six86Snowboards,
  arcteryx,
  atomic,
  burtonSnowboards,
  callawayGolf,
  columbiaWandern,
  k2Skis,
  mammutWandern,
  meindlWanderschuhe,
  pingGolf,
  quicksilverSnowboard,
  rideSnowboards,
  rossignol,
  taylormadeGolf,
  theNorthFaceWandern,
  titleistGolf,
];

// Preload images to fix loading delays
const preloadImages = (images) => {
  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

const Home = () => {
  const [selectedHobby, setSelectedHobby] = useState('Golf');
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  const navigate = useNavigate(); // For navigating on hobby selection

  useEffect(() => {
    preloadImages([...heroImages, ...partnerLogos]); // Preload hero and partner logos
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const handleHobbySelect = (hobby) => {
    setSelectedHobby(hobby.name);
    if (hobby.name === 'Golf') {
      navigate('/golf');
    } else if (hobby.name === 'Hiking') { 
      navigate('/hiking');
    } else {
      // For other hobbies, show a message or do nothing since no page yet
      alert('Coming soon for ' + hobby.name + '!');
    }
  };

  const hobbies = [
    { name: 'Golf' },
    { name: 'Hiking' },
    { name: 'Ski' },
    { name: 'Snowboard' },
  ];

  const steps = [
    { title: 'Gamified Setup – Fun and Easy', description: 'Quick quiz: Hobby, colors, size, budget, frequency—no boring forms!', icon: gamification },
    { title: 'AI Agents Do the Heavy Lifting', description: 'Bots research shops for matches, availability, prices, and low shipping.', icon: ai },
    { title: 'Get 3 Personalized Kits', description: 'Tailored kits with descriptions and order links—e.g., €180 beginner set.', icon: kit },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 font-sans antialiased">
      {/* Hero Section with Slider */}
      <header className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
        {/* Slider Background */}
        <div className="absolute inset-0 bg-cover bg-center transition-all duration-1000" style={{ backgroundImage: `url(${heroImages[currentHeroIndex]})` }}></div>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        {/* Logo in Top-Left as Home Button */}
        <Link to="/" className="absolute top-4 left-4">
          <img src={logo} alt="GearGuide Logo" className="h-24" /> {/* 50% larger logo */}
        </Link>
        {/* GearGuide Title on Top of Slider */}
        <h1 className="absolute top-20 left-1/2 transform -translate-x-1/2 text-7xl font-bold text-white drop-shadow-lg">GearGuide</h1> {/* Bigger title */}
        <div className="relative z-10 max-w-4xl px-4">
          <p className="text-3xl mb-10 drop-shadow-md">Start your hobby right With our AI Gear Guide</p> {/* Updated text, larger */}
        </div>
        {/* Arrow Down to Encourage Scrolling */}
        <FaChevronDown className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-4xl text-white animate-bounce" />
      </header>

      {/* Hobby Section – Larger and Cooler */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50"> {/* Same background as body to avoid cut-off */}
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Choose Your Hobby</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {hobbies.map((hobby) => (
              <button
                key={hobby.name}
                onClick={() => handleHobbySelect(hobby)}
                className="relative p-8 rounded-lg shadow-md hover:shadow-xl hover:border-green-500 hover:scale-105 transition-all duration-500 ease-in-out overflow-hidden text-center bg-white border-2 border-transparent" // Larger padding, cooler hover (border, scale)
              >
                {/* Background Image - Appears on Hover */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-0 hover:opacity-50 transition-opacity duration-500 ease-in-out"
                  style={{ backgroundImage: `url(${hobbyImages[hobby.name]})` }}
                ></div>
                <h3 className="relative z-10 text-3xl font-bold pointer-events-none">{hobby.name}</h3> {/* Bigger text, pointer-events-none to fix hover bug on text */}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3 Modern, Sleek Steps Section with Gear Images */}
      <section className="py-16 bg-gray-100 max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">How GearGuide Works</h2> {/* Generic header */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex justify-center mb-4">
                <img src={step.icon} alt="Step Icon" className="h-24 w-24" /> {/* Twice as big, centered */}
              </div>
              <h3 className="text-2xl font-bold mb-2 text-center">Step {index + 1}: {step.title}</h3>
              <p className="text-gray-600 text-center">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reworked Shipping Section – Presented as a Process Flow */}
      <section className="py-16 bg-gray-100 max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">And what about shipping?</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-4">
            {/* Payment Stage */}
            <div className="flex flex-col items-center text-center">
              <img src={money} alt="Money Icon" className="h-12 w-12 mb-2" />
              <p className="text-gray-600 font-semibold">You pay us securely first</p>
            </div>
            {/* Arrow for Flow */}
            <span className="text-3xl text-gray-400">→</span>
            {/* Ordering Stage with Logo */}
            <div className="flex flex-col items-center text-center">
              <img src={logo} alt="GearGuide Logo" className="h-12 w-12 mb-2" />
              <p className="text-gray-600 font-semibold">We order from partner stores using your address</p>
            </div>
            {/* Arrow for Flow */}
            <span className="text-3xl text-gray-400">→</span>
            {/* Shipping Stage */}
            <div className="flex flex-col items-center text-center">
              <img src={versand} alt="Shipping Icon" className="h-12 w-12 mb-2" />
              <p className="text-gray-600 font-semibold">They ship directly to you</p>
            </div>
          </div>
          <p className="text-gray-600 text-center mt-4">No matter the stores, we handle the process seamlessly from multiple sources.</p>
        </div>
      </section>

      {/* New Partner Logos Grid Section – At the very bottom, before footer */}
      <section className="py-16 bg-white max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Partners</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"> {/* 1 on mobile, 2 on small, 4 on desktop */}
          {partnerLogos.map((partnerLogo, index) => (
            <div key={index} className="flex items-center justify-center">
              <img src={partnerLogo} alt={`Partner Logo ${index + 1}`} className="max-h-20 w-auto object-contain" /> {/* Smaller, centered */}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 text-center">
        <p className="text-xl font-bold mb-2">GearGuide – Your Smart Gear Finder</p>
        <div className="flex justify-center gap-4">
          <Link to="/about" className="hover:underline">About Us</Link>
        </div>
        <p className="mt-4 text-sm">© 2025 GearGuide. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;