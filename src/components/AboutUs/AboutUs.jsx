import "./AboutUs.css";
import Navbar from "../Navbar/Navbar";
import { motion } from "framer-motion";

import img1 from "../../assets/AboutUs01.jpeg"; // horizontal 2304x1536
import img2 from "../../assets/AboutUs02.jpeg"; // horizontal 2304x1536
import img3 from "../../assets/AboutUs03.jpeg"; // vertical 1536x2304

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

function AboutUs() {
  return (
    <motion.section
      id="aboutus"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ amount: 0.1 }}
      className="aboutus-section"
    >
      <Navbar active="aboutus" />

      <div className="aboutus-container">

        {/* HEADER */}
        <motion.div
          className="aboutus-header"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="aboutus-eyebrow">Una historia de amor</span>
          <h2 className="aboutus-title">Nuestra Historia</h2>
          <div className="aboutus-divider">
            <span className="divider-line" />
            <span className="divider-diamond">◆</span>
            <span className="divider-line" />
          </div>
          <p className="aboutus-intro">
            Cada historia de amor tiene un inicio… la nuestra comenzó cuando menos lo esperábamos.
          </p>
        </motion.div>

        {/* BLOQUE 1: imagen izquierda, texto derecha */}
        <div className="aboutus-block block-left">
          <motion.div
            className="aboutus-frame"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={0}
            viewport={{ once: true }}
          >
            <div className="frame-inner">
              <img src={img3} alt="Nuestra historia" className="portrait" />
            </div>
            <div className="frame-corner tl" />
            <div className="frame-corner tr" />
            <div className="frame-corner bl" />
            <div className="frame-corner br" />
          </motion.div>

          <motion.div
            className="aboutus-text-block"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={1}
            viewport={{ once: true }}
          >
            <span className="text-label">01</span>
            <p className="text-body">
              Nos conocimos en un momento inesperado, sin imaginar que ese encuentro cambiaría nuestras vidas para siempre.
            </p>
            <p className="text-body">
              Con el tiempo, cada conversación, cada risa y cada mirada fueron construyendo algo único.
            </p>
          </motion.div>
        </div>

        {/* BLOQUE 2: texto izquierda, imagen derecha */}
        <div className="aboutus-block block-right">
          <motion.div
            className="aboutus-text-block"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={0}
            viewport={{ once: true }}
          >
            <span className="text-label">02</span>
            <p className="text-body">
              Hoy celebramos no solo nuestro amor, sino todo el camino que hemos recorrido juntos.
            </p>
            <p className="text-body text-italic">
              Y lo que apenas comienza.
            </p>
          </motion.div>

          <motion.div
            className="aboutus-frame"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={1}
            viewport={{ once: true }}
          >
            <div className="frame-inner">
              <img src={img1} alt="Nuestra historia" className="landscape" />
            </div>
            <div className="frame-corner tl" />
            <div className="frame-corner tr" />
            <div className="frame-corner bl" />
            <div className="frame-corner br" />
          </motion.div>
        </div>

        {/* IMAGEN FINAL CENTRADA */}
        <motion.div
          className="aboutus-finale"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="finale-frame">
            <img src={img2} alt="Nuestra historia" />
            <div className="frame-corner tl" />
            <div className="frame-corner tr" />
            <div className="frame-corner bl" />
            <div className="frame-corner br" />
          </div>
          <p className="finale-quote">
            "Y así, sin buscarlo, nos encontramos."
          </p>
        </motion.div>

      </div>
    </motion.section>
  );
}

export default AboutUs;