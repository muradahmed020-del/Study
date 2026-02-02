
import { GoogleGenAI, Type, Modality } from "@google/genai";

// Function to get a fresh AI instance with the current API Key
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateDailyChallenge = async () => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: "শিশুদের জন্য একটি মজার বাংলা ধাঁধা বা অঙ্ক বা শব্দ খেলা তৈরি করো। উত্তর এবং একটি ইঙ্গিত দাও।",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          type: { type: Type.STRING, description: "math, riddle, or word" },
          question: { type: Type.STRING, description: "Bengali question" },
          answer: { type: Type.STRING, description: "Correct answer" },
          hint: { type: Type.STRING, description: "Hint" }
        },
        required: ["type", "question", "answer", "hint"]
      }
    }
  });
  return JSON.parse(response.text || '{}');
};

export const generateLesson = async (topic: string) => {
  const ai = getAI();
  const prompts: Record<string, string> = {
    'bangla': "বাচ্চাদের জন্য একটি মজার বাংলা ছড়া বা ছোট গল্প বলো।",
    'math': "বাচ্চাদের জন্য একটি মজার গণিতের জাদু বা ট্রিক শেখাও।",
    'history': "বাচ্চাদের জন্য মুক্তিযুদ্ধ বা বঙ্গবন্ধু সম্পর্কে একটি খুব ছোট ও সহজ অনুপ্রেরণামূলক গল্প বলো।",
    'science': "বাচ্চাদের জন্য একটি মজার বৈজ্ঞানিক তথ্য বা সহজ পরীক্ষা বলো।"
  };
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompts[topic] || "একটি মজার শিক্ষামূলক গল্প বলো।",
    config: {
      systemInstruction: "You are a friendly teacher for kids. Use simple Bengali and many emojis."
    }
  });
  return response.text;
};

export const askMascot = async (question: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: question,
    config: {
      systemInstruction: "You are 'Bunny' 🐰, a friendly mascot. Answer simply in Bengali for a 5-year-old."
    }
  });
  return response.text;
};

export const speakText = async (text: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Kore' },
        },
      },
    },
  });

  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (base64Audio) {
    return base64Audio;
  }
  throw new Error("Could not generate audio");
};

export function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export async function playPCM(base64Data: string) {
  const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
  const data = decodeBase64(base64Data);
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length;
  const buffer = audioCtx.createBuffer(1, frameCount, 24000);
  const channelData = buffer.getChannelData(0);
  for (let i = 0; i < frameCount; i++) {
    channelData[i] = dataInt16[i] / 32768.0;
  }
  const source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.connect(audioCtx.destination);
  source.start();
}
