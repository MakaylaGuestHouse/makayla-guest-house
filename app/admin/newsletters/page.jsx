import Newsletters from '@/components/pages/admin/Newsletter'
import { fetchNewsletterSubscribers } from '@/server/newsLetter.action';
import React from 'react'

const page = async () => {
   const subscribers = await fetchNewsletterSubscribers({ query: '', limit: 100, page: 1 });

   return (
      <div>
         <Newsletters subscribers={subscribers.data} />
      </div>
   )
}

export default page