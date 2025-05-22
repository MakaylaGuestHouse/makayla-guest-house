import React from 'react'
import { motion } from "framer-motion";
import { BackgroundCircularPatterns } from './BackgroundCircularPatterns';
import { animateVariants } from '@/lib/constants/animation';

export const SectionHeader = ({ title, subTitle, description }) => {
   
   return (
      <motion.div
         className="text-center mb-20 "
         variants={animateVariants.fadeIn}
         initial="hidden"
         animate="visible"
      >
         <h2 className="text-amber-700 font-light tracking-widest uppercase text-sm mb-3">{title}</h2>
         <h3 className="max-w-xl text-center mx-auto font-serif text-4xl md:text-5xl text-stone-800 mb-4 opacity-100" >
            {subTitle}
         </h3>
         <div className="mx-auto w-24 h-px bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200 mb-6"></div>
         <p className="text-stone-600 max-w-2xl mx-auto font-light tracking-wide" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "1.05rem" }}>
            {description}
         </p>
      </motion.div>
   )
}
