import React, {useState, useEffect} from "react";
import axios from 'axios';
import DayList from './DayList';
import Appointment from './Appointment'
import { getAppointmentsForDay,getInterview } from 'components/helpers/selectors'
import "components/Application.scss";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers:{}
  });
 
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const appointmentData =dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
      return(
        <Appointment
        key={appointment.id} 
        id={appointment.id} 
        time={appointment.time} 
        interview={interview} 
        />
      );
    })
  

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    const promise1 = axios.get('/api/days');
    const promise2 = axios.get('/api/appointments');
    const promise3 = axios.get('/api/interviewers');  

    Promise.all([
      Promise.resolve(promise1),
      Promise.resolve(promise2),
      Promise.resolve(promise3),
    ])
    .then((all) => {
      setState (prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    });
 
   
  }, []);  

  return (
    <main className="layout">
      <section className="sidebar">
      <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
         days={state.days}
         day={state.day}
         setDay={setDay}
         />
        </nav>
       
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

 