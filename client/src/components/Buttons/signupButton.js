import React from "react";

export const SignupBtn = props => (
  <div>
    { props.randomword !== "" ?
      <div id = "roomkey"> 
        <p>O----E</p>
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
