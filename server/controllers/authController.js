import User from '../models/User.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { sendMagicLinkEmail } from '../services/emailService.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '30d',
  });
};

export const loginWithMagicLink = async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      // Create user if they don't exist
      const role = email === 'dddummy296@gmail.com' ? 'admin' : 'user';
      user = await User.create({ email, name: email.split('@')[0], role });
    } else if (email === 'dddummy296@gmail.com' && user.role !== 'admin') {
      // Ensure the email always has admin role
      user.role = 'admin';
    }

    const token = crypto.randomBytes(32).toString('hex');
    user.magicLinkToken = token;
    user.magicLinkExpires = Date.now() + 15 * 60 * 1000; // 15 mins
    await user.save();

    await sendMagicLinkEmail(email, token);

    res.json({ success: true, message: 'Success! Please check your email for the magic link.' });
  } catch (error) {
    console.error('Error in loginWithMagicLink:', error);
    res.status(500).json({ success: false, message: 'Server error during magic link login.', error: error.message });
  }
};

export const verifyMagicLink = async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOne({
      magicLinkToken: token,
      magicLinkExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired magic link.' });
    }

    const io = req.app.get('io');
    const userJwt = generateToken(user._id);

    // Emit real-time login event for the UI to react instantly
    io.to(user.email).emit('magic-login-success', {
      token: userJwt,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });

    // Clear the token so it can't be reused
    user.magicLinkToken = undefined;
    user.magicLinkExpires = undefined;
    await user.save();

    res.json({
      success: true,
      message: 'Login successful. You can now close this tab.',
      token: userJwt,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    console.error('Error in verifyMagicLink:', error);
    res.status(500).json({ success: false, message: 'Server error during magic link verification.', error: error.message });
  }
};

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-magicLinkToken -magicLinkExpires');
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};
