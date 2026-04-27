import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

export default function ProtectedRoute({ children }) {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (mounted) setSession(data.session ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (mounted) setSession(session ?? null);
      }
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  if (session === undefined) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <p style={{
          fontFamily: "Georgia, serif",
          color: "#5e5e5e",
          fontSize: "0.8rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase"
        }}>
          Verificando sesión...
        </p>
      </div>
    );
  }

  if (!session) return <Navigate to="/admin" replace />;

  return children;
}