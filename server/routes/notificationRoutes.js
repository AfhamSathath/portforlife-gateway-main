import express from 'express';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/unread-count', protect, adminOnly, async (req, res) => {
  // Placeholder for real notification count logic
  res.json({ unread: 5 });
});

export default router;
