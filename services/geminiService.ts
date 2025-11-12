
import { GoogleGenAI, Modality } from "@google/genai";
import { ImageFile, RedesignResult } from '../types';

interface ImagePart {
    inlineData: {
        mimeType: string;
        data: string;
    };
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

function fileToImagePart(file: ImageFile): ImagePart {
    return {
        inlineData: {
            mimeType: file.file.type,
            data: file.base64,
        },
    };
}

export const redesignRoom = async (images: ImageFile[], prompt: string): Promise<RedesignResult> => {
    try {
        const imageParts = images.map(fileToImagePart);
        const textPart = { text: prompt };

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: [...imageParts, textPart] },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });
        
        let generatedText = "No description generated.";
        let generatedImage: string | null = null;
        
        for (const part of response.candidates[0].content.parts) {
            if (part.text) {
                generatedText = part.text;
            } else if (part.inlineData) {
                generatedImage = part.inlineData.data;
            }
        }
        
        if (!generatedImage) {
            // Fallback text if no image is generated
            const textResponse = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            generatedText = textResponse.text;
        }

        return { text: generatedText, image: generatedImage };

    } catch (error) {
        console.error("Error in redesignRoom:", error);
        throw new Error("Failed to generate room design. Please check your API key and try again.");
    }
};

export const editImage = async (image: ImageFile, prompt: string): Promise<string> => {
    try {
        const imagePart = fileToImagePart(image);
        const textPart = { text: prompt };

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: [imagePart, textPart] },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return part.inlineData.data;
            }
        }
        throw new Error("No image was generated in the response.");
        
    } catch (error) {
        console.error("Error in editImage:", error);
        throw new Error("Failed to edit image. Please check your API key and try again.");
    }
};
