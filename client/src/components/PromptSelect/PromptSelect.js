import React from "react";

const PromptSelect = props => (
    <div onClick={props.selectedTheme} className="promptSelect-component"> 
        {/* Will need to use a map function to pull out the categories and assign the proper fa icon. Will also need to assign a random color */}
        <div style={{background:props.color}} className="prompt-card">
        <h5><i className={props.icon}></i>{props.theme}</h5>
        </div>
    </div>
  );

export default PromptSelect;