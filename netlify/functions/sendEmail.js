const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);
    const { name, email, date, subject } = data;

    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: "support@a-1masonry.llc", // your Zoho email
        pass: process.env.ZOHO_PASSWORD // stored in Netlify env vars
      }
    });

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f5f5f5;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;">
        <tr>
            <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; margin:20px 0; border-radius:6px; overflow:hidden;">
                <!-- Header -->
                <tr>
                <td style="background-color:#1d2434; padding:20px; text-align:center;">
                    <h1 style="color:#ffffff; margin:0; font-size:24px;">A-1 Masonry LLC</h1>
                    <p style="color:#f9c846; font-size:14px; margin:5px 0 0;">Your Appointment Request</p>
                </td>
                </tr>

                <!-- Main Content -->
                <tr>
                <td style="padding:30px; color:#333333;">
                    <h2 style="color:#1d2434; font-size:20px; margin-top:0;">Hi ${name},</h2>
                    <p style="font-size:16px; line-height:1.5;">
                    Thank you for booking with <strong>A-1 Masonry</strong>. We’ve received your appointment request and a team member will follow up with you shortly.
                    </p>
                    <ul style="font-size:16px; line-height:1.5; padding-left:20px;">
                    <li><strong>Date:</strong> ${date}</li>
                    <li><strong>Service/Notes:</strong> ${subject}</li>
                    </ul>
                    <p style="font-size:16px; line-height:1.5;">
                    If you need to make any changes, just reply to this email and we’ll take care of it.
                    </p>
                    <p style="font-size:16px; line-height:1.5;">
                    — The A-1 Masonry Team
                    </p>
                    <p style="text-align:center; margin:30px 0;">
                    <a href="https://www.a-1masonry.llc" style="background-color:#f9c846; color:#1d2434; padding:12px 24px; text-decoration:none; border-radius:4px; font-weight:bold;">Visit Our Website</a>
                    </p>
                </td>
                </tr>

                <!-- Footer -->
                <tr>
                <td style="background-color:#1d2434; padding:20px; text-align:center; color:#ffffff; font-size:14px;">
                    &copy; 2025 A-1 Masonry LLC · All rights reserved<br/>
                    <a href="mailto:support@a-1masonry.llc" style="color:#f9c846; text-decoration:none;">support@a-1masonry.llc</a> · 
                    <a href="https://www.a-1masonry.llc/privacy" style="color:#f9c846; text-decoration:none;">Privacy Policy</a>
                </td>
                </tr>
            </table>
            </td>
        </tr>
        </table>
    </body>
    </html>
    `;


    await transporter.sendMail({
      from: '"A-1 Masonry" <support@a-1masonry.llc>',
      to: email,
      subject: 'Appointment Confirmation – A-1 Masonry',
      html
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully." })
    };
  } catch (error) {
    console.error("Email send failed:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
