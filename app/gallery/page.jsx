import { PagesHero } from '@/components/common/PagesHero'
import { heroSectionData } from '@/data'
import BookingSection from '@/sections/Booking/Booking'
import CTASection from '@/sections/CTASection'
import GallerySection from '@/sections/Gallery'
import WhyChooseUs from '@/sections/home/WhyChooseUs'
import LocationSection from '@/sections/Location'
import Newsletter from '@/sections/Newsletter'
import React from 'react'
import seo_metadata from "@/lib/seo/metadata";
import { seoConfig } from "@/lib/seo/seoConfig";

export const metadata = seoConfig({
  ...seo_metadata.gallery
});

const Gallery = () => {
   return (
      <div className="relative flex flex-col w-full">
         <PagesHero
            title={heroSectionData.gallery.title}
            description={heroSectionData.gallery.description}
            buttonLabel='View Our Rooms'
         />
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