require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (email, subject, message) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      text: message,
    });
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
};

const sendContactEmails = async (firstName, email, message) => {
  try {
    // Admin notification email
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission from ${firstName}`,
      html: `
      <!DOCTYPE html>
      <html lang="en" style="padding: 0; margin: 0; box-sizing: border-box; font-family: 'Nunito', 'Segoe UI', 'Arial Rounded MT', 'Open Sans', 'Helvetica', 'Arial', sans-serif;">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
      </head>
      <body style="background-color: #f4f4f4; padding: 20px;">
          <table align="center" width="100%" style="max-width: 600px; background: #fff; border-radius: 8px; border: 1px solid #ddd; padding: 20px;">
              <tr>
                  <td align="center">
                      <h2 style="color: #333; margin: 0;">📧 New Contact Form Submission</h2>
                      <p style="color: #666; font-size: 14px;">Received: ${new Date().toLocaleString()}</p>
                  </td>
              </tr>
              <tr>
                  <td align="left" style="color: #555; font-size: 16px; padding: 20px 0;">
                      <p><strong>Name:</strong> ${firstName}</p>
                      <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #007bff;">${email}</a></p>
                      <p><strong>Message:</strong></p>
                      <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #007bff; margin: 10px 0; border-radius: 4px;">
                          ${message}
                      </div>
                  </td>
              </tr>
              <tr>
                  <td align="center" style="color: #555; font-size: 14px; padding-top: 20px;">
                      <p>Reply directly to this email to respond to ${firstName}.</p>
                      <p style="font-size: 12px; color: #888;">This message was sent from ${
                        process.env.COMPANY_NAME || "your website"
                      } contact form.</p>
                  </td>
              </tr>
          </table>
      </body>
      </html>
      `,
      replyTo: email,
    };

    // User confirmation email
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Thank you for contacting ${process.env.COMPANY_NAME || "us"}`,
      html: `
      <!DOCTYPE html>
      <html lang="en" style="padding: 0; margin: 0; box-sizing: border-box; font-family: 'Nunito', 'Segoe UI', 'Arial Rounded MT', 'Open Sans', 'Helvetica', 'Arial', sans-serif;">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You for Contacting Us</title>
      </head>
      <body style="background-color: #f4f4f4; padding: 20px;">
          <table align="center" width="100%" style="max-width: 600px; background: #fff; border-radius: 8px; border: 1px solid #ddd; padding: 20px;">
             
              <tr>
                  <td align="left" style="color: #555; font-size: 16px; padding: 20px 0;">
                      <p>We have received your message and truly appreciate you taking the time to reach out to us.</p>
                      
                      <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #28a745; margin: 15px 0; border-radius: 4px;">
                          <strong>Your Message:</strong><br>
                          ${message}
                      </div>
                      
                      <p>Our team will review your message and get back to you as soon as possible, typically within 24-48 hours.</p>
                      
                    
                  </td>
              </tr>
              <tr>
                  <td align="center" style="color: #555; font-size: 14px; padding-top: 20px;">
                      <p><strong>${
                        process.env.COMPANY_NAME || "Your Company Name"
                      }</strong></p>
                      <p style="font-size: 12px; color: #888;">If you have any urgent questions, please don't hesitate to contact us directly.</p>
                  </td>
              </tr>
          </table>
      </body>
      </html>
      `,
    };

    // Send both emails
    const [adminResult, userResult] = await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions),
    ]);

    console.log("✅ Emails sent successfully:");
    console.log(`   Admin notification: ${adminResult.messageId}`);
    console.log(`   User confirmation: ${userResult.messageId}`);

    return {
      success: true,
      adminMessageId: adminResult.messageId,
      userMessageId: userResult.messageId,
    };
  } catch (error) {
    console.error("Error sending emails:", error);
    return { success: false, error: error.message };
  }
};

module.exports = { sendEmail, sendContactEmails };
