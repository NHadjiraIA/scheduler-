export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  let resultF = state.days.filter(d => d.name === day);
  let appointments = [];
  if(resultF.length === 1){
    resultF[0].appointments.forEach(aptId => {
      appointments.push(state.appointments[aptId]);
    });
  }
  return appointments;
}
export function getInterview(state, interview) {
  let interviewer = { 
    "student": " ",
    "interviewer": {  
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    }
}
if (interview){
  let keyInterviewer = interview["interviewer"]
interviewer["student"]= interview["student"]
interviewer["interviewer"] = state.interviewers[keyInterviewer]
 
return interviewer;
} else {
  return null
}

}

export function getInterviewersForDay(state, dayName) {
  let day = state.days.filter(d => d.name == dayName)[0];
  let interviewers = [];
  if(day !== undefined && day.interviewers !== undefined){
    day.interviewers.forEach(interviewerId =>{
      interviewers.push(state.interviewers[interviewerId]);
  });
  }
  return interviewers;
}
