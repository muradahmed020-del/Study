
import React, { useState } from 'react';
import { speakText, playPCM } from '../services/geminiService';

interface MascotProps {
  message: string;
}

const Mascot: React.FC<MascotProps> = ({ message }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = async () => {
    if (isSpeaking) return;
    setIsSpeaking(true);
    try {
      const audioData = await speakText(message);
      await playPCM(audioData);
    } catch (e) {
      console.error("TTS failed", e);
    } finally {
      setIsSpeaking(false);
    }
  };

  return (
    <div className="flex items-end space-x-4 mb-8">
      <div className="relative cursor-pointer group animate-float" onClick={handleSpeak}>
        <div className={`absolute -inset-2 bg-pink-200 rounded-full blur-xl transition-opacity duration-500 ${isSpeaking ? 'opacity-70 scale-125' : 'opacity-20'}`}></div>
        <div className="relative">
          <img 
            src="https://api.dicebear.com/7.x/adventurer/svg?seed=Bunny&backgroundColor=b6e3f4" 
            alt="Mascot Bunny" 
            className={`w-28 h-28 rounded-3xl border-4 ${isSpeaking ? 'border-pink-400' : 'border-white'} shadow-2xl object-cover transition-all duration-300 transform group-hover:scale-105`}
          />
          <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-purple-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg border-2 border-white">
            বানি 🐰
          </div>
        </div>
        {/* Speaker Icon Overlay */}
        <div className="absolute top-0 right-0 bg-white p-2 rounded-full text-sm shadow-xl border border-pink-100">
          {isSpeaking ? '🔊' : '🔈'}
        </div>
      </div>
      <div className="bg-white p-5 rounded-3xl rounded-bl-none shadow-xl max-w-sm border-2 border-pink-50 relative group">
        <div className="absolute -left-2 bottom-0 w-4 h-4 bg-white border-l-2 border-b-2 border-pink-50 transform rotate-45"></div>
        <p className="text-gray-800 text-base md:text-lg font-medium leading-relaxed">
          {message}
        </p>
        <button 
          onClick={handleSpeak}
          className="mt-3 inline-flex items-center text-xs text-pink-500 font-extrabold uppercase tracking-widest hover:text-pink-600 transition-colors"
        >
          {isSpeaking ? (
            <>
              <span className="w-2 h-2 bg-pink-500 rounded-full animate-bounce mr-2"></span>
              কথা বলছি...
            </>
          ) : 'শুনতে চাও? 🔊'}
        </button>
      </div>
    </div>
  );
};

export default Mascot;
