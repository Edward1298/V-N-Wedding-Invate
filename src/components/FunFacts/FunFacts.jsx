import Navbar from "../Navbar/Navbar";
import { motion } from "framer-motion";
import "./FunFacts.css";

function FunFacts() {
  const facts = [
    { front: "¿Cuándo nos conocimos", back: "Nos conocimos en 2018" },
    { front: "Cuál es nuestra bebida favorita", back: "La coca cola" },
    { front: "¿En qué país le propuso Nacho a Vale", back: "España" }
  ];

  return (
    <motion.section
      id="funfacts"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ amount: 0.5 }}
      style={{
        minHeight: "70vh", // 👈 importante para que respire mejor
        display: "flex",
        flexDirection: "column",
        textAlign: "center"
      }}
    >
      {/* Navbar arriba */}
      <Navbar active="funfacts" />

      {/* Contenido centrado */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <h2>Fun Facts 💖</h2>

        <div className="cards-container">
          {facts.map((fact, index) => (
            <div className="card" key={index}>
              <div className="card-inner">
                <div className="card-front">{fact.front}</div>
                <div className="card-back">{fact.back}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default FunFacts;