"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimateInView } from '@/hooks/useAnimateInView';
import { staggerContainer } from '@/lib/constants/animation';
import { Star, Quote } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { testimonials } from "@/data";

// Fixed animations that don't affect layout
const testimonialAnimations = {
   initial: {
      opacity: 0,
      // Removed scale and y to prevent layout shifts
   },
   animate: {
      opacity: 1,
      transition: {
         duration: 0.6,
         ease: [0.16, 1, 0.3, 1],
      }
   },
   exit: {
      opacity: 0,
      transition: {
         duration: 0.4,
         ease: [0.16, 1, 0.3, 1],
      }
   }
};

// Star rating component
const StarRating = ({ rating }) => {
   return (
      <div className="flex items-center gap-1">
         {[...Array(5)].map((_, i) => (
            <Star
               key={i}
               size={18}
               strokeWidth={1.5}
               className={`${i < rating
                  ? "text-amber-500 fill-amber-500 drop-shadow-sm"
                  : "text-stone-300"
                  } transition-all duration-300`}
            />
         ))}
      </div>
   );
};

// Testimonial card component
const TestimonialCard = ({ testimonial }) => {
   return (
      <div
         className="relative overflow-hidden rounded-lg p-8 shadow-lg transition-all duration-500 
        hover:shadow-xl border border-stone-100 h-96"
         style={{
            background: "linear-gradient(145deg, rgba(255,255,255,0.98), rgba(250,250,249,0.92))",
            backdropFilter: "blur(10px)",
         }}
      >
         {/* Quote icon - more creative and eye-catching */}
         <div className="absolute -top-4 -right-4 w-28 h-28 flex items-center justify-center">
            <div className="absolute w-full h-full opacity-10 bg-amber-100 rounded-full"></div>
            <div className="absolute w-16 h-16 bg-gradient-to-br from-amber-200 to-amber-50 rounded-full opacity-40 blur-md"></div>
            <Quote
               size={36}
               strokeWidth={1.5}
               className="text-amber-600 relative z-10"
               style={{
                  filter: "drop-shadow(0px 2px 4px rgba(217, 119, 6, 0.3))",
               }}
            />
         </div>

         {/* Rating */}
         <div className="mb-5">
            <StarRating rating={testimonial.rating} />
         </div>

         {/* Testimonial content */}
         <p className="text-stone-700 italic leading-relaxed mb-6 text-lg" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            letterSpacing: "0.01em",
         }}>
            "{testimonial.content}"
         </p>

         {/* Testimonial author */}
         <div className="flex items-center mt-8">
            <div className="h-16 w-16 rounded-full overflow-hidden mr-4 shadow-md border-2 border-amber-50">
               <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-full w-full object-cover"
               />
            </div>
            <div>
               <h4 className="font-serif text-stone-800 font-medium text-lg tracking-wide" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>
                  {testimonial.name}
               </h4>
               <p className="text-sm text-stone-500 font-light tracking-wide" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {testimonial.role}, {testimonial.company}
               </p>
            </div>
         </div>

         {/* Decorative elements */}
         <div className="absolute bottom-0 left-0 h-1.5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-300 w-1/3"></div>
         <div className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-stone-100 opacity-20 blur-xl"></div>
      </div>
   );
};

// Main component
export default function Testimonials() {
   const [activeIndex, setActiveIndex] = useState(0);
   const [_, setPrevIndex] = useState(0);
   const { ref, controls } = useAnimateInView();

   // Calculate visible testimonials for desktop (2 at a time)
   const getVisibleTestimonials = () => {
      const firstIndex = activeIndex % testimonials.length;
      const secondIndex = (activeIndex + 1) % testimonials.length;
      return [testimonials[firstIndex], testimonials[secondIndex]];
   };

   // Go to next slide
   const nextSlide = () => {
      setPrevIndex(activeIndex);
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
   };

   // Go to previous slide
   const prevSlide = () => {
      setPrevIndex(activeIndex);
      setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
   };

   // Autoplay functionality
   useEffect(() => {
      const interval = setInterval(() => {
         nextSlide();
      }, 6000);

      return () => clearInterval(interval);
   }, [activeIndex]);

   return (
      <section className="py-24 bg-stone-50 relative overflow-hidden">
         <div className="container mx-auto max-w-6xl px-4">
            <SectionHeader
               title="Testimonials"
               subTitle="Guest Experiences"
               description="Discover what our esteemed guests have to say about their memorable stays with us"
            />

            <motion.div
               ref={ref}
               variants={staggerContainer}
               initial="hidden"
               animate={controls}
               className="relative"
            >
               {/* Desktop view - 2 testimonials at a time */}
               <div className="hidden md:block relative" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {/* Fixed height container to prevent layout shifts */}
                  <div className="grid grid-cols-2 gap-8" style={{ minHeight: '400px' }}>
                     <AnimatePresence mode="async">
                        {getVisibleTestimonials().map((testimonial, idx) => (
                           <motion.div
                              key={`desktop-${testimonial.id}-${activeIndex}-${idx}`}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              variants={testimonialAnimations}
                              className="h-96 absolute inset-0"
                              style={{
                                 left: idx === 0 ? '0' : 'calc(50% + 1rem)',
                                 width: idx === 0 ? 'calc(50% - 0.5rem)' : 'calc(50% - 0.5rem)',
                              }}
                           >
                              <TestimonialCard testimonial={testimonial} />
                           </motion.div>
                        ))}
                     </AnimatePresence>
                  </div>

                  {/* Navigation buttons */}
                  <div className="flex justify-center mt-12 gap-6">
                     <button
                        onClick={prevSlide}
                        className="bg-white border border-stone-200 rounded-full p-3 shadow-md hover:shadow-lg transition-all duration-300 hover:bg-amber-50 group cursor-pointer"
                        aria-label="Previous testimonial"
                     >
                        <svg
                           width="24"
                           height="24"
                           viewBox="0 0 24 24"
                           fill="none"
                           stroke="currentColor"
                           strokeWidth="1.5"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           className="text-stone-500 group-hover:text-amber-600 transition-colors duration-300"
                        >
                           <path d="M15 18l-6-6 6-6" />
                        </svg>
                     </button>
                     <button
                        onClick={nextSlide}
                        className="bg-white border border-stone-200 rounded-full p-3 shadow-md hover:shadow-lg transition-all duration-300 hover:bg-amber-50 group cursor-pointer"
                        aria-label="Next testimonial"
                     >
                        <svg
                           width="24"
                           height="24"
                           viewBox="0 0 24 24"
                           fill="none"
                           stroke="currentColor"
                           strokeWidth="1.5"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           className="text-stone-500 group-hover:text-amber-600 transition-colors duration-300"
                        >
                           <path d="M9 18l6-6-6-6" />
                        </svg>
                     </button>
                  </div>
               </div>

               {/* Mobile view - Single testimonial carousel */}
               <div className="md:hidden" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {/* Fixed height container for mobile */}
                  <div className="relative" style={{ minHeight: '420px' }}>
                     <AnimatePresence mode="async">
                        <motion.div
                           key={`mobile-${testimonials[activeIndex].id}-${activeIndex}`}
                           variants={testimonialAnimations}
                           initial="initial"
                           animate="animate"
                           exit="exit"
                           className="absolute inset-0"
                        >
                           <TestimonialCard testimonial={testimonials[activeIndex]} />
                        </motion.div>
                     </AnimatePresence>
                  </div>

                  {/* Carousel navigation */}
                  <div className="flex justify-center items-center mt-10 gap-3">
                     {testimonials.map((_, index) => (
                        <button
                           key={index}
                           onClick={() => {
                              setPrevIndex(activeIndex);
                              setActiveIndex(index);
                           }}
                           className={`transition-all duration-500 ${activeIndex === index
                              ? "w-10 h-2 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full shadow-sm"
                              : "w-2 h-2 bg-stone-300 rounded-full hover:bg-amber-300"
                              }`}
                           aria-label={`Go to slide ${index + 1}`}
                        />
                     ))}
                  </div>
               </div>
            </motion.div>
         </div>
      </section>
   );
}