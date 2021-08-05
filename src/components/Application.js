import React, {useState, useEffect} from "react";
import axios from 'axios';
import DayList from './DayList';
import Appointment from './Appointment'

import "components/Application.scss";

export default function Application(props) {
  const appointments = [
    {
      id: 1,
      time: "12pm",
    },
    {
      id: 2,
      time: "1pm",
      interview: {
        student: "Lydia Miller-Jones",
        interviewer: {
          id: 1,
          name: "Sylvia Palmer",
          avatar: "https://i.imgur.com/LpaY82x.png",
        }
      }
    },
    {
      id: 3,
      time: "2pm",
      interview: {
        student: "Archie Cohen",
        interviewer: {
          id: 2,
          name: "Sylvia Palmer",
          avatar: "https://i.imgur.com/LpaY82x.png",
        }
      }
    }
  ];
  const appointmentData = appointments.map(data =>{
    return(
      <Appointment
      key={data.id} 
      id={data.id} 
      time={data.time} 
      interview={data.interview} 
      />
    );
  })
  const [days, setDays] = useState([]);

  useEffect(() => {
    const testURL = 'http://localhost:8001/api/days';
    axios.get(testURL).then(response => {
      setDays(response.data)
      console.log(response.data);
    });
  }, [])
 

  return (
    <main className="layout">
      <section className="sidebar">
      <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu"></nav>
        <DayList
         days={days}
         />
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
      </section>
      <section className="schedule">
      
          {appointmentData}
      
         
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
