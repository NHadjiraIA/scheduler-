import React from "react";
import InterviewerListItem from './InterviewerListItem'
import "./InterviewerList.scss"
import PropTypes from 'prop-types';
let prop ="hello"
export default function InterviewerList(props) {
  const interviewers = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={event => props.onChange(interviewer.id)}
        
      />
    )
  })
  return (
    <div>
       <h2> interviewer </h2>    
        <ul className="interviewers__list">      
        {interviewers}
        </ul>
    </div>
  )
};
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};