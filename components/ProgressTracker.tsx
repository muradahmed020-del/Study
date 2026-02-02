
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { day: 'শনি', score: 20 },
  { day: 'রবি', score: 35 },
  { day: 'সোম', score: 30 },
  { day: 'মঙ্গল', score: 55 },
  { day: 'বুধ', score: 70 },
  { day: 'বৃহঃ', score: 65 },
  { day: 'শুক্র', score: 90 },
];

const ProgressTracker: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl border-4 border-blue-100">
      <h2 className="text-xl font-bold text-blue-600 mb-4 flex items-center">
        📈 তোমার সাফল্যের গ্রাফ
      </h2>
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip />
            <Area type="monotone" dataKey="score" stroke="#3b82f6" fillOpacity={1} fill="url(#colorScore)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p className="text-center text-sm text-gray-500 mt-2">
        সাবাস! তুমি প্রতিদিন আরও ভালো করছো। 🌟
      </p>
    </div>
  );
};

export default ProgressTracker;
