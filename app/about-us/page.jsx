import React from 'react'
import AboutUs from '@/components/pages/About'
import Newsletter from '@/sections/Newsletter'
import WhyChooseUs from '@/sections/home/WhyChooseUs'
import AboutUsSection from '@/sections/about/AboutUs'
import BookingSection from '@/sections/Booking/Booking'
import { PagesHero } from '@/components/common/PagesHero'
import { heroSectionData } from '@/data'
// import { useAppRouter } from '@/hooks/useAppRouter'
// import routes from '@/lib/routes'
import seo_metadata from "@/lib/seo/metadata";
import { seoConfig } from "@/lib/seo/seoConfig";

export const metadata = seoConfig({
   ...seo_metadata.about
});

const page = () => {
   // const { navigateTo } = useAppRouter();

   return (
      <div className="relative flex flex-col w-full">
         <PagesHero
            title={heroSectionData.about.title}
            description={heroSectionData.about.description}
            buttonLabel='Book Your Stay'
            // onClick={() => navigateTo(routes.bookNow)}
         />
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

export default page