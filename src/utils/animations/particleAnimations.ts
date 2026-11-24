
import { gsap } from 'gsap';

interface ParticleOptions {
  particleCount?: number;
  particleSize?: { min: number; max: number };
  particleColor?: string;
  duration?: { min: number; max: number };
  yTravel?: { min: number; max: number };
  xTravel?: { min: number; max: number };
  frameSkip?: number;
  scrollSpeed?: number;
}

const defaultParticleOptions: ParticleOptions = {
  particleCount: 1,
  particleSize: { min: 3, max: 8 },
  particleColor: 'rgba(31, 182, 250, 0.3)',
  duration: { min: 1.5, max: 2.5 },
  yTravel: { min: 80, max: 150 },
  xTravel: { min: -30, max: 30 },
  frameSkip: 10,
  scrollSpeed: 0.8
};

export const createScrollParticles = (
  container: HTMLElement,
  options?: ParticleOptions
) => {
  if (!container) return () => {};

  const mergedOptions = { ...defaultParticleOptions, ...options };
  
  let lastScrollTop = 0;
  let frameCount = 0;
  
  const createParticle = (scrollSpeed = 1) => {
    const particle = document.createElement('div');
    particle.className = 'absolute rounded-full z-0 pointer-events-none';
    
    const size = mergedOptions.particleSize!.min + 
      Math.random() * (mergedOptions.particleSize!.max - mergedOptions.particleSize!.min);
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = mergedOptions.particleColor!;
    
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    
    container.appendChild(particle);
    
    const speedMultiplier = Math.min(Math.max(scrollSpeed, 0.5), 2);
    
    gsap.to(particle, {
      opacity: 0,
      scale: 0,
      y: -(mergedOptions.yTravel!.min + 
        Math.random() * (mergedOptions.yTravel!.max - mergedOptions.yTravel!.min)) * speedMultiplier,
      x: mergedOptions.xTravel!.min + 
        Math.random() * (mergedOptions.xTravel!.max - mergedOptions.xTravel!.min),
      duration: (mergedOptions.duration!.min + 
        Math.random() * (mergedOptions.duration!.max - mergedOptions.duration!.min)) / speedMultiplier,
      ease: "power2.out" as unknown as gsap.EaseFunction,
      onComplete: () => {
        if (container.contains(particle)) {
          container.removeChild(particle);
        }
      }
    });
  };
  
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    frameCount++;
    
    const scrollDelta = Math.abs(scrollTop - lastScrollTop);
    const scrollSpeedFactor = Math.min(scrollDelta / 20, 3) * (mergedOptions.scrollSpeed || 1);
    
    if (frameCount % mergedOptions.frameSkip! === 0) {
      if (scrollTop > lastScrollTop) {
        for (let i = 0; i < mergedOptions.particleCount!; i++) {
          createParticle(scrollSpeedFactor);
        }
      }
    }
    
    lastScrollTop = scrollTop;
  };
  
  window.addEventListener('scroll', handleScroll);
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};
