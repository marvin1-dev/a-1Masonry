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
      <div style="font-family: Arial, sans-serif; padding: 20px; background: #fff; border-radius: 10px;">
        <h2 style="color: #C1582D;">Thank you for booking with A-1 Masonry</h2>
        <p>Hi ${name},</p>
        <p>We’ve received your appointment request and will follow up shortly.</p>
        <ul>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Service/Notes:</strong> ${subject}</li>
        </ul>
        <p>You can reply to this email if you need to make any changes.</p>
        <p>— The A-1 Masonry Team</p>
      </div>
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
