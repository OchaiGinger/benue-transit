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

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative selection:bg-[hsl(var(--green-accent))] selection:text-white">
      {/* Navbar sits at the top */}
      <Navigation />

      {/* Hero section */}
      <div id="home">
        <Hero />
      </div>

      <IntroSection />
      <div id="about">
        <AboutUs />
      </div>
      <div id="business">
        <BusinessTabs />
      </div>
      <div id="stats">
        <StatsSection />
      </div>

      <div id="team">
        <TeamSection />
      </div>
      <div id="partners">
        <PartnersSection />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
