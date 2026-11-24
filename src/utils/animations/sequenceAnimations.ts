
import { gsap } from 'gsap';

// Define types for GSAP ease functions to avoid TypeScript errors
type EaseOptions = string | gsap.EaseFunction;

export const createStaggeredAnimation = (
  elements: NodeListOf<Element> | Element[],
  options: {
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    stagger?: number;
    duration?: number;
    ease?: EaseOptions;
    delay?: number;
    scrollTrigger?: boolean;
  } = {}
) => {
  const defaultOptions = {
    from: { y: 50, opacity: 0 },
    to: { y: 0, opacity: 1 },
    stagger: 0.7,
    duration: 0.8,
    ease: "power2.out",
    delay: 0,
    scrollTrigger: true
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  let tween: gsap.core.Tween | null = null;
  
  if (mergedOptions.scrollTrigger) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gsap.set(elements, mergedOptions.from);
          
          tween = gsap.to(elements, {
            ...mergedOptions.to,
            stagger: mergedOptions.stagger,
            duration: mergedOptions.duration,
            ease: mergedOptions.ease as any,
            delay: mergedOptions.delay
          });
          
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    
    if (elements.length > 0) {
      observer.observe(elements[0] as Element);
    }
    
    return () => {
      if (tween) tween.kill();
      observer.disconnect();
    };
  } else {
    gsap.set(elements, mergedOptions.from);
    
    tween = gsap.to(elements, {
      ...mergedOptions.to,
      stagger: mergedOptions.stagger,
      duration: mergedOptions.duration,
      ease: mergedOptions.ease as any,
      delay: mergedOptions.delay
    });
    
    return () => {
      if (tween) tween.kill();
    };
  }
};

export const createPulseAnimation = (
  elements: NodeListOf<Element> | Element[],
  options: {
    scale?: number;
    duration?: number;
    ease?: EaseOptions;
    repeat?: number;
  } = {}
) => {
  const defaultOptions = {
    scale: 1.2,
    duration: 0.5,
    ease: "power2.inOut",
    repeat: 1
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  const animations: gsap.core.Tween[] = [];
  
  elements.forEach((element) => {
    if (!(element instanceof HTMLElement)) return;
    
    const anim = gsap.from(element, {
      scale: 1,
      paused: true,
      duration: mergedOptions.duration,
      ease: mergedOptions.ease as any,
      repeat: mergedOptions.repeat,
      yoyo: true,
      onComplete: () => gsap.set(element, { scale: 1 })
    });
    
    const handleMouseEnter = () => {
      anim.play(0);
    };
    
    element.addEventListener('mouseenter', handleMouseEnter);
    
    animations.push(anim);
  });
  
  return () => {
    animations.forEach((anim, index) => {
      anim.kill();
      const element = elements[index];
      if (element instanceof HTMLElement) {
        element.removeEventListener('mouseenter', () => {});
      }
    });
  };
};

export const createCounterAnimation = (
  elements: NodeListOf<Element> | Element[],
  options: {
    startValue?: number;
    endValue?: number;
    duration?: number;
    ease?: EaseOptions;
    suffix?: string;
    delay?: number;
    stagger?: number;
  } = {}
) => {
  const defaultOptions = {
    startValue: 0,
    endValue: 100,
    duration: 2,
    ease: "power1.inOut",
    suffix: "",
    delay: 0,
    stagger: 0.7
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  const animations: gsap.core.Tween[] = [];
  
  elements.forEach((element, index) => {
    if (!(element instanceof HTMLElement)) return;
    
    element.innerText = `${mergedOptions.startValue}${mergedOptions.suffix}`;
    
    const anim = gsap.to(element, {
      innerText: mergedOptions.endValue,
      duration: mergedOptions.duration,
      ease: mergedOptions.ease as any,
      delay: mergedOptions.delay + (index * mergedOptions.stagger),
      snap: { innerText: 1 },
      onUpdate: () => {
        if (element instanceof HTMLElement) {
          const value = Math.round(Number(element.innerText));
          element.innerText = `${value}${mergedOptions.suffix}`;
        }
      }
    });
    
    animations.push(anim);
  });
  
  return () => {
    animations.forEach(anim => {
      anim.kill();
    });
  };
};

export const createBumperCarAnimation = (
  element: Element,
  options: {
    distance?: number;
    duration?: number;
    ease?: EaseOptions;
    delay?: number;
  } = {}
) => {
  const defaultOptions = {
    distance: 100,
    duration: 0.8,
    ease: "elastic.out(1, 0.3)",
    delay: 0.2
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  const tl = gsap.timeline({ 
    delay: mergedOptions.delay,
    onComplete: () => gsap.set(element, { clearProps: "all" }) 
  });
  
  gsap.set(element, { 
    opacity: 0,
    x: mergedOptions.distance,
    rotate: 2 
  });
  
  tl.to(element, {
    opacity: 1,
    x: 0,
    duration: mergedOptions.duration,
    ease: mergedOptions.ease as any
  })
  .to(element, {
    rotate: -1,
    duration: 0.2,
  })
  .to(element, {
    rotate: 0,
    duration: 0.2
  });
  
  return () => {
    tl.kill();
  };
};

export const createWaveBounceEffect = (
  elements: NodeListOf<Element> | Element[],
  options: {
    height?: number;
    duration?: number;
    stagger?: number;
    ease?: EaseOptions;
    repeat?: number;
    delay?: number;
  } = {}
) => {
  const defaultOptions = {
    height: 15,
    duration: 0.6,
    stagger: 0.05,
    ease: "elastic.out(1, 0.3)",
    repeat: 0,
    delay: 0
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  const animations: gsap.core.Tween[] = [];
  
  elements.forEach((element, index) => {
    if (!(element instanceof HTMLElement)) return;
    
    gsap.set(element, { y: 0 });
    
    const delay = mergedOptions.delay + (index * mergedOptions.stagger);
    
    const anim = gsap.timeline({
      delay: delay,
      repeat: mergedOptions.repeat,
      yoyo: true
    });
    
    anim.to(element, {
      y: -mergedOptions.height,
      duration: mergedOptions.duration / 2,
      ease: "power2.out"
    }).to(element, {
      y: 0,
      duration: mergedOptions.duration / 2,
      ease: mergedOptions.ease as any
    });
    
    if (anim.getChildren().length > 0) {
      const firstTween = anim.getChildren()[0] as gsap.core.Tween;
      if (firstTween) {
        animations.push(firstTween);
      }
    }
  });
  
  return () => {
    animations.forEach(anim => {
      anim.kill();
    });
  };
};

// New eye-catching animations inspired by the reference image

export const createFadeScaleReveal = (
  container: Element,
  items: NodeListOf<Element> | Element[],
  options: {
    stagger?: number;
    duration?: number;
    delay?: number;
    scale?: number;
    scrollTrigger?: boolean;
  } = {}
) => {
  const defaultOptions = {
    stagger: 0.12,
    duration: 0.8,
    delay: 0.1,
    scale: 0.92,
    scrollTrigger: true
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  let tween: gsap.core.Timeline | null = null;
  
  const startAnimation = () => {
    gsap.set(container, { autoAlpha: 1 });
    gsap.set(items, { 
      opacity: 0,
      scale: mergedOptions.scale,
      y: 20
    });
    
    tween = gsap.timeline();
    
    tween.to(items, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: mergedOptions.duration,
      stagger: mergedOptions.stagger,
      ease: "power3.out",
      clearProps: "transform"
    });
    
    return tween;
  };
  
  if (mergedOptions.scrollTrigger) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startAnimation();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(container);
    
    return () => {
      if (tween) tween.kill();
      observer.disconnect();
    };
  } else {
    startAnimation();
    
    return () => {
      if (tween) tween.kill();
    };
  }
};

export const createSlideFromDirection = (
  element: Element,
  options: {
    direction?: 'left' | 'right' | 'top' | 'bottom';
    distance?: number;
    duration?: number;
    delay?: number;
    ease?: EaseOptions;
  } = {}
) => {
  const defaultOptions = {
    direction: 'left' as const,
    distance: 100,
    duration: 0.8,
    delay: 0,
    ease: "power2.out"
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  // Set the initial position based on direction
  const from: gsap.TweenVars = { opacity: 0 };
  
  switch(mergedOptions.direction) {
    case 'left':
      from.x = -mergedOptions.distance;
      break;
    case 'right':
      from.x = mergedOptions.distance;
      break;
    case 'top':
      from.y = -mergedOptions.distance;
      break;
    case 'bottom':
      from.y = mergedOptions.distance;
      break;
  }
  
  gsap.set(element, from);
  
  const tween = gsap.to(element, {
    x: 0,
    y: 0,
    opacity: 1,
    duration: mergedOptions.duration,
    delay: mergedOptions.delay,
    ease: mergedOptions.ease as any
  });
  
  return () => {
    tween.kill();
  };
};

export const createHoverZoom = (
  elements: NodeListOf<Element> | Element[],
  options: {
    scale?: number;
    duration?: number;
    zIndex?: number;
    boxShadow?: string;
  } = {}
) => {
  const defaultOptions = {
    scale: 1.05,
    duration: 0.3,
    zIndex: 10,
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  const cleanupFns: (() => void)[] = [];
  
  elements.forEach((element) => {
    if (!(element instanceof HTMLElement)) return;
    
    const originalZIndex = element.style.zIndex;
    const originalBoxShadow = element.style.boxShadow;
    
    const handleMouseEnter = () => {
      gsap.to(element, {
        scale: mergedOptions.scale,
        zIndex: mergedOptions.zIndex,
        boxShadow: mergedOptions.boxShadow,
        duration: mergedOptions.duration,
        ease: "power2.out"
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        zIndex: originalZIndex || "auto",
        boxShadow: originalBoxShadow || "none",
        duration: mergedOptions.duration,
        ease: "power2.inOut"
      });
    };
    
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    cleanupFns.push(() => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    });
  });
  
  return () => {
    cleanupFns.forEach(fn => fn());
  };
};
