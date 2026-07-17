import type { Metadata } from 'next';
import Link from 'next/link';
import { FiTrendingUp, FiCpu, FiUsers, FiZap, FiShield } from 'react-icons/fi';

export const metadata: Metadata = {
  title: 'About TrendPulse AI',
  description: 'Learn about our mission to democratize competitive intelligence with AI.',
};

const values = [
  { icon: FiZap, title: 'Speed', description: 'Intelligence delivered in seconds, not weeks.' },
  { icon: FiCpu, title: 'AI-First', description: 'Built around Google Gemini for contextual, human-quality analysis.' },
  { icon: FiShield, title: 'Privacy', description: 'Your competitive data is yours alone — always secure.' },
  { icon: FiUsers, title: 'Accessibility', description: 'Enterprise-grade intelligence at startup-friendly pricing.' },
];

const team = [
  { name: 'Alex Morgan', role: 'CEO & Co-Founder', bio: 'Ex-Google product lead. 10+ years in competitive intelligence and SaaS.' },
  { name: 'Priya Sharma', role: 'CTO & Co-Founder', bio: 'Ex-DeepMind researcher. Expert in applied LLMs and data pipelines.' },
  { name: 'James Li', role: 'Head of Product', bio: 'Previously built analytics products used by Fortune 500 companies.' },
  { name: 'Sofia Martínez', role: 'Head of Customer Success', bio: 'Helped 200+ companies build winning competitive strategies.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b bg-muted/40">
        <div className="container mx-auto px-4 lg:px-6 py-16 lg:py-24">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium text-muted-foreground">
              <FiTrendingUp className="h-3.5 w-3.5 text-primary" /> Our Story
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              We believe every business deserves world-class competitive intelligence
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              TrendPulse AI was built because competitive research was either too expensive, too slow, or too manual. We set out to change that — using the power of large language models to deliver real insights in real time.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We started TrendPulse AI because we kept seeing the same problem: great teams making critical strategy decisions based on outdated reports, gut instinct, or expensive consultant decks.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                With AI now capable of reading, synthesizing, and reasoning about complex documents, we saw an opportunity to give every business — from solo founders to enterprise teams — the kind of competitive intelligence that was previously only available to the top 1%.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our platform combines structured competitor tracking with Google Gemini-powered audits and AI-generated strategies, so your team always has the context it needs to win.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '2023', label: 'Founded' },
                { value: '10K+', label: 'Competitors tracked' },
                { value: '50K+', label: 'AI audits generated' },
                { value: '98%', label: 'Customer satisfaction' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border bg-card p-6 text-center">
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-muted/40">
        <div className="container mx-auto px-4 lg:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">What we stand for</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl border bg-card p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Meet the team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="rounded-xl border bg-card p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary text-xl font-bold">
                  {member.name.charAt(0)}
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-xs text-primary mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-muted-foreground mb-8">Join thousands of teams using TrendPulse AI to stay ahead of the competition.</p>
          <div className="flex justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Get started free
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-10 items-center justify-center rounded-md border border-border px-6 text-sm font-medium transition-colors hover:bg-accent"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
