import { motion } from 'framer-motion';
import { Phone, Star } from 'lucide-react';
import { useAnimateInView } from '@/hooks/useAnimateInView';
import { animateVariants, staggerContainer } from '@/lib/constants/animation';

export const BookingLeftContent = () => {
      const { ref, controls } = useAnimateInView();
   return (
      <motion.div
         ref={ref}
         variants={staggerContainer}
         initial="hidden"
         animate={controls}
         className="w-full lg:w-1/2 text-white pr-0 lg:pr-16 pb-16 lg:pb-0"
      >
         {/* 5-Star Rating */}
         <motion.div
            variants={animateVariants.fadeIn}
            className="flex items-center mb-8 space-x-1"
         >
            {[...Array(5)].map((_, i) => (
               <Star key={i} size={20} className="text-amber-400 fill-amber-400" />
            ))}
         </motion.div>

         <motion.h2
            variants={animateVariants.fadeInLeft}
            className="font-serif text-4xl md:text-5xl leading-tight text-white mb-8"
         >
            Each Of Our Guest Rooms Feature a Private Bath, Wi-Fi, Cable Television And Include Full Breakfast.
         </motion.h2>

         {/* Decorative Line */}
         <motion.div
            variants={animateVariants.scaleIn}
            className="mb-8"
         >
            <div className="w-20 h-px bg-amber-400"></div>
         </motion.div>

         <motion.div
            variants={animateVariants.fadeIn}
            className="mb-12"
         >
            <p className="text-stone-300 leading-relaxed mb-6">
               Experience unparalleled comfort and elegance in our meticulously designed accommodations. Every detail has been thoughtfully curated to ensure your stay exceeds expectations.
            </p>
            <p className="text-stone-300 leading-relaxed">
               Our commitment to excellence is reflected in every aspect of your stay, from the premium amenities to the personalized service that defines true luxury.
            </p>
         </motion.div>

         {/* Reservation Contact */}
         <motion.div
            variants={animateVariants.fadeIn}
            className="flex items-center"
         >
            <div className="mr-4">
               <div className="w-12 h-12 rounded-full border border-amber-400/30 flex items-center justify-center">
                  <Phone size={20} className="text-amber-400" />
               </div>
            </div>
            <div>
               <p className="font-light text-stone-400 text-sm tracking-wider uppercase mb-1">Reservation</p>
               <p className="font-serif text-2xl text-white">+233 595 631 886</p>
            </div>
         </motion.div>
      </motion.div>
   )
}
