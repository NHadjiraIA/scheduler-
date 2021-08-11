import React from "react";
import DayListItem from './DayListItem'

export default function DayList(props) {
 
 const dayItem = props.days.map(data =>{
   return (
     <DayListItem 
     data-testid="day"
     key={data.id}
     name={data.name} 
     spots={data.spots} 
     selected={data.name === props.day}
     setDay={props.setDay}
     />
   )
 })
  return (
    <ul >
       {dayItem}
    </ul>
  )
}
;