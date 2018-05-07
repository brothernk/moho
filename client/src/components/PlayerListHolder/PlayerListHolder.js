import React from "react";

const PlayerListHolder = props => (
  <table className="playerlist-holder">
    <tbody>
    {props.children}
    </tbody>
  </table>
)

export default PlayerListHolder;