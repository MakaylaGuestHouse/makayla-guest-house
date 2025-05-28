import { RoomsAdmin } from '@/components/pages/admin/Rooms'
import { fetchRooms } from '@/server/rooms.action'
import React from 'react'

const page = async () => {
   const rooms = await fetchRooms({ query: '', limit: 50, page: 1 });
   console.log(rooms);
   return (
      <div>
         <RoomsAdmin rooms={rooms.data} />
      </div>
   )
}

export default page