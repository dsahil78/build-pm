import type { Metadata } from "next";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | build.pm",
  description: "Terms and conditions governing your use of build.pm.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-brand-dark pt-28 pb-20 px-4 sm:px-6">
        <article className="max-w-3xl mx-auto prose-invert">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Terms of Service
          </h1>
          <p className="text-grey-500 text-sm mb-12">
            Effective date: March 19, 2026 | Last reviewed: March 19, 2026
          </p>

          <Section title="1. Agreement to terms">
            <p>
              These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you
              (&quot;you&quot;, &quot;your&quot;, or &quot;User&quot;) and build.pm (&quot;build.pm&quot;,
              &quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) governing your access to
              and use of the website at{" "}
              <a href="https://build.pm" className="text-brand-coral hover:underline">
                https://build.pm
              </a>{" "}
              and all related services, features, content, and applications (collectively, the &quot;Service&quot;).
            </p>
            <p>
              By accessing or using the Service, you confirm that you have read, understood, and agree to be
              bound by these Terms and our{" "}
              <a href="/privacy" className="text-brand-coral hover:underline">
                Privacy Policy
              </a>
              , which is incorporated herein by reference. If you do not agree to these Terms, you must not
              access or use the Service.
            </p>
          </Section>

          <Section title="2. Description of service">
            <p>
              build.pm is a community platform for product managers to collaborate on real products, build
              public portfolios of their work, and connect with enterprises and career opportunities. The
              Service may include, without limitation: community features, build squads, builder profiles,
              project portfolios, enterprise tool access, learning cohorts, and job referrals.
            </p>
            <p>
              We reserve the right to modify, suspend, or discontinue any part of the Service at any time,
              with or without notice. We shall not be liable to you or any third party for any modification,
              suspension, or discontinuance of the Service.
            </p>
          </Section>

          <Section title="3. Eligibility">
            <p>
              You must be at least 16 years of age to use the Service. If you are between 16 and 18 years
              of age (or the age of legal majority in your jurisdiction), you may only use the Service with
              the consent of a parent or legal guardian who agrees to be bound by these Terms.
            </p>
            <p>
              By using the Service, you represent and warrant that: (a) you meet the age requirement;
              (b) you have the legal capacity to enter into these Terms; (c) you are not prohibited from
              using the Service under any applicable law; and (d) all information you provide is truthful
              and accurate.
            </p>
          </Section>

          <Section title="4. Accounts and registration">
            <p>
              Certain features of the Service may require you to apply for or create an account. When doing
              so, you agree to:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and promptly update your information to keep it accurate</li>
              <li>Maintain the security and confidentiality of your account credentials</li>
              <li>Accept responsibility for all activities that occur under your account</li>
              <li>Notify us immediately at{" "}
                <a href="mailto:support@build.pm" className="text-brand-coral hover:underline">
                  support@build.pm
                </a>{" "}
                if you suspect unauthorized use of your account</li>
            </ul>
            <p className="mt-3">
              We reserve the right to reject applications, suspend, or terminate accounts at our discretion,
              including for violation of these Terms.
            </p>
          </Section>

          <Section title="5. User content">
            <h3 className="text-lg font-semibold text-white mt-6 mb-3">5.1 Ownership</h3>
            <p>
              You retain all ownership rights in any content, materials, projects, build logs, documentation,
              and other information you submit, post, or display through the Service (&quot;User Content&quot;).
              build.pm does not claim ownership of your User Content.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">5.2 License grant</h3>
            <p>
              By submitting User Content to the Service, you grant build.pm a non-exclusive, worldwide,
              royalty-free, sublicensable, and transferable license to use, reproduce, display, distribute,
              and create derivative works of your User Content solely in connection with operating, providing,
              improving, and promoting the Service. This license continues until you remove your User Content
              or your account is terminated, except that copies made for backup, archival, or legal purposes
              may be retained.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">5.3 Your responsibilities</h3>
            <p>You represent and warrant that your User Content:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Is original to you or you have all necessary rights and permissions to share it</li>
              <li>Does not infringe any third party&apos;s intellectual property, privacy, or other rights</li>
              <li>Does not contain confidential or proprietary information of any employer or third party without authorization</li>
              <li>Does not violate any applicable law, regulation, or these Terms</li>
            </ul>
            <p className="mt-3">
              You are solely responsible for your User Content. We may, but are not obligated to, review,
              monitor, or remove User Content at our discretion.
            </p>
          </Section>

          <Section title="6. Acceptable use">
            <p>You agree not to use the Service to:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Violate any applicable law, regulation, or third-party rights</li>
              <li>Submit false, misleading, or fraudulent information</li>
              <li>Impersonate any person or entity, or falsely state or misrepresent your affiliation</li>
              <li>Harass, bully, intimidate, threaten, or harm other users or community members</li>
              <li>Post content that is defamatory, obscene, hateful, discriminatory, or promotes violence</li>
              <li>Attempt to gain unauthorized access to any part of the Service, other accounts, or connected systems</li>
              <li>Interfere with, disrupt, or place an undue burden on the Service or its infrastructure</li>
              <li>Use automated means (bots, scrapers, crawlers) to access or collect data from the Service without our prior written consent</li>
              <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
              <li>Use the Service for competitive intelligence or to build a competing product</li>
              <li>Transmit viruses, malware, or any other harmful or destructive code</li>
              <li>Circumvent, disable, or interfere with security features of the Service</li>
              <li>Spam, solicit, or send unsolicited communications to other users</li>
            </ul>
            <p className="mt-3">
              We reserve the right to investigate and take appropriate action against violations, including
              suspending or terminating your access and reporting to law enforcement if warranted.
            </p>
          </Section>

          <Section title="7. Intellectual property">
            <p>
              The Service and its original content (excluding User Content), features, functionality, design,
              graphics, trademarks, service marks, and logos are and shall remain the exclusive property of
              build.pm and its licensors. The Service is protected by copyright, trademark, trade dress,
              patent, and other intellectual property laws.
            </p>
            <p>
              Nothing in these Terms grants you any right, title, or interest in the Service or our
              intellectual property except for the limited right to use the Service in accordance with these Terms.
            </p>
          </Section>

          <Section title="8. Third-party tools and services">
            <p>
              The Service may provide access to third-party tools, software, and services through enterprise
              partnerships. These third-party offerings are provided &quot;as is&quot; and are governed by their
              own respective terms of service and privacy policies.
            </p>
            <p>
              build.pm is not responsible for: (a) the availability, accuracy, or quality of third-party
              services; (b) any loss or damage arising from your use of third-party services; or (c) the
              privacy practices or terms of third-party providers. Your use of third-party tools is at your
              own risk.
            </p>
          </Section>

          <Section title="9. Early access and beta features">
            <p>
              Certain features of the Service may be designated as &quot;early access&quot;, &quot;beta&quot;,
              or &quot;preview&quot;. These features are provided for evaluation purposes and may be incomplete,
              contain bugs, or change significantly. We make no guarantees regarding the availability,
              reliability, or continuity of early access features.
            </p>
            <p>
              By participating in early access programs, you agree to provide constructive feedback when
              requested and understand that features may be modified or removed without notice.
            </p>
          </Section>

          <Section title="10. Confidentiality">
            <p>
              During your use of the Service, you may receive non-public information about build.pm, its
              roadmap, features in development, or other users (&quot;Confidential Information&quot;). You
              agree not to disclose Confidential Information to any third party without our prior written
              consent. This obligation does not apply to information that: (a) is or becomes publicly
              available without breach of these Terms; (b) you independently develop without reference to
              Confidential Information; or (c) is required to be disclosed by law.
            </p>
          </Section>

          <Section title="11. Disclaimers">
            <p className="uppercase text-xs tracking-wider text-grey-400 mb-3">
              PLEASE READ THIS SECTION CAREFULLY
            </p>
            <p>
              THE SERVICE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT
              WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE. TO THE FULLEST
              EXTENT PERMITTED BY APPLICABLE LAW, BUILD.PM DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT
              LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
              NON-INFRINGEMENT, AND TITLE.
            </p>
            <p>
              WITHOUT LIMITING THE FOREGOING, WE DO NOT WARRANT THAT: (A) THE SERVICE WILL BE
              UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE; (B) THE RESULTS OBTAINED FROM THE SERVICE WILL
              BE ACCURATE OR RELIABLE; (C) ANY DEFECTS WILL BE CORRECTED; OR (D) THE SERVICE WILL MEET YOUR
              REQUIREMENTS OR EXPECTATIONS.
            </p>
            <p>
              BUILD.PM DOES NOT GUARANTEE EMPLOYMENT, JOB PLACEMENT, CAREER ADVANCEMENT, OR ANY PARTICULAR
              OUTCOME FROM YOUR USE OF THE SERVICE. REFERENCES TO &quot;GETTING HIRED&quot; OR &quot;CAREER
              FLYWHEEL&quot; ARE DESCRIPTIONS OF COMMUNITY BENEFITS, NOT PROMISES OF RESULTS.
            </p>
          </Section>

          <Section title="12. Limitation of liability">
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL BUILD.PM, ITS DIRECTORS,
              OFFICERS, EMPLOYEES, AGENTS, PARTNERS, SUPPLIERS, OR LICENSORS BE LIABLE FOR ANY:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Indirect, incidental, special, consequential, exemplary, or punitive damages</li>
              <li>Loss of profits, revenue, data, goodwill, or business opportunities</li>
              <li>Cost of procurement of substitute goods or services</li>
              <li>Damages arising from your use of or inability to use the Service</li>
              <li>Damages arising from User Content or conduct of any third party on the Service</li>
            </ul>
            <p className="mt-3">
              WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY, OR ANY
              OTHER LEGAL THEORY, AND WHETHER OR NOT WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </p>
            <p>
              IN JURISDICTIONS THAT DO NOT ALLOW THE EXCLUSION OR LIMITATION OF LIABILITY FOR CONSEQUENTIAL
              OR INCIDENTAL DAMAGES, OUR LIABILITY IS LIMITED TO THE GREATEST EXTENT PERMITTED BY LAW. IN
              NO EVENT SHALL OUR TOTAL AGGREGATE LIABILITY EXCEED THE AMOUNT YOU PAID US (IF ANY) IN THE 12
              MONTHS PRECEDING THE EVENT GIVING RISE TO THE CLAIM, OR $100 USD, WHICHEVER IS GREATER.
            </p>
          </Section>

          <Section title="13. Indemnification">
            <p>
              You agree to indemnify, defend, and hold harmless build.pm and its directors, officers,
              employees, agents, and affiliates from and against any and all claims, damages, losses,
              liabilities, costs, and expenses (including reasonable attorneys&apos; fees) arising out of
              or related to: (a) your use of the Service; (b) your User Content; (c) your violation of
              these Terms; (d) your violation of any third-party rights; or (e) any claim that your User
              Content caused damage to a third party.
            </p>
          </Section>

          <Section title="14. Termination">
            <p>
              <strong className="text-white">By you:</strong> You may stop using the Service at any time. To
              delete your account and data, email{" "}
              <a href="mailto:support@build.pm" className="text-brand-coral hover:underline">
                support@build.pm
              </a>.
            </p>
            <p>
              <strong className="text-white">By us:</strong> We may suspend or terminate your access to the
              Service immediately, without prior notice or liability, for any reason, including if you
              breach these Terms. Upon termination, your right to use the Service ceases immediately.
            </p>
            <p>
              <strong className="text-white">Survival:</strong> Sections 5.2 (License Grant), 6 (Acceptable
              Use), 7 (Intellectual Property), 10 (Confidentiality), 11 (Disclaimers), 12 (Limitation of
              Liability), 13 (Indemnification), 15 (Dispute Resolution), and 16 (Governing Law) shall
              survive any termination or expiration of these Terms.
            </p>
          </Section>

          <Section title="15. Dispute resolution">
            <p>
              <strong className="text-white">Informal resolution first:</strong> Before filing any formal
              legal action, you agree to contact us at{" "}
              <a href="mailto:legal@build.pm" className="text-brand-coral hover:underline">
                legal@build.pm
              </a>{" "}
              and attempt to resolve the dispute informally for at least 30 days.
            </p>
            <p>
              <strong className="text-white">Binding arbitration:</strong> If the dispute is not resolved
              informally, you and build.pm agree to resolve it through final and binding arbitration
              administered by a mutually agreed-upon arbitration provider, in accordance with its rules then
              in effect. The arbitration shall be conducted in English. The arbitrator&apos;s decision shall
              be final and binding, and judgment on the award may be entered in any court of competent
              jurisdiction.
            </p>
            <p>
              <strong className="text-white">Class action waiver:</strong> YOU AND BUILD.PM AGREE THAT EACH
              PARTY MAY ONLY BRING CLAIMS AGAINST THE OTHER IN YOUR OR ITS INDIVIDUAL CAPACITY, AND NOT AS
              A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS, CONSOLIDATED, OR REPRESENTATIVE ACTION.
            </p>
            <p>
              <strong className="text-white">Exceptions:</strong> Either party may seek injunctive or
              equitable relief in a court of competent jurisdiction for claims related to intellectual
              property infringement or unauthorized access to the Service.
            </p>
          </Section>

          <Section title="16. Governing law">
            <p>
              These Terms and any disputes arising out of or in connection with them shall be governed by
              and construed in accordance with the laws of the State of Delaware, United States, without
              regard to its conflict of law provisions. To the extent that arbitration does not apply, you
              consent to the exclusive jurisdiction and venue of the state and federal courts located in
              Delaware.
            </p>
            <p>
              If you are located in the European Economic Area, the mandatory consumer protection laws of
              your country of residence shall apply to the extent they override the foregoing choice of law.
              Nothing in these Terms affects your rights as a consumer under applicable local law.
            </p>
          </Section>

          <Section title="17. General provisions">
            <ul className="list-disc pl-5 space-y-3">
              <li>
                <strong className="text-white">Entire agreement:</strong> These Terms, together with our
                Privacy Policy, constitute the entire agreement between you and build.pm regarding the
                Service and supersede all prior or contemporaneous agreements, representations, and
                understandings.
              </li>
              <li>
                <strong className="text-white">Severability:</strong> If any provision of these Terms is held
                to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full
                force and effect. The invalid provision shall be modified to the minimum extent necessary to
                make it valid and enforceable.
              </li>
              <li>
                <strong className="text-white">Waiver:</strong> Our failure to enforce any right or provision
                of these Terms shall not constitute a waiver of that right or provision. Any waiver must be
                in writing and signed by build.pm.
              </li>
              <li>
                <strong className="text-white">Assignment:</strong> You may not assign or transfer these Terms
                or your rights hereunder without our prior written consent. We may assign these Terms without
                restriction, including in connection with a merger, acquisition, or sale of assets.
              </li>
              <li>
                <strong className="text-white">Force majeure:</strong> We shall not be liable for any failure
                or delay in performance due to circumstances beyond our reasonable control, including natural
                disasters, war, terrorism, pandemics, government actions, power failures, internet
                disruptions, or third-party service outages.
              </li>
              <li>
                <strong className="text-white">Notices:</strong> We may provide notices to you via email, the
                Service, or posted on our website. Notices to us should be sent to{" "}
                <a href="mailto:legal@build.pm" className="text-brand-coral hover:underline">
                  legal@build.pm
                </a>.
              </li>
              <li>
                <strong className="text-white">Headings:</strong> Section headings are for convenience only
                and do not affect the interpretation of these Terms.
              </li>
            </ul>
          </Section>

          <Section title="18. Contact us">
            <p>
              If you have questions or concerns about these Terms, please contact us at:
            </p>
            <ul className="list-none pl-0 space-y-1 mt-3">
              <li>
                Legal:{" "}
                <a href="mailto:legal@build.pm" className="text-brand-coral hover:underline">
                  legal@build.pm
                </a>
              </li>
              <li>
                Support:{" "}
                <a href="mailto:support@build.pm" className="text-brand-coral hover:underline">
                  support@build.pm
                </a>
              </li>
              <li>
                General:{" "}
                <a href="mailto:hello@build.pm" className="text-brand-coral hover:underline">
                  hello@build.pm
                </a>
              </li>
            </ul>
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
      <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
      <div className="text-grey-300 text-[15px] leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  );
}
