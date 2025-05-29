import React from 'react'
import { motion } from 'framer-motion';
import { animateVariants } from '@/lib/constants/animation';
import { useAnimateInView } from '@/hooks/useAnimateInView';

export const PagesHero = ({
   title = "Discover Our Signature Stays",
   description = "Every room is a masterpiece of comfort, elegance, and sophistication.",
   buttonLabel = "View All Rooms",
   showButton = true,
   onClick
}) => {
   const { ref: heroRef, controls: heroControls } = useAnimateInView();

   return (
      <div>
         <motion.section
            ref={heroRef}
            initial="hidden"
            animate={heroControls}
            variants={animateVariants.fadeIn}
            className="relative h-[60vh] flex items-center justify-center overflow-hidden"
         >
            {/* Background Image with Parallax Effect */}
            <div className="absolute inset-0 z-0">
               <div className="absolute inset-0 bg-black/40 z-10"></div>
               <img
                  src="/room10.jpg"
                  alt="Luxury Room"
                  className="w-full h-full object-cover object-center"
               />
            </div>

            {/* Hero Content */}
            <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
               <motion.h1
                  variants={animateVariants.scaleIn}
                  className="font-serif text-4xl md:text-6xl text-white mb-4"
               >
                  {title}
               </motion.h1>
               <motion.p
                  variants={animateVariants.fadeIn}
                  className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto"
               >
                  {description}
               </motion.p>
               {showButton && (
                  <motion.button
                     onClick={onClick}
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.98 }}
                     className="bg-amber-700 hover:bg-amber-800 text-white py-3 px-8 rounded-md transition-colors duration-300 cursor-pointer"
                  >
                     {buttonLabel}
                  </motion.button>
               )}
            </div>
         </motion.section>
      </div>
   )
}
