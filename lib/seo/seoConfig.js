import { APP_NAME } from "../constants";
import routes, { clientBaseURL } from "../routes";

export const seoRobot_config = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
  },
};

export const seoConfig = async ({
  keywords,
  title,
  image,
  description,
  publishedAt,
  url,
}) => {
  const img = {
    url: image,
    width: 1000,
    height: 680,
    alt: APP_NAME,
    type: "image/jpeg",
  };
  const seo = {
    title: title,
    description: description,
    category: "website",
    siteName: APP_NAME,
    keywords: keywords,
    startUrl: routes.home,
    manifest: routes.manifest,
    metadataBase: new URL(clientBaseURL),
    openGraph: {
      title: title,
      description: description,
      type: "article",
      siteName: APP_NAME,
      url: url,
      publishedTime: publishedAt ? publishedAt : "",
      images: [img],
    },
    twitter: {
      title: title,
      description: description,
      images: [img],
      card: "summary_large_image",
    },
    alternates: {
      canonical: url,
    },
    robots: seoRobot_config,
  };

  return seo;
};
