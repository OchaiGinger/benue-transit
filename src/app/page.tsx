import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { IntroSection } from "@/components/IntroSection";
import { AboutUs } from "@/components/AboutUs";
import { BusinessTabs } from "@/components/BusinessTab";
import { StatsSection } from "@/components/StatSection";
import { TeamSection } from "@/components/Team";
import { PartnersSection } from "@/components/PartnershipSection";
import { Contact } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { HowItWorks } from "@/components/HowItWorks";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative selection:bg-[hsl(var(--green-accent))] selection:text-white">
      {/* Navbar sits at the top */}
      <Navigation />

      {/* Hero section */}
      <div id="home" className="scroll-mt-16 md:scroll-mt-20">
        <Hero />
      </div>

      <IntroSection />

      <div id="about" className="scroll-mt-20 md:scroll-mt-24">
        <AboutUs />
      </div>
      <div>
        <HowItWorks />
      </div>
      <div id="business" className="scroll-mt-20 md:scroll-mt-24">
        <BusinessTabs />
      </div>
      <div id="stats" className="scroll-mt-20 md:scroll-mt-24">
        <StatsSection />
      </div>

      <div id="team" className="scroll-mt-20 md:scroll-mt-24">
        <TeamSection />
      </div>
      <div id="partners" className="scroll-mt-20 md:scroll-mt-24">
        <PartnersSection />
      </div>
      <div id="contact" className="scroll-mt-20 md:scroll-mt-24">
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
