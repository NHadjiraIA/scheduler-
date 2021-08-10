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
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
   
    return axios.put(`/api/appointments/${id}`, { interview })
                 .then(()=>{
                  setState({
                    ...state,
                    appointments
                  });
                 // updateSpots(id,"Confirmed")
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
  return axios.delete(`/api/appointments/${id}`)
              .then(()=>{
               setState(prev => ({
                 ...prev,
                 appointments                 
               }));
              // updateSpots(id,"Canceled")
              }).catch((err)=>{console.loge("error of deletting ",err)})
 }
 const setDay = day => setState({ ...state, day });
 function updateSpots(id,action) {
   //create a shallow copy of the days array
  let daysArr = [...state.days];
  let currentDay = {...daysArr.filter(d=>d.name == state.day)[0]};
  if(action === "Canceled"){
   currentDay.spots++;
  } else if (action === "Confirmed"){
    currentDay.spots--;
  }
   setState({
     days: daysArr
   });
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