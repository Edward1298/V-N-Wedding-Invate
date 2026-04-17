import { useState, useMemo } from "react";
import Navbar from "../Navbar/Navbar";
import { motion } from "framer-motion";
import { supabase } from "../../lib/supabaseClient";
import Swal from "sweetalert2";
import "./RSVP.css";

function RSVP() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [attending, setAttending] = useState("");
  const [loading, setLoading] = useState(false);

  // Se calcula automáticamente cada vez que cambia un campo
  const isFormValid = useMemo(() => {
    return firstName.trim() && lastName.trim() && email.trim() && attending;
  }, [firstName, lastName, email, attending]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    setLoading(true);

    const { error } = await supabase.from("guests").insert([
      {
        first_name: firstName,
        last_name: lastName,
        email: email,
        will_attend: attending,
        message: message,
      },
    ]);

    setLoading(false);

   if (error) {
  console.error(error);
  Swal.fire({
    icon: "error",
    title: "¡Ups!",
    text: "Hubo un error al enviar tu respuesta, intenta de nuevo.",
    confirmButtonText: "Cerrar",
    background: "var(--bg-primary)",
    color: "var(--text-primary)",
    confirmButtonColor: "var(--border-subtle)",
  });
} else {
  Swal.fire({
    icon: "success",
    title: "¡Gracias!",
    text: "Tu respuesta ha sido enviada con éxito. ",
    confirmButtonText: "¡Perfecto!",
    background: "var(--bg-primary)",
    color: "var(--text-primary)",
    confirmButtonColor: "var(--border-subtle)",
  });

  setFirstName("");
  setLastName("");
  setEmail("");
  setMessage("");
  setAttending("");
}
  };

  return (
    <motion.section
      id="rsvp"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ amount: 0.5 }}
      style={{
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <Navbar active="rsvp" />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          background: "var(--bg-primary)",
          width: "min(90%, 560px)",
          margin: "0 auto",
          border: "1px solid var(--border-subtle)",
          borderRadius: "12px",
          padding: "clamp(16px, 5vw, 30px)",
          textAlign: "left",
        }}
      >
        <h3 style={{ textAlign: "left", color: "var(--text-primary)" }}>
          Confirma tu asistencia
        </h3>

        <h5
          style={{
            textAlign: "left",
            color: "var(--hover-soft)",
            marginTop: "0px",
            lineHeight: "1.4",
          }}
        >
          Déjanos saber si vas a poder compartir esta fecha importante con
          nosotros llenando el siguiente formulario:
        </h5>

        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            margin: "0",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            gap: "12px",
          }}
        >
          {/* Nombre */}
          <div style={{ width: "100%" }}>
            <h4 style={{ textAlign: "left", color: "var(--text-primary)" }}>
              Nombre *
            </h4>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="rsvp-input"
            />
            <h5
              style={{
                textAlign: "left",
                color: "var(--hover-soft)",
                marginTop: "0px",
                lineHeight: "1.4",
              }}
            >
              Queremos saber quién nos acompaña en este día especial
            </h5>
          </div>

          {/* Apellidos */}
          <div style={{ width: "100%" }}>
            <h4 style={{ textAlign: "left", color: "var(--text-primary)" }}>
              Apellidos *
            </h4>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="rsvp-input"
            />
            <h5
              style={{
                textAlign: "left",
                color: "var(--hover-soft)",
                marginTop: "0px",
                lineHeight: "1.4",
              }}
            >
              Para identificar correctamente tu invitación
            </h5>
          </div>

          {/* Email */}
          <div style={{ width: "100%" }}>
            <h4 style={{ textAlign: "left", color: "var(--text-primary)" }}>
              Correo electrónico *
            </h4>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rsvp-input"
            />
            <h5
              style={{
                textAlign: "left",
                color: "var(--hover-soft)",
                marginTop: "0px",
                lineHeight: "1.4",
              }}
            >
              Para mantenerte informado sobre los detalles
            </h5>
          </div>

          {/* Mensaje */}
          <div style={{ width: "100%" }}>
            <h4 style={{ textAlign: "left", color: "var(--text-primary)" }}>
              Mensaje (Opcional)
            </h4>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="rsvp-input"
            />
            <h5
              style={{
                textAlign: "left",
                color: "var(--hover-soft)",
                marginTop: "0px",
                lineHeight: "1.4",
              }}
            >
              ¿Alguna alergia, canción favorita o algo que quieras que sepamos?
            </h5>
          </div>

          {/* Toggle asistencia */}
          <div className="rsvp-toggle-wrapper">
            <p className="rsvp-toggle-label">¿Asistirás?</p>
            <div className="rsvp-toggle-container">
              <div
                className={`rsvp-toggle-slider ${attending === "no" ? "slide-right" : ""}`}
              />
              <label
                className={`rsvp-toggle-option ${attending === "yes" ? "selected" : ""}`}
              >
                <input
                  type="radio"
                  name="attending"
                  value="yes"
                  onChange={() => setAttending("yes")}
                />
                SÍ asistiré
              </label>
              <label
                className={`rsvp-toggle-option ${attending === "no" ? "selected" : ""}`}
              >
                <input
                  type="radio"
                  name="attending"
                  value="no"
                  onChange={() => setAttending("no")}
                />
                NO asistiré
              </label>
            </div>
          </div>

          {/* Botón submit */}
          <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`rsvp-submit-btn ${isFormValid ? "enabled" : "disabled"}`}
          >
            {loading ? "Enviando..." : "Enviar respuesta"}
          </button>
        </form>
      </div>
    </motion.section>
  );
}

export default RSVP;