import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // For animations and loading
import { FaSpinner } from 'react-icons/fa'; // For spinning icon in loading

// Import local images from src/assets/golf
import golfCapBlau from './assets/golf/golf_cap_blau.jpg';
import golfCapWeiss from './assets/golf/golf_cap_weiß.jpg';
import golfClubsBlau from './assets/golf/golf_clubs_blau.jpg';
import golfClubsWeiss from './assets/golf/golf_clubs_weiß.jpg';
import golfHoseBlau from './assets/golf/golf_hose_blau.jpg';
import golfHoseWeiss from './assets/golf/golf_hose_weiß.jpg';
import golfPoloBlau from './assets/golf/golf_polo_blau.jpg';
import golfPoloWeiss from './assets/golf/golf_polo_weiß.jpg';
import golfSchuhBlau from './assets/golf/golf_schuh_blau.jpg';
import golfSchuhWeiss from './assets/golf/golf_schuh_weiß.jpg';

const Golf = () => {
  const [answers, setAnswers] = useState({
    gender: '', // Geschlecht
    frequency: '', // Wie oft?
    colorPalette: '', // Farbpalette
    setType: [], // Was brauchst du? (multi-select)
    size: '', // Größe
    budget: '', // Budget
    specials: '', // Besondere Vorlieben (free text)
  });

  const [isLoading, setIsLoading] = useState(false); // For loading screen
  const [results, setResults] = useState(null); // For mock AI results

  const updateAnswer = (key, value) => {
    setAnswers({ ...answers, [key]: value });
  };

  const colors = ['Weiß', 'Dunkelblau']; // Begrenzt auf Weiß und Dunkelblau

  const setOptions = ['Cap', 'Polo', 'Hose', 'Schuhe', 'Clubset']; // Updated multi-choice

  const frequencyOptions = ['Mehrmals pro Woche', 'Wöchentlich', 'Monatlich', 'Wenige Male im Jahr']; // Button-Optionen

  const handleAllesSelect = (checked) => {
    if (checked) {
      updateAnswer('setType', [...setOptions]); // Wähle alles aus
    } else {
      updateAnswer('setType', []); // Wähle nichts aus
    }
  };

  const handleSetTypeChange = (option, checked) => {
    let newSet = [...answers.setType];
    if (checked) {
      newSet.push(option);
    } else {
      newSet = newSet.filter(o => o !== option);
    }
    updateAnswer('setType', newSet);
  };

  const handleSubmit = () => {
    // Pflichtfelder prüfen
    if (
      !answers.gender ||
      !answers.frequency ||
      !answers.colorPalette ||
      answers.setType.length === 0 ||
      !answers.size ||
      !answers.budget
    ) {
      alert('Bitte alle Pflichtfelder ausfüllen (Besondere Vorlieben ist optional)!');
      return;
    }
    setIsLoading(true); // Zeige Loading-Screen
    setResults(null); // Reset Results

    // Fake AI Delay (3 Sekunden)
    setTimeout(() => {
      const mockResults = generateMockResults(); // Generiere fake Results
      setResults(mockResults);
      setIsLoading(false); // Loading beenden
    }, 3000); // 3 Sekunden Delay für "Crawling"
  };

  // Image map using imported local images
  const imageMap = {
    'Weiß': {
      'Cap': golfCapWeiss,
      'Polo': golfPoloWeiss,
      'Hose': golfHoseWeiss,
      'Schuhe': golfSchuhWeiss,
      'Clubset': golfClubsWeiss,
    },
    'Dunkelblau': {
      'Cap': golfCapBlau,
      'Polo': golfPoloBlau,
      'Hose': golfHoseBlau,
      'Schuhe': golfSchuhBlau,
      'Clubset': golfClubsBlau,
    },
  };

  // Fake AI-Funktion: Generiert 1-3 Sets basierend auf Inputs
  const generateMockResults = () => {
    const color = answers.colorPalette === 'Weiß' ? 'weiß' : 'dunkelblau';
    const budgetValue = parseInt(answers.budget, 10) || 0; // Safely parse to number
    const numSets = budgetValue > 800 ? 3 : (budgetValue > 500 ? 2 : 1); // 1-3 Sets basierend auf Budget
    const sets = [];
    const basePrice = budgetValue / numSets; // Preis an Budget anpassen

    for (let i = 1; i <= numSets; i++) {
      const setItems = answers.setType.map((item) => ({
        name: item,
        description: `${color.charAt(0).toUpperCase() + color.slice(1)} ${item.toLowerCase()}`,
        price: Math.floor(Math.random() * 100 + 50), // Zufälliger Preis pro Item (50-150 €)
        image: imageMap[answers.colorPalette][item] || 'https://via.placeholder.com/150x150?text=Fallback+Image', // Use local image from map, or fallback
      }));
      const totalPrice = setItems.reduce((sum, item) => sum + item.price, 0);

      sets.push({
        title: `Golf Set ${i} (${color})`,
        items: setItems,
        totalPrice: Math.min(totalPrice, budgetValue), // Passt zum Budget
      });
    }
    return sets;
  };

  // Animation-Varianten für Buttons, Cards und Results
  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const resultVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.2 } },
  };

  const itemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-200 font-sans antialiased p-8"> {/* Soft green gradient for golf feel */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FaSpinner className="text-white text-6xl animate-spin" /> {/* Spinning icon */}
            <p className="text-white text-2xl mt-4">AI sucht auf Websites...</p>
            <div 
              className="w-64 h-2 bg-green-200 rounded mt-4 overflow-hidden"
            >
              <motion.div 
                className="h-full bg-green-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%", transition: { duration: 3, ease: 'linear' } }} // Fixed progress bar animation
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-2xl mx-auto space-y-8">
        {!results ? (
          <>
            {/* Frage 1: Geschlecht */}
            <motion.div variants={cardVariants} initial="initial" animate="animate" className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl mb-4 text-center">Geschlecht</h2>
              <div className="flex justify-center gap-4">
                <motion.button 
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => updateAnswer('gender', 'Männlich')} 
                  className={`p-4 rounded text-white ${answers.gender === 'Männlich' ? 'bg-green-700' : 'bg-green-500 hover:bg-green-600'}`}
                >
                  Männlich
                </motion.button>
                <motion.button 
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => updateAnswer('gender', 'Weiblich')} 
                  className={`p-4 rounded text-white ${answers.gender === 'Weiblich' ? 'bg-green-700' : 'bg-green-500 hover:bg-green-600'}`}
                >
                  Weiblich
                </motion.button>
                <motion.button 
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => updateAnswer('gender', 'Anderes')} 
                  className={`p-4 rounded text-white ${answers.gender === 'Anderes' ? 'bg-green-700' : 'bg-green-500 hover:bg-green-600'}`}
                >
                  Anderes
                </motion.button>
              </div>
            </motion.div>

            {/* Frage 2: Wie oft? (Buttons) */}
            <motion.div variants={cardVariants} initial="initial" animate="animate" className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl mb-4 text-center">Wie oft spielst du Golf?</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {frequencyOptions.map((option) => (
                  <motion.button 
                    key={option}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => updateAnswer('frequency', option)} 
                    className={`p-4 rounded text-white ${answers.frequency === option ? 'bg-green-700' : 'bg-green-500 hover:bg-green-600'}`}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Frage 3: Farbpalette (Coolere Swatches mit Labels) */}
            <motion.div variants={cardVariants} initial="initial" animate="animate" className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl mb-4 text-center">Wähle deine Farbpalette</h2>
              <div className="grid grid-cols-2 gap-4 justify-center">
                {colors.map((color) => (
                  <motion.div 
                    key={color} 
                    className={`cursor-pointer border-2 rounded p-4 text-center ${answers.colorPalette === color ? 'border-green-700 shadow-md' : 'border-transparent'}`}
                    onClick={() => updateAnswer('colorPalette', color)} 
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-full h-16 rounded mb-2" style={{ backgroundColor: color === 'Weiß' ? 'white' : 'darkblue', border: color === 'Weiß' ? '1px solid gray' : 'none' }} />
                    <p className="text-lg font-semibold">{color}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Frage 4: Was brauchst du? (Multi-choice checkboxes mit "Ich brauche alles") */}
            <motion.div variants={cardVariants} initial="initial" animate="animate" className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl mb-4 text-center">Was brauchst du? (Mehrfachauswahl möglich)</h2>
              <div className="space-y-2">
                <label className="block text-lg">
                  <input 
                    type="checkbox" 
                    checked={answers.setType.length === setOptions.length} 
                    onChange={(e) => handleAllesSelect(e.target.checked)} 
                    className="mr-2"
                  />
                  Ich brauche alles
                </label>
                {setOptions.map((option) => (
                  <label key={option} className="block text-lg">
                    <input 
                      type="checkbox" 
                      checked={answers.setType.includes(option)} 
                      onChange={(e) => handleSetTypeChange(option, e.target.checked)} 
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </motion.div>

            {/* Frage 5: Größe (Buttons) */}
            <motion.div variants={cardVariants} initial="initial" animate="animate" className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl mb-4 text-center">Größe</h2>
              <div className="flex justify-center gap-4">
                <motion.button 
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => updateAnswer('size', 'S')} 
                  className={`p-4 rounded text-white ${answers.size === 'S' ? 'bg-green-700' : 'bg-green-500 hover:bg-green-600'}`}
                >
                  S
                </motion.button>
                <motion.button 
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => updateAnswer('size', 'M')} 
                  className={`p-4 rounded text-white ${answers.size === 'M' ? 'bg-green-700' : 'bg-green-500 hover:bg-green-600'}`}
                >
                  M
                </motion.button>
                <motion.button 
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => updateAnswer('size', 'L')} 
                  className={`p-4 rounded text-white ${answers.size === 'L' ? 'bg-green-700' : 'bg-green-500 hover:bg-green-600'}`}
                >
                  L
                </motion.button>
                <motion.button 
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => updateAnswer('size', 'XL')} 
                  className={`p-4 rounded text-white ${answers.size === 'XL' ? 'bg-green-700' : 'bg-green-500 hover:bg-green-600'}`}
                >
                  XL
                </motion.button>
              </div>
            </motion.div>

            {/* Frage 6: Budget (Input) */}
            <motion.div variants={cardVariants} initial="initial" animate="animate" className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl mb-4 text-center">Budget für alles zusammen</h2>
              <input 
                type="number" 
                min="0" // Prevent negative values
                placeholder="Budget in € eingeben" 
                value={answers.budget} 
                onChange={(e) => updateAnswer('budget', e.target.value)} 
                className="w-full p-2 border rounded"
              />
            </motion.div>

            {/* Frage 7: Besondere Vorlieben (Textarea mit Placeholder) */}
            <motion.div variants={cardVariants} initial="initial" animate="animate" className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl mb-4 text-center">Besondere Vorlieben (optional)</h2>
              <textarea 
                placeholder="Z.B. Kein Amazon oder Amazon Premium bevorzugt" 
                value={answers.specials} 
                onChange={(e) => updateAnswer('specials', e.target.value)} 
                className="w-full p-2 border rounded h-24"
              />
            </motion.div>

            {/* Gear finden Button */}
            <motion.button 
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleSubmit} 
              className="block w-full p-4 bg-green-700 text-white rounded hover:bg-green-800 text-xl font-bold"
            >
              Gear finden
            </motion.button>
          </>
        ) : (
          <motion.div 
            className="mt-12 space-y-8"
            variants={resultVariants}
            initial="initial"
            animate="animate"
          >
            <h2 className="text-3xl font-bold text-center text-green-800">Deine Golf Sets</h2>
            {results.map((set) => (
              <motion.div key={set.title} variants={resultVariants} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-4">{set.title}</h3>
                <div className="space-y-4">
                  {set.items.map((item) => (
                    <motion.div key={item.name} variants={itemVariants} className="flex items-center gap-4">
                      <img src={item.image} alt={item.description} className="w-20 h-20 object-contain" />
                      <div>
                        <p className="font-semibold">{item.description}</p>
                        <p>{item.price} €</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <p className="text-xl font-bold mt-4">Gesamtpreis: {set.totalPrice} €</p>
              </motion.div>
            ))}
            {/* Back button to reset to form */}
            <motion.button 
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setResults(null)}
              className="block w-full p-4 bg-green-700 text-white rounded hover:bg-green-800 text-xl font-bold mt-8"
            >
              Zurück zum Quiz
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Golf;