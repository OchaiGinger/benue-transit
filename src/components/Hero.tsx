"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

// High-quality transit/bus placeholder images
const busHero1 =
  "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2000&auto=format&fit=crop";
const busHero2 =
  "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2000&auto=format&fit=crop";
const busHero3 =
  "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=2000&auto=format&fit=crop";

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const heroImages = [busHero1, busHero2, busHero3];

  // Image Slider Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // GSAP Text Reveal Animation
  useEffect(() => {
    // Safely exit if the ref hasn't attached to the DOM yet
    if (!textContainerRef.current) return;

    // Use querySelectorAll instead of .children to avoid TypeScript 'never' errors
    const elements = textContainerRef.current.querySelectorAll(".hero-animate");

    gsap.fromTo(
      elements,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2,
      },
    );
  }, []);

  return (
    <section className="relative h-[600px] md:h-[700px] lg:h-[750px] flex items-center justify-start overflow-hidden pb-32 sm:pb-36 md:pb-0 pt-20 sm:pt-24 md:pt-28">
      {/* Background Slides */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ${
            currentSlide === index ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(13, 31, 26, 0.8), rgba(29, 158, 117, 0.4)), url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            animation:
              currentSlide === index
                ? "ken-burns 20s ease-in-out infinite alternate"
                : "none",
          }}
        />
      ))}

      {/* Floating Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-20 left-20 w-3 h-3 bg-white/20 rounded-full animate-float"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute top-40 right-32 w-2 h-2 bg-[hsl(var(--orange))]/50 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-32 left-40 w-4 h-4 bg-[hsl(var(--green-accent))]/40 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

      {/* Text & CTA */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl" ref={textContainerRef}>
          {/* Added 'hero-animate' classes to the blocks we want GSAP to stagger */}
          <div className="inline-block mb-4 hero-animate opacity-0">
            <span className="px-4 py-2 bg-[hsl(var(--green-accent))]/90 text-white text-sm font-semibold rounded-full tracking-wide">
              Now live in Benue State
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight hero-animate opacity-0">
            The Digital Map <br className="hidden md:block" />
            Powering{" "}
            <span className="text-[hsl(var(--green-accent))]">
              Benue's
            </span>{" "}
            Transport
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed max-w-2xl font-sans hero-animate opacity-0">
            AI-powered bus stop mapping, real-time route intelligence, and
            automated revenue tracking — built for the next generation of
            transport operators.
          </p>

          <div className="flex flex-wrap gap-4 hero-animate opacity-0">
            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-[hsl(var(--green-accent))] hover:bg-[hsl(var(--green-accent))/80] text-white font-bold rounded-lg transition-all duration-300 hover:-translate-y-1 shadow-lg">
              Start Free Trial →
            </button>

            <button
              onClick={() => setIsVideoOpen(true)}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent hover:bg-white/10 text-white font-bold rounded-lg transition-all duration-300 hover:-translate-y-1 border border-white/30"
            >
              ▶ See Demo
            </button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-16 sm:bottom-24 md:bottom-32 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-[hsl(var(--green-accent))] w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>

      {/* Bottom Wave SVG */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        <svg
          className="w-full h-10 sm:h-14 md:h-20 fill-background"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path d="M0,120 C240,60 480,0 720,20 C960,40 1200,100 1440,60 L1440,120 Z" />
        </svg>
      </div>

      {/* Video Popup Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center">
          <div className="relative w-[90%] max-w-3xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-3 right-3 text-white text-3xl font-bold hover:text-[hsl(var(--orange))] transition z-50"
            >
              &times;
            </button>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Benue Transit Demo"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};
