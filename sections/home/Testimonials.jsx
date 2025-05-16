"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimateInView } from '@/hooks/useAnimateInView';
import { animateVariants, staggerContainer } from '@/lib/constants/animation';
import { Star, Quote } from "lucide-react";

// Testimonial data
const testimonials = [
   {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO at Elevate Group",
      image: "/owner.jpg",
      rating: 5,
      content:
         "Our stay at this luxury guest house exceeded all expectations. The attention to detail and personalized service made us feel like royalty throughout our visit.",
      company: "Elevate Group",
   },
   {
      id: 2,
      name: "Michael Chang",
      role: "Product Lead at Innovate",
      image: "/owner.jpg",
      rating: 5,
      content:
         "The level of creativity and technical expertise they brought to our project was exceptional. They didn't just meet our expectations - they completely exceeded them.",
      company: "Innovate Solutions",
   },
   {
      id: 3,
      name: "Elena Rodriguez",
      role: "Travel Blogger",
      image: "/owner.jpg",
      rating: 4,
      content:
         "As someone who stays in luxury accommodations worldwide, I can confidently say this guest house ranks among the finest. The ambiance is unparalleled and every detail speaks of refined elegance.",
      company: "Wanderlust Diaries",
   },
   {
      id: 4,
      name: "James Wilson",
      role: "Executive Director",
      image: "/owner.jpg",
      rating: 5,
      content:
         "I've hosted several corporate retreats here and each time has been flawless. The staff anticipates needs before they arise, and the setting inspires creativity and connection.",
      company: "Strategic Ventures",
   }
];

// Custom animations for testimonials
const testimonialAnimations = {
   initial: {
      opacity: 0,
      scale: 0.95,
      y: 0
   },
   animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
         duration: 0.8,
         ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for smooth, luxurious feel
      }
   },
   exit: {
      opacity: 0,
      scale: 0.95,
      y: 0,
      transition: {
         duration: 0.6,
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
        hover:shadow-xl border border-stone-100 h-full"
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
         <p className="text-stone-700 leading-relaxed mb-6 text-lg" style={{
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
      <section className="py-24 bg-stone-50 relative overflow-hidden" >
         {/* Background decorative elements */}
         <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-stone-100 to-transparent opacity-60"></div>
         <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-amber-50 opacity-30 blur-3xl"></div>
         <div className="absolute bottom-32 left-40 w-96 h-96 rounded-full bg-stone-100 opacity-40 blur-3xl"></div>
         <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-amber-100 opacity-20 blur-2xl"></div>

         {/* Decorative floating elements */}
         <div className="absolute top-1/3 left-10 w-6 h-6 rounded-full border border-amber-300 opacity-30"></div>
         <div className="absolute top-1/4 right-1/4 w-4 h-4 rounded-full border border-amber-400 opacity-20"></div>
         <div className="absolute bottom-1/4 left-1/3 w-8 h-8 rounded-full border border-stone-300 opacity-20"></div>

         {/* Subtle accent lines */}
         <div className="absolute top-40 left-0 w-24 h-px bg-gradient-to-r from-amber-400 to-transparent opacity-40"></div>
         <div className="absolute bottom-60 right-0 w-32 h-px bg-gradient-to-l from-amber-400 to-transparent opacity-40"></div>

         <div className="container mx-auto max-w-6xl px-4">
            {/* Section header */}
            <motion.div
               className="text-center mb-20"
               variants={animateVariants.fadeIn}
               initial="hidden"
               animate="visible"
            >
               <h2 className="font-light text-stone-400 uppercase tracking-widest mb-3">Testimonials</h2>
               <h3 className="font-serif text-4xl md:text-5xl text-stone-800 mb-4" >
                  Guest Experiences
               </h3>
               <div className="mx-auto w-24 h-px bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200 mb-6"></div>
               <p className="text-stone-600 max-w-2xl mx-auto font-light tracking-wide" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "1.05rem" }}>
                  Discover what our esteemed guests have to say about their memorable stays with us
               </p>
            </motion.div>

            <motion.div
               ref={ref}
               variants={staggerContainer}
               initial="hidden"
               animate={controls}
               className="relative"
            >
               {/* Desktop view - 2 testimonials at a time */}
               <div className="hidden md:block relative" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  <div className="grid grid-cols-2 gap-8 min-h-80">
                     <AnimatePresence mode="wait">
                        {getVisibleTestimonials().map((testimonial, idx) => (
                           <motion.div
                              key={`desktop-${testimonial.id}-${activeIndex}-${idx}`}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              variants={testimonialAnimations}
                              className="h-full"
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
                  <div className="relative min-h-96">
                     <AnimatePresence mode="wait">
                        <motion.div
                           key={`mobile-${testimonials[activeIndex].id}-${activeIndex}`}
                           variants={testimonialAnimations}
                           initial="initial"
                           animate="animate"
                           exit="exit"
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