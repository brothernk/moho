import React from "react";

const PlayerList = props => (
  <tr className="player">
    <td><span style={{color:props.userColor}}>
      <i className="fas fa-circle"></i>
    </span> {props.playerName}</td>
    <td><i className="fas fa-trophy"></i> {props.playerScore}</td>
  </tr>
)

export default PlayerList;