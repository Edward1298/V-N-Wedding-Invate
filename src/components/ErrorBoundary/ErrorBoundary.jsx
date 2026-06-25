import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "100vh",
          background: "#000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          padding: "20px",
        }}>
          <p style={{
            fontFamily: "Georgia, serif",
            color: "#fff",
            fontSize: "1.2rem",
            textAlign: "center",
          }}>
            Algo salió mal.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: "none",
              border: "1px solid #5e5e5e",
              color: "#c6c6c6",
              padding: "10px 24px",
              cursor: "pointer",
              fontFamily: "Georgia, serif",
              fontSize: "0.9rem",
            }}
          >
            Recargar página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
