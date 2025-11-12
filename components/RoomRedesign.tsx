
import React, { useState } from 'react';
import { ImageFile, RedesignResult } from '../types';
import { DEFAULT_DESIGN_PROMPT } from '../constants';
import { redesignRoom } from '../services/geminiService';
import ImageUpload from './ImageUpload';
import Loader from './Loader';

const RoomRedesign: React.FC = () => {
    const [images, setImages] = useState<ImageFile[]>([]);
    const [prompt, setPrompt] = useState(DEFAULT_DESIGN_PROMPT);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<RedesignResult | null>(null);

    const handleGenerate = async () => {
        if (images.length === 0 || !prompt) {
            setError("Please upload at least one image and provide a design prompt.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setResult(null);
        try {
            const response = await redesignRoom(images, prompt);
            setResult(response);
        } catch (err: any) {
            setError(err.message || "An unknown error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">1. Upload Room Photos</h2>
                    <ImageUpload onFilesSelect={setImages} multiple={true} />
                </div>
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">2. Describe Your Vision</h2>
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        rows={10}
                        className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        placeholder="Describe your ideal room..."
                    />
                </div>
            </div>
            
            <div className="text-center">
                <button
                    onClick={handleGenerate}
                    disabled={isLoading || images.length === 0}
                    className="w-full md:w-auto px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-transform transform hover:scale-105"
                >
                    {isLoading ? 'Generating...' : '✨ Generate New Design'}
                </button>
            </div>

            {isLoading && (
                <div className="text-center p-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <Loader />
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">AI is redesigning your space... this may take a moment.</p>
                </div>
            )}

            {error && <p className="text-center text-red-500 bg-red-100 dark:bg-red-900/20 p-4 rounded-lg">{error}</p>}

            {result && (
                <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl space-y-6 animate-fade-in">
                    <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Your New Room Design!</h2>
                    {result.image && (
                         <div className="overflow-hidden rounded-lg">
                             <img src={`data:image/png;base64,${result.image}`} alt="Generated room design" className="w-full h-auto object-cover" />
                         </div>
                    )}
                    <div className="prose prose-lg dark:prose-invert max-w-none p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <p className="whitespace-pre-wrap">{result.text}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoomRedesign;
