"use client";
import { Menu } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Image from "next/image";

export const Navigation = () => {
  const [activeSection, setActiveSection] = useState("");
  const navRef = useRef<HTMLElement>(null);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Business", href: "#business" },
    { name: "Stats", href: "#stats" },
    { name: "Team", href: "#team" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (const link of navLinks) {
        const element = document.getElementById(link.href.substring(1));
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(link.href);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks]);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
    );
    const elements = navRef.current.querySelectorAll(".gsap-nav-item");
    gsap.fromTo(
      elements,
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.3,
      },
    );
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 w-full z-50 bg-[#0D1F1A]/85 backdrop-blur-md border-b border-[hsl(var(--green-accent))]/15 shadow-lg"
    >
      <div className="container mx-auto px-4 py-4 lg:px-8">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center  gsap-nav-item group">
            <div className="h-10 flex items-center overflow-visible">
              <Image
                src="/benutra_logo.png"
                alt="Benutra Logo"
                width={140}
                height={140}
                priority
                className="w-auto h-20 object-contain transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Benutra
            </h1>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="gsap-nav-item relative text-sm text-white/70 hover:text-white transition-colors py-2"
              >
                {link.name}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-[hsl(var(--green-accent))] transition-all ${activeSection === link.href ? "w-full" : "w-0 group-hover:w-full"}`}
                />
              </a>
            ))}
            <Button className="gsap-nav-item bg-[hsl(var(--green-accent))] hover:bg-[hsl(var(--green-accent))/80] text-white">
              Get Early Access
            </Button>
          </div>

          {/* Mobile Nav */}
          <Sheet>
            <SheetTrigger
              className="md:hidden gsap-nav-item"
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              }
            />
            <SheetContent className="bg-[#0D1F1A] border-l border-[hsl(var(--green-accent))/15]">
              <div className="flex flex-col space-y-6 mt-12">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-lg text-white/80 hover:text-white py-2"
                    onClick={() => setActiveSection(link.href)}
                  >
                    {link.name}
                  </a>
                ))}
                <Button className="w-full bg-[hsl(var(--green-accent))] hover:bg-[hsl(var(--green-accent))/80] text-white mt-4">
                  Get Early Access
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
