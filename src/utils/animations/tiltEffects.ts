
import { gsap } from 'gsap';

export const create3DTiltEffect = (
  elements: NodeListOf<Element> | Element[],
  options: {
    perspective?: number;
    tiltAmount?: number;
    scale?: number;
    speed?: number;
  } = {}
) => {
  const defaultOptions = {
    perspective: 1000,
    tiltAmount: 15,
    scale: 1.05,
    speed: 0.3
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  const cleanups: (() => void)[] = [];
  
  elements.forEach((element) => {
    if (!(element instanceof HTMLElement)) return;
    
    if (element.parentElement) {
      element.parentElement.style.perspective = `${mergedOptions.perspective}px`;
    }
    
    const handleMouseEnter = (e: MouseEvent) => {
      gsap.to(element, {
        scale: mergedOptions.scale,
        rotationX: 0,
        rotationY: 0,
        ease: "power2.out" as unknown as gsap.EaseFunction,
        duration: mergedOptions.speed,
        boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.3)",
        onComplete: () => {
          element.style.transition = "none";
        }
      });
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!element.getBoundingClientRect) return;
      
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      const rotateY = ((mouseX - centerX) / (rect.width / 2)) * mergedOptions.tiltAmount;
      const rotateX = -((mouseY - centerY) / (rect.height / 2)) * mergedOptions.tiltAmount;
      
      gsap.to(element, {
        rotationY: rotateY,
        rotationX: rotateX,
        ease: "power2.out" as unknown as gsap.EaseFunction,
        duration: mergedOptions.speed
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
        ease: "power2.out" as unknown as gsap.EaseFunction,
        duration: mergedOptions.speed
      });
    };
    
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    const cleanup = () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
    
    cleanups.push(cleanup);
  });
  
  return () => {
    cleanups.forEach(cleanup => cleanup());
  };
};
