
import { gsap } from 'gsap';

export const createGlowingBorderEffect = (
  elements: NodeListOf<Element> | Element[],
  options: {
    color?: string;
    duration?: number;
    blur?: number;
    width?: number;
    intensity?: number;
  } = {}
) => {
  const defaultOptions = {
    color: '#1FB6FA',
    duration: 3,
    blur: 8,
    width: 2,
    intensity: 0.6
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  const animations: gsap.core.Tween[] = [];
  
  elements.forEach((element) => {
    if (!(element instanceof HTMLElement)) return;
    
    const glowId = `glow-${Math.random().toString(36).substring(2, 10)}`;
    element.dataset.glowId = glowId;
    
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      [data-glow-id="${glowId}"]::after {
        content: '';
        position: absolute;
        inset: -${mergedOptions.width}px;
        border-radius: inherit;
        border: ${mergedOptions.width}px solid ${mergedOptions.color};
        opacity: 0;
        box-shadow: 0 0 ${mergedOptions.blur}px ${mergedOptions.color};
        pointer-events: none;
        z-index: -1;
      }
      
      [data-glow-id="${glowId}"] {
        position: relative;
      }
    `;
    document.head.appendChild(styleTag);
    
    const tl = gsap.timeline({ repeat: -1 });
    
    tl.to(`[data-glow-id="${glowId}"]::after`, {
      duration: mergedOptions.duration / 2,
      opacity: mergedOptions.intensity,
      ease: "sine.inOut" as unknown as gsap.EaseFunction
    }).to(`[data-glow-id="${glowId}"]::after`, {
      duration: mergedOptions.duration / 2,
      opacity: 0.2,
      ease: "sine.inOut" as unknown as gsap.EaseFunction
    });
    
    const firstTween = tl.getChildren()[0] as gsap.core.Tween;
    if (firstTween) {
      animations.push(firstTween);
    }
  });
  
  return () => {
    animations.forEach(anim => anim.kill());
  };
};
