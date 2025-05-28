import Dashboard from '@/components/pages/dashboard/Dashboard'
import { fetchBookings } from '@/server/booking.action';
import { fetchInquiries } from '@/server/inquiries.action';
import { fetchNewsletterSubscribers } from '@/server/newsLetter.action';
import { fetchRooms } from '@/server/rooms.action';
import React from 'react'

const page = async () => {
  const roomsPromise = await fetchRooms({ query: '', limit: 10, page: 1 });
  const bookingsPromise = await fetchBookings({ query: '', limit: 10, page: 1 });
  const inquiriesPromise = await fetchInquiries({ query: '', limit: 10, page: 1 });
  const subscribersPromise = await fetchNewsletterSubscribers({ query: '', limit: 10, page: 1 });

  const [rooms, bookings, inquiries, subscribers] = await Promise.all([roomsPromise, bookingsPromise, inquiriesPromise, subscribersPromise]);

  return (
    <div>
      <Dashboard
        rooms={rooms}
        bookings={bookings}
        inquiries={inquiries}
        newsletters={subscribers}
      />
    </div>
  )
}

export default page