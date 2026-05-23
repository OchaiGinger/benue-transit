"use client";

import { useState, useEffect, useRef } from "react";
import {
  Target,
  Eye,
  Rocket,
  Map,
  Database,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Users,
} from "lucide-react";

export const AboutUs = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isCompanyVisible, setIsCompanyVisible] = useState(false);
  const [isVisionVisible, setIsVisionVisible] = useState(false);
  const [isMissionVisible, setIsMissionVisible] = useState(false);

  const headerRef = useRef(null);
  const companyRef = useRef(null);
  const visionRef = useRef(null);
  const missionRef = useRef(null);

  useEffect(() => {
    const observerOptions = { threshold: 0.2, rootMargin: "0px" };
    const observerCallback = (setter) => (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) setter(true);
      });

    const headerObserver = new IntersectionObserver(
      observerCallback(setIsHeaderVisible),
      observerOptions,
    );
    const companyObserver = new IntersectionObserver(
      observerCallback(setIsCompanyVisible),
      observerOptions,
    );
    const visionObserver = new IntersectionObserver(
      observerCallback(setIsVisionVisible),
      observerOptions,
    );
    const missionObserver = new IntersectionObserver(
      observerCallback(setIsMissionVisible),
      observerOptions,
    );

    if (headerRef.current) headerObserver.observe(headerRef.current);
    if (companyRef.current) companyObserver.observe(companyRef.current);
    if (visionRef.current) visionObserver.observe(visionRef.current);
    if (missionRef.current) missionObserver.observe(missionRef.current);

    return () => {
      if (headerRef.current) headerObserver.unobserve(headerRef.current);
      if (companyRef.current) companyObserver.unobserve(companyRef.current);
      if (visionRef.current) visionObserver.unobserve(visionRef.current);
      if (missionRef.current) missionObserver.unobserve(missionRef.current);
    };
  }, []);

  return (
    <section className="overflow-hidden" id="about">
      {/* Hero Header */}
      <div
        ref={headerRef}
        className="relative py-20 lg:py-28 bg-gradient-to-br overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(to bottom right, #0D1F1A, #1A3D34)",
        }}
      >
        <div className="absolute top-10 right-10 w-64 h-64 bg-[hsl(var(--green-light))]/10 rounded-full blur-3xl animate-float">
          sss
        </div>
        <div
          className="absolute bottom-10 left-10 w-96 h-96 bg-[hsl(var(--orange))]/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div
            className={`text-center max-w-4xl mx-auto transition-all duration-1000 ${
              isHeaderVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-[hsl(var(--orange))]/20 backdrop-blur-sm rounded-full mb-6">
              <Map className="w-5 h-5 text-[hsl(var(--orange))]" />
              <span className="text-white font-semibold">
                Digital Transit Intelligence
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              About Benutraa
            </h1>
            <div className="w-24 h-1 bg-[hsl(var(--orange))] mx-auto mb-6"></div>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Pioneering modern, data-driven transport infrastructure and
              logistics management for Benue State.
            </p>
          </div>
        </div>
      </div>

      {/* Company Overview Section */}
      <div ref={companyRef} className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div
              className={`transition-all duration-1000 ease-out ${
                isCompanyVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-20"
              }`}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-[hsl(var(--green-accent))]/20 to-[hsl(var(--orange))]/20 rounded-3xl blur-2xl"></div>
                <div className="relative bg-gradient-to-br from-[hsl(var(--green-accent))] to-[hsl(var(--green-light))] rounded-3xl p-12 text-white">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="text-center">
                      <Database className="w-12 h-12 mx-auto mb-3" />
                      <div className="text-3xl font-bold mb-1">84k+</div>
                      <div className="text-sm opacity-90">Data Points</div>
                    </div>
                    <div className="text-center">
                      <Users className="w-12 h-12 mx-auto mb-3" />
                      <div className="text-3xl font-bold mb-1">120+</div>
                      <div className="text-sm opacity-90">Transit Routes</div>
                    </div>
                    <div className="text-center">
                      <Rocket className="w-12 h-12 mx-auto mb-3" />
                      <div className="text-3xl font-bold mb-1">24/7</div>
                      <div className="text-sm opacity-90">System Uptime</div>
                    </div>
                    <div className="text-center">
                      <Cpu className="w-12 h-12 mx-auto mb-3" />
                      <div className="text-3xl font-bold mb-1">AI-Powered</div>
                      <div className="text-sm opacity-90">Analytics</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`transition-all duration-1000 delay-200 ease-out ${
                isCompanyVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-20"
              }`}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(var(--green-light))]/30 rounded-full mb-4">
                <div className="w-2 h-2 bg-[hsl(var(--green-accent))] rounded-full animate-pulse"></div>
                <span className="text-[hsl(var(--green-accent))] font-semibold text-sm">
                  OUR PLATFORM
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
                Modernizing Logistics through Intelligence
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Benutraanced digital initiative dedicated to transforming how
                transport and logistics function within Benue State. We bridge
                the gap between traditional transit systems and smart, scalable
                digital solutions.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                By integrating real-time analytics with robust infrastructure
                management, we ensure safer, faster, and more transparent travel
                for everyone in the state.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div
        ref={visionRef}
        className="py-16 lg:py-24 bg-[hsl(var(--section-bg))]"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div
              className={`order-2 lg:order-1 transition-all duration-1000 ease-out ${
                isVisionVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-20"
              }`}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(var(--orange))]/20 rounded-full mb-4">
                <Eye className="w-4 h-4 text-[hsl(var(--orange))]" />
                <span className="text-[hsl(var(--orange))] font-semibold text-sm">
                  OUR VISION
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
                Setting the Benchmark for Digital Transit
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Our vision is to become the primary catalyst for a
                  tech-enabled transport ecosystem in Nigeria. We aim to foster
                  a seamless environment where infrastructure and technology
                  work in harmony to drive regional prosperity.
                </p>
                <p>
                  We see a future where every commuter and transit operator in
                  Benue enjoys safe, efficient, and technology-backed mobility.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-[hsl(var(--green-light))] rounded-lg flex items-center justify-center mb-3">
                    <TrendingUp className="w-5 h-5 text-[hsl(var(--green-accent))]" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Connectivity
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Seamless transit flows
                  </p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-[hsl(var(--orange))]/20 rounded-lg flex items-center justify-center mb-3">
                    <Target className="w-5 h-5 text-[hsl(var(--orange))]" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Efficiency
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Smart route optimization
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`order-1 lg:order-2 transition-all duration-1000 delay-200 ease-out ${
                isVisionVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-20"
              }`}
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-br from-[hsl(var(--orange))]/30 to-[hsl(var(--green-accent))]/30 rounded-[3rem] blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                <div className="relative bg-gradient-to-br from-[hsl(var(--orange))] to-[hsl(var(--orange-hover))] rounded-[3rem] p-12 lg:p-16">
                  <Eye className="w-24 h-24 text-white/90 mb-6" />
                  <h3 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                    Our Vision
                  </h3>
                  <p className="text-xl text-white/90">
                    To be the leading authority in digital transit management,
                    driving innovation and sustainable growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div ref={missionRef} className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div
              className={`transition-all duration-1000 ease-out ${
                isMissionVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-20"
              }`}
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-br from-[hsl(var(--green-accent))]/30 to-[hsl(var(--green-light))]/30 rounded-[3rem] blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                <div className="relative bg-gradient-to-br from-[hsl(var(--green-accent))] to-[hsl(var(--hero-gradient-end))] rounded-[3rem] p-12 lg:p-16">
                  <Target className="w-24 h-24 text-white/90 mb-6" />
                  <h3 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                    Our Mission
                  </h3>
                  <p className="text-xl text-white/90">
                    To implement intelligent monitoring systems that secure
                    revenue and eliminate transit inefficiencies.
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`transition-all duration-1000 delay-200 ease-out ${
                isMissionVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-20"
              }`}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(var(--green-light))]/30 rounded-full mb-4">
                <ShieldCheck className="w-4 h-4 text-[hsl(var(--green-accent))]" />
                <span className="text-[hsl(var(--green-accent))] font-semibold text-sm">
                  OUR MISSION
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
                Empowering Transit Stakeholders
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Our mission is to create a secure, transparent, and highly
                efficient transport landscape. We achieve this by providing
                government and private partners with actionable data insights to
                streamline operations and enhance revenue collection.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 bg-[hsl(var(--section-bg))] rounded-lg">
                  <div className="w-8 h-8 bg-[hsl(var(--green-accent))] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Data Intelligence
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Precision insights for informed decisions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-[hsl(var(--section-bg))] rounded-lg">
                  <div className="w-8 h-8 bg-[hsl(var(--orange))] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Revenue Transparency
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Securing and monitoring transit assets.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
