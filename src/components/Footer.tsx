"use client";
import { useState, useEffect, useRef } from "react";
import { FaLinkedin } from "react-icons/fa";

const busHero1 =
  "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2000&auto=format&fit=crop";

export const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

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

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative text-white py-12 lg:py-16 overflow-hidden"
    >
      {/* Background Layer */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${busHero1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Brand Specific Overlay */}
      <div className="absolute inset-0 z-0 bg-[#0D1F1A]/85" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div
            className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100" : "opacity-0"}`}
          >
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="benutra_logo.png"
                alt="Benue Transit Logo"
                className="h-10 w-10 object-contain"
              />
              <h3 className="text-xl lg:text-2xl font-bold text-white">
                BENUTRA
              </h3>
            </div>
            <p className="text-white/90 font-medium text-sm lg:text-base">
              Reliable, safe, and efficient transit solutions across Nigeria.
            </p>
          </div>

          {/* Quick Links */}
          <div
            className={`transition-all duration-1000 delay-150 ease-out ${isVisible ? "opacity-100" : "opacity-0"}`}
          >
            <h4 className="text-base lg:text-lg font-bold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm lg:text-base">
              {["About Us", "Our Services", "Our Fleet", "Contact"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase().replace(" ", "-")}`}
                      className="text-white hover:text-white/70 transition-all font-medium"
                    >
                      {link}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div
            className={`transition-all duration-1000 delay-300 ease-out ${isVisible ? "opacity-100" : "opacity-0"}`}
          >
            <h4 className="text-base lg:text-lg font-bold text-white mb-4">
              Contact
            </h4>
            <p className="text-white font-medium text-sm lg:text-base">
              www.Benutra.com
            </p>
            <p className="text-white font-medium text-sm lg:text-base mt-2">
              +234 800 BENUE TRANSIT
            </p>
            <p className="text-white font-medium text-sm lg:text-base mt-2">
              Makurdi, Benue State
            </p>
          </div>

          {/* Socials */}
          <div
            className={`transition-all duration-1000 delay-450 ease-out ${isVisible ? "opacity-100" : "opacity-0"}`}
          >
            <h4 className="text-base lg:text-lg font-bold text-white mb-4">
              Follow Us
            </h4>
            <a
              href="#"
              className="text-white hover:text-white/70 transition-all"
            >
              <FaLinkedin className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-6 text-center">
          <p className="text-white/80 font-medium text-sm lg:text-base">
            © {new Date().getFullYear()} Benue Transit Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
