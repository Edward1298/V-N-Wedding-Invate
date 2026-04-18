import "./Navbar.css";
const sections = [
  { id: "hero", label: "Inicio" },
   { id: "aboutus", label: "Nuestra Historia" },
  { id: "funfacts", label: "Datos curiosos" },
  { id: "event", label: "Detalles" },
  { id: "rsvp", label: "RSVP" }
];

function Navbar({ active }) {
  const sections = [
    { id: "hero", label: "Inicio" },
      { id: "aboutus", label: "Nuestra Historia" },
    { id: "funfacts", label: "Datos curiosos" },
    { id: "event", label: "Detalles" },
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