import React, {useState,useEffect} from "react";
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
import Status from "components/Status"
import Confirm from "components/Confirm"
import useVisualMode from  "hooks/useVisualMode"
import Form from "components/Form"
import Error from "components/Error"

export default function Appointment(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{}
  });
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW"; 
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const ERROR_SAVE = "ERROR_SAVE";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const CONFIRM = "CONFIRM"
  const ERROR_DELETE = "ERROR_DELETE"
  const { mode, transition, back } = useVisualMode(
    props.interviewer ? SHOW : EMPTY
  );
  useEffect(() => {
    if (props.interview && mode === EMPTY) {
      transition(SHOW);
    }
    if (props.interview === null && mode === SHOW) {
      transition(EMPTY);
    }
  }, [props.interview, transition, mode]);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    if(interviewer){
      transition(SAVING);
     
      props.bookInterview(props.id, interview)
        .then(() => transition(SHOW))
        .catch(() => transition(ERROR_SAVE, true));
    }else {
      transition(ERROR_SAVE);
    }
    
  }
  
  function comeBackToConfirm (){
   transition(CONFIRM)
  }
  function comeBackToEmpty (){
    transition(EMPTY)
   }
  function cancelDeleting (){
    transition(SHOW)
  }
  function confirmDeleting (){
    transition(ERROR_DELETE)
  }
  return(

    <article className="appointment" data-testid="appointment">
       <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={event=> transition(CREATE)} />}
      {mode === SHOW && props.interview &&(
      <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={()=> transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
       )}
      {mode === CREATE &&
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />}
       
       {mode === EDIT &&
        <Form
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          name={props.interview.student}
          onCancel={back}
          onSave={save}
        />}
     
        {mode === SAVING && (<Status message="Saving" />)}
        {mode === DELETING && <Status message="Deleting" />}
     
       {mode === CONFIRM && 
       <Confirm
        message="Are you sure you would like to delete?"
        onCancel={cancelDeleting}
        onConfirm={confirmDeleting} 
        />}
         {mode === ERROR_SAVE && 
         <Error message="Could not book appointment" onClose={comeBackToEmpty} />}
        
         {mode === ERROR_DELETE &&
          <Error message="Could not cancel appointment" onClose={comeBackToConfirm} />}

    </article>
   
  );

}