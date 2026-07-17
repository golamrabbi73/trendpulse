'use client';

import * as React from 'react';
import { FiMail, FiMapPin, FiClock, FiSend, FiTwitter, FiLinkedin } from 'react-icons/fi';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';

const contactInfo = [
  { icon: FiMail, label: 'Email', value: 'support@trendpulse.ai', href: 'mailto:support@trendpulse.ai' },
  { icon: FiMapPin, label: 'Office', value: 'San Francisco, CA', href: null },
  { icon: FiClock, label: 'Support Hours', value: 'Mon–Fri, 9am–6pm PST', href: null },
  { icon: FiTwitter, label: 'Twitter', value: '@trendpulseai', href: 'https://twitter.com/trendpulseai' },
  { icon: FiLinkedin, label: 'LinkedIn', value: 'TrendPulse AI', href: 'https://linkedin.com/company/trendpulseai' },
];

export default function ContactPage() {
  const [form, setForm] = React.useState({ name: '', email: '', subject: '', message: '' });
  const [pending, setPending] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setPending(true);
    // Simulate submission
    await new Promise((r) => setTimeout(r, 1000));
    setPending(false);
    toast.success('Message sent! We\'ll get back to you within 24 hours.');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/40">
        <div className="container mx-auto px-4 lg:px-6 py-14">
          <h1 className="text-4xl font-bold tracking-tight">Get in touch</h1>
          <p className="mt-3 text-muted-foreground max-w-xl">
            Have a question, feature request, or partnership inquiry? We read every message and respond within 24 hours.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Contact information</h2>
            {contactInfo.map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-primary transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Full name <span className="text-destructive">*</span></label>
                  <Input
                    placeholder="John Smith"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    disabled={pending}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Email address <span className="text-destructive">*</span></label>
                  <Input
                    type="email"
                    placeholder="john@company.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    disabled={pending}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Subject</label>
                <Input
                  placeholder="How can we help?"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  disabled={pending}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Message <span className="text-destructive">*</span></label>
                <Textarea
                  placeholder="Tell us what you need..."
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  disabled={pending}
                />
              </div>
              <Button type="submit" disabled={pending} className="gap-2">
                <FiSend className="h-4 w-4" />
                {pending ? 'Sending...' : 'Send message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
