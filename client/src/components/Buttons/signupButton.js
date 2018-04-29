import React from "react";

export const SignupBtn = props => (
  <div>
    { props.randomword !== "" ?
      <div id = "roomkey"> 
        <i class="fas fa-key" id="key-icon"></i>
         {/* Temporary key until we get Mike’s cute lil pic */}
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
