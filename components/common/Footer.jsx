"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAnimateInView } from '@/hooks/useAnimateInView';
import { animateVariants, staggerContainer } from '@/lib/constants/animation';
import { Instagram, Facebook, Twitter, MapPin, Mail, Phone, Send } from "lucide-react";
import { Logo } from "./Logo";
import { WhatsAppLink } from "./WhatsApp";


//  {/* Column 4: Hours & Recognition */}
//  <motion.div
//    initial={{ opacity: 0, y: 20 }}
//    animate={isFooterVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
//    transition={{ duration: 0.5, delay: 0.4 }}
//  >
//    <h4 className="font-serif text-xl text-white mb-6 relative">
//      <span className="relative z-10">Reception Hours</span>
//      <span className="absolute bottom-0 left-0 w-12 h-px bg-amber-400"></span>
//    </h4>
//    <ul className="space-y-2 mb-8">
//      <li className="flex justify-between text-stone-300">
//        <span>Monday - Friday:</span>
//        <span>8:00 AM - 10:00 PM</span>
//      </li>
//      <li className="flex justify-between text-stone-300">
//        <span>Saturday:</span>
//        <span>9:00 AM - 11:00 PM</span>
//      </li>
//      <li className="flex justify-between text-stone-300">
//        <span>Sunday:</span>
//        <span>9:00 AM - 9:00 PM</span>
//      </li>
//    </ul>

//    <h4 className="font-serif text-xl text-white mb-4 relative">
//      <span className="relative z-10">Recognition</span>
//      <span className="absolute bottom-0 left-0 w-12 h-px bg-amber-400"></span>
//    </h4>
//    <div className="flex flex-wrap gap-3">
//      <div className="bg-stone-800 p-2 rounded-md">
//        <img src="/api/placeholder/50/30" alt="Award" className="h-8" />
//      </div>
//      <div className="bg-stone-800 p-2 rounded-md">
//        <img src="/api/placeholder/50/30" alt="Award" className="h-8" />
//      </div>
//      <div className="bg-stone-800 p-2 rounded-md">
//        <img src="/api/placeholder/50/30" alt="Award" className="h-8" />
//      </div>
//    </div>
//  </motion.div>

const Footer = () => {
  const { ref, controls } = useAnimateInView();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <motion.footer
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={controls}
      className="bg-stone-900 relative w-full overflow-hidden pt-24 pb-12"
    >
      {/* Organic background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large amber blob */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-amber-700/5 blur-3xl"></div>
        {/* Stone medium blob */}
        <div className="absolute top-1/4 -left-24 w-64 h-64 rounded-full bg-stone-800/50 blur-2xl"></div>
        {/* Small accent blob */}
        <div className="absolute bottom-16 right-1/4 w-40 h-40 rounded-full bg-amber-500/10 blur-xl"></div>

        {/* SVG wave pattern */}
        <svg className="absolute bottom-0 left-0 w-full opacity-5" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C50.45,35.51,202.73,87,321.39,56.44Z"
            className="fill-amber-400"></path>
        </svg>

        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMxLjIgMCAyLjEuOSAyLjEgMi4xdjE5LjhjMCAxLjItLjkgMi4xLTIuMSAyLjFIMTYuMWMtMS4yIDAtMi4xLS45LTIuMS0yLjFWMjAuMWMwLTEuMi45LTIuMSAyLjEtMi4xaDE5Ljh6IiBzdHJva2U9InJnYmEoMjQ1LCAxNTgsIDExLCAwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L2c+PC9zdmc+')] opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Logo and brand section with golden accent border */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 pb-10 relative border-b border-stone-700/50">
          <motion.div
            variants={animateVariants.fadeIn}
            className="flex items-center mb-8 md:mb-0"
          >
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg shadow-amber-900/20">
                <Logo />
              </div>
              <div className="absolute -inset-1 rounded-full border border-amber-400/30 animate-pulse"></div>
            </div>
            <div className="ml-4">
              <h2 className="font-serif text-2xl text-white mb-1">Makayla Guest House</h2>
              <p className="text-amber-400/80 text-sm uppercase tracking-widest font-light">Unparalleled Elegance</p>
            </div>
          </motion.div>

          <motion.div variants={animateVariants.fadeIn} className="flex space-x-4">
            <a
              href="#"
              className="group w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-amber-700 transition-all duration-300 shadow-md shadow-stone-900/50"
              aria-label="Instagram"
            >
              <Instagram size={18} className="text-stone-300 group-hover:text-white transition-colors" />
            </a>
            <a
              href="#"
              className="group w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-amber-700 transition-all duration-300 shadow-md shadow-stone-900/50"
              aria-label="Facebook"
            >
              <Facebook size={18} className="text-stone-300 group-hover:text-white transition-colors" />
            </a>
            <a
              href="#"
              className="group w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-amber-700 transition-all duration-300 shadow-md shadow-stone-900/50"
              aria-label="Twitter"
            >
              <Twitter size={18} className="text-stone-300 group-hover:text-white transition-colors" />
            </a>
          </motion.div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* About section - wider on desktop */}


          <motion.div variants={animateVariants.fadeIn} className="lg:col-span-5">
            <h3 className="font-serif text-xl text-white mb-6 relative inline-block">
              About Us
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-amber-400"></span>
            </h3>
            <p className="text-stone-300 leading-relaxed mb-6">
              Experience the pinnacle of luxury accommodations in our exquisite guest house. Each space is meticulously designed to blend comfort with sophistication, creating an unforgettable retreat for the discerning traveler.
            </p>
            <div className="bg-stone-800/50 backdrop-blur-sm p-6 rounded-lg border border-stone-700/50">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-400/20 flex items-center justify-center mr-4">
                  <MapPin size={16} className="text-amber-400" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-medium mb-1">Our Location</h4>
                  <p className="text-stone-400 text-sm">Abesim, Sunyani, Ghana</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-amber-400/20 flex items-center justify-center mr-4">
                  <Phone size={16} className="text-amber-400" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-medium mb-1">Call Us</h4>
                  <p className="text-stone-400 text-sm">+233 595 631 886</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={animateVariants.fadeIn} className="lg:col-span-3">
            <h3 className="font-serif text-xl text-white mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-amber-400"></span>
            </h3>
            <ul className="space-y-4">
              {["Home", "Accommodations", "Gallery", "Reservations"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-stone-300 hover:text-amber-400 transition-all duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-amber-700 group-hover:bg-amber-400 rounded-full mr-3 transition-all duration-300"></span>
                    <span className="border-b border-transparent group-hover:border-amber-400/30">{link}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* More Links */}
          <motion.div variants={animateVariants.fadeIn} className="lg:col-span-2">
            <h3 className="font-serif text-xl text-white mb-6 relative inline-block">
              Explore
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-amber-400"></span>
            </h3>
            <ul className="space-y-4">
              {["About Us", "Services", "Our Team", "Blog", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-stone-300 hover:text-amber-400 transition-all duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-amber-700 group-hover:bg-amber-400 rounded-full mr-3 transition-all duration-300"></span>
                    <span className="border-b border-transparent group-hover:border-amber-400/30">{link}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact/Newsletter - elegant card style */}
          <motion.div variants={animateVariants.fadeIn} className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-lg shadow-xl border border-stone-700/30 backdrop-blur-sm bg-gradient-to-br from-stone-800/90 to-stone-900/90">
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16">
                <div className="absolute top-0 right-0 w-full h-full overflow-hidden">
                  <div className="absolute -top-8 -right-8 w-16 h-16 bg-amber-500 rotate-45 opacity-30"></div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-serif text-lg text-white mb-4">Stay Updated</h3>
                <p className="text-stone-400 text-sm mb-4">
                  Subscribe for exclusive offers and updates
                </p>
                <div className="relative mb-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="w-full pl-4 pr-12 py-3 bg-stone-800/70 border border-stone-700 rounded-md text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400"
                  />
                  <button
                    onClick={handleSubscribe}
                    className="absolute right-1 top-1 bg-amber-600 hover:bg-amber-500 text-stone-900 p-2 rounded-md transition-colors duration-300"
                    aria-label="Subscribe"
                  >
                    <Send size={16} />
                  </button>
                </div>
                {subscribed && (
                  <p className="text-amber-400 text-xs mt-2">Thank you for subscribing!</p>
                )}
              </div>
            </div>

            {/* WhatsApp link with floating effect */}
            <WhatsAppLink />
          </motion.div>
        </div>

        {/* Elegant divider with glow effect */}
        <div className="w-full flex justify-center mb-12">
          <div className="w-40 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent relative">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4">
              <div className="w-full h-full rounded-full bg-amber-400/30 animate-ping"></div>
              <div className="absolute inset-1 rounded-full bg-amber-400 shadow-md shadow-amber-400/50"></div>
            </div>
          </div>
        </div>

        {/* Bottom section with copyright */}
        <motion.div
          variants={animateVariants.fadeIn}
          className="text-center"
        >
          <p className="text-stone-400 uppercase tracking-widest text-xs font-light mb-4">
            © {new Date().getFullYear()} Luxury Guest House. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs">
            <a href="#" className="text-stone-400 hover:text-amber-400 transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-stone-400 hover:text-amber-400 transition-colors duration-300">Terms of Service</a>
            <a href="#" className="text-stone-400 hover:text-amber-400 transition-colors duration-300">Cookies Policy</a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;