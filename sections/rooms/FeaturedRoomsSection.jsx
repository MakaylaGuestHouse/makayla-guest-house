import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAnimateInView } from '@/hooks/useAnimateInView';
import { animateVariants, staggerContainer } from '@/lib/constants/animation';

const FeaturedRoomsSection = () => {
   const { ref: sectionRef, controls: sectionControls } = useAnimateInView(0.1);

   // Featured rooms data
   const featuredRooms = [
      {
         id: 1,
         title: "Oceanview Suite",
         description: "Luxurious suite with panoramic ocean views, private balcony, and premium amenities for an unforgettable coastal experience.",
         price: 450,
         images: ["/room10.jpg", "/room11.jpg"],
         amenities: ["King Bed", "Ocean View", "Balcony", "Rain Shower"],
         size: "55 m²",
         occupancy: "2 Adults",
         available: true
      },
      {
         id: 2,
         title: "Garden Villa",
         description: "Secluded villa surrounded by lush gardens with private pool, outdoor dining area, and direct beach access.",
         price: 680,
         images: ["/room12.jpg", "/room13.jpg"],
         amenities: ["King Bed", "Private Pool", "Garden View", "Outdoor Dining"],
         size: "85 m²",
         occupancy: "2 Adults, 2 Children",
         available: true
      },
      {
         id: 3,
         title: "Penthouse Suite",
         description: "Exclusive top-floor suite with 360° views, private terrace, luxury furnishings, and personalized butler service.",
         price: 890,
         images: ["/room14.jpg", "/room11.jpg"],
         amenities: ["King Bed", "Panoramic View", "Private Terrace", "Butler Service"],
         size: "120 m²",
         occupancy: "2 Adults",
         available: false
      },
      {
         id: 4,
         title: "Beachfront Cottage",
         description: "Charming standalone cottage steps from the shoreline with private veranda and unobstructed sunset views.",
         price: 520,
         images: ["/room13.jpg", "/room14.jpg"],
         amenities: ["Queen Bed", "Beach Access", "Private Veranda", "Sunset View"],
         size: "65 m²",
         occupancy: "2 Adults",
         available: true
      }
   ];

   // Filter system
   const [activeFilter, setActiveFilter] = useState("all");
   const filters = ["all", "ocean view", "garden", "beachfront"];

   const filteredRooms = activeFilter === "all"
      ? featuredRooms
      : featuredRooms.filter(room =>
         room.title.toLowerCase().includes(activeFilter) ||
         room.description.toLowerCase().includes(activeFilter)
      );

   return (
      <section className="py-24 bg-white relative">
         {/* Subtle background elements */}
         <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-stone-50 rounded-bl-full opacity-70" />
         <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-amber-50 rounded-tr-full opacity-70" />

         <div className="container mx-auto px-6 max-w-7xl relative">
            {/* Section heading */}
            <motion.div
               ref={sectionRef}
               initial="hidden"
               animate={sectionControls}
               variants={animateVariants.fadeIn}
               className="mb-16 max-w-xl mx-auto text-center"
            >
               <h2 className="font-light text-stone-400 uppercase tracking-widest mb-3">Featured Accommodations</h2>
               <h3 className="text-4xl md:text-5xl font-serif text-stone-800 mb-6">Exceptional Spaces for Your Stay</h3>
               <div className="w-20 h-px bg-amber-400 mx-auto mb-8"></div>
               <p className="text-stone-600">Discover our meticulously designed rooms and suites, each offering a perfect blend of comfort, elegance, and distinctive character.</p>
            </motion.div>

            {/* Filter buttons */}
            <motion.div
               initial="hidden"
               animate={sectionControls}
               variants={{
                  hidden: { opacity: 0 },
                  visible: {
                     opacity: 1,
                     transition: { delay: 0.2 }
                  }
               }}
               className="flex flex-wrap justify-center gap-3 mb-12"
            >
               {filters.map((filter) => (
                  <button
                     key={filter}
                     onClick={() => setActiveFilter(filter)}
                     className={`px-6 py-2 text-sm transition-all duration-300 border ${activeFilter === filter
                           ? 'border-amber-400 bg-amber-50 text-amber-800'
                           : 'border-stone-200 text-stone-500 hover:border-stone-300'
                        }`}
                  >
                     {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
               ))}
            </motion.div>

            {/* Room cards */}
            <motion.div
               variants={staggerContainer}
               initial="hidden"
               animate={sectionControls}
               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
               {filteredRooms.map((room, index) => (
                  <RoomCard key={room.id} room={room} index={index} />
               ))}
            </motion.div>

            {/* View all rooms button */}
            <motion.div
               initial="hidden"
               animate={sectionControls}
               variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                     opacity: 1,
                     y: 0,
                     transition: { delay: 0.8, duration: 0.5 }
                  }
               }}
               className="mt-16 text-center"
            >
               <button className="px-8 py-3 bg-white border-2 border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-white transition-colors duration-300">
                  Explore All Accommodations
               </button>
            </motion.div>
         </div>

         {/* Booking assistance */}
         <motion.div
            initial="hidden"
            animate={sectionControls}
            variants={{
               hidden: { opacity: 0 },
               visible: {
                  opacity: 1,
                  transition: { delay: 1, duration: 0.6 }
               }
            }}
            className="mt-24 py-12 bg-stone-50"
         >
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
               <div>
                  <h4 className="text-2xl font-serif text-stone-800 mb-2">Need assistance with your booking?</h4>
                  <p className="text-stone-600">Our concierge team is available 24/7 to help you select the perfect accommodation.</p>
               </div>
               <div className="flex gap-4">
                  <a href="tel:+18005551234" className="flex items-center gap-2 px-5 py-3 bg-white border border-stone-200 text-stone-800 hover:border-amber-400 transition-colors">
                     <span className="w-5 h-5 flex items-center justify-center rounded-full bg-amber-100 text-amber-700">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                           <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                     </span>
                     +233-595631886
                  </a>
                  <button className="px-5 py-3 bg-amber-700 text-white hover:bg-amber-800 transition-colors">
                     Live Chat
                  </button>
               </div>
            </div>
         </motion.div>
      </section>
   );
};

// Individual room card component
const RoomCard = ({ room, index }) => {
   const { ref, controls } = useAnimateInView(0.1);
   const [activeImage, setActiveImage] = useState(0);
   const [showDetails, setShowDetails] = useState(false);

   return (
      <motion.div
         ref={ref}
         variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
               opacity: 1,
               y: 0,
               transition: {
                  delay: index * 0.1 + 0.3,
                  duration: 0.6,
                  ease: "easeOut"
               }
            }
         }}
         initial="hidden"
         animate={controls}
         className="group bg-white shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
      >
         {/* Image */}
         <div className="relative overflow-hidden aspect-[4/3] bg-stone-100">
            <img
               src={room.images[activeImage]}
               alt={room.title}
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Image navigation dots */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1">
               {room.images.map((_, imgIndex) => (
                  <button
                     key={imgIndex}
                     onClick={(e) => {
                        e.preventDefault();
                        setActiveImage(imgIndex);
                     }}
                     className={`w-2 h-2 rounded-full ${activeImage === imgIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                     aria-label={`View image ${imgIndex + 1} of room ${room.title}`}
                  />
               ))}
            </div>

            {/* Availability tag */}
            {!room.available && (
               <div className="absolute top-4 right-4 bg-stone-800 text-white text-xs px-3 py-1">
                  Available Soon
               </div>
            )}

            {/* Quick view button */}
            <button
               onClick={() => setShowDetails(!showDetails)}
               className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-stone-800 px-3 py-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
               Quick View
            </button>
         </div>

         {/* Content */}
         <div className="p-6 flex flex-col flex-grow">
            <div className="flex justify-between items-start mb-3">
               <h4 className="text-xl font-serif text-stone-800">{room.title}</h4>
               <div className="text-right">
                  <span className="text-lg font-medium text-amber-700">${room.price}</span>
                  <span className="text-sm text-stone-400 block">per night</span>
               </div>
            </div>

            <p className="text-stone-600 mb-4 line-clamp-2">{room.description}</p>

            {/* Room details */}
            <div className={`grid grid-cols-2 gap-2 text-sm text-stone-500 mb-4 ${showDetails ? 'block' : 'hidden'}`}>
               <div className="flex items-center gap-1">
                  <span className="w-4 h-4 flex items-center justify-center rounded-full bg-amber-50 text-amber-600">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M11 11V5a2 2 0 0 1 4 0v.5"></path>
                     </svg>
                  </span>
                  {room.size}
               </div>
               <div className="flex items-center gap-1">
                  <span className="w-4 h-4 flex items-center justify-center rounded-full bg-amber-50 text-amber-600">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                     </svg>
                  </span>
                  {room.occupancy}
               </div>
            </div>

            {/* Amenities */}
            <div className={`mb-6 ${showDetails ? 'block' : 'hidden'}`}>
               <div className="text-sm font-medium text-stone-700 mb-2">Amenities</div>
               <div className="flex flex-wrap gap-2">
                  {room.amenities.map((amenity, i) => (
                     <span key={i} className="text-xs bg-stone-50 text-stone-600 px-2 py-1">
                        {amenity}
                     </span>
                  ))}
               </div>
            </div>

            {/* Button */}
            <div className="mt-auto pt-4 border-t border-stone-100 flex">
               <a href={`/rooms/${room.id}`} className="inline-block w-full text-center py-3 bg-stone-800 text-white hover:bg-amber-700 transition-colors duration-300">
                  View Details
               </a>
            </div>
         </div>
      </motion.div>
   );
};

export default FeaturedRoomsSection;