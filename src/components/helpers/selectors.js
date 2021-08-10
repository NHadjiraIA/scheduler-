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
export function getInterviewersForDay(state, day) {
  let dayArr= state.days.filter(d => d.name == day);
  let appointments = dayArr.length == 0 ? [] : dayArr[0].appointments;
  var interviewerId = null;
  let interviewers = [];
   dayArr[0].interviewers.forEach(intervId =>{
    var interviewer = state.interviewers[intervId];
    interviewers.push(interviewer)
    // interviewerId =  interview == null ? null : interview.interviewer;
    // if(interviewerId !== null){
    //   interviewers.push(state.interviewers[interviewerId]);
    })
  //});
  return interviewers;

}
