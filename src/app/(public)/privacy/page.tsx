import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How TrendPulse AI collects, uses, and protects your data.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-muted/40">
        <div className="container mx-auto px-4 lg:px-6 py-12">
          <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="mt-2 text-muted-foreground">Last updated: January 1, 2025</p>
        </div>
      </div>
      <div className="container mx-auto px-4 lg:px-6 py-12 max-w-4xl">
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-8">

          <section>
            <h2 className="text-xl font-bold mb-3">1. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed">
              We collect information you provide directly to us when you create an account, use our services, or contact us for support. This includes your name, email address, and any competitor data you enter into the platform. We also automatically collect certain usage data, such as IP addresses, browser type, and pages visited, to help us improve our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">2. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">We use the information we collect to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1.5">
              <li>Provide, maintain, and improve our platform and services</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices, updates, and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Monitor and analyze trends and usage to improve user experience</li>
              <li>Detect and prevent fraudulent transactions and other illegal activities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">3. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We take the security of your data seriously. We implement industry-standard security measures including JWT-based authentication with short-lived access tokens, encrypted refresh tokens, TLS in transit, and data encryption at rest. Your competitive intelligence data is scoped to your account and is never shared with other users or third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">4. Data Sharing</h2>
            <p className="text-muted-foreground leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our platform (such as cloud hosting providers), provided they agree to keep this information confidential. We may also disclose your information if required by law or to protect our rights and the rights of others.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">5. AI Processing</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our platform uses Google Gemini to process documents you upload for AI audits. Content you submit is sent to Google&apos;s API for analysis. Please review Google&apos;s privacy policy for more information on how they handle data. We do not store your uploaded documents longer than necessary for processing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">6. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">You have the right to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1.5">
              <li>Access the personal information we hold about you</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Request deletion of your account and associated data</li>
              <li>Object to processing of your personal data</li>
              <li>Request data portability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">7. Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use localStorage to persist your authentication state for a better user experience. We do not use third-party tracking cookies. Our analytics are anonymized and do not track individual users across sessions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">8. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about this Privacy Policy or our data practices, please contact us at{' '}
              <a href="mailto:privacy@trendpulse.ai" className="text-primary hover:underline">
                privacy@trendpulse.ai
              </a>.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
