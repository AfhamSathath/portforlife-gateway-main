import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';

// Load env vars
dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:8080',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:8080',
  credentials: true,
}));
app.use(helmet());
app.use(morgan('dev'));

// Socket.io injection
app.set('io', io);

// Basic Route
app.get('/', (req, res) => {
  res.json({ message: 'PortforLife Gateway API is running...' });
});

// Routes Import
import authRoutes from './routes/authRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/projects', projectRoutes);

// Error Middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  console.error(`ERROR ${statusCode} on ${req.method} ${req.url}:`, err.message);
  if (err.stack) console.error(err.stack);

  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Socket connection
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`User joined: ${userId}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
if (!process.env.VERCEL) {
  httpServer.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
}

export default app;
