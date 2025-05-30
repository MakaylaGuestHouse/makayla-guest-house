import { PagesHero } from '@/components/common/PagesHero'
import ContactPage from '@/components/pages/Contact'
import Faqs from '@/components/ui/Faqs'
import { heroSectionData } from '@/data'
import React from 'react'
import seo_metadata from "@/lib/seo/metadata";
import { seoConfig } from "@/lib/seo/seoConfig";

export const metadata = seoConfig({
  ...seo_metadata.contact
});

const page = () => {
   return (
      <div className="relative flex flex-col w-full overflow-hidden">
         <PagesHero
            title={heroSectionData.contact.title}
            description={heroSectionData.contact.description}
            buttonLabel='View Our Rooms'
         />
         <ContactPage />
         <Faqs />
      </div>
   )
}

export default page