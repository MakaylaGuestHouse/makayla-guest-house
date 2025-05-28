import Inquiries from '@/components/pages/admin/Inquiries'
import { fetchInquiries } from '@/server/inquiries.action';
import React from 'react'

const page = async () => {
   const inquiries = await fetchInquiries({ query: '', limit: 100, page: 1 });

   console.log(inquiries);
   return (
      <div><Inquiries inquiries={inquiries.data} /></div>
   )
}

export default page