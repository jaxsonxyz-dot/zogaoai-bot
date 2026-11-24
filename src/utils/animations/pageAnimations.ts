
import { motion } from 'framer-motion';

// Animation variants for section headers
export const sectionHeaderVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.7, 
      ease: "easeOut" 
    } 
  }
};

// Animation variants for service process steps
export const processStepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index: number) => ({
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      delay: index * 0.1, 
      ease: "easeOut" 
    }
  })
};

// Animation variants for service cards
export const serviceCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1, 
    y: 0, 
    transition: { 
      delay: 0.2 + (index * 0.1),
      duration: 0.5, 
      ease: "easeOut" 
    }
  })
};

// Animation variants for CTA sections
export const ctaVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: 0.7,
      ease: "easeOut" 
    } 
  }
};

// Animation variants for gallery items
export const galleryItemVariants = {
  hidden: { opacity: 0 },
  visible: (index: number) => ({ 
    opacity: 1, 
    transition: { 
      delay: 0.2 * index, 
      duration: 0.5 
    } 
  }),
  hover: { 
    scale: 1.05, 
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    transition: { duration: 0.3 } 
  }
};

// Animation variants for modal/dialog content
export const modalContentVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    } 
  },
  exit: { 
    opacity: 0,
    scale: 0.9, 
    transition: { 
      duration: 0.3 
    } 
  }
};

// Staggered reveal animation for multiple items
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
