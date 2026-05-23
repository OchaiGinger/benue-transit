"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Transit specific imagery
const transitProblemImg =
  "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?q=80&w=1000&auto=format&fit=crop";
const transitSolutionImg =
  "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?q=80&w=1000&auto=format&fit=crop";

export const IntroSection = () => {
  const section1Ref = useRef<HTMLElement>(null);
  const section2Ref = useRef<HTMLElement>(null);

  useEffect(() => {
    // Prevent crashes if the DOM isn't ready
    if (!section1Ref.current || !section2Ref.current) return;

    // Cleanup previous ScrollTriggers to prevent memory leaks in React StrictMode
    ScrollTrigger.getAll().forEach((st) => st.kill());

    // Section 1 Animations
    const sec1Elements = section1Ref.current.querySelectorAll(".gsap-reveal-1");
    gsap.fromTo(
      sec1Elements,
      { opacity: 0, x: -80 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section1Ref.current,
          start: "top 75%",
        },
      },
    );

    // Section 2 Animations
    const sec2Elements = section2Ref.current.querySelectorAll(".gsap-reveal-2");
    gsap.fromTo(
      sec2Elements,
      { opacity: 0, x: 80 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section2Ref.current,
          start: "top 75%",
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <>
      {/* First Section - The Challenge */}
      <section
        ref={section1Ref}
        className="py-16 lg:py-24 bg-white overflow-hidden"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 gsap-reveal-1 opacity-0">
            <span className="text-xs font-bold tracking-widest uppercase text-[hsl(var(--green-accent))] mb-4 block">
              The Challenge
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight max-w-3xl mx-auto">
              Transport in Benue is broken. <br />
              We're here to fix it.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="gsap-reveal-1 opacity-0">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-br from-[hsl(var(--orange))] to-[hsl(var(--green-accent))] rounded-[3rem] opacity-10 blur-xl group-hover:opacity-20 transition-opacity duration-500"></div>

                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
                  <img
                    src={transitProblemImg}
                    alt="Chaotic bus station"
                    className="w-full h-[350px] md:h-[450px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1F1A]/80 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white font-medium italic">
                      "Manual operations lead to zero data visibility and
                      uncoordinated routes."
                    </p>
                  </div>
                </div>

                <div className="absolute -top-4 -left-4 w-20 h-20 bg-[hsl(var(--orange))] rounded-full opacity-20 blur-md"></div>
              </div>
            </div>

            <div className="space-y-6 lg:space-y-8">
              <div className="gsap-reveal-1 opacity-0">
                <div className="w-12 h-12 bg-[hsl(var(--green-light))] rounded-xl flex items-center justify-center text-2xl mb-6">
                  📍
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  No Digital Route Maps
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Bus operators navigate purely by memory, with no mapped bus
                  stops, no distance data, and no standardized route planning
                  across the state.
                </p>
              </div>

              <div className="gsap-reveal-1 opacity-0">
                <div className="w-12 h-12 bg-[hsl(var(--green-light))] rounded-xl flex items-center justify-center text-2xl mb-6">
                  💸
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  Revenue Leakage
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Without automated fare calculation tied to actual distance,
                  government and operators lose 30–40% of potential transport
                  levy revenue annually.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Second Section - The Solution */}
      <section
        ref={section2Ref}
        className="py-16 lg:py-24 bg-[hsl(var(--section-bg))] overflow-hidden"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="space-y-8 order-2 md:order-1">
              <div className="gsap-reveal-2 opacity-0">
                <span className="text-xs font-bold tracking-widest uppercase text-[hsl(var(--green-accent))] mb-4 block">
                  The Solution
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                  One intelligent platform. <br />
                  Every bus stop. Every naira.
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Benutra brings structure to chaos. Automatically calculate
                  distance between every bus stop across all Benue routes using
                  our Google Maps wrapper with AI route optimization.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-[hsl(var(--green-accent))/0.1] gsap-reveal-2 opacity-0 hover:-translate-y-1 transition-transform">
                <h4 className="font-bold text-xl mb-2 flex items-center gap-3">
                  <span className="text-[hsl(var(--green-accent))]">⚡</span>{" "}
                  Real-Time Revenue Engine
                </h4>
                <p className="text-muted-foreground">
                  Fare pricing is computed automatically based on verified
                  distance data. Every trip is logged, every naira tracked — no
                  manual intervention.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-[hsl(var(--green-accent))/0.1] gsap-reveal-2 opacity-0 hover:-translate-y-1 transition-transform">
                <h4 className="font-bold text-xl mb-2 flex items-center gap-3">
                  <span className="text-[hsl(var(--green-accent))]">📈</span>{" "}
                  Government Intelligence
                </h4>
                <p className="text-muted-foreground">
                  State transport authorities get a live command center showing
                  route performance, levy collection, and growth analytics in
                  real time.
                </p>
              </div>
            </div>

            <div className="order-1 md:order-2 gsap-reveal-2 opacity-0">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-bl from-[hsl(var(--green-accent))] to-[#0D1F1A] rounded-[3rem] opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500"></div>

                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-[hsl(var(--green-accent))/0.2]">
                  <img
                    src={transitSolutionImg}
                    alt="Digital transport tracking"
                    className="w-full h-[400px] md:h-[550px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Faux UI Overlay for tech feel */}
                  <div className="absolute top-6 right-6 bg-[#0D1F1A]/90 backdrop-blur border border-[hsl(var(--green-accent))/0.3] p-4 rounded-xl text-white">
                    <div className="text-xs text-white/50 mb-1">
                      Live Revenue Tracker
                    </div>
                    <div className="text-2xl font-bold text-[hsl(var(--green-accent))]">
                      ₦142,800
                    </div>
                  </div>
                </div>

                <div className="absolute -top-2 -right-2 w-16 h-16 bg-[hsl(var(--green-light))] rounded-full opacity-40 blur-md"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
