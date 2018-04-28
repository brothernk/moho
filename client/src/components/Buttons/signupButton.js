import React from "react";
import "./button.css"

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

    <span {...props} id = {props.id} className="btn signup-btn">
    {/* className="btn btn-success signup-btn */}
    Create Game
    </span>
    
  </div>
)
