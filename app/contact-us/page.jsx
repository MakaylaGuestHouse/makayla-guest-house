"use client"
import { PagesHero } from '@/components/common/PagesHero'
import ContactPage from '@/components/pages/Contact'
import Faqs from '@/components/ui/Faqs'
import React from 'react'

const page = () => {
   return (
      <div className="relative flex flex-col w-full overflow-hidden">
         <PagesHero />
         <ContactPage />
         <Faqs />
      </div>
   )
}

export default page