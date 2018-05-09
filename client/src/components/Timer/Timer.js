import React from "react";

class Timer extends React.Component {

  state = {
    number: "",
  }

  countdown = () => {
    timeleft = this.state.number;

    for (i=this.state.number;i>0;i--) {
      setTimeout()
    }
  }
}
