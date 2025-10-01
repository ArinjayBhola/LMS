This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## AI-LMS

AI-powered Learning Management System built with Next.js App Router. Generate course outlines, notes, flashcards, and quizzes using Google Gemini; manage users with Clerk; store data with Drizzle ORM on Postgres (Neon); handle background processing with Inngest; and accept payments via Razorpay.

### Tech Stack

- **Framework**: Next.js 15 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, `tailwindcss-animate`
- **UI**: Radix UI, custom components
- **Auth**: Clerk (`@clerk/nextjs`)
- **State**: Redux Toolkit
- **AI**: Google Generative AI (Gemini)
- **DB/ORM**: Postgres (Neon) + Drizzle ORM + Drizzle Kit
- **Jobs/Events**: Inngest
- **Payments**: Razorpay

### Features

- Sign in/up with Clerk and automatic user provisioning
- Create AI-generated study materials:
  - Course outline generation
  - Notes per chapter
  - Flashcards and quizzes
- Dashboard with progress tracking and study content
- Premium subscription flow via Razorpay webhook

### Folder Overview

- `app/` Next.js App Router routes (API + pages)
- `config/` DB schema, AI model config, DB client
- `inngest/` Inngest client and functions
- `redux/` Store and slices
- `components/` UI primitives

### Prerequisites

- Node.js 18+
- A Postgres database (Neon recommended)
- Clerk account (Publishable + Secret keys)
- Google Generative AI API key (Gemini)
- Razorpay account (Key ID + Secret) for payments

### Environment Variables

Create `.env.local` in the project root with:

```bash
# Database
DATABASE_URL="postgres://user:password@host/db?sslmode=require"

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
CLERK_SECRET_KEY="sk_..."

# Google Gemini
GEMINI_API_KEY="..."

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_..."
NEXT_PUBLIC_RAZORPAY_KEY_SECRET="..."   # used for signature verification in webhook

# (Optional) Inngest
# INNGEST_EVENT_KEY="..."
# INNGEST_SIGNING_KEY="..."
```

Note: This project reads `DATABASE_URL`, `GEMINI_API_KEY`, `NEXT_PUBLIC_RAZORPAY_KEY_ID`, `NEXT_PUBLIC_RAZORPAY_KEY_SECRET`, and Clerk keys directly in code.

### Install & Run (Development)

```bash
npm install
npm run dev
# open http://localhost:3000
```

### Database (Drizzle)

- Schema: `config/schema.ts`
- Drizzle config: `drizzle.config.ts`

Common commands:

```bash
# Generate migrations from schema
npx drizzle-kit generate

# Push migrations to the database
npx drizzle-kit push
```

Database access at runtime is via Neon HTTP in `config/db.ts`.

### Inngest (Jobs/Background)

- Client ID: `ai-lms` defined in `inngest/client.ts`
- HTTP endpoint is exposed via `app/api/inngest/route.ts` (Inngest dev server can connect to this route).
- Example functions in `inngest/function.ts`:
  - `generateCourseOutline` (triggered by `course.generate`)
  - `generateStudyTypeContent` (flashcards/quizzes)

To run Inngest locally, use the Inngest CLI and connect to the Next.js route if needed. Environment keys are optional unless you sign events.

### Payments (Razorpay)

- Order creation: `app/api/create-order/route.ts` uses `NEXT_PUBLIC_RAZORPAY_KEY_ID` and `NEXT_PUBLIC_RAZORPAY_KEY_SECRET`.
- Webhook verification: `app/api/payment-webhook/route.ts` validates the signature using `NEXT_PUBLIC_RAZORPAY_KEY_SECRET` and records subscriptions.

Ensure your Razorpay dashboard points the webhook to your deployed URL and that the body fields match the expected payload.

### Authentication (Clerk)

- Middleware protection is configured in `middleware.ts` (protects `/dashboard`, `/create`, `/course/*`).
- New users are inserted into the DB on first auth via `app/auth.tsx` and `app/api/create-user/route.ts`.

### Scripts

- `dev`: Start Next.js with Turbopack
- `build`: Production build
- `start`: Start production server
- `lint`: Run ESLint

### Project Structure Highlights

- Study material creation flow:
  - Client posts to `app/api/generateCourseOutline/route.ts`
  - Triggers Inngest `course.generate` -> saves to `study_materials`
  - Notes/flashcards/quizzes generate via AI models in `config/AiModel.ts`

### Troubleshooting

- Missing keys: Verify `.env.local` values and restart the dev server
- DB SSL: Neon requires SSL; keep `?sslmode=require` in `DATABASE_URL`
- Inngest timeouts: The function includes sleeps/checkpoints; ensure the Inngest dev server is connected or trigger via API properly
- Clerk middleware: Ensure publishable/secret keys are set; check protected route matcher in `middleware.ts`

### License

MIT

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
