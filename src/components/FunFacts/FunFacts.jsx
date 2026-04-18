import Navbar from "../Navbar/Navbar";
import { motion } from "framer-motion";
import "./FunFacts.css";

// SVG íconos minimalistas inline
const icons = {
  ring: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="32" cy="36" r="18"/>
      <path d="M24 36 Q32 20 40 36"/>
      <circle cx="32" cy="36" r="6"/>
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="8" y="14" width="48" height="44" rx="2"/>
      <line x1="8" y1="26" x2="56" y2="26"/>
      <line x1="20" y1="8" x2="20" y2="20"/>
      <line x1="44" y1="8" x2="44" y2="20"/>
      <text x="32" y="46" textAnchor="middle" fontSize="14" fontFamily="Georgia" fill="currentColor" stroke="none">18</text>
    </svg>
  ),
  location: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M32 8 C20 8 12 18 12 27 C12 42 32 58 32 58 C32 58 52 42 52 27 C52 18 44 8 32 8Z"/>
      <circle cx="32" cy="27" r="7"/>
    </svg>
  ),
  music: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M24 48 L24 18 L52 12 L52 42"/>
      <circle cx="18" cy="48" r="6"/>
      <circle cx="46" cy="42" r="6"/>
    </svg>
  ),
  travel: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 44 L28 20 L36 28 L48 14 L56 22"/>
      <path d="M4 52 L60 52"/>
      <path d="M40 52 L40 28"/>
    </svg>
  ),
  food: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 10 L20 30 Q20 38 28 38 L28 56"/>
      <path d="M36 10 L36 22 Q36 30 44 30 L44 10"/>
      <path d="M44 30 L44 56"/>
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M32 52 C32 52 8 38 8 22 C8 14 14 8 22 8 C26 8 30 10 32 14 C34 10 38 8 42 8 C50 8 56 14 56 22 C56 38 32 52 32 52Z"/>
    </svg>
  ),
};

const facts = [
  {
    icon: icons.ring,
    question: "¿Cómo nos conocimos?",
    answer: "Nos conocimos en una reunión de amigos que ninguno de los dos quería ir",
  },
  {
    icon: icons.calendar,
    question: "¿Cuánto tiempo llevamos juntos?",
    answer: "6 años, 3 meses y unos cuantos días de aventura",
  },
  {
    icon: icons.location,
    question: "¿Dónde se propuso Nacho?",
    answer: "En España, bajo el atardecer de Barcelona",
  },
  {
    icon: icons.food,
    question: "¿Cuál es nuestra comida favorita?",
    answer: "Pizza — siempre pizza, en cualquier lugar del mundo",
  },
  {
    icon: icons.travel,
    question: "¿A dónde queremos viajar?",
    answer: "Japón es el próximo destino en nuestra lista",
  },
  {
    icon: icons.music,
    question: "¿Cuál es nuestra canción?",
    answer: "\"Can't Help Falling in Love\" — Elvis nunca falla",
  },
  {
    icon: icons.heart,
    question: "¿Qué nos enamora del otro?",
    answer: "Que incluso en los días difíciles, nos elegimos",
  },
]
const handleCardClick = (e) => {
  e.currentTarget.classList.toggle("flipped");
};

function FunFacts() {
  return (

    
    <motion.section
      id="funfacts"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ amount: 0.1 }}
      className="funfacts-section"
    >
      <Navbar active="funfacts" />

      <div className="funfacts-container">
        <div className="funfacts-grid">

          {/* Celda título */}
          <motion.div                  
            className="funfacts-title-cell"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <span className="funfacts-eyebrow">Fun Facts</span>
            <h2 className="funfacts-heading">
              Datos curiosos sobre los novios
            </h2>
            <span className="funfacts-hint">Toca para ver la respuesta</span>
          </motion.div>

          {/* Cards */}
         {facts.map((fact, i) => (
  <motion.div
    key={i}
    className="ff-card"
    onClick={(e) => e.currentTarget.classList.toggle("flipped")}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: i * 0.07 }}
    viewport={{ once: true, amount: 0.1 }}
  >
    <div className="ff-card-inner">
      <div className="ff-front">
        <div className="ff-icon">{fact.icon}</div>
        <p className="ff-question">{fact.question}</p>
      </div>
      <div className="ff-back">
        <p className="ff-answer">{fact.answer}</p>
      </div>
    </div>
  </motion.div>
))}

        </div>
      </div>
    </motion.section>
  );
}

export default FunFacts;