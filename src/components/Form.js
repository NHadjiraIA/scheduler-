import React, {useState} from "react";
import Button from "./Button"
import InterviewerList from './InterviewerList'
import "components/Appointment/styles.scss"
export default function Form(props) {
  const [error, setError] = useState("");
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] =useState(props.interviewer || null)
  const reset = (e) =>{ 
   setName("")   
   setInterviewer(null)  
   props.onCancel()

  }
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(name, interviewer);
  }
  
  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        value= {name}
        type="text"
        placeholder="Enter Student Name"
        id="name-input"
        onChange={(e) => setName(e.target.value)}
        data-testid="student-name-input"
      />
        
    </form>
    <section className="appointment__validation">{error}</section>

    <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger
       onClick={reset}
      >Cancel</Button>
      <Button confirm
        onClick={validate}
      >Save</Button>
    </section>
  </section>
</main>

  );
}