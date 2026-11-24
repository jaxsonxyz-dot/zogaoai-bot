
import React, { useRef } from 'react';
import Logo3D from './Logo3D';

interface AnimatedLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showHighRes?: boolean;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ 
  size = 'md',
  showHighRes = false
}) => {
  // Size mapping with improved scaling
  const sizeMap = {
    sm: { width: 64, height: 64, logoSize: 45 },
    md: { width: 80, height: 80, logoSize: 65 },
    lg: { width: 120, height: 120, logoSize: 100 },
    xl: { width: 160, height: 160, logoSize: 140 }
  };
  
  const selectedSize = sizeMap[size];
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      className="relative overflow-visible flex items-center group"
    >
      <div 
        className="relative z-10"
        style={{ width: selectedSize.width, height: selectedSize.height }}
      >
        <Logo3D 
          width={selectedSize.width} 
          height={selectedSize.height} 
          highResolution={showHighRes}
        />
      </div>
    </div>
  );
};

export default AnimatedLogo;
