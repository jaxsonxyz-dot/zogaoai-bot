
import React, { useState, useRef, useEffect } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { create3DTiltEffect, createGlowingBorderEffect, createPulseAnimation } from '@/utils/animations';

interface AnimatedCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  accentColor?: string;
  className?: string;
  animationType?: 'fade' | 'slide' | 'tilt' | 'glow' | 'all';
  delay?: number;
  children?: React.ReactNode;
}

const AnimatedCard = ({ 
  title, 
  description, 
  icon: Icon, 
  accentColor = "bg-zogago-blue",
  className,
  animationType = 'all',
  delay = 0,
  children
}: AnimatedCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add a slight delay for staggered effect if specified
            if (delay > 0) {
              setTimeout(() => {
                setIsVisible(true);
              }, delay);
            } else {
              setIsVisible(true);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  // Apply advanced animations based on animationType
  useEffect(() => {
    if (!cardRef.current || !isVisible) return;

    const cleanupFunctions: (() => void)[] = [];

    if (animationType === 'tilt' || animationType === 'all') {
      const tiltCleanup = create3DTiltEffect([cardRef.current], {
        perspective: 1500,
        tiltAmount: 10,
        scale: 1.05,
        speed: 0.6
      });
      cleanupFunctions.push(tiltCleanup);
    }

    if (animationType === 'glow' || animationType === 'all') {
      const glowCleanup = createGlowingBorderEffect([cardRef.current], {
        color: accentColor === 'bg-zogago-blue' ? '#1FB6FA' : 
               accentColor === 'bg-zogago-purple' ? '#7928CA' : 
               accentColor === 'bg-zogago-pink' ? '#FF2D92' : '#1FB6FA',
        duration: 3,
        blur: 10,
        width: 2,
        intensity: 0.4
      });
      cleanupFunctions.push(glowCleanup);
    }

    if (iconRef.current && (animationType === 'all')) {
      const pulseCleanup = createPulseAnimation([iconRef.current], {
        scale: 1.2,
        duration: 0.4,
        ease: "elastic.out(1, 0.3)", // This is a valid GSAP easing
        repeat: 1
      });
      cleanupFunctions.push(pulseCleanup);
    }

    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
    };
  }, [isVisible, animationType, accentColor]);

  const getAnimation = () => {
    switch (animationType) {
      case 'fade':
        return "opacity-0 transition-opacity duration-700";
      case 'slide':
        return "opacity-0 translate-y-10 transition-all duration-700";
      case 'tilt':
      case 'glow':
      case 'all':
      default:
        return "opacity-0 translate-y-10 transition-all duration-700";
    }
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "glass-card p-6 transition-all duration-700 group",
        isVisible ? "opacity-100 translate-y-0" : getAnimation(),
        isHovered ? "transform scale-105" : "",
        className
      )}
      style={{ 
        transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        transitionDelay: `${delay}ms`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {Icon && (
        <div 
          ref={iconRef}
          className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110",
            accentColor
          )}
        >
          <Icon className="text-white transition-transform duration-300 group-hover:rotate-12" />
        </div>
      )}
      <h3 className="text-xl font-bold mb-2 group-hover:text-zogago-blue transition-colors duration-300 transform group-hover:-translate-y-1">{title}</h3>
      <p className="text-zogago-light/70 transform group-hover:-translate-y-1 transition-transform duration-300">{description}</p>
      
      {/* Render children if provided */}
      {children}
    </div>
  );
};

export default AnimatedCard;
