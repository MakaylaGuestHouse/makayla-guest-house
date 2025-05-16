// Animation variants
export const animateVariants = {
  fadeIn: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const staggerContainer = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      // This is the key property that creates the staggered effect
      staggerChildren: 0.1,  // Time delay between each child animation (in seconds)
      
      // Optional properties to further customize the stagger behavior
      delayChildren: 0.3,    // Initial delay before first child starts animating
      ease: "easeOut",       // Easing function for smooth animation
      duration: 0.5          // Duration of the container's own opacity animation
    }
  }
};
