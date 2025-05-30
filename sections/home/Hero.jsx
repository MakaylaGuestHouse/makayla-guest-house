"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { heroTransitions } from './config';
import { carouselImages } from './constants';
import { RoomFilter } from '@/components/ui/rooms/RoomFilter';
import routes from '@/lib/routes';
import { useAppRouter } from '@/hooks/useAppRouter';

const Hero = () => {
   const { navigateTo } = useAppRouter();
   const [currentIndex, setCurrentIndex] = useState(0);
   const [isChanging, setIsChanging] = useState(false);
   const [currentTransition, setCurrentTransition] = useState({});

   const nextImageRef = useRef(null);
   const transitionTimeoutRef = useRef(null);

   // Get random transition effect
   const getRandomTransition = () => {
      const randomIndex = Math.floor(Math.random() * heroTransitions.length);
      return heroTransitions[randomIndex];
   };

   // Set random transition on mount and prepare for each slide change
   useEffect(() => {
      // Apply random transition immediately on first load
      if (currentIndex === 0 && !currentTransition.name) {
         setCurrentTransition(getRandomTransition());
      }

      // Set up transition for the next slide change
      const prepareNextTransition = () => {
         // Pre-select the next transition before the slide changes
         transitionTimeoutRef.current = setTimeout(() => {
            setCurrentTransition(getRandomTransition());
         }, 5800); // Slightly before the auto-advance time
      };

      prepareNextTransition();

      // Clear any existing timeout when unmounting or changing slides
      return () => {
         if (transitionTimeoutRef.current) {
            clearTimeout(transitionTimeoutRef.current);
         }
      };
   }, [currentIndex, currentTransition.name]);


   // Auto-advance carousel
   useEffect(() => {
      const interval = setInterval(() => {
         // Preload next image before transition
         const nextIndex = (currentIndex + 1) % carouselImages.length;
         nextImageRef.current = new Image();
         nextImageRef.current.src = carouselImages[nextIndex].url.src;

         // Set changing flag to true before transition starts
         setIsChanging(true);

         // Change slide after a short delay to ensure image is ready
         setTimeout(() => {
            setCurrentIndex(nextIndex);
            // Reset changing flag after transition completes
            setTimeout(() => {
               setIsChanging(false);
            }, 1200);
         }, 50);
      }, 6000);

      return () => clearInterval(interval);
   }, [currentIndex]);

   const nextSlide = () => {
      if (isChanging) return; // Prevent rapid clicking during transition

      const nextIndex = (currentIndex + 1) % carouselImages.length;

      // Preload the next image
      nextImageRef.current = new Image();
      nextImageRef.current.src = carouselImages[nextIndex].url.src;

      setIsChanging(true);
      setTimeout(() => {
         setCurrentIndex(nextIndex);
         setTimeout(() => {
            setIsChanging(false);
         }, 1200);
      }, 50);
   };

   const prevSlide = () => {
      if (isChanging) return; // Prevent rapid clicking during transition

      const prevIndex = currentIndex === 0 ? carouselImages.length - 1 : currentIndex - 1;

      // Preload the previous image
      nextImageRef.current = new Image();
      nextImageRef.current.src = carouselImages[prevIndex].url.src;

      setIsChanging(true);
      setTimeout(() => {
         setCurrentIndex(prevIndex);
         setTimeout(() => {
            setIsChanging(false);
         }, 1200);
      }, 50);
   };

   return (
      <div className="relative h-screen w-full">
         {/* Image Preload to prevent flashes */}
         <div className="hidden">
            {carouselImages.map((image, index) => (
               <img key={`preload-${index}`} src={image.url.src} alt="preload" />
            ))}
         </div>

         {/* Carousel */}
         <div className="relative h-full overflow-hidden">
            {/* Gradient overlay for better text visibility - always present */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 z-10 pointer-events-none"></div>

            {/* Pre-loaded all images in background */}
            <div className="hidden">
               {carouselImages.map((image, idx) => (
                  <img key={`preload-${idx}`} src={image.url.src} alt="" />
               ))}
            </div>

            {/* Main carousel with proper AnimatePresence handling */}
            <AnimatePresence initial={false} mode="sync">
               <motion.div
                  key={currentIndex}
                  className="absolute inset-0"
                  variants={currentTransition.imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                     duration: 1.2,
                     ease: "easeInOut",
                     opacity: { duration: 0.6 } // Ensure opacity heroTransitions are quick for seamless fades
                  }}
               >
                  <motion.div
                     className="w-full h-full bg-cover bg-center"
                     style={{
                        backgroundImage: `url(${carouselImages[currentIndex].url.src})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                     }}
                     initial={{ scale: 1 }}
                     animate={{
                        scale: 1.05,
                        transition: { duration: 8, ease: "easeInOut" }
                     }}
                  >
                     {/* Empty div to ensure full coverage and prevent background showing */}
                     <div className="absolute inset-0 bg-black/5"></div>
                  </motion.div>

                  {/* Carousel Text Content with enhanced styling */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-20">
                     <motion.div
                        className="text-center space-y-6 max-w-3xl"
                        variants={currentTransition.textVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
                     >
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-white drop-shadow-lg [text-shadow:_0_1px_5px_rgba(0,0,0,0.3)]">
                           {carouselImages[currentIndex].heading}
                        </h1>
                        <p className="text-lg md:text-xl lg:text-2xl font-light tracking-wide max-w-2xl mx-auto text-white/90 drop-shadow-md [text-shadow:_0_1px_3px_rgba(0,0,0,0.3)]">
                           {carouselImages[currentIndex].subheading}
                        </p>
                        <motion.div
                           whileHover={{ scale: 1.02 }}
                           whileTap={{ scale: 0.99 }}
                        >
                           <button onClick={() => navigateTo(routes.bookNow)} className="bg-amber-500 text-gray-100 px-8 py-3 mt-6 rounded-full font-medium tracking-wide uppercase text-sm hover:bg-amber-400 transition-all duration-300 shadow-xl hover:shadow-xl backdrop-blur-sm cursor-pointer">
                              Book Your Stay
                           </button>
                        </motion.div>
                     </motion.div>
                  </div>
               </motion.div>
            </AnimatePresence>

            {/* Carousel Navigation */}
            <div className="absolute bottom-36 inset-x-0 flex justify-center space-x-3 z-20">
               {carouselImages.map((_, index) => (
                  <button
                     key={index}
                     className={`h-3 rounded-full transition-all duration-500 ${index === currentIndex ? "bg-amber-400 w-12 shadow-md shadow-amber-300/50" : "bg-white/70 hover:bg-white w-3 cursor-pointer"
                        }`}
                     onClick={() => {
                        if (!isChanging && index !== currentIndex) {
                           // Preload the image
                           nextImageRef.current = new Image();
                           nextImageRef.current.src = carouselImages[index].url.src;

                           setIsChanging(true);
                           setTimeout(() => {
                              setCurrentIndex(index);
                              setTimeout(() => {
                                 setIsChanging(false);
                              }, 1200);
                           }, 50);
                        }
                     }}
                     aria-label={`Go to slide ${index + 1}`}
                     disabled={isChanging}
                  />
               ))}
            </div>

            {/* Carousel Controls */}
            <button
               className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 text-white z-20 transition-all duration-300 shadow-lg border border-white/10 cursor-pointer"
               onClick={prevSlide}
               aria-label="Previous slide"
               disabled={isChanging}
            >
               <ChevronLeft size={24} />
            </button>

            <button
               className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 text-white z-20 transition-all duration-300 shadow-lg border border-white/10 cursor-pointer"
               onClick={nextSlide}
               aria-label="Next slide"
               disabled={isChanging}
            >
               <ChevronRight size={24} />
            </button>
         </div>

         <RoomFilter initialFilters={{}} isRoomPage={false} onFiltersApplied={null} />
      </div>
   );
};

export default Hero;