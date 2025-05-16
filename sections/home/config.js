// Array of transition effects
export const heroTransitions = [
   {
      name: "fade",
      imageVariants: {
         enter: { opacity: 0 },
         center: { opacity: 1 },
         exit: { opacity: 0, zIndex: 1 }  // Setting zIndex ensures no gap between images
      },
      textVariants: {
         enter: { y: 20, opacity: 0 },
         center: { y: 0, opacity: 1 },
         exit: { y: -20, opacity: 0 }
      }
   },
   {
      name: "slide",
      imageVariants: {
         enter: { x: 1000, opacity: 0.5 },
         center: { x: 0, opacity: 1 },
         exit: { x: -1000, opacity: 0.5, zIndex: 1 }
      },
      textVariants: {
         enter: { x: 100, opacity: 0 },
         center: { x: 0, opacity: 1 },
         exit: { x: -100, opacity: 0 }
      }
   },
   {
      name: "zoom",
      imageVariants: {
         enter: { scale: 1.2, opacity: 0 },
         center: { scale: 1, opacity: 1 },
         exit: { scale: 0.8, opacity: 0, zIndex: 1 }
      },
      textVariants: {
         enter: { scale: 0.8, opacity: 0 },
         center: { scale: 1, opacity: 1 },
         exit: { scale: 1.2, opacity: 0 }
      }
   },
   {
      name: "rotate",
      imageVariants: {
         enter: { rotate: 5, opacity: 0 },
         center: { rotate: 0, opacity: 1 },
         exit: { rotate: -5, opacity: 0, zIndex: 1 }
      },
      textVariants: {
         enter: { y: 30, opacity: 0 },
         center: { y: 0, opacity: 1 },
         exit: { y: -30, opacity: 0 }
      }
   },
   {
      name: "scale",
      imageVariants: {
         enter: { opacity: 0, scale: 0.5 },
         center: { opacity: 1, scale: 1 },
         exit: { opacity: 0, scale: 1.5, zIndex: 1 }
      },
      textVariants: {
         enter: { opacity: 0, scale: 1.2 },
         center: { opacity: 1, scale: 1 },
         exit: { opacity: 0, scale: 0.8 }
      }
   },
   {
      name: "blend",
      imageVariants: {
         enter: { filter: "blur(10px)", opacity: 0 },
         center: { filter: "blur(0px)", opacity: 1 },
         exit: { filter: "blur(10px)", opacity: 0, zIndex: 1 }
      },
      textVariants: {
         enter: { y: -20, opacity: 0 },
         center: { y: 0, opacity: 1 },
         exit: { y: 20, opacity: 0 }
      }
   },
   {
      name: "crossfade",
      imageVariants: {
         enter: { opacity: 0 },
         center: { opacity: 1 },
         exit: { opacity: 1, zIndex: 1 } // Exit with opacity 1 but behind next image for smoother transition
      },
      textVariants: {
         enter: { opacity: 0 },
         center: { opacity: 1 },
         exit: { opacity: 0 }
      }
   }
];