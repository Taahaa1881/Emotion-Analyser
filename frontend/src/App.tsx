import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import EmotionDetector from './components/EmotionDetector';
import Home from './components/Home';

function App() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <Router>
            <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
                <div className="container mx-auto px-4 py-8">
                    <header className="flex justify-between items-center mb-8">
                        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            Emotion Recognition
                        </h1>
                        <button
                            onClick={toggleDarkMode}
                            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
                        >
                            {darkMode ? (
                                <SunIcon className="h-6 w-6" />
                            ) : (
                                <MoonIcon className="h-6 w-6" />
                            )}
                        </button>
                    </header>
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/detect" element={<EmotionDetector darkMode={darkMode} />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
}

export default App;  