import RoomDetails from '@/components/pages/room/RoomDetails'
import { APP_NAME } from '@/lib/constants';
import routes from '@/lib/routes';
import { seoConfig } from '@/lib/seo/seoConfig';
import { fetchRoom, fetchRooms } from '@/server/rooms.action';
import React from 'react'

export async function generateMetadata({ params }, parent) {
  const { slug } = await params;
  const room = (await fetchRoom(slug)) || {};
  const url = `${routes.roomDetails(slug)}`;

  return seoConfig({
    url: url,
    image: room?.images[0]?.image,
    title: `${room?.name} - ${APP_NAME}`,
    keywords: room?.tags,
    description: room?.description,
    publishedAt: room?.createdAt,
  });
}

const page = async ({ params }) => {
  const { slug } = await params;

  // Fetch the room by id
  const roomPromise = await fetchRoom(slug);

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

export default page