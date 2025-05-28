import {
  APP_EMAIL,
  APP_HOUSE_ADDRESS,
  APP_LOGO,
  APP_NAME,
  APP_PHONE_NUMBER,
} from "@/lib/constants";
import { guestHouseEmailTemplate } from "@/lib/emailTemplates";
import { createInquiry } from "@/server/inquiries.action";
import { handleError } from "@/utils";
import { logger } from "@/utils/log";
import nodemailer from "nodemailer";

export const POST = async (request) => {
  try {
    const { data: inquiryData } = await request.json();

    // Create the inquiry first
    const inquiryResult = await createInquiry(inquiryData);

    const inquiry = inquiryData;

    if (inquiryResult.error) {
      return new Response(JSON.stringify({ error: inquiryResult.error }), {
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

    // Email templates data
    const emailData = {
      inquiry: inquiryData,
      guestHouseName: process.env.GUEST_HOUSE_NAME || APP_NAME,
      guestHouseEmail: credentials.guestHouseEmail || APP_EMAIL,
      guestHousePhone: process.env.GUEST_HOUSE_PHONE || APP_PHONE_NUMBER,
      guestHouseAddress: process.env.GUEST_HOUSE_ADDRESS || APP_HOUSE_ADDRESS,
      guestHouseLogo: APP_LOGO,
    };

    // Send confirmation email to guest
    const guestConfirmationEmail = guestHouseEmailTemplate({
      ...emailData,
      emailType: "inquiryConfirmation",
    });

    await transporter.sendMail({
      from: `"${emailData.guestHouseName}" <${credentials.appEmail}>`,
      to: inquiry.email,
      subject: "Thank you for your inquiry",
      html: guestConfirmationEmail,
    });

    // Send alert email to guest house management
    const managementAlertEmail = guestHouseEmailTemplate({
      ...emailData,
      emailType: "inquiryAlert",
    });

    await transporter.sendMail({
      from: `"${inquiry.name} via ${emailData.guestHouseName}" <${credentials.appEmail}>`,
      to: credentials.guestHouseEmail,
      replyTo: inquiry.email,
      subject: `📬 New Inquiry: ${inquiry.subject}`,
      html: managementAlertEmail,
    });

    return new Response(
      JSON.stringify({
        message: "Inquiry submitted and emails sent successfully",
        inquiry: inquiryData,
      }),
      { status: 200 }
    );
  } catch (error) {
    handleError(error);
    logger(`Error in inquiry email endpoint: ${error.message}`);
    return new Response(
      JSON.stringify({ error: "Failed to process inquiry and send emails" }),
      { status: 500 }
    );
  }
};
