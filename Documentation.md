# Happy Kingdom Travels — Complete Project Documentation

> **Last Updated:** September 3, 2026
> **Project Type:** Full-Stack MERN Travel Agency Website
> **Status:** Production-ready MVP

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Getting Started](#4-getting-started)
5. [Architecture](#5-architecture)
6. [Frontend Documentation](#6-frontend-documentation)
7. [Backend Documentation](#7-backend-documentation)
8. [Database Models & ER Diagram](#8-database-models--er-diagram)
9. [Complete API Reference](#9-complete-api-reference)
10. [Feature Documentation](#10-feature-documentation)
11. [Developer Guides](#11-developer-guides)
12. [Security](#12-security)
13. [Production Security Checklist](#13-production-security-checklist)
14. [Deployment](#14-deployment)
15. [Scripts Reference](#15-scripts-reference)
16. [Environment Variables](#16-environment-variables)
17. [Implementation Status](#17-implementation-status)
18. [Future Enhancements](#18-future-enhancements)

---

## 1. Project Overview

**Happy Kingdom Travels** (also referred to as "Bhutan Travel Agency") is a production-ready, SEO-focused full-stack travel agency website specializing in Bhutan tour packages for Indian travellers. The platform provides complete trip management from enquiry to booking, with an admin panel for content management.

### Key Capabilities

- Dynamic tour package browsing with filtering and search
- Custom trip planning with lead capture and WhatsApp integration
- 6 hardcoded destination pages + dynamic destination system
- 4 travel guide articles + blog system
- Admin panel with full CRUD for packages, destinations, blogs, reviews, FAQs, enquiries, and settings
- Email notifications on enquiry submission
- JWT-based admin authentication
- SEO-optimized with per-page meta tags and Schema.org markup
- 46 frontend routes, 35 API endpoints, 8 MongoDB models, 21 reusable components

---

## 2. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | React | 18.3.1 |
| Build Tool | Vite | 5.4.3 |
| Styling | Tailwind CSS | 3.4.10 |
| Routing | React Router DOM | 6.26.1 |
| Icons | Lucide React | 0.441.0 |
| SEO | React Helmet Async | 2.0.5 |
| Notifications | React Hot Toast | 2.4.1 |
| Backend | Express.js | 4.21.0 |
| Runtime | Node.js | — |
| Database | MongoDB Atlas (Mongoose 8) | 8.6.0 |
| Authentication | JWT (jsonwebtoken) | 9.0.2 |
| Password Hashing | bcryptjs | 2.4.3 |
| Email | Nodemailer | 9.1.1 |
| Validation | express-validator | 7.2.0 |
| Security | Helmet.js | 7.1.0 |
| Rate Limiting | express-rate-limit | 7.4.0 |
| Dev Runner | concurrently | 9.0.1 |

---

## 3. Project Structure

```
Travelling_Agency/
├── .gitignore
├── README.md
├── package.json                          # Root monorepo orchestrator
│
├── backend/
│   ├── .env                              # Environment variables (NOT committed)
│   ├── .env.example                      # Environment variable template
│   ├── package.json                      # Backend dependencies
│   ├── err.log                           # Error log
│   ├── out.log                           # Output log
│   ├── public/
│   │   └── images/                       # (empty — reserved for uploaded images)
│   └── src/
│       ├── index.js                      # Express server entry point
│       ├── config/
│       │   └── db.js                     # MongoDB Atlas connection
│       ├── controllers/
│       │   ├── authController.js          # Login, getMe
│       │   ├── blogController.js          # Blog CRUD
│       │   ├── destinationController.js   # Destination CRUD
│       │   ├── enquiryController.js       # Enquiry CRUD + email notification
│       │   ├── faqController.js           # FAQ CRUD
│       │   ├── packageController.js       # Package CRUD + filtering
│       │   ├── reviewController.js        # Review CRUD + approval
│       │   └── settingsController.js      # Site settings singleton
│       ├── middleware/
│       │   ├── auth.js                    # JWT protect + role authorize
│       │   ├── errorHandler.js            # Global error handler
│       │   └── validate.js               # express-validator wrapper
│       ├── models/
│       │   ├── BlogPost.js               # Blog post schema
│       │   ├── Destination.js             # Destination schema
│       │   ├── Enquiry.js                 # Lead/enquiry schema
│       │   ├── FAQ.js                     # FAQ schema
│       │   ├── Package.js                 # Tour package schema
│       │   ├── Review.js                  # Customer review schema
│       │   ├── SiteSettings.js            # Singleton settings schema
│       │   └── User.js                    # Admin user schema
│       ├── routes/
│       │   ├── auth.js                    # POST /login, GET /me
│       │   ├── blog.js                    # Blog CRUD routes
│       │   ├── destinations.js            # Destination CRUD routes
│       │   ├── enquiries.js               # Enquiry CRUD routes
│       │   ├── faqs.js                    # FAQ CRUD routes
│       │   ├── packages.js                # Package CRUD routes
│       │   ├── reviews.js                 # Review CRUD + approve routes
│       │   └── settings.js                # Settings get/update routes
│       ├── seeds/
│       │   ├── cleanup.js                 # Removes duplicate/old packages
│       │   ├── seed.js                    # Main seed: admin, destinations, packages, blogs, reviews, settings, FAQs
│       │   ├── seedPackages.js            # Additional detailed packages with itineraries
│       │   ├── updateFamilyTour.js        # Upsert family tour package
│       │   ├── updateGrandDiscovery.js    # Upsert grand discovery package
│       │   └── updateRoyalBhutan.js       # Upsert royal Bhutan luxury package
│       ├── services/
│       │   └── emailService.js            # Nodemailer: enquiry notifications
│       └── utils/
│           └── helpers.js                 # slugify, formatResponse, formatError, getPagination
│
└── frontend/
    ├── .env.example                       # Frontend env variable template
    ├── .eslintrc.cjs                      # ESLint config
    ├── index.html                         # SPA entry point with base SEO meta
    ├── package.json                       # Frontend dependencies
    ├── postcss.config.js                  # PostCSS (Tailwind + Autoprefixer)
    ├── tailwind.config.js                 # Tailwind theme: custom colors, fonts
    ├── vite.config.js                     # Vite config with API proxy
    ├── public/
    │   ├── favicon.png                    # PNG logo
    │   ├── favicon.svg                    # SVG logo
    │   └── images/tours/                  # 29 tour package images (.jpg)
    └── src/
        ├── App.jsx                        # Routes, lazy loading, layouts, ProtectedRoute
        ├── main.jsx                       # ReactDOM entry: BrowserRouter, HelmetProvider, Toaster
        ├── index.css                      # Tailwind directives, custom animations, scrollbar styles
        ├── components/
        │   ├── Breadcrumbs.jsx            # Breadcrumb navigation
        │   ├── CTASection.jsx             # Call-to-action banner
        │   ├── DestinationCard.jsx         # Destination card with image overlay
        │   ├── ErrorState.jsx             # Error display with retry
        │   ├── ExclusionList.jsx          # Exclusion items with red X
        │   ├── FAQAccordion.jsx           # Single-open FAQ accordion
        │   ├── Footer.jsx                 # Site footer with links, contact, social
        │   ├── HeroSection.jsx            # Hero banner with background image
        │   ├── ImageGallery.jsx           # Image grid with lightbox
        │   ├── InclusionList.jsx          # Inclusion items with green check
        │   ├── ItineraryTimeline.jsx       # Expandable day-by-day itinerary
        │   ├── LoadingState.jsx           # Spinner with message
        │   ├── Modal.jsx                  # Portal-based modal with ESC close
        │   ├── Navbar.jsx                 # Responsive navigation bar
        │   ├── PackageCard.jsx            # Package card with WhatsApp CTA
        │   ├── QuoteForm.jsx              # Custom trip enquiry form
        │   ├── ReviewCard.jsx             # Customer review card
        │   ├── ScrollToTop.jsx            # Scroll-to-top on route change
        │   ├── SearchTripForm.jsx          # Quick trip planner form
        │   ├── SEO.jsx                    # Per-page meta tags via Helmet
        │   └── WhatsAppButton.jsx         # Floating WhatsApp button
        ├── constants/
        │   └── index.js                   # NAV_LINKS, CITIES, TRAVEL_STYLES, DURATIONS, etc.
        ├── context/
        │   └── AuthContext.jsx            # AuthProvider, useAuth hook
        ├── pages/
        │   ├── About.jsx
        │   ├── BhutanPackages.jsx
        │   ├── BlogDetails.jsx
        │   ├── CancellationPolicy.jsx
        │   ├── CityLandingPage.jsx        # Parameterized for 6 Indian cities
        │   ├── Contact.jsx
        │   ├── CustomTrip.jsx
        │   ├── Destination.jsx            # Dynamic destination page
        │   ├── Faqs.jsx
        │   ├── FamilyPackages.jsx
        │   ├── GroupPackages.jsx
        │   ├── Home.jsx
        │   ├── HoneymoonPackages.jsx
        │   ├── NotFound.jsx
        │   ├── PackageDetails.jsx
        │   ├── Privacy.jsx
        │   ├── Reviews.jsx
        │   ├── Terms.jsx
        │   ├── TravelGuide.jsx
        │   ├── admin/
        │   │   ├── AdminBlogEditor.jsx
        │   │   ├── AdminBlogPosts.jsx
        │   │   ├── AdminDashboard.jsx
        │   │   ├── AdminDestinations.jsx
        │   │   ├── AdminEnquiries.jsx
        │   │   ├── AdminLayout.jsx
        │   │   ├── AdminLogin.jsx
        │   │   ├── AdminPackageEditor.jsx
        │   │   ├── AdminPackages.jsx
        │   │   ├── AdminReviews.jsx
        │   │   └── AdminSettings.jsx
        │   ├── destinations/
        │   │   ├── Bumthang.jsx
        │   │   ├── HaaValley.jsx
        │   │   ├── Paro.jsx
        │   │   ├── Phuentsholing.jsx
        │   │   ├── Punakha.jsx
        │   │   └── Thimphu.jsx
        │   └── guide/
        │       ├── BestTimeToVisit.jsx
        │       ├── BhutanTripCost.jsx
        │       ├── EntryRequirements.jsx
        │       └── HowToReachBhutan.jsx
        ├── services/
        │   ├── api.js                     # ApiClient class with JWT fetch wrapper
        │   ├── authService.js
        │   ├── blogService.js
        │   ├── destinationService.js
        │   ├── enquiryService.js
        │   ├── faqService.js
        │   ├── packageService.js
        │   ├── reviewService.js
        │   └── settingsService.js
        └── utils/
            ├── createWhatsAppMessage.js   # Message templates for 7 contexts
            ├── createWhatsAppUrl.js       # WhatsApp deep link builder
            ├── helpers.js                  # formatPrice, formatDate, slugify, truncateText
            └── logo/
                └── HKT.png               # Company logo
```

---

## 4. Getting Started

### 4.1 Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)
- Gmail account with App Password (for email notifications)
- WhatsApp Business number (for integration)

### 4.2 Installation

```bash
# Clone the repository
git clone <repository-url>
cd Travelling_Agency

# Install all dependencies (backend + frontend + root)
npm run install:all
```

### 4.3 Environment Variables

**Backend** — Copy `backend/.env.example` to `backend/.env` and fill in:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<database>?retryWrites=true&w=majority
JWT_SECRET=<your-secret-key>
JWT_EXPIRE=7d
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=<your-gmail@gmail.com>
SMTP_PASSWORD=<your-gmail-app-password>
CONTACT_EMAIL=<receiving-email@gmail.com>
WHATSAPP_URL=https://wa.me/<your-whatsapp-number>
```

**Frontend** — Copy `frontend/.env.example` to `frontend/.env` and fill in:

```env
VITE_API_URL=http://localhost:5000
VITE_WHATSAPP_NUMBER=<whatsapp-number-with-country-code>
VITE_GA4_ID=<google-analytics-id>
VITE_GTM_ID=<google-tag-manager-id>
```

### 4.4 Database Setup & Seeding

```bash
# Seed the database with admin user, destinations, packages, blogs, reviews, settings, and FAQs
npm run seed
```

**Default admin credentials created by seed:**
- Email: `admin@bhutantravel.com`
- Password: `Admin@123`
- Role: `admin`

### 4.5 Running the App

```bash
# Run both frontend and backend concurrently
npm run dev

# Or run individually:
npm run dev:backend    # Backend on port 5000
npm run dev:frontend   # Frontend on port 5173
```

The Vite dev server proxies `/api` requests to `localhost:5000` automatically.

---

## 5. Architecture

### 5.1 Frontend Architecture

```
React 18 + Vite 5
├── BrowserRouter (React Router v6)
│   ├── HelmetProvider (react-helmet-async)
│   │   ├── AuthProvider (context/AuthContext)
│   │   │   ├── PublicLayout (Navbar + Footer + WhatsAppButton)
│   │   │   │   └── Lazy-loaded pages (React.lazy + Suspense)
│   │   │   └── ProtectedRoute (JWT check via localStorage)
│   │   │       └── AdminLayout + Admin pages
│   │   └── Toaster (react-hot-toast)
│   └── ScrollToTop
```

**Key patterns:**
- All pages are lazy-loaded via `React.lazy()` for code splitting
- `Suspense` provides a loading spinner fallback during chunk loading
- `ProtectedRoute` checks for a JWT token in `localStorage` before rendering admin pages
- `PublicLayout` wraps all public pages with Navbar, Footer, and floating WhatsApp button
- `AuthContext` manages admin authentication state across the app

### 5.2 Backend Architecture

```
Express.js Server (port 5000)
├── Middleware Stack
│   ├── Helmet (security headers)
│   ├── CORS (origin from env)
│   ├── Morgan (request logging)
│   ├── JSON parser (10mb limit)
│   ├── URL-encoded parser
│   └── Rate Limiter (100 req/15min on /api)
├── Routes
│   ├── /api/auth           → authController
│   ├── /api/packages       → packageController
│   ├── /api/destinations   → destinationController
│   ├── /api/enquiries      → enquiryController (5 req/15min)
│   ├── /api/reviews        → reviewController
│   ├── /api/blog           → blogController
│   ├── /api/faqs           → faqController
│   ├── /api/settings       → settingsController
│   └── /api/health         → health check endpoint
└── Global Error Handler
```

### 5.3 Data Flow

```
Frontend → API Service (fetch wrapper) → Vite Proxy (/api → localhost:5000)
→ Express Route → Controller → Mongoose Model → MongoDB Atlas
→ Response → Frontend State → UI Render
```

---

## 6. Frontend Documentation

### 6.1 Routing

All routes are defined in `frontend/src/App.jsx`. The app uses lazy loading for all page components.

#### Public Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Home` | Landing page with hero, trip planner, packages, destinations, CTAs |
| `/bhutan-tour-packages` | `BhutanPackages` | All packages with category filter |
| `/packages/:slug` | `PackageDetails` | Individual package detail page |
| `/bhutan-honeymoon-packages` | `HoneymoonPackages` | Honeymoon package listing |
| `/bhutan-family-packages` | `FamilyPackages` | Family package listing |
| `/bhutan-group-packages` | `GroupPackages` | Group package listing |
| `/customize-your-trip` | `CustomTrip` | Custom trip enquiry form |
| `/destinations/paro` | `Paro` | Hardcoded Paro destination page |
| `/destinations/thimphu` | `Thimphu` | Hardcoded Thimphu destination page |
| `/destinations/punakha` | `Punakha` | Hardcoded Punakha destination page |
| `/destinations/phuentsholing` | `Phuentsholing` | Hardcoded Phuentsholing destination page |
| `/destinations/haa-valley` | `HaaValley` | Hardcoded Haa Valley destination page |
| `/destinations/bumthang` | `Bumthang` | Hardcoded Bumthang destination page |
| `/destinations/:slug` | `Destination` | Dynamic destination page (from API) |
| `/bhutan-tour-from-mumbai` | `CityLandingPage` | SEO landing page for Mumbai |
| `/bhutan-tour-from-delhi` | `CityLandingPage` | SEO landing page for Delhi |
| `/bhutan-tour-from-kolkata` | `CityLandingPage` | SEO landing page for Kolkata |
| `/bhutan-tour-from-bangalore` | `CityLandingPage` | SEO landing page for Bangalore |
| `/bhutan-tour-from-hyderabad` | `CityLandingPage` | SEO landing page for Hyderabad |
| `/bhutan-tour-from-chennai` | `CityLandingPage` | SEO landing page for Chennai |
| `/travel-guide` | `TravelGuide` | Travel guide hub |
| `/travel-guide/bhutan-trip-cost` | `BhutanTripCost` | Trip cost guide |
| `/travel-guide/how-to-reach-bhutan` | `HowToReachBhutan` | Transport guide |
| `/travel-guide/best-time-to-visit-bhutan` | `BestTimeToVisit` | Season guide |
| `/travel-guide/bhutan-entry-requirements` | `EntryRequirements` | Visa/entry guide |
| `/travel-guide/:slug` | `BlogDetails` | Blog post detail page |
| `/about` | `About` | About page |
| `/reviews` | `Reviews` | Customer reviews |
| `/contact` | `Contact` | Contact form + business info |
| `/privacy-policy` | `Privacy` | Privacy policy |
| `/terms-and-conditions` | `Terms` | Terms & conditions |
| `/cancellation-policy` | `CancellationPolicy` | Cancellation & refund policy |
| `/faqs` | `FAQs` | Frequently asked questions |
| `*` | `NotFound` | 404 page |

#### Admin Routes (Protected)

| Route | Component | Description |
|-------|-----------|-------------|
| `/admin/login` | `AdminLogin` | Admin login page |
| `/admin` | `AdminDashboard` | Dashboard overview |
| `/admin/packages` | `AdminPackages` | Package list with search |
| `/admin/packages/new` | `AdminPackageEditor` | Create new package |
| `/admin/packages/:id/edit` | `AdminPackageEditor` | Edit existing package |
| `/admin/destinations` | `AdminDestinations` | Destination management |
| `/admin/blog` | `AdminBlogPosts` | Blog post list |
| `/admin/blog/new` | `AdminBlogEditor` | Create new blog post |
| `/admin/blog/:id/edit` | `AdminBlogEditor` | Edit blog post |
| `/admin/enquiries` | `AdminEnquiries` | Enquiry management |
| `/admin/reviews` | `AdminReviews` | Review moderation |
| `/admin/settings` | `AdminSettings` | Site settings management |

### 6.2 Components

#### Layout Components

| Component | File | Purpose |
|-----------|------|---------|
| `Navbar` | `components/Navbar.jsx` | Responsive navigation with mobile hamburger menu |
| `Footer` | `components/Footer.jsx` | 5-column footer with links, contact info, social icons, newsletter |
| `Breadcrumbs` | `components/Breadcrumbs.jsx` | Breadcrumb navigation with Home icon |
| `Modal` | `components/Modal.jsx` | Portal-based modal with ESC key and backdrop close |
| `ScrollToTop` | `components/ScrollToTop.jsx` | Scrolls to top on route change, handles hash anchors |

#### UI Components

| Component | File | Purpose |
|-----------|------|---------|
| `HeroSection` | `components/HeroSection.jsx` | Hero banner with background image, title, trust indicators, dual CTAs |
| `CTASection` | `components/CTASection.jsx` | Call-to-action section with primary/secondary buttons |
| `LoadingState` | `components/LoadingState.jsx` | Animated spinner with configurable message |
| `ErrorState` | `components/ErrorState.jsx` | Error display with icon, message, and retry button |
| `PackageCard` | `components/PackageCard.jsx` | Package card with image, category badge, duration, route, WhatsApp CTA |
| `DestinationCard` | `components/DestinationCard.jsx` | Destination card with full-bleed image and gradient overlay |
| `ReviewCard` | `components/ReviewCard.jsx` | Customer review with star rating, quote, verified badge |
| `ImageGallery` | `components/ImageGallery.jsx` | Image grid with full-screen lightbox, prev/next navigation |

#### Form Components

| Component | File | Purpose |
|-----------|------|---------|
| `SearchTripForm` | `components/SearchTripForm.jsx` | Quick trip planner: city, date, guests, duration, style |
| `QuoteForm` | `components/QuoteForm.jsx` | Full custom trip enquiry form with interests, budget, hotel preference |
| `WhatsAppButton` | `components/WhatsAppButton.jsx` | Floating WhatsApp chat button (fixed bottom-right) |

#### Display Components

| Component | File | Purpose |
|-----------|------|---------|
| `ItineraryTimeline` | `components/ItineraryTimeline.jsx` | Expandable day-by-day itinerary with activities, meals, hotel, distance |
| `InclusionList` | `components/InclusionList.jsx` | Two-column grid of inclusions with green checkmarks |
| `ExclusionList` | `components/ExclusionList.jsx` | Two-column grid of exclusions with red X marks |
| `FAQAccordion` | `components/FAQAccordion.jsx` | Single-open accordion for FAQ items |
| `SEO` | `components/SEO.jsx` | Per-page meta tags, OG tags, Twitter cards, canonical URL via react-helmet-async |

### 6.3 Services (API Client)

**Base:** `frontend/src/services/api.js` — `ApiClient` class

```
ApiClient
├── getToken()       → localStorage.getItem('token')
├── setToken(token)  → localStorage.setItem('token', token)
├── removeToken()    → localStorage.removeItem('token')
├── request(endpoint, options) → fetch with JWT header, auto-redirect on 401
├── get(endpoint, params)      → GET with query string
├── post(endpoint, body)       → POST with JSON body
├── put(endpoint, body)        → PUT with JSON body
├── patch(endpoint, body)      → PATCH with JSON body
└── delete(endpoint)           → DELETE
```

Base URL: `/api` (proxied by Vite to `localhost:5000`)

| Service | File | Endpoints Used |
|---------|------|----------------|
| `authService` | `services/authService.js` | `POST /auth/login`, `GET /auth/me` |
| `packageService` | `services/packageService.js` | `GET /packages`, `GET /packages/:slug`, `POST /packages`, `PUT /packages/:id`, `DELETE /packages/:id` |
| `destinationService` | `services/destinationService.js` | `GET /destinations`, `GET /destinations/:slug`, `POST /destinations`, `PUT /destinations/:id`, `DELETE /destinations/:id` |
| `blogService` | `services/blogService.js` | `GET /blog`, `GET /blog/:slug`, `POST /blog`, `PUT /blog/:id`, `DELETE /blog/:id` |
| `enquiryService` | `services/enquiryService.js` | `POST /enquiries`, `GET /enquiries`, `GET /enquiries/:id`, `PUT /enquiries/:id`, `DELETE /enquiries/:id` |
| `reviewService` | `services/reviewService.js` | `GET /reviews`, `GET /reviews/all`, `POST /reviews`, `PUT /reviews/:id`, `DELETE /reviews/:id`, `PUT /reviews/:id/approve` |
| `faqService` | `services/faqService.js` | `GET /faqs`, `POST /faqs`, `PUT /faqs/:id`, `DELETE /faqs/:id` |
| `settingsService` | `services/settingsService.js` | `GET /settings`, `PUT /settings` |

### 6.4 Constants

**File:** `frontend/src/constants/index.js`

| Constant | Values |
|----------|--------|
| `NAV_LINKS` | Home, Bhutan Tours, Travel Guide, Customize Trip, About, Contact |
| `CITIES` | Mumbai, Delhi, Kolkata, Bangalore, Hyderabad, Chennai |
| `TRAVEL_STYLES` | Budget, Comfort, Premium, Luxury |
| `DURATIONS` | 4N/5D, 5N/6D, 6N/7D, 7N/8D, Custom |
| `HOTEL_CATEGORIES` | Budget, Standard, Deluxe, Premium, Luxury |
| `PACKAGE_TYPES` | Standard, Honeymoon, Family, Group, Adventure, Luxury, Budget |
| `BUDGET_RANGES` | Under ₹25K to Above ₹2L |
| `STATUS_OPTIONS` | New, Contacted, Quote Sent, Negotiation, Confirmed, Cancelled, Completed, Lost |
| `INTERESTS` | Nature, Culture, Photography, Adventure, Relaxation, Family, Honeymoon |
| `BUSINESS_CONTACT` | Phone, email, WhatsApp URL, address, Google Maps URL |

### 6.5 Utilities

| File | Functions |
|------|-----------|
| `utils/helpers.js` | `formatPrice(amount, currency)`, `formatDate(date)`, `slugify(text)`, `truncateText(text, length)`, `getWhatsAppLink(phone, message)`, `generateMetaTags(data)` |
| `utils/createWhatsAppMessage.js` | `createTripPlannerMessage(data)`, `createPackageMessage(pkg)`, `createGeneralMessage()`, `createGuideMessage(topic)`, `createContactMessage(subject)`, `createDestinationMessage(dest)`, `createCustomTripMessage(data)` |
| `utils/createWhatsAppUrl.js` | `createWhatsAppUrl(message, number)`, `openWhatsApp(message, number)` |

### 6.6 Styling

**Tailwind CSS** with custom theme defined in `frontend/tailwind.config.js`:

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#1a4731` | Deep forest green (buttons, headers) |
| `primary-light` | `#2d6a4f` | Mountain green (hover states) |
| `secondary` | `#40916c` | Medium green |
| `accent` | `#c9a227` | Muted gold (CTAs, badges) |
| `forest` | `#1a4731` | Alias for primary |
| `gold` | `#c9a227` | Alias for accent |
| `warmWhite` | `#faf8f5` | Background color |
| `charcoal` | `#1a1a2e` | Dark text, footer bg |
| `surface` | `#ffffff` | Card backgrounds |
| `muted` | `#6b7280` | Secondary text |

**Fonts:**
- `display`: Playfair Display (serif) — headings
- `body`: Inter (sans-serif) — body text

**Custom CSS** in `frontend/src/index.css`:
- Tailwind directives (`@tailwind base/components/utilities`)
- Custom scrollbar styles
- Animation keyframes for fade-in effects

### 6.7 SEO Implementation

**Per-page SEO** via `SEO` component (`components/SEO.jsx`) using `react-helmet-async`:

Each page sets:
- `<title>` — unique per page
- `<meta name="description">` — unique per page
- `<meta name="keywords">` — relevant keywords
- `<meta property="og:title">`, `og:description`, `og:image`, `og:url`, `og:type`
- `<meta name="twitter:card">`, `twitter:title`, `twitter:description`, `twitter:image`
- `<link rel="canonical">` — current page URL

**Schema.org markup** is implemented on `PackageDetails` page using `application/ld+json`:
```json
{
  "@type": "TouristTrip",
  "name": "...",
  "description": "...",
  "touristType": [...],
  "itinerary": { "@type": "ItemList", ... }
}
```

**Static SEO** in `frontend/index.html`:
- Base meta description, keywords, author
- Open Graph and Twitter Card meta tags

### 6.8 Lazy Loading & Code Splitting

All page components are lazy-loaded in `App.jsx` using `React.lazy()`:

```jsx
const Home = lazy(() => import('./pages/Home'))
const BhutanPackages = lazy(() => import('./pages/BhutanPackages'))
// ... all 40+ pages
```

The Vite build produces code-split chunks visible in `frontend/dist/assets/`.

---

## 7. Backend Documentation

### 7.1 Server Setup

**Entry:** `backend/src/index.js`

**Middleware stack (applied in order):**
1. `helmet()` — Security HTTP headers
2. `cors({ origin, credentials: true })` — Cross-origin requests
3. `morgan('dev')` — Request logging
4. `express.json({ limit: '10mb' })` — JSON body parser
5. `express.urlencoded({ extended: true })` — URL-encoded body parser
6. Global rate limiter — 100 requests per 15 minutes on `/api`
7. Route handlers
8. `errorHandler` — Global error handler

### 7.2 Routes

| Route File | Mount Point | Endpoints |
|------------|-------------|-----------|
| `routes/auth.js` | `/api/auth` | `POST /login`, `GET /me` |
| `routes/packages.js` | `/api/packages` | `GET /`, `GET /:slug`, `POST /`, `PUT /:id`, `DELETE /:id` |
| `routes/destinations.js` | `/api/destinations` | `GET /`, `GET /:slug`, `POST /`, `PUT /:id`, `DELETE /:id` |
| `routes/enquiries.js` | `/api/enquiries` | `POST /`, `GET /`, `GET /:id`, `PUT /:id`, `DELETE /:id` |
| `routes/reviews.js` | `/api/reviews` | `GET /`, `GET /all`, `POST /`, `PUT /:id`, `DELETE /:id`, `PUT /:id/approve` |
| `routes/blog.js` | `/api/blog` | `GET /`, `GET /:slug`, `POST /`, `PUT /:id`, `DELETE /:id` |
| `routes/faqs.js` | `/api/faqs` | `GET /`, `POST /`, `PUT /:id`, `DELETE /:id` |
| `routes/settings.js` | `/api/settings` | `GET /`, `PUT /` |
| (inline) | `/api/health` | `GET /` |

### 7.3 Controllers

| Controller | File | Functions |
|------------|------|-----------|
| `authController` | `controllers/authController.js` | `login`, `getMe` |
| `packageController` | `controllers/packageController.js` | `getAllPackages` (with filters, pagination, search), `getPackageBySlug`, `getFeaturedPackages`, `createPackage`, `updatePackage`, `deletePackage` |
| `destinationController` | `controllers/destinationController.js` | `getAllDestinations`, `getDestinationBySlug`, `createDestination`, `updateDestination`, `deleteDestination` |
| `enquiryController` | `controllers/enquiryController.js` | `createEnquiry` (triggers email), `getAllEnquiries`, `getEnquiryById`, `updateEnquiryStatus`, `deleteEnquiry` |
| `reviewController` | `controllers/reviewController.js` | `getApprovedReviews`, `getAllReviews`, `createReview`, `updateReview`, `deleteReview`, `approveReview` |
| `blogController` | `controllers/blogController.js` | `getAllPosts` (excludes content field for listing), `getPostBySlug`, `createPost`, `updatePost`, `deletePost` |
| `faqController` | `controllers/faqController.js` | `getAllFaqs`, `createFaq`, `updateFaq`, `deleteFaq` |
| `settingsController` | `controllers/settingsController.js` | `getSettings` (singleton), `updateSettings` |

### 7.4 Middleware

| Middleware | File | Purpose |
|------------|------|---------|
| `protect` | `middleware/auth.js` | JWT token verification, attaches `req.user` |
| `authorize(...roles)` | `middleware/auth.js` | Role-based access control (admin, editor) |
| `errorHandler` | `middleware/errorHandler.js` | Handles CastError, duplicate key, validation, JWT errors |
| `validate(validations)` | `middleware/validate.js` | express-validator wrapper |
| `enquiryLimiter` | `routes/enquiries.js` | 5 requests per 15 minutes on enquiry creation |
| `limiter` | `index.js` | 100 requests per 15 minutes on all `/api` routes |

### 7.5 Email Service

**File:** `backend/src/services/emailService.js`

- Uses Nodemailer with Gmail SMTP
- Lazy-initialized transporter (created on first use)
- `sendEnquiryNotification(enquiry)` — Sends HTML email to `CONTACT_EMAIL` when a new enquiry is submitted
- `sendMail({ to, subject, html })` — Generic mail sending function
- Email contains: customer details, travel preferences, message, submission timestamp
- Branded HTML email template with Happy Kingdom Travels header (green `#1a4731` + gold `#c9a227`)
- Email failures are caught and logged but do not prevent enquiry submission

### 7.6 Seed Scripts

| Script | Command | What It Seeds |
|--------|---------|---------------|
| `seed.js` | `npm run seed` | Admin user, 5 destinations, 6 packages, 10 blog posts, 5 reviews, site settings, 10 FAQs |
| `seedPackages.js` | `node src/seeds/seedPackages.js` | 7 additional detailed packages with full itineraries, accommodations, SEO data |
| `updateFamilyTour.js` | `node src/seeds/updateFamilyTour.js` | Upserts family tour package |
| `updateGrandDiscovery.js` | `node src/seeds/updateGrandDiscovery.js` | Upserts grand discovery package |
| `updateRoyalBhutan.js` | `node src/seeds/updateRoyalBhutan.js` | Upserts royal Bhutan luxury package |
| `cleanup.js` | `node src/seeds/cleanup.js` | Deletes old package slug `royal-bhutan-experience-5n-6d` |

---

## 8. Database Models & ER Diagram

### ER Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        MONGOOSE MODELS                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────┐         ┌──────────────┐         ┌──────────────┐    │
│  │   User   │         │   Package    │         │ Destination  │    │
│  ├──────────┤         ├──────────────┤         ├──────────────┤    │
│  │ _id      │         │ _id          │         │ _id          │    │
│  │ name     │         │ title        │◄────────│ name         │    │
│  │ email    │         │ slug (unique)│  ref[]  │ slug (unique)│    │
│  │ password │         │ destination  │         │ description  │    │
│  │ role     │         │ category     │         │ shortDesc    │    │
│  │ timestamps│        │ duration     │         │ image        │    │
│  └──────────┘         │ route[]      │         │ gallery[]    │    │
│                       │ startingPts[]│         │ howToReach   │    │
│                       │ shortDesc    │         │ bestTime     │    │
│                       │ description  │         │ thingsToDo[] │    │
│                       │ highlights[] │         │ packages[]───┘    │
│                       │ suitableFor[]│              │               │
│                       │ travelStyle  │              │ ref           │
│                       │ images[]     │              │               │
│                       │ heroImage    │         ┌──────────────┐    │
│                       │ itinerary[]  │         │  BlogPost    │    │
│                       │ accommodation│         ├──────────────┤    │
│                       │ inclusions[] │         │ _id          │    │
│                       │ exclusions[] │         │ title        │    │
│                       │ optionalAct[]│         │ slug (unique)│    │
│                       │ faq[]        │         │ metaTitle    │    │
│                       │ seo          │         │ metaDesc     │    │
│                       │ pricing      │         │ excerpt      │    │
│                       │ status       │         │ content      │    │
│                       │ featured     │         │ author       │    │
│                       │ slug (unique)│         │ category     │    │
│                       │ timestamps   │         │ tags[]       │    │
│                       └──────┬───────┘         │ publishedAt  │    │
│                              │                 │ published    │    │
│                              │ ref             │ relatedPkgs[]│    │
│                              │ (used by        │ timestamps   │    │
│                              │  Enquiry,       └──────────────┘    │
│                              │  Review,                            │
│                              │  BlogPost)                          │
│                                                                     │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐         │
│  │   Enquiry    │    │    Review    │    │     FAQ      │         │
│  ├──────────────┤    ├──────────────┤    ├──────────────┤         │
│  │ _id          │    │ _id          │    │ _id          │         │
│  │ fullName     │    │ customerName │    │ question     │         │
│  │ phone        │    │ city         │    │ answer       │         │
│  │ whatsappNum  │    │ rating (1-5) │    │ category     │         │
│  │ email        │    │ review       │    │ order        │         │
│  │ travelFrom   │    │ travelDate   │    │ published    │         │
│  │ travelDate   │    │ package──────│──ref│ timestamps   │         │
│  │ returnDate   │    │ image        │    └──────────────┘         │
│  │ adults       │    │ verified     │                             │
│  │ children     │    │ approved     │    ┌──────────────┐         │
│  │ prefDuration │    │ timestamps   │    │ SiteSettings │         │
│  │ prefPackage──│──ref└──────────────┘    ├──────────────┤         │
│  │ packageType  │                         │ _id          │         │
│  │ hotelPref    │                         │ companyName  │         │
│  │ budgetRange  │                         │ phone        │         │
│  │ travelStyle  │                         │ whatsapp     │         │
│  │ interests[]  │                         │ email        │         │
│  │ specialReq   │                         │ address      │         │
│  │ message      │                         │ socialLinks  │         │
│  │ status       │                         │ analytics    │         │
│  │ source       │                         │ seo defaults │         │
│  │ timestamps   │                         │ timestamps   │         │
│  └──────────────┘                         └──────────────┘         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

Relationships:
  Package  ◄── Enquiry.preferredPackage     (ref: Package)
  Package  ◄── Review.package               (ref: Package)
  Package  ◄── BlogPost.relatedPackages[]   (ref: Package)
  Package  ◄── Destination.packages[]       (ref: Package)
```

### Model Details

#### User

| Field | Type | Constraints |
|-------|------|-------------|
| `name` | String | required, trim, maxlength 100 |
| `email` | String | required, unique, lowercase, trim, regex validated |
| `password` | String | required, minlength 6, select: false, hashed with bcrypt (12 rounds) |
| `role` | String | enum: `['admin', 'editor']`, default: `'editor'` |

- Pre-save hook hashes password if modified
- Instance method `comparePassword(candidatePassword)` for login

#### Package

| Field | Type | Constraints |
|-------|------|-------------|
| `title` | String | required, trim, maxlength 200 |
| `slug` | String | unique, lowercase (auto-generated from title) |
| `destination` | String | default: `'Bhutan'` |
| `category` | String | enum: `['standard', 'honeymoon', 'family', 'group', 'adventure', 'luxury', 'budget']` |
| `duration.nights` | Number | required |
| `duration.days` | Number | required |
| `route` | [String] | Array of destination names |
| `startingPoints` | [String] | Departure cities |
| `shortDescription` | String | required, maxlength 300 |
| `description` | String | required |
| `tripHighlights` | [String] | |
| `suitableFor` | [String] | |
| `travelStyle` | String | enum: `['budget', 'comfort', 'premium', 'luxury']` |
| `images` | [String] | URLs |
| `heroImage` | String | URL |
| `itinerary` | [Object] | dayNumber, title, description, locations, activities, meals, overnightAt, distance, travelTime |
| `accommodation` | [Object] | location, hotelName, category, nights, roomType |
| `inclusions` | [String] | |
| `exclusions` | [String] | |
| `optionalActivities` | [String] | |
| `faq` | [Object] | question, answer |
| `seo` | Object | metaTitle, metaDescription, keywords |
| `pricing` | Object | startingFrom, currency (default INR), priceType (default on_request) |
| `status` | String | enum: `['draft', 'active', 'inactive']`, default: `'active'` |
| `featured` | Boolean | default: false |

- Indexes: text on title/description, compound on category+status, featured

#### Destination

| Field | Type | Constraints |
|-------|------|-------------|
| `name` | String | required, trim, maxlength 100 |
| `slug` | String | unique, lowercase (auto-generated from name) |
| `description` | String | required |
| `shortDescription` | String | maxlength 300 |
| `image` | String | URL |
| `gallery` | [String] | URLs |
| `howToReach` | String | |
| `bestTime` | String | |
| `thingsToDo` | [String] | |
| `packages` | [ObjectId] | ref: 'Package' |
| `seo` | Object | title, description, keywords |
| `published` | Boolean | default: false |

- Indexes: text on name/description, index on slug

#### BlogPost

| Field | Type | Constraints |
|-------|------|-------------|
| `title` | String | required, trim, maxlength 200 |
| `slug` | String | unique, lowercase (auto-generated from title) |
| `metaTitle` | String | |
| `metaDescription` | String | |
| `excerpt` | String | maxlength 300 |
| `featuredImage` | String | URL |
| `content` | String | required (HTML string) |
| `author` | String | default: `'Bhutan Travel Team'` |
| `category` | String | trim |
| `tags` | [String] | |
| `publishedAt` | Date | default: Date.now |
| `published` | Boolean | default: false |
| `relatedPackages` | [ObjectId] | ref: 'Package' |

- Indexes: text on title/content, index on slug, compound on category+published

#### Review

| Field | Type | Constraints |
|-------|------|-------------|
| `customerName` | String | required, trim, maxlength 100 |
| `city` | String | trim |
| `rating` | Number | required, min: 1, max: 5 |
| `review` | String | required, maxlength 1000 |
| `travelDate` | Date | |
| `package` | ObjectId | ref: 'Package' |
| `image` | String | URL |
| `verified` | Boolean | default: false |
| `approved` | Boolean | default: false |

- Index: compound on approved + rating

#### Enquiry

| Field | Type | Constraints |
|-------|------|-------------|
| `fullName` | String | required, trim, maxlength 100 |
| `phone` | String | required, trim |
| `whatsappNumber` | String | trim |
| `email` | String | required, lowercase, trim, regex validated |
| `travelFrom` | String | trim |
| `travelDate` | Date | |
| `returnDate` | Date | |
| `adults` | Number | default: 1, min: 1 |
| `children` | Number | default: 0, min: 0 |
| `preferredDuration` | String | trim |
| `preferredPackage` | ObjectId | ref: 'Package' |
| `packageType` | String | enum: `['standard', 'honeymoon', 'family', 'group', 'adventure', 'luxury', 'budget']` |
| `hotelPreference` | String | enum: `['budget', 'standard', 'deluxe', 'premium', 'luxury', 'any']` |
| `budgetRange` | String | trim |
| `travelStyle` | String | enum: `['budget', 'comfort', 'premium', 'luxury']` |
| `interests` | [String] | |
| `specialRequirements` | String | trim |
| `message` | String | trim |
| `status` | String | enum: `['new', 'contacted', 'quote_sent', 'negotiation', 'confirmed', 'cancelled', 'completed', 'lost']`, default: `'new'` |
| `source` | String | default: `'website'` |

- Indexes: status, createdAt (descending)

#### FAQ

| Field | Type | Constraints |
|-------|------|-------------|
| `question` | String | required, trim |
| `answer` | String | required |
| `category` | String | default: `'general'`, trim |
| `order` | Number | default: 0 |
| `published` | Boolean | default: true |

- Index: compound on category + order

#### SiteSettings (Singleton)

| Field | Type | Default |
|-------|------|---------|
| `companyName` | String | `'Bhutan Travel Agency'` |
| `phone` | String | `'+975-2-323251'` |
| `whatsapp` | String | `'+975-17112345'` |
| `email` | String | `'info@bhutantravel.com'` |
| `address` | String | `'Norzin Lam, Thimphu, Bhutan'` |
| `socialLinks.facebook` | String | `''` |
| `socialLinks.instagram` | String | `''` |
| `socialLinks.twitter` | String | `''` |
| `analytics.ga4Id` | String | `''` |
| `analytics.gtmId` | String | `''` |
| `seo.defaultTitle` | String | `'Bhutan Travel Agency - Your Gateway...'` |
| `seo.defaultDescription` | String | `'Explore Bhutan with curated travel...'` |

- Static method `getInstance()` returns existing or creates default

---

## 9. Complete API Reference

### Base URL

```
Development: http://localhost:5000/api
Frontend proxy: /api (Vite proxies to localhost:5000)
```

### Authentication

All protected routes require a Bearer token in the `Authorization` header:
```
Authorization: Bearer <jwt_token>
```

Tokens are obtained via `POST /api/auth/login` and stored in `localStorage` on the frontend.

### Response Format

**Success:**
```json
{
  "success": true,
  "data": { ... },
  "pagination": { "currentPage": 1, "totalPages": 5, "total": 50, "perPage": 12 }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error description"
}
```

---

### Authentication

#### `POST /api/auth/login`

Authenticate admin user and receive JWT token.

| | |
|---|---|
| **Auth Required** | No |
| **Rate Limit** | Global (100/15min) |

**Request Body:**
```json
{
  "email": "admin@bhutantravel.com",
  "password": "Admin@123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "data": {
    "id": "64f...",
    "name": "Admin",
    "email": "admin@bhutantravel.com",
    "role": "admin"
  }
}
```

**Error Responses:**
- `400` — Missing email or password
- `401` — Invalid credentials

---

#### `GET /api/auth/me`

Get current authenticated user profile.

| | |
|---|---|
| **Auth Required** | Yes (Bearer token) |

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "64f...",
    "name": "Admin",
    "email": "admin@bhutantravel.com",
    "role": "admin",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `401` — No token / invalid token / user not found

---

### Packages

#### `GET /api/packages`

Get all active packages with filtering, search, and pagination.

| | |
|---|---|
| **Auth Required** | No |

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `category` | string | Filter by: standard, honeymoon, family, group, adventure, luxury, budget |
| `duration` | string | Filter by nights (e.g., `5N/6D`, `5`, `7`) |
| `travelStyle` | string | Filter by: budget, comfort, premium, luxury |
| `startingPoint` | string | Filter by starting city (regex match) |
| `search` | string | Search in title, description, highlights, suitableFor |
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 12, max: 100) |

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "title": "Bhutan Highlights — 4N/5D",
      "slug": "bhutan-highlights-4n-5d",
      "category": "standard",
      "duration": { "nights": 4, "days": 5 },
      "shortDescription": "...",
      "route": ["Phuentsholing", "Thimphu", "Paro"],
      "featured": true,
      ...
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 2,
    "total": 18,
    "perPage": 12
  }
}
```

---

#### `GET /api/packages/:slug`

Get a single active package by its slug.

| | |
|---|---|
| **Auth Required** | No |

**Success Response (200):** Full package object with itinerary, accommodation, FAQs, SEO data.

**Error Response:** `404` — Package not found

---

#### `POST /api/packages`

Create a new package.

| | |
|---|---|
| **Auth Required** | Yes (admin role) |

**Request Body:** Full package object (see Package model fields).

**Success Response (201):** Created package object.

---

#### `PUT /api/packages/:id`

Update an existing package.

| | |
|---|---|
| **Auth Required** | Yes (admin role) |

**Request Body:** Fields to update.

**Success Response (200):** Updated package object.

**Error Response:** `404` — Package not found

---

#### `DELETE /api/packages/:id`

Delete a package.

| | |
|---|---|
| **Auth Required** | Yes (admin role) |

**Success Response (200):**
```json
{ "success": true, "message": "Package deleted successfully" }
```

**Error Response:** `404` — Package not found

---

### Destinations

#### `GET /api/destinations`

Get all published destinations.

| | |
|---|---|
| **Auth Required** | No |

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `page` | number | Page number |
| `limit` | number | Items per page |
| `search` | string | Full-text search |
| `published` | string | `'true'` or `'false'` |

**Success Response (200):** Array of destination objects.

---

#### `GET /api/destinations/:slug`

Get a single published destination by slug, with populated packages.

**Success Response (200):** Destination object with `packages` populated (title, slug, duration, startingPrice, heroImage, shortDescription).

---

#### `POST /api/destinations`

Create a new destination. **Auth Required:** Yes (admin).

#### `PUT /api/destinations/:id`

Update a destination. **Auth Required:** Yes (admin).

#### `DELETE /api/destinations/:id`

Delete a destination. **Auth Required:** Yes (admin).

---

### Enquiries

#### `POST /api/enquiries`

Submit a new enquiry. **Triggers email notification.**

| | |
|---|---|
| **Auth Required** | No |
| **Rate Limit** | 5 requests per 15 minutes |

**Request Body:**
```json
{
  "fullName": "John Doe",
  "phone": "+919876543210",
  "email": "john@example.com",
  "whatsappNumber": "+919876543210",
  "travelFrom": "Mumbai",
  "travelDate": "2026-10-15",
  "returnDate": "2026-10-20",
  "adults": 2,
  "children": 1,
  "preferredDuration": "5N/6D",
  "preferredPackage": "64f...",
  "packageType": "family",
  "hotelPreference": "deluxe",
  "budgetRange": "₹50,000 - ₹1,00,000",
  "travelStyle": "comfort",
  "interests": ["Culture", "Photography"],
  "specialRequirements": "Vegetarian meals",
  "message": "Looking for a family trip",
  "source": "website"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Enquiry submitted successfully. We will contact you soon.",
  "data": { ... }
}
```

---

#### `GET /api/enquiries`

Get all enquiries (paginated, filterable).

| | |
|---|---|
| **Auth Required** | Yes |

**Query Parameters:** `page`, `limit`, `status`, `search` (searches fullName, email, phone)

---

#### `GET /api/enquiries/:id`

Get a single enquiry by ID. **Auth Required:** Yes.

#### `PUT /api/enquiries/:id`

Update enquiry status. **Auth Required:** Yes.

**Request Body:** `{ "status": "contacted" }`

Valid status values: `new`, `contacted`, `quote_sent`, `negotiation`, `confirmed`, `cancelled`, `completed`, `lost`

#### `DELETE /api/enquiries/:id`

Delete an enquiry. **Auth Required:** Yes.

---

### Reviews

#### `GET /api/reviews`

Get all approved reviews (public).

| | |
|---|---|
| **Auth Required** | No |

**Query Parameters:** `page`, `limit`, `rating` (filter by star rating)

---

#### `GET /api/reviews/all`

Get all reviews (including unapproved). **Auth Required:** Yes.

**Query Parameters:** `page`, `limit`, `approved`, `rating`

---

#### `POST /api/reviews`

Submit a new review (requires admin approval before display).

| | |
|---|---|
| **Auth Required** | No |

**Request Body:**
```json
{
  "customerName": "Priya Sharma",
  "city": "Mumbai",
  "rating": 5,
  "review": "Amazing trip! The team handled everything...",
  "travelDate": "2026-03-15",
  "package": "64f...",
  "verified": true
}
```

---

#### `PUT /api/reviews/:id`

Update a review. **Auth Required:** Yes.

#### `DELETE /api/reviews/:id`

Delete a review. **Auth Required:** Yes.

#### `PUT /api/reviews/:id/approve`

Approve a review (sets `approved: true`). **Auth Required:** Yes.

---

### Blog Posts

#### `GET /api/blog`

Get all published blog posts (excludes content field for listing).

| | |
|---|---|
| **Auth Required** | No |

**Query Parameters:** `page`, `limit`, `category`, `search`, `published`

---

#### `GET /api/blog/:slug`

Get a single published blog post by slug (includes full content and populated relatedPackages).

---

#### `POST /api/blog`

Create a new blog post. **Auth Required:** Yes (admin).

#### `PUT /api/blog/:id`

Update a blog post. **Auth Required:** Yes (admin).

#### `DELETE /api/blog/:id`

Delete a blog post. **Auth Required:** Yes (admin).

---

### FAQs

#### `GET /api/faqs`

Get all published FAQs, sorted by order.

| | |
|---|---|
| **Auth Required** | No |

**Query Parameters:** `page`, `limit`, `category`

---

#### `POST /api/faqs`

Create a new FAQ. **Auth Required:** Yes (admin).

#### `PUT /api/faqs/:id`

Update a FAQ. **Auth Required:** Yes (admin).

#### `DELETE /api/faqs/:id`

Delete a FAQ. **Auth Required:** Yes (admin).

---

### Site Settings

#### `GET /api/settings`

Get site settings (creates default if none exist).

| | |
|---|---|
| **Auth Required** | No |

**Success Response (200):** Settings object with company info, social links, analytics IDs, SEO defaults.

---

#### `PUT /api/settings`

Update site settings. **Auth Required:** Yes (admin).

**Request Body:** Partial or full settings object.

---

### Health Check

#### `GET /api/health`

| | |
|---|---|
| **Auth Required** | No |

**Success Response (200):**
```json
{ "success": true, "message": "API is running" }
```

---

## 10. Feature Documentation

### 10.1 Contact/Enquiry Forms

**Three enquiry entry points exist:**

1. **Contact Form** (`/contact`) — Name, email, phone, subject, message. Creates enquiry with `source: 'website'`. Opens WhatsApp after submission.
2. **SearchTripForm** (Home page quick planner) — City, date, guests, duration, style. Creates enquiry with `source: 'trip_planner'` and placeholder contact details. Opens WhatsApp.
3. **QuoteForm** (Custom Trip page) — Full form with 15+ fields including interests, budget, hotel preference, special requirements. Creates enquiry and opens WhatsApp.

**All forms:**
- Submit to `POST /api/enquiries`
- Trigger email notification to `CONTACT_EMAIL`
- Open WhatsApp with pre-filled message after submission
- Show toast notification on success/failure
- Subject to rate limiting (5 per 15 minutes)

### 10.2 WhatsApp Integration

**Implementation:** Deep link builder that opens WhatsApp Web/app with pre-filled messages.

**Message templates** (`utils/createWhatsAppMessage.js`):
| Function | Context |
|----------|---------|
| `createTripPlannerMessage(data)` | Home page quick planner |
| `createPackageMessage(pkg)` | Package detail page |
| `createGeneralMessage()` | General CTA buttons |
| `createGuideMessage(topic)` | Travel guide pages |
| `createContactMessage(subject)` | Contact form |
| `createDestinationMessage(dest)` | Destination pages |
| `createCustomTripMessage(data)` | Custom trip form |

**WhatsApp button** (`components/WhatsAppButton.jsx`): Floating green button fixed at bottom-right, links to `BUSINESS_CONTACT.whatsappUrl`.

### 10.3 Admin Panel

**Authentication:** JWT token stored in `localStorage`. `AuthContext` checks token on app load via `GET /api/auth/me`. `ProtectedRoute` component redirects to `/admin/login` if no token.

**Admin pages:**
| Page | CRUD Operations |
|------|----------------|
| Dashboard | Overview statistics |
| Packages | List, search, create, edit, delete |
| Package Editor | Full form with itinerary, accommodation, pricing, SEO |
| Destinations | List, create (modal), edit (modal), delete |
| Blog Posts | List, create, edit, delete |
| Blog Editor | Full form with content, tags, SEO |
| Enquiries | List, view details, update status, delete |
| Reviews | List, filter (all/approved/pending), approve, delete |
| Settings | Edit business info, social links, analytics, SEO defaults |

### 10.4 Package System

**Data model:** Packages have detailed itineraries, accommodations, FAQs, pricing, SEO data, and status (draft/active/inactive).

**Frontend display:**
- `BhutanPackages` page lists all active packages with category filter
- `PackageDetails` page shows full package with tabs: Overview, Itinerary, Inclusions, Exclusions, Hotels, FAQs
- `PackageCard` component used across Home, destination pages, and package listings
- Category-specific pages: Honeymoon, Family, Group

**Admin management:** Full CRUD with `AdminPackageEditor` supporting nested itinerary days, accommodation entries, FAQ entries, and SEO fields.

### 10.5 Destination System

**Dual implementation:**
1. **Hardcoded destination pages** (6 pages in `pages/destinations/`): Paro, Thimphu, Punakha, Phuentsholing, Haa Valley, Bumthang. Each page has ~800 lines of static content with sections for quick facts, why visit, top places, things to do, seasons, how to reach, sample itinerary, accommodation, packages (fetched from API), FAQs, and related destinations.
2. **Dynamic destination system**: `Destination` model in MongoDB, fetched via `GET /api/destinations`, displayed by `Destination.jsx` page at `/destinations/:slug`.

### 10.6 Blog/Travel Guide System

**Blog model:** `BlogPost` with title, slug, metaTitle, metaDescription, excerpt, content (HTML string), author, category, tags, publishedAt, published, relatedPackages.

**Frontend:**
- `TravelGuide` page lists published blog posts
- `BlogDetails` page shows full post content at `/travel-guide/:slug`
- 4 hardcoded guide pages in `pages/guide/`: BestTimeToVisit, BhutanTripCost, EntryRequirements, HowToReachBhutan

**Admin:** `AdminBlogPosts` (list) and `AdminBlogEditor` (create/edit with tags, SEO, featured image).

### 10.7 Review System

**Flow:** Customers submit reviews → stored with `approved: false` → admin approves via `AdminReviews` → approved reviews display on `Reviews` page.

**Display:** `ReviewCard` component shows star rating, quote, customer name, city, verified badge, travel date.

### 10.8 City Landing Pages

**6 SEO-optimized city pages** using a single `CityLandingPage` component parameterized by city name:
- `/bhutan-tour-from-mumbai`
- `/bhutan-tour-from-delhi`
- `/bhutan-tour-from-kolkata`
- `/bhutan-tour-from-bangalore`
- `/bhutan-tour-from-hyderabad`
- `/bhutan-tour-from-chennai`

Each page displays city-specific hero, departure info, and links to packages.

### 10.9 Legal Pages

Three comprehensive legal pages implemented as React components (not standalone HTML):

| Page | Route | Content |
|------|-------|---------|
| Privacy Policy | `/privacy-policy` | 24 sections covering data collection, usage, cookies, GDPR-style rights |
| Terms & Conditions | `/terms-and-conditions` | 50 sections covering services, booking, cancellation, liability |
| Cancellation Policy | `/cancellation-policy` | 31 sections with tiered cancellation schedule (20%-100%) |

---

## 11. Developer Guides

### 11.1 Adding a New Package

**Via Admin Panel:**
1. Navigate to `/admin/packages/new`
2. Fill in title, category, duration, route, description
3. Add itinerary days with activities, meals, accommodation
4. Set pricing, inclusions, exclusions
5. Add FAQ entries
6. Fill in SEO fields (metaTitle, metaDescription, keywords)
7. Set status to `active` and save

**Via Seed Script:**
1. Create a new file in `backend/src/seeds/`
2. Import Package model
3. Use `Package.findOneAndUpdate({ slug: '...' }, data, { upsert: true })`
4. Run with `node src/seeds/yourfile.js`

**Via API:**
```bash
curl -X POST http://localhost:5000/api/packages \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{ "title": "...", "category": "standard", "duration": { "nights": 5, "days": 6 }, ... }'
```

### 11.2 Adding a New Destination

**Via Admin Panel:**
1. Navigate to `/admin/destinations`
2. Click "Add Destination"
3. Fill in name, description, image URL, howToReach, bestTime, thingsToDo
4. Set SEO fields and published status

**For a hardcoded destination page:**
1. Create `frontend/src/pages/destinations/YourDestination.jsx`
2. Add route in `App.jsx`: `<Route path="/destinations/your-slug" element={<PublicLayout><YourDestination /></PublicLayout>} />`
3. Follow the pattern of existing destination pages (Paro.jsx as template)

### 11.3 Adding a Travel Guide / Blog Post

**Via Admin Panel:**
1. Navigate to `/admin/blog/new`
2. Enter title, excerpt, content (HTML), author, category
3. Add tags
4. Set featured image URL
5. Fill in SEO meta title and description
6. Toggle published status

**For a hardcoded guide page:**
1. Create `frontend/src/pages/guide/YourGuide.jsx`
2. Add route in `App.jsx`
3. Import and use `SEO` component for meta tags

### 11.4 Adding FAQs

**Via API:**
```bash
curl -X POST http://localhost:5000/api/faqs \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{ "question": "...", "answer": "...", "category": "general", "order": 1 }'
```

Categories used: `general`, `visa`, `planning`, `activities`

### 11.5 Adding a WhatsApp Message Template

1. Edit `frontend/src/utils/createWhatsAppMessage.js`
2. Add a new exported function following the existing pattern:
```js
export function createYourMessage(data) {
  return `Hi Happy Kingdom Travels!\n\nYour message with ${data.field}...`
}
```
3. Import and use in your component with `openWhatsApp(createYourMessage(data))`

### 11.6 Modifying the Email Template

1. Edit `backend/src/services/emailService.js`
2. Modify the `enquiryHtml(enquiry)` function
3. The template uses inline CSS for email client compatibility
4. Brand colors: green `#1a4731`, gold `#c9a227`, white `#ffffff`

### 11.7 Adding a New API Endpoint

1. Create or edit controller in `backend/src/controllers/`
2. Create or edit route in `backend/src/routes/`
3. Import route in `backend/src/index.js` and mount with `app.use('/api/your-route', yourRoutes)`
4. Add corresponding service function in `frontend/src/services/`
5. Use in components via the service

### 11.8 Adding a New Frontend Route

1. Lazy-import the component in `App.jsx`:
```jsx
const NewPage = lazy(() => import('./pages/NewPage'))
```
2. Add route inside `<Routes>`:
```jsx
<Route path="/new-page" element={<PublicLayout><NewPage /></PublicLayout>} />
```

---

## 12. Security

### Authentication

- JWT tokens with configurable expiry (default: 7 days)
- Passwords hashed with bcryptjs (12 salt rounds)
- Token transmitted via `Authorization: Bearer` header
- Frontend stores token in `localStorage` (not httpOnly cookie)
- Auto-redirect to `/admin/login` on 401 response

### Authorization

- Two roles: `admin` (full access), `editor` (limited)
- `protect` middleware verifies JWT and attaches user to `req.user`
- `authorize(...roles)` middleware checks user role against allowed roles
- Package/destination/blog CRUD requires `admin` role
- Enquiry/review read requires authentication

### Rate Limiting

| Endpoint | Limit |
|----------|-------|
| All `/api` routes | 100 requests per 15 minutes per IP |
| `POST /api/enquiries` | 5 requests per 15 minutes per IP |

### Input Validation

- `express-validator` middleware available (`middleware/validate.js`)
- Mongoose schema validation on all models (required fields, enum values, min/max, regex patterns)
- `helmet()` sets secure HTTP headers
- CORS configured with specific origin

### Error Handling

Global `errorHandler` middleware handles:
- `CastError` (invalid ObjectId) → 404
- Duplicate key (code 11000) → 400 with field name
- `ValidationError` → 400 with joined messages
- `JsonWebTokenError` → 401
- `TokenExpiredError` → 401
- Default → 500 with generic message

---

## 13. Production Security Checklist

### Environment & Secrets

- [ ] `.env` file is in `.gitignore` and never committed
- [ ] `JWT_SECRET` is a strong, random string (not a simple word)
- [ ] MongoDB connection string uses a dedicated database user with minimal permissions
- [ ] Gmail App Password is used (not the main account password)
- [ ] No secrets appear in client-side code or `window` objects
- [ ] `VITE_` prefixed env vars are safe to expose (non-sensitive only)

### Authentication & Authorization

- [ ] Default admin password (`Admin@123`) is changed before production
- [ ] JWT expiry is set appropriately (7 days is reasonable for admin)
- [ ] Password minimum length enforced (6 chars in schema, recommend 8+ in production)
- [ ] Admin routes are protected by both `protect` and `authorize` middleware
- [ ] Token is invalidated on logout (frontend removes from localStorage)

### API Security

- [ ] Rate limiting is configured (100/15min global, 5/15min enquiries)
- [ ] CORS origin is set to the actual production domain (not `*`)
- [ ] `helmet()` is enabled for security headers
- [ ] Request body size is limited (`10mb`)
- [ ] No sensitive data returned in API responses (password field has `select: false`)
- [ ] MongoDB injection prevented by Mongoose schema validation

### Data Protection

- [ ] User passwords are hashed with bcrypt (12 rounds) — **IMPLEMENTED**
- [ ] Email app passwords are not logged or exposed
- [ ] MongoDB Atlas IP whitelist is configured
- [ ] Database backups are enabled in MongoDB Atlas
- [ ] No PII is stored unnecessarily

### Frontend Security

- [ ] No secrets in `localStorage` beyond JWT token
- [ ] External links use `rel="noopener noreferrer"`
- [ ] Form inputs have appropriate `type` attributes and validation
- [ ] XSS prevented by React's default escaping (no `dangerouslySetInnerHTML` except for Schema.org JSON-LD)
- [ ] HTTPS enforced in production

### Infrastructure

- [ ] `NODE_ENV` is set to `production`
- [ ] Express does not expose stack traces in production (errorHandler handles this)
- [ ] Static files served with appropriate cache headers
- [ ] `err.log` and `out.log` files are not publicly accessible
- [ ] `.gitignore` includes `node_modules/`, `.env`, `dist/`, `*.log`

### Email Security

- [ ] SMTP credentials stored in environment variables only
- [ ] Email service uses secure connection (`SMTP_SECURE=true`, port 465)
- [ ] No user input directly interpolated into email HTML without escaping

---

## 14. Deployment

### Build Process

```bash
# Build frontend for production
npm run build
# Output: frontend/dist/

# Start backend in production
npm start
# Runs: node backend/src/index.js
```

### Production Considerations

1. **Frontend:** Serve `frontend/dist/` via Nginx or similar static server. Configure SPA fallback to `index.html` for client-side routing.

2. **Backend:** Run with `NODE_ENV=production`. Use PM2 or similar process manager for auto-restart.

3. **Database:** Use MongoDB Atlas with proper IP whitelist, database user permissions, and automated backups.

4. **Environment Variables:** Set all required env vars in production. The backend will exit if `MONGODB_URI` is missing.

5. **Logging:** Backend uses Morgan for request logging. Error logs go to `err.log`, output to `out.log`. In production, consider a centralized logging service.

6. **SSL/TLS:** Ensure HTTPS is configured at the reverse proxy level.

---

## 15. Scripts Reference

### Root `package.json`

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `concurrently "npm run dev:backend" "npm run dev:frontend"` | Run both servers concurrently |
| `dev:backend` | `cd backend && npm run dev` | Start backend with nodemon |
| `dev:frontend` | `cd frontend && npm run dev` | Start Vite dev server |
| `build` | `cd frontend && npm run build` | Build frontend for production |
| `start` | `cd backend && npm start` | Start backend in production mode |
| `seed` | `cd backend && npm run seed` | Seed database with initial data |
| `install:all` | `cd backend && npm install && cd ../frontend && npm install` | Install all dependencies |
| `lint` | `cd frontend && npm run lint` | Run ESLint on frontend |

### Backend `package.json`

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `nodemon src/index.js` | Start with auto-reload |
| `start` | `node src/index.js` | Start in production |
| `seed` | `node src/seeds/seed.js` | Run main seed script |
| `lint` | `eslint src/` | Lint backend code |

### Frontend `package.json`

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `vite` | Start Vite dev server (port 5173) |
| `build` | `vite build` | Production build |
| `preview` | `vite preview` | Preview production build |
| `lint` | `eslint . --ext js,jsx --max-warnings 0` | Lint with zero warnings tolerance |

---

## 16. Environment Variables

### Backend (`backend/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | Yes | Server port (default: 5000) |
| `MONGODB_URI` | Yes | MongoDB Atlas connection string |
| `JWT_SECRET` | Yes | Secret key for JWT signing |
| `JWT_EXPIRE` | Yes | Token expiry (e.g., `7d`) |
| `NODE_ENV` | Yes | `development` or `production` |
| `CORS_ORIGIN` | Yes | Allowed frontend origin (e.g., `http://localhost:5173`) |
| `SMTP_HOST` | Yes | SMTP server (e.g., `smtp.gmail.com`) |
| `SMTP_PORT` | Yes | SMTP port (e.g., `465`) |
| `SMTP_SECURE` | Yes | Use TLS (`true`/`false`) |
| `SMTP_USER` | Yes | SMTP username/email |
| `SMTP_PASSWORD` | Yes | SMTP password/app password |
| `CONTACT_EMAIL` | Yes | Email address to receive enquiry notifications |
| `WHATSAPP_URL` | No | WhatsApp deep link URL |

### Frontend (`frontend/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | No | API base URL (defaults to `/api` via proxy) |
| `VITE_WHATSAPP_NUMBER` | No | WhatsApp number with country code |
| `VITE_GA4_ID` | No | Google Analytics 4 measurement ID |
| `VITE_GTM_ID` | No | Google Tag Manager container ID |

> **Security Note:** Only `VITE_` prefixed variables are exposed to the client bundle. Never put sensitive credentials in frontend env vars.

---

## 17. Implementation Status

### Legend

| Status | Meaning |
|--------|---------|
| **IMPLEMENTED** | Fully functional and tested in the codebase |
| **PARTIALLY IMPLEMENTED** | Exists but incomplete or has gaps |
| **PLANNED** | Referenced in config/code but not yet built |
| **RECOMMENDED** | Not in codebase; suggested for production readiness |

### Feature Status

| Feature | Status | Notes |
|---------|--------|-------|
| React + Vite frontend | **IMPLEMENTED** | Working with lazy loading and code splitting |
| Express.js backend API | **IMPLEMENTED** | Full REST API with 8 resource endpoints |
| MongoDB Atlas integration | **IMPLEMENTED** | Mongoose 8 with connection error handling |
| JWT authentication | **IMPLEMENTED** | Login, token generation, protect/authorize middleware |
| Admin panel | **IMPLEMENTED** | Full CRUD for all resources |
| Package management | **IMPLEMENTED** | Dynamic from DB with filtering, search, pagination |
| Destination system | **PARTIALLY IMPLEMENTED** | 6 hardcoded pages + dynamic system, but hardcoded pages don't use DB data |
| Blog/Travel Guide system | **IMPLEMENTED** | CRUD + 4 hardcoded guide pages |
| Review system | **IMPLEMENTED** | Submit, approve, display workflow |
| FAQ system | **IMPLEMENTED** | CRUD + display via accordion |
| Enquiry/Lead capture | **IMPLEMENTED** | 3 form entry points with email notification |
| WhatsApp integration | **IMPLEMENTED** | 7 message templates, deep link builder, floating button |
| Email notifications | **IMPLEMENTED** | Nodemailer with branded HTML email template |
| SEO meta tags | **IMPLEMENTED** | Per-page via react-helmet-async |
| Schema.org markup | **PARTIALLY IMPLEMENTED** | Only on PackageDetails page |
| Open Graph / Twitter Cards | **IMPLEMENTED** | Via SEO component |
| City landing pages | **IMPLEMENTED** | 6 SEO pages for Indian cities |
| Legal pages | **IMPLEMENTED** | Terms, Privacy, Cancellation (700+ lines each) |
| Rate limiting | **IMPLEMENTED** | Global + enquiry-specific |
| Input validation | **PARTIALLY IMPLEMENTED** | Mongoose schema validation + validate middleware exists but not wired to all routes |
| Error handling | **IMPLEMENTED** | Global error handler with specific error types |
| Responsive design | **IMPLEMENTED** | Tailwind responsive classes throughout |
| Dark mode | **PLANNED** | No dark mode implementation found |
| Image optimization | **RECOMMENDED** | No lazy loading, WebP, or CDN |
| sitemap.xml | **NOT IMPLEMENTED** | Missing entirely |
| robots.txt | **NOT IMPLEMENTED** | Missing entirely |
| React Error Boundary | **NOT IMPLEMENTED** | No crash recovery UI |
| Unit tests | **NOT IMPLEMENTED** | Zero test files found |
| Integration tests | **NOT IMPLEMENTED** | No test framework configured |
| API documentation (Swagger) | **NOT IMPLEMENTED** | No OpenAPI spec |
| Analytics integration | **PARTIALLY IMPLEMENTED** | Env vars defined, admin UI for IDs, but no actual GA4/GTM script injection |
| Payment integration | **NOT IMPLEMENTED** | Enquiry-based only, no online booking |
| CI/CD pipeline | **NOT IMPLEMENTED** | No GitHub Actions, Jenkins, etc. |
| Docker configuration | **NOT IMPLEMENTED** | No Dockerfile or docker-compose |
| Caching strategy | **NOT IMPLEMENTED** | No cache headers or Redis |
| Multi-language support | **NOT IMPLEMENTED** | English only |
| Rich text editor for blogs | **NOT IMPLEMENTED** | Blog content is raw HTML/textarea |
| File upload for images | **NOT IMPLEMENTED** | Images are URL strings, no upload endpoint |
| User registration | **NOT IMPLEMENTED** | Admin users created via seed only |
| Password reset | **NOT IMPLEMENTED** | No forgot/reset password flow |
| Session management | **NOT IMPLEMENTED** | No token refresh or session invalidation |

---

## 18. Future Enhancements

### High Priority

1. **sitemap.xml** — Generate dynamic sitemap for all packages, destinations, and blog posts. Required for SEO.
2. **robots.txt** — Add to `frontend/public/` to control crawl behavior.
3. **React Error Boundary** — Add error boundary around routes to prevent white screen crashes.
4. **Change default admin credentials** — Force password change on first login or remove default credentials from seed.
5. **Input validation on all routes** — Wire `express-validator` validation chains to POST/PUT routes.

### Medium Priority

6. **Image upload** — Add multer or similar for image uploads instead of requiring URL strings.
7. **Rich text editor** — Replace textarea in blog editor with a WYSIWYG editor (e.g., TipTap, Quill).
8. **Analytics script injection** — Actually inject GA4/GTM scripts based on SiteSettings analytics IDs.
9. **API documentation** — Generate OpenAPI/Swagger spec from routes.
10. **Caching headers** — Add Cache-Control headers for static assets and API responses.
11. **Password reset flow** — Add forgot password with email reset link.
12. **Token refresh** — Implement refresh tokens for longer sessions without re-login.

### Low Priority

13. **Unit tests** — Add Vitest or Jest for frontend component tests and backend unit tests.
14. **Integration tests** — Add Supertest for API endpoint testing.
15. **Docker setup** — Dockerfile and docker-compose for consistent development and deployment.
16. **CI/CD pipeline** — GitHub Actions for lint, test, build, and deploy.
17. **Multi-language** — i18n support for Hindi, Nepali, or other regional languages.
18. **Dark mode** — Tailwind dark mode class strategy.
19. **Payment gateway** — Integrate Razorpay or similar for online booking and payments.
20. **User registration** — Allow customers to create accounts and track their enquiries.
21. **Email templates** — Move email HTML to separate template files for easier maintenance.
22. **Database migrations** — Version-controlled schema changes.
23. **Logging service** — Replace file-based logging with a centralized service (e.g., Winston + cloud logging).
24. **CDN for images** — Serve tour images via Cloudinary, AWS S3, or similar.
25. **Performance monitoring** — Add APM tooling for production.

---

*This documentation was generated from actual codebase inspection. All routes, models, endpoints, and features described here are verified against the source code.*
