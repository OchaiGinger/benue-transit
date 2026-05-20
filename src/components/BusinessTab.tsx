"use client";
import { useEffect, useState, useRef } from "react";

export const BusinessTabs = () => {
  const [activeSection, setActiveSection] = useState("transport");
  const sectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const sections = [
    {
      id: "transport",
      label: "Transit Services",
      icon: "🚛",
      title: "Reliable and efficient transit solutions",
      content: `Benue Transit provides seamless logistics and transportation services across the region. We focus on reliability, ensuring that goods and passengers reach their destinations safely and on time. By leveraging optimized routing and a modern fleet, we bridge the gap between demand and supply, facilitating smooth commerce and connectivity.`,
    },
    {
      id: "fleet",
      label: "Fleet Management",
      icon: "⚙️",
      title: "Maintaining peak operational performance",
      content: `Our fleet management system ensures that every vehicle operates at maximum efficiency. With rigorous maintenance schedules and real-time performance tracking, we minimize downtime and ensure the highest safety standards. We are committed to maintaining a robust, well-serviced fleet that meets the rigorous demands of daily transit operations.`,
    },
    {
      id: "logistics",
      label: "Logistics",
      icon: "📦",
      title: "Streamlined supply chain operations",
      content: `Benue Transit specializes in end-to-end logistics support. From warehousing to final-mile delivery, we use integrated tracking systems to ensure complete visibility and accountability. Our logistics framework is designed to be scalable, helping businesses and individuals move their goods with precision and speed.`,
    },
    {
      id: "support",
      label: "Client Support",
      icon: "🤝",
      title: "Dedicated to our clients' success",
      content: `At the heart of Benue Transit is our commitment to our clients. We offer responsive support services to ensure every inquiry, booking, or logistical challenge is handled with care. By fostering strong relationships and maintaining clear communication, we ensure that our transit solutions are tailored to meet the unique needs of every community we serve.`,
    },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    Object.values(sectionsRef.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    sectionsRef.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <section className="py-1 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          <div className="lg:w-64 lg:sticky lg:top-24 lg:self-start">
            <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`
                    relative flex items-center gap-3 px-6 py-4 text-left whitespace-nowrap lg:whitespace-normal
                    transition-all duration-300 rounded-lg hover-lift
                    ${
                      activeSection === section.id
                        ? "text-foreground font-semibold bg-[hsl(var(--section-bg))]"
                        : "text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--section-bg))]/50"
                    }
                  `}
                >
                  <div
                    className={`
                      absolute left-0 top-0 bottom-0 w-1 rounded-r-full
                      transition-all duration-300
                      ${
                        activeSection === section.id
                          ? "bg-[hsl(var(--orange))] opacity-100 scale-y-100"
                          : "bg-white opacity-40 scale-y-100"
                      }
                    `}
                  />
                  <span className="text-2xl lg:text-3xl animate-scale-in">
                    {section.icon}
                  </span>
                  <span className="text-base lg:text-lg">{section.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="flex-1 space-y-16 sm:space-y-20 md:space-y-24 lg:space-y-32">
            {sections.map((section) => (
              <div
                key={section.id}
                id={section.id}
                ref={(el) => {
                  sectionsRef.current[section.id] = el;
                }}
                className="min-h-[40vh] sm:min-h-[50vh] md:min-h-[60vh] flex items-center animate-fade-in-up"
              >
                <div className="max-w-3xl">
                  <div className="flex items-center mb-8 hover-grow">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center mr-4 lg:mr-6">
                      <span className="text-5xl lg:text-6xl">
                        {section.icon}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs lg:text-sm font-semibold text-[hsl(var(--green-accent))] uppercase mb-2 tracking-wide">
                        {section.label}
                      </p>
                      <h3 className="text-2xl lg:text-4xl font-bold text-foreground leading-tight">
                        {section.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-8">
                    {section.content}
                  </p>

                  <a
                    href="#"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[hsl(var(--orange))] hover:bg-[hsl(var(--orange-hover))] text-white font-semibold rounded-lg transition-all duration-300 hover-lift group"
                  >
                    Learn more
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
