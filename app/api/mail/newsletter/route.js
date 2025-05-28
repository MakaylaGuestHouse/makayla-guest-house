import {
  APP_EMAIL,
  APP_HOUSE_ADDRESS,
  APP_LOGO,
  APP_NAME,
  APP_PHONE_NUMBER,
} from "@/lib/constants";
import { guestHouseEmailTemplate } from "@/lib/emailTemplates";
import { createNewsletterSubscriber } from "@/server/newsLetter.action";
import { handleError } from "@/utils";
import { logger } from "@/utils/log";
import nodemailer from "nodemailer";

export const POST = async (request) => {
  try {
    const { data } = await request.json();
    const email = data;

    // Create newsletter subscription
    const subscriptionResult = await createNewsletterSubscriber(email);

    if (subscriptionResult.error) {
      return new Response(JSON.stringify({ error: subscriptionResult.error }), {
        status: 400,
      });
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

    // Email template data
    const emailData = {
      email,
      guestHouseName: process.env.GUEST_HOUSE_NAME || APP_NAME,
      guestHouseEmail: credentials.guestHouseEmail || APP_EMAIL,
      guestHousePhone: process.env.GUEST_HOUSE_PHONE || APP_PHONE_NUMBER,
      guestHouseAddress: process.env.GUEST_HOUSE_ADDRESS || APP_HOUSE_ADDRESS,
      guestHouseLogo: APP_LOGO,
    };

    // Send confirmation email to subscriber
    const subscriptionConfirmationEmail = guestHouseEmailTemplate({
      ...emailData,
      emailType: "newsletterSubscription",
    });

    await transporter.sendMail({
      from: `"${emailData.guestHouseName}" <${credentials.appEmail}>`,
      to: email,
      subject: `Welcome to ${emailData.guestHouseName} Newsletter!`,
      html: subscriptionConfirmationEmail,
    });

    return new Response(
      JSON.stringify({
        message: "Newsletter subscription successful",
        email: email,
      }),
      { status: 200 }
    );
  } catch (error) {
    handleError(error);
    logger(`Error in newsletter email endpoint: ${error.message}`);
    return new Response(
      JSON.stringify({ error: "Failed to process newsletter subscription" }),
      { status: 500 }
    );
  }
};
