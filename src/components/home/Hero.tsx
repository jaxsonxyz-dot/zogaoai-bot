import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowUpRight } from 'lucide-react';

import ParticlesComponent from '../ui/particles-bg';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    const hasFinePointer =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(pointer: fine)').matches;

    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current) return;
      const { clientX, clientY } = e;
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const buttonCenterX = buttonRect.left + buttonRect.width / 2;
      const buttonCenterY = buttonRect.top + buttonRect.height / 2;
      const distanceX = clientX - buttonCenterX;
      const distanceY = clientY - buttonCenterY;
      const angle = Math.atan2(distanceY, distanceX) * (180 / Math.PI);
      buttonRef.current.style.setProperty('--glow-direction', `${angle}deg`);
    };

    if (hasFinePointer) {
      document.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      clearTimeout(visibilityTimer);
      if (hasFinePointer) {
        document.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const handleStartProject = () => {
    const contactSection =
      document.getElementById('contact') || document.getElementById('about');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const taglineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.7, ease: "easeOut" }
    }
  };

  return (
    <div
      ref={heroRef}
      className={`relative min-h-[75vh] sm:min-h-[80vh] md:min-h-[88vh] flex items-center overflow-hidden pt-28 sm:pt-36 md:pt-40 lg:pt-44 pb-12 sm:pb-16 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
      
      {/* Lightweight Ambient Backdrop Gradient (zero-decoder overhead) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 75% 28%, rgba(31, 182, 250, 0.12), transparent 48%), radial-gradient(circle at 22% 72%, rgba(121, 40, 202, 0.14), transparent 52%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zogago-dark via-zogago-dark/40 to-transparent opacity-90"></div>
      </div>
      
      {/* Interactive Particles Background */}
      <ParticlesComponent soundEnabled={false} />
      
      {/* Glowing Orbs — hidden on mobile to preserve GPU/VRAM */}
      <div className={`hidden md:block absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-cyan-500/20 filter blur-[100px] animate-pulse-slow transition-all duration-2000 delay-500 pointer-events-none ${
        isVisible ? 'opacity-100' : 'opacity-0'}`}></div>
      <div className={`hidden md:block absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-600/20 filter blur-[100px] animate-pulse-slow transition-all duration-2000 delay-800 pointer-events-none ${
        isVisible ? 'opacity-100' : 'opacity-0'}`}></div>
      
      {/* Content */}
      <div className="zg-container relative z-10 pointer-events-none pt-2 sm:pt-4 md:pt-6">
        <div className="max-w-4xl mx-auto text-center">
          <p
            className={`text-xs sm:text-sm uppercase tracking-[0.28em] text-zogago-blue/90 font-medium mb-4 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Creative &amp; Digital Agency · Helping Businesses Build, Grow &amp; Stand Out
          </p>

          <h1
            style={{ textWrap: 'balance' }}
            className={`text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-5 sm:mb-6 font-bold leading-[1.1] tracking-tight transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Build{" "}
            <span className="text-gradient-blue">What&apos;s</span>{" "}
            <span className="text-gradient-purple">Next.</span>
          </h1>
          
          <motion.div
            className="mb-8 sm:mb-10 max-w-2xl mx-auto"
            variants={taglineVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}>
            <p className="text-base sm:text-lg md:text-xl text-zogago-light/85 leading-relaxed font-normal">
              We are a creative and digital agency helping businesses stand out and grow with custom web design, memorable branding, high-converting online stores, 3D visuals, and smart workflow automation.
            </p>
          </motion.div>
          
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-900 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button
              ref={buttonRef}
              onClick={handleStartProject}
              className="button-glow group px-8 py-3.5 text-base font-medium transition-transform duration-200 hover:scale-105 pointer-events-auto whitespace-nowrap shrink-0 w-full sm:w-auto">
              <span className="relative z-10 flex items-center justify-center">
                Start a Project
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </span>
            </button>

            <Link
              to="/case-studies"
              className="pointer-events-auto inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] backdrop-blur-md px-8 py-3.5 text-base font-medium text-white transition-all duration-300 hover:border-zogago-blue/50 hover:bg-white/[0.08] whitespace-nowrap shrink-0 w-full sm:w-auto"
            >
              <span>Explore Our Work</span>
              <ArrowUpRight className="h-4 w-4 text-zogago-blue" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;



