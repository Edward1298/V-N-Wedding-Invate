import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import "./AdminLogin.css";
import { useNavigate } from "react-router-dom";


const IconUser = () => (
  <svg width="22" height="22" viewBox="0 0 64 64" fill="none"
    stroke="currentColor" strokeWidth="1.5">
    <circle cx="32" cy="22" r="12" />
    <path d="M10 56 C10 42 54 42 54 56" strokeLinecap="round" />
  </svg>
);



export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleLogin = async () => {
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("Usuario o contraseña incorrectos.");
    } else {
      navigate("/admin/dashboard");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login">

        <div className="admin-login-avatar">
          <IconUser />
        </div>

        <p className="admin-login-title">Panel de administración</p>
        <p className="admin-login-subtitle">V &amp; N · Boda 2026</p>

        <div className="admin-login-fields">
          <input
            type="text"
            placeholder="Email"
            className="admin-login-input"
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="admin-login-input"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        {error && (
          <div className="admin-login-error">{error}</div>
        )}

        <button
          className="admin-login-btn"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>

        <p className="admin-login-footer">
          Acceso restringido · Solo para los novios
        </p>

      </div>
    </div>
  );
}