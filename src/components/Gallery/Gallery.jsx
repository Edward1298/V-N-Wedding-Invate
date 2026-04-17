import Navbar from "../Navbar/Navbar";
import { motion } from "framer-motion";

function Gallery() {
  return (
    <motion.section id="gallery"
     initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ amount: 0.5 }}
    style={{
        minHeight: "50vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center"
      }}>

          <Navbar active="gallery" />
         
       <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
      
      <h2>Nuestros Momentos ❤️</h2>
      <p>Muy pronto compartiremos nuestros recuerdos contigo</p>
      </div>
     </motion.section>
     
  );
}

export default Gallery;