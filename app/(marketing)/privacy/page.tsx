import type { Metadata } from "next";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How BuildPM collects, uses, stores, and protects your personal data.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen bg-background pt-28 pb-20 px-4 sm:px-6">
        <article className="max-w-3xl mx-auto prose-invert">
          <h1 className="text-h2 text-foreground mb-2">
            Privacy Policy
          </h1>
          <p className="text-subtle-foreground text-sm mb-12">
            Effective date: March 19, 2026 | Last reviewed: March 19, 2026
          </p>

          <Section title="1. Introduction and scope">
            <p>
              BuildPM (&quot;BuildPM&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates
              the website located at{" "}
              <a href="https://buildpm.co" className="text-accent-text hover:underline">
                https://buildpm.co
              </a>{" "}
              and any associated subdomains, applications, and services (collectively, the &quot;Service&quot;).
            </p>
            <p>
              This Privacy Policy describes how we collect, use, store, share, and protect your personal
              information when you visit or use the Service. It applies to all visitors, users, applicants,
              and partners (&quot;you&quot; or &quot;your&quot;).
            </p>
            <p>
              By accessing or using the Service, you acknowledge that you have read and understood this
              Privacy Policy. If you do not agree with our practices, please do not use the Service.
            </p>
          </Section>

          <Section title="2. Data controller">
            <p>
              For the purposes of the EU General Data Protection Regulation (&quot;GDPR&quot;), the UK GDPR,
              and other applicable data protection laws, BuildPM is the data controller responsible for
              your personal data. You can contact us at{" "}
              <a href="mailto:privacy@buildpm.co" className="text-accent-text hover:underline">
                privacy@buildpm.co
              </a>.
            </p>
          </Section>

          <Section title="3. Personal data we collect">
            <h3 className="text-h4 text-foreground mt-6 mb-3">
              3.1 Information you provide directly
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-foreground">Waitlist and newsletter sign-up:</strong> email address and submission source
              </li>
              <li>
                <strong className="text-foreground">Builder application:</strong> full name, email address, LinkedIn profile URL,
                current role, experience level, areas of interest, and free-text responses
              </li>
              <li>
                <strong className="text-foreground">Partner application:</strong> company name, contact name, email address,
                partnership tier preference, and description of interest
              </li>
              <li>
                <strong className="text-foreground">Communications:</strong> any information you provide when you email us or
                submit a support request
              </li>
            </ul>

            <h3 className="text-h4 text-foreground mt-6 mb-3">
              3.2 Information collected automatically
            </h3>
            <p>
              When you consent to analytics (see Section 5), we collect the following through{" "}
              <a href="https://posthog.com" target="_blank" rel="noopener noreferrer" className="text-accent-text hover:underline">
                PostHog
              </a>
              , Microsoft Clarity, and Vercel Analytics:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Pages visited, time on page, and navigation paths</li>
              <li>Interactions such as clicks, scroll depth, and form engagements</li>
              <li>Device type, operating system, browser type and version, and screen resolution</li>
              <li>Approximate geographic location (country and city level, derived from IP address. We do not store raw IP addresses.)</li>
              <li>Referrer URL, landing page, and UTM campaign parameters</li>
              <li>Session recordings with all form inputs automatically masked</li>
            </ul>

            <h3 className="text-h4 text-foreground mt-6 mb-3">
              3.3 Anonymous usage analytics (cookieless)
            </h3>
            <p>
              To understand how the site is used and to improve it, we collect anonymous, aggregate
              usage data from visitors on the basis of our legitimate interests (Art. 6(1)(f)). This
              uses no cookies, does not identify you, and is never sold or used for advertising. It is
              disabled if your browser sends a Do Not Track or Global Privacy Control signal.
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Pages viewed, time on page, scroll depth, sections viewed, and clicks on links and buttons</li>
              <li>Approximate location (country, region, city) derived from your IP address by our hosting provider. We do not store your raw IP address.</li>
              <li>Coarse device and browser context</li>
              <li>Small amounts of anonymous, cookieless data kept in your browser to group a single visit and to measure whether visitors return to finish a form. This holds no personal data and is short-lived (cleared when you close the tab, or within about 30 days).</li>
            </ul>

            <h3 className="text-h4 text-foreground mt-6 mb-3">
              3.4 Information collected when you submit a form
            </h3>
            <p>
              When you submit a form (waitlist, application, or partner enquiry), we record limited
              technical and attribution context alongside your submission to understand which
              channels bring builders to BuildPM, to prevent fraud and abuse, and to improve the
              Service. We rely on our legitimate interests (Art. 6(1)(f)) for this first-party
              processing:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Marketing attribution: the referring website, landing page, campaign parameters, and ad click identifiers present when you arrived</li>
              <li>Approximate location (country, region, city) derived from your IP address by our hosting provider. We do not store your raw IP address.</li>
              <li>Coarse device, browser, language, and time-zone context</li>
            </ul>
            <p className="mt-3">
              Additional device and browser characteristics are collected only if you have accepted
              analytics cookies.
            </p>

            <h3 className="text-h4 text-foreground mt-6 mb-3">
              3.5 Information we do NOT collect
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Payment or financial information (we do not process payments)</li>
              <li>Government-issued identification numbers</li>
              <li>Precise geolocation or GPS data</li>
              <li>Biometric data</li>
              <li>Data from minors under 16 (see Section 12)</li>
            </ul>
          </Section>

          <Section title="4. Legal bases for processing (GDPR)">
            <p>We process your personal data under the following legal bases:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>
                <strong className="text-foreground">Consent (Art. 6(1)(a)):</strong> analytics cookies and session recordings are only
                activated after you affirmatively consent via our cookie banner
              </li>
              <li>
                <strong className="text-foreground">Contract performance (Art. 6(1)(b)):</strong> processing your application or
                waitlist sign-up to provide the Service you requested
              </li>
              <li>
                <strong className="text-foreground">Legitimate interests (Art. 6(1)(f)):</strong> improving our Service, preventing
                fraud and abuse, and ensuring security. We balance these interests against your rights and
                do not use this basis for marketing
              </li>
              <li>
                <strong className="text-foreground">Legal obligation (Art. 6(1)(c)):</strong> where we are required by law to retain
                or disclose data
              </li>
            </ul>
          </Section>

          <Section title="5. Cookies, local storage, and tracking">
            <p>
              <strong className="text-foreground">
                No cookie-based or individually identifying analytics are collected until you
                affirmatively accept cookies.
              </strong>{" "}
              If you decline, PostHog and Microsoft Clarity stay fully disabled. We do run the
              anonymous, cookieless usage analytics described in Section 3.3, which do not identify
              you. We honor the Do Not Track (DNT) and Global Privacy Control signals, which disable
              all analytics, including the cookieless kind.
            </p>

            <h3 className="text-h4 text-foreground mt-6 mb-3">Cookie inventory</h3>
            <div className="overflow-x-auto mt-3">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border-base">
                    <th className="text-left py-2 pr-4 text-muted-foreground font-medium">Name</th>
                    <th className="text-left py-2 pr-4 text-muted-foreground font-medium">Type</th>
                    <th className="text-left py-2 pr-4 text-muted-foreground font-medium">Purpose</th>
                    <th className="text-left py-2 text-muted-foreground font-medium">Duration</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border-base">
                    <td className="py-2 pr-4 font-mono text-xs">ph_*</td>
                    <td className="py-2 pr-4">Analytics</td>
                    <td className="py-2 pr-4">PostHog anonymous visitor ID and session tracking</td>
                    <td className="py-2">1 year</td>
                  </tr>
                  <tr className="border-b border-border-base">
                    <td className="py-2 pr-4 font-mono text-xs">_clck, _clsk</td>
                    <td className="py-2 pr-4">Analytics</td>
                    <td className="py-2 pr-4">Microsoft Clarity heatmaps and session replay (only after you accept cookies)</td>
                    <td className="py-2">Up to 1 year</td>
                  </tr>
                  <tr className="border-b border-border-base">
                    <td className="py-2 pr-4 font-mono text-xs">cookie_consent</td>
                    <td className="py-2 pr-4">Functional</td>
                    <td className="py-2 pr-4">Stores your cookie consent preference (localStorage)</td>
                    <td className="py-2">Persistent</td>
                  </tr>
                  <tr className="border-b border-border-base">
                    <td className="py-2 pr-4">First-party analytics storage</td>
                    <td className="py-2 pr-4">Analytics (anonymous, first-party)</td>
                    <td className="py-2 pr-4">Anonymous, cookieless browser storage used to measure visits and improve the site. No personal data.</td>
                    <td className="py-2">Session to ~30 days</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4">
              We do not use third-party advertising cookies, cross-site tracking pixels, or fingerprinting
              techniques. We do not share data with advertising networks.
            </p>
          </Section>

          <Section title="6. How we use your data">
            <ul className="list-disc pl-5 space-y-2">
              <li>To process and respond to your waitlist sign-up, application, or inquiry</li>
              <li>To communicate with you about your application status and Service updates</li>
              <li>To provide, maintain, and improve the Service</li>
              <li>To understand usage patterns and optimize user experience (only with consent)</li>
              <li>To detect, prevent, and address fraud, abuse, or technical issues</li>
              <li>To comply with legal obligations and enforce our Terms of Service</li>
            </ul>
            <p className="mt-3">
              We do not use your personal data for automated decision-making or profiling that produces
              legal or similarly significant effects.
            </p>
          </Section>

          <Section title="7. Data sharing and sub-processors">
            <p>
              We do not sell, rent, or trade your personal data. We share data only with the following
              categories of service providers (&quot;sub-processors&quot;) who process data on our behalf
              under written agreements:
            </p>
            <div className="overflow-x-auto mt-3">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border-base">
                    <th className="text-left py-2 pr-4 text-muted-foreground font-medium">Provider</th>
                    <th className="text-left py-2 pr-4 text-muted-foreground font-medium">Purpose</th>
                    <th className="text-left py-2 text-muted-foreground font-medium">Location</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border-base">
                    <td className="py-2 pr-4">Supabase</td>
                    <td className="py-2 pr-4">Database (form submissions, applications)</td>
                    <td className="py-2">EU (North Europe, Sweden)</td>
                  </tr>
                  <tr className="border-b border-border-base">
                    <td className="py-2 pr-4">PostHog</td>
                    <td className="py-2 pr-4">Product analytics and session recordings</td>
                    <td className="py-2">US (EU processing available)</td>
                  </tr>
                  <tr className="border-b border-border-base">
                    <td className="py-2 pr-4">Microsoft Clarity</td>
                    <td className="py-2 pr-4">Heatmaps and session replay (after consent)</td>
                    <td className="py-2">US</td>
                  </tr>
                  <tr className="border-b border-border-base">
                    <td className="py-2 pr-4">Vercel</td>
                    <td className="py-2 pr-4">Website hosting and performance analytics</td>
                    <td className="py-2">US (global edge)</td>
                  </tr>
                  <tr className="border-b border-border-base">
                    <td className="py-2 pr-4">Resend</td>
                    <td className="py-2 pr-4">Transactional email (application confirmations)</td>
                    <td className="py-2">US</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3">
              We may also disclose data if required by law, court order, or governmental authority, or if
              necessary to protect the rights, property, or safety of BuildPM, our users, or the public.
            </p>
          </Section>

          <Section title="8. International data transfers">
            <p>
              Your data may be transferred to and processed in countries outside your jurisdiction,
              including the United States. Where we transfer data outside the EEA or UK, we rely on:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>EU-US Data Privacy Framework (where the recipient is certified)</li>
              <li>Standard Contractual Clauses (SCCs) approved by the European Commission</li>
              <li>Your explicit consent, where applicable</li>
            </ul>
            <p className="mt-3">
              You may request a copy of the applicable transfer safeguards by contacting us at{" "}
              <a href="mailto:privacy@buildpm.co" className="text-accent-text hover:underline">
                privacy@buildpm.co
              </a>.
            </p>
          </Section>

          <Section title="9. Data retention">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-foreground">Application and waitlist data:</strong> retained for as long as your application
                or account is active, plus 12 months after the last interaction, unless you request earlier deletion
              </li>
              <li>
                <strong className="text-foreground">Analytics data:</strong> retained for 12 months from the date of collection, then
                automatically deleted or anonymized
              </li>
              <li>
                <strong className="text-foreground">Cookie consent preferences:</strong> retained in your browser localStorage until
                you clear it or change your preference
              </li>
              <li>
                <strong className="text-foreground">Communications:</strong> retained for 24 months for support and audit purposes
              </li>
            </ul>
            <p className="mt-3">
              When data is no longer needed, we securely delete or irreversibly anonymize it.
            </p>
          </Section>

          <Section title="10. Your privacy rights">
            <h3 className="text-h4 text-foreground mt-6 mb-3">
              10.1 Rights under GDPR (EEA and UK residents)
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-foreground">Right of access (Art. 15):</strong> obtain a copy of your personal data</li>
              <li><strong className="text-foreground">Right to rectification (Art. 16):</strong> correct inaccurate or incomplete data</li>
              <li><strong className="text-foreground">Right to erasure (Art. 17):</strong> request deletion of your data (&quot;right to be forgotten&quot;)</li>
              <li><strong className="text-foreground">Right to restrict processing (Art. 18):</strong> limit how we use your data</li>
              <li><strong className="text-foreground">Right to data portability (Art. 20):</strong> receive your data in a structured, machine-readable format</li>
              <li><strong className="text-foreground">Right to object (Art. 21):</strong> object to processing based on legitimate interests</li>
              <li><strong className="text-foreground">Right to withdraw consent:</strong> withdraw consent at any time by changing your cookie preference or contacting us. Withdrawal does not affect the lawfulness of processing before withdrawal.</li>
            </ul>
            <p className="mt-3">
              You also have the right to lodge a complaint with your local supervisory authority (e.g., the
              ICO in the UK, CNIL in France, or your national DPA).
            </p>

            <h3 className="text-h4 text-foreground mt-6 mb-3">
              10.2 Rights under CCPA/CPRA (California residents)
            </h3>
            <p>If you are a California resident, you have the right to:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li><strong className="text-foreground">Know</strong> what personal information we collect and how it is used</li>
              <li><strong className="text-foreground">Delete</strong> your personal information, subject to certain exceptions</li>
              <li><strong className="text-foreground">Opt out</strong> of the sale or sharing of personal information. We do not sell or share personal information as defined by the CCPA/CPRA.</li>
              <li><strong className="text-foreground">Non-discrimination:</strong> we will not discriminate against you for exercising your rights</li>
            </ul>
            <p className="mt-3">
              In the preceding 12 months, we have not sold personal information. We do not use sensitive
              personal information for purposes beyond those permitted by the CPRA.
            </p>

            <h3 className="text-h4 text-foreground mt-6 mb-3">
              10.3 How to exercise your rights
            </h3>
            <p>
              To exercise any of the above rights, email{" "}
              <a href="mailto:privacy@buildpm.co" className="text-accent-text hover:underline">
                privacy@buildpm.co
              </a>{" "}
              with the subject line &quot;Privacy Rights Request&quot;. We will verify your identity and
              respond within 30 days (or sooner if required by applicable law). If we need additional
              time, we will inform you of the reason and extension period.
            </p>
          </Section>

          <Section title="11. Data security">
            <p>
              We implement appropriate technical and organizational measures to protect your personal data
              against unauthorized access, alteration, disclosure, or destruction. These include:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Encryption in transit (TLS 1.2+) and at rest</li>
              <li>Access controls and least-privilege principles for internal systems</li>
              <li>Regular security reviews of our sub-processors</li>
              <li>Automatic masking of form inputs in session recordings</li>
            </ul>
            <p className="mt-3">
              No method of transmission or storage is 100% secure. While we strive to protect your data,
              we cannot guarantee absolute security. In the event of a data breach affecting your personal
              data, we will notify you and the relevant supervisory authority as required by applicable law.
            </p>
          </Section>

          <Section title="12. Children's privacy">
            <p>
              The Service is not directed to individuals under 16 years of age. We do not knowingly
              collect personal data from children under 16. If we learn that we have collected data from a
              child under 16, we will promptly delete it. If you believe we have inadvertently collected
              such data, please contact us at{" "}
              <a href="mailto:privacy@buildpm.co" className="text-accent-text hover:underline">
                privacy@buildpm.co
              </a>.
            </p>
          </Section>

          <Section title="13. Third-party links">
            <p>
              The Service may contain links to third-party websites or services (e.g., LinkedIn, partner
              tools). We are not responsible for the privacy practices of these third parties. We encourage
              you to review their privacy policies before providing any personal data.
            </p>
          </Section>

          <Section title="14. Changes to this policy">
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices,
              technology, legal requirements, or other factors. When we make material changes, we will:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Update the &quot;Effective date&quot; and &quot;Last reviewed&quot; dates at the top</li>
              <li>Provide notice via the Service (e.g., a banner or email notification for material changes)</li>
            </ul>
            <p className="mt-3">
              Your continued use of the Service after the effective date of changes constitutes acceptance
              of the updated policy. If you do not agree with the changes, you should stop using the Service
              and request deletion of your data.
            </p>
          </Section>

          <Section title="15. Contact us">
            <p>
              If you have questions, concerns, or requests regarding this Privacy Policy or our data
              practices, contact us at:
            </p>
            <ul className="list-none pl-0 space-y-1 mt-3">
              <li>
                Email:{" "}
                <a href="mailto:privacy@buildpm.co" className="text-accent-text hover:underline">
                  privacy@buildpm.co
                </a>
              </li>
              <li>
                General inquiries:{" "}
                <a href="mailto:hello@buildpm.co" className="text-accent-text hover:underline">
                  hello@buildpm.co
                </a>
              </li>
            </ul>
            <p className="mt-3">
              We aim to respond to all privacy-related inquiries within 5 business days.
            </p>
          </Section>
        </article>
      </main>
      <Footer />
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="text-h4 text-foreground mb-4">{title}</h2>
      <div className="text-muted-foreground text-[15px] leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  );
}
