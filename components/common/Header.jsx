"use client"
import { useState, useEffect, useRef } from "react";
import { Menu, X, Phone, Calendar, ChevronRight, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Logo } from "./Logo";

export default function Header() {
   // State for tracking scroll position
   const [scrollY, setScrollY] = useState(0);
   const [showHeader, setShowHeader] = useState(false);
   const [lastScrollY, setLastScrollY] = useState(0);

   // State for mobile sidebar
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

   // Navigation items
   const navItems = ["Home", "Rooms", "Amenities", "Gallery", "About", "Contact"];

   // Handle scroll events
   useEffect(() => {
      const handleScroll = () => {
         const currentScrollY = window.scrollY;

         // Show header when scrolling down past threshold
         if (currentScrollY > 20) {
            setShowHeader(true);
         } else {
            setShowHeader(false);
         }

         setScrollY(currentScrollY);
         setLastScrollY(currentScrollY);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   // Close sidebar when clicking outside
   const sidebarRef = useRef(null);

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isSidebarOpen) {
            setIsSidebarOpen(false);
         }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
   }, [isSidebarOpen]);

   // Prevent body scrolling when sidebar is open
   useEffect(() => {
      if (isSidebarOpen) {
         document.body.style.overflow = 'hidden';
      } else {
         document.body.style.overflow = 'unset';
      }

      return () => {
         document.body.style.overflow = 'unset';
      };
   }, [isSidebarOpen]);

   return (
      <>
         {/* Main Header */}
         <motion.header
            className="fixed top-0 md:top-2 left-0 right-0 z-50 flex justify-center w-full md:w-4/5 rounded-b-lg rounded-t-lg mx-auto"
            initial={{ backgroundColor: "rgba(255, 255, 255, 0)", y: -5 }}
            animate={{
               backgroundColor: scrollY > 20
                  ? "rgba(255, 255, 255, 0.8)"
                  : "rgba(255, 255, 255, 0)",
               boxShadow: scrollY > 20
                  ? "0 10px 30px rgba(0, 0, 0, 0.08)"
                  : "none",
               backdropFilter: scrollY > 20
                  ? "blur(10px)"
                  : "blur(0px)",
               y: scrollY > 20 ? 0 : -5,
               borderBottom: scrollY > 20
                  ? "1px solid rgba(255, 255, 255, 0.2)"
                  : "none"
            }}
            transition={{
               duration: 0.4,
               y: { type: "spring", stiffness: 300, damping: 30 }
            }}
         >
            <div className="w-full px-6 py-4 mx-auto flex items-center justify-between">
               <Logo />

               {/* Desktop Navigation */}
               <nav className="hidden lg:flex items-center space-x-8">
                  {navItems.map((item, index) => (
                     <a
                        key={item}
                        href={`/${item.toLowerCase()}`}
                        className={`text-sm uppercase tracking-wider font-medium transition-all duration-300 relative group ${scrollY > 20
                           ? 'text-gray-800 hover:text-amber-500'
                           : 'text-white hover:text-amber-400'
                           }`}
                     >
                        {item}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300"></span>
                     </a>
                  ))}

                  {/* Book Now CTA (Desktop) */}
                  <motion.button
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     className={`ml-4 px-6 py-2 rounded-full cursor-pointer font-medium tracking-wide transition-all duration-300 flex items-center ${scrollY > 20
                        ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-lg shadow-amber-200/30'
                        : 'bg-white/20 text-white backdrop-blur-sm border border-white/30 hover:bg-white/30'
                        }`}
                  >
                     <Calendar className="h-4 w-4 mr-2" />
                     Book Now
                  </motion.button>
               </nav>

               {/* Mobile Menu Button */}
               <div className="lg:hidden flex items-center">
                  <motion.button
                     whileTap={{ scale: 0.9 }}
                     onClick={() => setIsSidebarOpen(true)}
                     className={`p-2 cursor-pointer rounded-full transition-colors duration-300 ${scrollY > 20
                        ? 'text-gray-800 hover:bg-gray-100/50'
                        : 'text-white hover:bg-white/10'
                        }`}
                     aria-label="Open menu"
                  >
                     <Menu className="h-6 w-6" />
                  </motion.button>
               </div>
            </div>
         </motion.header>

         {/* Mobile/Tablet Sidebar */}
         <AnimatePresence>
            {isSidebarOpen && (
               <>
                  {/* Overlay */}
                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 0.3 }}
                     className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                     onClick={() => setIsSidebarOpen(false)}
                  />

                  {/* Sidebar */}
                  <motion.div
                     ref={sidebarRef}
                     initial={{ x: "100%" }}
                     animate={{ x: 0 }}
                     exit={{ x: "100%" }}
                     transition={{ type: "spring", damping: 25, stiffness: 300 }}
                     className="fixed top-0 right-0 h-full w-[80%] max-w-md bg-gradient-to-b from-white to-rose-50/90 shadow-2xl z-50 overflow-y-auto"
                  >
                     {/* Sidebar Header with Close Button */}
                     <div className="flex justify-between items-center p-6 border-b border-gray-100">
                        <div >
                           <Image
                              className="h-14 w-14 rounded-full"
                              src="/makayla-logo.jpg"
                              alt="Makayla Guest House Logo"
                              width={20}
                              height={20}
                           />
                        </div>
                        <motion.button
                           whileTap={{ scale: 0.9 }}
                           onClick={() => setIsSidebarOpen(false)}
                           className="text-gray-500 cursor-pointer hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors"
                           aria-label="Close menu"
                        >
                           <X className="h-6 w-6" />
                        </motion.button>
                     </div>

                     {/* Navigation Links */}
                     <div className="p-6">
                        <nav className="space-y-1">
                           {navItems.map((item, index) => (
                              <motion.a
                                 key={item}
                                 href={`#${item.toLowerCase()}`}
                                 onClick={() => setIsSidebarOpen(false)}
                                 className="flex items-center text-gray-800 hover:text-amber-600 py-3 px-4 rounded-lg hover:bg-white/80 transition-all duration-300 text-lg font-medium relative overflow-hidden group"
                                 initial={{ opacity: 0, y: 20 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 transition={{ delay: index * 0.1 }}
                              >
                                 <span className="relative z-10">{item}</span>
                                 <ChevronRight className="h-5 w-5 ml-auto text-amber-500 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />

                                 {/* Hover effect background */}
                                 <motion.div
                                    className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-100/40 to-rose-100/40 rounded-lg -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    layoutId={`nav-bg-${item}`}
                                 />
                              </motion.a>
                           ))}
                        </nav>

                        {/* Contact Info */}
                        <div className="mt-10 border-t border-gray-100 pt-6">
                           <motion.h3
                              className="text-sm uppercase tracking-wider text-gray-500 font-medium mb-4"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.6 }}
                           >
                              Contact Us
                           </motion.h3>

                           <motion.div
                              className="flex items-center text-gray-700 mb-4"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.7 }}
                           >
                              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-amber-100 text-amber-600 mr-3">
                                 <Phone className="h-5 w-5" />
                              </div>
                              <a href="tel:+233595631886" className="hover:text-amber-600 transition-colors">
                                 +233 595 631 886
                              </a>
                           </motion.div>

                           <motion.div
                              className="flex items-center text-gray-700 mb-8"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.8 }}
                           >
                              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-amber-100 text-amber-600 mr-3">
                                 <MapPin className="h-5 w-5" />
                              </div>
                              <address className="not-italic">
                                 Abesim, Sunyani, Ghana
                              </address>
                           </motion.div>

                           {/* Book Now CTA (Mobile) */}
                           <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.9 }}
                              className="w-full relative py-4 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-medium tracking-wide shadow-lg shadow-amber-200/30 flex items-center justify-center overflow-hidden group cursor-pointer"
                           >
                              {/* Shimmer effect */}
                              <div className="absolute inset-0 w-full h-full">
                                 <div className="absolute top-0 left-0 w-1/2 h-full bg-white/20 skew-x-12 transform -translate-x-full group-hover:translate-x-[200%] transition-all duration-1000 ease-out"></div>
                              </div>

                              <Calendar className="h-5 w-5 mr-2 relative" />
                              <span className="relative">Book Your Stay Now</span>
                           </motion.button>
                        </div>
                     </div>

                     {/* Footer */}
                     <motion.div
                        className="p-6 mt-auto border-t border-gray-100 text-center text-gray-500 text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                     >
                        <p>© 2025 Makayla Guest House</p>
                        <p>All rights reserved</p>
                     </motion.div>
                  </motion.div>
               </>
            )}
         </AnimatePresence>
      </>
   );
}