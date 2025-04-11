import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false 
  }
});




export const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: `" Jang Bazar Football Club <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html: `<p>${text.replace(/\n/g, '<br>')}</p>`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Full Error Details:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    return false;
  }
};