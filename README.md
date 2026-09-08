# Bhutan Travel Agency

A production-ready, SEO-focused travel website specializing in Bhutan tours for Indian travellers.

## Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, React Router, Lucide React  
**Backend:** Node.js, Express.js, MongoDB, JWT Authentication  
**Database:** MongoDB (Atlas compatible)

## Quick Start

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

```bash
# Install all dependencies
npm run install:all

# Or install separately
cd backend && npm install
cd ../frontend && npm install
```

### Environment Setup

```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env with your MongoDB URI and JWT secret

# Frontend
cp frontend/.env.example frontend/.env
```

### Database Setup

```bash
# Start MongoDB locally or use MongoDB Atlas connection string
# Seed the database with sample data
npm run seed
```

Default admin credentials after seeding:
- Email: `admin@bhutantravel.com`
- Password: `Admin@123`

### Development

```bash
# Run both frontend and backend
npm run dev

# Or run separately
npm run dev:backend   # Backend on port 5000
npm run dev:frontend  # Frontend on port 5173
```

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
bhutan-travel-agency/
├── backend/
│   ├── src/
│   │   ├── config/        # Database config
│   │   ├── controllers/   # Route handlers
│   │   ├── middleware/     # Auth, error handling
│   │   ├── models/        # Mongoose schemas
│   │   ├── routes/        # API routes
│   │   ├── seeds/         # Seed data
│   │   └── utils/         # Helpers
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   │   ├── admin/     # Admin dashboard pages
│   │   │   └── *.jsx      # Public pages
│   │   ├── services/      # API service layer
│   │   ├── context/       # React context
│   │   ├── hooks/         # Custom hooks
│   │   ├── utils/         # Utility functions
│   │   └── constants/     # App constants
│   └── package.json
├── package.json           # Root package.json
└── README.md
```

## API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/packages` | List all published packages |
| GET | `/api/packages/:slug` | Get package by slug |
| GET | `/api/destinations` | List all destinations |
| GET | `/api/destinations/:slug` | Get destination by slug |
| POST | `/api/enquiries` | Submit an enquiry |
| GET | `/api/reviews` | List approved reviews |
| POST | `/api/reviews` | Submit a review |
| GET | `/api/blog` | List blog posts |
| GET | `/api/blog/:slug` | Get blog post by slug |
| GET | `/api/faqs` | List FAQs |
| GET | `/api/settings` | Get site settings |

### Admin Endpoints (JWT Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login |
| GET | `/api/auth/me` | Get current user |
| POST | `/api/packages` | Create package |
| PUT | `/api/packages/:id` | Update package |
| DELETE | `/api/packages/:id` | Delete package |
| POST | `/api/destinations` | Create destination |
| PUT | `/api/destinations/:id` | Update destination |
| DELETE | `/api/destinations/:id` | Delete destination |
| GET | `/api/enquiries` | List all enquiries |
| PUT | `/api/enquiries/:id` | Update enquiry status |
| DELETE | `/api/enquiries/:id` | Delete enquiry |
| GET | `/api/reviews/all` | List all reviews |
| PUT | `/api/reviews/:id/approve` | Approve review |
| DELETE | `/api/reviews/:id` | Delete review |
| POST | `/api/blog` | Create blog post |
| PUT | `/api/blog/:id` | Update blog post |
| DELETE | `/api/blog/:id` | Delete blog post |
| PUT | `/api/settings` | Update settings |

## Features

### Public Website

- **Homepage** with hero, trip planner, packages, destinations, how it works
- **Package Listing** with filters (type, style, price)
- **Package Detail** with itinerary, inclusions, exclusions, FAQs, pricing
- **Custom Trip Builder** with comprehensive enquiry form
- **Destination Pages** with travel information
- **City Landing Pages** (Mumbai, Delhi, Kolkata, Bangalore, Hyderabad, Chennai)
- **Travel Guide** with blog articles
- **Reviews** section
- **Contact** page with enquiry form
- **WhatsApp** floating button
- **SEO** optimized (meta tags, OG, Twitter cards, schema markup)
- **Mobile-first** responsive design

### Admin Dashboard

- Dashboard with stats and recent enquiries
- Package management (CRUD)
- Destination management (CRUD)
- Blog post management (CRUD)
- Enquiry management with status tracking
- Review moderation
- Site settings

## Design

- **Colors:** Deep forest green, mountain green, warm off-white, charcoal, muted gold accent
- **Typography:** Clean sans-serif for body, elegant display font for headings
- **Components:** Rounded cards, subtle shadows, generous whitespace
- **Animations:** Subtle fade-in, slide-up, hover effects

## SEO

- Unique title and meta description per page
- Open Graph and Twitter Card metadata
- Semantic HTML structure
- Clean URL structure
- Internal linking
- Breadcrumbs
- Schema.org markup (TravelAgency, TouristTrip, FAQPage, BreadcrumbList)

## License

Private - All rights reserved.
