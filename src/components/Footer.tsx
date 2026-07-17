'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiTrendingUp, FiTwitter, FiGithub, FiLinkedin, FiYoutube } from 'react-icons/fi';

const footerLinks = {
  Product: [
    { label: 'Features', href: '/#features' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Use Cases', href: '/#use-cases' },
    { label: 'Pricing', href: '/#pricing' },
  ],
  Resources: [
    { label: 'Explore Competitors', href: '/explore' },
    { label: 'Blog', href: '/blog' },
    { label: 'Documentation', href: '/docs' },
    { label: 'API Reference', href: '/docs/api' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
    { label: 'Press Kit', href: '/press' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'GDPR', href: '/gdpr' },
  ],
};

const socialLinks = [
  { label: 'Twitter', href: 'https://twitter.com/trendpulseai', icon: FiTwitter },
  { label: 'GitHub', href: 'https://github.com/trendpulseai', icon: FiGithub },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/trendpulseai', icon: FiLinkedin },
  { label: 'YouTube', href: 'https://youtube.com/@trendpulseai', icon: FiYoutube },
];

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on dashboard and auth pages — they have their own layouts
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/login') || pathname.startsWith('/register')) {
    return null;
  }

  return (
    <footer className="w-full border-t bg-background mt-auto">
      <div className="container mx-auto px-4 lg:px-6 py-12 lg:py-16">
        {/* Top: Brand + Links */}
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-4">
              <FiTrendingUp className="h-5 w-5 text-primary" />
              <span>TrendPulse AI</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Advanced competitor intelligence and AI-powered strategy generation for modern businesses.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-sm font-semibold mb-4">{group}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} TrendPulse AI. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="/cookies" className="hover:text-foreground transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
