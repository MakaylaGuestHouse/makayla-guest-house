import routes, { clientBaseURL, moreLinks, quickLinks } from "@/lib/routes";
import { fetchRooms } from "@/server/rooms.action";

export default async function sitemap() {
  const rooms = (await fetchRooms({
    query: undefined,
    page: 1,
    limit: 100,
    isSitemap: true,
  })) || { data: [], totalPages: 0 };

  const homepage = {
    url: `${clientBaseURL}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
  };

  const staticRouteURLS = [...quickLinks, ...moreLinks]?.map((link) => ({
    url: `${clientBaseURL}${link?.href}`,
    lastModified: new Date().toISOString(),
    changeFrequency: `monthly`,
  }));

  const roomsURLS = rooms?.data?.map(({ _id, createdAt }) => ({
    url: `${clientBaseURL}${routes.roomDetails(_id)}`,
    lastModified: createdAt,
    changeFrequency: "daily",
  }));

  return [homepage, ...roomsURLS, ...staticRouteURLS];
}
