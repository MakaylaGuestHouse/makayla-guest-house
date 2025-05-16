"use client"
import React from 'react';
import { Wind, Award, Diamond, Wine } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { animateVariants } from '@/lib/constants/animation';
import { useAnimateInView } from '@/hooks/useAnimateInView';

// Animated wrapper component that triggers when in view
const AnimateWhenVisible = ({ children, delay = 0, duration = 0.5, variants }) => {
   const { ref, controls } = useAnimateInView();
   
   return (
      <motion.div
         ref={ref}
         initial="hidden"
         animate={controls}
         variants={variants}
         transition={{ duration, delay, ease: "easeOut" }}
      >
         {children}
      </motion.div>
   );
};

export default function WhyChooseUs() {

   return (
      <section className="relative py-16 bg-gradient-to-br from-stone-50 to-stone-100 overflow-hidden">
         {/* Background accents */}
         <motion.div
            className="absolute top-20 left-40 w-64 h-64 rounded-full bg-amber-100/30 blur-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
         ></motion.div>
         <motion.div
            className="absolute bottom-20 right-40 w-96 h-96 rounded-full bg-rose-100/20 blur-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
         ></motion.div>
         <motion.div
            className="absolute top-40 right-20 w-32 h-32 rounded-full bg-amber-200/20 blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.6 }}
         ></motion.div>

         {/* Section title */}
         <div className="container mx-auto px-6 mb-12">
            <AnimateWhenVisible variants={animateVariants.fadeIn}>
               <h2 className="text-center font-serif text-lg tracking-widest text-amber-800 relative inline-block">
                  <span className="relative z-10">WHY CHOOSE US</span>
                  <motion.span
                     className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-300/0 via-amber-400 to-amber-300/0"
                     initial={{ width: 0 }}
                     animate={{ width: "100%" }}
                     transition={{ delay: 1, duration: 0.8 }}
                  ></motion.span>
               </h2>
            </AnimateWhenVisible>
         </div>

         {/* Main content container */}
         <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
               {/* Left side - Image with overlay container */}
               <AnimateWhenVisible variants={animateVariants.fadeInLeft}>
                  <div className="relative rounded-xl overflow-hidden shadow-2xl h-[500px] group">
                     {/* Image */}
                     <div className="absolute inset-0">
                        <Image
                           src="/father-daughter.jpg"
                           alt="Woman enjoying breakfast in pool"
                           className="w-full h-full object-cover"
                           height={600}
                           width={1200}
                        />
                     </div>

                     {/* Gradient overlay */}
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                     {/* Glassmorphic container */}
                     <motion.div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] p-8 rounded-xl backdrop-blur-md bg-black/20 border border-white/10 shadow-xl transition-all duration-500 group-hover:bg-black/40"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.7 }}
                     >
                        {/* Hotel icon and lines decoration */}
                        <div className="flex justify-center mb-4">
                           <div className="relative">
                              <motion.div
                                 initial={{ opacity: 0, scale: 0.8 }}
                                 animate={{ opacity: 1, scale: 1 }}
                                 transition={{ delay: 0.8, duration: 0.5 }}
                              >
                                 <Logo />
                              </motion.div>
                              <motion.div
                                 className="absolute top-1/2 left-[calc(100%+8px)] h-px bg-gradient-to-r from-amber-400 to-transparent"
                                 initial={{ width: 0 }}
                                 animate={{ width: "12" }}
                                 transition={{ delay: 1, duration: 0.6 }}
                              ></motion.div>
                              <motion.div
                                 className="absolute top-1/2 right-[calc(100%+8px)] h-px bg-gradient-to-l from-amber-400 to-transparent"
                                 initial={{ width: 0 }}
                                 animate={{ width: "12" }}
                                 transition={{ delay: 1, duration: 0.6 }}
                              ></motion.div>
                           </div>
                        </div>

                        <motion.h3
                           className="text-center font-serif text-2xl font-light text-white mb-3"
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           transition={{ delay: 1.1, duration: 0.5 }}
                        >
                           Makayla Guest House
                        </motion.h3>

                        <motion.p
                           className="text-center text-white/80 text-sm leading-relaxed"
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           transition={{ delay: 1.2, duration: 0.5 }}
                        >
                           Provides elegant stays, premium service, and a relaxing atmosphere for every guest.
                        </motion.p>

                        {/* Decorative elements */}
                        <motion.div
                           className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                           initial={{ width: 0 }}
                           animate={{ width: "6rem" }}
                           transition={{ delay: 1.3, duration: 0.6 }}
                        ></motion.div>
                        <motion.div
                           className="absolute -top-3 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                           initial={{ width: 0 }}
                           animate={{ width: "6rem" }}
                           transition={{ delay: 1.3, duration: 0.6 }}
                        ></motion.div>
                     </motion.div>

                     {/* Corner accents */}
                     <motion.div
                        className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-amber-300/70"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.4, duration: 0.5 }}
                     ></motion.div>
                     <motion.div
                        className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-amber-300/70"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.5 }}
                     ></motion.div>
                     <motion.div
                        className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-amber-300/70"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.6, duration: 0.5 }}
                     ></motion.div>
                     <motion.div
                        className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-amber-300/70"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.7, duration: 0.5 }}
                     ></motion.div>
                  </div>
               </AnimateWhenVisible>

               {/* Right side - Features */}
               <div className="space-y-12 pl-0 md:pl-8">
                  <AnimateWhenVisible variants={animateVariants.fadeInRight}>
                     <div>
                        <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-800 leading-tight mb-4">
                           Experience the Difference <br />
                           <span className="font-normal">with Every Veloria Moment.</span>
                        </h2>

                        <p className="text-gray-600 mb-8">
                           Nullam porta sociosqu posuere massa semper sodales erat dignissim
                           curae interdum. Facilisi lorem ipsum primis sollicitudin metus consequat
                           sit luctus magna magnis.
                        </p>
                     </div>
                  </AnimateWhenVisible>

                  {/* Features list */}
                  <div className="space-y-8">
                     {/* Feature 1 */}
                     <AnimateWhenVisible variants={animateVariants.fadeIn} delay={0.1}>
                        <div className="flex gap-6 items-start group">
                           <motion.div
                              className="flex-shrink-0 p-2 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg shadow-md border border-amber-200/50 group-hover:from-amber-100 group-hover:to-amber-200 transition-all duration-300"
                              whileHover={{ scale: 1.05 }}
                           >
                              <Wind className="h-6 w-6 text-amber-700" />
                           </motion.div>
                           <div>
                              <h3 className="font-serif text-xl font-medium text-gray-800 mb-1">Breathtaking Natural Surroundings</h3>
                              <p className="text-gray-600 text-sm">
                                 Nulla dictumst integer netus tempor odio lorem placerat congue suspendisse augue natoque
                              </p>
                           </div>
                        </div>
                     </AnimateWhenVisible>

                     {/* Feature 2 */}
                     <AnimateWhenVisible variants={animateVariants.fadeIn} delay={0.2}>
                        <div className="flex gap-6 items-start group">
                           <motion.div
                              className="flex-shrink-0 p-2 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg shadow-md border border-amber-200/50 group-hover:from-amber-100 group-hover:to-amber-200 transition-all duration-300"
                              whileHover={{ scale: 1.05 }}
                           >
                              <Award className="h-6 w-6 text-amber-700" />
                           </motion.div>
                           <div>
                              <h3 className="font-serif text-xl font-medium text-gray-800 mb-1">World-Class Amenities</h3>
                              <p className="text-gray-600 text-sm">
                                 Nulla dictumst integer netus tempor odio lorem placerat congue suspendisse augue natoque
                              </p>
                           </div>
                        </div>
                     </AnimateWhenVisible>

                     {/* Feature 3 */}
                     <AnimateWhenVisible variants={animateVariants.fadeIn} delay={0.3}>
                        <div className="flex gap-6 items-start group">
                           <motion.div
                              className="flex-shrink-0 p-2 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg shadow-md border border-amber-200/50 group-hover:from-amber-100 group-hover:to-amber-200 transition-all duration-300"
                              whileHover={{ scale: 1.05 }}
                           >
                              <Diamond className="h-6 w-6 text-amber-700" />
                           </motion.div>
                           <div>
                              <h3 className="font-serif text-xl font-medium text-gray-800 mb-1">Perfect for Every Occasion</h3>
                              <p className="text-gray-600 text-sm">
                                 Nulla dictumst integer netus tempor odio lorem placerat congue suspendisse augue natoque
                              </p>
                           </div>
                        </div>
                     </AnimateWhenVisible>

                     {/* Feature 4 */}
                     <AnimateWhenVisible variants={animateVariants.fadeIn} delay={0.4}>
                        <div className="flex gap-6 items-start group">
                           <motion.div
                              className="flex-shrink-0 p-2 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg shadow-md border border-amber-200/50 group-hover:from-amber-100 group-hover:to-amber-200 transition-all duration-300"
                              whileHover={{ scale: 1.05 }}
                           >
                              <Wine className="h-6 w-6 text-amber-700" />
                           </motion.div>
                           <div>
                              <h3 className="font-serif text-xl font-medium text-gray-800 mb-1">Culinary Excellence</h3>
                              <p className="text-gray-600 text-sm">
                                 Nulla dictumst integer netus tempor odio lorem placerat congue suspendisse augue natoque
                              </p>
                           </div>
                        </div>
                     </AnimateWhenVisible>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}