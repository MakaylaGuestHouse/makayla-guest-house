"use client"
import { PagesHero } from '@/components/common/PagesHero'
import BookingSection from '@/sections/Booking/Booking'
import CTASection from '@/sections/CTASection'
import GallerySection from '@/sections/Gallery'
import WhyChooseUs from '@/sections/home/WhyChooseUs'
import LocationSection from '@/sections/Location'
import Newsletter from '@/sections/Newsletter'
import React from 'react'

const Gallery = () => {
   return (
      <div className="relative flex flex-col w-full">
         <PagesHero />
         <GallerySection />
         <BookingSection />
         <WhyChooseUs />
         <CTASection />
         <LocationSection />
         <Newsletter />
      </div>
   )
}

export default Gallery