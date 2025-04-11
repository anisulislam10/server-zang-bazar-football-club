import Contact from '../models/contactForm.model.js';
import { sendEmail } from '../config/email.config.js';

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save to MongoDB
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // Send email
    const emailSubject = `New Contact Form Submission from ${name}`;
    const emailText = `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `;

    const emailSent = await sendEmail('umarscj@gmail.com', emailSubject, emailText);

    if (emailSent) {
      res.status(200).json({ success: true, message: 'Form submitted successfully' });
    } else {
      res.status(500).json({ success: false, message: 'Error sending email' });
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getContactFormCount = async (req, res) => {
    try {
      const count = await Contact.countDocuments();
      res.status(200).json({ success: true, totalContacts: count });
    } catch (error) {
      console.error("Error fetching contact count:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };