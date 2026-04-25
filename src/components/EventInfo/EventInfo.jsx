import Navbar from "../Navbar/Navbar";
import { motion } from "framer-motion";
import "./EventInfo.css";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

// SVG íconos inline
const IconChurch = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4">
    <line x1="32" y1="4" x2="32" y2="14"/>
    <line x1="27" y1="9" x2="37" y2="9"/>
    <rect x="10" y="24" width="44" height="36" rx="1"/>
    <path d="M10 24 L32 14 L54 24"/>
    <rect x="24" y="40" width="16" height="20" rx="1"/>
    <rect x="14" y="30" width="10" height="10" rx="1"/>
    <rect x="40" y="30" width="10" height="10" rx="1"/>
  </svg>
);

const IconVenue = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4">
    <rect x="6" y="28" width="52" height="32" rx="1"/>
    <path d="M6 28 L32 10 L58 28"/>
    <rect x="20" y="38" width="10" height="10" rx="1"/>
    <rect x="34" y="38" width="10" height="10" rx="1"/>
    <rect x="24" y="48" width="16" height="12" rx="1"/>
    <line x1="32" y1="10" x2="32" y2="4"/>
    <line x1="28" y1="7" x2="36" y2="7"/>
  </svg>
);

const IconClock = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4">
    <circle cx="32" cy="32" r="24"/>
    <line x1="32" y1="16" x2="32" y2="32"/>
    <line x1="32" y1="32" x2="44" y2="38"/>
    <circle cx="32" cy="32" r="2" fill="currentColor" stroke="none"/>
  </svg>
);

const IconCloud = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4">
    <circle cx="22" cy="34" r="10"/>
    <circle cx="38" cy="30" r="13"/>
    <line x1="32" y1="14" x2="32" y2="8"/>
    <line x1="44" y1="18" x2="48" y2="14"/>
    <line x1="20" y1="18" x2="16" y2="14"/>
    <path d="M12 44 Q22 44 22 44 Q22 44 48 44" strokeLinecap="round"/>
    <rect x="8" y="44" width="48" height="12" rx="6" strokeWidth="0" fill="none"/>
    <path d="M10 44 Q32 38 54 44" strokeWidth="1.4"/>
  </svg>
);

const IconMoon = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M40 12 Q28 16 28 32 Q28 48 40 52 Q24 56 16 44 Q8 32 16 20 Q24 8 40 12Z"/>
    <circle cx="46" cy="18" r="3"/>
    <circle cx="52" cy="28" r="2"/>
    <circle cx="42" cy="10" r="1.5"/>
  </svg>
);

const IconDress = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M22 8 L18 20 L8 56 L56 56 L46 20 L42 8"/>
    <path d="M22 8 Q32 16 42 8"/>
    <path d="M18 20 Q32 26 46 20"/>
  </svg>
);

const IconWaze = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="32" cy="28" r="20"/>
    <circle cx="24" cy="26" r="2.5" fill="currentColor" stroke="none"/>
    <circle cx="40" cy="26" r="2.5" fill="currentColor" stroke="none"/>
    <path d="M24 34 Q32 40 40 34" strokeLinecap="round"/>
    <path d="M44 44 Q48 50 40 52" strokeLinecap="round"/>
    <circle cx="36" cy="53" r="3"/>
  </svg>
);

const IconMaps = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M32 8 C22 8 14 18 14 27 C14 42 32 56 32 56 C32 56 50 42 50 27 C50 18 42 8 32 8Z"/>
    <circle cx="32" cy="27" r="8"/>
    <line x1="32" y1="19" x2="32" y2="8"/>
  </svg>
);

const IconPhone = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4">
    <rect x="18" y="4" width="28" height="56" rx="4" />
    <line x1="26" y1="12" x2="38" y2="12" />
    <circle cx="32" cy="52" r="2" />
  </svg>
);

const IconSinpe = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M12 32 C12 20 20 12 32 12 C44 12 52 20 52 32" />
    <polyline points="24,24 32,12 40,24" />
    <rect x="20" y="32" width="24" height="18" rx="2" />
    <line x1="32" y1="32" x2="32" y2="50" />
    <line x1="20" y1="41" x2="44" y2="41" />
  </svg>
);

const events = [
  {
    type: "Ceremonia",
    icon: <IconChurch />,
    time: "2:00 PM",
    name: "Iglesia Nuestra Señora de Fátima",
    address: "Los Yoses, San José, Costa Rica",
    waze: "https://waze.com/ul/hd1u0rpw6n",
    maps: "https://maps.app.goo.gl/Fy25qS3xT43VbeVe7?g_st=ic",
  },
  {
    type: "Celebración",
    icon: <IconVenue />,
    time: "4:00 PM",
    name: "Hotel Estancia El Rodeo",
    address: "San Rafael, Heredia, Costa Rica",
    waze: "https://waze.com/ul/hd1u0gbpw7",
    maps: "https://maps.app.goo.gl/5jYiuhiRhLZTRzVE9?g_st=ic",
  },
];

const weather = {
  condition: "Parcialmente nublado",
  afternoon: { label: "Tarde", temp: "26°" },
  night: { label: "Noche", temp: "17°" },
};

const sinpeContacts = [
  {
    name: "Jose Ignacio Ramirez Villanea",  
    phone: "8320-3884",                
              
  },
  {
    name: "Valeria Camacho Sandí",  
    phone: "8419-2861",                 
  },
];




function EventInfo() {

  const [copiedIndex, setCopiedIndex] = useState(null);

const handleCopy = (phone, index) => {
  navigator.clipboard.writeText(phone.replace("-", ""));
  setCopiedIndex(index);
  setTimeout(() => setCopiedIndex(null), 2000);
};

  return (
    <motion.section
      id="eventinfo"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ amount: 0.1 }}
      className="eventinfo-section"
    >
      <Navbar active="eventinfo" />

      <div className="eventinfo-container">

        {/* ── HERO FECHA ── */}
        <motion.div
          className="eventinfo-hero"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <span className="eventinfo-eyebrow">La gran fecha</span>
          <h2 className="eventinfo-date">14 · XI · MMX XIV</h2>
          <div className="eventinfo-divider">
            <span className="divider-line" />
            <span className="divider-diamond">◆</span>
            <span className="divider-line" />
          </div>
          <p className="eventinfo-subtitle">14 de Noviembre — San José, Costa Rica</p>
        </motion.div>

        {/* ── CARDS DE EVENTOS ── */}
        <div className="eventinfo-events">
          {events.map((ev, i) => (
            <motion.div
              key={i}
              className="event-card"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={i}
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="event-card-header">
                <span className="event-type">{ev.type}</span>
                <div className="event-icon">{ev.icon}</div>
              </div>

              <div className="event-card-body">
                <div className="event-time">
                  <div className="event-time-icon"><IconClock /></div>
                  <span>{ev.time}</span>
                </div>
                <h3 className="event-name">{ev.name}</h3>
                <p className="event-address">{ev.address}</p>
              </div>

              <div className="event-card-footer">
                <a href={ev.waze} target="_blank" rel="noopener noreferrer" className="map-btn waze-btn">
                  <IconWaze />
                  <span>Waze</span>
                </a>
                <a href={ev.maps} target="_blank" rel="noopener noreferrer" className="map-btn maps-btn">
                  <IconMaps />
                  <span>Google Maps</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── CONSIDERACIONES ── */}
        <motion.div
          className="eventinfo-considerations"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <span className="eventinfo-eyebrow">Consideraciones</span>
          <div className="considerations-grid">

            {/* Clima */}
            <div className="consideration-card">
              <div className="consideration-header">
                <span className="consideration-label">Clima</span>
                <div className="consideration-icon"><IconCloud /></div>
              </div>
              <p className="consideration-condition">{weather.condition}</p>
              <div className="weather-temps">
                <div className="weather-temp-block">
                  <div className="weather-temp-icon"><IconClock /></div>
                  <span className="weather-temp-label">{weather.afternoon.label}</span>
                  <span className="weather-temp-value">{weather.afternoon.temp}</span>
                </div>
                <div className="weather-divider" />
                <div className="weather-temp-block">
                  <div className="weather-temp-icon"><IconMoon /></div>
                  <span className="weather-temp-label">{weather.night.label}</span>
                  <span className="weather-temp-value">{weather.night.temp}</span>
                </div>
              </div>
            </div>

            {/* Vestimenta */}
            <div className="consideration-card">
              <div className="consideration-header">
                <span className="consideration-label">Código de vestimenta</span>
                <div className="consideration-icon"><IconDress /></div>
              </div>
              <p className="consideration-dress-main">Todo de Negro</p>
              <p className="consideration-dress-sub">
                Formal. Celebremos con elegancia y en sintonía con la noche.
              </p>
            </div>

          </div>

          <span className="eventinfo-eyebrow">Muestras de cariño</span>
          <span className="eventinfo-eyebrow">Su compañía en nuestra Boda es el regalo más valioso. Si deseas obsequiarnos algo adicional, un aporte económico es siempre bienvenido</span>

         <div className="considerations-grid">
            {sinpeContacts.map((contact, i) => (
              <div className="consideration-card sinpe-card" key={i}>

                <div className="consideration-header">
                  <span className="consideration-label">Sinpe Móvil</span>
                  <div className="consideration-icon"><IconPhone /></div>
                </div>

                <div className="sinpe-body">
                  <div className="sinpe-icon-wrapper">
                    <IconSinpe />
                  </div>

                  <p className="sinpe-name">{contact.name}</p>

                  <div className="sinpe-number-row">
                    <span className="sinpe-number">{contact.phone}</span>
                  </div>

                  {contact.bank && (
                    <span className="sinpe-bank">{contact.bank}</span>
                  )}

                  <button
                    className={`sinpe-copy-btn ${copiedIndex === i ? "copied" : ""}`}
                    onClick={() => handleCopy(contact.phone, i)}
                  >
                    {copiedIndex === i ? "¡Copiado! ✓" : "Copiar número"}
                  </button>
                </div>

              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
}

export default EventInfo;