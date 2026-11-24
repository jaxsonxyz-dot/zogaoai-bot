
// Export all animation utilities from a single entry point
export * from './particleAnimations';
export * from './floatingAnimations';
export * from './tiltEffects';
export * from './glowEffects';
export * from './sequenceAnimations';
export * from './confettiAnimation';
export * from './pageAnimations';

// Explicitly export from waveAnimations to avoid conflicts
export { createWaveCarveEffect, createWaveBounceEffect } from './waveAnimations';

// Add reveal animation for section images
export const revealAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.7, 
      ease: "easeOut" 
    }
  }
};

// Add staggered reveal animation for multiple items
export const staggeredReveal = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: delay + (i * 0.1),
      duration: 0.5,
      ease: "easeOut"
    }
  })
});

// Add hover effects for interactive elements
export const hoverScale = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05, 
    transition: { duration: 0.3, ease: "easeInOut" }
  },
  tap: { scale: 0.98 }
};
