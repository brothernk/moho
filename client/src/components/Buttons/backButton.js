import React, { Component } from "react";

class BackBtn extends Component {

  backFunction = () => {
    console.log("button has been clicked")
    window.location.href = "/"
  }

  render() {
    return(
      <span className="btn back-btn" onClick = {this.backFunction}>
        Home
      </span>
    )
  }

}

export default BackBtn;