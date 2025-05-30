"use client";
import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer } from '@/lib/constants/animation';
import { ChevronRight } from 'lucide-react';
import { RoomCard } from './RoomCard';
import { RoomFilter } from './RoomFilter';
import { PagesHero } from '@/components/common/PagesHero';
import { useSearchParams } from 'next/navigation';
import { heroSectionData } from '@/data';

// Separate component that uses useSearchParams
const RoomsPageContent = ({ rooms, roomsCount }) => {
  const [filteredRooms, setFilteredRooms] = useState(rooms);
  const [activeFilters, setActiveFilters] = useState({});

  const searchParams = useSearchParams();

  // Extract initial filter values from URL parameters
  const location = searchParams.get('location');
  const roomType = searchParams.get('roomType');
  const bedType = searchParams.get('bedType');
  const isFromHomePage = searchParams.get('isFromHomePage');

  const [filterFormData, setFilterFormData] = useState({
    location: location || "All Locations",
    roomType: roomType || "All Types",
    bedType: bedType || "All Beds",
    amenities: [],
    roomSize: "Any Size",
  });

  // Add a key state to force re-render of all room cards when filters change
  const [animationKey, setAnimationKey] = useState(0);

  // Function to handle filter application
  const handleFiltersApplied = (formData, filters) => {
    setFilterFormData(formData);
    setActiveFilters(filters);

    // Apply filtering logic based on the form data
    const filtered = rooms?.filter(room => {
      // Location filter
      if (formData.location !== "All Locations" && !room.name?.includes(formData.location)) {
        return false;
      }

      // Room type filter
      if (formData.roomType !== "All Types" && room.roomType !== formData.roomType) {
        return false;
      }

      // Bed type filter
      if (formData.bedType !== "All Beds" &&
        !room.bedTypes.some(bed => bed.type === formData.bedType)) {
        return false;
      }

      // Price range filter
      if (room.pricePerNight > formData.priceRange) {
        return false;
      }

      // Guests filter
      let guestCount = 1;
      if (formData.guests === "2 Adults") guestCount = 2;
      else if (formData.guests === "2 Adults, 1 Child") guestCount = 3;
      else if (formData.guests === "2 Adults, 2 Children") guestCount = 4;

      if (room.maxGuests < guestCount) {
        return false;
      }

      // Amenities filter
      if (formData.amenities.length > 0) {
        const hasAllAmenities = formData.amenities.every(amenity =>
          room.amenities.includes(amenity)
        );
        if (!hasAllAmenities) {
          return false;
        }
      }

      // Room size filter
      if (formData.roomSize !== "Any Size") {
        const roomSizeRange = formData.roomSize.match(/\d+/g);
        if (roomSizeRange) {
          const roomSizeValue = parseInt(room.roomSize);
          const minSize = parseInt(roomSizeRange[0]);
          const maxSize = roomSizeRange.length > 1 ? parseInt(roomSizeRange[1]) : 1000;

          if (roomSizeValue < minSize || roomSizeValue > maxSize) {
            return false;
          }
        }
      }

      // Total beds filter
      if (formData.totalBeds !== "Any") {
        const totalBeds = formData.totalBeds === "4+" ? 4 : parseInt(formData.totalBeds);
        if (room.bedInfo.totalBeds < totalBeds) {
          return false;
        }
      }

      // If all filters passed, include the room
      return true;
    });

    setFilteredRooms(filtered);
    // Increment the animation key to force re-render with fresh animation states
    setAnimationKey(prevKey => prevKey + 1);
  };

  // Extract URL parameters on component mount
  useEffect(() => {
    if (isFromHomePage === "true") {
      handleFiltersApplied(filterFormData, filterFormData)
    }
  }, []);

  // Function to reset filters
  const resetFilters = () => {
    setFilteredRooms(rooms);
    setActiveFilters({});
    setFilterFormData(null);
    // setInitialFiltersFromURL(null);
    // Increment the animation key to force re-render with fresh animation states
    setAnimationKey(prevKey => prevKey + 1);
  };

  // Scroll to room listings
  const scrollToRooms = () => {
    document.getElementById('room-listings').scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Hero Section */}
      <PagesHero
        title={heroSectionData.rooms.title}
        description={heroSectionData.rooms.description}
        buttonLabel='View Our Rooms'
        onClick={scrollToRooms}
      />

      {/* Room Filter - Pass the URL filters as initialFilters */}
      <RoomFilter
        isRoomPage={true}
        initialFilters={filterFormData}
        onFiltersApplied={handleFiltersApplied}
      />

      {/* Room Grid Section */}
      <section id="room-listings" className="py-16 px-4 md:px-8 lg:px-16 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <p className="font-light text-amber-700 text-sm tracking-wider uppercase mb-2">
              Luxury Accommodations
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-stone-800 mb-6">
              Our Exclusive Rooms
            </h2>
            <div className="w-20 h-px bg-amber-400 mx-auto mb-6" aria-hidden="true"></div>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Experience unparalleled comfort and elegance in our thoughtfully designed spaces,
              where every detail has been carefully considered for your perfect stay.
            </p>
          </div>

          {/* Screen reader announcement for filter results */}
          <div aria-live="polite" className="sr-only" id="filter-results">
            {filteredRooms.length === 0
              ? "No rooms match your current filters."
              : `Showing ${filteredRooms.length} of ${roomsCount} rooms`
            }
          </div>

          {/* Room grid */}
          {filteredRooms.length > 0 ? (
            <motion.div
              key={animationKey} // Key changes force complete re-render
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible" // Changed from whileInView to animate
              viewport={{ once: false }} // Changed from true to false
              role="region"
              aria-label="Available rooms"
            >
              <AnimatePresence>
                {filteredRooms.map((room, index) => (
                  <motion.div
                    key={`${room._id}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <RoomCard key={room._id} room={room} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-16" role="region" aria-label="No rooms found">
              <p className="text-stone-600 text-lg mb-6">
                No rooms match your current filters.
              </p>
              <button
                onClick={resetFilters}
                className="inline-flex items-center bg-amber-700 text-white hover:bg-amber-800 transition-colors duration-300 py-2 px-6 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                aria-describedby="reset-filters-help"
              >
                View All Rooms
              </button>
              <div id="reset-filters-help" className="sr-only">
                This will clear all filters and show all available rooms
              </div>
            </div>
          )}

          {/* Conditional "View All" button - only show if filters are active and not all rooms are showing */}
          {Object.keys(activeFilters).length > 0 && filteredRooms.length < rooms.length && filteredRooms.length > 0 && (
            <div className="text-center mt-12">
              <p className="text-stone-600 mb-2" aria-live="polite">
                Showing {filteredRooms.length} of {roomsCount} rooms
              </p>
              <motion.button
                onClick={resetFilters}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center bg-transparent border-2 border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-white transition-colors duration-300 py-3 px-8 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2"
                aria-describedby="view-all-help"
              >
                View All Rooms
                <ChevronRight size={18} className="ml-2" aria-hidden="true" />
                <span className="sr-only">Clear all filters and show all rooms</span>
              </motion.button>
              <div id="view-all-help" className="sr-only">
                Currently showing filtered results. Click to see all available rooms.
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

// Loading component for Suspense fallback
const RoomsPageLoading = () => (
  <div className="min-h-screen bg-stone-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700 mx-auto mb-4"></div>
      <p className="text-stone-600">Loading rooms...</p>
      <span className="sr-only">Please wait while we load the room listings</span>
    </div>
  </div>
);

// Main component with Suspense wrapper
export const RoomsPage = ({ rooms, roomsCount }) => {
  return (
    <Suspense fallback={<RoomsPageLoading />}>
      <RoomsPageContent rooms={rooms} roomsCount={roomsCount} />
    </Suspense>
  );
};

export default RoomsPage;