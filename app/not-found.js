"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Sparkles, ArrowRight, Star } from "lucide-react";
import { useAnimateInView } from "@/hooks/useAnimateInView";
import { animateVariants, staggerContainer } from "@/lib/constants/animation";
import routes from "@/lib/routes";

const NotFound = () => {
  const { ref: mainRef, controls: mainControls } = useAnimateInView();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  // Mouse tracking for parallax effect
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  // Liquid blob animation
  const blobVariants = {
    animate: {
      scale: [1, 1.2, 0.8, 1.1, 1],
      rotate: [0, 90, 180, 270, 360],
      borderRadius: [
        "60% 40% 30% 70%/60% 30% 70% 40%",
        "30% 60% 70% 40%/50% 60% 30% 60%",
        "70% 30% 40% 60%/30% 50% 70% 60%",
        "40% 70% 60% 30%/70% 40% 50% 30%",
        "60% 40% 30% 70%/60% 30% 70% 40%",
      ],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900 relative overflow-hidden">
      {/* Dynamic background with parallax */}
      <div className="absolute inset-0">
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-transparent to-stone-400/20"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(245, 158, 11, 0.2) 0%, transparent 50%, rgba(168, 162, 158, 0.2) 100%)",
              "linear-gradient(135deg, rgba(168, 162, 158, 0.2) 0%, transparent 50%, rgba(245, 158, 11, 0.2) 100%)",
              "linear-gradient(225deg, rgba(245, 158, 11, 0.2) 0%, transparent 50%, rgba(168, 162, 158, 0.2) 100%)",
              "linear-gradient(315deg, rgba(168, 162, 158, 0.2) 0%, transparent 50%, rgba(245, 158, 11, 0.2) 100%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-amber-400/60 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Large animated blob */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-amber-400/10 to-stone-400/10 blur-3xl"
          variants={blobVariants}
          animate="animate"
          style={{
            transform: `translate(${mousePosition.x * 0.1}px, ${
              mousePosition.y * 0.1
            }px)`,
          }}
        />

        {/* Smaller blob */}
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-stone-400/10 to-amber-400/10 blur-2xl"
          variants={blobVariants}
          animate="animate"
          transition={{ delay: 2 }}
          style={{
            transform: `translate(${mousePosition.x * -0.05}px, ${
              mousePosition.y * -0.05
            }px)`,
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <motion.div
          ref={mainRef}
          variants={staggerContainer}
          initial="hidden"
          animate={mainControls}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Glowing 404 */}
          <motion.div
            variants={animateVariants.scaleIn}
            className="relative mt-14 mb-8"
          >
            <motion.h1
              className="text-[12rem] md:text-[14rem] font-serif font-thin text-transparent bg-gradient-to-r from-amber-400 via-stone-200 to-amber-400 bg-clip-text leading-none"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              404
            </motion.h1>

            {/* Glowing effect behind text */}
            <div className="absolute inset-0 text-[12rem] md:text-[16rem] font-serif font-thin text-amber-400/20 blur-2xl leading-none -z-10">
              404
            </div>
          </motion.div>

          {/* Elegant divider with animation */}
          <motion.div
            variants={animateVariants.fadeIn}
            className="flex items-center justify-center mb-12"
          >
            <motion.div
              className="flex items-center space-x-4"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
              <Sparkles className="text-amber-400" size={24} />
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
            </motion.div>
          </motion.div>

          {/* Main heading with gradient */}
          <motion.h2
            variants={animateVariants.fadeIn}
            className="text-4xl md:text-6xl font-serif text-transparent bg-gradient-to-r from-white via-stone-200 to-white bg-clip-text mb-6"
          >
            Lost in Luxury?
          </motion.h2>

          {/* Subheading */}
          <motion.p
            variants={animateVariants.fadeIn}
            className="text-xl md:text-2xl text-stone-300 mb-12 leading-relaxed max-w-2xl mx-auto"
          >
            Even the most exquisite journeys have unexpected detours. Let us
            guide you back to paradise.
          </motion.p>

          {/* Animated CTA buttons */}
          <motion.div
            variants={animateVariants.fadeIn}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <Link href={routes.home}>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(245, 158, 11, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white px-10 py-5 rounded-full font-medium transition-all duration-500 flex items-center space-x-3 shadow-2xl overflow-hidden cursor-pointer"
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <Home
                  size={20}
                  strokeWidth={2}
                  className="relative z-10 group-hover:rotate-12 transition-transform duration-300"
                />
                <span className="relative z-10">Return Home</span>
                <ArrowRight
                  size={16}
                  strokeWidth={2}
                  className="relative z-10 group-hover:translate-x-1 transition-transform duration-300"
                />
              </motion.button>
            </Link>

            <Link href={routes.contact}>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group bg-white/5 backdrop-blur-md hover:bg-white/10 text-white border border-white/20 hover:border-amber-400/50 px-10 py-5 rounded-full font-medium transition-all duration-500 flex items-center space-x-3 cursor-pointer"
              >
                <Star
                  size={20}
                  strokeWidth={2}
                  className="group-hover:rotate-12 transition-transform duration-300"
                />
                <span>Get Help</span>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Interactive mouse follower */}
      <motion.div
        className="pointer-events-none fixed w-6 h-6 rounded-full bg-amber-400/30 blur-sm z-50"
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </div>
  );
};

export default NotFound;
