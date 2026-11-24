
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchInterval?: number;
  intensity?: 'low' | 'medium' | 'high';
  pixelated?: boolean;
  rgbShift?: boolean;
}

const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  className,
  glitchInterval = 3000,
  intensity = 'medium',
  pixelated = false,
  rgbShift = false
}) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [randomOffset, setRandomOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const randomGlitch = () => {
      // Random chance to trigger a glitch
      if (Math.random() > 0.6) {
        // Generate random offset for more dynamic effect
        setRandomOffset({
          x: (Math.random() * 4) - 2,
          y: (Math.random() * 2) - 1
        });
        setIsGlitching(true);
        
        // Reset after short duration
        setTimeout(() => setIsGlitching(false), 350);
      }
    };

    const intervalId = setInterval(randomGlitch, glitchInterval);
    return () => clearInterval(intervalId);
  }, [glitchInterval]);

  let glitchClass = '';
  
  // Base glitch effect
  if (isGlitching) {
    switch (intensity) {
      case 'low':
        glitchClass = 'relative animate-glitch';
        break;
      case 'high':
        glitchClass = 'relative animate-glitch-intense';
        break;
      default: // medium
        glitchClass = 'relative animate-glitch-medium';
    }
    
    // Add RGB shift effect
    if (rgbShift) {
      glitchClass += ' before:content-[attr(data-text)] before:absolute before:left-[2px] before:text-white before:bg-zogago-pink before:bg-clip-text before:opacity-70 after:content-[attr(data-text)] after:absolute after:left-[-2px] after:text-white after:bg-zogago-blue after:bg-clip-text after:opacity-70';
    }
    
    // Add pixelation effect
    if (pixelated) {
      glitchClass += ' glitch-pixelate';
    }
  }

  const glitchStyle = isGlitching ? {
    transform: `translate(${randomOffset.x}px, ${randomOffset.y}px)`,
    textShadow: rgbShift ? `0.05em 0 0 rgba(255,0,0,0.75), -0.025em -0.05em 0 rgba(0,255,0,0.75), 0.025em 0.05em 0 rgba(0,0,255,0.75)` : undefined,
    clipPath: pixelated ? `polygon(${Math.random() * 1}% ${Math.random() * 100}%, ${100 - Math.random() * 1}% ${Math.random() * 100}%, ${100 - Math.random() * 1}% ${100 - Math.random() * 1}%, ${Math.random() * 1}% ${100 - Math.random() * 1}%)` : undefined
  } : {};

  return (
    <span 
      className={cn(className, glitchClass)}
      data-text={text}
      style={glitchStyle}
    >
      {text}
    </span>
  );
};

export default GlitchText;
