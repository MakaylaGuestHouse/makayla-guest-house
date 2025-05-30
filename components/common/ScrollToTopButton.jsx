"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export const ScrollToTopButton = () => {
   const [isVisible, setIsVisible] = useState(false);

   // Show button when page is scrolled down 400px
   const toggleVisibility = () => {
      if (window.pageYOffset > 700) {
         setIsVisible(true);
      } else {
         setIsVisible(false);
      }
   };

   // Smooth scroll to top
   const scrollToTop = () => {
      window.scrollTo({
         top: 0,
         behavior: 'smooth'
      });
   };

   useEffect(() => {
      window.addEventListener('scroll', toggleVisibility);
      return () => {
         window.removeEventListener('scroll', toggleVisibility);
      };
   }, []);

   // Button animation variants
   const buttonVariants = {
      hidden: {
         opacity: 0,
         scale: 0.8,
         y: 20
      },
      visible: {
         opacity: 1,
         scale: 1,
         y: 0,
         transition: {
            duration: 0.3,
            ease: "easeOut"
         }
      },
      exit: {
         opacity: 0,
         scale: 0.8,
         y: 20,
         transition: {
            duration: 0.2,
            ease: "easeIn"
         }
      }
   };

   const iconVariants = {
      hover: {
         y: -2,
         transition: {
            duration: 0.2,
            ease: "easeOut"
         }
      }
   };

   return (
      <AnimatePresence>
         {isVisible && (
            <motion.button
               variants={buttonVariants}
               initial="hidden"
               animate="visible"
               exit="exit"
               whileHover="hover"
               onClick={scrollToTop}
               className="fixed bottom-8 right-8 z-50 bg-stone-800 hover:bg-amber-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-out group cursor-pointer"
               aria-label="Scroll to top"
            >
               {/* Decorative ring */}
               <div className="absolute inset-0 rounded-full border border-amber-400/20 group-hover:border-amber-400/40 transition-colors duration-300"></div>

               {/* Icon with animation */}
               <motion.div variants={iconVariants}>
                  <ChevronUp
                     size={24}
                     strokeWidth={2}
                     className="relative z-10"
                  />
               </motion.div>

               {/* Subtle glow effect on hover */}
               <div className="absolute inset-0 rounded-full bg-amber-400/0 group-hover:bg-amber-400/5 transition-colors duration-300"></div>
            </motion.button>
         )}
      </AnimatePresence>
   );
};