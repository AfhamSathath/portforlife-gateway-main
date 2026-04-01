# PortforLife Gateway Backend

Robust backend for the PortforLife Gateway platform, built with Node.js, Express, MongoDB, and Socket.io.

## Features

- **Magic Link Authentication**: Seamless and secure login using magic links via email.
- **Real-Time Notifications**: Integrated Socket.io for instant updates during login and form submissions.
- **Contact Form Handling**: Robust API for receiving messages from the portfolio.
- **Email Service**: Automated notifications and magic links using Nodemailer.
- **JWT Protection**: Secure API routes for admins and authenticated users.

## Prerequisites

- Node.js (v16+)
- MongoDB (Running locally or via Atlas)
- Gmail account with an [App Password](https://myaccount.google.com/apppasswords)

## Quick Start

1. Install dependencies:
   ```bash
   cd server
   npm install
   ```

2. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your MongoDB URI, JWT Secret, and Email credentials.

3. Run the server:
   - Development mode (with nodemon): `npm run dev`
   - Production mode: `npm start`

## API endpoints

- `POST /api/auth/login`: Request a magic link.
- `GET /api/auth/verify?token=...`: Verify magic link and log in.
- `GET /api/auth/profile`: Get the logged-in user's profile.
- `POST /api/contact/`: Submit a contact form from the portfolio.
- `GET /api/contact/`: Get all messages (Admin Only).
- `DELETE /api/contact/:id`: Delete a message (Admin Only).

## Socket.io Events

- `magic-login-success`: Emitted when the user's magic link is verified.
- `new-form-submission`: Emitted to the `admin-room` when a new contact form is submitted.
