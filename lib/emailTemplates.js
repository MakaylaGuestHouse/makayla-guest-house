import {
  APP_EMAIL,
  APP_HOUSE_ADDRESS,
  APP_LOGO,
  APP_NAME,
  APP_PHONE_NUMBER,
} from "./constants";

// Booking confirmation email for guest
const renderBookingConfirmationContent = ({
  booking,
  room,
  guestHouseName = APP_NAME,
}) => {
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return `
        <div class="booking-header">
            <h2>🎉 Booking Confirmation</h2>
            <p class="booking-ref">Booking Reference: <strong>${
              booking.bookingReference
            }</strong></p>
        </div>
        
        <div class="greeting">
            <h3>Hello ${booking.fullName}! 👋</h3>
            <p>Thank you for choosing <strong>${guestHouseName}</strong>. Your booking has been confirmed!</p>
        </div>

        <div class="booking-details">
            <h4>📋 Booking Details</h4>
            <div class="detail-grid">
                <div class="detail-item">
                    <span class="label">Check-in:</span>
                    <span class="value">${formatDate(
                      booking.checkInDate
                    )}</span>
                </div>
                <div class="detail-item">
                    <span class="label">Check-out:</span>
                    <span class="value">${formatDate(
                      booking.checkOutDate
                    )}</span>
                </div>
                <div class="detail-item">
                    <span class="label">Duration:</span>
                    <span class="value">${booking.totalNights} night${
    booking.totalNights > 1 ? "s" : ""
  }</span>
                </div>
                <div class="detail-item">
                    <span class="label">Guests:</span>
                    <span class="value">${booking.adults} adult${
    booking.adults > 1 ? "s" : ""
  }${
    booking.children > 0
      ? `, ${booking.children} child${booking.children > 1 ? "ren" : ""}`
      : ""
  }</span>
                </div>
                <div class="detail-item">
                    <span class="label">Room Type:</span>
                    <span class="value">${booking.roomType}</span>
                </div>
                ${
                  room
                    ? `
                <div class="detail-item">
                    <span class="label">Room:</span>
                    <span class="value">${room.name} (${room.roomNumber})</span>
                </div>
                `
                    : ""
                }
            </div>
        </div>

        ${
          room
            ? `
        <div class="room-details">
            <h4>🏨 Room Information</h4>
            <div class="room-card">
                ${
                  room.images && room.images.length > 0
                    ? `
                    <img src="${room.images[0].image}" alt="${room.name}" class="room-image">
                `
                    : ""
                }
                <div class="room-info">
                    <h5>${room.name}</h5>
                    <p>${room.description}</p>
                    <div class="room-features">
                        <span>🛏️ ${room.totalBeds} bed${
                room.totalBeds > 1 ? "s" : ""
              }</span>
                        <span>👥 Max ${room.maxGuests} guests</span>
                        <span>📏 ${room.roomSize}</span>
                        ${room.hasBalcony ? "<span>🌅 Balcony</span>" : ""}
                    </div>
                    ${
                      room.amenities && room.amenities.length > 0
                        ? `
                    <div class="amenities">
                        <strong>Amenities:</strong> ${room.amenities.join(", ")}
                    </div>
                    `
                        : ""
                    }
                </div>
            </div>
        </div>
        `
            : ""
        }

        ${
          booking.specialRequests
            ? `
        <div class="special-requests">
            <h4>📝 Special Requests</h4>
            <p>${booking.specialRequests}</p>
        </div>
        `
            : ""
        }

        <div class="contact-info">
            <h4>📞 Contact Information</h4>
            <p>If you have any questions or need to make changes to your booking, please contact us:</p>
            <p><strong>Phone:</strong> ${APP_PHONE_NUMBER}</p>
            <p><strong>Email:</strong> ${APP_EMAIL}</p>
        </div>

        <div class="check-in-info">
            <h4>ℹ️ Check-in Information</h4>
            <p><strong>Check-in time:</strong> 2:00 PM onwards</p>
            <p><strong>Check-out time:</strong> 12:00 PM</p>
            <p>Please bring a valid ID for check-in.</p>
        </div>

        <div class="footer-message">
            <p>We look forward to welcoming you and ensuring you have a wonderful stay!</p>
        </div>
    `;
};

// Booking alert email for guest house management
const renderBookingAlertContent = ({
  booking,
  room,
  guestHouseName = APP_NAME,
}) => {
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return `
        <div class="alert-header">
            <h2>🔔 New Booking Alert</h2>
            <p class="booking-ref">Booking Reference: <strong>${
              booking.bookingReference
            }</strong></p>
            <p class="booking-status">Status: <span class="status-${
              booking?.bookingStatus
            }">PENDING</span></p>
        </div>
        
        <div class="guest-info">
            <h3>👤 Guest Information</h3>
            <div class="detail-grid">
                <div class="detail-item">
                    <span class="label">Name:</span>
                    <span class="value">${booking.fullName}</span>
                </div>
                <div class="detail-item">
                    <span class="label">Email:</span>
                    <span class="value">${booking.email}</span>
                </div>
                <div class="detail-item">
                    <span class="label">Phone:</span>
                    <span class="value">${booking.phoneNumber}</span>
                </div>
            </div>
        </div>

        <div class="booking-details">
            <h3>📋 Booking Details</h3>
            <div class="detail-grid">
                <div class="detail-item">
                    <span class="label">Check-in:</span>
                    <span class="value">${formatDate(
                      booking.checkInDate
                    )}</span>
                </div>
                <div class="detail-item">
                    <span class="label">Check-out:</span>
                    <span class="value">${formatDate(
                      booking.checkOutDate
                    )}</span>
                </div>
                <div class="detail-item">
                    <span class="label">Duration:</span>
                    <span class="value">${booking.totalNights} night${
    booking.totalNights > 1 ? "s" : ""
  }</span>
                </div>
                <div class="detail-item">
                    <span class="label">Guests:</span>
                    <span class="value">${booking.adults} adult${
    booking.adults > 1 ? "s" : ""
  }${
    booking.children > 0
      ? `, ${booking.children} child${booking.children > 1 ? "ren" : ""}`
      : ""
  }</span>
                </div>
                <div class="detail-item">
                    <span class="label">Room Type:</span>
                    <span class="value">${booking.roomType}</span>
                </div>
                <div class="detail-item">
                    <span class="label">Booked:</span>
                    <span class="value">${new Date(
                      booking.createdAt
                    ).toLocaleString()}</span>
                </div>
            </div>
        </div>

        ${
          room
            ? `
        <div class="room-details">
            <h3>🏨 Assigned Room</h3>
            <div class="room-summary">
                <p><strong>${room.name}</strong> (Room ${room.roomNumber})</p>
                <p>Price: $${room.price}/night</p>
                <p>Capacity: ${room.maxGuests} guests</p>
            </div>
        </div>
        `
            : ""
        }

        ${
          booking.specialRequests
            ? `
        <div class="special-requests">
            <h3>📝 Special Requests</h3>
            <div class="request-box">
                <p>${booking.specialRequests}</p>
            </div>
        </div>
        `
            : ""
        }

        <div class="action-required">
            <h3>⚡ Action Required</h3>
            <p>Please review this booking and take necessary actions:</p>
            <ul>
                <li>Confirm room availability</li>
                <li>Update booking status if needed</li>
                <li>Prepare for guest arrival</li>
                <li>Review any special requests</li>
            </ul>
        </div>
    `;
};

// Inquiry confirmation email for guest
const renderInquiryConfirmationContent = ({
  inquiry,
  guestHouseName = APP_NAME,
}) => {
  return `
        <div class="inquiry-header">
            <h2>📧 Thank You for Your Inquiry</h2>
        </div>
        
        <div class="greeting">
            <h3>Hello ${inquiry.name}! 👋</h3>
            <p>Thank you for contacting <strong>${guestHouseName}</strong>. We have received your inquiry and will get back to you shortly.</p>
        </div>

        <div class="inquiry-details">
            <h4>📋 Your Inquiry Details</h4>
            <div class="detail-grid">
                <div class="detail-item">
                    <span class="label">Subject:</span>
                    <span class="value">${inquiry.subject}</span>
                </div>
                <div class="detail-item">
                    <span class="label">Received:</span>
                    <span class="value">${new Date(
                      inquiry.receivedAt
                    ).toLocaleString()}</span>
                </div>
            </div>
            
            <div class="message-box">
                <h5>Your Message:</h5>
                <p>${inquiry.message}</p>
            </div>
        </div>

        <div class="response-time">
            <h4>⏰ Response Time</h4>
            <p>We typically respond to inquiries within <strong>24 hours</strong>. For urgent matters, please call us directly at <strong>${APP_PHONE_NUMBER}</strong>.</p>
        </div>

        <div class="contact-info">
            <h4>📞 Contact Information</h4>
            <p><strong>Phone:</strong> ${APP_PHONE_NUMBER}</p>
            <p><strong>Email:</strong> ${APP_EMAIL}</p>
        </div>
    `;
};

// Inquiry alert email for guest house management
const renderInquiryAlertContent = ({ inquiry, guestHouseName = APP_NAME }) => {
  return `
        <div class="alert-header">
            <h2>📬 New Inquiry Received</h2>
            <p class="inquiry-time">Received: ${new Date(
              inquiry.receivedAt
            ).toLocaleString()}</p>
        </div>
        
        <div class="guest-info">
            <h3>👤 Contact Information</h3>
            <div class="detail-grid">
                <div class="detail-item">
                    <span class="label">Name:</span>
                    <span class="value">${inquiry.name}</span>
                </div>
                <div class="detail-item">
                    <span class="label">Email:</span>
                    <span class="value">${inquiry.email}</span>
                </div>
                ${
                  inquiry.phone
                    ? `
                <div class="detail-item">
                    <span class="label">Phone:</span>
                    <span class="value">${inquiry.phone}</span>
                </div>
                `
                    : ""
                }
            </div>
        </div>

        <div class="inquiry-details">
            <h3>📋 Inquiry Details</h3>
            <div class="detail-item">
                <span class="label">Subject:</span>
                <span class="value">${inquiry.subject}</span>
            </div>
            
            <div class="message-box">
                <h4>Message:</h4>
                <p>${inquiry.message}</p>
            </div>
        </div>

        <div class="action-required">
            <h3>⚡ Action Required</h3>
            <p>Please respond to this inquiry promptly. Remember to:</p>
            <ul>
                <li>Reply within 24 hours</li>
                <li>Address all questions asked</li>
                <li>Provide relevant information about rooms and rates</li>
                <li>Mark as resolved once handled</li>
            </ul>
        </div>
    `;
};

// Newsletter subscription confirmation
const renderNewsletterSubscriptionContent = ({
  email,
  guestHouseName = APP_NAME,
}) => {
  return `
        <div class="newsletter-header">
            <h2>🎉 Welcome to Our Newsletter!</h2>
        </div>
        
        <div class="greeting">
            <h3>Thank you for subscribing! 👋</h3>
            <p>You've successfully subscribed to the <strong>${guestHouseName}</strong> newsletter.</p>
        </div>

        <div class="newsletter-info">
            <h4>📬 What to Expect</h4>
            <ul>
                <li>Special offers and discounts</li>
                <li>News about our facilities and services</li>
                <li>Local area recommendations and events</li>
                <li>Seasonal promotions</li>
            </ul>
        </div>

        <div class="subscription-details">
            <h4>📧 Subscription Details</h4>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subscribed:</strong> ${new Date().toLocaleString()}</p>
        </div>

        <div class="unsubscribe-info">
            <p><small>You can unsubscribe at any time by clicking the unsubscribe link in any of our emails.</small></p>
        </div>
    `;
};

// Main email template function
export const guestHouseEmailTemplate = ({
  emailType,
  booking,
  room,
  inquiry,
  email,
  guestHouseName = APP_NAME,
  guestHouseEmail = APP_EMAIL,
  guestHousePhone = APP_PHONE_NUMBER,
  guestHouseAddress = APP_HOUSE_ADDRESS,
  guestHouseLogo = APP_LOGO,
}) => {
  let content;

  switch (emailType) {
    case "bookingConfirmation":
      content = renderBookingConfirmationContent({
        booking,
        room,
        guestHouseName,
      });
      break;
    case "bookingAlert":
      content = renderBookingAlertContent({ booking, room, guestHouseName });
      break;
    case "inquiryConfirmation":
      content = renderInquiryConfirmationContent({ inquiry, guestHouseName });
      break;
    case "inquiryAlert":
      content = renderInquiryAlertContent({ inquiry, guestHouseName });
      break;
    case "newsletterSubscription":
      content = renderNewsletterSubscriptionContent({ email, guestHouseName });
      break;
    default:
      content = "<p>Invalid email type</p>";
  }

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${guestHouseName} - Email</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
                line-height: 1.6 !important;
                margin: 0 !important;
                padding: 0 !important;
                background-color: #f8f9fa !important;
                color: #333 !important;
            }
            .container {
                max-width: 600px !important;
                margin: 0 auto !important;
                background-color: #ffffff !important;
                border-radius: 10px !important;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
                overflow: hidden !important;
            }
            .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
                color: white !important;
                padding: 30px 20px !important;
                text-align: center !important;
            }
            .header img {
                max-width: 150px !important;
                height: auto !important;
                margin-bottom: 10px !important;
            }
            .header h1 {
                margin: 0 !important;
                font-size: 28px !important;
                font-weight: 300 !important;
            }
            .content {
                padding: 30px !important;
            }
            .booking-header, .alert-header, .inquiry-header, .newsletter-header {
                text-align: center !important;
                margin-bottom: 30px !important;
                padding-bottom: 20px !important;
                border-bottom: 2px solid #e9ecef !important;
            }
            .booking-header h2, .alert-header h2, .inquiry-header h2, .newsletter-header h2 {
                color: #2c3e50 !important;
                margin: 0 0 10px 0 !important;
            }
            .booking-ref, .inquiry-time {
                background-color: #e8f4fd !important;
                padding: 10px 15px !important;
                border-radius: 5px !important;
                font-weight: bold !important;
                color: #1e88e5 !important;
                display: inline-block !important;
            }
            .greeting h3 {
                color: #2c3e50 !important;
                margin-bottom: 15px !important;
            }
            .detail-grid {
                display: grid !important;
                grid-template-columns: 1fr 1fr !important;
                gap: 15px !important;
                margin: 20px 0 !important;
            }
            .detail-item {
                display: flex !important;
                flex-direction: column !important;
                background-color: #f8f9fa !important;
                padding: 15px !important;
                border-radius: 8px !important;
                border-left: 4px solid #667eea !important;
            }
            .detail-item .label {
                font-weight: bold !important;
                color: #666 !important;
                font-size: 12px !important;
                text-transform: uppercase !important;
                margin-bottom: 5px !important;
            }
            .detail-item .value {
                font-size: 16px !important;
                color: #2c3e50 !important;
            }
            .room-card {
                background-color: #f8f9fa !important;
                border-radius: 10px !important;
                padding: 20px !important;
                margin: 15px 0 !important;
            }
            .room-image {
                width: 100% !important;
                height: 200px !important;
                object-fit: cover !important;
                border-radius: 8px !important;
                margin-bottom: 15px !important;
            }
            .room-features {
                display: flex !important;
                flex-wrap: wrap !important;
                gap: 10px !important;
                margin: 10px 0 !important;
            }
            .room-features span {
                background-color: #e3f2fd !important;
                padding: 5px 10px !important;
                border-radius: 15px !important;
                font-size: 12px !important;
                color: #1565c0 !important;
            }
            .message-box, .request-box {
                background-color: #f8f9fa !important;
                padding: 20px !important;
                border-radius: 8px !important;
                border-left: 4px solid #28a745 !important;
                margin: 15px 0 !important;
            }
            .status-pending {
                color: #ff9800 !important;
                background-color: #fff3e0 !important;
                padding: 3px 8px !important;
                border-radius: 12px !important;
                font-size: 12px !important;
            }
            .status-confirmed {
                color: #4caf50 !important;
                background-color: #e8f5e8 !important;
                padding: 3px 8px !important;
                border-radius: 12px !important;
                font-size: 12px !important;
            }
            .action-required {
                background-color: #fff8e1 !important;
                padding: 20px !important;
                border-radius: 8px !important;
                border-left: 4px solid #ffa726 !important;
                margin: 20px 0 !important;
            }
            .action-required h3 {
                color: #ef6c00 !important;
                margin-top: 0 !important;
            }
            .contact-info, .check-in-info, .response-time, .newsletter-info {
                background-color: #f1f8ff !important;
                padding: 20px !important;
                border-radius: 8px !important;
                margin: 20px 0 !important;
            }
            .footer {
                background-color: #2c3e50 !important;
                color: white !important;
                padding: 30px 20px !important;
                text-align: center !important;
            }
            .footer-info {
                display: flex !important;
                align-items: start !important;
                flex-wrap: wrap !important;
                gap: 20px !important;
            }
            .footer-contact {
                display: flex !important;
                flex-direction: column !important;
                align-items: flex-start !important;
                text-align: left !important;
            }
            .footer-contact p {
                margin: 5px 0 !important;
                font-size: 14px !important;
            }
            .footer-social {
                text-align: right !important;
            }
            .unsubscribe-info {
                text-align: center !important;
                margin-top: 20px !important;
                padding-top: 15px !important;
                border-top: 1px solid #e9ecef !important;
                color: #666 !important;
            }
            @media (max-width: 600px) {
                .detail-grid {
                    grid-template-columns: 1fr !important;
                }
                .footer-info {
                    flex-direction: column !important;
                    text-align: center !important;
                }
                .footer-contact, .footer-social {
                    text-align: center !important;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="${guestHouseLogo}" alt="${guestHouseName}" />
                <h1>${guestHouseName}</h1>
            </div>
            
            <div class="content">
                ${content}
            </div>
            
            <div class="footer">
                <div class="footer-info">
                    <div class="footer-contact">
                        <p><strong>${guestHouseName}</strong></p>
                        <p>📧 ${guestHouseEmail}</p>
                        <p>📞 ${guestHousePhone}</p>
                        <p>📍 ${guestHouseAddress}</p>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
};
