
import { gsap } from 'gsap';

export const createWaveCarveEffect = (
  container: HTMLElement,
  color: string = '#1FB6FA'
) => {
  if (!container) return () => {};
  
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.style.position = 'absolute';
  svg.style.bottom = '0';
  svg.style.left = '0';
  svg.style.pointerEvents = 'none';
  svg.style.zIndex = '1';
  
  const createWavePath = (offset: number, opacity: number, amplitude: number, frequency: number) => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', color);
    path.setAttribute('stroke-width', '0.5');
    path.setAttribute('stroke-opacity', opacity.toString());
    path.setAttribute('filter', 'url(#glow)');
    
    updateWavePath(path, offset, amplitude, frequency);
    
    return path;
  };
  
  const updateWavePath = (path: SVGPathElement, offset: number, amplitude: number, frequency: number) => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    const waveHeight = height * 0.1 * amplitude;
    const waveCount = width * frequency / 200;
    
    let d = `M 0,${height * 0.7 + offset}`;
    
    for (let i = 0; i <= width; i += 10) {
      const x = i;
      const y = height * 0.7 + Math.sin((i / width) * waveCount * Math.PI * 2 + offset) * waveHeight + offset;
      d += ` L ${x},${y}`;
    }
    
    path.setAttribute('d', d);
  };
  
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
  filter.setAttribute('id', 'glow');
  filter.setAttribute('x', '-50%');
  filter.setAttribute('y', '-50%');
  filter.setAttribute('width', '200%');
  filter.setAttribute('height', '200%');
  
  const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
  feGaussianBlur.setAttribute('stdDeviation', '4');
  feGaussianBlur.setAttribute('result', 'blur');
  
  const feComponentTransfer = document.createElementNS('http://www.w3.org/2000/svg', 'feComponentTransfer');
  feComponentTransfer.setAttribute('result', 'glow');
  
  const feFuncA = document.createElementNS('http://www.w3.org/2000/svg', 'feFuncA');
  feFuncA.setAttribute('type', 'linear');
  feFuncA.setAttribute('slope', '0.8');
  
  feComponentTransfer.appendChild(feFuncA);
  filter.appendChild(feGaussianBlur);
  filter.appendChild(feComponentTransfer);
  defs.appendChild(filter);
  svg.appendChild(defs);
  
  const wavePaths = [
    createWavePath(0, 0.8, 1.0, 1.0),
    createWavePath(10, 0.6, 0.7, 1.2),
    createWavePath(-5, 0.4, 0.5, 0.8)
  ];
  
  wavePaths.forEach(path => svg.appendChild(path));
  container.appendChild(svg);
  
  const animations: gsap.core.Tween[] = [];
  
  wavePaths.forEach((path, index) => {
    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut" as unknown as gsap.EaseFunction
    });
    
    const baseSpeed = 10 + index * 5;
    const baseOffset = index * 10;
    
    tl.to({}, {
      duration: baseSpeed,
      onUpdate: function() {
        const progress = this.progress();
        updateWavePath(
          path, 
          baseOffset + Math.sin(progress * Math.PI * 2) * 10,
          0.5 + Math.sin(progress * Math.PI) * 0.5,
          0.8 + Math.cos(progress * Math.PI) * 0.3
        );
      }
    });
    
    const firstTween = tl.getChildren()[0] as gsap.core.Tween;
    if (firstTween) {
      animations.push(firstTween);
    }
  });
  
  const flickerTl = gsap.timeline({repeat: -1});
  flickerTl.to(svg, {
    opacity: 0.7,
    duration: 0.05,
    delay: 3,
    ease: "none" as unknown as gsap.EaseFunction
  }).to(svg, {
    opacity: 1,
    duration: 0.05,
    ease: "none" as unknown as gsap.EaseFunction
  }).to(svg, {
    opacity: 0.8,
    duration: 0.05,
    delay: 0.2,
    ease: "none" as unknown as gsap.EaseFunction
  }).to(svg, {
    opacity: 1,
    duration: 0.05,
    ease: "none" as unknown as gsap.EaseFunction
  }).to({}, {
    duration: 5,
    ease: "none" as unknown as gsap.EaseFunction
  });
  
  const firstFlickerTween = flickerTl.getChildren()[0] as gsap.core.Tween;
  if (firstFlickerTween) {
    animations.push(firstFlickerTween);
  }
  
  const handleResize = () => {
    wavePaths.forEach((path, index) => {
      updateWavePath(path, index * 10, 0.5 + index * 0.2, 0.8 - index * 0.1);
    });
  };
  
  window.addEventListener('resize', handleResize);
  
  return () => {
    animations.forEach(anim => anim.kill());
    window.removeEventListener('resize', handleResize);
    if (container.contains(svg)) {
      container.removeChild(svg);
    }
  };
};

// New function: createWaveBounceEffect
export const createWaveBounceEffect = (
  elements: Element | Element[] | NodeListOf<Element>,
  options: {
    height?: number;
    duration?: number;
    stagger?: number;
    repeat?: number;
    delay?: number;
    ease?: string;
  } = {}
) => {
  if (!elements) return () => {};
  
  const {
    height = 10,
    duration = 0.5,
    stagger = 0.05,
    repeat = -1,
    delay = 0,
    ease = "elastic.out(1, 0.3)"
  } = options;
  
  const elementsArray = elements instanceof Element ? [elements] : Array.from(elements);
  const animations: gsap.core.Tween[] = [];
  
  if (elementsArray.length === 0) return () => {};
  
  // Create a timeline for each element
  elementsArray.forEach((el, index) => {
    if (!el) return;
    
    // Store original transform for cleanup
    const originalTransform = (el as HTMLElement).style.transform || '';
    
    // Create the animation
    const tween = gsap.fromTo(
      el,
      { y: 0 },
      { 
        y: -height, 
        duration: duration,
        repeat: repeat,
        yoyo: true,
        ease: ease as unknown as gsap.EaseFunction,
        delay: delay + (index * stagger),
        onComplete: function() {
          // Reset to original state when complete (if not repeating)
          if (repeat === 0) {
            gsap.set(el, { y: 0 });
          }
        }
      }
    );
    
    animations.push(tween);
  });
  
  // Return cleanup function
  return () => {
    animations.forEach(anim => {
      if (anim) anim.kill();
    });
    
    // Reset all elements to their original position
    elementsArray.forEach(el => {
      gsap.set(el, { y: 0 });
    });
  };
};
