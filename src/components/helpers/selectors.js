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
  // //... returns an array of appointments for that day
  // let resultF = state.days.filter(d => d.name === day);
  // let appointments = [];
  // if(resultF.length === 1){
  //   resultF[0].appointments.forEach(aptId => {
  //     appointments.push(state.appointments[aptId]);
  //   });
  // }
  // appointments.forEach(aptId => {
  //   appointments.push(state.appointments[aptId]);
  // });
  // let result = getInterview(state,appointments[2].interview)
  // console.log("@@@@@@@@@@@@@@@@@@@",appointments[2].interview)
  // console.log("resutl",result)
  // return appointments;

  if (state.days.length > 0) {
    const dayObj = state.days.filter(obj => obj.name === day);

   
    if (dayObj.length === 1) {
     
      const interviewersArr = dayObj[0].appointments;
       
      const daysInterviewers = interviewersArr.map(int => state.interviewers[int]);
      console.log(daysInterviewers)
      return daysInterviewers;
    } else {
      return [];
    }
  } else {
    return [];
  }
  
}
