import { GoogleGenAI, Modality } from "@google/genai";

export async function query(prompt) {
    const ai = new GoogleGenAI({
        apiKey: 'AIzaSyArkVCou2ddCHQ718H0K4AwxM4b39p9JXc'
    });

    const contents = prompt;

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-preview-image-generation",
        contents: contents,
        config: {
            responseModalities: [Modality.TEXT, Modality.IMAGE],
        },
    });

    for (const part of response.candidates[0].content.parts) {
        if (part.text) {
            console.log(part.text);
        } else if (part.inlineData) {
            const imageData = part.inlineData.data;
            return {
                message: "Image saved as gemini-native-image.png",
                imageData,
            };
        }
    }
}
