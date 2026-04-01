import nodemailer from 'nodemailer';

const sendMagicLinkEmail = async (email, token) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('Warning: Email credentials are not configured in .env. Magic link will be logged to console instead.');
    console.log(`MAGIC LINK FOR ${email}: ${process.env.CLIENT_URL || 'http://localhost:5173'}/auth/verify?token=${token}`);
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
    from: `"PortforLife Support" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'PortforLife: Your Magic Log-In Link',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #6366f1; text-align: center;">PortforLife Magic Login</h2>
        <p>Hello there,</p>
        <p>To access your account, simply click the button below. This link is valid for 15 minutes.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/auth/verify?token=${token}" 
             style="background-color: #6366f1; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Log In Now
          </a>
        </div>
        <p>If you did not request this email, please ignore it.</p>
        <p style="color: #888; font-size: 0.8em; margin-top: 40px; text-align: center;">
          &copy; 2026 PortforLife Gateway. All rights reserved.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Magic link email sent successfully to', email);
  } catch (error) {
    console.error('Error sending magic link email:', error.message);
    // In development, we still want to see the link if email fails
    console.log(`MAGIC LINK FOR ${email}: ${process.env.CLIENT_URL || 'http://localhost:5173'}/auth/verify?token=${token}`);
  }
};

export { sendMagicLinkEmail };
