# VocaLearn - Setup Guide

## Prerequisites

Before starting, ensure you have:
- Node.js 18+ installed
- MongoDB Atlas account (free tier)
- PhonePe Business account (for payments)
- Resend account (for emails - optional)
- Cloudinary account (for images - optional)

## Quick Setup

### 1. Clone and Install

```bash
cd vocalearn
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in the required values:

```env
# Database (Required)
MONGODB_URI=mongodb+srv://...

# Auth (Required)
NEXTAUTH_SECRET=your-32-char-secret
NEXTAUTH_URL=http://localhost:3000

# PhonePe (Required for payments)
PHONEPE_MERCHANT_ID=your_merchant_id
PHONEPE_SALT_KEY=your_salt_key
PHONEPE_SALT_INDEX=1

# Email (Optional - for confirmations)
RESEND_API_KEY=re_your_key

# Cloudinary (Optional - for images)
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

# Admin Account
ADMIN_EMAIL=admin@vocalearn.in
ADMIN_PASSWORD=your_secure_password
```

### 3. Seed Database

```bash
npm run seed
```

This creates:
- Admin account
- 8 sample courses

### 4. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## Admin Access

- URL: http://localhost:3000/admin/login
- Email: admin@vocalearn.in (or your custom ADMIN_EMAIL)
- Password: admin123 (or your custom ADMIN_PASSWORD)

## Service Setup Guides

### MongoDB Atlas (Required)

1. Go to https://www.mongodb.com/atlas
2. Create free M0 cluster
3. Click "Connect" → "Connect your application"
4. Copy connection string
5. Replace `<password>` with your database user password

### PhonePe (Required for payments)

1. Register at https://business.phonepe.com
2. Submit business documents (PAN, GST, bank account)
3. Wait 3-7 days for approval
4. Get credentials from dashboard:
   - Merchant ID
   - Salt Key
   - Salt Index

For testing, use PhonePe sandbox mode first.

### Resend (Optional - Email notifications)

1. Go to https://resend.com
2. Sign up (free: 3,000 emails/month)
3. Add domain or verify email
4. Create API key
5. Add to `.env.local`

### Cloudinary (Optional - Image uploads)

1. Go to https://cloudinary.com
2. Sign up (free: 25GB storage)
3. Copy credentials from Dashboard → Settings → API Keys
4. Add to `.env.local`

## Project Structure

```
src/
├── app/
│   ├── admin/          # Admin dashboard pages
│   ├── api/            # API routes
│   ├── courses/        # Course catalog pages
│   ├── enroll/         # Enrollment form
│   ├── payment/       # Payment success/failure pages
│   ├── about/         # About page
│   ├── contact/       # Contact page
│   └── privacy-policy/, terms-of-service/, refund-policy/
├── components/         # Reusable React components
├── lib/               # Utilities and helpers
├── models/            # Mongoose models
└── middleware.ts      # Auth middleware
```

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run seed     # Seed database with admin and courses
npm run lint     # Run ESLint
```

## Features Built

- Course catalog with filters and search
- Multi-step enrollment form with validation
- PhonePe payment integration
- Admin dashboard with stats
- Student management with search/filter/export
- Course management with CRUD
- Individual student detail page
- Email notifications via Resend
- Cloudinary image uploads
- SEO (sitemap, robots.txt, JSON-LD)
- Legal pages (Privacy, Terms, Refund)
- Sign out functionality

## Still Needed to Go Live

1. Set up MongoDB Atlas cluster
2. Register PhonePe merchant account
3. Configure environment variables on Vercel
4. Add domain and configure DNS
5. Test end-to-end payment flow
6. Add real course data

## Deployment

The app is optimized for Vercel:

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

Vercel Hobby Plan (free) supports this app perfectly.

## Support

For issues or questions, contact: support@vocalearn.in
