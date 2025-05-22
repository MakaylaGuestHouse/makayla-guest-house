"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
   Star,
   ChevronRight,
   ChevronLeft,
   Coffee,
   Wifi,
   Tv,
   Wind,
   UtensilsCrossed,
   Lock,
   Truck,
   Wine,
   Bath,
   Sparkles,
   Clock
} from "lucide-react";
import { useAnimateInView } from '@/hooks/useAnimateInView';
import { animateVariants, staggerContainer } from '@/lib/constants/animation';
import GoogleMap from "@/components/ui/GoogleMap";
import { BookingForm } from "@/sections/Booking/BookingForm";
import { PagesHero } from "@/components/common/PagesHero";
import { AddressCTA } from "@/components/ui/AddressCTA";
import { SiteAttraction } from "@/components/ui/SiteAttraction";
import { SimilarRooms } from "@/components/ui/similarRooms/SimilarRooms";

const room = {
   id: "deluxe-suite-001",
   name: "Veloria Deluxe Suite",
   roomType: "Suite",
   description: "Experience the height of comfort in our Veloria Deluxe Suite, featuring floor-to-ceiling windows with panoramic views, custom furniture, and a spa-inspired ensuite bathroom.",
   images: [
      "/room10.jpg",
      "/room11.jpg",
      "/room12.jpg",
      "/room13.jpg",
      "/room13.jpg",
      "/room13.jpg",
      "/room14.jpg",
      "/room11.jpg"
   ],
   pricePerNight: 320,
   roomSize: "42 m²",
   bedInfo: {
      totalBeds: 1,
      types: [{ type: "King", quantity: 1 }],
      sofaBed: false,
      extraBedAvailable: false
   },
   maxGuests: 3,
   maxAdults: 2,
   maxChildren: 1,
   hasBalcony: true,
   bathroomType: "Private Bathroom",
   isSmokingAllowed: false,
   hasClimateControl: true,
   housekeepingFrequency: "Daily",
   availability: true,
   rating: 4.9,
   tags: ["Popular", "Best Seller"],
   amenities: [
      { name: "Free High-Speed Wi-Fi", icon: Wifi },
      { name: "Smart TV with Streaming Services", icon: Tv },
      { name: "Air Conditioning & Heating", icon: Wind },
      { name: "Complimentary Breakfast", icon: Coffee },
      { name: "In-Room Safe & Security Features", icon: Lock },
      { name: "Room Service", icon: Truck },
      { name: "Mini Bar", icon: Wine },
      { name: "Luxury Bath Products", icon: Bath },
      { name: "Daily Housekeeping", icon: Sparkles },
      { name: "24/7 Reception or Concierge Service", icon: Clock }
   ]
};

const similarRooms = [
   {
      id: "harmony-deluxe-001",
      name: "Harmony Deluxe Room",
      type: "Room",
      price: 280,
      size: "35 m²",
      bed: "Queen Bed",
      image: "/room10.jpg"
   },
   {
      id: "serenity-premium-001",
      name: "Serenity Premium Suite",
      type: "Suite",
      price: 340,
      size: "48 m²",
      bed: "King Bed",
      image: "/room11.jpg"
   },
   {
      id: "tranquility-suite-001",
      name: "Tranquility Executive Suite",
      type: "Executive Suite",
      price: 380,
      size: "52 m²",
      bed: "King Bed",
      image: "/room12.jpg"
   }
];

const RoomDetails = () => {
   const [activeSlide, setActiveSlide] = useState(0);
   const [isDragging, setIsDragging] = useState(false);
   const [startX, setStartX] = useState(0);
   const scrollContainerRef = useRef(null);

   const { ref: roomInfoRef, controls: roomInfoControls } = useAnimateInView();
   const { ref: amenitiesRef, controls: amenitiesControls } = useAnimateInView();
   const { ref: descriptionRef, controls: descriptionControls } = useAnimateInView();
   const { ref: featuresRef, controls: featuresControls } = useAnimateInView();

   const nextSlide = () => {
      setActiveSlide((prev) => (prev === room?.images.length - 1 ? 0 : prev + 1));
   };

   const prevSlide = () => {
      setActiveSlide((prev) => (prev === 0 ? room?.images.length - 1 : prev - 1));
   };

   const selectSlide = (index) => {
      setActiveSlide(index);
   };

   const handleMouseDown = (e) => {
      setIsDragging(true);
      setStartX(e.pageX || e.touches?.[0].pageX);
   };

   const handleMouseMove = (e) => {
      if (!isDragging) return;
      const currentX = e.pageX || e.touches?.[0].pageX;
      const diff = startX - currentX;

      if (diff > 50) {
         nextSlide();
         setIsDragging(false);
      } else if (diff < -50) {
         prevSlide();
         setIsDragging(false);
      }
   };

   const handleMouseUp = () => {
      setIsDragging(false);
   };

   // Auto scroll the thumbnails to keep active slide in view
   useEffect(() => {
      if (scrollContainerRef.current) {
         const container = scrollContainerRef.current;
         const activeThumb = container.children[activeSlide];

         if (activeThumb) {
            const containerWidth = container.offsetWidth;
            const thumbLeft = activeThumb.offsetLeft;
            const thumbWidth = activeThumb.offsetWidth;

            // Calculate position to center the active thumbnail
            const scrollPos = thumbLeft - (containerWidth / 2) + (thumbWidth / 2);
            container.scrollTo({
               left: scrollPos,
               behavior: 'smooth'
            });
         }
      }
   }, [activeSlide]);

   const showNavigationButtons = room?.images.length > 1;

   return (
      <div className="bg-white">
         <PagesHero />

         {/* Main Content Container */}
         <div className="container w-full pt-12 pb-4">
            <nav className="mb-6 px-4 lg:px-8">
               <ol className="flex flex-wrap items-center text-sm">
                  <li className="flex items-center">
                     <Link href="/" className="text-stone-500 hover:text-amber-700 transition-colors">
                        Home
                     </Link>
                     <ChevronRight className="w-4 h-4 text-stone-400 mx-2" />
                  </li>
                  <li className="flex items-center">
                     <Link href="/rooms" className="text-stone-500 hover:text-amber-700 transition-colors">
                        Rooms
                     </Link>
                     <ChevronRight className="w-4 h-4 text-stone-400 mx-2" />
                  </li>
                  <li className="text-stone-800 font-medium">{room.name}</li>
               </ol>
            </nav>

            <div className="flex flex-col lg:flex-row gap-8 px-4 lg:px-8 w-full">
               {/* Main Content */}
               <div className="flex flex-col w-full lg:w-[60%]">
                  {/* Image Slider */}
                  <div className="relative overflow-hidden rounded-2xl mb-6 shadow-lg bg-white">
                     <div
                        className="relative h-[320px] sm:h-[420px] md:h-[520px] lg:h-[500px] select-none"
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onTouchStart={handleMouseDown}
                        onTouchMove={handleMouseMove}
                        onTouchEnd={handleMouseUp}
                     >
                        {room?.images.map((image, index) => (
                           <motion.div
                              key={index}
                              className="absolute top-0 left-0 w-full h-full"
                              initial={{ opacity: 0 }}
                              animate={{
                                 opacity: activeSlide === index ? 1 : 0,
                                 zIndex: activeSlide === index ? 10 : 0
                              }}
                              transition={{ duration: 0.5 }}
                           >
                              <Image
                                 src={image}
                                 alt={`Room view ${index + 1}`}
                                 fill
                                 priority={index === 0}
                                 className="object-cover"
                              />
                           </motion.div>
                        ))}

                        {showNavigationButtons && (
                           <>
                              {/* Navigation Arrows */}
                              <button
                                 onClick={prevSlide}
                                 className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm hover:bg-white text-stone-800 hover:text-amber-700 rounded-full p-3 shadow-md transition-all duration-300"
                                 aria-label="Previous image"
                              >
                                 <ChevronLeft className="w-5 h-5" />
                              </button>
                              <button
                                 onClick={nextSlide}
                                 className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm hover:bg-white text-stone-800 hover:text-amber-700 rounded-full p-3 shadow-md transition-all duration-300"
                                 aria-label="Next image"
                              >
                                 <ChevronRight className="w-5 h-5" />
                              </button>
                           </>
                        )}

                        {/* Status tag */}
                        <div className="absolute top-6 left-6 z-20">
                           <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white bg-amber-600 shadow-md">
                              {room.availability ? 'Available Now' : 'Fully Booked'}
                           </span>
                        </div>
                     </div>
                  </div>

                  {/* Thumbnails with Navigation Icons */}
                  {showNavigationButtons && (
                     <div className="relative mb-12">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
                           <button
                              onClick={() => {
                                 scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
                              }}
                              className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-md text-stone-700 hover:text-amber-700"
                           >
                              <ChevronLeft className="w-4 h-4" />
                           </button>
                        </div>

                        <div
                           ref={scrollContainerRef}
                           className="flex overflow-x-auto gap-3 pb-2 px-10 snap-x hide-scrollbar"
                           style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                           {room?.images.map((image, index) => (
                              <div
                                 key={index}
                                 className={`flex-shrink-0 cursor-pointer relative rounded-xl overflow-hidden transition-all duration-300 ${activeSlide === index
                                    ? 'ring-2 ring-amber-500 ring-offset-2 shadow-lg'
                                    : 'opacity-70 hover:opacity-100'
                                    }`}
                                 onClick={() => selectSlide(index)}
                              >
                                 <div className="relative h-20 w-32">
                                    <Image
                                       src={image}
                                       alt={`Room thumbnail ${index + 1}`}
                                       fill
                                       className="object-cover snap-center"
                                    />
                                 </div>
                              </div>
                           ))}
                        </div>

                        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
                           <button
                              onClick={() => {
                                 scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
                              }}
                              className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-md text-stone-700 hover:text-amber-700"
                           >
                              <ChevronRight className="w-4 h-4" />
                           </button>
                        </div>
                     </div>
                  )}

                  {/* Room Title & Info */}
                  <motion.div
                     ref={roomInfoRef}
                     variants={animateVariants.fadeIn}
                     initial="hidden"
                     animate={roomInfoControls}
                     className="mb-12"
                  >
                     <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                        <div>
                           <div className="flex flex-wrap items-center gap-3 mb-2">
                              <h1 className="font-serif text-4xl text-stone-800 font-medium">{room.name}</h1>
                              <div className="flex gap-2">
                                 {room.tags.map((tag, index) => (
                                    <span key={index} className="px-3 py-1 text-xs bg-amber-50 text-amber-700 rounded-full font-medium border border-amber-100">
                                       {tag}
                                    </span>
                                 ))}
                              </div>
                           </div>
                           <p className="text-stone-600 font-light tracking-wide uppercase text-sm">{room.roomType}</p>
                        </div>
                        <div>
                           <div className="flex items-center gap-1 mb-2 justify-end">
                              <div className="flex items-center bg-amber-50 px-3 py-1 rounded-full">
                                 <Star className="w-4 h-4 text-amber-500 fill-amber-500 mr-1" />
                                 <span className="font-medium text-stone-800">{room.rating}</span>
                                 <span className="text-stone-500 text-sm ml-1">/ 5.0</span>
                              </div>
                           </div>
                           <div className="flex items-baseline justify-end">
                              <span className="text-3xl font-serif text-stone-800 font-medium">${room.pricePerNight}</span>
                              <span className="text-stone-600 ml-1">/ night</span>
                           </div>
                        </div>
                     </div>

                     {/* Room Key Details */}
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-8">
                        <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 transition-all hover:border-amber-200 hover:shadow-sm">
                           <h3 className="text-xs font-light tracking-wide uppercase text-stone-400 mb-2">Room Size</h3>
                           <p className="text-stone-800 font-medium text-lg">{room.roomSize}</p>
                        </div>
                        <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 transition-all hover:border-amber-200 hover:shadow-sm">
                           <h3 className="text-xs font-light tracking-wide uppercase text-stone-400 mb-2">Bed Type</h3>
                           <p className="text-stone-800 font-medium text-lg">
                              {room.bedInfo.types.map((bed, i) => (
                                 <span key={i}>
                                    {bed.quantity} {bed.type} {i < room.bedInfo.types.length - 1 ? ' & ' : ''}
                                 </span>
                              ))}
                           </p>
                        </div>
                        <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 transition-all hover:border-amber-200 hover:shadow-sm">
                           <h3 className="text-xs font-light tracking-wide uppercase text-stone-400 mb-2">Max Guests</h3>
                           <p className="text-stone-800 font-medium text-lg">
                              {room.maxAdults} Adults, {room.maxChildren} Children
                           </p>
                        </div>
                        <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 transition-all hover:border-amber-200 hover:shadow-sm">
                           <h3 className="text-xs font-light tracking-wide uppercase text-stone-400 mb-2">Housekeeping</h3>
                           <p className="text-stone-800 font-medium text-lg">{room.housekeepingFrequency}</p>
                        </div>
                     </div>
                  </motion.div>

                  {/* Room Description */}
                  <motion.div
                     ref={descriptionRef}
                     variants={animateVariants.fadeIn}
                     initial="hidden"
                     animate={descriptionControls}
                     className="mb-12"
                  >
                     <div className="flex items-center mb-6">
                        <h2 className="font-serif text-2xl text-stone-800 font-medium">About This Room</h2>
                        <div className="h-px bg-amber-300 flex-1 ml-6"></div>
                     </div>
                     <div className="prose max-w-none text-stone-600 leading-relaxed">
                        <p className="text-lg">
                           {room.description}
                        </p>
                        <p>
                           Our Veloria Deluxe Suite offers an unparalleled luxury experience with meticulous attention to detail. The suite features premium hardwood flooring, designer furnishings, and a harmonious color palette that creates a serene atmosphere.
                        </p>
                        <p>
                           The spacious layout includes a dedicated sitting area where you can unwind after a day of exploration or conduct business in comfort. The king-size bed is dressed in premium Egyptian cotton linens and features a custom-designed headboard that serves as the room's focal point.
                        </p>
                        <p>
                           The en-suite bathroom is a sanctuary of relaxation with a rainfall shower, deep soaking tub, heated floors, and premium bath amenities. Thoughtful lighting design throughout the suite creates the perfect ambiance for any time of day.
                        </p>
                     </div>
                  </motion.div>

                  {/* Amenities */}
                  <motion.div
                     ref={amenitiesRef}
                     variants={staggerContainer}
                     initial="hidden"
                     animate={amenitiesControls}
                     className="mb-12"
                  >
                     <div className="flex items-center mb-6">
                        <h2 className="font-serif text-2xl text-stone-800 font-medium">Room Amenities</h2>
                        <div className="h-px bg-amber-300 flex-1 ml-6"></div>
                     </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {room.amenities.map((amenity, index) => {
                           const Icon = amenity.icon;
                           return (
                              <motion.div
                                 key={index}
                                 variants={animateVariants.fadeIn}
                                 className="flex items-center gap-3 p-4 rounded-xl bg-stone-50 border border-stone-100 transition-all hover:border-amber-200 hover:shadow-sm"
                              >
                                 <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 text-amber-700">
                                    <Icon className="w-5 h-5" />
                                 </div>
                                 <span className="text-stone-700 font-medium">{amenity.name}</span>
                              </motion.div>
                           );
                        })}
                     </div>
                  </motion.div>

                  {/* Features & Policies in Tabs */}
                  <motion.div
                     ref={featuresRef}
                     variants={animateVariants.fadeIn}
                     initial="hidden"
                     animate={featuresControls}
                     className="mb-12"
                  >
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="rounded-2xl overflow-hidden shadow-sm border border-stone-100">
                           <div className="bg-amber-50 p-4">
                              <h3 className="font-serif text-xl text-stone-800 font-medium">Room Features</h3>
                           </div>
                           <div className="divide-y divide-stone-100">
                              <div className="px-4 py-2 flex items-center justify-between hover:bg-stone-50">
                                 <span className="text-stone-600">Balcony</span>
                                 <span className="text-stone-800 font-medium">{room.hasBalcony ? 'Yes' : 'No'}</span>
                              </div>
                              <div className="px-4 py-2 flex items-center justify-between hover:bg-stone-50">
                                 <span className="text-stone-600">Bathroom</span>
                                 <span className="text-stone-800 font-medium">{room.bathroomType}</span>
                              </div>
                              <div className="px-4 py-2 flex items-center justify-between hover:bg-stone-50">
                                 <span className="text-stone-600">Smoking</span>
                                 <span className="text-stone-800 font-medium">{room.isSmokingAllowed ? 'Permitted' : 'Not Permitted'}</span>
                              </div>
                              <div className="px-4 py-2 flex items-center justify-between hover:bg-stone-50">
                                 <span className="text-stone-600">Climate Control</span>
                                 <span className="text-stone-800 font-medium">{room.hasClimateControl ? 'Yes' : 'No'}</span>
                              </div>
                           </div>
                        </div>

                        <div className="rounded-2xl overflow-hidden shadow-sm border border-stone-100">
                           <div className="bg-amber-50 p-4">
                              <h3 className="font-serif text-xl text-stone-800 font-medium">Room Policies</h3>
                           </div>
                           <div className="divide-y divide-stone-100">
                              <div className="p-4 hover:bg-stone-50">
                                 <h4 className="font-medium text-stone-800 mb-1">Check-in & Check-out</h4>
                                 <p className="text-stone-600 text-sm">Check-in: From 3:00 PM</p>
                                 <p className="text-stone-600 text-sm">Check-out: Until 11:00 AM</p>
                              </div>
                              <div className="p-4 hover:bg-stone-50">
                                 <h4 className="font-medium text-stone-800 mb-1">Cancellation Policy</h4>
                                 <p className="text-stone-600 text-sm">Free cancellation up to 48 hours before arrival</p>
                                 <p className="text-stone-600 text-sm">Cancellations within 48 hours are subject to one night's charge</p>
                              </div>
                              <div className="p-4 hover:bg-stone-50">
                                 <h4 className="font-medium text-stone-800 mb-1">Extra Guest Policy</h4>
                                 <p className="text-stone-600 text-sm">$40 per additional guest per night</p>
                                 <p className="text-stone-600 text-sm">Children under 6 stay free in existing bedding</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </motion.div>

                  {/* Premium Services */}
                  <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl p-6 mb-12">
                     <h2 className="font-serif text-2xl text-stone-800 font-medium mb-6">Premium Services</h2>
                     <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                        <div className="text-center">
                           <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 shadow-sm">
                              <Sparkles className="w-5 h-5 text-amber-600" />
                           </div>
                           <h3 className="font-medium text-stone-800">Evening Turndown</h3>
                           <p className="text-sm text-stone-600">Included</p>
                        </div>
                        <div className="text-center">
                           <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 shadow-sm">
                              <UtensilsCrossed className="w-5 h-5 text-amber-600" />
                           </div>
                           <h3 className="font-medium text-stone-800">Butler Service</h3>
                           <p className="text-sm text-stone-600">On Request</p>
                        </div>
                        <div className="text-center">
                           <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 shadow-sm">
                              <Truck className="w-5 h-5 text-amber-600" />
                           </div>
                           <h3 className="font-medium text-stone-800">Private Dining</h3>
                           <p className="text-sm text-stone-600">Available</p>
                        </div>
                        <div className="text-center">
                           <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 shadow-sm">
                              <Bath className="w-5 h-5 text-amber-600" />
                           </div>
                           <h3 className="font-medium text-stone-800">Spa Access</h3>
                           <p className="text-sm text-stone-600">Complimentary</p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Sidebar */}
               <div className="w-full lg:w-460]">
                  <div className="lg:sticky lg:top-8">
                     {/* Booking Form */}
                     <div id="reserve" className="bg-white shadow-lg rounded-2xl border border-stone-100 overflow-hidden mb-8">
                        <div className="bg-amber-50 p-4">
                           <h3 className="font-serif text-xl text-stone-800 font-medium">Book This Room</h3>
                        </div>
                        <div className="p-6">
                           <BookingForm />
                        </div>
                     </div>

                     {/* Map Section */}
                     <div className="bg-white shadow-lg rounded-2xl border border-stone-100 overflow-hidden">
                        <div className="bg-amber-50 p-4">
                           <h3 className="font-serif text-xl text-stone-800 font-medium">Location</h3>
                        </div>
                        <div className="p-6">
                           <GoogleMap />
                           <AddressCTA />
                           <SiteAttraction />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <SimilarRooms rooms={similarRooms} />
      </div >
   );
};

export default RoomDetails;