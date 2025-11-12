
import React, { useState } from 'react';
import { ImageFile } from '../types';
import { editImage } from '../services/geminiService';
import ImageUpload from './ImageUpload';
import Loader from './Loader';
import MagicWandIcon from './icons/MagicWandIcon';

const ImageEditor: React.FC = () => {
    const [originalImage, setOriginalImage] = useState<ImageFile | null>(null);
    const [editPrompt, setEditPrompt] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [editedImage, setEditedImage] = useState<string | null>(null);

    const handleFilesSelect = (files: ImageFile[]) => {
        if (files.length > 0) {
            setOriginalImage(files[0]);
            setEditedImage(null); // Clear previous result
        }
    };

    const handleEdit = async () => {
        if (!originalImage || !editPrompt) {
            setError("Please upload an image and provide an edit instruction.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setEditedImage(null);
        try {
            const response = await editImage(originalImage, editPrompt);
            setEditedImage(response);
        } catch (err: any) {
            setError(err.message || "An unknown error occurred.");
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg space-y-6">
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">1. Upload an Image</h2>
                <ImageUpload onFilesSelect={handleFilesSelect} multiple={false} />

                {originalImage && (
                    <>
                        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">2. Tell the AI what to change</h2>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="text"
                                value={editPrompt}
                                onChange={(e) => setEditPrompt(e.target.value)}
                                className="flex-grow p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                placeholder="e.g., 'Add a retro filter' or 'Make the sky purple'"
                            />
                            <button
                                onClick={handleEdit}
                                disabled={isLoading || !originalImage || !editPrompt}
                                className="flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-transform transform hover:scale-105"
                            >
                                <MagicWandIcon className="w-5 h-5 mr-2" />
                                {isLoading ? 'Editing...' : 'Apply Edit'}
                            </button>
                        </div>
                    </>
                )}
            </div>

            {isLoading && (
                <div className="text-center p-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <Loader />
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">AI is working its magic...</p>
                </div>
            )}

            {error && <p className="text-center text-red-500 bg-red-100 dark:bg-red-900/20 p-4 rounded-lg">{error}</p>}
            
            {editedImage && originalImage && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                        <h3 className="text-lg font-bold text-center mb-4">Original</h3>
                        <img src={`data:${originalImage.file.type};base64,${originalImage.base64}`} alt="Original" className="w-full h-auto object-contain rounded-md" />
                    </div>
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                        <h3 className="text-lg font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Edited</h3>
                        <img src={`data:image/png;base64,${editedImage}`} alt="Edited" className="w-full h-auto object-contain rounded-md" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageEditor;
