import React, {useState, useEffect} from "react";

import DayList from './DayList';
import Appointment from './Appointment'
import useApplicationData from "hooks/useApplicationData"
import { getAppointmentsForDay,getInterview, getInterviewersForDay} from 'components/helpers/selectors'
import "components/Application.scss";

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();


  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  const appointmentData =dailyAppointments.map((appointment)=> {
    const dailyInterviewers = getInterviewersForDay(state, state.day);
    const interview = getInterview(state, appointment.interview);
      return(
        <Appointment
        key={appointment.id} 
        id={appointment.id} 
        time={appointment.time} 
        interview={interview} 
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        />
      );
    })
  

  

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

 