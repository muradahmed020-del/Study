
import React, { useRef, useEffect, useState } from 'react';

const DrawingBoard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#ef4444');
  const [lineWidth, setLineWidth] = useState(8);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas resolution for crisp lines
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [color, lineWidth]);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const ctx = canvasRef.current?.getContext('2d');
    ctx?.beginPath();
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : (e as React.MouseEvent).clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : (e as React.MouseEvent).clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
  };

  const colors = [
    { name: 'Red', val: '#ef4444' },
    { name: 'Orange', val: '#f97316' },
    { name: 'Yellow', val: '#eab308' },
    { name: 'Green', val: '#22c55e' },
    { name: 'Blue', val: '#3b82f6' },
    { name: 'Purple', val: '#a855f7' },
    { name: 'Pink', val: '#ec4899' },
    { name: 'Black', val: '#1f2937' },
  ];

  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-2xl border-4 border-emerald-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-black text-emerald-600 flex items-center gap-3">
          🎨 জাদুর বোর্ড
        </h2>
        <div className="flex gap-2 bg-emerald-50 p-2 rounded-2xl">
          {colors.map(c => (
            <button
              key={c.val}
              onClick={() => setColor(c.val)}
              className={`w-10 h-10 rounded-xl shadow-sm transition-all transform active:scale-90 ${color === c.val ? 'ring-4 ring-emerald-300 scale-110' : 'hover:scale-105'}`}
              style={{ backgroundColor: c.val }}
            />
          ))}
        </div>
      </div>

      <div className="relative group">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-[400px] bg-white rounded-3xl cursor-crosshair border-4 border-dashed border-emerald-100 shadow-inner"
        />
        <div className="absolute top-4 right-4 flex flex-col gap-4">
           <div className="bg-white/90 backdrop-blur p-4 rounded-2xl shadow-xl border border-emerald-100">
             <label className="text-xs font-bold text-emerald-700 block mb-2">পেন্সিল মোটা</label>
             <input 
              type="range" 
              min="2" 
              max="30" 
              value={lineWidth} 
              onChange={(e) => setLineWidth(Number(e.target.value))}
              className="accent-emerald-500 h-2 rounded-lg cursor-pointer"
            />
           </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center">
        <button 
          onClick={clear} 
          className="group bg-red-50 text-red-600 px-8 py-3 rounded-2xl font-bold shadow-sm hover:bg-red-500 hover:text-white transition-all flex items-center gap-2"
        >
          <span>🧹</span> সব মুছে ফেলো
        </button>
        <div className="flex gap-4">
          <button className="bg-emerald-500 text-white px-8 py-3 rounded-2xl font-black shadow-lg hover:bg-emerald-600 hover:-translate-y-1 transition-all active:translate-y-0">
            সেভ করো 📁
          </button>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black shadow-lg hover:bg-blue-700 hover:-translate-y-1 transition-all active:translate-y-0 flex items-center gap-2">
            শেয়ার করো 🚀
          </button>
        </div>
      </div>
    </div>
  );
};

export default DrawingBoard;
