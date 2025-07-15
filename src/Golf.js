import React, { useState } from 'react';
import { motion } from 'framer-motion'; // For animations

const Golf = () => {
  const [answers, setAnswers] = useState({
    type: '', // Privat or Unternehmen
    frequency: 50, // Slider value (0-100, e.g., 0 = rarely, 100 = daily)
    gender: '', // Male/Female/Other
    colorPalette: '', // Selected color
    setType: [], // Full set or parts (checkboxes)
    size: '', // S/M/L/XL
    budget: '', // Input
    address: '', // Input
    specials: '', // Amazon preference (optional)
  });

  const updateAnswer = (key, value) => {
    setAnswers({ ...answers, [key]: value });
  };

  const colors = ['Black', 'Green', 'White', 'Blue', 'Red']; // Example palette options

  const setOptions = ['Full Set', 'Clubs Only', 'Balls Only', 'Apparel']; // Checkboxes for what to buy

  const handleSubmit = () => {
    // Required fields check
    if (
      !answers.type ||
      answers.frequency === 0 ||
      !answers.gender ||
      !answers.colorPalette ||
      answers.setType.length === 0 ||
      !answers.size ||
      !answers.budget ||
      !answers.address
    ) {
      alert('Please fill out all required fields (specials is optional)!');
      return;
    }
    console.log('Submitted answers:', answers);
    alert('AI starting to crawl and generate kits... Check console for answers!');
    // Here, add your AI crawling logic, e.g., call an API with answers
  };

  // Animation variants for buttons
  const buttonVariants = {
    hover: { scale: 1.05 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 font-sans antialiased p-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-green-800">Golf Gear Quiz – Let's Get Started!</h1>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg space-y-8"> {/* All questions in one container with space-y-8 for vertical spacing */}

        {/* Question 1: Privat or Unternehmen */}
        <div className="mb-8">
          <h2 className="text-2xl mb-4 text-center">Are you shopping for private use or business?</h2>
          <div className="flex justify-center gap-4">
            <motion.button 
              variants={buttonVariants}
              whileHover="hover"
              onClick={() => updateAnswer('type', 'Privat')} 
              className={`p-4 rounded text-white ${answers.type === 'Privat' ? 'bg-green-700' : 'bg-green-500 hover:bg-green-600'}`}
            >
              Privat
            </motion.button>
            <motion.button 
              variants={buttonVariants}
              whileHover="hover"
              onClick={() => updateAnswer('type', 'Unternehmen')} 
              className={`p-4 rounded text-white ${answers.type === 'Unternehmen' ? 'bg-green-700' : 'bg-green-500 hover:bg-green-600'}`}
            >
              Unternehmen
            </motion.button>
          </div>
        </div>

        {/* Question 2: Wie oft? (Slider) */}
        <div className="mb-8">
          <h2 className="text-2xl mb-4 text-center">How often do you play golf?</h2>
          <input 
            type="range" 
            min="0" max="100" 
            value={answers.frequency} 
            onChange={(e) => updateAnswer('frequency', e.target.value)} 
            className="w-full"
          />
          <p className="text-center mt-2">{answers.frequency < 33 ? 'Rarely' : answers.frequency < 67 ? 'Occasionally' : 'Frequently'}</p>
        </div>

        {/* Question 3: Geschlecht (Buttons) */}
        <div className="mb-8">
          <h2 className="text-2xl mb-4 text-center">Gender</h2>
          <div className="flex justify-center gap-4">
            <motion.button 
              variants={buttonVariants}
              whileHover="hover"
              onClick={() => updateAnswer('gender', 'Male')} 
              className={`p-4 rounded text-white ${answers.gender === 'Male' ? 'bg-green-700' : 'bg-green-500 hover:bg-green-600'}`}
            >
              Male
            </motion.button>
            <motion.button 
              variants={buttonVariants}
              whileHover="hover"
              onClick={() => updateAnswer('gender', 'Female')} 
              className={`p-4 rounded text-white ${answers.gender === 'Female' ? 'bg-green-700' : 'bg-green-500 hover:bg-green-600'}`}
            >
              Female
            </motion.button>
            <motion.button 
              variants={buttonVariants}
              whileHover="hover"
              onClick={() => updateAnswer('gender', 'Other')} 
              className={`p-4 rounded text-white ${answers.gender === 'Other' ? 'bg-green-700' : 'bg-green-500 hover:bg-green-600'}`}
            >
              Other
            </motion.button>
          </div>
        </div>

        {/* Question 4: Color palette (Swatches) */}
        <div className="mb-8">
          <h2 className="text-2xl mb-4 text-center">Choose your color palette</h2>
          <div className="grid grid-cols-5 gap-4 justify-center">
            {colors.map((color) => (
              <motion.div 
                key={color} 
                className={`w-16 h-16 rounded cursor-pointer border-2 ${answers.colorPalette === color ? 'border-green-700' : 'border-transparent'}`}
                style={{ backgroundColor: color.toLowerCase() }} 
                onClick={() => updateAnswer('colorPalette', color)} 
                whileHover={{ scale: 1.1 }}
              />
            ))}
          </div>
        </div>

        {/* Question 5: Was (ganzes Set oder nur Teile? Checkboxes) */}
        <div className="mb-8">
          <h2 className="text-2xl mb-4 text-center">What do you want? (Select all that apply)</h2>
          <div className="space-y-2">
            {setOptions.map((option) => (
              <label key={option} className="block">
                <input 
                  type="checkbox" 
                  checked={answers.setType.includes(option)} 
                  onChange={(e) => {
                    let newSet = [...answers.setType];
                    if (e.target.checked) newSet.push(option); else newSet = newSet.filter(o => o !== option);
                    updateAnswer('setType', newSet);
                  }}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        {/* Question 6: Grösse (Buttons) */}
        <div className="mb-8">
          <h2 className="text-2xl mb-4 text-center">Size</h2>
          <div className="flex justify-center gap-4">
            <motion.button 
              variants={buttonVariants}
              whileHover="hover"
              onClick={() => updateAnswer('size', 'S')} 
              className={`p-4 rounded text-white ${answers.size === 'S' ? 'bg-green-700' : 'bg-green-500 hover:bg-green-600'}`}
            >
              S
            </motion.button>
            <motion.button 
              variants={buttonVariants}
              whileHover="hover"
              onClick={() => updateAnswer('size', 'M')} 
              className={`p-4 rounded text-white ${answers.size === 'M' ? 'bg-green-700' : 'bg-green-500 hover:bg-green-600'}`}
            >
              M
            </motion.button>
            <motion.button 
              variants={buttonVariants}
              whileHover="hover"
              onClick={() => updateAnswer('size', 'L')} 
              className={`p-4 rounded text-white ${answers.size === 'L' ? 'bg-green-700' : 'bg-green-500 hover:bg-green-600'}`}
            >
              L
            </motion.button>
            <motion.button 
              variants={buttonVariants}
              whileHover="hover"
              onClick={() => updateAnswer('size', 'XL')} 
              className={`p-4 rounded text-white ${answers.size === 'XL' ? 'bg-green-700' : 'bg-green-500 hover:bg-green-600'}`}
            >
              XL
            </motion.button>
          </div>
        </div>

        {/* Question 7: Budget (Input) */}
        <div className="mb-8">
          <h2 className="text-2xl mb-4 text-center">Budget</h2>
          <input 
            type="number" 
            placeholder="Enter budget in €" 
            value={answers.budget} 
            onChange={(e) => updateAnswer('budget', e.target.value)} 
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Question 8: Adresse Name (Input) */}
        <div className="mb-8">
          <h2 className="text-2xl mb-4 text-center">Address and Name</h2>
          <input 
            type="text" 
            placeholder="Enter name and address" 
            value={answers.address} 
            onChange={(e) => updateAnswer('address', e.target.value)} 
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Question 9: Specials (Buttons, optional) */}
        <div className="mb-8">
          <h2 className="text-2xl mb-4 text-center">Special preferences (optional)</h2>
          <div className="flex justify-center gap-4">
            <motion.button 
              variants={buttonVariants}
              whileHover="hover"
              onClick={() => updateAnswer('specials', 'No Amazon')} 
              className={`p-4 rounded text-white ${answers.specials === 'No Amazon' ? 'bg-green-700' : 'bg-green-500 hover:bg-green-600'}`}
            >
              No Amazon
            </motion.button>
            <motion.button 
              variants={buttonVariants}
              whileHover="hover"
              onClick={() => updateAnswer('specials', 'Prefer Amazon Premium')} 
              className={`p-4 rounded text-white ${answers.specials === 'Prefer Amazon Premium' ? 'bg-green-700' : 'bg-green-500 hover:bg-green-600'}`}
            >
              Prefer Amazon (Premium)
            </motion.button>
          </div>
        </div>

        {/* Find Gear Button */}
        <motion.button 
          onClick={handleSubmit} 
          className="block w-full p-4 bg-green-700 text-white rounded hover:bg-green-800 text-xl font-bold"
          whileHover={{ scale: 1.05 }}
        >
          Find Gear
        </motion.button>
      </div>
    </div>
  );
};

export default Golf;