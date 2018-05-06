import React from "react";

const CurrentPlayer = props => (
  <tr className="player">
    <td><span style={{color:props.userColor}}>
      <i className="fas fa-circle"></i>
    </span> {props.playerName}</td>
    <td><i className="fas fa-trophy"></i> {props.playerScore}</td>
  </tr>
)

export default CurrentPlayer;