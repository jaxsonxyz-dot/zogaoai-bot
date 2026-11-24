
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Define a type for the allowed position values
type Position = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';

interface BeamLightProps {
  color?: string;
  className?: string;
  intensity?: number;
  speed?: number;
  vertical?: boolean;
  width?: string;
  height?: string;
  position?: Position;
  animationDirection?: 'up-down' | 'left-right' | 'none';
  animationDistance?: number;
}

const BeamLight: React.FC<BeamLightProps> = ({
  color = "#1FB6FA",
  className = "",
  intensity = 0.7,
  speed = 2.5,
  vertical = true,
  width = "100%",
  height = vertical ? "2px" : "100%",
  position = "absolute",
  animationDirection = "none",
  animationDistance = 25
}) => {
  const beamRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!beamRef.current) return;
    
    // Create the animation
    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    // Determine the animation type based on direction prop
    if (animationDirection === "up-down") {
      tl.to(beamRef.current, {
        y: `-${animationDistance}px`,
        duration: speed,
        ease: "sine.inOut"
      }).to(beamRef.current, {
        y: `${animationDistance}px`,
        duration: speed,
        ease: "sine.inOut"
      });
    } else if (animationDirection === "left-right") {
      tl.to(beamRef.current, {
        x: `-${animationDistance/2}px`,
        duration: speed,
        ease: "sine.inOut"
      }).to(beamRef.current, {
        x: `${animationDistance/2}px`,
        duration: speed,
        ease: "sine.inOut"
      });
    } else if (vertical) {
      // Original vertical animation logic
      tl.to(beamRef.current, {
        y: "-25px",
        duration: speed,
        ease: "sine.inOut"
      }).to(beamRef.current, {
        y: "25px",
        duration: speed,
        ease: "sine.inOut"
      });
    } else {
      // Original horizontal animation logic
      tl.to(beamRef.current, {
        x: "-15px",
        duration: speed,
        ease: "sine.inOut"
      }).to(beamRef.current, {
        x: "15px",
        duration: speed,
        ease: "sine.inOut"
      });
    }
    
    // Add a slight intensity fluctuation
    gsap.to(beamRef.current, {
      opacity: intensity - 0.2,
      duration: speed / 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    return () => {
      tl.kill();
    };
  }, [intensity, speed, vertical, animationDirection, animationDistance]);
  
  return (
    <div className={`relative ${className}`} style={{ position }}>
      <div 
        ref={beamRef}
        className="absolute z-0 pointer-events-none"
        style={{
          width: vertical ? width : '30px',
          height: vertical ? height : '100%',
          background: `linear-gradient(${vertical ? '90deg' : '0deg'}, 
            rgba(0,0,0,0) 0%, 
            ${color} 50%, 
            rgba(0,0,0,0) 100%)`,
          filter: `blur(12px) brightness(1.5)`, // Increased blur and brightness
          opacity: intensity
        }}
      />
      <div
        className="absolute z-0 pointer-events-none"
        style={{
          width: vertical ? '70%' : '2px', // Increased width for more visibility
          height: vertical ? '1px' : '70%',
          left: vertical ? '15%' : '50%', // Centered
          top: vertical ? '50%' : '15%',
          background: `linear-gradient(${vertical ? '90deg' : '0deg'}, 
            rgba(0,0,0,0) 0%, 
            ${color} 50%, 
            rgba(0,0,0,0) 100%)`,
          filter: `blur(6px) brightness(2.0)`, // Increased blur and brightness
          opacity: intensity * 0.9
        }}
      />
    </div>
  );
};

export default BeamLight;
