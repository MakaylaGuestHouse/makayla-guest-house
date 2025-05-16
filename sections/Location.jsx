
"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useAnimateInView } from '@/hooks/useAnimateInView';
import { animateVariants, staggerContainer } from '@/lib/constants/animation';
import { FaWhatsapp, FaPhone, FaMapMarkerAlt, FaLandmark, FaTree, FaUniversity, FaShoppingBag, FaUtensils } from "react-icons/fa";
import { MdOutlineDirections, MdOutlineZoomOutMap } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";

const LocationSection = () => {
  const mapAnimation = useAnimateInView();
  const infoAnimation = useAnimateInView();
  const attractionsAnimation = useAnimateInView();
  
  // State for active tab
  const [activeTab, setActiveTab] = useState("address");
  
  // Ghana coordinates for Makayla Guest House in Abesim, Bono Region
const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7914.878068020306!2d-2.3010956952735184!3d7.304472413697892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdac5018cc500bf%3A0xc17106ca3e10ebe1!2sMakayla%20Guest%20House!5e0!3m2!1sen!2sgh!4v1747303785543!5m2!1sen!2sgh";
  
  // Ref for map interactions
  const mapRef = useRef(null);

  // Nearby attractions data for Abesim area
  const attractions = [
    {
      name: "Abesim Royal Golf Course",
      distance: "1.5 km",
      desc: "World-class golf course with beautiful landscape and facilities",
      icon: <FaTree className="h-6 w-6 text-amber-600" />
    },
    {
      name: "Sunyani City Center",
      distance: "4.2 km",
      desc: "Vibrant city center with shopping and cultural experiences",
      icon: <FaShoppingBag className="h-6 w-6 text-amber-600" />
    },
    {
      name: "University of Energy and Natural Resources",
      distance: "5.8 km",
      desc: "Leading educational institution with beautiful campus grounds",
      icon: <FaUniversity className="h-6 w-6 text-amber-600" />
    },
    {
      name: "Cocoa Village Restaurant",
      distance: "2.3 km",
      desc: "Authentic Ghanaian cuisine in a traditional setting",
      icon: <FaUtensils className="h-6 w-6 text-amber-600" />
    }
  ];

  // Ghana phone numbers
   const contactDetails = [               
    { type: "WhatsApp", value: "0553383460", icon: <FaWhatsapp className="h-5 w-5 text-amber-600" />, link: "https://wa.me/0553383460" },
    { type: "Phone", value: "0241656352", icon: <FaPhone className="h-5 w-5 text-amber-600" />, link: "tel:0241656352" },
    { type: "Phone", value: "0553383460", icon: <FaPhone className="h-5 w-5 text-amber-600" />, link: "tel:0553383460" },
    { type: "Phone", value: "0201092916", icon: <FaPhone className="h-5 w-5 text-amber-600" />, link: "tel:0201092916" },
  ];

  // Handle interactions with the map for better control
  const handleZoomIn = () => {
    if (mapRef.current) {
      const iframeWindow = mapRef.current.contentWindow;
      const event = new MessageEvent('message', {
        data: { action: 'zoomIn' },
        origin: window.location.origin
      });
      iframeWindow.postMessage(event.data, '*');
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      const iframeWindow = mapRef.current.contentWindow;
      const event = new MessageEvent('message', {
        data: { action: 'zoomOut' },
        origin: window.location.origin
      });
      iframeWindow.postMessage(event.data, '*');
    }
  };

  const openInNewTab = () => {
    window.open('https://www.google.com/maps/place/Abesim,+Ghana', '_blank');
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
    <section className="relative py-24 bg-gradient-to-b from-stone-50 to-stone-100 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-amber-50 rounded-full opacity-40 -translate-x-20 -translate-y-20"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-amber-50 rounded-full opacity-30 translate-x-20 translate-y-20"></div>
      <div className="absolute top-1/4 right-0 w-32 h-32 bg-stone-200 rounded-full opacity-20"></div>
      <div className="absolute bottom-1/3 left-0 w-24 h-24 bg-stone-200 rounded-full opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p 
            className="text-amber-700 font-light tracking-widest uppercase text-sm mb-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Find Us
          </motion.p>
          <motion.h2 
            className="text-4xl md:text-5xl font-serif text-stone-800 mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our Location
          </motion.h2>
          <motion.div 
            className="w-20 h-px bg-amber-400 mx-auto mb-6"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          ></motion.div>
          <motion.p
            className="max-w-2xl mx-auto text-stone-600 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Experience the beauty and tranquility of Ghana's Bono Region at Makayla Guest House, 
            ideally situated in Abesim with easy access to local attractions and city amenities.
          </motion.p>
        </div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Map */}
          <motion.div 
            className="relative rounded-xl overflow-hidden shadow-xl h-[500px] flex items-center justify-center group"
            ref={mapAnimation.ref}
            initial="hidden"
            animate={mapAnimation.controls}
            variants={animateVariants.fadeInLeft}
          >
            {/* Interactive map */}
            <iframe
              ref={mapRef}
              src={mapUrl}
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
                onClick={handleZoomIn}
                className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300"
                aria-label="Zoom in"
              >
                <span className="text-stone-800 text-xl">+</span>
              </button>
              <button 
                onClick={handleZoomOut}
                className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300"
                aria-label="Zoom out"
              >
                <span className="text-stone-800 text-xl">-</span>
              </button>
              <button 
                onClick={openInNewTab}
                className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300"
                aria-label="Open in Google Maps"
              >
                <FiExternalLink className="text-stone-800" />
              </button>
            </div>
            
            <MapMarker />
            
            {/* Styled overlay at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-stone-900/90 to-transparent h-28 flex items-end">
              <div className="p-6 text-white">
                <p className="font-serif text-2xl">Makayla Guest House</p>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="h-4 w-4 text-amber-400 mr-2" />
                  <p className="text-sm text-stone-200">Abesim, Bono Region, Ghana</p>
                </div>
              </div>
              <div className="ml-auto p-6">
                <button 
                  onClick={openInNewTab}
                  className="px-4 py-2 bg-amber-600 text-white rounded-full text-sm flex items-center hover:bg-amber-700 transition-colors shadow-lg"
                >
                  <MdOutlineDirections className="mr-2" />
                  Get Directions
                </button>
              </div>
            </div>
          </motion.div>
          
          {/* Contact & Location Info */}
          <motion.div 
            className="bg-white rounded-xl p-8 shadow-lg relative overflow-hidden border-t-4 border-amber-600"
            ref={infoAnimation.ref}
            initial="hidden"
            animate={infoAnimation.controls}
            variants={animateVariants.fadeInRight}
          >
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-50 rounded-full -translate-x-20 -translate-y-20 opacity-50"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-stone-100 rounded-full opacity-50"></div>
            
            {/* Tab navigation */}
            <div className="flex space-x-1 mb-8 relative">
              <button 
                className={`px-4 py-3 text-sm font-medium tracking-wide transition-all ${activeTab === "address" ? "text-amber-700 border-b-2 border-amber-400" : "text-stone-600 hover:text-amber-600"}`}
                onClick={() => setActiveTab("address")}
              >
                Address & Contact
              </button>
              <button 
                className={`px-4 py-3 text-sm font-medium tracking-wide transition-all ${activeTab === "attractions" ? "text-amber-700 border-b-2 border-amber-400" : "text-stone-600 hover:text-amber-600"}`}
                onClick={() => setActiveTab("attractions")}
              >
                Nearby Attractions
              </button>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-stone-200"></div>
            </div>
            
            {/* Address tab content */}
            {activeTab === "address" && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="min-h-[350px]"
              >
                <div className="flex items-start mb-8">
                  <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 mr-4 shadow-sm">
                    <FaMapMarkerAlt className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-stone-800 mb-2">Makayla Guest House</h3>
                    <p className="text-stone-600 leading-relaxed mb-3">
                      22 Abesim Main Road<br />
                      Abesim, Bono Region<br />
                      Ghana
                    </p>
                    <div className="w-16 h-px bg-amber-400 my-4"></div>
                    <p className="text-stone-600 italic">
                      Located in the serene Abesim community, our guest house offers a peaceful retreat while remaining convenient to Sunyani's city center and major attractions.
                    </p>
                  </div>
                </div>
                
                <h4 className="font-serif text-xl text-stone-700 mt-8 mb-5 flex items-center">
                  <span className="w-8 h-px bg-amber-400 mr-3"></span>
                  Contact Us
                </h4>
                <div className="space-y-4">
                  {contactDetails.map((contact, index) => (
                    <a 
                      href={contact.link} 
                      key={index} 
                      className="flex items-center group hover:bg-amber-50 p-2 rounded-lg transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0 mr-4 group-hover:bg-amber-100 transition-colors shadow-sm">
                        {contact.icon}
                      </div>
                      <div>
                        <p className="text-sm text-stone-500">{contact.type}</p>
                        <p className="text-stone-700 font-medium">{contact.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
                
                <div className="mt-8">
                  <a 
                    href="tel:0553383460"
                    className="inline-flex items-center px-6 py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors font-medium text-sm shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <FaPhone className="mr-2 h-4 w-4" />
                    Contact Front Desk
                  </a>
                </div>
              </motion.div>
            )}
            
            {/* Attractions tab content */}
            {activeTab === "attractions" && (
              <motion.div 
                className="space-y-6"
                ref={attractionsAnimation.ref}
                initial="hidden"
                animate={attractionsAnimation.controls}
                variants={staggerContainer}
              >
                {attractions.map((attraction, index) => (
                  <motion.div 
                    key={index}
                    className="flex group"
                    variants={animateVariants.fadeIn}
                  >
                    <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 mr-4 group-hover:bg-amber-100 transition-colors">
                      {attraction.icon}
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-stone-800">{attraction.name}</h3>
                      <p className="text-amber-700 text-sm">{attraction.distance}</p>
                      <p className="text-stone-600 mt-1">{attraction.desc}</p>
                    </div>
                  </motion.div>
                ))}
                
                <div className="rounded-lg bg-stone-50 p-4 mt-6">
                  <p className="text-sm text-stone-600 italic">
                    Our concierge is available 24/7 to provide directions and recommendations for exploring these attractions and many more.
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;