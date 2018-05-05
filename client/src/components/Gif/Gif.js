import React from "react";

const Gif = props => (
  <div className="gif-component" onClick={props.selectWinner}>
    <img src={props.src} alt={props.alt} className="gif-preview"/>
  </div>
)

export default Gif;