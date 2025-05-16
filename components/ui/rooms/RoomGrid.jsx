'use client';

import { motion } from 'framer-motion';
import { staggerContainer } from '@/lib/constants/animation';
import { ChevronRight } from 'lucide-react';
import { RoomCard } from './RoomCard';

// Sample room data based on the provided schema
const roomData = {
  id: "deluxe-suite-001",
  name: "Veloria Deluxe Suite",
  roomType: "Suite",
  description: "Experience the height of comfort in our Veloria Deluxe Suite, featuring floor-to-ceiling windows with panoramic views, custom furniture, and a spa-inspired ensuite bathroom.",
  images: [
    "/room10.jpg",
    "/room12.jpg",
    "/room13.jpg",
    "/room14.jpg",
  ],
  pricePerNight: 320,
  roomSize: "42 m²",
  bedInfo: {
    totalBeds: 1,
    types: [
      {
        type: "King",
        quantity: 1
      }
    ],
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
    "Free High-Speed Wi-Fi",
    "Smart TV with Streaming Services",
    "Air Conditioning & Heating",
    "Complimentary Breakfast",
    "In-Room Safe & Security Features",
    "Room Service",
    "Mini Bar",
    "Luxury Bath Products",
    "Daily Housekeeping",
    "24/7 Reception or Concierge Service"
  ]
};

// Create multiple room instances with variations
const generateRoomData = (count) => {
  // Room variations for a more realistic listing
  const roomVariations = [
    {
      id: "standard-king-001",
      name: "Executive King Room",
      roomType: "Standard",
      pricePerNight: 180,
      roomSize: "28 m²",
      bedInfo: { totalBeds: 1, types: [{ type: "King", quantity: 1 }] },
      maxGuests: 2,
      rating: 4.5,
      tags: ["Popular"]
    },
    {
      id: "premium-twin-001",
      name: "Premium Twin Suite",
      roomType: "Premium",
      pricePerNight: 240,
      roomSize: "32 m²",
      bedInfo: { totalBeds: 2, types: [{ type: "Twin", quantity: 2 }] },
      maxGuests: 2,
      rating: 4.7,
      tags: []
    },
    {
      id: "family-suite-001",
      name: "Luxury Family Suite",
      roomType: "Suite",
      pricePerNight: 420,
      roomSize: "58 m²",
      bedInfo: { totalBeds: 2, types: [{ type: "King", quantity: 1 }, { type: "Twin", quantity: 2 }] },
      maxGuests: 4,
      rating: 4.8,
      tags: ["Best for Families"]
    },
    {
      id: "penthouse-001",
      name: "Penthouse Panorama Suite",
      roomType: "Penthouse",
      pricePerNight: 750,
      roomSize: "120 m²",
      bedInfo: { totalBeds: 1, types: [{ type: "Emperor", quantity: 1 }] },
      maxGuests: 2,
      rating: 5.0,
      tags: ["Exclusive", "Best View"]
    }
  ];

  // Create rooms array with variations
  const rooms = [];
  for (let i = 0; i < count; i++) {
    const variation = i % roomVariations.length;
    const room = {
      ...roomData,
      ...roomVariations[variation],
      id: `${roomVariations[variation].id}-${Math.floor(i/roomVariations.length)}`
    };
    rooms.push(room);
  }
  return rooms;
};

// Room Grid Component
export const RoomGrid = () => {
  const rooms = generateRoomData(6); // Generate 6 room cards

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="font-light text-amber-700 text-sm tracking-wider uppercase mb-2">Luxury Accommodations</p>
          <h2 className="font-serif text-4xl md:text-5xl text-stone-800 mb-6">Our Exclusive Rooms</h2>
          <div className="w-20 h-px bg-amber-400 mx-auto mb-6"></div>
          <p className="text-stone-600 max-w-2xl mx-auto">Experience unparalleled comfort and elegance in our thoughtfully designed spaces, where every detail has been carefully considered for your perfect stay.</p>
        </div>
        
        {/* Room grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </motion.div>
        
        {/* View all button */}
        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center bg-transparent border-2 border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-white transition-colors duration-300 py-3 px-8 rounded-md font-medium"
          >
            View All Rooms
            <ChevronRight size={18} className="ml-2" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default RoomGrid;