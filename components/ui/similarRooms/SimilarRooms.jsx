import React from 'react'
import Image from 'next/image';
import routes from "@/lib/routes";
import { ArrowUpRight } from 'lucide-react';
import { motion } from "framer-motion";
import { useAnimateInView } from '@/hooks/useAnimateInView';
import { animateVariants, staggerContainer } from '@/lib/constants/animation';
import { useAppRouter } from '@/hooks/useAppRouter';
import Link from 'next/link';

export const SimilarRooms = ({ rooms }) => {
   const { navigateTo } = useAppRouter();
   const { ref: similarRoomsRef, controls: similarRoomsControls } = useAnimateInView();

   return (
      <div className="container w-full px-4 lg:px-8 py-12">
         <motion.div
            ref={similarRoomsRef}
            variants={staggerContainer}
            initial="hidden"
            animate={similarRoomsControls}
            className="mb-12"
         >
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center">
                  <h2 className="font-serif text-2xl text-stone-800 font-medium">Similar Rooms</h2>
                  <div className="h-px bg-amber-300 w-32 ml-6"></div>
               </div>
               <Link
                  href={routes.rooms}
                  className="flex items-center text-amber-700 hover:text-amber-600 transition-colors font-medium group"
               >
                  View all rooms
                  <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
               </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {rooms?.map((room) => (
                  <motion.div
                     key={room._id}
                     variants={animateVariants.fadeIn}
                     className="group"
                     onClick={() => navigateTo(`${routes.roomDetails(room._id)}`)}
                  >
                     <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-stone-100 group-hover:border-amber-200 cursor-pointer">
                        <div className="relative h-48 lg:h-56">
                           <Image
                              src={room?.images[0]?.image}
                              alt={room.name}
                              fill
                              className="object-cover transition-all duration-500 group-hover:scale-105"
                           />

                           <div className="absolute bottom-0 right-0 p-4 translate-y-0 transition-transform duration-300">
                              <span className="inline-block bg-white text-stone-800 font-medium px-3 py-1 rounded-md text-sm">
                                 From GHS{room.price}/night
                              </span>
                           </div>
                        </div>
                        <div className="p-5">
                           <h3 className="font-serif text-xl text-stone-800 mb-1 group-hover:text-amber-700 transition-colors">{room.name}</h3>
                           <p className="text-stone-500 font-light tracking-wide uppercase text-xs mb-3">{room.roomType}</p>
                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-stone-600 text-sm">
                                 <span>{room.roomSize}</span>
                                 <span className="w-1 h-1 rounded-full bg-stone-400"></span>
                                 <span>   {room.bedTypes.map((bed, i) => (
                                    <span key={i}>
                                       {bed.quantity} {bed.type} {i < room.bedTypes.length - 1 ? ' & ' : ''}
                                    </span>
                                 ))}</span>
                              </div>
                              <button className="text-amber-700 hover:text-amber-600 transition-colors text-sm font-medium flex items-center">
                                 View
                                 <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                              </button>
                           </div>
                        </div>
                     </div>
                  </motion.div>
               ))}
            </div>
         </motion.div>
      </div >
   )
}
