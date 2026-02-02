
import React, { useState } from 'react';
import { askMascot } from '../services/geminiService';

const AskBox: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setLoading(true);
    try {
      const result = await askMascot(question);
      setAnswer(result);
    } catch (error) {
      setAnswer("ওহ না! বানি এখন গাজর খাচ্ছে, একটু পরে আবার চেষ্টা করো। 🥕🐰");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-10 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
         <div className="absolute top-10 right-10 text-8xl">✨</div>
         <div className="absolute bottom-10 left-10 text-6xl">💬</div>
      </div>
      
      <h2 className="text-4xl font-black mb-4 flex items-center gap-3">
        <span className="bg-white/20 p-2 rounded-xl">❓</span> বানিকে বলো
      </h2>
      <p className="mb-8 text-xl font-medium text-white/90">
        তোমার মনে কি কোনো প্রশ্ন আছে? বানিকে জিজ্ঞেস করো!
      </p>
      
      <form onSubmit={handleSubmit} className="relative group">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="এখানে তোমার প্রশ্ন লেখো..."
          className="w-full p-6 pr-40 rounded-3xl text-gray-800 font-bold focus:outline-none focus:ring-8 focus:ring-white/20 text-xl shadow-2xl placeholder:text-gray-300"
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute right-3 top-3 bottom-3 bg-yellow-400 text-purple-900 px-8 rounded-2xl font-black text-lg hover:bg-yellow-300 transition-all active:scale-95 disabled:opacity-50 shadow-lg"
        >
          {loading ? 'ভাবছি...' : 'জিজ্ঞেস করো'}
        </button>
      </form>

      {answer && (
        <div className="mt-10 bg-white/20 backdrop-blur-xl p-8 rounded-[2rem] border-2 border-white/30 animate-[fadeIn_0.5s_ease-out] relative">
          <div className="absolute -top-4 left-10 bg-white text-purple-700 px-4 py-1 rounded-full text-xs font-black uppercase">বানির উত্তর</div>
          <p className="text-xl font-bold leading-relaxed whitespace-pre-wrap italic">
            "{answer}"
          </p>
        </div>
      )}
    </div>
  );
};

export default AskBox;
