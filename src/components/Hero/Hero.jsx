import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../Navbar/Navbar";
import "./Hero.css";
import img1 from "../../assets/Hero1.jpeg";
import img2 from "../../assets/Hero2.jpeg";
import img3 from "../../assets/Hero3.jpeg";

const images = [img1, img2, img3];
const DURATION = 5000;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev]       = useState(null);
  const [progress, setProgress] = useState(0);
  const intervalRef    = useRef(null);
  const rafRef         = useRef(null);
  const progressStart  = useRef(null);

  const startProgress = () => {
    progressStart.current = performance.now();
    const tick = (now) => {
      const pct = Math.min(((now - progressStart.current) / DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const goTo = (idx) => {
    cancelAnimationFrame(rafRef.current);
    clearInterval(intervalRef.current);
    setProgress(0);
    setPrev(current);
    setCurrent(idx);
    startProgress();
    intervalRef.current = setInterval(() => advance(), DURATION);
  };

  const advance = () => {
    cancelAnimationFrame(rafRef.current);
    setProgress(0);
    setCurrent((c) => {
      setPrev(c);
      return (c + 1) % images.length;
    });
    startProgress();
  };

  useEffect(() => {
    startProgress();
    intervalRef.current = setInterval(advance, DURATION);
    return () => {
      clearInterval(intervalRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Limpiar prev después de que termina la transición
  useEffect(() => {
    if (prev === null) return;
    const t = setTimeout(() => setPrev(null), 1600);
    return () => clearTimeout(t);
  }, [prev]);

  return (
    <motion.section
      id="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="hero"
    >
      {/* Navbar */}
       <div style={{
        width: "100%",
        position: "absolute",
        top: "40px",
        left: 0,
        zIndex: 10,
      }}>
        <Navbar active="hero" />
      </div>

      {/* Slider */}
      <div className="hero-slider">
        {images.map((img, i) => {
          const isActive = i === current;
          const isPrev   = i === prev;
          return (
            <div
              key={i}
              className={`hero-slide ${isActive ? "active" : ""} ${isPrev ? "leaving" : ""}`}
              style={{ backgroundImage: `url(${img})` }}
            />
          );
        })}
      </div>

      {/* Overlay */}
      <div className="hero-overlay" />

      {/* Contenido */}
      <div className="hero-content">
        <motion.p
          className="hero-eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9 }}
        >
          Se casan
        </motion.p>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
        >
          Ignacio <span>&</span> Valeria
        </motion.h1>

        <motion.div
          className="hero-divider"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 100, opacity: 0.6 }}
          transition={{ delay: 1.1, duration: 1 }}
        />

        <motion.p
          className="hero-date"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.9 }}
        >
          14 de Noviembre · 2026
        </motion.p>
      </div>

      {/* Dots */}
      <div className="hero-dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`hero-dot ${i === current ? "active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Foto ${i + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="hero-progress" style={{ width: `${progress}%` }} />
    </motion.section>
  );
}
