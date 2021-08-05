import React, {useState, useEffect} from "react";
import axios from 'axios';
import DayList from './DayList';

import "components/Application.scss";

export default function Application(props) {
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
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
