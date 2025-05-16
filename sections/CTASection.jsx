"use client"

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAnimateInView } from '@/hooks/useAnimateInView';
import { animateVariants, staggerContainer } from '@/lib/constants/animation';

const CTASection = () => {
  const { ref, controls, isInView } = useAnimateInView();
  const parallaxRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Handle parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollTop = window.pageYOffset;
        const element = parallaxRef.current;
        const elementTop = element.getBoundingClientRect().top + scrollTop;
        const elementHeight = element.offsetHeight;
        const windowHeight = window.innerHeight;
        
        // Check if element is in view
        if (scrollTop + windowHeight > elementTop && 
            scrollTop < elementTop + elementHeight) {
          // Calculate how far through the element we've scrolled
          const relativeScroll = (scrollTop + windowHeight - elementTop) / (elementHeight + windowHeight);
          setScrollPosition(relativeScroll * 40); // 40px is max parallax movement
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={parallaxRef} 
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image with parallax effect */}
      <div 
        className="absolute inset-0 w-full h-full bg-stone-900"
        style={{
          transform: `translateY(${scrollPosition}px)`,
          backgroundImage: `url('/set-keys.jpg')`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          willChange: 'transform'
        }}
      ></div>
      
      {/* Dark overlay with noise texture for depth */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/80 to-stone-900/70 z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E")`,
          backgroundBlendMode: 'overlay'
        }}
      ></div>
      
      {/* Content container with animations */}
      <motion.div 
        ref={ref}
        variants={animateVariants.fadeIn}
        initial="hidden"
        animate={controls}
        className="relative z-20 max-w-6xl mx-auto px-6 lg:px-8 text-center"
      >
        {/* Decorative element above heading */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-px bg-amber-400 relative">
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-amber-400 rounded-full"></div>
          </div>
        </div>
        
        {/* Heading with staggered animation */}
        <motion.h2 
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight"
          variants={animateVariants.fadeIn}
          initial="hidden"
          animate={controls}
          transition={{ delay: 0.2 }}
        >
          <span className="block">Experience Unrivaled Luxury</span>
          <span className="text-amber-400">For Your Perfect Getaway</span>
        </motion.h2>
        
        {/* Subheading */}
        <motion.p 
          className="max-w-2xl mx-auto text-lg md:text-xl text-stone-300 mb-10 leading-relaxed"
          variants={animateVariants.fadeIn}
          initial="hidden"
          animate={controls}
          transition={{ delay: 0.4 }}
        >
          Limited-time offer: Enjoy complimentary champagne service and spa access 
          when you book your stay this month. Reserve your experience today.
        </motion.p>
        
        {/* CTA Buttons with hover effects */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          variants={animateVariants.fadeIn}
          initial="hidden"
          animate={controls}
          transition={{ delay: 0.6 }}
        >
          <a 
            href="#book-now" 
            className="relative overflow-hidden group px-8 py-4 bg-amber-600 text-stone-900 font-medium rounded-md transition-all duration-300 shadow-lg shadow-amber-900/30 min-w-[180px] z-10"
          >
            {/* Button background animation */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-500 to-amber-400 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
            
            {/* Button text */}
            <span className="relative z-10 inline-flex items-center justify-center text-white">
              Book Now
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </a>
          
          <a 
            href="#view-rooms" 
            className="group px-8 py-4 bg-transparent border border-white hover:border-amber-400 text-white hover:text-amber-400 font-medium rounded-md transition-all duration-300 min-w-[180px] relative after:absolute after:inset-0 after:border-amber-400 after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300 after:border-b after:-bottom-[1px] after:left-0 z-10"
          >
            View Accommodations
          </a>
        </motion.div>
        
        {/* Trust indicators */}
        <motion.div 
          className="mt-16 flex flex-wrap justify-center gap-8 items-center"
          variants={animateVariants.fadeIn}
          initial="hidden"
          animate={controls}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center text-stone-800 text-sm bg-gray-200 rounded py-0.5 px-2">
            <svg className="w-5 h-5 text-amber-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            No Booking Fees
          </div>
          
          <div className="flex items-center text-stone-800 text-sm bg-gray-200 rounded py-0.5 px-2">
            <svg className="w-5 h-5 text-amber-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Free Cancellation
          </div>
          
          <div className="flex items-center text-stone-800 text-sm bg-gray-200 rounded py-0.5 px-2">
            <svg className="w-5 h-5 text-amber-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Best Rate Guarantee
          </div>
        </motion.div>
      </motion.div>
      
      {/* Floating 3D objects for depth */}
      <div className="absolute top-1/4 left-1/6 w-16 h-16 opacity-100 z-50">
        <div className="absolute inset-0 rounded-full border border-amber-400/30 animate-pulse"></div>
      </div>
      <div className="absolute bottom-1/3 right-1/4 w-24 h-24 opacity-100 z-50">
        <div className="absolute inset-0 rounded-full border border-amber-400/20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      {/* Scroll indicator at bottom */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce z-20">
        <span className="text-amber-400 text-sm mb-2">Scroll</span>
        <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default CTASection;