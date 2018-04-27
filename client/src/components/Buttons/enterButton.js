import React from "react";
import "./button.css"

export const EnterBtn = props => (

    <span {...props} id = {props.id} className="btn enter-btn">
    {/* btn btn-success signup-btn */}
        Enter Game
    </span>
);