import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';

const WorkingHours = () => {
   // Working hours data
   const scheduleData = [
      { day: 'Monday', hours: '24/7 Available' },
      { day: 'Tuesday', hours: '24/7 Available' },
      { day: 'Wednesday', hours: '24/7 Available' },
      { day: 'Thursday', hours: '24/7 Available' },
      { day: 'Friday', hours: '24/7 Available' },
      { day: 'Saturday', hours: '24/7 Available' },
      { day: 'Sunday', hours: '24/7 Available' }
   ];

   // Animation variants
   const containerAnimation = {
      hidden: { opacity: 0 },
      visible: {
         opacity: 1,
         transition: {
            staggerChildren: 0.08,
            delayChildren: 0.2
         }
      }
   };

   const itemAnimation = {
      hidden: { opacity: 0, y: 10 },
      visible: {
         opacity: 1,
         y: 0,
         transition: {
            duration: 0.5,
            ease: "easeOut"
         }
      }
   };

   return (
      <motion.div
         className="relative py-12 px-6"
         initial="hidden"
         whileInView="visible"
         viewport={{ once: true }}
         variants={containerAnimation}
      >
         <div className="max-w-lg mx-auto">
            <SectionHeader
               title="Working Hours"
               subTitle="Always Here for You"
               description=" Our dedicated team provides round-the-clock service to ensure your comfort and satisfaction throughout your stay."
            />
            {/* Working Hours Card */}
            <motion.div
               className="relative bg-white bg-opacity-70 backdrop-blur-sm rounded-xl shadow-sm overflow-hidden"
               variants={itemAnimation}
            >
               {/* Gold accent line */}
               <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300"></div>

               <div className="p-6">
                  {/* Service availability header */}
                  <div className="flex items-center justify-center mb-6">
                     <div className="flex items-center text-stone-800">
                        <Clock size={18} className="mr-2 text-amber-600" />
                        <span className="font-medium text-sm">24/7 Concierge Service</span>
                     </div>
                  </div>

                  {/* Schedule list */}
                  <div className="space-y-3">
                     {scheduleData.map((item, index) => (
                        <motion.div
                           key={item.day}
                           className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-stone-50 transition-colors duration-300"
                           variants={itemAnimation}
                        >
                           <div className="flex items-center">
                              <div className="w-2 h-2 rounded-full bg-amber-500 mr-3"></div>
                              <span className="font-serif text-stone-800 font-medium">
                                 {item.day}
                              </span>
                           </div>
                           <span className="text-stone-600 text-sm font-medium">
                              {item.hours}
                           </span>
                        </motion.div>
                     ))}
                  </div>

                  {/* Bottom note */}
                  <div className="mt-6 pt-4 border-t border-stone-200 text-center">
                     <p className="text-stone-600 text-sm">
                        Our dedicated team is always here to assist you
                     </p>
                  </div>
               </div>
            </motion.div>
         </div>
      </motion.div>
   );
};

export default WorkingHours;