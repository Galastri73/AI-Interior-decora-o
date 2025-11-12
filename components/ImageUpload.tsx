import React, { useRef, useState, useCallback } from 'react';
import { ImageFile } from '../types';

interface ImageUploadProps {
    onFilesSelect: (files: ImageFile[]) => void;
    multiple: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onFilesSelect, multiple }) => {
    const [previews, setPreviews] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;

        const fileList = Array.from(files);
        const imageFilePromises: Promise<ImageFile>[] = [];
        const newPreviews: string[] = [];

        // Fix: Explicitly type `file` as `File` to help TypeScript's type inference, which resolves errors on subsequent lines.
        fileList.forEach((file: File) => {
            newPreviews.push(URL.createObjectURL(file));
            const promise = new Promise<ImageFile>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const base64 = (e.target?.result as string).split(',')[1];
                    if (base64) {
                        resolve({ file, base64 });
                    } else {
                        reject(new Error("Failed to read file as base64"));
                    }
                };
                reader.onerror = (error) => reject(error);
                reader.readAsDataURL(file);
            });
            imageFilePromises.push(promise);
        });

        Promise.all(imageFilePromises)
            .then(imageFiles => {
                onFilesSelect(imageFiles);
                setPreviews(newPreviews);
            })
            .catch(error => {
                console.error("Error processing files:", error);
                // Optionally handle error in UI
            });

    }, [onFilesSelect]);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
                multiple={multiple}
            />
            <div
                onClick={handleClick}
                className="w-full p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center cursor-pointer hover:border-indigo-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
            {previews.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {previews.map((src, index) => (
                        <div key={index} className="relative aspect-square">
                           <img src={src} alt={`Preview ${index}`} className="w-full h-full object-cover rounded-md shadow-md" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageUpload;