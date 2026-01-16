// Professional animation variants and utilities for Framer Motion

export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

export const fadeInDown = {
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
};

export const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

export const slideInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

// Stagger container for children
export const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Stagger item for use in staggerContainer
export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

// Viewport-based animations
export const viewportOptions = {
  once: true,
  margin: "0px", // Changed from -100px to 0px for better mobile detection
  amount: 0.1 // Trigger when just 10% visible (better for mobile)
};

// More lenient viewport options for mobile-friendly animations
export const viewportOptionsMobile = {
  once: true,
  margin: "0px",
  amount: 0.05 // Even more lenient for mobile
};

// Button hover animations
export const buttonHover = {
  scale: 1.05,
  transition: { duration: 0.2, ease: "easeOut" }
};

export const buttonTap = {
  scale: 0.95,
  transition: { duration: 0.1 }
};

// Card hover animations
export const cardHover = {
  y: -8,
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
};

// Modal animations
export const modalBackdrop = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 }
};

export const modalContent = {
  initial: { opacity: 0, scale: 0.9, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.9, y: 20 },
  transition: { 
    type: "spring",
    stiffness: 300,
    damping: 30
  }
};

// Text reveal animation
export const textReveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: viewportOptions,
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

// Image reveal animation
export const imageReveal = {
  initial: { opacity: 0, scale: 1.1 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: viewportOptions,
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

// Section header animation
export const sectionHeader = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: viewportOptions,
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

// Hero text animation
export const heroText = {
  initial: { opacity: 0, y: 50 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1],
      delay: 0.2
    }
  }
};

// Smooth spring transition
export const springTransition = {
  type: "spring",
  stiffness: 100,
  damping: 15
};

// Smooth ease transition
export const smoothEase = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1]
};
