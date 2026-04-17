import Hero from "../components/Hero/Hero";
import EventInfo from "../components/EventInfo/EventInfo";
import RSVP from "../components/RSVP/RSVP";
import Gallery from "../components/Gallery/Gallery";
import FunFacts from "../components/FunFacts/FunFacts";

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