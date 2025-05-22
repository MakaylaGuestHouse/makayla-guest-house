const routes = {
  home: "/",

  // Public Pages
  about: "/about",
  rooms: "/rooms",
  roomDetails: (slug) => `/rooms/${slug}`,
  amenities: "/amenities",
  gallery: "/gallery",
  contact: "/contact",
  faq: "/faq",

  // Booking & Reservation
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
