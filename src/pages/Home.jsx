import Hero from "../components/Hero";
import EventInfo from "../components/EventInfo";
import RSVP from "../components/RSVP";
import Gallery from "../components/Gallery";
import FunFacts from "../components/FunFacts";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div>     
      <Hero />
      <FunFacts />   
      <EventInfo />    
      <Gallery /> 
      <RSVP />
    </div>
  );
}

export default Home;