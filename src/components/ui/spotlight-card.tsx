import React, { ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
}

const GlowCard: React.FC<GlowCardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`relative rounded-2xl overflow-visible ${className}`}
      style={{ padding: '1px' }}
    >
      {/* Neon border glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #1FB6FA 0%, #9b59b6 40%, #E040FB 70%, #1FB6FA 100%)',
          opacity: 0.6,
          filter: 'blur(1px)',
        }}
      />
      {/* Outer glow */}
      <div
        className="absolute inset-[-2px] rounded-2xl pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #1FB6FA 0%, #9b59b6 40%, #E040FB 70%, #1FB6FA 100%)',
          opacity: 0.15,
          filter: 'blur(8px)',
        }}
      />
      {/* Inner content background */}
      <div className={`relative rounded-2xl bg-[#0a0a1a]/95 backdrop-blur-sm z-[1] ${className}`}>
        {children}
      </div>
    </div>
  );
};

export { GlowCard };
