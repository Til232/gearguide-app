import React, { useState } from 'react';
import './index.css';

function GearForm({ onSubmit }) {
  const [hobby, setHobby] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [budget, setBudget] = useState(250);
  const [frequency, setFrequency] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ hobby, color, size, budget, frequency });
  };

  const colors = ['Blue', 'Black', 'Red', 'Green', 'White', 'Brown', 'Gray'];

  return (
    <div className="p-6 bg-gray-100 max-w-md mx-auto rounded-lg shadow-md transition-all duration-300">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Find Your Perfect Gear</h2>
      <div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Hobby</label>
          <select
            value={hobby}
            onChange={(e) => setHobby(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
            required
          >
            <option value="">Select a hobby</option>
            <option value="Golf">⛳ Golf</option>
            <option value="Skiing">🎿 Skiing</option>
            <option value="Tennis">🎾 Tennis</option>
            <option value="Hiking">🥾 Hiking</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Preferred Color</label>
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
          >
            <option value="">Any Color</option>
            {colors.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Size</label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
          >
            <option value="">Any</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
            <option value="One Size">One Size</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Budget ($)</label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
            min="0"
            step="50"
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">How Often Will You Use It?</label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
          >
            <option value="">Select frequency</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="occasionally">Occasionally</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Get Recommendations
        </button>
      </div>
    </div>
  );
}

export default GearForm;