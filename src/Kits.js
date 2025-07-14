import React, { useState } from 'react';
import StepWizard from 'react-step-wizard';
import { motion } from 'framer-motion';

const Kits = () => {
  const [userData, setUserData] = useState({
    hobby: 'Golf', // Fixed for MVP
    color: '',
    size: '',
    budget: '',
    frequency: '',
    skill: '',
    preferences: '',
  });
  const [showKits, setShowKits] = useState(false);
  const [kits, setKits] = useState([]);

  const updateData = (key, value) => setUserData((prev) => ({ ...prev, [key]: value }));

  const generateKits = () => {
    // Mock AI Agents: "Research" based on userData and generate 3 kits
    const mockKits = [
      { name: 'Beginner Kit', items: `Driver (${userData.color}), Gloves (${userData.size}), Shoes – €${userData.budget * 0.6}`, description: 'Ideal for starters with low frequency.' },
      { name: 'Pro Kit', items: `Pro Driver (${userData.color}), Premium Gloves (${userData.size}), High-End Shoes – €${userData.budget * 0.8}`, description: 'For high-frequency golfers with advanced skill.' },
      { name: 'Custom Kit', items: `Custom Driver (${userData.color}), Tailored Gloves (${userData.size}), Shoes – €${userData.budget}`, description: `Based on your preferences: ${userData.preferences}.` },
    ];
    setKits(mockKits);
    setShowKits(true);
  };

  const Step = ({ children, isActive }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: isActive ? 1 : 0 }} className="p-8 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      {children}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {!showKits ? (
        <StepWizard>
          <Step>
            <h2 className="text-3xl font-bold mb-4">Step 1: Hobby</h2>
            <p>We focus on Golf for now – ready?</p>
            <button onClick={generateKits} className="bg-primary text-white px-4 py-2 rounded mt-4">Next</button> {/* Placeholder for next */}
          </Step>
          <Step>
            <h2 className="text-3xl font-bold mb-4">Step 2: Colors</h2>
            <input type="text" onChange={(e) => updateData('color', e.target.value)} className="border p-2 w-full mb-4" placeholder="e.g. Red" />
            <button onClick={generateKits} className="bg-primary text-white px-4 py-2 rounded">Next</button>
          </Step>
          <Step>
            <h2 className="text-3xl font-bold mb-4">Step 3: Size</h2>
            <input type="text" onChange={(e) => updateData('size', e.target.value)} className="border p-2 w-full mb-4" placeholder="e.g. M" />
            <button onClick={generateKits} className="bg-primary text-white px-4 py-2 rounded">Next</button>
          </Step>
          <Step>
            <h2 className="text-3xl font-bold mb-4">Step 4: Budget</h2>
            <input type="text" onChange={(e) => updateData('budget', e.target.value)} className="border p-2 w-full mb-4" placeholder="e.g. 200" />
            <button onClick={generateKits} className="bg-primary text-white px-4 py-2 rounded">Next</button>
          </Step>
          <Step>
            <h2 className="text-3xl font-bold mb-4">Step 5: Frequency</h2>
            <input type="text" onChange={(e) => updateData('frequency', e.target.value)} className="border p-2 w-full mb-4" placeholder="e.g. Weekly" />
            <button onClick={generateKits} className="bg-primary text-white px-4 py-2 rounded">Next</button>
          </Step>
          <Step>
            <h2 className="text-3xl font-bold mb-4">Step 6: Skill Level</h2>
            <input type="text" onChange={(e) => updateData('skill', e.target.value)} className="border p-2 w-full mb-4" placeholder="e.g. Beginner" />
            <button onClick={generateKits} className="bg-primary text-white px-4 py-2 rounded">Next</button>
          </Step>
          <Step>
            <h2 className="text-3xl font-bold mb-4">Step 7: Additional Preferences</h2>
            <input type="text" onChange={(e) => updateData('preferences', e.target.value)} className="border p-2 w-full mb-4" placeholder="e.g. Brands or Materials" />
            <button onClick={generateKits} className="bg-primary text-white px-4 py-2 rounded">Generate Kits</button>
          </Step>
        </StepWizard>
      ) : (
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Your 3 Golf Kits</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {kits.map((kit, index) => (
              <motion.div key={index} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.2 }} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-2">{kit.name}</h3>
                <p>{kit.items}</p>
                <p className="text-gray-600 mt-4">{kit.description}</p>
                <button className="bg-primary text-white px-4 py-2 rounded mt-4">Order</button>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Kits;