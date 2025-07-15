import React, { useState } from 'react';
import { motion } from 'framer-motion'; // For animations

const Golf = () => {
  const [answers, setAnswers] = useState({
    firstName: '', // Vorname
    lastName: '', // Nachname
    gender: '', // Geschlecht
    frequency: '', // Wie oft?
    colorPalette: '', // Farbpalette
    setType: [], // Was brauchst du? (multi-select)
    size: '', // Größe
    budget: '', // Budget
    country: '', // Land
    state: '', // Bundesland/Kanton
    plz: '', // PLZ
    street: '', // Straße
    houseNumber: '', // Hausnummer
    specials: '', // Besondere Vorlieben (free text)
  });

  const [showGreeting, setShowGreeting] = useState(false); // For dynamic Hi [Vorname]

  const updateAnswer = (key, value) => {
    setAnswers({ ...answers, [key]: value });
    if (key === 'firstName' && value.trim()) {
      setShowGreeting(true); // Zeige Begrüßung
    } else if (key === 'firstName' && !value.trim()) {
      setShowGreeting(false);
    }
  };

  const colors = ['Weiß', 'Dunkelblau']; // Begrenzt auf Weiß und Dunkelblau

  const setOptions = ['Cap', 'Polo', 'Hose', 'Schuhe', 'Clubset']; // Updated multi-choice

  const frequencyOptions = ['Mehrmals pro Woche', 'Wöchentlich', 'Monatlich', 'Wenige Male im Jahr']; // Button-Optionen

  const countryOptions = ['Deutschland', 'Österreich', 'Schweiz', 'Anderes']; // Dropdown-Optionen

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
      !answers.firstName.trim() ||
      !answers.lastName.trim() ||
      !answers.gender ||
      !answers.frequency ||
      !answers.colorPalette ||
      answers.setType.length === 0 ||
      !answers.size ||
      !answers.budget ||
      !answers.country ||
      !answers.state.trim() ||
      !answers.plz.trim() ||
      !answers.street.trim() ||
      !answers.houseNumber.trim()
    ) {
      alert('Bitte alle Pflichtfelder ausfüllen (Besondere Vorlieben ist optional)!');
      return;
    }
    console.log('Gesendete Antworten:', answers);
    alert('AI startet die Suche und Erstellung der Kits... Schau in die Konsole für die Antworten!');
    // Hier AI-Crawling-Logik hinzufügen, z.B. API-Aufruf mit Antworten
  };

  // Animation-Varianten für Buttons und Cards
  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-200 font-sans antialiased p-8"> {/* Soft green gradient for golf feel, no image */}
      <h1 className="text-4xl font-bold text-center mb-12 text-green-800">Golf Gear Quiz – Los geht's!</h1>
      <div className="max-w-2xl mx-auto space-y-8"> {/* Hauptcontainer mit Abstand */}

        {/* Begrüßung (zeigt sich nach Eingabe des Vornamens) */}
        {showGreeting && (
          <motion.p 
            className="text-2xl text-center text-green-600 font-semibold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Hi {answers.firstName}!
          </motion.p>
        )}

        {/* Frage 1: Vor- und Nachname */}
        <motion.div variants={cardVariants} initial="initial" animate="animate" className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl mb-4 text-center">Name</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="Vorname" 
              value={answers.firstName} 
              onChange={(e) => updateAnswer('firstName', e.target.value)} 
              className="p-2 border rounded w-full"
            />
            <input 
              type="text" 
              placeholder="Nachname" 
              value={answers.lastName} 
              onChange={(e) => updateAnswer('lastName', e.target.value)} 
              className="p-2 border rounded w-full"
            />
          </div>
        </motion.div>

        {/* Frage 2: Geschlecht */}
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

        {/* Frage 3: Wie oft? (Buttons) */}
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

        {/* Frage 4: Farbpalette (Coolere Swatches mit Labels) */}
        <motion.div variants={cardVariants} initial="initial" animate="animate" className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl mb-4 text-center">Wähle deine Farbe</h2>
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

        {/* Frage 5: Was brauchst du? (Multi-choice checkboxes mit "Ich brauche alles") */}
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

        {/* Frage 6: Größe (Buttons) */}
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

        {/* Frage 7: Budget (Input) */}
        <motion.div variants={cardVariants} initial="initial" animate="animate" className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl mb-4 text-center">Budget insgesamt</h2>
          <input 
            type="number" 
            placeholder="Budget in € eingeben" 
            value={answers.budget} 
            onChange={(e) => updateAnswer('budget', e.target.value)} 
            className="w-full p-2 border rounded"
          />
        </motion.div>

        {/* Frage 8: Adresse (Separate Felder) */}
        <motion.div variants={cardVariants} initial="initial" animate="animate" className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl mb-4 text-center">Adresse</h2>
          <div className="space-y-4">
            <select 
              value={answers.country} 
              onChange={(e) => updateAnswer('country', e.target.value)} 
              className="w-full p-2 border rounded"
            >
              <option value="">Land auswählen</option>
              {countryOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <input 
              type="text" 
              placeholder="Bundesland/Kanton" 
              value={answers.state} 
              onChange={(e) => updateAnswer('state', e.target.value)} 
              className="w-full p-2 border rounded"
            />
            <input 
              type="text" 
              placeholder="PLZ" 
              value={answers.plz} 
              onChange={(e) => updateAnswer('plz', e.target.value)} 
              className="w-full p-2 border rounded"
            />
            <input 
              type="text" 
              placeholder="Straße" 
              value={answers.street} 
              onChange={(e) => updateAnswer('street', e.target.value)} 
              className="w-full p-2 border rounded"
            />
            <input 
              type="text" 
              placeholder="Hausnummer" 
              value={answers.houseNumber} 
              onChange={(e) => updateAnswer('houseNumber', e.target.value)} 
              className="w-full p-2 border rounded"
            />
          </div>
        </motion.div>

        {/* Frage 9: Besondere Vorlieben (Textarea mit Placeholder) */}
        <motion.div variants={cardVariants} initial="initial" animate="animate" className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl mb-4 text-center">Extrawunsch? (optional)</h2>
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
      </div>
    </div>
  );
};

export default Golf;