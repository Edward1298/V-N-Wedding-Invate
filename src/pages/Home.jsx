import Hero from "../components/Hero/Hero";
import EventInfo from "../components/EventInfo/EventInfo";
import RSVP from "../components/RSVP/RSVP";
import AboutUs from "../components/AboutUs/AboutUs";
import FunFacts from "../components/FunFacts/FunFacts";

function Home() {
  return (
    <div>     
      <Hero />
      <AboutUs /> 
      <FunFacts />   
      <EventInfo />    
      <RSVP />
    </div>
  );
}

export default Home;