import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import valeImg from "../assets/Vale.jpg";
import nachoImg from "../assets/Nacho.jpg";
import coupleImg from "../assets/Pareja.avif";

// Secuencia correcta:
// 1. Valeria (solo nombre)
// 2. Va[foto]ria (split)
// 3. Ignacio (solo nombre)
// 4. Igna[foto]cio (split)
// 5. Valeria & Ignacio (solo nombres)
// 6. Vale[foto pareja]ria & Ignacio (split pareja)
// → repite

const SLIDES = [
  { phase: "name-only", left: "Valeria",          right: "",            image: valeImg   },
  { phase: "split",     left: "Vale",             right: "ria",         image: valeImg   },
  { phase: "name-only", left: "Ignacio",          right: "",            image: nachoImg  },
  { phase: "split",     left: "Igna",             right: "cio",         image: nachoImg  },
  { phase: "name-only", left: "Valeria",          right: "& Ignacio",   image: coupleImg },
  { phase: "split",     left: "Valeria",          right: "& Ignacio",   image: coupleImg },
];

const DURATION = 2800;

function getSlotStyle(phase, visible) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: "3px",
    verticalAlign: "middle",
    flexShrink: 0,
    transition: "all 1s cubic-bezier(0.76, 0, 0.24, 1)",
    border: "1px solid rgba(200,169,126,0.35)",
  };

  if (!visible || phase === "name-only") {
    return { ...base, width: "0px", height: "0px", margin: "0", opacity: 0, border: "none" };
  }
  return { ...base, width: "130px", height: "160px", margin: "0 22px", opacity: 1 };
}

export default function Hero() {
  const [current, setCurrent]       = useState(0);
  const [progress, setProgress]     = useState(0);
  const timerRef         = useRef(null);
  const rafRef           = useRef(null);
  const progressStartRef = useRef(null);

  const slide = SLIDES[current];
  const showSlot = slide.phase === "split";

  const startProgress = () => {
    progressStartRef.current = performance.now();
    const step = (now) => {
      const elapsed = now - progressStartRef.current;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  };

  const stopProgress = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setProgress(0);
  };

  const advance = () => {
    stopProgress();
    setCurrent((prev) => (prev + 1) % SLIDES.length);
    startProgress();
  };

  const goTo = (idx) => {
    clearInterval(timerRef.current);
    stopProgress();
    setCurrent(idx);
    startProgress();
    timerRef.current = setInterval(advance, DURATION);
  };

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&display=swap";
    document.head.appendChild(link);

    startProgress();
    timerRef.current = setInterval(advance, DURATION);

    return () => {
      clearInterval(timerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Dots: one per "pair" (name-only + split), so 3 dots total
  const dotCount = SLIDES.length / 2;
  const activeDot = Math.floor(current / 2);

  const nameStyle = {
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 300,
    fontSize: "clamp(64px, 10vw, 108px)",
    color: "var(--text-primary)",
    letterSpacing: "0.1em",
    lineHeight: 1,
    transition: "all 0.9s cubic-bezier(0.76, 0, 0.24, 1)",
    whiteSpace: "nowrap",
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "0",
        background: "var(--bg-primary)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Navbar fijo arriba */}
      <div style={{
        width: "100%",
        position: "absolute",
        top: "40px",
        left: 0,
        zIndex: 10,
      }}>
        <Navbar active="hero" />
      </div>

      {/* Radial glow */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse 80% 65% at 50% 52%, rgba(200,169,126,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Centrado vertical */}
      <div style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
      }}>

        {/* Hero card — grande */}
        <div style={{
          position: "relative",
          width: "min(1000px, 94vw)",
          padding: "96px 80px 84px",
          background: "var(--bg-secondary)",
          borderRadius: "4px",
          border: "1px solid rgba(200,169,126,0.18)",
          boxShadow: [
            "0 0 0 1px rgba(200,169,126,0.06)",
            "0 48px 120px rgba(0,0,0,0.55)",
            "inset 0 1px 0 rgba(200,169,126,0.08)",
          ].join(", "),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>

          {/* Corner accents */}
          {[
            { top: "22px",    left: "22px",  borderTop: "1px solid #ffffff", borderLeft:   "1px solid #ffffff" },
            { top: "22px",    right: "22px", borderTop: "1px solid #ffffff", borderRight:  "1px solid #ffffff" },
            { bottom: "22px", left: "22px",  borderBottom: "1px solid #ffffff", borderLeft:  "1px solid #ffffff" },
            { bottom: "22px", right: "22px", borderBottom: "1px solid #ffffff", borderRight: "1px solid #ffffff" },
          ].map((s, i) => (
            <div key={i} style={{ position: "absolute", width: "24px", height: "24px", opacity: 0.45, ...s }} />
          ))}

          {/* Eyebrow */}
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "12px",
            color: "#ffffff",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            marginBottom: "52px",
            opacity: 0.75,
          }}>
            Se casan
          </p>

          {/* Names + split image */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "visible",
            minHeight: "120px",
          }}>
            <span style={nameStyle}>{slide.left}</span>

            <div style={getSlotStyle(slide.phase, showSlot)}>
              <img
                src={slide.image}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                }}
              />
            </div>

            {slide.right && (
              <span style={nameStyle}>{slide.right}</span>
            )}
          </div>

          {/* Divider */}
          <div style={{
            width: "100px",
            height: "1px",
            background: "linear-gradient(to right, transparent, #ffffff, transparent)",
            margin: "36px 0 32px",
            opacity: 0.8,
          }} />

          {/* Date */}
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "14px",
            color: "#ffffff",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            margin: 0,
          }}>
            14 de Noviembre · 2026
          </p>

          {/* Progress bar */}
          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "2px",
            width: `${progress}%`,
            background: "linear-gradient(to right, transparent, #ffffff)",
            borderRadius: "0 0 4px 4px",
            opacity: 0.6,
          }} />
        </div>

        {/* Dots — uno por pareja de slides */}
        <div style={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
          marginTop: "36px",
        }}>
          {Array.from({ length: dotCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i * 2)}
              aria-label={`Pareja ${i + 1}`}
              style={{
                width: i === activeDot ? "22px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background: i === activeDot ? "#ffffff" : "rgba(200,169,126,0.3)",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "all 0.4s ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}