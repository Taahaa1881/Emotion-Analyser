import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface EmotionDetectorProps {
    darkMode: boolean;
}

const EmotionDetector: React.FC<EmotionDetectorProps> = ({ darkMode }) => {
    const webcamRef = useRef<Webcam>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [predictions, setPredictions] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [cameraOn, setCameraOn] = useState(true);

    const capture = useCallback(() => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            setCapturedImage(imageSrc);
        }
    }, [webcamRef]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCapturedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const analyzeEmotion = async () => {
        if (!capturedImage) return;

        setLoading(true);
        setError(null);

        try {
            // Convert base64 to blob
            const response = await fetch(capturedImage);
            const blob = await response.blob();

            // Create form data
            const formData = new FormData();
            formData.append('file', blob, 'image.jpg');

            // Send to backend
            const result = await axios.post('http://localhost:8000/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setPredictions(result.data);
        } catch (err) {
            setError('Error analyzing image. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const chartData = {
        labels: predictions?.all_emotions ? Object.keys(predictions.all_emotions) : [],
        datasets: [
            {
                label: 'Confidence',
                data: predictions?.all_emotions ? Object.values(predictions.all_emotions) : [],
                backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(75, 192, 192, 0.5)',
                borderColor: darkMode ? 'rgba(255, 255, 255, 1)' : 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    color: darkMode ? 'white' : 'black',
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 1,
                ticks: {
                    color: darkMode ? 'white' : 'black',
                },
            },
            x: {
                ticks: {
                    color: darkMode ? 'white' : 'black',
                },
            },
        },
    };

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="relative w-full max-w-md mx-auto" style={{ aspectRatio: '4/3' }}>
                        {cameraOn ? (
                            <Webcam
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                className="w-full h-full object-contain rounded-lg bg-gray-200 dark:bg-gray-800"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-lg">
                                Camera is Off
                            </div>
                        )}
                    </div>
                    <div className="flex space-x-4">
                        <button
                            onClick={capture}
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                            disabled={!cameraOn}
                        >
                            Capture
                        </button>
                        <label className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer text-center">
                            Upload Image
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                className="hidden"
                            />
                        </label>
                        <button
                            onClick={() => setCameraOn((prev) => !prev)}
                            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                        >
                            {cameraOn ? 'Turn Camera Off' : 'Turn Camera On'}
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    {capturedImage && (
                        <>
                            <div className="relative w-full max-w-md mx-auto" style={{ aspectRatio: '4/3' }}>
                                <img
                                    src={capturedImage}
                                    alt="Captured"
                                    className="w-full h-full object-contain rounded-lg bg-gray-200 dark:bg-gray-800"
                                    style={{ display: 'block', margin: '0 auto', maxHeight: '100%', maxWidth: '100%' }}
                                />
                            </div>
                            <button
                                onClick={analyzeEmotion}
                                disabled={loading}
                                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
                            >
                                {loading ? 'Analyzing...' : 'Analyze Emotion'}
                            </button>
                        </>
                    )}
                </div>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                    {error}
                </div>
            )}

            {predictions && (
                <div className="space-y-4">
                    <div className={`text-center text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {predictions.predicted_emotion} ({Math.round(predictions.confidence * 100)}%)
                    </div>
                    <div className="h-64">
                        <Bar data={chartData} options={chartOptions} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmotionDetector; 