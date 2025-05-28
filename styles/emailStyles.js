export const emailStyles = `
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                margin: 0;
                padding: 0;
                background-color: #f8f9fa;
                color: #333;
                font-size: 16px;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                overflow: hidden;
            }
            .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px 20px;
                text-align: center;
            }
            .header img {
                max-width: 150px;
                height: auto;
                margin-bottom: 10px;
                display: block;
                margin-left: auto;
                margin-right: auto;
            }
            .header h1 {
                margin: 0;
                font-size: 30px;
                font-weight: 300;
                color: #ffffff;
            }
            .content {
                padding: 30px;
            }
            .booking-header, .alert-header, .inquiry-header, .newsletter-header {
                text-align: center;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 2px solid #e9ecef;
            }
            .booking-header h2, .alert-header h2, .inquiry-header h2, .newsletter-header h2 {
                color: #2c3e50;
                margin: 0 0 10px 0;
                font-size: 26px;
            }
            .booking-ref, .inquiry-time {
                background-color: #e8f4fd;
                padding: 10px 15px;
                border-radius: 5px;
                font-weight: bold;
                color: #1e88e5;
                display: inline-block;
                font-size: 16px;
            }
            .greeting h3 {
                color: #2c3e50;
                margin-bottom: 15px;
                font-size: 22px;
            }
            .greeting p {
                font-size: 17px;
            }
            .detail-grid {
                width: 100%;
                margin: 20px 0;
            }
            .detail-item {
                display: block;
                background-color: #f8f9fa;
                padding: 15px;
                border-radius: 8px;
                border-left: 4px solid #667eea;
                margin-bottom: 15px;
                width: 100%;
                box-sizing: border-box;
            }
            .detail-item .label {
                font-weight: bold;
                color: #666;
                font-size: 13px;
                text-transform: uppercase;
                margin-bottom: 5px;
                display: block;
            }
            .detail-item .value {
                font-size: 17px;
                color: #2c3e50;
                display: block;
            }
            .room-card {
                background-color: #f8f9fa;
                border-radius: 10px;
                padding: 20px;
                margin: 15px 0;
            }
            .room-card h5 {
                font-size: 20px;
                margin: 0 0 10px 0;
                color: #2c3e50;
            }
            .room-card p {
                font-size: 16px;
                margin: 10px 0;
            }
            .room-image {
                width: 100%;
                max-width: 100%;
                height: 200px;
                object-fit: cover;
                border-radius: 8px;
                margin-bottom: 15px;
                display: block;
            }
            .room-features {
                margin: 10px 0;
            }
            .room-features span {
                background-color: #e3f2fd;
                padding: 6px 12px;
                border-radius: 15px;
                font-size: 13px;
                color: #1565c0;
                display: inline-block;
                margin: 2px 5px 2px 0;
            }
            .amenities {
                margin: 15px 0;
                font-size: 16px;
            }
            .message-box, .request-box {
                background-color: #f8f9fa;
                padding: 20px;
                border-radius: 8px;
                border-left: 4px solid #28a745;
                margin: 15px 0;
            }
            .message-box p, .request-box p {
                font-size: 16px;
                margin: 0;
            }
            .message-box h4, .message-box h5 {
                font-size: 18px;
                margin: 0 0 10px 0;
                color: #2c3e50;
            }
            .status-pending {
                color: #ff9800;
                background-color: #fff3e0;
                padding: 4px 10px;
                border-radius: 12px;
                font-size: 13px;
                font-weight: bold;
            }
            .status-confirmed {
                color: #4caf50;
                background-color: #e8f5e8;
                padding: 4px 10px;
                border-radius: 12px;
                font-size: 13px;
                font-weight: bold;
            }
            .action-required {
                background-color: #fff8e1;
                padding: 20px;
                border-radius: 8px;
                border-left: 4px solid #ffa726;
                margin: 20px 0;
            }
            .action-required h3 {
                color: #ef6c00;
                margin-top: 0;
                font-size: 20px;
            }
            .action-required p {
                font-size: 16px;
            }
            .action-required ul {
                margin: 10px 0;
                padding-left: 20px;
            }
            .action-required li {
                font-size: 15px;
                margin: 5px 0;
            }
            .contact-info, .check-in-info, .response-time, .newsletter-info {
                background-color: #f1f8ff;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
            }
            .contact-info h4, .check-in-info h4, .response-time h4, .newsletter-info h4 {
                font-size: 20px;
                margin: 0 0 15px 0;
                color: #2c3e50;
            }
            .contact-info p, .check-in-info p, .response-time p, .newsletter-info p {
                font-size: 16px;
                margin: 8px 0;
            }
            .contact-info a {
                color: #1e88e5;
                text-decoration: none;
                font-size: 16px;
                display: block;
                margin: 8px 0;
            }
            .newsletter-info ul {
                margin: 10px 0;
                padding-left: 20px;
            }
            .newsletter-info li {
                font-size: 15px;
                margin: 5px 0;
            }
            .footer-message p {
                font-size: 17px;
                text-align: center;
                color: #2c3e50;
                font-weight: 500;
            }
            .footer {
                background-color: #2c3e50;
                color: white;
                padding: 30px 20px;
            }
            .footer-info {
                width: 100%;
            }
            .footer-contact {
                width: 100%;
                text-align: left;
            }
            .footer-contact p {
                margin: 8px 0;
                font-size: 15px;
                text-align: left;
            }
            .unsubscribe-info {
                text-align: center;
                margin-top: 20px;
                padding-top: 15px;
                border-top: 1px solid #e9ecef;
                color: #666;
            }
            .unsubscribe-info small {
                font-size: 13px;
            }
            
            /* Mobile Styles */
            @media only screen and (max-width: 600px) {
                .container {
                    margin: 10px;
                    border-radius: 5px;
                }
                .header {
                    padding: 20px 15px;
                }
                .header h1 {
                    font-size: 26px;
                }
                .content {
                    padding: 20px 15px;
                }
                .booking-header h2, .alert-header h2, .inquiry-header h2, .newsletter-header h2 {
                    font-size: 22px;
                }
                .greeting h3 {
                    font-size: 20px;
                }
                .detail-item {
                    padding: 12px;
                    margin-bottom: 12px;
                }
                .room-card {
                    padding: 15px;
                }
                .contact-info, .check-in-info, .response-time, .newsletter-info, .action-required, .message-box, .request-box {
                    padding: 15px;
                    margin: 15px 0;
                }
                .footer {
                    padding: 20px 15px;
                }
                .footer-contact p {
                    font-size: 14px;
                }
            }
            
            @media only screen and (max-width: 480px) {
                .container {
                    margin: 5px;
                }
                .content {
                    padding: 15px 10px;
                }
                .header {
                    padding: 15px 10px;
                }
                .contact-info, .check-in-info, .response-time, .newsletter-info, .action-required, .message-box, .request-box {
                    padding: 12px;
                }
                .footer {
                    padding: 15px 10px;
                }
            }
`;
