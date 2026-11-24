
import React, { useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface MarqueeTextProps {
  text: string;
  className?: string;
  speed?: 'slow' | 'medium' | 'fast';
  direction?: 'left' | 'right';
  gap?: number;
  repeat?: number;
}

const MarqueeText: React.FC<MarqueeTextProps> = ({
  text,
  className,
  speed = 'medium',
  direction = 'left',
  gap = 40,
  repeat = 4
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  // Calculate animation duration based on speed
  const getDuration = () => {
    switch (speed) {
      case 'slow': return 30;
      case 'fast': return 10;
      default: return 20;
    }
  };

  // Set up the marquee text
  useEffect(() => {
    if (!textRef.current || !containerRef.current) return;
    
    const container = containerRef.current;
    
    // Set CSS variables for the animation
    container.style.setProperty('--marquee-duration', `${getDuration()}s`);
    container.style.setProperty('--marquee-direction', direction === 'right' ? 'normal' : 'reverse');
    
  }, [speed, direction]);

  // Generate repeated text with appropriate spacing
  const repeatedText = Array(repeat).fill(text).join(`\u00A0\u00A0\u00A0\u00A0`);

  return (
    <div
      ref={containerRef}
      className={cn(
        "overflow-hidden whitespace-nowrap",
        className
      )}
    >
      <div 
        ref={textRef}
        className="inline-block animate-marquee"
        style={{
          animationDuration: `var(--marquee-duration)`,
          animationDirection: `var(--marquee-direction)`,
        }}
      >
        {repeatedText}
      </div>
    </div>
  );
};

export default MarqueeText;
