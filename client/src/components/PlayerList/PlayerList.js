import React from "react";

const PlayerList = props => (
 <div className="playerlist-holder">
  <p><i className="fas fa-circle"></i>M{props.playerName}<i className="fas fa-trophy"></i>24{props.playerScore}</p>
 </div> 
)

export default PlayerList;