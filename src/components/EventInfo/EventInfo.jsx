import { motion } from "framer-motion";
import Navbar from "../Navbar/Navbar";

function EventInfo() {
  return (
     <motion.section
     id="event"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ amount: 0.5 }}
      style={{
          minHeight: "100vh", // 👈 importante para que respire mejor
        display: "flex",
        flexDirection: "column",
        textAlign: "center"
      }}
    >
        <Navbar active="event" />
         
       <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
      <h2>Detalles del Evento</h2>

      <p>📍 Salón Jardín Los Olivos</p>
      <p>🕒 5:00 PM</p>

      <div style={{ marginTop: "30px" }}>
        <iframe
          title="map"
          src="https://www.google.com/maps?q=San+Jose&output=embed"
          width="100%"
          height="300"
          style={{ border: "0", borderRadius: "10px" }}
        ></iframe>
      </div>
      </div>
    </motion.section>
  );
}

export default EventInfo;