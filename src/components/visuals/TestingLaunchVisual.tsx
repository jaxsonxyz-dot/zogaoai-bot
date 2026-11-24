import React from 'react';

const TestingLaunchVisual = () => {
  return (
    <div className="relative w-full h-full min-h-[200px] rounded-lg overflow-hidden flex items-center justify-center" style={{ perspective: '800px' }}>
      <div className="absolute inset-0 bg-gradient-to-br from-zogago-dark via-blue-500/10 to-cyan-500/10 rounded-lg" />

      <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
        {/* 3D Rocket */}
        <div 
          className="absolute top-[15%] left-1/2 -translate-x-1/2 animate-[float_3s_ease-in-out_infinite]"
          style={{ transform: 'translateX(-50%) rotateY(10deg) translateZ(30px)', transformStyle: 'preserve-3d' }}
        >
          <svg width="60" height="100" viewBox="0 0 60 100">
            <defs>
              <linearGradient id="rocket3dGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
              <filter id="rocketGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path d="M 30 5 L 15 55 L 45 55 Z" fill="url(#rocket3dGrad)" stroke="#3b82f6" strokeWidth="1.5" filter="url(#rocketGlow)" />
            <circle cx="30" cy="30" r="5" fill="#06b6d4" opacity="0.9" />
            <path d="M 15 45 L 5 55 L 15 55 Z" fill="#ec4899" opacity="0.7" />
            <path d="M 45 45 L 55 55 L 45 55 Z" fill="#ec4899" opacity="0.7" />
            {/* Exhaust */}
            <ellipse cx="30" cy="62" rx="10" ry="12" fill="#f59e0b" opacity="0.5" className="animate-[pulse_0.5s_ease-in-out_infinite]" />
            <ellipse cx="30" cy="70" rx="7" ry="8" fill="#ef4444" opacity="0.4" className="animate-[pulse_0.7s_ease-in-out_infinite]" />
          </svg>
        </div>

        {/* 3D Checklist panel */}
        <div 
          className="absolute left-3 top-[25%] w-[30%] rounded-lg border border-green-400/20 bg-black/30 backdrop-blur-sm p-2 space-y-2 shadow-lg shadow-green-400/5"
          style={{ transform: 'rotateY(15deg) rotateX(-3deg) translateZ(15px)' }}
        >
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded border border-green-400/50 flex items-center justify-center animate-[scale-in_${i}s_ease-in-out]`}>
                <svg width="8" height="8" viewBox="0 0 8 8">
                  <path d="M 1 4 L 3 6 L 7 2" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div className={`h-1 rounded bg-green-400/20`} style={{ width: `${60 + i * 10}%` }} />
            </div>
          ))}
        </div>

        {/* 3D Status dashboard */}
        <div 
          className="absolute right-3 top-[30%] w-[25%] rounded-lg border border-zogago-blue/20 bg-black/30 backdrop-blur-sm p-2 space-y-2 shadow-lg shadow-zogago-blue/5"
          style={{ transform: 'rotateY(-12deg) rotateX(4deg) translateZ(20px)' }}
        >
          {['#10b981', '#10b981', '#3b82f6'].map((color, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full animate-[pulse_${2 + i * 0.5}s_ease-in-out_infinite]`} style={{ backgroundColor: color }} />
              <div className="h-0.5 flex-1 rounded bg-white/10" />
            </div>
          ))}
        </div>

        {/* Sparkles */}
        <div className="absolute top-[10%] left-[25%] w-2 h-2 animate-[ping_2s_ease-in-out_infinite]" style={{ transform: 'translateZ(25px)' }}>
          <svg viewBox="0 0 10 10" className="w-full h-full">
            <path d="M5 0 L5.5 3.5 L9 5 L5.5 6.5 L5 10 L4.5 6.5 L1 5 L4.5 3.5Z" fill="#fbbf24" opacity="0.6" />
          </svg>
        </div>
        <div className="absolute top-[8%] right-[20%] w-2 h-2 animate-[ping_3s_ease-in-out_infinite]" style={{ transform: 'translateZ(20px)' }}>
          <svg viewBox="0 0 10 10" className="w-full h-full">
            <path d="M5 0 L5.5 3.5 L9 5 L5.5 6.5 L5 10 L4.5 6.5 L1 5 L4.5 3.5Z" fill="#06b6d4" opacity="0.6" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TestingLaunchVisual;
