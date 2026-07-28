# 🚀 TrendPulse AI - Frontend

TrendPulse AI is a full-stack AI-powered competitor research platform that helps businesses analyze competitors, identify market opportunities, and generate actionable marketing strategies using **Groq's Llama 3.3 70B**.

Users can upload business documents such as financial reports, SEC filings, or articles to receive AI-generated competitor analysis, market insights, SWOT analysis, and strategic recommendations through an intuitive dashboard.

## ✨ Features

- 🔍 **Competitor Explorer** – Browse and filter competitors by industry and market position.
- 🤖 **AI Competitor Audits** – Upload PDF/CSV documents to generate AI-powered business insights and SWOT analysis.
- 📈 **AI Strategy Generator** – Create tailored marketing strategies with multiple business tones (Growth, Aggressive, Defensive, etc.).
- 🔐 **Authentication** – Secure JWT authentication with Google OAuth integration.
- 📊 **Interactive Dashboard** – Manage competitors, AI audits, and generated strategies from a centralized dashboard.
- 📉 **Data Visualization** – Visualize competitor and market insights with interactive charts.

---

## 🛠️ Tech Stack

### Frontend
- Next.js 15 (App Router)
- React
- TypeScript
- Tailwind CSS
- Tailwind Merge

### State Management & Data Fetching
- TanStack React Query
- Zustand

### Forms & Validation
- React Hook Form
- Zod

### Charts
- Recharts

### Authentication
- JWT
- Google OAuth

### UI
- Custom components inspired by shadcn/ui

---

## 🚀 Getting Started

### Prerequisites

- Node.js **18+**
- TrendPulse AI Backend running locally

### Installation

1. Clone the repository.

```bash
git clone <repository-url>
cd trendpulse-frontend
```

2. Install dependencies.

```bash
npm install
```

3. Create an environment file.

```bash
cp .env.example .env
```

Update the environment variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

4. Start the development server.

```bash
npm run dev
```

Visit **http://localhost:3000** in your browser.

---

## 📁 Project Structure

```text
src/
├── app/            # Next.js App Router pages & layouts
├── components/     # Shared UI components
├── features/       # Feature-based modules
├── hooks/          # Custom React hooks
├── lib/            # API client & shared libraries
├── providers/      # React providers
├── store/          # Zustand stores
├── types/          # TypeScript types
└── utils/          # Utility functions
```

---

## 🌟 Highlights

- Production-ready project structure
- Feature-based architecture
- Type-safe API integration
- AI-powered competitor analysis
- Secure authentication
- Responsive UI
- Modern React patterns
- Interactive analytics dashboard

---

## 📄 License

This project is licensed under the **MIT License**.
