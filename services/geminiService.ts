
/**
 * AI SERVICE (AI Suvidha)
 * -----------------------
 * Purpose: Connects to Google's Gemini AI API.
 * Linked: Used exclusively in 'pages/Home.tsx' for the AI Concierge section.
 */

import { GoogleGenAI } from "@google/genai";

// Function to get room recommendations based on user input
export const getAIConciergeRecommendation = async (userPrompt: string, availableRooms: any[]) => {
  try {
    // 1. Initialize the AI client using the API Key from environment variables
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // 2. Prepare the data to send to the AI
    // We convert the list of room objects into a string so the AI can read it.
    const roomsInfo = availableRooms.map(r => 
      `${r.name}: ₹${r.price}/night, Amenities: ${r.amenities.join(', ')}`
    ).join('\n');
    
    // 3. Create the System Instruction (The Rules for the AI)
    // We tell the AI who it is (Concierge) and give it the room data.
    const systemInstruction = `You are an AI Concierge for LuxeStay Hotel in Surat, Gujarat. The guest is asking: "${userPrompt}". 
         Available rooms in the hotel: ${roomsInfo}. 
         Task: Recommend the best 1-2 rooms based on their specific needs. 
         Language: English only. 
         Tone: Professional, premium, and welcoming. Provide helpful tips about the local area if relevant.`;

    // 4. Send the request to the model ('gemini-3-flash-preview')
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: systemInstruction,
    });

    // 5. Return the text answer
    return response.text || "I'm sorry, I couldn't process that recommendation at the moment.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Our AI concierge is currently attending to other guests. Please try again shortly.";
  }
};
