import React from 'react';

const DevelopmentVisual = () => {
  return (
    <div className="relative w-full h-full min-h-[200px] rounded-lg overflow-hidden flex items-center justify-center" style={{ perspective: '900px' }}>
      <div className="absolute inset-0 bg-gradient-to-br from-zogago-dark via-zogago-pink/10 to-blue-500/10 rounded-lg" />
      
      <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
        {/* 3D Code Editor Window */}
        <div 
          className="absolute top-4 left-[10%] w-[75%] h-[80%] rounded-xl border border-zogago-pink/25 bg-black/40 backdrop-blur-sm shadow-2xl shadow-zogago-pink/10 animate-[float_5s_ease-in-out_infinite]"
          style={{ transform: 'rotateY(-8deg) rotateX(4deg) translateZ(15px)', transformStyle: 'preserve-3d' }}
        >
          {/* Window header */}
          <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5 bg-white/3 rounded-t-xl">
            <div className="w-2 h-2 rounded-full bg-red-400/70" />
            <div className="w-2 h-2 rounded-full bg-yellow-400/70" />
            <div className="w-2 h-2 rounded-full bg-green-400/70" />
            <div className="ml-3 w-20 h-2 rounded bg-white/10" />
          </div>
          
          {/* Code content with 3D depth */}
          <div className="p-3 space-y-2" style={{ transform: 'translateZ(5px)' }}>
            <div className="flex gap-2 items-center">
              <span className="text-[8px] text-zogago-blue/50 font-mono">1</span>
              <div className="w-16 h-1.5 rounded bg-zogago-blue/40 animate-[pulse_2s_ease-in-out_infinite]" />
              <div className="w-10 h-1.5 rounded bg-zogago-purple/30" />
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-[8px] text-zogago-blue/50 font-mono">2</span>
              <div className="w-4 h-1.5 rounded bg-transparent" />
              <div className="w-24 h-1.5 rounded bg-zogago-purple/40 animate-[pulse_2.5s_ease-in-out_infinite]" />
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-[8px] text-zogago-blue/50 font-mono">3</span>
              <div className="w-4 h-1.5 rounded bg-transparent" />
              <div className="w-20 h-1.5 rounded bg-zogago-pink/40 animate-[pulse_3s_ease-in-out_infinite]" />
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-[8px] text-zogago-blue/50 font-mono">4</span>
              <div className="w-28 h-1.5 rounded bg-cyan-400/30 animate-[pulse_2.2s_ease-in-out_infinite]" />
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-[8px] text-zogago-blue/50 font-mono">5</span>
              <div className="w-4 h-1.5 rounded bg-transparent" />
              <div className="w-20 h-1.5 rounded bg-zogago-purple/35 animate-[pulse_2.8s_ease-in-out_infinite]" />
              {/* Blinking cursor */}
              <div className="w-0.5 h-2.5 bg-green-400/80 animate-[pulse_1s_ease-in-out_infinite]" />
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-[8px] text-zogago-blue/50 font-mono">6</span>
              <div className="w-14 h-1.5 rounded bg-zogago-blue/35 animate-[pulse_3.2s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>

        {/* 3D Floating Terminal */}
        <div 
          className="absolute bottom-3 right-3 w-[35%] h-[30%] rounded-lg border border-cyan-400/20 bg-black/50 backdrop-blur-sm shadow-lg shadow-cyan-400/5 animate-[float_4s_ease-in-out_infinite]"
          style={{ transform: 'rotateY(12deg) rotateX(-6deg) translateZ(35px)' }}
        >
          <div className="p-2 space-y-1">
            <div className="flex gap-1 items-center">
              <div className="w-1.5 h-1.5 text-[6px] text-green-400/70">▶</div>
              <div className="w-12 h-1 rounded bg-green-400/30" />
            </div>
            <div className="w-16 h-1 rounded bg-cyan-400/20" />
            <div className="w-10 h-1 rounded bg-green-400/25 animate-[pulse_2s_ease-in-out_infinite]" />
          </div>
        </div>

        {/* 3D Gear */}
        <div 
          className="absolute top-3 right-3 w-10 h-10 animate-[spin_8s_linear_infinite]"
          style={{ transform: 'translateZ(25px)' }}
        >
          <svg viewBox="0 0 40 40" className="w-full h-full opacity-40">
            <circle cx="20" cy="20" r="10" fill="none" stroke="#6366f1" strokeWidth="2" />
            <circle cx="20" cy="20" r="5" fill="none" stroke="#6366f1" strokeWidth="1.5" />
            <rect x="17" y="2" width="6" height="5" rx="1" fill="#6366f1" />
            <rect x="17" y="33" width="6" height="5" rx="1" fill="#6366f1" />
            <rect x="2" y="17" width="5" height="6" rx="1" fill="#6366f1" />
            <rect x="33" y="17" width="5" height="6" rx="1" fill="#6366f1" />
          </svg>
        </div>

        {/* Floating code symbols */}
        <div className="absolute top-1/4 left-2 text-zogago-purple/25 text-lg font-mono animate-[float_3s_ease-in-out_infinite]" style={{ transform: 'translateZ(20px)' }}>{"{ }"}</div>
        <div className="absolute bottom-1/4 left-2 text-zogago-pink/25 text-lg font-mono animate-[float_4s_ease-in-out_infinite]" style={{ transform: 'translateZ(15px)' }}>{"< />"}</div>
      </div>
    </div>
  );
};

export default DevelopmentVisual;
