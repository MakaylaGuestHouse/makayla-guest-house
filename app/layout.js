import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { ScrollToTopButton } from "@/components/common/ScrollToTopButton";
import { APP_NAME } from "@/lib/constants";
import routes from "@/lib/routes";
import { seoRobot_config } from "@/lib/seo/seoConfig";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: `${APP_NAME} – Guest House in Sunyani, Ghana`,
  siteName: APP_NAME,
  description: `Looking for a clean and affordable guest house in Sunyani, Ghana? Book your stay at ${APP_NAME}. Private rooms, great service, and 24/7 support.`,
  keywords:
    "guest house Sunyani, Sunyani Ghana accommodation, book guest house Ghana, affordable rooms Sunyani, best guest house Sunyani",
  icons: {
    icon: routes.logo,
    shortcut: routes.logo,
    apple: routes.logo,
    other: {
      rel: routes.logo,
      url: routes.logo,
    },
    category: "website",
  },
  robots: seoRobot_config,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <ScrollToTopButton />
        <Footer />
      </body>
    </html>
  );
}
