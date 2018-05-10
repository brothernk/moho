import React from "react";

const Gif = props => (
  <div className="gif-component" onClick={props.onClick}>
    <img src={props.src} className="gif-preview" data-user={props.user}/>
  </div>
)

export default Gif;