import RoomsPage from '@/components/ui/rooms/RoomsPage'
import { fetchRooms } from '@/server/rooms.action';
import React from 'react'

const Rooms = async () => {
   const rooms = await fetchRooms({ query: '', limit: 50, page: 1 });

   return (
      <div><RoomsPage rooms={rooms.data} roomsCount={rooms.totalPages} /></div>
   )
}

export default Rooms