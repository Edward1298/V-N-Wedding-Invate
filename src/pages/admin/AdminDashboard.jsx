import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import Galaxy from "../../components/Galaxy/Galaxy";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [guests, setGuests]     = useState([]);
  const [filter, setFilter]     = useState("all");
  const [loading, setLoading]   = useState(true);
  const [showUI, setShowUI]     = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGuests();
    const timer = setTimeout(() => setShowUI(true), 900);
    return () => clearTimeout(timer);
  }, []);

  const fetchGuests = async () => {
    const { data } = await supabase.from("guests").select("*");
    setGuests(data ?? []);
    setLoading(false);
  };

  const handleDelete = async () => {
    await supabase.from("guests").delete().eq("id", deleteId);
    setDeleteId(null);
    fetchGuests();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin", { replace: true });
  };

  const filteredGuests = guests.filter((g) => {
    if (filter === "yes") return g.will_attend === "yes";
    if (filter === "no")  return g.will_attend === "no";
    return true;
  });

  const attending    = guests.filter((g) => g.will_attend === "yes").length;
  const notAttending = guests.filter((g) => g.will_attend === "no").length;

  return (
    <div className="dashboard-root">

      <div className="galaxy-bg">
        <Galaxy mouseRepulsion={false} density={1.2} glowEffect={false} speed={0.3} />
      </div>

      <AnimatePresence>
        {deleteId && (
          <motion.div className="confirm-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="confirm-card"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.2 }}>
              <p className="confirm-title">¿Eliminar registro?</p>
              <p className="confirm-sub">Esta acción no se puede deshacer.</p>
              <div className="confirm-actions">
                <button className="btn-ghost" onClick={() => setDeleteId(null)}>Cancelar</button>
                <button className="btn-danger" onClick={handleDelete}>Sí, eliminar</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showUI && (
          <motion.div className="dashboard-ui"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>

            <div className="dash-header">
              <div>
                <p className="dash-eyebrow">Panel de administración</p>
                <h1 className="dash-title">Lista de invitados</h1>
              </div>
              <button className="btn-logout" onClick={handleLogout}>Cerrar sesión</button>
            </div>

            <div className="stats-row">
              <div className="stat-card">
                <span className="stat-label">Total</span>
                <span className="stat-value">{guests.length}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Asisten</span>
                <span className="stat-value attending">{attending}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">No asisten</span>
                <span className="stat-value not-attending">{notAttending}</span>
              </div>
            </div>

            <div className="table-wrapper">
              <div className="filter-row">
                {["all", "yes", "no"].map((f) => (
                  <button key={f}
                    className={`filter-btn ${filter === f ? "active" : ""}`}
                    onClick={() => setFilter(f)}>
                    {f === "all" ? "Todos" : f === "yes" ? "Asisten" : "No asisten"}
                  </button>
                ))}
              </div>

              {loading ? (
                <p className="dash-loading">Cargando...</p>
              ) : filteredGuests.length === 0 ? (
                <p className="dash-empty">No hay registros para este filtro.</p>
              ) : (
                <div className="table-scroll">
                  <table className="dash-table">
                    <thead>
                      <tr>
                        <th className="col-resizable">Nombre</th>
                        <th className="col-resizable">Apellidos</th>
                        <th className="col-resizable">Correo</th>
                        <th className="col-resizable col-narrow">Asiste</th>
                        <th className="col-resizable col-wide">Mensaje</th>
                        <th className="col-actions"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredGuests.map((guest) => (
                        <tr key={guest.id}>
                          <td>{guest.first_name ?? "—"}</td>
                          <td>{guest.last_name  ?? "—"}</td>
                          <td>{guest.email      ?? "—"}</td>
                          <td>
                            <span className={`badge ${guest.will_attend === "yes" ? "badge-yes" : "badge-no"}`}>
                              {guest.will_attend === "yes" ? "Sí" : "No"}
                            </span>
                          </td>
                          <td className="td-message">{guest.message || "—"}</td>
                          <td>
                            <button className="btn-delete" onClick={() => setDeleteId(guest.id)}>
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}