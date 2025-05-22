"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useAnimateInView } from '@/hooks/useAnimateInView';
import { animateVariants } from '@/lib/constants/animation';
import { FiExternalLink } from "react-icons/fi";
import { MAP_URL } from "@/lib/routes";

const GoogleMap = () => {
  const mapAnimation = useAnimateInView();

  // Ref for map interactions
  const mapRef = useRef(null);

     const openInNewTab = () => {
      window.open(MAP_URL, '_blank');
   };

  // Custom animated marker
  const MapMarker = () => (
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
      <div className="relative">
        <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-full"></div>
        </div>
        <div className="absolute w-12 h-12 bg-amber-500 opacity-20 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping"></div>
      </div>
    </div>
  );

  return (
    <motion.div
      className="relative gird grid-cols-1 rounded-xl overflow-hidden shadow-xl h-[500px] flex items-center justify-center group"
      ref={mapAnimation.ref}
      initial="hidden"
      animate={mapAnimation.controls}
      variants={animateVariants.fadeInLeft}
    >
      {/* map */}
      <iframe
        ref={mapRef}
        src={MAP_URL}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        className="filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 z-0"
        title="Makayla Guest House Location"
      ></iframe>

      {/* Map controls */}
      <div className="absolute right-4 top-4 flex flex-col space-y-2 z-20">
        <button
          onClick={openInNewTab}
          className="w-10 h-10 cursor-pointer bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300"
          aria-label="Open in Google Maps"
        >
          <FiExternalLink className="text-stone-800" />
        </button>
      </div>

      <MapMarker />
    </motion.div>
  );
};

export default GoogleMap;