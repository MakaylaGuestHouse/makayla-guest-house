"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimateInView } from '@/hooks/useAnimateInView';
import { animateVariants, staggerContainer } from '@/lib/constants/animation';
import { ChevronDown, ChevronUp } from 'lucide-react';
import routes from '@/lib/routes';
import { useAppRouter } from '@/hooks/useAppRouter';

// Custom hook for FAQ item animation
const useFaqAnimation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return { isOpen, toggle };
};

// Custom accordion animation variants
const accordionVariants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0],
      opacity: { duration: 0.45 }
    }
  }
};

// Component for decorative elements
const DecorativeElement = ({ className = "", type = "circle" }) => {
  const baseClass = "absolute pointer-events-none opacity-20 blur-md z-0 bg-gradient-to-tr";

  if (type === "circle") {
    return (
      <div className={`${baseClass} rounded-full ${className}`}></div>
    );
  }

  return (
    <div className={`${baseClass} ${className}`}></div>
  );
};

// FAQ Item Component
const FaqItem = ({ question, answer, index }) => {
  const { isOpen, toggle } = useFaqAnimation();

  return (
    <motion.div
      className="relative w-full mb-6 overflow-hidden rounded-lg bg-white bg-opacity-80 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-300"
      variants={animateVariants.fadeIn}
      custom={index}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.1 }}
    >
      {/* Gold accent line */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-500 to-amber-300"></div>

      <button
        onClick={toggle}
        className="flex items-center justify-between w-full p-6 text-left focus:outline-none group"
      >
        <h3 className="text-xl font-serif font-medium text-stone-800 group-hover:text-amber-700 transition-colors duration-300">
          {question}
        </h3>
        <div className="flex-shrink-0 ml-4">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-amber-700"
          >
            {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={accordionVariants}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 text-stone-600 leading-relaxed">
              <div className="w-20 h-px bg-amber-400 mb-4"></div>
              <p>{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Main FAQ Component
const Faqs = () => {
  const { navigateTo } = useAppRouter();
  const { ref, controls } = useAnimateInView();

  // FAQ data
  const faqData = [
    {
      question: "What time is check-in and check-out?",
      answer: "Check-in is available from 3:00 PM, and check-out is until 11:00 AM. Early check-in or late check-out may be available upon request, subject to availability and additional charges."
    },
    {
      question: "Do you offer airport transfers?",
      answer: "Yes, we offer luxury airport transfers in our premium vehicles. Please provide your flight details at least 48 hours before arrival so we can arrange your pickup. Additional charges apply based on distance and vehicle type."
    },
    {
      question: "Are pets allowed in the guest house?",
      answer: "We welcome well-behaved pets in select rooms with prior arrangement. A pet fee applies per stay. Please inform us about your pet when booking so we can prepare accordingly and provide our pet amenities package."
    },
    {
      question: "Is breakfast included in the room rate?",
      answer: "Yes, a gourmet breakfast featuring local and seasonal ingredients is included in your stay. It's served daily in our dining room from 7:00 AM to 10:30 AM. Special dietary requirements can be accommodated with advance notice."
    },
    {
      question: "Do you have facilities for events or celebrations?",
      answer: "Our guest house features elegant spaces for intimate gatherings, celebrations, and small events. Our event coordinator can help arrange custom experiences, from private dinners to garden ceremonies. Please contact us for details and availability."
    },
    {
      question: "What amenities are available in the rooms?",
      answer: "All rooms feature luxury linens, premium bath products, complimentary high-speed WiFi, smart TVs, Nespresso machines, minibars, air conditioning, and in-room safes. Select suites also include private balconies, fireplaces, or soaking tubs."
    },
  ];

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={staggerContainer}
      className="relative py-24 px-6 overflow-hidden bg-stone-50"
    >
      {/* Decorative background elements */}
      <DecorativeElement
        type="circle"
        className="from-amber-300 to-amber-100 w-96 h-96 -top-48 -left-48"
      />
      <DecorativeElement
        className="from-stone-300 to-stone-100 w-64 h-64 bottom-20 -right-20 rotate-45 rounded-3xl"
      />
      <DecorativeElement
        type="circle"
        className="from-amber-200 to-amber-50 w-80 h-80 -bottom-40 left-1/4"
      />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          variants={animateVariants.fadeIn}
        >
          <span className="font-light uppercase tracking-widest text-amber-700 mb-3 inline-block">
            Your Questions Answered
          </span>
          <h2 className="font-serif text-5xl text-stone-800 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="flex justify-center">
            <div className="w-20 h-px bg-amber-400"></div>
          </div>
          <p className="mt-6 max-w-xl mx-auto text-stone-600 leading-relaxed">
            Discover everything you need to know about your stay at our luxury guest house. If you have additional questions, our concierge team is available 24/7.
          </p>
        </motion.div>

        <motion.div
          className="relative grid gap-6 md:grid-cols-2 lg:gap-8"
          variants={staggerContainer}
        >
          {faqData.map((item, index) => (
            <FaqItem
              key={index}
              question={item.question}
              answer={item.answer}
              index={index}
            />
          ))}
        </motion.div>

        {/* Additional assistance section */}
        <motion.div
          className="mt-16 text-center py-5"
          variants={animateVariants.fadeIn}
        >
          <div className="relative p-8 bg-gradient-to-r from-stone-100 to-white rounded-lg border border-stone-200 shadow-sm overflow-hidden">
            {/* Subtle corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-amber-400 rounded-tl-lg"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-amber-400 rounded-br-lg"></div>

            <h3 className="font-serif text-2xl text-stone-800 mb-3">
              Need Further Assistance?
            </h3>
            <p className="relative text-center max-w-2xl mx-auto text-stone-600 mb-8 leading-relaxed ">
              Our dedicated concierge team is available 24/7 to assist with any additional questions
              or to arrange bespoke experiences tailored to your preferences.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="bg-stone-800 hover:bg-amber-700 text-white py-3 px-8 rounded-md transition-colors duration-300 shadow-md hover:shadow-lg w-full sm:w-auto cursor-pointer">
                Contact Us
              </button>
              <button onClick={() => navigateTo(`${routes.rooms}`)}
                className="bg-transparent border border-stone-800 hover:bg-stone-50 text-stone-800 py-3 px-8 rounded-md transition-colors duration-300 shadow-sm hover:shadow-md w-full sm:w-auto cursor-pointer">
                View Rooms
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Faqs;