import { APP_NAME } from "../constants";
import routes, { clientBaseURL } from "../routes";

const metadata = {
  home: {
    url: clientBaseURL,
    image: routes.logo,
    title: `Guest House in Sunyani Ghana | Affordable & Luxury Rooms - ${APP_NAME}`,
    keywords:
      "guest house Sunyani, guest houses in Sunyani Ghana, affordable guest house Sunyani, luxury guest house Sunyani, where to stay in Sunyani",
    description: `Find the best guest house in Sunyani, Ghana. Book affordable or luxury rooms at ${APP_NAME}. Clean, secure, and 24/7 customer support.`,
  },
  rooms: {
    url: `${clientBaseURL}${routes.rooms}`,
    image: routes.logo,
    title: `Rooms in Sunyani Guest House | Book Single, Double, or Deluxe - ${APP_NAME}`,
    keywords:
      "rooms in Sunyani, Sunyani guest house rooms, cheap rooms Sunyani, double room Sunyani, deluxe room Sunyani",
    description: `Book single, double, or deluxe rooms in Sunyani at ${APP_NAME}. Affordable prices, clean facilities, and online booking available.`,
  },
  gallery: {
    url: `${clientBaseURL}${routes.gallery}`,
    image: routes.logo,
    title: `Guest House Pictures in Sunyani Ghana | Room & Property Images - ${APP_NAME}`,
    keywords:
      "guest house pictures Sunyani, room photos Sunyani, guest house interior Sunyani, hotel images Ghana, Sunyani hotel gallery",
    description: `See real pictures of ${APP_NAME} in Sunyani, Ghana. Browse rooms, reception, and guest areas before booking.`,
  },
  about: {
    url: `${clientBaseURL}${routes.about}`,
    image: routes.logo,
    title: `About ${APP_NAME} | Trusted Guest House in Sunyani Ghana`,
    keywords:
      "about guest house Sunyani, best guest house Sunyani, top guest house Ghana, trusted accommodation Sunyani, Sunyani hotels",
    description: `Learn about ${APP_NAME}, a trusted guest house in Sunyani. Clean rooms, professional staff, and great reviews from local and international guests.`,
  },
  contact: {
    url: `${clientBaseURL}${routes.contact}`,
    image: routes.logo,
    title: `Contact Guest House in Sunyani Ghana | Book or Ask Questions - ${APP_NAME}`,
    keywords:
      "contact guest house Sunyani, book room Sunyani, Sunyani hotel phone, WhatsApp guest house Ghana, how to book Sunyani guest house",
    description: `Call, message, or WhatsApp ${APP_NAME} in Sunyani to book your stay or ask questions. Quick response and friendly staff.`,
  },
};

export default metadata;
