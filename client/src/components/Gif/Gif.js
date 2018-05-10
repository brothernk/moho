import React from "react";

const Gif = props => (
  <div className="gif-component" onClick={props.onClick} key={props.user}>
    <img src={props.src} className="gif-preview" data={props.user}/>
  </div>
)

export default Gif;