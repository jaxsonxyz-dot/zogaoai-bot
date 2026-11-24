
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import "./gsap-plugins";

interface IntroAnimationProps {
  onAnimationComplete: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onAnimationComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const logoImgRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  
  useEffect(() => {
    if (!logoContainerRef.current || !textRef.current || !circleRef.current) return;
    
    const logoContainer = logoContainerRef.current;
    const text = textRef.current;
    const circle = circleRef.current;
    
    // Set up initial states
    gsap.set(logoContainer, { 
      opacity: 0,
      scale: 0.8,
      transformOrigin: 'center center'
    });
    
    gsap.set(text, { 
      opacity: 0,
      y: 20,
      transformOrigin: 'center center'
    });
    
    gsap.set(circle, {
      scale: 0,
      opacity: 0,
      transformOrigin: 'center center'
    });
    
    // Optimized: Fewer particles on mobile for lower RAM/CPU load
    const particles: Particle[] = [];
    const particleCount = window.innerWidth < 768 ? 14 : 28;
    
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      
      constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.color = `rgba(14, 165, 233, ${Math.random() * 0.8 + 0.2})`;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce off edges
        if (this.x > window.innerWidth || this.x < 0) {
          this.speedX = -this.speedX;
        }
        
        if (this.y > window.innerHeight || this.y < 0) {
          this.speedY = -this.speedY;
        }
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Create canvas for particles
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '0';
    
    if (containerRef.current) {
      containerRef.current.appendChild(canvas);
    }
    
    const ctx = canvas.getContext('2d');
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Create GSAP timeline
    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out everything after the animation completes
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          onComplete: onAnimationComplete
        });
      }
    });
    
    // Animation sequence
    tl.to(circle, {
      scale: 1,
      opacity: 0.8,
      duration: 0.8,
      ease: "power2.out"
    })
    .to(logoContainer, {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "power2.inOut"
    }, "-=0.4")
    .to(logoContainer, {
      y: -10,
      yoyo: true,
      repeat: 1,
      duration: 0.6,
      ease: "power2.inOut"
    })
    .to(text, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.4)"
    }, "-=0.3");
    
    // Particle animation
    let particleAnimation: number;
    
    const animateParticles = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        if (ctx) particle.draw(ctx);
      });
      
      // Draw connections between nearby particles
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            if (!ctx) continue;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(14, 165, 233, ${0.2 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
      
      particleAnimation = requestAnimationFrame(animateParticles);
    };
    
    animateParticles();
    
    // Clean up
    const containerEl = containerRef.current;
    return () => {
      tl.kill();
      cancelAnimationFrame(particleAnimation);
      if (containerEl && canvas.parentNode === containerEl) {
        containerEl.removeChild(canvas);
      }
    };
  }, [onAnimationComplete]);
  
  return (
    <div 
      ref={containerRef}
      onClick={onAnimationComplete}
      role="region"
      aria-label="Welcome intro animation"
      className="fixed inset-0 z-50 bg-zogago-dark flex items-center justify-center cursor-pointer"
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onAnimationComplete();
        }}
        className="absolute top-6 right-6 z-30 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-white/75 hover:text-white transition-colors"
      >
        Skip Intro →
      </button>
      <div className="relative z-10 w-full max-w-xs mx-auto flex flex-col items-center">
        <svg 
          width="200" 
          height="200" 
          viewBox="0 0 200 200" 
          xmlns="http://www.w3.org/2000/svg"
          className="absolute"
        >
          {/* Glowing circle background */}
          <defs>
            <radialGradient id="logoGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#1FB6FA" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#7928CA" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FF2D92" stopOpacity="0.1" />
            </radialGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          {/* Circle backdrop */}
          <circle 
            ref={circleRef}
            cx="100" 
            cy="100" 
            r="80" 
            fill="url(#logoGlow)" 
            filter="url(#glow)" 
          />
        </svg>
        
        <div ref={logoContainerRef} className="relative z-20">
          <img 
            ref={logoImgRef}
            src="/logo.svg"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
            alt="Zogago Logo"
            className="w-44 h-auto object-contain"
          />
        </div>
        
        {/* Zogago Text */}
        <svg
          width="200"
          height="60"
          viewBox="0 0 200 60"
          className="relative z-20 mt-4"
        >
          <text
            ref={textRef}
            x="100"
            y="30"
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily="'Inter', sans-serif"
            fontWeight="700"
            fontSize="24"
          >
            ZOGAGO
          </text>
        </svg>
      </div>
    </div>
  );
};

export default IntroAnimation;
