import RoomDetails from '@/components/pages/room/RoomDetails'
import { fetchRoom, fetchRooms } from '@/server/rooms.action';
import React from 'react'

const Room = async ({ params }) => {
  // Fetch the room by id
  const roomPromise = await fetchRoom(params.slug);


  // Fetch similar in parallel with the article
  const similarRoomsPromise = fetchRooms({
    query: "",
    page: 1,
    limit: 3,
  });

  const [room, similarRooms] = await Promise.all([
    roomPromise,
    similarRoomsPromise,
  ]);

  return (
    <div>
      <RoomDetails room={room} similarRooms={similarRooms.data} />
    </div>
  )
}

export default Room