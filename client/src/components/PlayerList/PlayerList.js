import React from "react";

const PlayerList = props => (
  <div className="player">
    <div className="navbar-username">
      <span style={{color:props.userColor}}>
        <i className="fas fa-circle"></i>
      </span> {props.playerName}
    </div>

    <span className="navbar-score"><i className="fas fa-trophy"></i> {props.playerScore}</span>
  </div>
)

export default PlayerList;