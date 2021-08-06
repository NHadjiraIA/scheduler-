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
