"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAnimateInView } from '@/hooks/useAnimateInView';
import { animateVariants, staggerContainer } from '@/lib/constants/animation';
import { Send, Star } from "lucide-react";
import { sendEmail } from "@/lib/sendEmail";

const Newsletter = () => {
  const { ref, controls } = useAnimateInView();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    // validate email input
    if (!email.trim()) {
      return;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return;
      }
    }

    await sendEmail(email, '/api/mail/newsletter');

    setSubscribed(true);
    setEmail("");
    setSubscribed(false)
  };

  return (
    <motion.section
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={controls}
      className="relative py-24 lg:py-32 overflow-hidden bg-stone-900"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large amber blob */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-amber-700/5 blur-3xl"></div>
        {/* Small accent blob */}
        <div className="absolute bottom-0 right-1/3 w-64 h-64 rounded-full bg-amber-500/10 blur-2xl"></div>

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMxLjIgMCAyLjEuOSAyLjEgMi4xdjE5LjhjMCAxLjItLjkgMi4xLTIuMSAyLjFIMTYuMWMtMS4yIDAtMi4xLS45LTIuMS0yLjFWMjAuMWMwLTEuMi45LTIuMSAyLjEtMi4xaDE5Ljh6IiBzdHJva2U9InJnYmEoMjQ1LCAxNTgsIDExLCAwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L2c+PC9zdmc+')] opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-24">
          {/* Left content column */}
          <motion.div variants={animateVariants.fadeIn} className="max-w-xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-px bg-amber-400"></div>
              <span className="text-amber-400 uppercase tracking-widest text-xs font-light">Exclusive Access</span>
              <div className="w-8 h-px bg-amber-400"></div>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-8">
              <span className="block">Unlock Privileged</span>
              <span className="block text-amber-400">Experiences</span>
            </h2>

            <p className="text-stone-300 leading-relaxed mb-8 text-lg">
              Join our select circle of discerning guests who receive first access to our limited seasonal offers, private events, and curated experiences not available to the public.
            </p>

            <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:space-x-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-400/20 flex items-center justify-center">
                  <Star size={18} className="text-amber-400" />
                </div>
                <span className="text-white font-light">Exclusive Offers</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-400/20 flex items-center justify-center">
                  <Star size={18} className="text-amber-400" />
                </div>
                <span className="text-white font-light">Priority Booking</span>
              </div>
            </div>
          </motion.div>

          {/* Right form column */}
          <motion.div
            variants={animateVariants.fadeIn}
            className="lg:flex-1 w-full max-w-md"
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border border-amber-400/30 opacity-60"></div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full border border-amber-400/30 opacity-60"></div>

              {/* Card with glass effect */}
              <div className="relative backdrop-blur-sm bg-gradient-to-br from-stone-800/90 to-stone-900/90 rounded-lg p-8 border border-stone-700/50 shadow-xl">
                {/* Golden accent corner */}
                <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden">
                  <div className="absolute -top-8 -left-8 w-16 h-16 bg-amber-500 rotate-45 opacity-30"></div>
                </div>

                <h3 className="font-serif text-2xl text-white mb-2">Be Our Privileged Guest</h3>
                <p className="text-stone-400 mb-6">
                  Where exclusivity meets unparalleled luxury, reserved only for our newsletter subscribers.
                </p>

                {!subscribed ? (
                  <div>
                    <div className="relative mb-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                        className="w-full px-4 py-4 bg-stone-800/50 border border-stone-700 rounded-md text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400"
                      />
                    </div>

                    <button
                      onClick={handleSubscribe}
                      className="w-full cursor-pointer py-4 px-6 bg-amber-600 hover:bg-amber-500 text-stone-100 font-medium rounded-md transition-colors duration-300 flex items-center justify-center group"
                    >
                      <span>Join Our Exclusive Circle</span>
                      <Send size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </button>

                    <p className="text-stone-400 text-xs mt-4 text-center">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </div>
                ) : (
                  <div className="py-10 text-center">
                    <div className="w-16 h-16 rounded-full bg-amber-400/20 flex items-center justify-center mx-auto mb-4">
                      <Star size={24} className="text-amber-400" />
                    </div>
                    <h4 className="font-serif text-xl text-white mb-2">Thank You</h4>
                    <p className="text-stone-300">
                      Welcome to our exclusive circle of privileged guests.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Newsletter