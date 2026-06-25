import "./Navbar.css";

function Navbar({ active }) {
  const sections = [
    { id: "hero", label: "Inicio" },
      { id: "aboutus", label: "Nuestra Historia" },
    { id: "funfacts", label: "Datos curiosos" },
    { id: "eventinfo", label: "Detalles" },
    { id: "rsvp", label: "RSVP" }
  ];

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollTo(section.id)}
          className={`nav-link ${active === section.id ? "active" : ""}`}
        >
          {section.label}
        </button>
      ))}
    </nav>
  );
}

export default Navbar;