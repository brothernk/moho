import React from "react";

export const SignupBtn = props => (
  <div>
    { props.randomword !== "" ?
      <div id = "roomkey"> 
        <i className="fas fa-key" id="key-icon"></i>
        <p>Your room key is</p>
        <p id="random-word">{props.randomword}</p>
      </div>
    : null }

    { props.showbutton === "true" ?
      <span {...props} id = {props.id} className="btn signup-btn">
      Create Game
      </span>
    : null }  
  </div>
)





