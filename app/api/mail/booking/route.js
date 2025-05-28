import {
  APP_EMAIL,
  APP_HOUSE_ADDRESS,
  APP_LOGO,
  APP_NAME,
  APP_PHONE_NUMBER,
} from "@/lib/constants";
import { guestHouseEmailTemplate } from "@/lib/emailTemplates";
import { createBooking, fetchBooking } from "@/server/booking.action";
import { fetchRoom } from "@/server/rooms.action";
import { handleError } from "@/utils";
import { logger } from "@/utils/log";
import nodemailer from "nodemailer";

export const POST = async (request) => {
  try {
    const { data: bookingData } = await request.json();

    // Create the booking first
    const bookingResult = await createBooking(bookingData, bookingData.roomId);

    if (bookingResult.error) {
      return new Response(JSON.stringify({ error: bookingResult.error }), {
        status: 400,
      });
    }

    const booking = bookingData;
    let room = null;

    // Fetch room details if roomId exists
    if (booking.roomId) {
      const roomResult = await fetchRoom(booking.roomId);
      if (roomResult && !roomResult.error) {
        room = roomResult.room || roomResult;
      }
    }

    // Email configuration
    const credentials = {
      appEmail: process.env.APP_EMAIL,
      password: process.env.NODEMAILER_PASSWORD,
      guestHouseEmail: process.env.GUEST_HOUSE_EMAIL || process.env.APP_EMAIL,
    };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: credentials.appEmail,
        pass: credentials.password,
      },
    });

    // Email templates data
    const emailData = {
      booking,
      room,
      guestHouseName: process.env.GUEST_HOUSE_NAME || APP_NAME,
      guestHouseEmail: credentials.guestHouseEmail || APP_EMAIL,
      guestHousePhone: process.env.GUEST_HOUSE_PHONE || APP_PHONE_NUMBER,
      guestHouseAddress: process.env.GUEST_HOUSE_ADDRESS || APP_HOUSE_ADDRESS,
      guestHouseLogo: APP_LOGO,
    };

    // Send confirmation email to guest
    const guestConfirmationEmail = guestHouseEmailTemplate({
      ...emailData,
      emailType: "bookingConfirmation",
    });

    await transporter.sendMail({
      from: `"${emailData.guestHouseName}" <${credentials.appEmail}>`,
      to: booking.email,
      subject: `Booking Confirmation - ${booking.fullName}`,
      html: guestConfirmationEmail,
    });

    // Send alert email to guest house management
    const managementAlertEmail = guestHouseEmailTemplate({
      ...emailData,
      emailType: "bookingAlert",
    });

    await transporter.sendMail({
      from: `"${emailData.guestHouseName} - New Booking" <${credentials.appEmail}>`,
      to: credentials.guestHouseEmail,
      subject: `🔔 New Booking Alert - ${booking.bookingReference}`,
      html: managementAlertEmail,
    });

    return new Response(
      JSON.stringify({
        message: "Booking created and emails sent successfully",
        booking: booking,
        bookingReference: booking.bookingReference,
      }),
      { status: 200 }
    );
  } catch (error) {
    handleError(error);
    logger(`Error in booking email endpoint: ${error.message}`);
    return new Response(
      JSON.stringify({ error: "Failed to process booking and send emails" }),
      { status: 500 }
    );
  }
};
