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
sparkles: (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M32 8 L36 24 L52 28 L36 32 L32 48 L28 32 L12 28 L28 24 Z"/>
    <path d="M48 12 L50 18 L56 20 L50 22 L48 28 L46 22 L40 20 L46 18 Z"/>
  </svg>
),
  location: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M32 8 C20 8 12 18 12 27 C12 42 32 58 32 58 C32 58 52 42 52 27 C52 18 44 8 32 8Z"/>
      <circle cx="32" cy="27" r="7"/>
    </svg>
  ),
chat: (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="10" y="12" width="44" height="30" rx="6"/>
    <path d="M20 42 L20 52 L30 44"/>
    <line x1="20" y1="22" x2="44" y2="22"/>
    <line x1="20" y1="30" x2="38" y2="30"/>
  </svg>
),
  travel: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 44 L28 20 L36 28 L48 14 L56 22"/>
      <path d="M4 52 L60 52"/>
      <path d="M40 52 L40 28"/>
    </svg>
  ),
infinity: (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 32 
             C14 20, 28 20, 32 32 
             C36 44, 50 44, 50 32 
             C50 20, 36 20, 32 32 
             C28 44, 14 44, 14 32"/>
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
    icon: icons.location,
    question: "¿Dónde nos conocimos?",
    answer: "En la universidad… y, para ser honestos, al inicio Nacho me caía mal.",
  },
  {
    icon: icons.sparkles,
    question: "¿Cómo fue nuestra primera cita?",
    answer: "Nada tradicional: fuimos a Monteverde y nos tiramos de bungee.",
  },
  {
    icon: icons.heart,
    question: "¿Quién dijo “te amo” primero?",
    answer: "Nacho. Y desde ese momento, todo empezó a sentirse aún más real.",
  },
  {
    icon: icons.chat,
    question: "¿Cuál es nuestro plan favorito?",
    answer: "Cualquier plan que incluya fast food y, por supuesto, Coca-Cola Zero.",
  },
  {
    icon: icons.ring,
    question: "¿Dónde fue la propuesta?",
    answer: "En Segovia, España, un 4 de julio… muy Nacho e imposible de olvidar.",
  },
  {
    icon: icons.travel,
    question: "¿En cuántos países hemos estado juntos?",
    answer: "Ya vamos por 6 países y varias ciudades…",
  },
  {
    icon: icons.infinity,
    question: "¿Cuántos hijos queremos tener?",
    answer: "Vale quiere uno, Nacho quiere tres… ya veremos.",
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