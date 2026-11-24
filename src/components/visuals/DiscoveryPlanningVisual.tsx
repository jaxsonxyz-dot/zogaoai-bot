import React from 'react';

const DiscoveryPlanningVisual = () => {
  return (
    <div className="relative w-full h-full min-h-[200px] rounded-lg overflow-hidden flex items-center justify-center" style={{ perspective: '800px' }}>
      {/* 3D Rotating Container */}
      <div 
        className="relative w-full h-full animate-[float_6s_ease-in-out_infinite]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Background glow orbs */}
        <div className="absolute inset-0 bg-gradient-to-br from-zogago-dark via-zogago-blue/10 to-zogago-purple/10 rounded-lg" />
        
        {/* 3D Floating card layer 1 - back */}
        <div 
          className="absolute top-4 left-4 w-24 h-16 rounded-lg bg-gradient-to-br from-zogago-blue/20 to-zogago-purple/10 border border-zogago-blue/30 backdrop-blur-sm animate-[pulse_3s_ease-in-out_infinite]"
          style={{ transform: 'rotateY(-15deg) rotateX(5deg) translateZ(-20px)' }}
        >
          <div className="p-2 space-y-1">
            <div className="w-12 h-1.5 rounded bg-zogago-blue/40" />
            <div className="w-8 h-1.5 rounded bg-zogago-purple/40" />
            <div className="w-10 h-1.5 rounded bg-zogago-blue/30" />
          </div>
        </div>

        {/* 3D Floating card layer 2 - middle */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-24 rounded-xl bg-gradient-to-br from-zogago-purple/15 to-zogago-pink/10 border border-zogago-purple/20 backdrop-blur-sm shadow-lg shadow-zogago-purple/10"
          style={{ transform: 'translate(-50%, -50%) rotateY(8deg) rotateX(-5deg) translateZ(20px)', transformStyle: 'preserve-3d' }}
        >
          <div className="p-3 space-y-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-zogago-blue/60 animate-[pulse_2s_ease-in-out_infinite]" />
              <div className="w-2 h-2 rounded-full bg-zogago-purple/60 animate-[pulse_2.5s_ease-in-out_infinite]" />
              <div className="w-2 h-2 rounded-full bg-zogago-pink/60 animate-[pulse_3s_ease-in-out_infinite]" />
            </div>
            <div className="w-full h-1 rounded bg-zogago-blue/30" />
            <div className="w-3/4 h-1 rounded bg-zogago-purple/30" />
            <div className="w-1/2 h-1 rounded bg-zogago-pink/30" />
          </div>
        </div>

        {/* 3D Floating card layer 3 - front */}
        <div 
          className="absolute bottom-4 right-4 w-20 h-14 rounded-lg bg-gradient-to-br from-zogago-pink/15 to-zogago-blue/10 border border-zogago-pink/25 backdrop-blur-sm animate-[pulse_4s_ease-in-out_infinite]"
          style={{ transform: 'rotateY(12deg) rotateX(-8deg) translateZ(40px)' }}
        >
          <div className="p-2 flex items-center justify-center h-full">
            <div className="w-8 h-8 rounded-full border-2 border-zogago-blue/40 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-zogago-blue/50 animate-[ping_2s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>

        {/* Connecting lines with glow */}
        <svg className="absolute inset-0 w-full h-full" style={{ transform: 'translateZ(10px)' }}>
          <line x1="30%" y1="25%" x2="50%" y2="50%" stroke="url(#disc3dGrad1)" strokeWidth="1" strokeDasharray="4,4" opacity="0.4" className="animate-[pulse_3s_ease-in-out_infinite]" />
          <line x1="50%" y1="50%" x2="75%" y2="75%" stroke="url(#disc3dGrad2)" strokeWidth="1" strokeDasharray="4,4" opacity="0.4" className="animate-[pulse_3.5s_ease-in-out_infinite]" />
          <defs>
            <linearGradient id="disc3dGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0EA5E9" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <linearGradient id="disc3dGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating particles */}
        <div className="absolute top-1/4 right-1/4 w-1.5 h-1.5 rounded-full bg-zogago-blue/60 animate-[ping_3s_ease-in-out_infinite]" style={{ transform: 'translateZ(30px)' }} />
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 rounded-full bg-zogago-purple/60 animate-[ping_4s_ease-in-out_infinite]" style={{ transform: 'translateZ(25px)' }} />
        <div className="absolute top-1/3 left-1/4 w-1.5 h-1.5 rounded-full bg-zogago-pink/50 animate-[ping_3.5s_ease-in-out_infinite]" style={{ transform: 'translateZ(35px)' }} />
      </div>
    </div>
  );
};

export default DiscoveryPlanningVisual;
