import React from 'react';

const MaintenanceVisual = () => {
  return (
    <div className="relative w-full h-full min-h-[200px] rounded-lg overflow-hidden flex items-center justify-center" style={{ perspective: '900px' }}>
      <div className="absolute inset-0 bg-gradient-to-br from-zogago-dark via-cyan-500/10 to-blue-500/10 rounded-lg" />

      <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
        {/* 3D Server Stack */}
        <div 
          className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[45%] space-y-1.5 animate-[float_5s_ease-in-out_infinite]"
          style={{ transform: 'translateX(-50%) rotateY(-8deg) rotateX(10deg) translateZ(15px)', transformStyle: 'preserve-3d' }}
        >
          {[0, 1, 2].map((i) => (
            <div 
              key={i} 
              className="w-full h-8 rounded border border-cyan-400/25 bg-black/30 backdrop-blur-sm flex items-center px-2 gap-1.5 shadow-md shadow-cyan-400/5"
              style={{ transform: `translateZ(${i * 5}px)` }}
            >
              <div className={`w-1.5 h-1.5 rounded-full bg-green-400/70 animate-[pulse_${1 + i * 0.5}s_ease-in-out_infinite]`} />
              <div className={`w-1.5 h-1.5 rounded-full ${i === 1 ? 'bg-blue-400/70' : 'bg-green-400/70'} animate-[pulse_${1.5 + i * 0.5}s_ease-in-out_infinite]`} />
              <div className="flex-1" />
              <div className="w-6 h-1 rounded bg-cyan-400/20" />
            </div>
          ))}
        </div>

        {/* 3D Shield */}
        <div 
          className="absolute left-3 bottom-[25%] w-12 h-14"
          style={{ transform: 'rotateY(20deg) translateZ(25px)' }}
        >
          <svg viewBox="0 0 40 50" className="w-full h-full">
            <defs>
              <linearGradient id="shield3dGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <path d="M 20 2 L 5 12 L 5 30 Q 5 42 20 48 Q 35 42 35 30 L 35 12 Z" fill="url(#shield3dGrad)" stroke="#10b981" strokeWidth="1.5" opacity="0.7" />
            <path d="M 13 25 L 18 30 L 28 18" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
          </svg>
        </div>

        {/* 3D Rotating Gear */}
        <div 
          className="absolute right-4 bottom-[20%] w-14 h-14 animate-[spin_6s_linear_infinite]"
          style={{ transform: 'translateZ(30px)' }}
        >
          <svg viewBox="0 0 50 50" className="w-full h-full opacity-50">
            <circle cx="25" cy="25" r="12" fill="none" stroke="#6366f1" strokeWidth="2.5" />
            <circle cx="25" cy="25" r="6" fill="none" stroke="#6366f1" strokeWidth="2" />
            {[0, 90, 180, 270].map((angle) => (
              <rect
                key={angle}
                x="22" y="3" width="6" height="8" rx="1.5" fill="#6366f1"
                transform={`rotate(${angle} 25 25)`}
              />
            ))}
          </svg>
        </div>

        {/* Spinning refresh arrows */}
        <div 
          className="absolute top-[15%] right-[15%] w-10 h-10 animate-[spin_4s_linear_infinite]"
          style={{ transform: 'translateZ(20px)' }}
        >
          <svg viewBox="0 0 30 30" className="w-full h-full opacity-40">
            <path d="M 22 15 A 7 7 0 0 1 15 22" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" />
            <path d="M 8 15 A 7 7 0 0 1 15 8" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" />
            <polygon points="22,12 22,18 26,15" fill="#8b5cf6" opacity="0.6" />
            <polygon points="8,18 8,12 4,15" fill="#ec4899" opacity="0.6" />
          </svg>
        </div>

        {/* Monitoring wave */}
        <svg className="absolute bottom-2 left-0 w-full h-8 opacity-30">
          <path d="M 0 15 Q 30 5 60 15 T 120 15 T 180 15 T 240 15 T 300 15" fill="none" stroke="#06b6d4" strokeWidth="1.5" className="animate-[pulse_2s_ease-in-out_infinite]" />
        </svg>
      </div>
    </div>
  );
};

export default MaintenanceVisual;
