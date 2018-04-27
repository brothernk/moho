import React from "react";
import "./button.css"

export const SignupBtn = props => (
  <div>
    <span {...props} id = {props.id} className="btn signup-btn">
    {/* className="btn btn-success signup-btn */}
    Create Game
    </span>
    <p>{props.randomword}</p>
  </div>
)

