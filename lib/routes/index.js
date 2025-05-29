const routes = {
  home: "/",

  // Public Pages
  about: "/about-us",
  rooms: "/rooms",
  roomDetails: (slug) => `/rooms/${slug}`,
  amenities: "/amenities",
  gallery: "/gallery",
  contact: "/contact-us",
  faq: "/faq",

  // Booking & Reservation
  bookNow: "/#book-now",
  booking: "/booking",
  bookingStep: (step) => `/booking/step-${step}`,
  confirmBooking: "/booking/confirmation",

  // Legal Pages
  terms: "/terms-and-conditions",
  privacy: "/privacy-policy",

  // Auth (if needed)
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",

  // Admin (Optional)
  admin: {
    dashboard: "/admin",
    rooms: "/admin/rooms",
    bookings: "/admin/bookings",
    guests: "/admin/guests",
    settings: "/admin/settings",
  },


  // Utility
  notFound: "/404",
};

export default routes;

// Ghana coordinates for Makayla Guest House in Abesim, Bono Region
export const MAP_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7914.878068020306!2d-2.3010956952735184!3d7.304472413697892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdac5018cc500bf%3A0xc17106ca3e10ebe1!2sMakayla%20Guest%20House!5e0!3m2!1sen!2sgh!4v1747303785543!5m2!1sen!2sgh";


export const clientBaseURL = process.env.NODE_ENV === 'production' ? 'https://ghanainsights.com' : 'http://localhost:3000';


export const sitemapURL = `${clientBaseURL}/sitemap.xml`;
export const IS_PRODUCTION = process.env.NEXT_PUBLIC_IS_PRODUCTION == "false";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const whatsappChannel = 'https://whatsapp.com/channel/0029VabIfyqFSAtCZ4itbk1T';
export const linkedinUrl = 'https://www.linkedin.com/company/ghanainsights/';

export const CLOUD_ENDPOINT = 'https://api.cloudinary.com/v1_1/makayla-guest-house/image/upload'

export const ENDPOINTS = {
  inquiries: '/api/inquiries',
  bookings: '/api/bookings',
  rooms: '/api/rooms',
  amenities: '/api/amenities',
  guests: '/api/guests',
  auth: '/api/auth',
  settings: '/api/settings',
};