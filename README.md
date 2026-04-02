# TravelGuide Hub

A comprehensive online community portal where travelers can share, discover, and purchase travel guides. Built with Next.js, this platform connects passionate travelers with authentic destination experiences through user-generated content, community voting, and expert moderation.

## 🌟 Features

### 👥 User Roles & Authentication

- **Members**: Register, create/edit travel guides, vote, comment, purchase paid guides
- **Admins**: Approve/reject guides, manage users, moderate content, provide feedback
- **JWT-based authentication** with secure password hashing

### 📖 Travel Guide Management

- **Create Rich Guides**: Title, destination, itinerary, description, images
- **Draft System**: Save work-in-progress before publishing
- **Approval Workflow**: Draft → Under Review → Approved/Rejected
- **Paid/Free Options**: Monetize premium content with secure payments
- **Category System**: Adventure, Culture, Food, Budget Travel, Nature, City Guides

### 🗳️ Community Features

- **Voting System**: Upvote/downvote guides (one vote per user)
- **Nested Comments**: Threaded discussions on guides
- **Real-time Updates**: Live voting and commenting
- **Social Sharing**: Share guides across platforms

### 🔍 Search & Discovery

- **Advanced Search**: By title, destination, keywords
- **Smart Filters**: Category, payment type, author, popularity
- **Pagination**: Efficient browsing with 10-12 guides per page
- **Sorting Options**: Recent, Top Voted, Most Commented

### 💳 Payment Integration

- **Secure Payments**: SSLCommerz/ShurjoPay/Stripe integration
- **Purchase Flow**: Seamless buying experience for premium guides
- **Payment Validation**: Amount and transaction verification

### 📱 Responsive Design

- **Mobile-First**: Optimized for all devices
- **Modern UI**: Clean, intuitive interface with Tailwind CSS
- **Accessibility**: WCAG compliant design patterns

## 🛠️ Technology Stack

### Frontend

- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Modern component library
- **Lucide Icons** - Beautiful iconography
- **Axios** - HTTP client for API calls

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Prisma** - ORM for database management
- **PostgreSQL** - Primary database
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing

### DevOps & Tools

- **Vercel** - Frontend deployment
- **Railway/Render** - Backend deployment
- **Git** - Version control
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18 or higher)
- **npm** or **pnpm** package manager
- **PostgreSQL** database
- **Git** for version control

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/tonmoyth/travel-guide-client
cd travel-guide-client
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Using pnpm (recommended)
pnpm install
```

### 4. Database Setup

Ensure your PostgreSQL database is running and configured with Prisma.

### 5. Run Development Server

```bash
# Using npm
npm run dev

# Using pnpm
pnpm dev
```

Visit `http://localhost:3000` to see the application.

## 📁 Project Structure

```
travel-guide-client/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages
│   ├── (commonLayouts)/          # Shared layouts
│   ├── (dashboardLayouts)/       # Dashboard layouts
│   ├── actions/                  # Server actions
│   ├── globals.css               # Global styles
│   └── layout.tsx                # Root layout
├── components/                   # Reusable components
│   ├── admin/                    # Admin-specific components
│   ├── home/                     # Home page components
│   ├── modules/                  # Feature modules
│   ├── shared/                   # Shared components
│   └── ui/                       # UI components (shadcn)
├── lib/                          # Utility libraries
│   ├── authUtils.ts              # Authentication utilities
│   ├── axios/                    # HTTP client setup
│   └── utils.ts                  # General utilities
├── services/                     # API service layers
│   ├── admin/                    # Admin services
│   ├── auth.service.ts           # Authentication
│   └── travelGuide/              # Travel guide services
├── types/                        # TypeScript type definitions
├── zod/                          # Validation schemas
└── public/                       # Static assets
```

## 🎯 Usage

### For Members

1. **Register/Login**: Create account or sign in
2. **Browse Guides**: Explore free and paid travel guides
3. **Create Content**: Write and publish travel guides
4. **Engage Community**: Vote and comment on guides
5. **Purchase Premium**: Buy access to paid guides

### For Admins

1. **Moderate Content**: Approve/reject guide submissions
2. **Manage Users**: Activate/deactivate accounts
3. **Provide Feedback**: Give detailed rejection reasons
4. **Monitor Platform**: Track engagement and quality

## 🔧 Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm format       # Format code with Prettier

# Database
pnpm prisma:generate    # Generate Prisma client
pnpm prisma:migrate     # Run database migrations
pnpm prisma:studio      # Open Prisma Studio
```

## 🚀 Deployment

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Vercel)

1. Deploy backend API to Railway or Render
2. Update `NEXT_PUBLIC_API_BASE_URL` with production URL
3. Configure database connection strings

**Built with ❤️ for the travel community**
