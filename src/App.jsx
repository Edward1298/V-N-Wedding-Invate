import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/login" element={<Navigate to="/admin" replace />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        {/* Cualquier ruta desconocida también redirige al home */}
        <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;