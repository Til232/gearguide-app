import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';
// Dynamic import for hiking images
function importAll(r) {
  let images = {};
  r.keys().forEach((item) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
}
const hikingImages = importAll(require.context('./assets/hiking', false, /\.(jpg|jpeg|png)$/));

const Hiking = () => {
  const [answers, setAnswers] = useState({
    gender: '',
    frequency: '',
    colorPalette: [],
    setType: [],
    size: '',
    budget: '',
    specials: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);

  const updateAnswer = (key, value) => {
    setAnswers({ ...answers, [key]: value });
  };

  // For multi-select colorPalette
  const handleColorChange = (color, checked) => {
    let newColors = [...answers.colorPalette];
    if (checked) {
      newColors.push(color);
    } else {
      newColors = newColors.filter(c => c !== color);
    }
    updateAnswer('colorPalette', newColors);
  };

  const colors = ['Weiß', 'Grün', 'Braun', 'Schwarz', 'Grau', 'Blau', 'Beige', 'Rot'];
  // Use the same order as in your assets and price mapping
  const setOptions = ['Wanderhut', 'Wanderjacke', 'Wanderrucksack', 'Wanderhose', 'Wanderschuhe'];
  const priceMap = {
    'Wanderhut': 35,
    'Wanderjacke': 110,
    'Wanderrucksack': 95,
    'Wanderhose': 70,
    'Wanderschuhe': 120,
  };
  const frequencyOptions = ['Mehrmals pro Woche', 'Wöchentlich', 'Monatlich', 'Wenige Male im Jahr'];
  // Removed countryOptions since address is not needed

  const handleAllesSelect = (checked) => {
    if (checked) {
      updateAnswer('setType', [...setOptions]);
    } else {
      updateAnswer('setType', []);
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
    if (
      !answers.gender ||
      !answers.frequency ||
      answers.colorPalette.length === 0 ||
      answers.setType.length === 0 ||
      !answers.size ||
      !answers.budget
    ) {
      alert('Bitte alle Pflichtfelder ausfüllen (Besondere Vorlieben ist optional)!');
      return;
    }
    setIsLoading(true);
    setResults(null);
    setTimeout(() => {
      const mockResults = generateMockResults();
      setResults(mockResults);
      setIsLoading(false);
    }, 3000);
  };

  // Generate hiking results similar to golf
  const generateMockResults = () => {
    const budgetValue = parseInt(answers.budget, 10) || 0;
    const numSets = budgetValue > 800 ? 3 : (budgetValue > 500 ? 2 : 1);
    const sets = [];
    const selectedColors = answers.colorPalette.length > 0 ? answers.colorPalette : ['Weiß'];
    for (let i = 0; i < selectedColors.length; i++) {
      const color = selectedColors[i];
      let colorLabel = color.toLowerCase();
      const setItems = answers.setType.map((item) => {
        // Compose filename: e.g. Braun_Wanderhut.jpg
        const fileName = `${color}_${item}.jpg`;
        const image = hikingImages[fileName] || 'https://via.placeholder.com/150x150?text=No+Image';
        return {
          name: item,
          description: `${colorLabel.charAt(0).toUpperCase() + colorLabel.slice(1)} ${item}`,
          price: priceMap[item] || 99,
          image,
        };
      });
      const totalPrice = setItems.reduce((sum, item) => sum + item.price, 0);
      sets.push({
        title: `Hiking Set ${i + 1} (${color})`,
        items: setItems,
        totalPrice,
      });
    }
    return sets;
  };

  // (Removed duplicate buttonVariants and cardVariants)

  // Animation variants (reuse from Golf.js)
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-200 font-sans antialiased p-8">
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FaSpinner className="text-white text-6xl animate-spin" />
            <p className="text-white text-2xl mt-4">AI sucht auf Websites...</p>
            <div className="w-64 h-2 bg-green-200 rounded mt-4 overflow-hidden">
              <motion.div 
                className="h-full bg-green-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%", transition: { duration: 3, ease: 'linear' } }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="max-w-2xl mx-auto space-y-8">
        {!results ? (
          <>
            {/* ...reuse the form structure from Golf.js, but with hiking-specific setOptions and labels... */}
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
              <h2 className="text-2xl mb-4 text-center">Wie oft gehst du Wandern?</h2>
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
            {/* Frage 3: Farbpalette (Mehrfachauswahl möglich) */}
            <motion.div variants={cardVariants} initial="initial" animate="animate" className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl mb-4 text-center">Wähle deine Farbpalette (Mehrfachauswahl möglich)</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-center">
                {colors.map((color) => {
                  let bg;
                  switch (color) {
                    case 'Weiß': bg = 'white'; break;
                    case 'Grün': bg = 'green'; break;
                    case 'Braun': bg = 'brown'; break;
                    case 'Schwarz': bg = 'black'; break;
                    case 'Grau': bg = 'grey'; break;
                    case 'Blau': bg = 'blue'; break;
                    case 'Beige': bg = '#f5f5dc'; break;
                    case 'Rot': bg = 'red'; break;
                    default: bg = 'white';
                  }
                  return (
                    <motion.label
                      key={color}
                      className={`cursor-pointer border-2 rounded p-4 text-center flex flex-col items-center ${answers.colorPalette.includes(color) ? 'border-green-700 shadow-md' : 'border-transparent'}`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <input
                        type="checkbox"
                        checked={answers.colorPalette.includes(color)}
                        onChange={e => handleColorChange(color, e.target.checked)}
                        className="mb-2"
                      />
                      <div className="w-full h-12 rounded mb-2" style={{ backgroundColor: bg, border: color === 'Weiß' ? '1px solid gray' : 'none' }} />
                      <p className="text-lg font-semibold">{color}</p>
                    </motion.label>
                  );
                })}
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
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <motion.button 
                    key={size}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => updateAnswer('size', size)} 
                    className={`p-4 rounded text-white ${answers.size === size ? 'bg-green-700' : 'bg-green-500 hover:bg-green-600'}`}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </motion.div>
            {/* Frage 6: Budget (Input) */}
            <motion.div variants={cardVariants} initial="initial" animate="animate" className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl mb-4 text-center">Budget für alles zusammen</h2>
              <input 
                type="number" 
                min="0"
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
            <h2 className="text-3xl font-bold text-center text-green-800">Deine Hiking Sets</h2>
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

export default Hiking;
