"use client";

import { motion } from "framer-motion";
import { useAnimateInView } from '@/hooks/useAnimateInView';
import { animateVariants } from '@/lib/constants/animation';
import { FaMapMarkerAlt } from "react-icons/fa";
import GoogleMap from "@/components/ui/GoogleMap";
import { SiteAttraction } from "@/components/ui/SiteAttraction";
import { SectionHeader } from "@/components/common/SectionHeader";

const LocationSection = () => {
  const infoAnimation = useAnimateInView();

  // Custom animated marker
  return (
    <section className="relative py-24 bg-gradient-to-b from-stone-50 to-stone-100 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-amber-50 rounded-full opacity-40 -translate-x-20 -translate-y-20"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-amber-50 rounded-full opacity-30 translate-x-20 translate-y-20"></div>
      <div className="absolute top-1/4 right-0 w-32 h-32 bg-stone-200 rounded-full opacity-20"></div>
      <div className="absolute bottom-1/3 left-0 w-24 h-24 bg-stone-200 rounded-full opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          title="Find Us"
          subTitle="Our Location"
          description="Experience the beauty and tranquility of Ghana's Bono Region at Makayla Guest House, ideally situated in Abesim with easy access to local attractions and city amenities."
        />

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <GoogleMap />

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

            <div className="flex space-x-1 mb-8 relative">
              <p
                className={`px-4 py-3 text-sm font-medium tracking-wide transition-all text-amber-700 border-b-2 border-amber-400`}
              >
                Address
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-stone-200"></div>
            </div>

            {/* Address  */}
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
              <SiteAttraction textStyle='font-semibold text-sm' />

            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;