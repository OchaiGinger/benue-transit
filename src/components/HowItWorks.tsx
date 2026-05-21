"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  MapPin,
  ScanLine,
  BarChart3,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const STEPS = [
  {
    number: "01",
    label: "Route Mapping",
    icon: MapPin,
    accentColor: "#1D9E75",
    accentLight: "#E1F5EE",
    heading: "Every bus stop. Precisely mapped.",
    body: "We digitise every transit route across Benue State using a Google Maps wrapper with AI-powered optimisation. Bus stops are geo-tagged, distances calculated, and routes structured into a live, queryable database — no more navigating by memory.",
    stat: "120+",
    statLabel: "Routes Mapped",
    tag: "Infrastructure Layer",
  },
  {
    number: "02",
    label: "Digital Ticketing",
    icon: ScanLine,
    accentColor: "#EF9F27",
    accentLight: "#FAEEDA",
    heading: "Scan in. Fare computed. Revenue secured.",
    body: "Passengers and conductors interact with BenueTransit through a lightweight digital ticket system. Fares are auto-calculated based on verified distance data — eliminating manual pricing, under-reporting, and cash leakage from the first kilometre to the last.",
    stat: "₦0",
    statLabel: "Manual Fare Errors",
    tag: "Transaction Layer",
  },
  {
    number: "03",
    label: "Live Analytics",
    icon: BarChart3,
    accentColor: "#1D9E75",
    accentLight: "#E1F5EE",
    heading: "A command centre for every route.",
    body: "State transport authorities access a real-time dashboard showing route performance, levy collection progress, vehicle activity, and revenue trends by zone. Every naira is tracked. Every route has a score. Decisions are no longer guesswork.",
    stat: "84k+",
    statLabel: "Live Data Points",
    tag: "Intelligence Layer",
  },
  {
    number: "04",
    label: "Compliance & Audit",
    icon: ShieldCheck,
    accentColor: "#EF9F27",
    accentLight: "#FAEEDA",
    heading: "Tamper-proof records. Full accountability.",
    body: "Every transaction is logged with a verifiable timestamp, route ID, vehicle ID, and operator signature. Government auditors can pull complete trip histories for any operator, period, or zone — making revenue disputes a thing of the past.",
    stat: "100%",
    statLabel: "Trip Auditability",
    tag: "Compliance Layer",
  },
];

const AUTO_PLAY_INTERVAL = 5000;

export const HowItWorks = () => {
  const [active, setActive] = useState(0);
  const [animDir, setAnimDir] = useState("next");
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const progressRef = useRef(null);
  const startTimeRef = useRef(null);

  const goTo = useCallback(
    (index, dir = "next") => {
      if (isAnimating || index === active) return;
      setAnimDir(dir);
      setIsAnimating(true);
      setTimeout(() => {
        setActive(index);
        setIsAnimating(false);
      }, 420);
    },
    [isAnimating, active],
  );

  const next = useCallback(() => {
    goTo((active + 1) % STEPS.length, "next");
  }, [active, goTo]);

  const prev = useCallback(() => {
    goTo((active - 1 + STEPS.length) % STEPS.length, "prev");
  }, [active, goTo]);

  const resetTimer = useCallback(() => {
    clearInterval(intervalRef.current);
    cancelAnimationFrame(progressRef.current);
    setProgress(0);
    startTimeRef.current = performance.now();

    const tick = (now) => {
      const elapsed = now - startTimeRef.current;
      const pct = Math.min((elapsed / AUTO_PLAY_INTERVAL) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        progressRef.current = requestAnimationFrame(tick);
      }
    };
    progressRef.current = requestAnimationFrame(tick);

    intervalRef.current = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % STEPS.length;
        setAnimDir("next");
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 420);
        return next;
      });
      startTimeRef.current = performance.now();
    }, AUTO_PLAY_INTERVAL);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => {
      clearInterval(intervalRef.current);
      cancelAnimationFrame(progressRef.current);
    };
  }, [resetTimer]);

  const handleNav = (fn) => {
    fn();
    resetTimer();
  };

  const step = STEPS[active];
  const Icon = step.icon;

  return (
    <section
      style={{
        background: "#0D1F1A",
        padding: "80px 0 96px",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 32px",
          marginBottom: "56px",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(29,158,117,0.12)",
            border: "1px solid rgba(29,158,117,0.25)",
            borderRadius: "100px",
            padding: "6px 16px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#1D9E75",
              animation: "pulse 2s infinite",
            }}
          />
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#1D9E75",
            }}
          >
            How It Works
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#FFFFFF",
              lineHeight: 1.1,
              maxWidth: "520px",
              margin: 0,
            }}
          >
            From chaos to <span style={{ color: "#1D9E75" }}>command</span>.
            <br />
            Four layers. One platform.
          </h2>

          {/* Prev / Next */}
          <div style={{ display: "flex", gap: "10px" }}>
            {[
              { fn: prev, icon: ChevronLeft, label: "Previous" },
              { fn: next, icon: ChevronRight, label: "Next" },
            ].map(({ fn, icon: Ic, label }) => (
              <button
                key={label}
                aria-label={label}
                onClick={() => handleNav(fn)}
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.05)",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#1D9E75";
                  e.currentTarget.style.borderColor = "#1D9E75";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                }}
              >
                <Ic size={18} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Step Tabs */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto 40px",
          padding: "0 32px",
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
        }}
      >
        {STEPS.map((s, i) => {
          const isActive = i === active;
          return (
            <button
              key={i}
              onClick={() =>
                handleNav(() => goTo(i, i > active ? "next" : "prev"))
              }
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 18px",
                borderRadius: "100px",
                border: isActive
                  ? `1px solid ${s.accentColor}`
                  : "1px solid rgba(255,255,255,0.1)",
                background: isActive
                  ? `${s.accentColor}22`
                  : "rgba(255,255,255,0.04)",
                color: isActive ? s.accentColor : "rgba(255,255,255,0.45)",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: isActive ? 600 : 400,
                fontSize: "13px",
                cursor: "pointer",
                transition: "all 0.3s",
                whiteSpace: "nowrap",
              }}
            >
              <span
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "11px",
                  opacity: 0.6,
                }}
              >
                {s.number}
              </span>
              {s.label}
            </button>
          );
        })}
      </div>

      {/* Main Card */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 32px",
        }}
      >
        <div
          style={{
            position: "relative",
            borderRadius: "32px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "#111E1A",
            minHeight: "420px",
            transition: "opacity 0.42s ease, transform 0.42s ease",
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating
              ? `translateX(${animDir === "next" ? "-32px" : "32px"})`
              : "translateX(0)",
          }}
        >
          {/* Progress bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "3px",
              width: `${progress}%`,
              background: step.accentColor,
              transition: "width 0.1s linear",
              zIndex: 10,
              borderRadius: "0 2px 2px 0",
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 340px",
              minHeight: "420px",
            }}
          >
            {/* Left — content */}
            <div
              style={{
                padding: "52px 48px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                {/* Tag */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    background: `${step.accentColor}18`,
                    border: `1px solid ${step.accentColor}40`,
                    borderRadius: "6px",
                    padding: "4px 12px",
                    marginBottom: "28px",
                  }}
                >
                  <Icon size={13} color={step.accentColor} />
                  <span
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      fontSize: "11px",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: step.accentColor,
                    }}
                  >
                    {step.tag}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                    color: "#FFFFFF",
                    lineHeight: 1.2,
                    marginBottom: "20px",
                    maxWidth: "480px",
                  }}
                >
                  {step.heading}
                </h3>

                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.75,
                    color: "rgba(255,255,255,0.6)",
                    maxWidth: "480px",
                    margin: 0,
                  }}
                >
                  {step.body}
                </p>
              </div>

              {/* Stat */}
              <div
                style={{
                  marginTop: "40px",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    width: "1px",
                    height: "48px",
                    background: step.accentColor,
                    borderRadius: "1px",
                  }}
                />
                <div>
                  <div
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 800,
                      fontSize: "2rem",
                      color: step.accentColor,
                      lineHeight: 1,
                    }}
                  >
                    {step.stat}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.4)",
                      marginTop: "4px",
                    }}
                  >
                    {step.statLabel}
                  </div>
                </div>
              </div>
            </div>

            {/* Right — accent panel */}
            <div
              style={{
                background: `linear-gradient(160deg, ${step.accentColor}22 0%, ${step.accentColor}08 100%)`,
                borderLeft: `1px solid ${step.accentColor}25`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "48px 32px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Big number watermark */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 900,
                  fontSize: "140px",
                  color: `${step.accentColor}12`,
                  lineHeight: 1,
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                {step.number}
              </div>

              {/* Icon circle */}
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  background: `${step.accentColor}20`,
                  border: `2px solid ${step.accentColor}50`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "24px",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <Icon size={44} color={step.accentColor} strokeWidth={1.5} />
              </div>

              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                  color: "#FFFFFF",
                  textAlign: "center",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {step.label}
              </div>

              {/* Step dots */}
              <div
                style={{
                  display: "flex",
                  gap: "6px",
                  marginTop: "32px",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {STEPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      handleNav(() => goTo(i, i > active ? "next" : "prev"))
                    }
                    aria-label={`Go to step ${i + 1}`}
                    style={{
                      width: i === active ? "24px" : "6px",
                      height: "6px",
                      borderRadius: "3px",
                      background:
                        i === active
                          ? step.accentColor
                          : "rgba(255,255,255,0.2)",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      transition: "all 0.35s ease",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom step strip */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "20px auto 0",
          padding: "0 32px",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "12px",
        }}
      >
        {STEPS.map((s, i) => {
          const isActive = i === active;
          const Ic = s.icon;
          return (
            <button
              key={i}
              onClick={() =>
                handleNav(() => goTo(i, i > active ? "next" : "prev"))
              }
              style={{
                background: isActive
                  ? `${s.accentColor}15`
                  : "rgba(255,255,255,0.03)",
                border: isActive
                  ? `1px solid ${s.accentColor}40`
                  : "1px solid rgba(255,255,255,0.06)",
                borderRadius: "16px",
                padding: "16px",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                }
              }}
            >
              <Ic
                size={18}
                color={isActive ? s.accentColor : "rgba(255,255,255,0.3)"}
                style={{ marginBottom: "8px" }}
              />
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "13px",
                  color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.4)",
                  lineHeight: 1.3,
                }}
              >
                {s.label}
              </div>
            </button>
          );
        })}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
};
