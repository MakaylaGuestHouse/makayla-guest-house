import { useState } from "react";
import { MapPin, Calendar, Users, Home, Search, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function RoomFilter() {
  // Form state
  const [formData, setFormData] = useState({
    location: "All Locations",
    dates: "",
    guests: "1 Adult",
    roomType: "All Types"
  });
  
  // Track hover states for enhanced visual feedback
  const [hoveredField, setHoveredField] = useState(null);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Would normally send data to an API
    console.log("Searching with parameters:", formData);
    alert("✨ Luxury Search Initiated ✨\n" + JSON.stringify(formData, null, 2));
  };
  
  const fieldHoverStyles = (fieldName) => 
    hoveredField === fieldName ? "border-b-2 border-rose-400 pb-1" : "border-b border-gray-200 pb-2";
  
  return (
    <div className="absolute bottom-0 left-0 right-0 flex justify-center z-30">
      <motion.div 
        className="w-[80%] rounded-t-3xl bg-white/95 shadow-2xl border-t border-l border-r border-pink-100 backdrop-blur-md"
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
      >
        {/* Decorative top shine */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white to-transparent rounded-t-3xl opacity-80"></div>
        
        <div className="relative p-8 backdrop-blur-xl rounded-t-3xl">
          {/* Gold accent line at top */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-1.5 bg-gradient-to-r from-rose-400 via-amber-300 to-rose-400 rounded-b-full mx-auto shadow-sm"></div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-end relative">
              {/* Location field */}
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-bold text-rose-500 uppercase tracking-wider font-sans ml-1 flex items-center">
                  <span>Location</span>
                  {hoveredField === "location" && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="ml-2"
                    >
                      <Sparkles className="h-3 w-3 text-amber-400" />
                    </motion.span>
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
                    value={formData.location}
                    onChange={handleChange}
                    className="appearance-none bg-transparent w-full focus:outline-none text-gray-800 font-medium cursor-pointer"
                  >
                    <option>All Locations</option>
                    <option>Oceanfront</option>
                    <option>Mountain View</option>
                    <option>City Center</option>
                  </select>
                </div>
              </div>
              
              {/* Dates field */}
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-bold text-rose-500 uppercase tracking-wider font-sans ml-1 flex items-center">
                  <span>Check-in / Out</span>
                  {hoveredField === "dates" && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="ml-2"
                    >
                      <Sparkles className="h-3 w-3 text-amber-400" />
                    </motion.span>
                  )}
                </label>
                <div 
                  className={`flex items-center ${fieldHoverStyles("dates")} hover:border-rose-300 transition-all duration-300`}
                  onMouseEnter={() => setHoveredField("dates")}
                  onMouseLeave={() => setHoveredField(null)}
                >
                  <Calendar className={`h-4 w-4 ${hoveredField === "dates" ? "text-rose-500" : "text-amber-500"} transition-colors duration-300 mr-2`} />
                  <input 
                    type="text" 
                    name="dates"
                    value={formData.dates}
                    onChange={handleChange}
                    placeholder="Select dates" 
                    className="appearance-none bg-transparent w-full focus:outline-none text-gray-800 font-medium placeholder-gray-400 cursor-pointer" 
                  />
                </div>
              </div>
              
              {/* Guests field */}
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-bold text-rose-500 uppercase tracking-wider font-sans ml-1 flex items-center">
                  <span>Guests</span>
                  {hoveredField === "guests" && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="ml-2"
                    >
                      <Sparkles className="h-3 w-3 text-amber-400" />
                    </motion.span>
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
                    value={formData.guests}
                    onChange={handleChange}
                    className="appearance-none bg-transparent w-full focus:outline-none text-gray-800 font-medium cursor-pointer"
                  >
                    <option>1 Adult</option>
                    <option>2 Adults</option>
                    <option>2 Adults, 1 Child</option>
                    <option>2 Adults, 2 Children</option>
                  </select>
                </div>
              </div>
              
              {/* Room Type field */}
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-bold text-rose-500 uppercase tracking-wider font-sans ml-1 flex items-center">
                  <span>Room Type</span>
                  {hoveredField === "roomType" && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="ml-2"
                    >
                      <Sparkles className="h-3 w-3 text-amber-400" />
                    </motion.span>
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
                    value={formData.roomType}
                    onChange={handleChange}
                    className="appearance-none bg-transparent w-full focus:outline-none text-gray-800 font-medium cursor-pointer"
                  >
                    <option>All Types</option>
                    <option>Standard Suite</option>
                    <option>Deluxe Suite</option>
                    <option>Executive Suite</option>
                    <option>Presidential Suite</option>
                  </select>
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="flex items-end justify-center md:justify-end">
                <motion.button
                  type="submit"
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 15px 30px -5px rgba(249, 168, 212, 0.5)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="relative bg-gradient-to-r from-rose-400 to-amber-400 text-white flex items-center justify-center px-8 py-3 rounded-full font-medium tracking-wide shadow-lg shadow-rose-200/50 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
                >
                  {/* Button shimmer effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  />
                  
                  <Search className="h-4 w-4 mr-2 group-hover:text-white transition-all duration-300" />
                  <span className="group-hover:text-white transition-all duration-300 relative">
                    Discover
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                  </span>
                </motion.button>
              </div>
            </div>
          </form>
          
          {/* Glamorous decorative elements */}
          <div className="absolute top-4 right-6 w-8 h-8 rounded-full bg-gradient-to-br from-amber-200 to-amber-100 opacity-30"></div>
          <div className="absolute bottom-4 left-6 w-6 h-6 rounded-full bg-gradient-to-br from-rose-200 to-amber-100 opacity-20"></div>
          <div className="absolute top-10 left-16 w-4 h-4 rounded-full bg-gradient-to-br from-rose-200 to-amber-100 opacity-20"></div>
          
          {/* Enhanced sparkle effects */}
          <div className="absolute top-2 right-16 w-2 h-2 bg-amber-300 rounded-full animate-pulse"></div>
          <div className="absolute bottom-8 right-24 w-1 h-1 bg-rose-300 rounded-full animate-pulse"></div>
          <div className="absolute top-12 right-40 w-1.5 h-1.5 bg-pink-300 rounded-full animate-ping opacity-70"></div>
          
          {/* Subtle glow effect */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-2/3 h-6 bg-gradient-to-r from-rose-300/20 via-amber-300/30 to-rose-300/20 blur-xl rounded-full"></div>
        </div>
      </motion.div>
    </div>
  );
}