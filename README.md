# TrendPulse AI - Frontend

TrendPulse AI is an AI-powered competitor analysis and marketing strategy generation platform. It helps businesses track competitors across various industries and leverage artificial intelligence (Google Gemini) to automatically analyze financial reports, SEC filings, or articles and generate actionable marketing strategies.

## Features

- **Competitor Explorer**: Browse and filter competitors by industry and market position.
- **AI Audits**: Upload competitor financial reports (PDF/CSV) to automatically extract actionable business insights.
- **AI Strategy Generator**: Create targeted, tone-specific marketing strategies based on generated audits (e.g., Aggressive, Defensive, Growth).
- **Authentication**: JWT-based authentication with Google OAuth integration.
- **Dashboard**: Centralized hub to manage competitors, audits, and strategies.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) (React)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) & [Tailwind Merge](https://github.com/dcastil/tailwind-merge)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [TanStack React Query](https://tanstack.com/query)
- **Forms**: [React Hook Form](https://react-hook-form.com) with [Zod](https://zod.dev) validation
- **Charts**: [Recharts](https://recharts.org/)
- **UI Components**: Custom components inspired by shadcn/ui

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- The [TrendPulse AI Backend](../trendpulse-backend) running locally

### Installation

1. Clone the repository and navigate to this directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the example environment file and configure it:
   ```bash
   cp .env.example .env
   ```
   *Make sure `NEXT_PUBLIC_API_URL` points to your local backend (default: `http://localhost:5000/api/v1`)*
4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `/src/app`: Next.js App Router pages and layouts
- `/src/components`: Reusable UI components (buttons, modals, inputs, etc.)
- `/src/features`: Domain-driven feature modules (auth, audit, competitor, strategy) containing api clients, components, hooks, and types
- `/src/lib`: Core libraries and global configuration (API client)
- `/src/providers`: React context providers (React Query, etc.)
- `/src/store`: Global state management stores (Zustand)
- `/src/utils`: Helper and utility functions

## License

This project is licensed under the MIT License.
