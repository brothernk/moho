import React from "react";

const nextRndBtn = props => (
  <div>
    { props.showbutton === "true" ?
      <span {...props} id = {props.id} className="btn signup-btn">
      Next Game
      </span>
    : null }  
  </div>
);

export default nextRndBtn;