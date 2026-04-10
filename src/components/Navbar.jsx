
const sections = [
  { id: "hero", label: "Inicio" },
  { id: "funfacts", label: "Nosotros" },
  { id: "event", label: "Detalles" },
  { id: "gallery", label: "Galería" },
  { id: "rsvp", label: "RSVP" }
];

function Navbar({ active }) {
  const sections = [
    { id: "hero", label: "Inicio" },
    { id: "funfacts", label: "Nosotros" },
    { id: "event", label: "Detalles" },
    { id: "gallery", label: "Galería" },
    { id: "rsvp", label: "RSVP" }
  ];

  const scrollTo = (id) => {
    const element = document.getElementById(id);

    element.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <nav className="navbar">
      {sections.map((section) => (
        <span
          key={section.id}
          onClick={() => scrollTo(section.id)}
          className={active === section.id ? "active" : ""}
        >
          {section.label}
        </span>
      ))}
    </nav>
  );
}

export default Navbar;