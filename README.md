# AI-HRMS — AI-Powered Human Resource Management System

A premium, enterprise-grade SaaS website and dashboard for an AI-powered HR platform. Built with Next.js 15, TypeScript, Tailwind CSS, Shadcn UI, Framer Motion, and a clean, feature-based architecture.

## Features

### Landing Website
- **Hero** with animated stats and product preview
- **Trusted Companies** logo bar
- **Problem Statement** highlighting HR pain points
- **Employee Lifecycle** visualization
- **Core Features** grid (directory, attendance, payroll, performance, learning, engagement)
- **AI Features** showcase (resume parser, candidate matching, interview assistant, chatbot, career coach, attrition prediction, talent marketplace, org insights)
- **Technology Stack** overview
- **Business Benefits** with measurable outcomes
- **Workflow Timeline** (5-phase HR workflow)
- **Testimonials** from customers
- **Pricing** (Starter / Growth / Enterprise)
- **FAQ** accordion
- **Contact** form with validation
- **CTA** sections

### Authentication
- Login, Register, Forgot Password, Reset Password, Verify Email, OTP, Change Password
- 403 and 404 error pages, Session Expired page
- Glassmorphism UI with animated inputs, password strength meter, social login placeholders
- JWT + Refresh Token + HTTP-only cookies + Axios interceptors + middleware route protection
- RBAC with 6 roles (Super Admin, HR Admin, Recruiter, Manager, Employee, Candidate)
- Role-based redirect after login

### Dashboard
- **Dashboard Home**: stat cards, hiring trends chart, department distribution, quick actions, recent activity, upcoming interviews, pending leave requests
- **Sidebar**: collapsible, responsive drawer, role-aware navigation
- **Header**: search, notifications dropdown, profile menu, theme toggle, breadcrumb support
- **HR Modules**:
  - Recruitment (candidate pipeline, job postings, interviews)
  - Employees (directory with search/filter, export to CSV)
  - Payroll (payroll trend, monthly payroll table)
  - Attendance (weekly trend, today's attendance, leave requests with approve/reject)
  - Performance (reviews with goals progress)
  - Learning (course catalog with enrollment)
  - Analytics (charts + AI insights)
  - AI Chatbot (interactive chat interface)
  - Settings (profile, notifications, security, appearance)

### Design System
- Glassmorphism, rounded corners, soft shadows, gradient backgrounds
- Blue/cyan/indigo color palette with 6+ color ramps
- 8px spacing system, consistent typography (3 weights max)
- Dark mode default with light mode toggle
- Fully responsive (mobile, tablet, laptop, desktop)
- Framer Motion animations (fade, slide, scale, scroll reveal, parallax, hover, page transitions)

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Library | Shadcn UI |
| Animations | Framer Motion |
| Icons | Lucide React |
| Forms | React Hook Form |
| Validation | Zod |
| HTTP Client | Axios |
| API State | TanStack React Query |
| UI State | Redux Toolkit + Zustand patterns |
| Theme | Next Themes |
| Linting | ESLint |

## Architecture

Follows **Clean Architecture** and **Feature-Based Architecture**:

```
app/                    # Next.js App Router (routes)
  (landing)/            # Public marketing pages
  (auth)/               # Authentication pages
  (dashboard)/          # Protected dashboard pages
  layout.tsx            # Root layout with providers
  globals.css           # Global styles + design tokens
components/             # Reusable UI components
  common/               # Shared (ThemeToggle, SectionTitle)
  layout/               # Navbar, Footer
  landing/              # Landing page sections
  dashboard/            # Dashboard-specific (Sidebar, Header, PageHeader)
  ui/                   # Shadcn UI primitives
constants/              # Routes, roles, permissions, API config
hooks/                  # Custom hooks (useAuth, useDebounce, usePagination, etc.)
providers/              # Theme, Query, Redux providers
services/               # Service layer (API + mock data)
  api/                  # Axios client with interceptors
  auth/                 # Auth service
  mock/                 # Mock data and helper
store/                  # Redux Toolkit store + slices
types/                  # TypeScript type definitions
utils/                  # Utilities (formatters, validators, helpers)
middleware.ts           # Route protection
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Demo Accounts

The app uses mock authentication. Use any of these emails with any password:

| Role | Email | Redirects to |
|------|-------|-------------|
| Super Admin | admin@aihrms.com | /dashboard/admin → /dashboard |
| HR Admin | hr@aihrms.com | /dashboard/hr → /dashboard |
| Recruiter | recruit@aihrms.com | /dashboard/recruitment → /recruitment |
| Manager | manager@aihrms.com | /dashboard/manager → /dashboard |
| Employee | employee@aihrms.com | /dashboard/employee → /dashboard |
| Candidate | candidate@aihrms.com | /dashboard/candidate → /recruitment |

Default login: `admin@aihrms.com` / `password123`

## Key Routes

### Landing
- `/` — Home
- `/features` — Features
- `/solutions` — Solutions
- `/technology` — Technology
- `/pricing` — Pricing
- `/docs` — Documentation
- `/about` — About
- `/contact` — Contact

### Auth
- `/login` — Sign in
- `/register` — Sign up
- `/forgot-password` — Forgot password
- `/reset-password` — Reset password
- `/verify-email` — Email verification
- `/otp` — OTP code
- `/change-password` — Change password
- `/403` — Forbidden
- `/404` — Not found
- `/session-expired` — Session expired

### Dashboard
- `/dashboard` — Dashboard home
- `/recruitment` — Recruitment pipeline
- `/employees` — Employee directory
- `/payroll` — Payroll management
- `/attendance` — Attendance & leave
- `/performance` — Performance reviews
- `/learning` — Learning & development
- `/analytics` — Analytics & AI insights
- `/chatbot` — AI HR chatbot
- `/settings` — Account settings

## State Management

- **Redux Toolkit** — UI state (sidebar, notifications) and auth state
- **TanStack React Query** — API/server state (configured in providers)
- **React Hook Form + Zod** — Form state and validation

## Design Decisions

- **Server Components by default**: Only components needing interactivity use `'use client'`
- **Mock API layer**: All services return mock data, ready to swap for real API endpoints
- **RBAC**: Role-based access control with route protection via middleware
- **Design tokens**: CSS variables in `globals.css` drive the entire theme system
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation, focus states
- **SEO**: Metadata per page, semantic structure, OpenGraph tags

## License

MIT
