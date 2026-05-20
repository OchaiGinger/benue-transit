"use client";
import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { FaLinkedin } from "react-icons/fa";
export const TeamSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Updated names and image filenames
  const team = [
    {
      name: "Terna A. Orshi",
      role: "Managing Director",
      description: "Driving regional transit efficiency and strategic growth",
      imgSrc: "terna-orshi.png",
      linkedin: "",
    },
    {
      name: "Sarah M. Ngutsav",
      role: "Logistics Coordinator",
      description: "Managing seamless delivery networks and fleet safety",
      imgSrc: "sarah-ngutsav.png",
      linkedin: "",
    },
    {
      name: "David T. Iorapuu",
      role: "Operations Lead",
      description: "Overlooking daily transit schedules and service quality",
      imgSrc: "david-iorapuu.png",
      linkedin: "",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-20 bg-[hsl(var(--section-bg))] overflow-hidden"
      id="team"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <h2
          className={`text-3xl lg:text-4xl font-bold text-center text-foreground mb-4 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Our Leadership Team
        </h2>
        <p
          className={`text-center text-muted-foreground mb-12 lg:mb-16 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Dedicated professionals committed to reliable transit and logistics
          excellence.
        </p>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {team.map((member, index) => (
            <Card
              key={index}
              className={`overflow-hidden bg-card hover-lift group border-0 shadow-lg transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-20"
              }`}
              style={{ transitionDelay: `${(index + 2) * 150}ms` }}
            >
              <div className="relative overflow-hidden h-80 lg:h-96">
                <img
                  src={member.imgSrc}
                  alt={member.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6 text-center">
                {member.linkedin ? (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 mb-4 bg-[#0077B5] hover:bg-[#006399] text-white rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  >
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                ) : (
                  <div className="inline-flex items-center justify-center w-10 h-10 mb-4 bg-gray-300 text-white rounded-full">
                    <FaLinkedin className="w-5 h-5" />
                  </div>
                )}
                <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-2 transition-colors duration-300 group-hover:text-[hsl(var(--orange))]">
                  {member.name}
                </h3>
                <p className="text-[hsl(var(--green-accent))] font-semibold mb-3 text-base">
                  {member.role}
                </p>
                <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">
                  {member.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
