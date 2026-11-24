
import { gsap } from 'gsap';

export const createFloatingAnimation = (elements: NodeListOf<Element> | Element[]) => {
  const animations: gsap.core.Tween[] = [];
  
  elements.forEach((element, index) => {
    const direction = index % 2 === 0 ? 1 : -1;
    const speed = 1 + Math.random() * 0.3;
    
    const anim = gsap.to(element, {
      y: `${direction * 10}px`,
      duration: 2.5 * speed,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut" as unknown as gsap.EaseFunction,
      delay: index * 0.15
    });
    
    animations.push(anim);
  });
  
  return () => {
    animations.forEach(anim => anim.kill());
  };
};
