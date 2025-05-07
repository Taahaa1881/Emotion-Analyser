import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 dark:bg-gradient-to-br dark:from-blue-900 dark:via-green-700 dark:to-blue-600 relative overflow-hidden">
            {/* Animated glowing background (only visible in dark mode) */}
            <div className="absolute inset-0 z-0 pointer-events-none dark:block hidden">
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-400 opacity-30 rounded-full blur-3xl animate-glow-slow"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-400 opacity-30 rounded-full blur-3xl animate-glow-slow2"></div>
            </div>
            <div className="text-center z-10">
                <h1 className="text-4xl font-bold dark:text-white mb-6">Royein Pittein - Emotion Detector</h1>
                <p className="text-lg dark:text-blue-200 mb-8">Discover emotions in real time from your webcam or images.</p>
                <button
                    onClick={() => navigate('/detect')}
                    className="relative px-14 py-6 text-2xl font-semibold rounded-full bg-gradient-to-r from-blue-500 via-green-400 to-blue-700 text-white shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 animate-glow hover:scale-105 overflow-hidden"
                >
                    <span className="z-10 relative">Start</span>
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-green-300 to-blue-600 opacity-40 blur-lg animate-pulse"></span>
                </button>
            </div>
        </div>
    );
};

export default Home; 