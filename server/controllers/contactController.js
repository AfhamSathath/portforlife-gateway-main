import Contact from '../models/Contact.js';
import nodemailer from 'nodemailer';

const sendNotificationEmail = async (name, email, subject, message) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('Warning: Email credentials are not configured in .env. Skipping email notification.');
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"PortforLife Contact form" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: `New Message from ${name}: ${subject}`,
    html: `
      <h2>New Message Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Admin notification email sent successfully.');
  } catch (error) {
    console.error('Error sending admin notification email:', error.message);
    // We don't re-throw here because we want the form submission to succeed in the database even if email fails
  }
};

export const submitContactForm = async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const contact = await Contact.create({ name, email, subject, message });

    // Send email to admin (runs in background, errors handled inside)
    sendNotificationEmail(name, email, subject, message);

    // Emit real-time notification to admins if connected via socket
    const io = req.app.get('io');
    if (io) {
      io.to('admin-room').emit('new-form-submission', contact);
    }

    res.status(201).json({ 
      success: true, 
      message: 'Message sent successfully. We will get back to you soon!',
      data: contact
    });
  } catch (error) {
    console.error('Error in submitContactForm:', error);
    res.status(500).json({ success: false, message: 'Server error during form submission.', error: error.message });
  }
};

export const getAllMessages = async (req, res) => {
  const messages = await Contact.find().sort('-createdAt');
  res.json(messages);
};

export const deleteMessage = async (req, res) => {
  const messageId = req.params.id;
  await Contact.findByIdAndDelete(messageId);
  res.json({ message: 'Message deleted successfully.' });
};
