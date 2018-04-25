import React from "react";
import "./button.css"

export const SignupBtn = props => (
    <span {...props} id = {props.id} className="btn btn-success signup-btn">
    Create New Game
  </span>
)

