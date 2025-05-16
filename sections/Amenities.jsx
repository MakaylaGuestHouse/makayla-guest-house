"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAnimateInView } from '@/hooks/useAnimateInView';
import { animateVariants, staggerContainer } from '@/lib/constants/animation';
import { Brush, Car, Clock, Coffee, ShieldCheck, ShirtIcon, Snowflake, Tv, UtensilsCrossed, Wifi } from "lucide-react";

const amenities = [
  {
    id: 1,
    title: "Free High-Speed Wi-Fi",
    description: "Stay connected with premium high-speed internet throughout your stay.",
    icon: Wifi, // replace with your actual icon import
    category: "connectivity"
  },
  {
    id: 2,
    title: "Complimentary Breakfast",
    description: "Start your day with a delicious complimentary breakfast served fresh each morning.",
    icon: Coffee, // replace as needed
    category: "dining"
  },
  {
    id: 3,
    title: "Air Conditioning & Heating",
    description: "Enjoy full control of your comfort with modern air conditioning and heating systems.",
    icon: Snowflake, // or Thermometer icon
    category: "comfort"
  },
  {
    id: 4,
    title: "Room Service",
    description: "Order from a curated menu and dine in the comfort of your room at your convenience.",
    icon: UtensilsCrossed,
    category: "service"
  },
  {
    id: 5,
    title: "Smart TV with Streaming Services",
    description: "Access your favorite shows and movies with our in-room smart entertainment systems.",
    icon: Tv,
    category: "entertainment"
  },
  {
    id: 6,
    title: "Free On-site Parking",
    description: "Secure, complimentary on-site parking is available for all our guests.",
    icon: Car,
    category: "convenience"
  },
  {
    id: 7,
    title: "Daily Housekeeping",
    description: "Our team ensures your space stays immaculate with daily cleaning services.",
    icon: Brush,
    category: "service"
  },
  {
    id: 8,
    title: "24/7 Reception or Concierge Service",
    description: "Our front desk is available 24/7 to assist you with anything you need during your stay.",
    icon: Clock,
    category: "service"
  },
  {
    id: 9,
    title: "Laundry & Ironing Services",
    description: "Take advantage of our professional laundry and ironing services on request.",
    icon: ShirtIcon,
    category: "service"
  },
  {
    id: 10,
    title: "In-Room Safe & Security Features",
    description: "Your peace of mind is our priority with secure in-room safes and modern security systems.",
    icon: ShieldCheck,
    category: "safety"
  }
];


const categories = [
  { id: "all", name: "All Amenities" },
  { id: "connectivity", name: "Connectivity" },
  { id: "comfort", name: "Comfort" },
  { id: "dining", name: "Dining" },
  { id: "service", name: "Guest Services" },
  { id: "entertainment", name: "Entertainment" },
  { id: "convenience", name: "Convenience" },
  { id: "safety", name: "Safety & Security" }
];

// Amenity card component
const AmenityCard = ({ amenity }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = amenity.icon;
  
  return (
    <motion.div
      className="relative bg-white border border-stone-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
      variants={animateVariants.fadeIn}
      whileHover="hover"

      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-full -mr-12 -mt-12 opacity-20"></div>
      
      <div className="p-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className={`mb-5 rounded-full p-4 ${isHovered ? 'bg-amber-100' : 'bg-stone-50'} transition-colors duration-300`}>
            <Icon size={32} className={`${isHovered ? 'text-amber-700' : 'text-stone-600'} transition-colors duration-300`} />
          </div>
          
          <h3 className="font-serif text-xl text-stone-800 mb-2">{amenity.title}</h3>
          
          <p className={`text-sm text-stone-500 leading-relaxed transition-all duration-300 ${isHovered ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}`}>
            {amenity.description}
          </p>
        </div>
      </div>
      
      {/* Decorative accent line */}
      <div className={`h-1 bg-amber-400 transition-all duration-300 ${isHovered ? 'w-full' : 'w-0'}`}></div>
    </motion.div>
  );
};

// Main component
export default function Amenities() {
  const { ref, controls } = useAnimateInView();
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Filter amenities based on selected category
  const filteredAmenities = activeCategory === "all" 
    ? amenities 
    : amenities.filter(amenity => amenity.category === activeCategory);
  
  return (
    <section id="amenities" className="py-24 relative overflow-hidden">
      {/* Background styling */}
      <div className="absolute inset-0 bg-stone-50 opacity-90"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-amber-50 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-40 left-40 w-80 h-80 rounded-full bg-stone-100 opacity-30 blur-3xl"></div>
        
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-5" 
          style={{
            backgroundImage: `radial-gradient(circle at 1rem 1rem, stone-400 1px, transparent 0)`,
            backgroundSize: '3rem 3rem'
          }}>
        </div>
      </div>
      
      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16"
          variants={animateVariants.fadeIn}
          initial="hidden"
          animate="visible"
        >
          <span className="text-sm font-light uppercase tracking-widest text-amber-700">Experience Luxury</span>
          <h2 className="font-serif text-4xl md:text-5xl text-stone-800 mt-2 mb-4">
            Guest House Amenities
          </h2>
          <div className="mx-auto w-20 h-px bg-amber-400 mb-6"></div>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Indulge in our comprehensive suite of premium amenities designed to elevate your stay from exceptional to unforgettable
          </p>
        </motion.div>
        
        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 border ${
                activeCategory === category.id 
                  ? 'bg-stone-800 text-white border-stone-800' 
                  : 'bg-white text-stone-600 border-stone-200 hover:border-amber-400'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Amenities grid */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filteredAmenities.map(amenity => (
            <AmenityCard key={amenity.id} amenity={amenity} />
          ))}
        </motion.div>
        
        {/* Call to action */}
        <motion.div 
          className="mt-16 text-center"
          variants={animateVariants.fadeIn}
          initial="hidden"
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.5, duration: 0.5 }
          }}
        >
          <div className="bg-white border border-amber-100 rounded-lg p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="font-serif text-2xl text-stone-800 mb-3">Experience All Our Amenities</h3>
            <p className="text-stone-600 mb-6">
              Book your stay today and immerse yourself in the epitome of comfort and luxury
            </p>
            <button className="bg-amber-700 hover:bg-stone-800 text-white px-6 py-3 rounded transition-colors duration-300 font-medium cursor-pointer">
              Book Your Luxurious Stay
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}