import React, {useState} from "react";
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
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
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
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    
    transition(SAVING);
     
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }
  function cancel() {
    transition(DELETING, true);

    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }
 
  return(

    <article className="appointment">
       <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={event=> transition(CREATE)} />}
      {mode === CREATE &&
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />}
      {mode === SAVING && (<Status message="Saving" />)}
       
      {mode === EDIT &&
        <Form
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          name={props.interview.student}
          onCancel={back}
          onSave={save}
        />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={()=> transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
       )}
        {mode === CONFIRM && <Confirm
        message="Are you sure you would like to delete?"
        onCancel={back}
        onConfirm={cancel} />}
         {mode === ERROR_SAVE && <Error message="Could not book appointment" onClose={back} />}
         {mode === DELETING && <Status message="Deleting" />}
         {mode === ERROR_DELETE && <Error message="Could not cancel appointment" onClose={back} />}

    </article>
   
  );

}