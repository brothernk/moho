import React from "react";
import "./button.css"

export const SignupBtn = props => (
  <div>
    <span {...props} id = {props.id} className="btn btn-success signup-btn">
    Create New Game
    </span>
    <p>{props.randomword}</p>
  </div>
)

