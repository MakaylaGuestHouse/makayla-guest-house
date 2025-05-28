import Bookings from '@/components/pages/admin/Bookings'
import { fetchBookings } from '@/server/booking.action';
import React from 'react'

const page = async () => {
   const bookings = await fetchBookings({ query: '', limit: 100, page: 1 });

   return (
      <div><Bookings bookings={bookings.data} /></div>
   )
}

export default page