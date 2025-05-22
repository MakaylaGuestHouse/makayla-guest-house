"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Users,
  Home,
  Search,
  Sparkles,
  ChevronDown,
  X,
  Check,
  SlidersHorizontal,
  Wifi,
  Bath,
  Coffee,
  Tv,
  Bed,
  DoorClosed
} from "lucide-react";

// Configuration objects and constants - separated from component logic
const FILTER_CONFIGS = {
  // Default values for filter state
  defaults: {
    location: "All Locations",
    guests: "1 Adult",
    roomType: "All Types",
    bedType: "All Beds",
    priceRange: 500, // Single value for price
    roomSize: "Any Size",
    amenities: [],
    totalBeds: "Any"
  },

  // Filter options
  options: {
    locations: ["All Locations", "Oceanfront", "Mountain View", "City Center"],
    guests: ["1 Adult", "2 Adults", "2 Adults, 1 Child", "2 Adults, 2 Children"],
    roomTypes: ["All Types", "Standard Suite", "Deluxe Suite", "Executive Suite", "Presidential Suite"],
    bedTypes: ["All Beds", "King", "Queen", "Twin", "Double"],
    roomSizes: ["Any Size", "Small (20-30 m²)", "Medium (30-40 m²)", "Large (40-50 m²)", "Extra Large (50+ m²)"],
    totalBeds: ["Any", "1", "2", "3", "4+"]
  },

  // Available amenities
  amenities: [
    { name: "WiFi", icon: <Wifi className="h-4 w-4" />, id: "wifi" },
    { name: "TV", icon: <Tv className="h-4 w-4" />, id: "tv" },
    { name: "Coffee", icon: <Coffee className="h-4 w-4" />, id: "coffee" },
    { name: "Luxury Bath", icon: <Bath className="h-4 w-4" />, id: "bath" }
  ]

};

// Pure helper functions
const getActiveFilters = (formData) => {
  const activeFilters = {};
  const { defaults } = FILTER_CONFIGS;

  // Basic filters
  if (formData.location !== defaults.location) {
    activeFilters.location = formData.location;
  }

  if (formData.guests !== defaults.guests) {
    activeFilters.guests = formData.guests;
  }

  if (formData.roomType !== defaults.roomType) {
    activeFilters.roomType = formData.roomType;
  }

  if (formData.bedType !== defaults.bedType) {
    activeFilters.bedType = formData.bedType;
  }

  // Advanced filters
  if (formData.amenities.length > 0) {
    activeFilters.amenities = formData.amenities;
  }

  if (formData.priceRange !== defaults.priceRange) {
    activeFilters.priceRange = `$${formData.priceRange}`;
  }

  if (formData.roomSize !== defaults.roomSize) {
    activeFilters.roomSize = formData.roomSize;
  }

  if (formData.totalBeds !== defaults.totalBeds) {
    activeFilters.totalBeds = formData.totalBeds;
  }

  return activeFilters;
};

// Main component
export const RoomFilter = ({
  isRoomPage = false,
  initialFilters = null,
  onFiltersApplied = null
}) => {
  const router = useRouter();
  const hasAppliedInitialFilters = useRef(false);

  // State
  const [formData, setFormData] = useState(
    initialFilters ? { ...FILTER_CONFIGS.defaults, ...initialFilters } : { ...FILTER_CONFIGS.defaults }
  );
  const [activeFilters, setActiveFilters] = useState({});
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [hoveredField, setHoveredField] = useState(null);
  const [pendingFormData, setPendingFormData] = useState(
    initialFilters ? { ...FILTER_CONFIGS.defaults, ...initialFilters } : { ...FILTER_CONFIGS.defaults }
  );

  // Calculate initial active filters if initialFilters is provided
  useEffect(() => {
    if (initialFilters && !hasAppliedInitialFilters.current) {
      const initialActiveFilters = getActiveFilters(formData);
      setActiveFilters(initialActiveFilters);
      hasAppliedInitialFilters.current = true;
    }
  }, [initialFilters, formData]);

  // Field change handler
  const handleFieldChange = (name, value) => {
    setPendingFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Price range handler (simplified for single value)
  const handlePriceRangeChange = (e) => {
    setPendingFormData(prev => ({
      ...prev,
      priceRange: parseInt(e.target.value)
    }));
  };

  // Reset form handler - Now applies changes immediately
  const resetFormToDefaults = () => {
    const defaultFormData = { ...FILTER_CONFIGS.defaults };
    setPendingFormData(defaultFormData);
    setFormData(defaultFormData);
    setActiveFilters({});

    // Apply the reset filters immediately via callback
    if (onFiltersApplied) {
      onFiltersApplied(defaultFormData, {});
    }

      router.push("/rooms/#room-listings");
  };

  // Remove filter handler - Now applies changes immediately
  const handleRemoveFilter = (filterKey, value = null) => {
    let updatedFormData;

    if (filterKey === "amenities" && value) {
      // Remove specific amenity
      updatedFormData = {
        ...formData,
        amenities: formData.amenities.filter(a => a !== value)
      };
    } else {
      // Reset specific filter to default
      updatedFormData = {
        ...formData,
        [filterKey]: FILTER_CONFIGS.defaults[filterKey]
      };
    }

    setFormData(updatedFormData);
    setPendingFormData(updatedFormData);

    const newActiveFilters = getActiveFilters(updatedFormData);
    setActiveFilters(newActiveFilters);

    // Apply the updated filters immediately via callback
    if (onFiltersApplied) {
      onFiltersApplied(updatedFormData, newActiveFilters);
    }
  };

  // Amenity toggle handler
  const handleAmenityToggle = (amenity) => {
    setPendingFormData(prev => {
      const currentAmenities = [...prev.amenities];
      return {
        ...prev,
        amenities: currentAmenities.includes(amenity)
          ? currentAmenities.filter(a => a !== amenity)
          : [...currentAmenities, amenity]
      };
    });
  };

  // Submit handler
  const handleSubmit = () => {
    // Apply pending changes to actual form data
    setFormData(pendingFormData);

    // Calculate active filters based on the submitted form data
    const newActiveFilters = getActiveFilters(pendingFormData);
    setActiveFilters(newActiveFilters);

    // Navigate to rooms page with filters
   
      router.push("/rooms/#room-listings");

    // Call the callback if provided
    if (onFiltersApplied) {
      onFiltersApplied(pendingFormData, newActiveFilters);
    }
  };

  // Field hover style helper
  const fieldHoverStyles = (fieldName) =>
    hoveredField === fieldName
      ? "border-b-2 border-rose-400 pb-1"
      : "border-b border-gray-200 pb-2";

  // Selected filters component
  const SelectedFilters = () => {
    if (!isRoomPage || Object.keys(activeFilters).length === 0) return null;

    return (
      <div className="flex flex-wrap gap-2 mt-4">
        {Object.entries(activeFilters).map(([key, value]) => {
          // Handle amenities array separately
          if (key === "amenities" && Array.isArray(value)) {
            return value.map(amenity => (
              <div
                key={`amenity-${amenity}`}
                onClick={() => handleRemoveFilter(key, amenity)}
                className="flex items-center bg-rose-50 text-rose-500 py-1 px-3 rounded-full text-sm hover:bg-rose-100 transition-colors duration-300 cursor-pointer"
              >
                {amenity}
                <X className="h-3 w-3 ml-1" />
              </div>
            ));
          }

          return (
            <div
              key={key}
              onClick={() => handleRemoveFilter(key)}
              className="flex items-center bg-rose-50 text-rose-500 py-1 px-3 rounded-full text-sm hover:bg-rose-100 transition-colors duration-300 cursor-pointer"
            >
              {value}
              <X className="h-3 w-3 ml-1" />
            </div>
          );
        })}

        {Object.keys(activeFilters).length > 1 && (
          <div
            onClick={resetFormToDefaults}
            className="flex items-center bg-gray-100 text-gray-600 py-1 px-3 rounded-full text-sm hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
          >
            Clear All
          </div>
        )}
      </div>
    );
  };

  // Has active filters check
  const hasActiveFilters = Object.keys(activeFilters).length > 0;

  return (
    <div className={`w-full flex justify-center relative z-40 ${isRoomPage ? '-top-20 py-4' : '-top-20 absolute bottom-0 left-0 right-0'}`}>
      <div className={`${isRoomPage ? 'w-full max-w-7xl rounded-xl' : 'w-[95%] md:w-[85%] lg:w-[80%] rounded-t-3xl'} 
        bg-white ${hasActiveFilters ? "shadow" : ""} z-40 overflow-hidden`}
      >

        <div className="relative p-6 md:p-8">
          {/* Gold accent line at top */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-1.5 bg-gradient-to-r from-rose-400 via-amber-300 to-rose-400 rounded-b-full mx-auto shadow-sm"></div>

          {/* Main filter row with redesigned layout for desktop */}
          <div className="flex flex-col md:flex-row md:items-end md:space-x-4 ">
            {/* Main filters grid for mobile, flex for desktop */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 items-end relative md:flex-1">
              {/* Location field */}
              <div className="flex flex-col space-y-2 md:flex-1">
                <label className="text-xs font-bold text-rose-500 uppercase tracking-wider font-sans ml-1 flex items-center">
                  <span>Location</span>
                  {hoveredField === "location" && (
                    <span className="ml-2">
                      <Sparkles className="h-3 w-3 text-amber-400" />
                    </span>
                  )}
                </label>
                <div
                  className={`flex items-center ${fieldHoverStyles("location")} hover:border-rose-300 transition-all duration-300`}
                  onMouseEnter={() => setHoveredField("location")}
                  onMouseLeave={() => setHoveredField(null)}
                >
                  <MapPin className={`h-4 w-4 ${hoveredField === "location" ? "text-rose-500" : "text-amber-500"} transition-colors duration-300 mr-2`} />
                  <select
                    name="location"
                    value={pendingFormData.location}
                    onChange={(e) => handleFieldChange("location", e.target.value)}
                    className="appearance-none bg-transparent w-full focus:outline-none text-gray-800 font-medium cursor-pointer px-1"
                  >
                    {FILTER_CONFIGS.options.locations.map(option => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Guests field */}
              <div className="flex flex-col space-y-2 md:flex-1">
                <label className="text-xs font-bold text-rose-500 uppercase tracking-wider font-sans ml-1 flex items-center">
                  <span>Guests</span>
                  {hoveredField === "guests" && (
                    <span className="ml-2">
                      <Sparkles className="h-3 w-3 text-amber-400" />
                    </span>
                  )}
                </label>
                <div
                  className={`flex items-center ${fieldHoverStyles("guests")} hover:border-rose-300 transition-all duration-300`}
                  onMouseEnter={() => setHoveredField("guests")}
                  onMouseLeave={() => setHoveredField(null)}
                >
                  <Users className={`h-4 w-4 ${hoveredField === "guests" ? "text-rose-500" : "text-amber-500"} transition-colors duration-300 mr-2`} />
                  <select
                    name="guests"
                    value={pendingFormData.guests}
                    onChange={(e) => handleFieldChange("guests", e.target.value)}
                    className="appearance-none bg-transparent w-full focus:outline-none text-gray-800 font-medium cursor-pointer px-1"
                  >
                    {FILTER_CONFIGS.options.guests.map(option => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Room Type field */}
              <div className="flex flex-col space-y-2 md:flex-1">
                <label className="text-xs font-bold text-rose-500 uppercase tracking-wider font-sans ml-1 flex items-center">
                  <span>Room Type</span>
                  {hoveredField === "roomType" && (
                    <span className="ml-2">
                      <Sparkles className="h-3 w-3 text-amber-400" />
                    </span>
                  )}
                </label>
                <div
                  className={`flex items-center ${fieldHoverStyles("roomType")} hover:border-rose-300 transition-all duration-300`}
                  onMouseEnter={() => setHoveredField("roomType")}
                  onMouseLeave={() => setHoveredField(null)}
                >
                  <Home className={`h-4 w-4 ${hoveredField === "roomType" ? "text-rose-500" : "text-amber-500"} transition-colors duration-300 mr-2`} />
                  <select
                    name="roomType"
                    value={pendingFormData.roomType}
                    onChange={(e) => handleFieldChange("roomType", e.target.value)}
                    className="appearance-none bg-transparent w-full focus:outline-none text-gray-800 font-medium cursor-pointer px-1"
                  >
                    {FILTER_CONFIGS.options.roomTypes.map(option => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Bed Type field */}
              <div className="flex flex-col space-y-2 md:flex-1">
                <label className="text-xs font-bold text-rose-500 uppercase tracking-wider font-sans ml-1 flex items-center">
                  <span>Bed Type</span>
                  {hoveredField === "bedType" && (
                    <span className="ml-2">
                      <Sparkles className="h-3 w-3 text-amber-400" />
                    </span>
                  )}
                </label>
                <div
                  className={`flex items-center ${fieldHoverStyles("bedType")} hover:border-rose-300 transition-all duration-300`}
                  onMouseEnter={() => setHoveredField("bedType")}
                  onMouseLeave={() => setHoveredField(null)}
                >
                  <Bed className={`h-4 w-4 ${hoveredField === "bedType" ? "text-rose-500" : "text-amber-500"} transition-colors duration-300 mr-2`} />
                  <select
                    name="bedType"
                    value={pendingFormData.bedType}
                    onChange={(e) => handleFieldChange("bedType", e.target.value)}
                    className="appearance-none bg-transparent w-full focus:outline-none text-gray-800 font-medium cursor-pointer px-1"
                  >
                    {FILTER_CONFIGS.options.bedTypes.map(option => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Submit button - positioned right in line with filters on desktop */}
            <div className="hidden md:block whitespace-nowrap ml-4">
              <div
                onClick={handleSubmit}
                className="relative bg-gradient-to-r from-rose-400 to-amber-400 text-white flex items-center justify-center px-8 py-3 rounded-full font-medium tracking-wide shadow-lg shadow-rose-200/50 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
              >
                {/* Button shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20" />

                {isRoomPage ? (
                  <>
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    <span>Apply</span>
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    <span>Discover</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Action buttons row - centered for mobile */}
          <div className="mt-6 flex justify-center md:justify-between items-center">
            {isRoomPage && (
              <div
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center text-rose-500 cursor-pointer hover:text-rose-600 transition-colors duration-300 md:mx-0 mx-auto"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium"> Filters</span>
                <ChevronDown
                  className={`h-4 w-4 ml-1 transition-transform duration-300 ${showAdvanced ? 'rotate-180' : ''}`}
                />
              </div>
            )}

            {/* Mobile submit button */}
            <div className="md:hidden flex justify-center w-full mt-4">
              <div
                onClick={handleSubmit}
                className="relative bg-gradient-to-r from-rose-400 to-amber-400 text-white flex items-center justify-center px-8 py-3 rounded-full font-medium tracking-wide shadow-lg shadow-rose-200/50 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
              >
                {/* Button shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20" />

                {isRoomPage ? (
                  <>
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    <span>Apply</span>
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    <span>Discover</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Advanced filters section (rooms page only) */}
          {isRoomPage && showAdvanced && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Price Range (simplified single slider) */}
                <div className="space-y-3 order-1 md:order-3">
                  <label className="text-xs font-bold text-rose-500 uppercase tracking-wider font-sans ml-1">
                    Price Range (Max ${pendingFormData.priceRange}/night)
                  </label>
                  <div className="px-4 py-6">
                    <div className="relative">
                      {/* Price labels */}
                      <div className="absolute -top-6 left-0 right-0 flex justify-between text-xs text-gray-500">
                        <span>$0</span>
                        <span>$1000</span>
                      </div>

                      {/* Single slider */}
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        step="50"
                        value={pendingFormData.priceRange}
                        onChange={handlePriceRangeChange}
                        className="w-full h-1 bg-gray-200 rounded appearance-none"
                      />

                      {/* Selected price display */}
                      <div className="mt-6 flex justify-center">
                        <div className="px-4 py-2 bg-rose-50 text-rose-500 rounded-full text-sm font-medium">
                          Max ${pendingFormData.priceRange} per night
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                {/* Amenities */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-rose-500 uppercase tracking-wider font-sans ml-1">
                    Amenities
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {FILTER_CONFIGS.amenities.map(amenity => (
                      <div
                        key={`amenity-btn-${amenity.id}`}
                        onClick={() => handleAmenityToggle(amenity.name)}
                        className={`flex items-center px-3 py-2 rounded-lg border cursor-pointer ${pendingFormData.amenities.includes(amenity.name)
                          ? 'border-rose-300 bg-rose-50 text-rose-500'
                          : 'border-gray-200 hover:border-gray-300 text-gray-600'
                          } transition-colors duration-300`}
                      >
                        <span className="mr-2">
                          {amenity.icon}
                        </span>
                        <span className="text-sm">{amenity.name}</span>
                        {pendingFormData.amenities.includes(amenity.name) && (
                          <span className="ml-auto">
                            <Check className="h-3 w-3" />
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Room Size - New field */}
                <div className="space-y-3 order-2">
                  <label className="text-xs font-bold text-rose-500 uppercase tracking-wider font-sans ml-1">
                    Room Size
                  </label>
                  <div className="flex items-center border-b border-gray-200 pb-2 hover:border-rose-300 transition-all duration-300">
                    <DoorClosed className="h-4 w-4 text-amber-500 mr-2" />
                    <select
                      name="roomSize"
                      value={pendingFormData.roomSize}
                      onChange={(e) => handleFieldChange("roomSize", e.target.value)}
                      className="appearance-none bg-transparent w-full focus:outline-none text-gray-800 font-medium cursor-pointer px-1"
                    >
                      {FILTER_CONFIGS.options.roomSizes.map(option => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Total Beds - New field */}
                <div className="space-y-3 order-3 md:order-1">
                  <label className="text-xs font-bold text-rose-500 uppercase tracking-wider font-sans ml-1">
                    Total Beds
                  </label>
                  <div className="flex items-center border-b border-gray-200 pb-2 hover:border-rose-300 transition-all duration-300">
                    <Bed className="h-4 w-4 text-amber-500 mr-2" />
                    <select
                      name="totalBeds"
                      value={pendingFormData.totalBeds}
                      onChange={(e) => handleFieldChange("totalBeds", e.target.value)}
                      className="appearance-none bg-transparent w-full focus:outline-none text-gray-800 font-medium cursor-pointer px-1"
                    >
                      {FILTER_CONFIGS.options.totalBeds.map(option => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Display selected filters */}
          <SelectedFilters />

          {/* Decorative elements */}
          <div className="absolute top-4 right-6 w-8 h-8 rounded-full bg-gradient-to-br from-amber-200 to-amber-100 opacity-30"></div>
          <div className="absolute bottom-4 left-6 w-6 h-6 rounded-full bg-gradient-to-br from-rose-200 to-amber-100 opacity-20"></div>
          <div className="absolute top-2 right-16 w-2 h-2 bg-amber-300 rounded-full animate-pulse"></div>
          <div className="absolute bottom-8 right-24 w-1 h-1 bg-rose-300 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-2/3 h-6 bg-gradient-to-r from-rose-300/20 via-amber-300/30 to-rose-300/20 blur-xl rounded-full"></div>
        </div>
      </div>
    </div>
  );
};