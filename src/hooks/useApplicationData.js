import { useState, useEffect} from "react";
import axios from 'axios';
export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers:{}
  });
 
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    const days = updateSpots(`CONFIRM`)
    return axios.put(`/api/appointments/${id}`, { interview })
                 .then(()=>{
                  setState({
                    ...state,
                    appointments,
                    days
                  });
                 }).catch((err)=>{console.loge("error of saving ",err)})
 }
 
 function cancelInterview(id) {
  const appointment = {
    ...state.appointments[id],
    interview: null
  };
  
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  const days = updateSpots();
  return axios.delete(`/api/appointments/${id}`)
              .then(()=>{
               setState(prev => ({
                 ...prev,
                 appointments,
                 days                
               }));
                
              }).catch((err)=>{console.loge("error of deletting ",err)})
 }
 const setDay = day => setState({ ...state, day });

// --------------------------------Func updateSpots-------------------
  function updateSpots(action) {

  const dayIndex = state.days.findIndex(day => day.name === state.day)

  const days = state.days;

  if (action === `CONFIRM`) {
    days[dayIndex].spots -= 1
  } else {
    days[dayIndex].spots += 1
  }

  return days;
  }

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
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}