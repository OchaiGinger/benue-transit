"use client";
import { useState, useEffect, useRef } from "react";

export const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const sectionRef = useRef(null);

  const stats = [
    { label: "Successful Deliveries", target: 5000, suffix: "+" },
    { label: "Vehicles in Fleet", target: 85, suffix: "" },
    { label: "Regions Covered", target: 12, suffix: "+" },
    { label: "Years of Service", target: 7, suffix: "+" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    stats.forEach((stat, index) => {
      let currentStep = 0;
      const increment = stat.target / steps;

      const timer = setInterval(() => {
        currentStep++;
        if (currentStep <= steps) {
          setCounts((prevCounts) => {
            const newCounts = [...prevCounts];
            newCounts[index] = Math.min(
              Math.round(increment * currentStep),
              stat.target,
            );
            return newCounts;
          });
        } else {
          clearInterval(timer);
        }
      }, stepDuration);
    });
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-20 bg-[hsl(var(--section-bg))]"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg hover-lift hover:bg-background/50 transition-colors duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-[hsl(var(--green-accent))] mb-2 transition-transform duration-300 hover:scale-110">
                {isVisible ? counts[index] : 0}
                {stat.suffix}
              </div>
              <div className="text-muted-foreground text-sm lg:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
