"use client"
import AboutUsSection from '@/sections/about/AboutUs';
import Amenities from '@/sections/Amenities';
import BookingSection from '@/sections/Booking/Booking';
import CTASection from '@/sections/CTASection';
import GallerySection from '@/sections/Gallery';
import Hero from '@/sections/home/Hero';
import ServicesSection from '@/sections/home/Services';
import Testimonials from '@/sections/home/Testimonials';
import WhyChooseUs from '@/sections/home/WhyChooseUs';
import LocationSection from '@/sections/Location';
import Newsletter from '@/sections/Newsletter';
import FeaturedRoomsSection from '@/sections/rooms/FeaturedRoomsSection';
import React from 'react';


const HomePage = () => {

   return (
      <div className="relative flex flex-col w-full">
         <Hero />
         <ServicesSection />
         <AboutUsSection />
         <BookingSection />
         <FeaturedRoomsSection />
         <Amenities />
         <WhyChooseUs />
         <Testimonials />
         <GallerySection />
         <CTASection/>
         <Newsletter />
         <LocationSection />
      </div>
   );
};

export default HomePage;