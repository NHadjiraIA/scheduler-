import React from "react";
import "components/DayListItem.scss"
import classNames from 'classnames';

export default function DayListItem(props) {
  const formatSpots = () => {
    const currentSport = props.spots;
    if (currentSport === 0){
      return "no spots remaining"
    }
    if (currentSport === 1){
      return "1 spot remaining"
    }
    if (currentSport === 2){
      return "2 spots remaining"
    }
     
  }
  const dayClass = classNames(
  
     {"day-list__item": true},
     {"day-list__item--selected":props.selected},
     {"day-list__item--full":props.spots === 0}
   );
  return (
     
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}
 
