"use client"

import React from 'react'
import AboutUs from '@/components/pages/About'
import Newsletter from '@/sections/Newsletter'
import WhyChooseUs from '@/sections/home/WhyChooseUs'
import AboutUsSection from '@/sections/about/AboutUs'
import BookingSection from '@/sections/Booking/Booking'
import { PagesHero } from '@/components/common/PagesHero'

const About = () => {
   return (
      <div className="relative flex flex-col w-full">
         <PagesHero />
         <AboutUsSection />
         <br />
         <AboutUs />
         <WhyChooseUs />
         <br />
         <br />
         <br />
         <BookingSection />
         <Newsletter />
      </div>
   )
}

export default About