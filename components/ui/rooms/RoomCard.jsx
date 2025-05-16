import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { animateVariants } from '@/lib/constants/animation';
import { Star, Users, Wifi, Coffee, Wind, ChevronRight, Heart } from 'lucide-react';

// Room Card Component
export const RoomCard = ({ room }) => {
   const [isHovered, setIsHovered] = useState(false);
   const [isFavorite, setIsFavorite] = useState(false);

   // Format bed information for display
   const formatBedInfo = () => {
      return room.bedInfo.types.map(bed => `${bed.quantity} ${bed.type} Bed${bed.quantity > 1 ? 's' : ''}`).join(', ');
   };

   return (
      <motion.div
         className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
         variants={animateVariants.fadeIn}
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
      >
         {/* Tag badge */}
         {room.tags && room.tags.length > 0 && (
            <div className="absolute top-4 left-4 z-10">
               <span className="bg-amber-400 bg-opacity-90 backdrop-blur-sm text-stone-800 text-xs font-medium px-3 py-1 rounded-full">
                  {room.tags[0]}
               </span>
            </div>
         )}

         {/* Favorite button */}
         <button
            className="absolute top-4 right-4 z-10 bg-white bg-opacity-80 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-opacity-100 transition-all"
            onClick={() => setIsFavorite(!isFavorite)}
         >
            <Heart
               size={18}
               className={`transition-colors ${isFavorite ? 'fill-amber-500 text-amber-500' : 'text-stone-400'}`}
            />
         </button>

         {/* Room image with zoom effect */}
         <div className="relative h-64 w-full overflow-hidden">
            <motion.div
               className="h-full w-full"
               animate={{ scale: isHovered ? 1.05 : 1 }}
               transition={{ duration: 0.4 }}
            >
               <Image
                  src={room.images[0]}
                  alt={room.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={true}
               />
            </motion.div>

            {/* Price tag */}
            <div className="absolute bottom-0 right-0 bg-stone-800 bg-opacity-90 backdrop-blur-sm px-4 py-2 text-white">
               <p className="text-sm font-light uppercase tracking-wider">From</p>
               <p className="text-xl font-serif">${room.pricePerNight}<span className="text-sm font-light"> / night</span></p>
            </div>
         </div>

         {/* Content area */}
         <div className="p-6">
            {/* Room type and rating */}
            <div className="flex justify-between items-center mb-2">
               <span className="text-amber-700 text-xs font-light uppercase tracking-wider">{room.roomType}</span>
               <div className="flex items-center">
                  <Star size={16} className="text-amber-400 fill-amber-400" />
                  <span className="ml-1 text-stone-800 font-medium">{room.rating}</span>
               </div>
            </div>

            {/* Room name */}
            <h3 className="font-serif text-xl text-stone-800 mb-3">{room.name}</h3>

            {/* Divider */}
            <div className="w-16 h-px bg-amber-400 mb-4"></div>

            {/* Key room features */}
            <div className="flex flex-wrap gap-y-3 gap-x-4 mb-6">
               <div className="flex items-center">
                  <Users size={16} className="text-stone-500 mr-2" />
                  <span className="text-sm text-stone-600">Up to {room.maxGuests} guests</span>
               </div>
               <div className="flex items-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone-500 mr-2">
                     <path d="M2 4v16M4 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
                     <path d="M4 10h16M2 16h20M8 4v4M8 16v4" />
                  </svg>
                  <span className="text-sm text-stone-600">{formatBedInfo()}</span>
               </div>
               <div className="flex items-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone-500 mr-2">
                     <rect x="4" y="2" width="16" height="20" rx="2" />
                     <line x1="8" y1="2" x2="8" y2="4" />
                     <line x1="16" y1="2" x2="16" y2="4" />
                     <circle cx="12" cy="12" r="6" />
                  </svg>
                  <span className="text-sm text-stone-600">{room.roomSize}</span>
               </div>
            </div>

            {/* Top amenities */}
            <div className="flex flex-wrap gap-3 mb-6">
               <div className="flex items-center bg-stone-50 px-3 py-1 rounded-full">
                  <Wifi size={14} className="text-amber-700 mr-1" />
                  <span className="text-xs text-stone-600">Wi-Fi</span>
               </div>
               <div className="flex items-center bg-stone-50 px-3 py-1 rounded-full">
                  <Coffee size={14} className="text-amber-700 mr-1" />
                  <span className="text-xs text-stone-600">Breakfast</span>
               </div>
               <div className="flex items-center bg-stone-50 px-3 py-1 rounded-full">
                  <Wind size={14} className="text-amber-700 mr-1" />
                  <span className="text-xs text-stone-600">AC</span>
               </div>
               {room.hasBalcony && (
                  <div className="flex items-center bg-stone-50 px-3 py-1 rounded-full">
                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-700 mr-1">
                        <rect x="4" y="4" width="16" height="16" rx="2" />
                        <path d="M4 12h16" />
                        <path d="M12 4v16" />
                     </svg>
                     <span className="text-xs text-stone-600">Balcony</span>
                  </div>
               )}
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3">
               <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-stone-800 hover:bg-amber-700 text-white py-3 px-6 rounded-md transition-colors duration-300 text-sm font-medium tracking-wide"
               >
                  Book Now
               </motion.button>
               <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center bg-white border border-stone-200 text-stone-800 py-3 px-4 rounded-md hover:border-amber-400 transition-colors duration-300"
               >
                  <span className="text-sm font-medium mr-1">Details</span>
                  <ChevronRight size={16} />
               </motion.button>
            </div>
         </div>
      </motion.div>
   );
};
