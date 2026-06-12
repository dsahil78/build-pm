import { IS_PRELAUNCH } from "@/lib/constants";
import { Navbar } from "@/components/landing/Navbar";
import { TerminalHero } from "@/components/landing/TerminalHero";
import { EcosystemLoop } from "@/components/landing/EcosystemLoop";
import { BuilderValue } from "@/components/landing/BuilderValue";
import { ProductPreview } from "@/components/shared/ProductPreview";
import { ToolShelf } from "@/components/landing/ToolShelf";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { BuilderScores } from "@/components/landing/BuilderScores";
import { ForEnterprises } from "@/components/landing/ForEnterprises";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { ScrollDepthTracker } from "@/components/shared/ScrollDepthTracker";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* 1. Hero with live build log + live stats + CTA */}
        <TerminalHero />

        {/* 2. Ecosystem loop (replaces ThreeSides) */}
        <EcosystemLoop />

        {/* 3. Product preview — show the platform UI */}
        <ProductPreview />

        {/* 4. What builders get — Core/Supporting hierarchy */}
        <BuilderValue />

        {/* Post-launch sections */}
        {!IS_PRELAUNCH && <ToolShelf />}
        {!IS_PRELAUNCH && <HowItWorks />}
        {!IS_PRELAUNCH && <BuilderScores />}
        {!IS_PRELAUNCH && <ForEnterprises />}
        {!IS_PRELAUNCH && <Testimonials />}

        {/* Pre-apply FAQ — answers objections before the final CTA */}
        <FAQ />

        {/* 8. Final CTA */}
        <FinalCTA />
      </main>
      <Footer />
      <ScrollDepthTracker />
    </>
  );
}
