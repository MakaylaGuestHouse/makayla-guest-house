import HomePage from "@/components/pages/Home";
import seo_metadata from "@/lib/seo/metadata";
import { seoConfig } from "@/lib/seo/seoConfig";
import { fetchRooms } from "@/server/rooms.action";

export const metadata = seoConfig({
  ...seo_metadata.home,
});

export default async function Home() {
  const rooms = await fetchRooms({ query: "", limit: 4, page: 1 });

  return (
    <main>
      <HomePage featuredRooms={rooms.data} />
    </main>
  );
}
