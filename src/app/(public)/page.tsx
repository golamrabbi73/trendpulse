'use client';

import Link from 'next/link';
import * as React from 'react';
import { Button } from '@/components/ui/Button';
import {
  FiCpu, FiTarget, FiZap, FiShield, FiBarChart2,
  FiUsers, FiCheckCircle, FiArrowRight, FiStar, FiChevronDown,
  FiChevronUp, FiMail
} from 'react-icons/fi';

// ─── Platform Statistics ──────────────────────────────────────────────────────
const stats = [
  { value: '10,000+', label: 'Competitors Tracked' },
  { value: '50,000+', label: 'AI Audits Generated' },
  { value: '8,500+', label: 'Strategies Created' },
  { value: '98%', label: 'Customer Satisfaction' },
];

// ─── Features ─────────────────────────────────────────────────────────────────
const features = [
  {
    icon: FiUsers,
    title: 'Competitor Intelligence',
    description:
      'Track unlimited competitors with detailed profiles — industry, market position, strengths, weaknesses, and real-time updates.',
  },
  {
    icon: FiCpu,
    title: 'AI-Powered Audits',
    description:
      'Upload documents and let our Gemini-powered AI extract deep competitive insights, SWOT analysis, pricing gaps, and actionable recommendations.',
  },
  {
    icon: FiTarget,
    title: 'Strategy Generation',
    description:
      'Generate tailored go-to-market strategies in seconds. Choose tone, length, and style — then export or edit the result.',
  },
  {
    icon: FiBarChart2,
    title: 'Visual Analytics',
    description:
      'Interactive charts for audit trends, industry distribution, risk levels, and strategy timelines — all in one dashboard.',
  },
  {
    icon: FiZap,
    title: 'Real-Time Insights',
    description:
      'Instant AI processing means you get actionable intelligence in seconds, not hours. Stay ahead of the market.',
  },
  {
    icon: FiShield,
    title: 'Enterprise Security',
    description:
      'JWT-secured APIs, encrypted data at rest, and role-based access control keep your competitive data safe.',
  },
];

// ─── How It Works ─────────────────────────────────────────────────────────────
const steps = [
  {
    step: '01',
    title: 'Add Your Competitors',
    description:
      'Start by adding competitors to your workspace — include their website, industry, and key attributes.',
  },
  {
    step: '02',
    title: 'Run an AI Audit',
    description:
      'Upload competitor documents, landing pages, or reports. Our AI extracts deep insights instantly.',
  },
  {
    step: '03',
    title: 'Generate a Strategy',
    description:
      'Use AI-generated insights to create a full competitive strategy — with action plans, KPIs, and ad copy.',
  },
  {
    step: '04',
    title: 'Execute and Iterate',
    description:
      'Export strategies, track results, and regenerate at any time. Version history keeps every decision recorded.',
  },
];

// ─── Use Cases ────────────────────────────────────────────────────────────────
const useCases = [
  {
    audience: 'Growth Marketers',
    description:
      'Analyze competitor campaigns, identify content gaps, and generate ad copy suggestions tailored to outperform rivals.',
    cta: 'Get started',
  },
  {
    audience: 'Product Teams',
    description:
      'Map competitor features, find market gaps, and build a product roadmap backed by competitive intelligence.',
    cta: 'Explore features',
  },
  {
    audience: 'Startup Founders',
    description:
      'Understand the competitive landscape before your next funding round with data-driven SWOT analysis.',
    cta: 'Start free',
  },
  {
    audience: 'Agencies',
    description:
      'Run competitive audits for every client. Deliver polished strategy decks in hours, not days.',
    cta: 'Learn more',
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Head of Growth, Luminary SaaS',
    quote:
      'TrendPulse AI cut our competitive research time from 2 days to under 20 minutes. The AI-generated strategies are shockingly detailed.',
    rating: 5,
  },
  {
    name: 'Marcus Rivera',
    role: 'Founder, NovaTech',
    quote:
      'I used TrendPulse AI to prepare for my Series A pitch. The SWOT analysis and market positioning insights were investor-ready.',
    rating: 5,
  },
  {
    name: 'Priya Kapoor',
    role: 'Marketing Director, CloudAxis',
    quote:
      'The strategy generator with adjustable tone and length is brilliant. We use it every sprint to refine our messaging.',
    rating: 5,
  },
];

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: 'How does the AI audit work?',
    a: 'You upload a competitor document (PDF, report, etc.). Our backend extracts the text and sends it to Google Gemini, which returns structured insights including SWOT analysis, pricing gaps, and recommendations.',
  },
  {
    q: 'Is my data kept private?',
    a: 'Yes. All data is scoped to your account. Only you can access your competitors, audits, and strategies. We use JWTs with short expiry and encrypted refresh tokens.',
  },
  {
    q: 'Can I regenerate strategies?',
    a: 'Absolutely. You can regenerate any strategy with a different tone or length. Every version is saved in history so you can compare and restore past outputs.',
  },
  {
    q: 'What file types does the AI auditor support?',
    a: 'Currently PDF and text documents are supported. CSV and web URL ingestion are on the roadmap for upcoming releases.',
  },
  {
    q: 'Is there a free tier?',
    a: 'You can sign up and run your first 3 AI audits completely free. After that, paid plans unlock unlimited audits and strategy generations.',
  },
];

// ─── FAQ Accordion ────────────────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="border-b last:border-0">
      <button
        className="flex w-full items-center justify-between py-4 text-left text-sm font-medium hover:text-foreground/80 transition-colors"
        onClick={() => setOpen(!open)}
      >
        {q}
        {open ? <FiChevronUp className="h-4 w-4 shrink-0" /> : <FiChevronDown className="h-4 w-4 shrink-0" />}
      </button>
      {open && <p className="pb-4 text-sm text-muted-foreground leading-relaxed">{a}</p>}
    </div>
  );
}

export default function LandingPage() {
  const [email, setEmail] = React.useState('');

  return (
    <div className="flex flex-col">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[65vh] items-center overflow-hidden bg-background">
        {/* Background decorations */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 lg:px-6 py-20 lg:py-28 relative">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-xs font-medium text-muted-foreground">
              <FiZap className="h-3.5 w-3.5 text-primary" />
              Powered by Google Gemini AI
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Outmaneuver your{' '}
              <span className="relative">
                <span className="relative z-10">competition</span>
                <span className="absolute inset-x-0 bottom-1 h-3 bg-primary/20 -z-0" />
              </span>{' '}
              with AI
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              TrendPulse AI aggregates competitive intelligence, generates AI audit reports, and crafts data-driven go-to-market strategies — all in one platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" asChild className="gap-2">
                <Link href="/register">
                  Start for free <FiArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/explore">Explore competitors</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">No credit card required &mdash; 3 free AI audits on signup</p>
          </div>
        </div>
      </section>

      {/* ── PLATFORM STATISTICS ──────────────────────────────────────────── */}
      <section className="border-y bg-muted/40">
        <div className="container mx-auto px-4 lg:px-6 py-12">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section id="features" className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to win
            </h2>
            <p className="mt-4 text-muted-foreground">
              A complete competitive intelligence platform — from data gathering to strategy execution.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 lg:py-28 bg-muted/40">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              From insight to strategy in minutes
            </h2>
            <p className="mt-4 text-muted-foreground">
              Four simple steps to transform raw competitive data into an actionable plan.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div key={step.step} className="relative">
                {i < steps.length - 1 && (
                  <div className="absolute top-6 left-full w-8 h-px bg-border hidden lg:block" />
                )}
                <div className="flex flex-col gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    {step.step}
                  </div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── USE CASES ────────────────────────────────────────────────────── */}
      <section id="use-cases" className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Built for every team
            </h2>
            <p className="mt-4 text-muted-foreground">
              Whether you&apos;re a solo founder or an enterprise team, TrendPulse AI adapts to your workflow.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {useCases.map((uc) => (
              <div key={uc.audience} className="rounded-xl border border-border bg-card p-8">
                <h3 className="text-lg font-semibold mb-3">{uc.audience}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{uc.description}</p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/register" className="gap-2">
                    {uc.cta} <FiArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section id="testimonials" className="py-20 lg:py-28 bg-muted/40">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Trusted by growth teams worldwide
            </h2>
            <p className="mt-4 text-muted-foreground">
              See what our users say about TrendPulse AI.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-xl border border-border bg-card p-6 flex flex-col gap-4">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <FiStar key={i} className="h-4 w-4 fill-current text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mx-auto max-w-2xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently asked questions</h2>
              <p className="mt-4 text-muted-foreground">
                Everything you need to know about TrendPulse AI.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card px-6">
              {faqs.map((faq) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER / CTA ─────────────────────────────────────────────── */}
      <section id="cta" className="py-20 lg:py-28 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Start winning today
            </h2>
            <p className="mt-4 text-primary-foreground/80">
              Join thousands of growth teams who use TrendPulse AI to stay ahead of their competition.
              Sign up free &mdash; no credit card required.
            </p>
            <form
              className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
              onSubmit={(e) => { e.preventDefault(); }}
            >
              <div className="relative flex-1 max-w-sm">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Enter your work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-border bg-background text-foreground pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <Button size="default" variant="secondary" type="submit">
                Get early access
              </Button>
            </form>
            <p className="mt-4 text-xs text-primary-foreground/60">
              We respect your privacy. Unsubscribe at any time.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-primary-foreground/80">
              {['No credit card', '3 free AI audits', 'Cancel anytime', '24/7 support'].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <FiCheckCircle className="h-4 w-4" /> {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
