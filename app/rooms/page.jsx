import RoomsPage from '@/components/ui/rooms/RoomsPage'
import { fetchRooms } from '@/server/rooms.action';
import React from 'react'
import seo_metadata from "@/lib/seo/metadata";
import { seoConfig } from "@/lib/seo/seoConfig";

export const metadata = seoConfig({
  ...seo_metadata.rooms
});

const Rooms = async () => {
   const rooms = await fetchRooms({ query: '', limit: 50, page: 1 });

   return (
      <div><RoomsPage rooms={rooms.data} roomsCount={rooms.totalPages} /></div>
   )
}

export default Rooms