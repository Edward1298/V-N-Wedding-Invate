import { useState } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";


function RSVP() {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, attending });
  };

  return (
    <motion.section id="rsvp"
     initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ amount: 0.5 }}
    style={{
          minHeight: "90vh", // 👈 importante para que respire mejor
        display: "flex",
        flexDirection: "column",
        textAlign: "center"
      }}>

          <Navbar active="rsvp" />
         
       <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}
      >

      <h2>Confirma tu asistencia</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto" }}>
        
        <input
          type="text"
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <select
          value={attending}
          onChange={(e) => setAttending(e.target.value)}
          style={inputStyle}
        >
          <option value="">¿Asistirás?</option>
          <option value="yes">Sí</option>
          <option value="no">No</option>
        </select>

        <button style={buttonStyle}>Confirmar</button>
      </form>
      </div>
     </motion.section>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "5px",
  border: "none"
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#5e5e5e",
  border: "none",
  color: "#1a1a1a",
  fontWeight: "bold",
  cursor: "pointer"
};

export default RSVP;