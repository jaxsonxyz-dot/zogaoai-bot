import React from 'react';

const DesignMockupsVisual = () => {
  return (
    <div className="relative w-full h-full min-h-[200px] rounded-lg overflow-hidden flex items-center justify-center" style={{ perspective: '1000px' }}>
      <div className="absolute inset-0 bg-gradient-to-br from-zogago-dark via-zogago-purple/10 to-zogago-pink/10 rounded-lg" />

      {/* 3D Device Stack */}
      <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
        
        {/* Desktop Monitor - Back layer */}
        <div 
          className="absolute top-3 left-3 w-[55%] h-[65%] rounded-lg border border-zogago-purple/30 bg-gradient-to-b from-zogago-purple/10 to-transparent backdrop-blur-sm shadow-xl shadow-zogago-purple/10 animate-[float_4s_ease-in-out_infinite]"
          style={{ transform: 'rotateY(-12deg) rotateX(5deg) translateZ(-10px)', transformStyle: 'preserve-3d' }}
        >
          {/* Screen header */}
          <div className="flex gap-1 p-2 border-b border-white/5">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-green-400/60" />
          </div>
          {/* Screen content */}
          <div className="p-2 space-y-1.5">
            <div className="w-full h-8 rounded bg-gradient-to-r from-zogago-purple/20 to-zogago-blue/10 animate-[pulse_3s_ease-in-out_infinite]" />
            <div className="flex gap-1">
              <div className="w-1/3 h-6 rounded bg-zogago-blue/15" />
              <div className="w-1/3 h-6 rounded bg-zogago-purple/15" />
              <div className="w-1/3 h-6 rounded bg-zogago-pink/15" />
            </div>
            <div className="w-3/4 h-1 rounded bg-white/10" />
            <div className="w-1/2 h-1 rounded bg-white/8" />
          </div>
          {/* Monitor stand */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-3 bg-zogago-purple/20 rounded-b" style={{ transform: 'translateZ(-5px)' }} />
        </div>

        {/* Tablet - Middle layer */}
        <div 
          className="absolute top-[20%] right-[15%] w-[30%] h-[55%] rounded-xl border border-zogago-pink/25 bg-gradient-to-b from-zogago-pink/10 to-transparent backdrop-blur-sm shadow-lg shadow-zogago-pink/10 animate-[float_5s_ease-in-out_infinite]"
          style={{ transform: 'rotateY(10deg) rotateX(-3deg) translateZ(20px)' }}
        >
          <div className="p-2 space-y-1.5 mt-2">
            <div className="w-full h-4 rounded bg-gradient-to-r from-zogago-pink/20 to-zogago-purple/10 animate-[pulse_3.5s_ease-in-out_infinite]" />
            <div className="w-full h-6 rounded bg-zogago-pink/10" />
            <div className="w-3/4 h-1 rounded bg-white/8" />
          </div>
        </div>

        {/* Phone - Front layer */}
        <div 
          className="absolute bottom-3 right-3 w-[18%] h-[45%] rounded-xl border border-zogago-blue/30 bg-gradient-to-b from-zogago-blue/15 to-transparent backdrop-blur-sm shadow-lg shadow-zogago-blue/15 animate-[float_3.5s_ease-in-out_infinite]"
          style={{ transform: 'rotateY(-8deg) rotateX(6deg) translateZ(40px)' }}
        >
          <div className="p-1.5 space-y-1 mt-1">
            <div className="w-full h-3 rounded bg-zogago-blue/20 animate-[pulse_2.5s_ease-in-out_infinite]" />
            <div className="w-full h-5 rounded bg-zogago-blue/10" />
          </div>
        </div>

        {/* Color palette floating orbs */}
        <div className="absolute bottom-4 left-4 flex gap-2" style={{ transform: 'translateZ(30px)' }}>
          <div className="w-4 h-4 rounded-full bg-zogago-blue/50 shadow-lg shadow-zogago-blue/20 animate-[pulse_2s_ease-in-out_infinite]" />
          <div className="w-4 h-4 rounded-full bg-zogago-purple/50 shadow-lg shadow-zogago-purple/20 animate-[pulse_2.5s_ease-in-out_infinite]" />
          <div className="w-4 h-4 rounded-full bg-zogago-pink/50 shadow-lg shadow-zogago-pink/20 animate-[pulse_3s_ease-in-out_infinite]" />
        </div>

        {/* Floating grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <line x1="33%" y1="0" x2="33%" y2="100%" stroke="#8B5CF6" strokeWidth="0.5" strokeDasharray="3,6" />
          <line x1="66%" y1="0" x2="66%" y2="100%" stroke="#8B5CF6" strokeWidth="0.5" strokeDasharray="3,6" />
        </svg>
      </div>
    </div>
  );
};

export default DesignMockupsVisual;
