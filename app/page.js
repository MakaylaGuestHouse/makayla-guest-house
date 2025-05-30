import HomePage from "@/components/pages/Home";
import seo_metadata from "@/lib/seo/metadata";
import { seoConfig } from "@/lib/seo/seoConfig";

export const metadata = seoConfig({
  ...seo_metadata.home
});

export default function Home() {
  return (
    <main>
      <HomePage />
    </main>
  );
}
