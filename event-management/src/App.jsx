import { createContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Calendar from "./components/Calendar";
import EventForm from "./components/EventForm";

import "./App.css";

export const EventContext = createContext();

function App() {
  const eventValues = {
    events: JSON.parse(localStorage.getItem("events")) || [],
  }
  const [events, setEvents] = useState(JSON.parse(localStorage.getItem('events')) || []);
  // console.log('events', events);

  // Function to add a new event to the list
  const addEvent = (newEvent) => {
    newEvent = {...newEvent, id: events.length > 0 ? events.length+1 : 1}
    setEvents([...events, newEvent]);
    localStorage.setItem('events', JSON.stringify([...events, newEvent]))
  };

  return (
    <EventContext.Provider value={eventValues}>
      <div>
        <h1>Event Scheduler</h1>
        <div style={{display:"flex", justifyContent:'space-evenly', margin:"auto"}}>
        <EventForm addEvent={addEvent} />
        <Calendar events={events} setEvents={setEvents}/>
        </div>
      </div>
    </EventContext.Provider>
  );
}

export default App;
