"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAnimateInView } from '@/hooks/useAnimateInView';
import { animateVariants, staggerContainer } from '@/lib/constants/animation';
import { SectionHeader } from "../common/SectionHeader";
import Testimonials from "@/sections/home/Testimonials";

// section titles
const SectionTitle = ({ title, subtitle }) => {
  const { ref, controls } = useAnimateInView();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={animateVariants.fadeIn}
      className="flex flex-col items-center mb-16 text-center"
    >
      <span className="text-amber-700 font-light tracking-widest uppercase text-sm mb-3">
        {subtitle}
      </span>
      <h2 className="font-serif text-4xl md:text-5xl text-stone-800 mb-4">
        {title}
      </h2>
      <div className="w-20 h-px bg-amber-400 mt-2"></div>
    </motion.div>
  );
};

// Decorative border frame
const BorderFrame = ({ children, className }) => {
  return (
    <div className={`relative border border-stone-200 p-1 ${className}`}>
      <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-amber-400"></div>
      <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-amber-400"></div>
      <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-amber-400"></div>
      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-amber-400"></div>
      {children}
    </div>
  );
};

// Value card component
const ValueCard = ({ icon, title, description, delay = 0 }) => {
  const { ref, controls } = useAnimateInView();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={animateVariants.scaleIn}
      className="bg-white p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center"
    >
      <div className="text-amber-700 mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-amber-50">
        {icon}
      </div>
      <h3 className="font-serif text-xl text-stone-800 mb-3">{title}</h3>
      <p className="text-stone-600 leading-relaxed">{description}</p>
    </motion.div>
  );
};

// Stats counter component with animation
const StatCounter = ({ value, label, suffix = "", delay = 0 }) => {
  const [count, setCount] = useState(0);
  const { ref, controls, isInView } = useAnimateInView();

  useEffect(() => {
    let start = 0;
    const duration = 2000; // 2 seconds
    const step = value / (duration / 16); // Assuming 16ms frames

    if (isInView) {
      const timer = setInterval(() => {
        start += step;
        if (start > value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={animateVariants.scaleIn}
      className="text-center px-6 py-0"
    >
      <h3 className="font-serif text-4xl md:text-5xl text-stone-100 mb-2">
        {count}{suffix}
      </h3>
      <p className="text-amber-700 font-light tracking-wider uppercase text-xs">
        {label}
      </p>
    </motion.div>
  );
};


export default function AboutUs() {
  return (
    <main className="font-sans text-stone-600 bg-stone-50 overflow-hidden">

      <SectionHeader
        title="Our Ethos"
        subTitle="Crafting moments of refined luxury6"
        description=""
      />

      {/* Our Vision & Mission Section */}
      <section className="pb-18">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={animateVariants.fadeIn}>
                <h3 className="font-serif text-xl text-stone-800 mb-3">Our Vision</h3>
                <p className="text-stone-600 leading-relaxed mb-8">
                  To create a sanctuary where luxury meets authenticity, where every guest feels not just
                  accommodated, but truly at home in sumptuous surroundings that inspire and rejuvenate.
                </p>
              </motion.div>

              <motion.div variants={animateVariants.fadeIn}>
                <h3 className="font-serif text-xl text-stone-800 mb-3">Our Mission</h3>
                <p className="text-stone-600 leading-relaxed">
                  To deliver impeccable, personalized service and create meaningful experiences that
                  exceed expectations, setting new standards in luxury hospitality while honoring the
                  rich traditions and natural beauty of our surroundings.
                </p>
              </motion.div>
            </motion.div>

            <div className="relative">
              <BorderFrame className="z-10 relative">
                <img
                  src="/room10.jpg"
                  alt="Luxury Guest House Interior"
                  className="w-full h-full object-cover"
                />
              </BorderFrame>
              <div className="absolute w-full h-full bg-amber-50 top-8 -right-8 -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <SectionTitle title="Our Core Values" subtitle="What Drives Us" />

          <div className="grid md:grid-cols-3 gap-8">
            <ValueCard
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"></path>
                  <path d="M12 12.56V7a2.97 2.97 0 0 1 2.33-2.92"></path>
                </svg>
              }
              title="Excellence"
              description="We are committed to exceeding expectations in every aspect of our service, consistently striving for perfection in all we do."
            />
            <ValueCard
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              }
              title="Authenticity"
              description="We embrace genuine hospitality, creating experiences that reflect our true passion for service and the unique character of our surroundings."
            />
            <ValueCard
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  <path d="m7 11 2 2 6-4"></path>
                </svg>
              }
              title="Responsibility"
              description="We act with integrity toward our guests, our team, our community, and our environment, ensuring sustainable luxury for generations to come."
            />
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 bg-stone-800 text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4">
            <StatCounter value={20} label="Years of Excellence" suffix="+" />
            <StatCounter value={15000} label="Happy Guests" suffix="+" />
            <StatCounter value={98} label="Return Rate" suffix="%" />
            <StatCounter value={24} label="Luxury Suites" />
          </div>
        </div>
      </section>

      <Testimonials />
    </main>
  );
}